from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict

app = FastAPI()

# --- CORS SECURITY PASS (ALLOWS GITHUB PAGES TO TALK TO RENDER) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows any website (like your GitHub Pages) to access the API
    allow_credentials=True,
    allow_methods=["*"],  # Allows all actions (GET, POST, etc.)
    allow_headers=["*"],  # Allows all security headers
)

# In-memory session database to track ongoing games
sessions: Dict[str, Dict] = {}

# Hardcoded game engine matrices
QUESTIONS = {
    "q1": "Is your character from a sci-fi universe or galaxy far, far away?",
    "q2": "Is your character a marvel superhero who wears a mask?",
    "q3": "Does your character live in a pineapple under the sea?",
    "q4": "Was your character a real-life historic President of the United States?",
    "q5": "Is your character a wizard who went to Hogwarts School?"
}

CHARACTERS = {
    "Yoda": {"q1": 1.0, "q2": 0.0, "q3": 0.0, "q4": 0.0, "q5": 0.0},
    "Spider-Man": {"q1": 0.0, "q2": 1.0, "q3": 0.0, "q4": 0.0, "q5": 0.0},
    "SpongeBob": {"q1": 0.0, "q2": 0.0, "q3": 1.0, "q4": 0.0, "q5": 0.0},
    "Abraham Lincoln": {"q1": 0.0, "q2": 0.0, "q3": 0.0, "q4": 1.0, "q5": 0.0},
    "Harry Potter": {"q1": 0.0, "q2": 0.0, "q3": 0.0, "q4": 0.0, "q5": 1.0}
}

class AnswerInput(BaseModel):
    session_id: str
    question_id: str
    answer_weight: float

@app.get("/")
def home():
    return {"status": "Akinator API Engine is running smoothly."}

@app.get("/start-game")
def start_game(session_id: str):
    sessions[session_id] = {
        "answers": {},
        "remaining_questions": list(QUESTIONS.keys())
    }
    next_q = sessions[session_id]["remaining_questions"][0]
    return {
        "status": "game_started",
        "next_question_id": next_q,
        "question_text": QUESTIONS[next_q]
    }

@app.post("/submit-answer")
def submit_answer(data: AnswerInput):
    session = sessions.get(data.session_id)
    if not session:
        return {"status": "error", "message": "Session not found."}
    
    # Record answer weight
    session["answers"][data.question_id] = data.answer_weight
    
    # Remove answered question from queue
    if data.question_id in session["remaining_questions"]:
        session["remaining_questions"].remove(data.question_id)
    
    # If we have remaining questions left, send the next one
    if session["remaining_questions"]:
        next_q = session["remaining_questions"][0]
        return {
            "status": "playing",
            "next_question_id": next_q,
            "question_text": QUESTIONS[next_q]
        }
    
    # Out of questions! Run the linear distance calculation to find closest character match
    best_match = None
    smallest_distance = float('inf')
    
    for character, profile in CHARACTERS.items():
        total_distance = 0.0
        for q_id, target_weight in profile.items():
            user_weight = session["answers"].get(q_id, 0.5)
            total_distance += abs(target_weight - user_weight)
        
        if total_distance < smallest_distance:
            smallest_distance = total_distance
            best_match = character
            
    return {
        "status": "guess",
        "character_guess": best_match
    }
