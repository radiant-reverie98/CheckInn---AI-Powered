from langgraph.graph import StateGraph, START, END

from state.sally_state import SallyState

from nodes.planner.planner_information_router import planner_information_router
from nodes.planner.planner_missing_information_node import planner_missing_information_node
from nodes.planner.extractor_planner_node import planner_information_extractor_node
from nodes.planner.planner_agent_node import planner_agent_node


planner_graph = StateGraph(SallyState)

planner_graph.add_node("planner_agent",planner_agent_node)
planner_graph.add_node("planner_information_extractor",planner_information_extractor_node)
planner_graph.add_node("planner_missing_information",planner_missing_information_node)


planner_graph.add_edge(START,"planner_information_extractor")
planner_graph.add_conditional_edges("planner_information_extractor",planner_information_router,{
    "missing_information": "planner_missing_information" ,
    "planner": "planner_agent"
})

planner_graph.add_edge(
    "planner_missing_information",
    END
)

planner_graph.add_edge(
    "planner_agent",
    END
)

planner_workflow = planner_graph.compile()