from langgraph.types import interrupt
from state.sally_state import SallyState


def choose_support_action(state: SallyState):

    selection = interrupt({
        "type": "support_options",
        "message": "How can I help you?",
        "options": [
            {
                "id": "booking_status",
                "label": "Booking Status"
            },
            {
                "id": "cancel_booking",
                "label": "Cancel Booking"
            },
            {
                "id": "refund",
                "label": "Refund"
            },
            {
                "id": "complaint",
                "label": "Report an Issue"
            },
            {
                "id": "write_review",
                "label": "Write a Review"
            }
        ]
    })

    return {
        "customer_support_selection_decision": selection
    }