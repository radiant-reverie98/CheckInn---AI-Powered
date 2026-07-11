import os

import resend

from app.providers.email_provider import EmailProvider


class ResendProvider(EmailProvider):

    def __init__(self):
        api_key = os.getenv("RESEND_API_KEY")

        if not api_key:
            raise ValueError(
                "RESEND_API_KEY is not configured."
            )

        resend.api_key = api_key

    def send_email(
        self,
        to: str,
        subject: str,
        html: str,
    ) -> None:

        response = resend.Emails.send(
            {
                "from": "CheckInn <onboarding@resend.dev>",
                "to": [to],
                "subject": subject,
                "html": html,
            }
        )
        return response