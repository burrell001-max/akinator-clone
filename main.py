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
    "q21": "Does your character attend a school or academy as part of their story?",
    "q22": "Is your character an elderly or ancient mentor figure who guides younger heroes?",
    "q23": "Does your character's story centrally involve romance or marrying a prince or princess?",
    "q24": "Does your character set out on a sea voyage or ocean journey as a core part of their story?",
    "q25": "Does your character communicate primarily through human speech and language?",
    "q26": "Does your character have a regular paying job or workplace?",
    "q27": "Is your character's true name or identity publicly known, rather than a secret identity?",
    "q28": "Is your character the sole, title-billed protagonist of their own story?",
}

# --- CHARACTERS ---
# 1.0 = Yes, 0.0 = No, 0.5 = Somewhat/Both
CHARACTERS = {
    "Spider-Man": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 1.0, "q7": 0.5, "q8": 0.0, "q9": 0.0, "q10": 0.5,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 0.0, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.5, "q19": 1.0, "q20": 0.0,
        "q21": 1.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.5, "q27": 0.0, "q28": 1.0,
    },
    "Yoda": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 0.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.5, "q8": 1.0, "q9": 0.0, "q10": 0.5,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 0.5, "q15": 1.0,
        "q16": 0.0, "q17": 1.0, "q18": 1.0, "q19": 0.0, "q20": 1.0,
        "q21": 0.5, "q22": 1.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.0, "q27": 1.0, "q28": 0.0,
    },
    "SpongeBob": {
        "q1": 1.0, "q2": 0.0, "q3": 0.5, "q4": 0.0, "q5": 1.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 1.0,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 0.0, "q17": 0.5, "q18": 0.0, "q19": 0.0, "q20": 0.5,
        "q21": 0.5, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 1.0, "q27": 1.0, "q28": 1.0,
    },
    "Harry Potter": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 1.0, "q17": 1.0, "q18": 0.5, "q19": 1.0, "q20": 1.0,
        "q21": 1.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.0, "q27": 1.0, "q28": 1.0,
    },
    "Abraham Lincoln": {
        "q1": 0.0, "q2": 0.0, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.5, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 0.0, "q12": 0.0, "q13": 1.0, "q14": 0.0, "q15": 1.0,
        "q16": 0.0, "q17": 0.5, "q18": 1.0, "q19": 0.0, "q20": 0.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 1.0, "q27": 1.0, "q28": 0.5,
    },
    "Batman": {
        "q1": 1.0, "q2": 0.0, "q3": 0.5, "q4": 1.0, "q5": 0.0,
        "q6": 1.0, "q7": 1.0, "q8": 0.0, "q9": 0.0, "q10": 0.5,
        "q11": 0.5, "q12": 0.5, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 1.0, "q19": 0.0, "q20": 0.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.5, "q27": 0.0, "q28": 1.0,
    },
    "Darth Vader": {
        "q1": 1.0, "q2": 1.0, "q3": 0.0, "q4": 0.5, "q5": 0.0,
        "q6": 1.0, "q7": 0.5, "q8": 1.0, "q9": 1.0, "q10": 0.0,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 0.0, "q15": 1.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.5, "q19": 1.0, "q20": 1.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.5, "q27": 0.0, "q28": 0.0,
    },
    "Hermione Granger": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 1.0, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 0.5, "q12": 1.0, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 1.0, "q17": 1.0, "q18": 1.0, "q19": 0.5, "q20": 1.0,
        "q21": 1.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.0, "q27": 1.0, "q28": 0.0,
    },
    "Iron Man": {
        "q1": 1.0, "q2": 0.5, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 1.0, "q7": 1.0, "q8": 0.0, "q9": 0.0, "q10": 0.5,
        "q11": 0.5, "q12": 1.0, "q13": 1.0, "q14": 0.5, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 1.0, "q19": 1.0, "q20": 0.0,
        "q21": 0.0, "q22": 0.5, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 1.0, "q27": 1.0, "q28": 1.0,
    },
    "Sherlock Holmes": {
        "q1": 1.0, "q2": 0.0, "q3": 0.5, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 1.0, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 1.0, "q17": 1.0, "q18": 1.0, "q19": 0.0, "q20": 0.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.5, "q27": 1.0, "q28": 1.0,
    },
    "Elsa": {
        "q1": 1.0, "q2": 1.0, "q3": 0.5, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 1.0,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 1.0, "q15": 1.0,
        "q16": 0.0, "q17": 0.5, "q18": 0.0, "q19": 1.0, "q20": 1.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.5, "q27": 1.0, "q28": 0.5,
    },
    "The Joker": {
        "q1": 1.0, "q2": 0.0, "q3": 0.0, "q4": 1.0, "q5": 0.0,
        "q6": 0.5, "q7": 0.5, "q8": 0.0, "q9": 1.0, "q10": 0.5,
        "q11": 0.5, "q12": 0.0, "q13": 1.0, "q14": 0.0, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.5, "q19": 0.0, "q20": 0.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.0, "q27": 0.0, "q28": 1.0,
    },
    "Gandalf": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 0.5, "q5": 0.0,
        "q6": 0.0, "q7": 1.0, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 0.5, "q15": 0.0,
        "q16": 1.0, "q17": 1.0, "q18": 1.0, "q19": 1.0, "q20": 1.0,
        "q21": 0.0, "q22": 1.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.0, "q27": 1.0, "q28": 0.0,
    },
    "Goku": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 0.5, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 1.0, "q9": 0.0, "q10": 1.0,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.0, "q19": 1.0, "q20": 0.5,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.0, "q27": 1.0, "q28": 0.0,
    },
    "Moana": {
        "q1": 1.0, "q2": 0.5, "q3": 1.0, "q4": 1.0, "q5": 1.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 1.0,
        "q11": 0.0, "q12": 0.0, "q13": 0.5, "q14": 0.5, "q15": 1.0,
        "q16": 0.0, "q17": 0.5, "q18": 0.0, "q19": 1.0, "q20": 1.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 1.0, "q25": 1.0, "q26": 0.0, "q27": 1.0, "q28": 1.0,
    },
    "Thanos": {
        "q1": 1.0, "q2": 1.0, "q3": 0.0, "q4": 0.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.5, "q8": 1.0, "q9": 1.0, "q10": 0.5,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 0.0, "q15": 1.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.5, "q19": 0.0, "q20": 0.5,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.0, "q27": 1.0, "q28": 0.0,
    },
    "Mulan": {
        "q1": 1.0, "q2": 0.0, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 1.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 1.0,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 0.5, "q15": 0.0,
        "q16": 0.0, "q17": 0.5, "q18": 0.5, "q19": 1.0, "q20": 0.5,
        "q21": 0.0, "q22": 0.0, "q23": 0.5, "q24": 0.0, "q25": 1.0, "q26": 0.5, "q27": 0.0, "q28": 1.0,
    },
    "Walter White": {
        "q1": 1.0, "q2": 0.0, "q3": 0.0, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 1.0, "q8": 0.0, "q9": 1.0, "q10": 0.0,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 0.5, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 1.0, "q19": 1.0, "q20": 0.0,
        "q21": 0.5, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 1.0, "q27": 0.0, "q28": 0.0,
    },
    "Pikachu": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 0.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 1.0,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 0.0, "q17": 0.5, "q18": 0.0, "q19": 1.0, "q20": 0.5,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 0.0, "q26": 0.0, "q27": 1.0, "q28": 0.5,
    },
    "Frodo Baggins": {
        "q1": 1.0, "q2": 0.5, "q3": 1.0, "q4": 0.5, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 0.5, "q12": 1.0, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 1.0, "q17": 1.0, "q18": 0.0, "q19": 1.0, "q20": 1.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.0, "q27": 1.0, "q28": 0.0,
    },
    "Wonder Woman": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 0.5, "q5": 0.0,
        "q6": 0.5, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 0.5,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 0.0, "q15": 1.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.5, "q19": 0.0, "q20": 1.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.5, "q27": 0.5, "q28": 1.0,
    },
    "Shrek": {
        "q1": 1.0, "q2": 0.0, "q3": 1.0, "q4": 0.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 1.0,
        "q11": 0.0, "q12": 0.5, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 0.0, "q17": 0.5, "q18": 0.0, "q19": 0.0, "q20": 1.0,
        "q21": 0.0, "q22": 0.0, "q23": 1.0, "q24": 0.0, "q25": 1.0, "q26": 0.0, "q27": 1.0, "q28": 1.0,
    },
    "Captain Jack Sparrow": {
        "q1": 1.0, "q2": 0.0, "q3": 0.5, "q4": 1.0, "q5": 0.5,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 1.0, "q12": 0.5, "q13": 1.0, "q14": 0.5, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.5, "q19": 0.0, "q20": 0.5,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 1.0, "q25": 1.0, "q26": 0.5, "q27": 1.0, "q28": 0.0,
    },
    "Albus Dumbledore": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 0.5, "q15": 1.0,
        "q16": 1.0, "q17": 1.0, "q18": 1.0, "q19": 0.0, "q20": 1.0,
        "q21": 1.0, "q22": 1.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 1.0, "q27": 1.0, "q28": 0.0,
    },
    "Katniss Everdeen": {
        "q1": 1.0, "q2": 0.0, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 0.0,
        "q11": 1.0, "q12": 0.5, "q13": 1.0, "q14": 0.5, "q15": 0.0,
        "q16": 1.0, "q17": 1.0, "q18": 0.0, "q19": 1.0, "q20": 0.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.5, "q24": 0.0, "q25": 1.0, "q26": 0.0, "q27": 1.0, "q28": 0.0,
    },
    "Buzz Lightyear": {
        "q1": 1.0, "q2": 0.0, "q3": 1.0, "q4": 0.0, "q5": 0.0,
        "q6": 0.5, "q7": 1.0, "q8": 0.5, "q9": 0.0, "q10": 1.0,
        "q11": 0.5, "q12": 1.0, "q13": 1.0, "q14": 1.0, "q15": 0.0,
        "q16": 0.0, "q17": 0.5, "q18": 0.0, "q19": 1.0, "q20": 0.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 1.0, "q27": 1.0, "q28": 1.0,
    },
    "Maleficent": {
        "q1": 1.0, "q2": 1.0, "q3": 0.0, "q4": 0.5, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 1.0, "q10": 0.5,
        "q11": 0.0, "q12": 0.0, "q13": 1.0, "q14": 0.0, "q15": 1.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.5, "q19": 0.5, "q20": 1.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.0, "q27": 1.0, "q28": 1.0,
    },
    "Thor": {
        "q1": 1.0, "q2": 1.0, "q3": 1.0, "q4": 0.5, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 1.0, "q9": 0.0, "q10": 0.5,
        "q11": 1.0, "q12": 1.0, "q13": 1.0, "q14": 0.5, "q15": 1.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.0, "q19": 1.0, "q20": 1.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.0, "q27": 1.0, "q28": 1.0,
    },
    "Cinderella": {
        "q1": 1.0, "q2": 0.5, "q3": 1.0, "q4": 1.0, "q5": 0.0,
        "q6": 0.0, "q7": 0.0, "q8": 0.0, "q9": 0.0, "q10": 1.0,
        "q11": 0.0, "q12": 0.0, "q13": 1.0, "q14": 0.5, "q15": 1.0,
        "q16": 0.0, "q17": 0.5, "q18": 0.0, "q19": 1.0, "q20": 1.0,
        "q21": 0.0, "q22": 0.0, "q23": 1.0, "q24": 0.0, "q25": 1.0, "q26": 0.5, "q27": 0.5, "q28": 1.0,
    },
    "Deadpool": {
        "q1": 1.0, "q2": 1.0, "q3": 0.5, "q4": 1.0, "q5": 0.0,
        "q6": 1.0, "q7": 0.0, "q8": 0.0, "q9": 0.5, "q10": 0.0,
        "q11": 1.0, "q12": 0.5, "q13": 1.0, "q14": 0.0, "q15": 0.0,
        "q16": 0.0, "q17": 1.0, "q18": 0.0, "q19": 0.0, "q20": 0.0,
        "q21": 0.0, "q22": 0.0, "q23": 0.0, "q24": 0.0, "q25": 1.0, "q26": 0.5, "q27": 0.5, "q28": 1.0,
    },
}


