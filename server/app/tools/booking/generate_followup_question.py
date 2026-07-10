from langchain_core.tools import tool

from app.services.generate_followup_question_service import (
    generate_followup_question_service,
)
from app.schema.booking_schema import BookingSchema


@tool
def generate_followup_question(
    booking_entities: BookingSchema,
) -> str:
    """
    Generate a natural follow-up question to collect missing booking information.

    Ask only one question at a time.
    Do not ask for information that has already been provided.
    """

    return generate_followup_question_service(booking_entities)