from pydantic import BaseModel, ConfigDict, Field


class HotelSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(
        description="Unique hotel identifier"
    )

    name: str = Field(
        description="Hotel name"
    )

    city: str = Field(
        description="City where the hotel is located"
    )

    address: str = Field(
        description="Complete hotel address"
    )

    description: str = Field(
        description="Hotel description"
    )

    star_rating: int = Field(
        ge=1,
        le=5,
        description="Official hotel star rating"
    )

    average_rating: float = Field(
        ge=0,
        le=5,
        description="Average guest rating"
    )

    price_per_night: float = Field(
        gt=0,
        description="Price per night in INR"
    )

    available_rooms: int = Field(
        ge=0,
        description="Number of rooms currently available"
    )

    thumbnail: str | None = Field(
        default=None,
        description="Hotel thumbnail image URL"
    )

    amenities: list[str] = Field(
        default_factory=list,
        description="List of hotel amenities"
    )