DAILY_CHARACTER_COUNT = 15  # how many of the full roster are "in play" each day

# --- ADAPTIVE QUESTION SELECTION ---
# Instead of asking a fixed, pre-shuffled list of 10 questions, we pick each
# question on the fly based on the answers given so far: whichever remaining
# question best "splits" the characters that are still plausible matches.
MIN_QUESTIONS = 6      # never guess before at least this many questions
MAX_QUESTIONS = 14      # hard cap so a round can't run forever
CONFIDENCE_MARGIN = 0.35  # stop early once the leader is clearly ahead


def _character_distances(characters: Dict[str, Dict], answers: Dict[str, float]) -> Dict[str, float]:
    """
    For each character, the average |difference| between their profile and
    the user's answers so far, over only the questions actually answered.
    Lower = more plausible match. Unanswered-so-far -> distance 0 for all
    (nothing to distinguish them yet).
    """
    distances = {}
    for name, profile in characters.items():
        total = 0.0
        answered = 0
        for q_id, user_weight in answers.items():
            if q_id in profile:
                total += abs(profile[q_id] - user_weight)
                answered += 1
        distances[name] = (total / answered) if answered > 0 else 0.0
    return distances


def _character_weights(characters: Dict[str, Dict], answers: Dict[str, float]) -> Dict[str, float]:
    """
    Converts distance-so-far into a plausibility weight: characters that fit
    the answers well so far get more influence over which question we ask
    next. A small epsilon keeps a perfect-so-far match from dominating so
    completely that we stop exploring other close contenders too early.
    """
    distances = _character_distances(characters, answers)
    return {name: 1.0 / (dist + 0.15) for name, dist in distances.items()}


