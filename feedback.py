"""
/feedback endpoint for MindGenie AI.

Wire it into your FastAPI app with:

    from feedback import router as feedback_router
    app.include_router(feedback_router)

Request body (sent by index.html after the player rates a guess):

    {
      "session_id": "abc123",
      "guessed_character": "Batman",
      "correct": false,
      "actual_character": "Robin"      # optional, only on wrong guesses
    }

IMPORTANT (Render): the free tier has an ephemeral disk, so a SQLite file is
wiped whenever the service restarts or redeploys. Point FEEDBACK_DB_PATH at a
persistent disk, or swap the three SQL helpers below for Postgres/Supabase.
"""

import os
import re
import sqlite3
import time
from collections import defaultdict, deque
from contextlib import closing
from typing import Optional

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field, field_validator

DB_PATH = os.environ.get("FEEDBACK_DB_PATH", "feedback.db")

# Light abuse protection: max N writes per client per window (in-memory, per process).
RATE_LIMIT = 30
RATE_WINDOW_SECONDS = 600

router = APIRouter()

_session_lookup = None


def set_session_lookup(fn):
    """main.py registers a function sid -> session dict (or None) so feedback can only be
    recorded for sessions the server actually served."""
    global _session_lookup
    _session_lookup = fn
_hits = defaultdict(deque)

_SESSION_RE = re.compile(r"^[A-Za-z0-9_\-]{1,64}$")
# Letters (any language), digits, spaces and common name punctuation only.
_NAME_RE = re.compile(r"^[\w .,'&:!\-()]{1,80}$", re.UNICODE)


class FeedbackIn(BaseModel):
    session_id: str
    guessed_character: str = Field(min_length=1, max_length=80)
    correct: bool
    actual_character: Optional[str] = Field(default=None, max_length=60)

    @field_validator("session_id")
    @classmethod
    def _check_session(cls, v):
        if not _SESSION_RE.match(v):
            raise ValueError("invalid session_id")
        return v

    @field_validator("guessed_character", "actual_character")
    @classmethod
    def _check_name(cls, v):
        if v is None:
            return v
        v = " ".join(v.split())
        if not _NAME_RE.match(v):
            raise ValueError("invalid character name")
        return v


def _init_db():
    with closing(sqlite3.connect(DB_PATH)) as db:
        db.execute(
            """
            CREATE TABLE IF NOT EXISTS feedback (
                session_id        TEXT PRIMARY KEY,
                guessed_character TEXT NOT NULL,
                correct           INTEGER NOT NULL,
                actual_character  TEXT,
                created_at        REAL NOT NULL
            )
            """
        )
        db.commit()


_init_db()


def _client_key(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _rate_limited(key: str) -> bool:
    now = time.time()
    q = _hits[key]
    while q and now - q[0] > RATE_WINDOW_SECONDS:
        q.popleft()
    if len(q) >= RATE_LIMIT:
        return True
    q.append(now)
    return False


def learn_from_feedback(session_id: str, guessed: str, correct: bool, actual: Optional[str]):
    """
    HOOK: this is where feedback should change the Genie's behaviour.

    Storing a row does NOT make the Genie learn by itself. To make the
    "learns from feedback" claim true, use the session's recorded answers
    (look them up server-side by session_id, never trust the client) and
    nudge the trait weights of the confirmed character.

    Recommended, poisoning-resistant rule:
      - correct=True  -> reinforce `guessed` with this session's answers.
      - correct=False and `actual` given -> do NOT apply immediately. Apply
        only once at least 3 distinct sessions report the same
        (guessed -> actual) correction, and `actual` is a character that
        already exists in your roster (or goes to a review queue).
    """
    return None


@router.post("/feedback")
def submit_feedback(body: FeedbackIn, request: Request):
    if _rate_limited(_client_key(request)):
        raise HTTPException(status_code=429, detail="Too many requests")

    if _session_lookup is not None and _session_lookup(body.session_id) is None:
        # Session expired (e.g. the server restarted) or never existed.
        raise HTTPException(status_code=404, detail="Unknown or expired session")

    if body.actual_character and body.correct:
        raise HTTPException(status_code=422, detail="actual_character only applies to wrong guesses")

    with closing(sqlite3.connect(DB_PATH)) as db:
        row = db.execute(
            "SELECT guessed_character, correct, actual_character FROM feedback WHERE session_id = ?",
            (body.session_id,),
        ).fetchone()

        if row is None:
            db.execute(
                "INSERT INTO feedback (session_id, guessed_character, correct, actual_character, created_at) "
                "VALUES (?, ?, ?, ?, ?)",
                (body.session_id, body.guessed_character, int(body.correct), body.actual_character, time.time()),
            )
        else:
            # One rating per session. A later call may only add the optional correction
            # to the same wrong rating, and only once.
            same_rating = row[0] == body.guessed_character and row[1] == int(body.correct)
            if not same_rating:
                raise HTTPException(status_code=409, detail="Session already rated")
            if body.actual_character and row[2] is None:
                db.execute(
                    "UPDATE feedback SET actual_character = ? WHERE session_id = ?",
                    (body.actual_character, body.session_id),
                )
        db.commit()

    learn_from_feedback(body.session_id, body.guessed_character, body.correct, body.actual_character)
    return {"status": "ok"}
