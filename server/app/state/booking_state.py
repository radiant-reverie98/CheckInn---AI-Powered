from typing import Annotated

from langchain_core.messages import AnyMessage
from langgraph.graph.message import add_messages
from typing_extensions import TypedDict

from app.schema.booking_schema import BookingSchema
from app.schema.hotel_schema import HotelSchema



class BookingState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]

    booking: BookingSchema

    search_results: list[HotelSchema]

    selected_hotel: HotelSchema | None

    