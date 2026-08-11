from langgraph.types import interrupt
from state.sally_state import SallyState


def hotel_selection_interrupt(state: SallyState):

    hotel_id = interrupt({
        "type": "hotel_selection",
        "message": "Please select a hotel.",
        "hotels": state["hotels"]
    })

    return {
        "selected_hotel_id": hotel_id
    }