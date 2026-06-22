from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
import random
from datetime import date

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sessions: Dict[str, Dict] = {}

# --- QUESTIONS (20 broad trait questions) ---
QUESTIONS = {
    "q1":  "Is your character completely fictional — born from a story, film, or game?",
    "q2":  "Does your character possess magical powers, superhuman abilities, or the Force?",
    "q3":  "Is your character widely considered a hero or a force for good?",
    "q4":  "Is your character human — or at least appears human?",
    "q5":  "Does your character live or operate primarily underwater or in the ocean?",
    "q6":  "Is your character known for wearing a mask, costume, or disguise?",
    "q7":  "Is your character associated with science, technology, or genius-level intelligence?",
    "q8":  "Does your character come from outer space or an alien world?",
    "q9":  "Is your character a villain — or known for causing chaos and destruction?",
    "q10": "Is your character from an animated series or cartoon?",
    "q11": "Does your character wield a weapon as their signature item?",
    "q12": "Is your character part of a team, group, or organisation?",
    "q13": "Is your character known to almost everyone on Earth?",
    "q14": "Does your character have a famous sidekick or loyal companion?",
    "q15": "Is your character associated with royalty, ruling, or leadership?",
    "q16": "Is your character primarily from a book or novel?",
    "q17": "Does your character have a nemesis or arch-enemy?",
    "q18": "Is your character known more for their mind than their physical strength?",
    "q19": "Does your character undergo a major transformation during their story?",
    "q20": "Is your character's story set in a fantasy or mythical world?",
}

# --- CHARACTERS ---
# 1.0 = Yes, 0.0 = No, 0.5 = Somewhat/Both
CHARACTERS = {
    "Spider-Man": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 1.0, "q7": 0.5, "q8": 0.0, "q9": 0.0, "q10": 0.5,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 0.0, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.5, "q19": 1.0, "q20": 0.0,
    },
    "Yoda": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 0.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.5, "q8": 1.0, "q9": 0.0, "q10": 0.5,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 0.5, "q15": 1.0,
        "q16": 0.0, "q17": 1.0, "q18": 1.0, "q19": 0.0, "q20": 1.0,
    },
    "SpongeBob": {
        "q1": 1.0, "q2": 0.0, "q3": 0.5, "q4": 0.0, "q5": 1.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 1.0,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 0.0, "q17": 0.5, "q18": 0.0, "q19": 0.0, "q20": 0.5,
    },
    "Harry Potter": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 1.0, "q17": 1.0, "q18": 0.5, "q19": 1.0, "q20": 1.0,
    },
    "Abraham Lincoln": {
        "q1": 0.0, "q2": 0.0, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.5, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 0.0, "q12": 0.0, "q13": 1.0, "q14": 0.0, "q15": 1.0,
        "q16": 0.0, "q17": 0.5, "q18": 1.0, "q19": 0.0, "q20": 0.0,
    },
    "Batman": {
        "q1": 1.0, "q2": 0.0, "q3": 0.5, "q4": 1.0, "q5": 0.0,
        "q6": 1.0, "q7": 1.0, "q8": 0.0, "q9": 0.0, "q10": 0.5,
        "q11": 0.5, "q12": 0.5, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 1.0, "q19": 0.0, "q20": 0.0,
    },
    "Darth Vader": {
        "q1": 1.0, "q2": 1.0, "q3": 0.0, "q4": 0.5, "q5": 0.0,
        "q6": 1.0, "q7": 0.5, "q8": 1.0, "q9": 1.0, "q10": 0.0,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 0.0, "q15": 1.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.5, "q19": 1.0, "q20": 1.0,
    },
    "Hermione Granger": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 1.0, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 0.5, "q12": 1.0, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 1.0, "q17": 1.0, "q18": 1.0, "q19": 0.5, "q20": 1.0,
    },
    "Iron Man": {
        "q1": 1.0, "q2": 0.5, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 1.0, "q7": 1.0, "q8": 0.0, "q9": 0.0, "q10": 0.5,
        "q11": 0.5, "q12": 1.0, "q13": 1.0, "q14": 0.5, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 1.0, "q19": 1.0, "q20": 0.0,
    },
    "Sherlock Holmes": {
        "q1": 1.0, "q2": 0.0, "q3": 0.5, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 1.0, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 1.0, "q17": 1.0, "q18": 1.0, "q19": 0.0, "q20": 0.0,
    },
    "Elsa": {
        "q1": 1.0, "q2": 1.0, "q3": 0.5, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 1.0,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 1.0, "q15": 1.0,
        "q16": 0.0, "q17": 0.5, "q18": 0.0, "q19": 1.0, "q20": 1.0,
    },
    "The Joker": {
        "q1": 1.0, "q2": 0.0, "q3": 0.0, "q4": 1.0, "q5": 0.0,
        "q6": 0.5, "q7": 0.5, "q8": 0.0, "q9": 1.0, "q10": 0.5,
        "q11": 0.5, "q12": 0.0, "q13": 1.0, "q14": 0.0, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.5, "q19": 0.0, "q20": 0.0,
    },
    "Gandalf": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 0.5, "q5": 0.0,
        "q6": 0.0, "q7": 1.0, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 0.5, "q15": 0.0,
        "q16": 1.0, "q17": 1.0, "q18": 1.0, "q19": 1.0, "q20": 1.0,
    },
    "Goku": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 0.5, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 1.0, "q9": 0.0, "q10": 1.0,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.0, "q19": 1.0, "q20": 0.5,
    },
    "Moana": {
        "q1": 1.0, "q2": 0.5, "q3": 1.0, "q4": 1.0, "q5": 1.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 1.0,
        "q11": 0.0, "q12": 0.0, "q13": 0.5, "q14": 0.5, "q15": 1.0,
        "q16": 0.0, "q17": 0.5, "q18": 0.0, "q19": 1.0, "q20": 1.0,
    },
    "Thanos": {
        "q1": 1.0, "q2": 1.0, "q3": 0.0, "q4": 0.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.5, "q8": 1.0, "q9": 1.0, "q10": 0.5,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 0.0, "q15": 1.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.5, "q19": 0.0, "q20": 0.5,
    },
    "Mulan": {
        "q1": 1.0, "q2": 0.0, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 1.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 1.0,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 0.5, "q15": 0.0,
        "q16": 0.0, "q17": 0.5, "q18": 0.5, "q19": 1.0, "q20": 0.5,
    },
    "Walter White": {
        "q1": 1.0, "q2": 0.0, "q3": 0.0, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 1.0, "q8": 0.0, "q9": 1.0, "q10": 0.0,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 0.5, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 1.0, "q19": 1.0, "q20": 0.0,
    },
    "Pikachu": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 0.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 1.0,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 0.0, "q17": 0.5, "q18": 0.0, "q19": 1.0, "q20": 0.5,
    },
    "Frodo Baggins": {
        "q1": 1.0, "q2": 0.5, "q3": 1.0, "q4": 0.5, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 0.5, "q12": 1.0, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 1.0, "q17": 1.0, "q18": 0.0, "q19": 1.0, "q20": 1.0,
    },
}


