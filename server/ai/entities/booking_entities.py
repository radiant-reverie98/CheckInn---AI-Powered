from pydantic import BaseModel, Field
from typing import Optional
from datetime import date


class BookingEntities(BaseModel):

    destination: Optional[str] = Field(
        default=None,
        description="Destination city explicitly mentioned by the user"
    )

    start_date: Optional[date] = Field(
        default=None,
        description="Check-in date explicitly mentioned by the user"
    )

    end_date: Optional[date] = Field(
        default=None,
        description="Check-out date explicitly mentioned by the user"
    )

    num_guests: Optional[int] = Field(
        default=None,
        ge=1,
        description="Number of guests explicitly mentioned by the user"
    )

    budget: Optional[float] = Field(
        default=None,
        ge=0,
        description="Maximum hotel budget explicitly mentioned by the user"
    )