from langchain_core.tools import tool

from app.providers.resend_provider import ResendProvider
from app.schema.booking_summary_sechma import BookingSummary
from app.services.booking_email_service import BookingEmailService


booking_email_service = BookingEmailService(
    email_provider=ResendProvider()
)


@tool
def send_booking_email(
    recipient_email: str,
    booking_summary: BookingSummary,
) -> dict:
    """
    Send the booking confirmation email to the customer.
    """

    response = booking_email_service.send_booking_confirmation(
        recipient_email=recipient_email,
        summary=booking_summary,
    )

    return {
        "success": True,
        "provider_response": response,
    }