from pydantic import BaseModel, Field
from typing import Optional, Any
from enum import Enum


class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"
    FAILED = "failed"


class PaymentStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    REFUNDED = "refunded"
    
    
class BookingSchema(BaseModel):

    hotel_id: Optional[int] = Field(
        default=None,
        description="Unique ID of the hotel selected by the user"
    )

    room_id: Optional[int] = Field(
        default=None,
        description="Unique ID of the room selected by the user"
    )

    selected_hotel: Optional[dict[str, Any]] = Field(
        default=None,
        description="Details of the hotel selected by the user"
    )

    selected_room: Optional[dict[str, Any]] = Field(
        default=None,
        description="Details of the room selected by the user"
    )

    total_amount: Optional[float] = Field(
        default=None,
        ge=0,
        description="Final amount payable for the booking"
    )

    booking_id: Optional[str] = Field(
        default=None,
        description="Unique booking ID generated after successful booking"
    )

    booking_status: Optional[BookingStatus] = Field(
        default=None,
        description="Current status of the booking"
    )

    payment_status: Optional[PaymentStatus] = Field(
        default=None,
        description="Current status of the booking payment"
    )