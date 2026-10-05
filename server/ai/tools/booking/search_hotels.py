from typing import Optional
from langchain_core.tools import tool
from pydantic import BaseModel, Field

from database import search_hotels_db

class HotelSearchResult(BaseModel):
    success: bool = Field(description="Whether hotels matching the search criteria were found")
    hotels: list[dict] = Field(default_factory=list)
    message: str

@tool
def search_hotels(destination: str, budget: Optional[float] = None) -> HotelSearchResult:
    """Search hotels by destination and optional maximum price per night."""
    results = search_hotels_db(destination, budget)

    if not results:
        return HotelSearchResult(
            success=False,
            hotels=[],
            message="NO_MATCHING_HOTELS",
        )

    return HotelSearchResult(
        success=True,
        hotels=results,
        message="HOTELS_FOUND",
    )
