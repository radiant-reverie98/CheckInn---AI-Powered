from langchain_core.messages import HumanMessage
from state.sally_state import SallyState
from agents.planner_agent import planner_agent


def planner_agent_node(state: SallyState) -> SallyState:

    destination = state.get("destination")
    start_date = state.get("start_date")
    end_date = state.get("end_date")
    num_guests = state.get("num_guests")

    duration = (
        (end_date - start_date).days + 1
        if start_date and end_date
        else None
    )

    # Get ONLY latest user message
    latest_user_message = next(
        (
            message.content
            for message in reversed(state["messages"])
            if isinstance(message, HumanMessage)
        ),
        ""
    )

    planner_input = f"""
CANONICAL TRIP INFORMATION

Destination: {destination}
Start date: {start_date}
End date: {end_date}
Duration: {duration} days
Number of guests: {num_guests}

LATEST USER REQUEST:
{latest_user_message}

The canonical trip information above is authoritative.

Do not reinterpret the trip dates from conversation history.
Do not change the destination, dates, duration, or guest count.

Create or modify the itinerary according to the latest user request.
"""

    response = planner_agent.invoke({
        "messages": [
            HumanMessage(content=planner_input)
        ]
    })

    final_message = response["messages"][-1]

    return {
        "messages": [final_message],
        "pending_agent": None
    }