from typing import Literal
from state.sally_state import SallyState

def booking_summary_router(
    state: SallyState
) -> Literal["booking_summary", "end"]:

    selected_hotel_id = state.get("selected_hotel_id")
    selected_room_id = state.get("selected_room_id")

    if (
        selected_hotel_id is not None
        and selected_room_id is not None
    ):
        return "booking_summary"

    return "end"
