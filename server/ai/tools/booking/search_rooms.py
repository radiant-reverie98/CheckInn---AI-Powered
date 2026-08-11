from datetime import date
from langchain_core.tools import tool
from pydantic import BaseModel, Field


class RoomSearchResult(BaseModel):
    success: bool = Field(
        description="Whether matching rooms were found"
    )

    rooms: list[dict] = Field(
        default_factory=list,
        description="Rooms matching the search criteria"
    )

    message: str = Field(
        description="Machine-readable result of the room search"
    )


MOCK_ROOMS = [
    {
        "room_id": 1001,
        "hotel_id": 103,
        "room_type": "Deluxe Garden View",
        "price_per_night": 12500,
        "max_guests": 2,
        "available_rooms": 4,
    },
    {
        "room_id": 1002,
        "hotel_id": 103,
        "room_type": "Premier Lake View",
        "price_per_night": 16000,
        "max_guests": 3,
        "available_rooms": 2,
    },
    {
        "room_id": 1003,
        "hotel_id": 104,
        "room_type": "Deluxe Lake View",
        "price_per_night": 8500,
        "max_guests": 2,
        "available_rooms": 6,
    },
    {
        "room_id": 1004,
        "hotel_id": 104,
        "room_type": "Lake View Suite",
        "price_per_night": 14000,
        "max_guests": 3,
        "available_rooms": 2,
    },
    {
        "room_id": 1005,
        "hotel_id": 105,
        "room_type": "Palace Room",
        "price_per_night": 9500,
        "max_guests": 2,
        "available_rooms": 5,
    },
]


@tool
def search_rooms(
    hotel_id: int,
    start_date: date,
    end_date: date,
    num_guests: int,
) -> RoomSearchResult:
    """
    Search for available rooms in a selected hotel.

    Use this tool after the user has selected a hotel.

    Args:
        hotel_id: Unique ID of the selected hotel.
        start_date: User's check-in date.
        end_date: User's check-out date.
        num_guests: Number of guests staying.

    Returns:
        Rooms that can accommodate the requested number of guests.
    """

    results = []

    for room in MOCK_ROOMS:

        if room["hotel_id"] != hotel_id:
            continue

        if room["max_guests"] < num_guests:
            continue

        if room["available_rooms"] <= 0:
            continue

        results.append(room)

    if not results:
        return RoomSearchResult(
            success=False,
            rooms=[],
            message="NO_AVAILABLE_ROOMS"
        )

    return RoomSearchResult(
        success=True,
        rooms=results,
        message="ROOMS_FOUND"
    )