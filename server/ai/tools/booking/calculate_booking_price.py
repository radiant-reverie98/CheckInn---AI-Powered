from langchain.tools import tool
from datetime import date

@tool
def calculate_booking_price(
    price_per_night: float,
    start_date: date,
    end_date: date,
) -> dict:
    """
    Calculate the total price for a hotel booking.

    Use this tool after the user has selected a room.
    """

    nights = (end_date - start_date).days

    if nights <= 0:
        return {
            "success": False,
            "message": "INVALID_STAY_DATES"
        }

    subtotal = price_per_night * nights

    return {
        "success": True,
        "nights": nights,
        "price_per_night": price_per_night,
        "subtotal": subtotal,
        "total_amount": subtotal,
        "message": "PRICE_CALCULATED"
    }