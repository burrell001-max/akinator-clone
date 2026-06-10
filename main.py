from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, List
import copy

app = FastAPI()

# --- THE GAME DATA (The Character Matrix) ---
# Weights: 1.0 = Yes, 0.75 = Probably, 0.5 = Don't Know, 0.25 = Probably Not, 0.0 = No
CHARACTERS = [
    {"name": "Spider-Man", "weights": {"1": 1.0, "2": 1.0, "3": 0.0, "4": 1.0, "5": 0.0}},
    {"name": "SpongeBob SquarePants", "weights": {"1": 0.0, "2": 1.0, "3": 1.0, "4": 0.0, "5": 1.0}},
    {"name": "Abraham Lincoln", "weights": {"1": 1.0, "2": 0.0, "3": 0.0, "4": 0.0, "5": 0.0}},
    {"name": "Harry Potter", "weights": {"1": 1.0, "2": 1.0, "3": 0.0, "4": 0.0, "5": 1.0}},
    {"name": "Yoda", "weights": {"1": 1.0, "2": 0.0, "3": 1.0, "4": 0.0, "5": 0.0}}
]

QUESTIONS = {
    "1": "Is your character real?",
    "2": "Is your character a fictional hero?",
    "3": "Is your character non-human or an alien?",
    "4": "Does your character wear a mask?",
    "5": "Does your character use magic or special items?"
}

# --- ACTIVE SESSION STORAGE ---
# For a basic setup, we store live sessions in a dictionary.
# In production, you would use a fast cache like Redis.
sessions: Dict[str, dict] = {}

class AnswerPayload(BaseModel):
    session_id: str
    question_id: str
    answer_weight: float  # 0.0 to 1.0 passed from frontend buttons

@app.get("/")
def home():
    return {"status": "Akinator API Engine is running smoothly."}

@app.get("/start-game")
def start_game(session_id: str):
    """Initializes a brand new session game state."""
    sessions[session_id] = {
        "answers": {},  # Stores {question_id: weight}
        "asked_questions": []
    }
    
    # Select the optimal first question (Question 1 is a great broad separator)
    return {
        "status": "game_started",
        "next_question_id": "1",
        "question_text": QUESTIONS["1"]
    }

@app.post("/submit-answer")
def submit_answer(payload: AnswerPayload):
    """Processes an answer, updates probabilities, and returns the next question or final guess."""
    session = sessions.get(payload.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Game session expired or not found.")
    
    # Save the user's input weight
    session["answers"][payload.question_id] = payload.answer_weight
    session["asked_questions"].append(payload.question_id)
    
    # --- MATH ENGINE: Recalculate Character Scores ---
    current_scores = []
    for char in CHARACTERS:
        score = 1.0
        for q_id, user_ans in session["answers"].items():
            expected_ans = char["weights"].get(q_id, 0.5)
            # Calculate how closely user choice matches profile configuration
            closeness = 1.0 - abs(user_ans - expected_ans)
            score *= max(closeness, 0.01) # Avoid complete zero-out from one weird answer
        
        current_scores.append({"name": char["name"], "probability_score": score})
    
    # Sort characters by highest probability match
    current_scores.sort(key=lambda x: x["probability_score"], reverse=True)
    top_guess = current_scores[0]
    
    # --- DETERMINATION: Keep asking or make final guess? ---
    # Win condition: If top guess is significantly higher than second place, or all questions are exhausted
    if len(session["asked_questions"]) >= len(QUESTIONS) or (len(session["asked_questions"]) >= 3 and top_guess["probability_score"] > 0.6):
        return {
            "status": "guess",
            "character_guess": top_guess["name"]
        }
    
    # --- SELECTION: Pick the next best question ---
    next_q_id = None
    for q_id in QUESTIONS.keys():
        if q_id not in session["asked_questions"]:
            next_q_id = q_id
            break
            
    if not next_q_id:
        return {"status": "guess", "character_guess": top_guess["name"]}
        
    return {
        "status": "continue",
        "next_question_id": next_q_id,
        "question_text": QUESTIONS[next_q_id]
    }
