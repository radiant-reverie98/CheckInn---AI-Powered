from typing import Literal
from state.sally_state import SallyState

def booking_router(
    state: SallyState
) -> Literal["missing_information", "booking_agent"]:

    required_fields = [
        "destination",
        "start_date",
        "end_date",
        "num_guests",
    ]

    missing_fields = [
        field
        for field in required_fields
        if state.get(field) is None
    ]

    if missing_fields:
        return "missing_information"

    return "booking_agent"

