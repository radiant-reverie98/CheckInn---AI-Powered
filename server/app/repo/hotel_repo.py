from app.schema.hotel_search_filter_schema import HotelSearchFilter
from app.schema.hotel_schema import HotelSchema
from app.data.hotels import HOTELS
class HotelRepository:

    def search_hotels(
        self,
        filters: HotelSearchFilter,
    ) -> list[HotelSchema]:

        hotels = HOTELS

        if filters.destination:
            hotels = [
                hotel for hotel in hotels
                if hotel.city.lower() == filters.destination.lower()
            ]

        if filters.max_price:
            hotels = [
                hotel for hotel in hotels
                if hotel.price_per_night <= filters.max_price
            ]

        if filters.min_rating:
            hotels = [
                hotel for hotel in hotels
                if hotel.average_rating >= filters.min_rating
            ]

        if filters.star_rating:
            hotels = [
                hotel for hotel in hotels
                if hotel.star_rating == filters.star_rating
            ]

        if filters.amenities:
            hotels = [
                hotel for hotel in hotels
                if all(
                    amenity in hotel.amenities
                    for amenity in filters.amenities
                )
            ]

        return hotels