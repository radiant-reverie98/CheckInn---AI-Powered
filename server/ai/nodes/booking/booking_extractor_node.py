from entities.booking_entities import BookingEntities
from llm import get_llm
from langchain_core.messages import HumanMessage
from state.sally_state import SallyState
from agents.booking_entities_extractor_agent import booking_extractor_agent










def booking_entity_extractor(state: SallyState):

    latest_message = next(
        message
        for message in reversed(state["messages"])
        if isinstance(message, HumanMessage)
    )
    # print(latest_message)
    result = booking_extractor_agent.invoke({
        "messages": [latest_message]
    })

    extracted = result["structured_response"]

    print("EXTRACTED:", extracted)

    updates = {}

    if extracted.destination is not None:
        updates["destination"] = extracted.destination

    if extracted.start_date is not None:
        updates["start_date"] = extracted.start_date

    if extracted.end_date is not None:
        updates["end_date"] = extracted.end_date

    if extracted.num_guests is not None:
        updates["num_guests"] = extracted.num_guests

    if extracted.budget is not None:
        updates["budget"] = extracted.budget

    return updates