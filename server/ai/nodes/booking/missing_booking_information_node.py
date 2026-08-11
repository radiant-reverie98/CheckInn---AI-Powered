from langchain_core.messages import SystemMessage, HumanMessage
from state.sally_state import SallyState
from llm import get_llm


MISSING_INFORMATION_PROMPT = """
You are Sally, the AI travel assistant for CheckInn.

The user wants to book a hotel, but some required booking information
is currently missing.

Current booking information:

Destination: {destination}
Check-in date: {start_date}
Check-out date: {end_date}
Number of guests: {num_guests}
Budget: {budget}

Required information:
- destination
- start_date
- end_date
- num_guests

Your task:
- Identify which required information is missing.
- Ask the user a natural and concise follow-up question.
- Ask only for the missing information.
- Do not ask for information that is already available.
- Budget is optional, so never ask for budget unless the user specifically
  indicates they want to set or change one.
- Do not search for hotels.
- Do not invent any missing values.
- Keep the response conversational and brief.
"""

def missing_booking_information_node(state: SallyState):
    

    prompt = MISSING_INFORMATION_PROMPT.format(
        destination=state.get("destination"),
        start_date=state.get("start_date"),
        end_date=state.get("end_date"),
        num_guests=state.get("num_guests"),
        budget=state.get("budget"),
    )

    response = get_llm.invoke([
        SystemMessage(content=prompt)
    ])

    return {
        "messages": [response]
    }