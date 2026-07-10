from pydantic import BaseModel, Field

from app.schema.booking_schema import BookingSchema
from app.schema.hotel_schema import HotelSchema


class BookingSummary(BaseModel):
    hotel: HotelSchema = Field(
        description="Selected hotel."
    )

    booking: BookingSchema = Field(
        description="Booking details."
    )

    total_nights: int = Field(
        description="Total number of nights."
    )

    total_price: float = Field(
        description="Estimated total booking price."
    )