from typing import TypedDict, Optional, Annotated
from datetime import date
from langgraph.graph import add_messages
from langchain_core.messages import BaseMessage


class SallyState(TypedDict, total=False):
    messages: Annotated[list[BaseMessage], add_messages]
    start_date: Optional[date]
    end_date: Optional[date]
    destination: Optional[str]
    num_guests: Optional[int]
    budget: Optional[float]
    intent: Optional[str]
    confidence_score: Optional[float]
    pending_agent: Optional[str]
    hotels: Optional[list[dict]]
    rooms: Optional[list[dict]]
    selected_hotel_id: Optional[int]
    selected_room_id: Optional[int]
    booking_total: Optional[float]
    num_nights: Optional[int]
    booking_decision: Optional[str]
    booking_summary: Optional[dict]
