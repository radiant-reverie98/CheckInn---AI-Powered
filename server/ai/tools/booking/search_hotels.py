from typing import Optional
from langchain_core.tools import tool
from pydantic import BaseModel, Field


class HotelSearchResult(BaseModel):
    success: bool = Field(
        description="Whether hotels matching the search criteria were found"
    )

    hotels: list[dict] = Field(
        default_factory=list,
        description="Hotels matching the search criteria"
    )

    message: str = Field(
        description="Machine-readable explanation of the search result"
    )







@tool
def search_hotels(
    destination: str,
    budget: Optional[float] = None,
) -> HotelSearchResult:
    """
    Search hotels by destination and optional maximum price per night.
    """

    results = []

    for hotel in MOCK_HOTELS:

        if hotel["city"].lower() != destination.lower():
            continue

        if budget is not None and hotel["price_per_night"] > budget:
            continue

        results.append(hotel)

    if not results:
        return HotelSearchResult(
            success=False,
            hotels=[],
            message="NO_MATCHING_HOTELS"
        )

    return HotelSearchResult(
        success=True,
        hotels=results,
        message="HOTELS_FOUND"
    )

