from pydantic import BaseModel, Field
from enum import Enum


class IntentType(str, Enum):
    BOOKING = "booking_agent"
    CUSTOMER_SUPPORT = "customer_support_agent"
    PLANNER = "planner_agent"
    


class OrchestratorIntent(BaseModel):
    intent: IntentType = Field(
        
        description=(
            "The single agent that should handle the user's latest message. "
            "Choose 'booking_agent' if the user wants to search or browse hotels, "
            "find hotels by city, budget, dates, amenities, or rating, select a hotel "
            "or room, book a hotel, confirm a booking, modify a reservation, or check "
            "booking details. "
            "Choose 'planner_agent' if the user wants to build, modify, or discuss "
            "a trip itinerary. "
            "Choose 'customer_support_agent' if the user wants to cancel a booking, "
            "request a refund, file a complaint, or write or edit a review. "
            
        ),
    )

    confidence: float = Field(
        default=0.0,
        ge=0.0,
        le=1.0,
        description=(
            "Confidence that the selected intent is correct, from 0.0 to 1.0. "
            "Use 0.9-1.0 when the message clearly maps to one agent. "
            "Use 0.5-0.8 when the intent is reasonable but somewhat ambiguous. "
            "Use below 0.5 when the intent is unclear; in that case, prefer 'none'."
        ),
    )