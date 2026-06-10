from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
import random

app = FastAPI()

# --- CORS SECURITY PASS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory session database
sessions: Dict[str, Dict] = {}

# --- BROAD TRAIT QUESTIONS ---
QUESTIONS = {
    "q1": "Is your character a completely fictional/made-up being?",
    "q2": "Does your character possess magical powers, the Force, or superhuman abilities?",
    "q3": "Is your character closely associated with the color blue or wearing a mask?",
    "q4": "Is your character human?",
    "q5": "Does your character live or work primarily in/under water?"
}

# --- THE SMART DECISION MATRIX ---
# 1.0 = Yes, 0.0 = No. The engine calculates who matches your overall profile best!
CHARACTERS = {
    "Yoda": {
        "q1": 1.0,  # Fictional
        "q2": 1.0,  # Has the Force
        "q3": 0.0,  # Not blue/masked (Green)
        "q4": 0.0,  # Not human (Alien)
        "q5": 0.0   # Doesn't live underwater
    },
    "Spider-Man": {
        "q1": 1.0,  # Fictional
        "q2": 1.0,  # Superhuman powers
        "q3": 1.0,  # Wears a blue/red mask
        "q4": 1.0,  # Is human
        "q5": 0.0   # Doesn't live underwater
    },
    "SpongeBob": {
        "q1": 1.0,  # Fictional
        "q2": 0.0,  # No real superpowers
        "q3": 0.0,  # Yellow, no mask
        "q4": 0.0,  # Not human (Sea Sponge)
        "q5": 1.0   # Lives under the sea
    },
    "Harry Potter": {
        "q1": 1.0,  # Fictional
        "q2": 1.0,  # Has magical powers
        "q3": 0.0,  # No mask
        "q4": 1.0,  # Is human
        "q5": 0.0   # Doesn't live underwater
    },
    "Abraham Lincoln": {
        "q1": 0.0,  # NOT fictional (Real person)
        "q2": 0.0,  # No superpowers
        "q3": 0.0,  # No mask
        "q4": 1.0,  # Is human
        "q5": 0.0   # Didn't live underwater
    }
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
    randomized_queue = list(QUESTIONS.keys())
    random.shuffle(randomized_queue)  # Shuffles question sequence
    
    sessions[session_id] = {
        "answers": {},
        "remaining_questions": randomized_queue
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
    
    # Record current choice score
    session["answers"][data.question_id] = data.answer_weight
    
    if data.question_id in session["remaining_questions"]:
        session["remaining_questions"].remove(data.question_id)
    
    if session["remaining_questions"]:
        next_q = session["remaining_questions"][0]
        return {
            "status": "playing",
            "next_question_id": next_q,
            "question_text": QUESTIONS[next_q]
        }
    
    # --- MATCH CALCULATION ---
    best_match = None
    smallest_distance = float('inf')
    
    for character, profile in CHARACTERS.items():
        total_distance = 0.0
        for q_id, target_weight in profile.items():
            user_weight = session["answers"].get(q_id, 0.5)
            # Find total gap difference between choice and profile
            total_distance += abs(target_weight - user_weight)
        
        if total_distance < smallest_distance:
            smallest_distance = total_distance
            best_match = character
            
    return {
        "status": "guess",
        "character_guess": best_match
    }
