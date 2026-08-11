from langchain_core.messages import AIMessage
from state.sally_state import SallyState

def booking_confirmed_node(state: SallyState):

    return {
        "messages": [
            AIMessage(
                content="Great! Your booking details have been confirmed."
            )
        ]
    }


def edit_booking_node(state: SallyState):

    return {
        "messages": [
            AIMessage(
                content="Sure, let's update your booking."
            )
        ]
    }