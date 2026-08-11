from langgraph.graph import StateGraph, START, END

from state.sally_state import SallyState

from nodes.booking.booking_agent_node import booking_agent_node
from nodes.booking.booking_extractor_node import booking_entity_extractor
from nodes.booking.booking_router import booking_router
from nodes.booking.missing_booking_information_node import missing_booking_information_node

from nodes.booking.booking_summary_node import booking_summary_node
from nodes.booking.booking_summary_router import booking_summary_router

from nodes.booking.booking_decision import booking_confirmed_node
from nodes.booking.booking_decision import edit_booking_node
from nodes.booking.booking_intent import booking_decision_router


booking_graph = StateGraph(SallyState)


# NODES

booking_graph.add_node(
    "booking_entity_extractor",
    booking_entity_extractor
)

booking_graph.add_node(
    "booking_agent_node",
    booking_agent_node
)

booking_graph.add_node(
    "missing_booking_information_node",
    missing_booking_information_node
)

booking_graph.add_node(
    "booking_summary_node",
    booking_summary_node
)

booking_graph.add_node(
    "booking_confirm_node",
    booking_confirmed_node
)

booking_graph.add_node(
    "edit_booking_node",
    edit_booking_node
)


# ENTRY

booking_graph.add_edge(
    START,
    "booking_entity_extractor"
)


# BOOKING INFORMATION ROUTING

booking_graph.add_conditional_edges(
    "booking_entity_extractor",
    booking_router,
    {
        "missing_information": "missing_booking_information_node",
        "booking_agent": "booking_agent_node",
    }
)

booking_graph.add_edge(
    "missing_booking_information_node",
    END
)


# HOTEL / ROOM SELECTION ROUTING

booking_graph.add_conditional_edges(
    "booking_agent_node",
    booking_summary_router,
    {
        "booking_summary": "booking_summary_node",
        "end": END,
    }
)


# AFTER BOOKING SUMMARY / HITL

booking_graph.add_conditional_edges(
    "booking_summary_node",
    booking_decision_router,
    {
        "confirm": "booking_confirm_node",
        "edit": "edit_booking_node",
        "cancel": END,
    }
)


# TEMPORARY ENDINGS

booking_graph.add_edge(
    "booking_confirm_node",
    END
)

booking_graph.add_edge(
    "edit_booking_node",
    END
)


booking_workflow = booking_graph.compile()