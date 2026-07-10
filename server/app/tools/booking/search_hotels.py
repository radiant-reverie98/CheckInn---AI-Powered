from langchain_core.tools import tool

from app.schema.booking_schema import BookingSchema
from app.schema.hotel_search_filter_schema import HotelSearchFilter
from app.services.hotel_search_service import HotelSearchService


hotel_search_service = HotelSearchService()


@tool
def search_hotels(
    booking: BookingSchema,
):
    """
    Search hotels based on the current booking information.
    """

    filters = HotelSearchFilter(
        destination=booking.destination,
        check_in=booking.check_in,
        check_out=booking.check_out,
        adults=booking.no_of_adults,
        minors=booking.no_of_minors,
        rooms=booking.no_of_rooms,
        max_price=booking.budget,
    )

    return [
        hotel.model_dump()
        for hotel in hotel_search_service.search_hotels(filters)
    ]