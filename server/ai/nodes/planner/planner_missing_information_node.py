from langchain_core.messages import AIMessage
from state.sally_state import SallyState
def planner_missing_information_node(
    state: SallyState
) -> SallyState:

    if not state.get("destination"):

        question = (
            "Where would you like to travel?"
        )

    elif not state.get("start_date"):

        question = (
            "When would you like to start your trip?"
        )

    elif not state.get("end_date"):

        question = (
            "When would you like your trip to end?"
        )

    else:
        question = (
            "Could you provide the missing trip details?"
        )

    return {
        "messages": [
            AIMessage(content=question)
        ],

        "pending_agent": "planner_agent"
    }