from app.schema.hotel_schema import HotelSchema


class HotelSelectionService:

    def select_hotel(
        self,
        hotel_id: int,
        search_results: list[HotelSchema],
    ) -> HotelSchema:

        for hotel in search_results:
            if hotel.id == hotel_id:
                return hotel

        raise ValueError("Selected hotel not found.")