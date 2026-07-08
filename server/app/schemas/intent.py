from enum import Enum
from pydantic import BaseModel, Field

class Intent(str,Enum):
    HOTEL_BOOKING = "hotel_booking",
    HOTEL_SEARCH = "hotel_search"
    BOOKING_STATUS = "booking_status"
    CANCEL_BOOKING = "cancel_booking"
    REFUND = "refund"
    OWNER_SUPPORT = "owner_support"
    CUSTOMER_SUPPORT = "customer_support"
    GREETING = "greeting"
    CHIT_CHAT = "chit_chat"
    UNKNOWN = "unknown"

class DetectedIntent(BaseModel):
    """
    Represents one detected intent from the user's message.
    """

    intent: Intent = Field(
        description="The detected user intent."
    )

    confidence: float = Field(
        ge=0.0,
        le=1.0,
        description="Confidence score between 0 and 1."
    )


class IntentDetection(BaseModel):
    """
    Collection of all detected intents.
    """

    intents: list[DetectedIntent] = Field(
        description="List of intents detected in the user's message, ordered from highest to lowest priority."
    )
    