from app.schemas.intent import IntentDetection
from app.core.llm import llm
from app.states.sally_state import SallyState

intent_classifier = llm.with_structured_output(IntentDetection)

def classify_intent(state: SallyState):

    prompt = f"""
You are Sally, the AI receptionist of CheckInn.

Analyze the user's message and identify every intent present.

Rules:

1. Detect ALL intents in the message.
2. Order intents from MOST IMPORTANT to LEAST IMPORTANT.
3. Greeting and chit-chat should come AFTER actionable intents.
4. Do not invent intents.
5. If nothing matches, return UNKNOWN.

User Message:
{state["user_message"]}
"""

    result = intent_classifier.invoke(prompt)

    return {
        "intents": result.intents
    }

