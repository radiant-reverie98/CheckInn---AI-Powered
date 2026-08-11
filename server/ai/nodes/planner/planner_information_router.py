from state.sally_state import SallyState
def planner_information_router(state: SallyState) -> str:

    if not state.get("destination"):
        return "missing_information"

    if not state.get("start_date"):
        return "missing_information"

    if not state.get("end_date"):
        return "missing_information"

    return "planner"