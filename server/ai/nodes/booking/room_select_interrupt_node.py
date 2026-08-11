from langgraph.types import interrupt
from state.sally_state import SallyState


def room_select_interrupt_node(state: SallyState):

    selected_rooms = interrupt({
        "type": "room_selection",
        "message": "Select the rooms you'd like to book.",
        "rooms": state["rooms"],
        "num_guests": state["num_guests"]
    })

    return {
        "selected_rooms": selected_rooms
    }