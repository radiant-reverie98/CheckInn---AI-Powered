from langchain_core.messages import (
    HumanMessage,
    AIMessage,
    SystemMessage
)

from state.sally_state import SallyState
from llm import get_llm
from strucutred_output.planner_agent import PlannerOutput


structured_llm = get_llm.with_structured_output(
    PlannerOutput,
    method="json_mode"
)


def planner_information_extractor_node(
    state: SallyState
) -> SallyState:

    messages = state.get("messages", [])

    # Only conversational messages.
    # DO NOT send ToolMessages back to extractor.
    conversation_messages = [
        message
        for message in messages
        if isinstance(message, (HumanMessage, AIMessage))
        and not getattr(message, "tool_calls", None)
    ]

    recent_messages = conversation_messages[-6:]

    extractor_prompt = """
You are a travel information extraction component.

Return ONLY a valid JSON object.

Your task is to extract NEW or UPDATED trip information.

Do not answer the user.
Do not create an itinerary.
Do not ask questions.

IMPORTANT:
Extract information from the user's latest request in the context
of the conversation.

If the user changes an existing value, return the NEW value.

If a field has not been newly provided or changed, return null.

Dates must use YYYY-MM-DD format.

Allowed fields:
- destination
- start_date
- end_date
- num_guests
"""

    extracted = structured_llm.invoke([
        SystemMessage(content=extractor_prompt),
        *recent_messages
    ])

    print("EXTRACTED:", extracted)

    return extracted.model_dump(
        exclude_none=True
    )