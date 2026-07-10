from langchain_core.tools import tool

from app.schema.booking_schema import BookingSchema
from app.services.booking_entity_extractor import extract_booking_entities_service


@tool
def extract_booking_entities(
    user_message: str,
    current_entities: BookingSchema,
) -> BookingSchema:
    """
    Extract booking entities from the user's latest message.

    Returns the updated booking entities by merging the newly extracted
    information with the existing booking entities.

    Existing values are preserved unless the user explicitly updates them.
    """

    extracted_entities = extract_booking_entities_service(
        user_message=user_message,
        current_entities=current_entities,
    )

    return current_entities.merge(extracted_entities)