def get_daily_question_set():
    """
    Returns the same 10 questions, in the same order, for every player
    on a given calendar day. The set automatically changes the next day
    because the random seed is derived from today's date.
    """
    all_q = list(QUESTIONS.keys())
    today_str = date.today().isoformat()  # e.g. "2026-06-21"
    rng = random.Random(today_str)        # seeded RNG -> same shuffle all day
    rng.shuffle(all_q)
    return all_q[:10]


class AnswerInput(BaseModel):
    session_id: str
    question_id: str
    answer_weight: float


@app.get("/")
def home():
    return {"status": "MindGenie AI Engine is running."}


@app.get("/start-game")
def start_game(session_id: str):
    # Same 10 questions for everyone today; changes automatically tomorrow
    selected = get_daily_question_set()

    sessions[session_id] = {
        "answers": {},
        "remaining_questions": list(selected),
    }

    next_q = selected[0]
    return {
        "status": "game_started",
        "next_question_id": next_q,
        "question_text": QUESTIONS[next_q],
    }


@app.post("/submit-answer")
def submit_answer(data: AnswerInput):
    session = sessions.get(data.session_id)
    if not session:
        return {"status": "error", "message": "Session not found."}

    session["answers"][data.question_id] = data.answer_weight

    if data.question_id in session["remaining_questions"]:
        session["remaining_questions"].remove(data.question_id)

    if session["remaining_questions"]:
        next_q = session["remaining_questions"][0]
        return {
            "status": "playing",
            "next_question_id": next_q,
            "question_text": QUESTIONS[next_q],
        }

    # --- WEIGHTED MATCH CALCULATION ---
    # Characters with more answered questions get scored fairly
    best_match = None
    best_score = float('inf')

    for character, profile in CHARACTERS.items():
        total_distance = 0.0
        answered = 0
        for q_id, user_weight in session["answers"].items():
            if q_id in profile:
                total_distance += abs(profile[q_id] - user_weight)
                answered += 1
        # Normalise by number of answered questions to avoid bias
        normalised = total_distance / answered if answered > 0 else float('inf')
        if normalised < best_score:
            best_score = normalised
            best_match = character

    return {
        "status": "guess",
        "character_guess": best_match,
    }
