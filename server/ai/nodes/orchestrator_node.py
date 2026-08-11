from state.sally_state import SallyState

from langchain_core.messages import HumanMessage, AIMessage,SystemMessage
from strucutred_output.orchestrator import OrchestratorIntent
from llm import get_llm
from rich import print
orchestrator_llm = get_llm.with_structured_output(
    OrchestratorIntent,
    method="function_calling"
)


ORCHESTRATOR_SYSTEM_PROMPT = """
You are the Orchestrator for a hotel booking assistant.

Your ONLY job is to decide which agent should handle the user's latest message.

You do not answer the user's question yourself.
You do not perform any task.
You only classify the user's intent.

# Available intents

- booking:
  User wants to search for hotels, browse hotels, book a hotel, select a hotel or room,
  confirm a booking, modify a reservation, or check booking details.

- planner:
  User wants to build, adjust, or discuss a trip itinerary.

- customer_support:
  User wants to cancel a booking, request a refund, file a complaint,
  or write/edit a review.

- none:
  You cannot confidently map the request to one of the above given the current
  session state and conversation history. This will trigger a clarifying
  follow-up question instead of routing to an agent.
"""



def orchestrator_node(state: SallyState):

    if state.get("pending_agent") is not None:
        return {}

    messages = state["messages"][-8:]

    try:
        response = orchestrator_llm.invoke([
            SystemMessage(content=ORCHESTRATOR_SYSTEM_PROMPT),
            *messages
        ])

        # Low confidence → fallback
        if response.confidence < 0.5:
            return {
                "intent": "none",
                "confidence_score": response.confidence
            }

        return {
            "intent": response.intent.value,
            "confidence_score": response.confidence
        }

    except Exception as e:
        print("ORCHESTRATOR ERROR:", e)

        return {
            "intent": "none",
            "confidence_score": 0.0
        }