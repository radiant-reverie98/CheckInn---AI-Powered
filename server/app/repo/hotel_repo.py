from app.data.hotels import HOTELS
from app.schema.hotel_schema import HotelSchema
from app.schema.hotel_search_filter_schema import HotelSearchFilter


class HotelRepository:

    def search_hotels(
        self,
        filters: HotelSearchFilter,
    ) -> list[HotelSchema]:

        hotels = HOTELS

        if filters.destination:
            hotels = [
                hotel
                for hotel in hotels
                if hotel.city.lower() == filters.destination.lower()
            ]

        if filters.max_price is not None:
            hotels = [
                hotel
                for hotel in hotels
                if hotel.price_per_night <= filters.max_price
            ]

        if filters.min_rating is not None:
            hotels = [
                hotel
                for hotel in hotels
                if hotel.average_rating >= filters.min_rating
            ]

        if filters.star_rating is not None:
            hotels = [
                hotel
                for hotel in hotels
                if hotel.star_rating == filters.star_rating
            ]

        if filters.amenities:
            hotels = [
                hotel
                for hotel in hotels
                if all(
                    amenity.lower() in (
                        hotel_amenity.lower()
                        for hotel_amenity in hotel.amenities
                    )
                    for amenity in filters.amenities
                )
            ]

        return hotels

    def get_hotel_by_id(
        self,
        hotel_id: int,
    ) -> HotelSchema | None:

        return next(
            (
                hotel
                for hotel in HOTELS
                if hotel.id == hotel_id
            ),
            None,
        )

    def get_hotel_by_name(
        self,
        hotel_name: str,
    ) -> HotelSchema | None:

        hotel_name = hotel_name.lower().strip()

        return next(
            (
                hotel
                for hotel in HOTELS
                if hotel.name.lower() == hotel_name
            ),
            None,
        )