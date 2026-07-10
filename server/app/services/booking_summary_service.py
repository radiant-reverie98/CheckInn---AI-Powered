from app.schema.booking_schema import BookingSchema
from app.schema.booking_summary_sechma import BookingSummary
from app.schema.hotel_schema import HotelSchema


class BookingSummaryService:

    def generate_summary(
        self,
        booking: BookingSchema,
        selected_hotel: HotelSchema,
    ) -> BookingSummary:

        total_nights = (
            booking.check_out - booking.check_in
        ).days

        total_price = (
            total_nights * selected_hotel.price_per_night
        )

        return BookingSummary(
            hotel=selected_hotel,
            booking=booking,
            total_nights=total_nights,
            total_price=total_price,
        )