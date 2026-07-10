from pydantic import BaseModel
from datetime import date

class HotelSearchFilter(BaseModel):
    destination: str | None = None
    amenities: list[str] = []
    max_price: float | None = None
    min_rating: float | None = None
    star_rating: int | None = None
    adults: int | None = None
    minors: int | None = None
    rooms: int | None = None
    check_in: date | None = None
    check_out: date | None = None