from datetime import date

from app.repo.hotel_repo import HotelRepository
from app.schema.hotel_schema import HotelSchema
from app.schema.hotel_search_filter_schema import HotelSearchFilter


class HotelSearchService:

    def __init__(self):
        self.repository = HotelRepository()

    def search_hotels(
        self,
        filters: HotelSearchFilter,
    ) -> list[HotelSchema]:

        self._validate_filters(filters)

        hotels = self.repository.search_hotels(filters)

        hotels = self._sort_hotels(hotels)

        return hotels

    def _validate_filters(
        self,
        filters: HotelSearchFilter,
    ) -> None:

        if not filters.destination:
            raise ValueError("Destination is required.")

        if not filters.check_in:
            raise ValueError("Check-in date is required.")

        if not filters.check_out:
            raise ValueError("Check-out date is required.")

        if filters.check_in >= filters.check_out:
            raise ValueError(
                "Check-out date must be after check-in date."
            )

        if filters.adults is None:
            raise ValueError("Number of adults is required.")

        if filters.adults <= 0:
            raise ValueError(
                "At least one adult is required."
            )

        if filters.minors is not None and filters.minors < 0:
            raise ValueError(
                "Number of minors cannot be negative."
            )

        if filters.rooms is not None and filters.rooms <= 0:
            raise ValueError(
                "Number of rooms must be at least 1."
            )

        if (
            filters.max_price is not None
            and filters.max_price <= 0
        ):
            raise ValueError(
                "Maximum price must be greater than 0."
            )

        if (
            filters.min_rating is not None
            and not (0 <= filters.min_rating <= 5)
        ):
            raise ValueError(
                "Minimum rating must be between 0 and 5."
            )

        if (
            filters.star_rating is not None
            and not (1 <= filters.star_rating <= 5)
        ):
            raise ValueError(
                "Star rating must be between 1 and 5."
            )

    def _sort_hotels(
        self,
        hotels: list[HotelSchema],
    ) -> list[HotelSchema]:

        return sorted(
            hotels,
            key=lambda hotel: (
                hotel.average_rating,
                -hotel.price_per_night,
            ),
            reverse=True,
        )