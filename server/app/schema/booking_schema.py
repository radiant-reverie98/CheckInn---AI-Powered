from typing import Optional
from datetime import date

from pydantic import BaseModel, Field,EmailStr


class BookingSchema(BaseModel):
    email: EmailStr | None = Field(
    default=None,
    description="Customer's email address."
)
    destination: Optional[str] = Field(
        default=None,
        description="City or destination where the user wants to stay."
    )

    selected_hotel: Optional[str] = Field(
        default=None,
        description="Specific hotel name mentioned by the user."
    )

    check_in: Optional[date] = Field(
        default=None,
        description="User's hotel check-in date."
    )

    check_out: Optional[date] = Field(
        default=None,
        description="User's hotel check-out date."
    )

    no_of_adults: Optional[int] = Field(
        default=None,
        description="Number of adults staying.",ge=1
    )
    no_of_minors: Optional[int] = Field(
        default=None,
        description="Number of minors staying.",ge=0
    )

    no_of_rooms: Optional[int] = Field(
        default=None,
        description="Number of rooms requested.",ge=1
    )

    budget: Optional[float] = Field(
        default=None,
        description="Maximum budget for the hotel booking.",ge=0
    )

    class Config:
        extra = "ignore"
    
    def merge(self, other: "BookingSchema") -> "BookingSchema":
        data = self.model_dump()

        for key, value in other.model_dump().items():
            if value is not None:
                data[key] = value

        return BookingSchema(**data)