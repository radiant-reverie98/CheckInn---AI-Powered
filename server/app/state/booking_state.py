from typing import Annotated

from langchain_core.messages import AnyMessage
from langgraph.graph.message import add_messages
from typing_extensions import TypedDict

from app.schema.booking_schema import BookingSchema


class BookingState(TypedDict):
    # Complete conversation within the Booking Agent
    messages: Annotated[list[AnyMessage], add_messages]

    # Structured booking information
    booking_entities: BookingSchema

    # Hotel search results
    search_results: list

    # Selected hotel (after user chooses one)
    selected_hotel: dict | None

    # Current stage of booking
    booking_stage: str