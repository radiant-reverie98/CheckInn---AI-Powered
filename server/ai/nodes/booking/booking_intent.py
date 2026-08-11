from typing import Literal

from state.sally_state import SallyState


def booking_decision_router(
    state: SallyState
) -> Literal["confirm", "edit", "cancel"]:

    decision = state.get("booking_decision")

    if decision == "confirm":
        return "confirm"

    if decision == "edit":
        return "edit"

    return "cancel"