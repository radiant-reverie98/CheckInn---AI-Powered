from datetime import date
from langchain_core.tools import tool
from pydantic import BaseModel, Field

from database import search_rooms_db

class RoomSearchResult(BaseModel):
    success: bool = Field(description="Whether matching rooms were found")
    rooms: list[dict] = Field(default_factory=list)
    message: str

@tool
def search_rooms(
    hotel_id: int,
    start_date: date,
    end_date: date,
    num_guests: int,
) -> RoomSearchResult:
    """Search available rooms in a selected hotel."""
    results = search_rooms_db(hotel_id, num_guests)

    if not results:
        return RoomSearchResult(
            success=False,
            rooms=[],
            message="NO_AVAILABLE_ROOMS",
        )

    return RoomSearchResult(
        success=True,
        rooms=results,
        message="ROOMS_FOUND",
    )