def _weighted_variance(values, weights) -> float:
    if not values:
        return 0.0
    total_w = sum(weights)
    if total_w == 0:
        return 0.0
    mean = sum(v * w for v, w in zip(values, weights)) / total_w
    return sum(w * (v - mean) ** 2 for v, w in zip(values, weights)) / total_w


def pick_next_question(characters: Dict[str, Dict], answers: Dict[str, float], available: set) -> str:
    """
    Chooses whichever unasked question has the highest weighted variance in
    answer-value across today's characters -- i.e. the question most likely
    to meaningfully split apart the candidates still in contention, given
    what we've learned so far. Falls back to the first available question if
    every candidate question is somehow non-discriminating.
    """
    weights = _character_weights(characters, answers)
    best_q, best_variance = None, -1.0
    for q_id in available:
        values, w_list = [], []
        for name, profile in characters.items():
            if q_id in profile:
                values.append(profile[q_id])
                w_list.append(weights[name])
        variance = _weighted_variance(values, w_list)
        if variance > best_variance:
            best_variance, best_q = variance, q_id
    return best_q or next(iter(available))


def should_stop(characters: Dict[str, Dict], answers: Dict[str, float], asked_count: int, available: set) -> bool:
    if asked_count >= MAX_QUESTIONS or not available:
        return True
    if asked_count < MIN_QUESTIONS:
        return False
    distances = sorted(_character_distances(characters, answers).values())
    if len(distances) < 2:
        return True
    # Confident once the runner-up is clearly further away than the leader.
    return (distances[1] - distances[0]) >= CONFIDENCE_MARGIN


