from langchain_core.tools import tool

from app.schema.booking_schema import BookingSchema
from app.schema.hotel_schema import HotelSchema
from app.services.booking_summary_service import BookingSummaryService


booking_summary_service = BookingSummaryService()


@tool
def generate_booking_summary(
    booking: BookingSchema,
    selected_hotel: HotelSchema,
) -> dict:
    """
    Generate a booking summary before confirming the booking.
    """

    summary = booking_summary_service.generate_summary(
        booking,
        selected_hotel,
    )

    return summary.model_dump()