from app.schema.booking_schema import BookingSchema


REQUIRED_BOOKING_FIELDS = [
    "destination",
    "check_in",
    "check_out",
    "no_of_adults",
    "no_of_minors",
    "selected_hotel",
]


def get_missing_booking_fields(
    booking: BookingSchema,
) -> list[str]:
    """
    Returns a list of required booking fields that are still missing.
    """

    missing_fields = []

    for field in REQUIRED_BOOKING_FIELDS:
        if getattr(booking, field) is None:
            missing_fields.append(field)

    return missing_fields