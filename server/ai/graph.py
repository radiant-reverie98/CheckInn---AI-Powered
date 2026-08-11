from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver

from dotenv import load_dotenv

from state.sally_state import SallyState


from nodes.customer_support_agent_node import customer_support_agent_node
from nodes.follow_up_agent_node import follow_up_agent_node
from nodes.orchestrator_node import orchestrator_node
from nodes.intent_router import intent_router

from graphs.planner_graph import planner_workflow
from graphs.booking_graph import booking_workflow

from strucutred_output.orchestrator import IntentType


load_dotenv()


# -----------------------------
# Memory
# -----------------------------

memory = MemorySaver()


# -----------------------------
# Main Sally Graph
# -----------------------------

graph = StateGraph(SallyState)


# -----------------------------
# Nodes
# -----------------------------

graph.add_node(
    "booking_agent",
    booking_workflow
)

graph.add_node(
    "customer_support",
    customer_support_agent_node
)

graph.add_node(
    "follow_up",
    follow_up_agent_node
)

graph.add_node(
    "orchestrator",
    orchestrator_node
)

# Planner is now a SUBGRAPH
graph.add_node(
    "planner",
    planner_workflow
)


# -----------------------------
# Entry
# -----------------------------

graph.add_edge(
    START,
    "orchestrator"
)


# -----------------------------
# Intent Routing
# -----------------------------

graph.add_conditional_edges(
    "orchestrator",
    intent_router,
    {
        IntentType.BOOKING: "booking_agent",
        IntentType.CUSTOMER_SUPPORT: "customer_support",
        IntentType.PLANNER: "planner",
       
        "follow_up": "follow_up"
    }
)


# -----------------------------
# Exit
# -----------------------------

graph.add_edge(
    "booking_agent",
    END
)

graph.add_edge(
    "customer_support",
    END
)

graph.add_edge(
    "planner",
    END
)



graph.add_edge(
    "follow_up",
    END
)


# -----------------------------
# Compile Main Graph
# -----------------------------

workflow = graph.compile(
    checkpointer=memory
)