def get_daily_character_pool():
    """
    Returns a subset of the full character roster that's "in play" today.
    Same subset for every player today; automatically changes tomorrow
    because the seed is derived from today's date (offset so it doesn't
    pick the exact same day-string as the questions, for more variety).
    """
    all_chars = list(CHARACTERS.keys())
    today_str = date.today().isoformat() + "-characters"
    rng = random.Random(today_str)
    rng.shuffle(all_chars)
    pool = all_chars[:DAILY_CHARACTER_COUNT]
    return {name: CHARACTERS[name] for name in pool}


class AnswerInput(BaseModel):
    session_id: str
    question_id: str
    answer_weight: float


@app.get("/")
def home():
    return {"status": "MindGenie AI Engine is running."}


@app.get("/start-game")
def start_game(session_id: str):
    # Same rotating character pool for everyone today; changes automatically
    # tomorrow. Questions, however, are now chosen adaptively per-session as
    # the player answers, rather than pre-selected before the game starts.
    todays_characters = get_daily_character_pool()

    sessions[session_id] = {
        "characters": todays_characters,
        "answers": {},
        "asked_questions": [],
        "available_questions": set(QUESTIONS.keys()),
    }

    next_q = pick_next_question(todays_characters, {}, sessions[session_id]["available_questions"])
    sessions[session_id]["asked_questions"].append(next_q)
    sessions[session_id]["available_questions"].discard(next_q)

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
    session["available_questions"].discard(data.question_id)

    todays_characters = session["characters"]

    if not should_stop(
        todays_characters,
        session["answers"],
        len(session["asked_questions"]),
        session["available_questions"],
    ):
        next_q = pick_next_question(todays_characters, session["answers"], session["available_questions"])
        session["asked_questions"].append(next_q)
        session["available_questions"].discard(next_q)
        return {
            "status": "playing",
            "next_question_id": next_q,
            "question_text": QUESTIONS[next_q],
        }

    # --- WEIGHTED MATCH CALCULATION ---
    # Characters with more answered questions get scored fairly.
    # Only today's rotating character pool (fixed for this session) is considered.
    best_match = None
    best_score = float('inf')

    for character, profile in todays_characters.items():
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
