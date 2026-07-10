from langchain_core.tools import tool

from app.schema.hotel_schema import HotelSchema
from app.services.hotel_selection_service import HotelSelectionService


hotel_selection_service = HotelSelectionService()


@tool
def select_hotel(
    hotel_id: int,
    search_results: list[HotelSchema],
) -> dict:
    """
    Select one hotel from the previously searched hotels.

    Args:
        hotel_id: ID of the hotel selected by the user.
        search_results: Hotels returned from the previous search.
    """

    selected_hotel = hotel_selection_service.select_hotel(
        hotel_id=hotel_id,
        search_results=search_results,
    )

    return {
        "selected_hotel": selected_hotel.model_dump()
    }