from state.sally_state import SallyState

def customer_support_router(state: SallyState):
    return state["customer_support_selection_decision"]

