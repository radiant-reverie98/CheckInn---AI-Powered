from app.providers.email_provider import EmailProvider
from app.schema.booking_summary_sechma import BookingSummary


class BookingEmailService:

    def __init__(
        self,
        email_provider: EmailProvider,
    ):
        self.email_provider = email_provider

    def send_booking_confirmation(
        self,
        recipient_email: str,
        summary: BookingSummary,
    ):

        subject = (
            f"Your booking at {summary.hotel.name} is confirmed!"
        )

        html = self._build_html(summary)

        return self.email_provider.send_email(
            to=recipient_email,
            subject=subject,
            html=html,
        )

    def _build_html(
        self,
        summary: BookingSummary,
    ) -> str:

        booking = summary.booking
        hotel = summary.hotel

        return f"""
        <html>
            <body style="font-family: Arial, sans-serif;">

                <h2>🎉 Booking Confirmed!</h2>

                <p>
                    Thank you for choosing <strong>CheckInn</strong>.
                    Your booking has been successfully confirmed.
                </p>

                <hr>

                <h3>Hotel Details</h3>

                <p>
                    <strong>{hotel.name}</strong><br>
                    {hotel.address}<br>
                    {hotel.city}
                </p>

                <hr>

                <h3>Booking Details</h3>

                <table cellpadding="8">

                    <tr>
                        <td><strong>Check-in</strong></td>
                        <td>{booking.check_in}</td>
                    </tr>

                    <tr>
                        <td><strong>Check-out</strong></td>
                        <td>{booking.check_out}</td>
                    </tr>

                    <tr>
                        <td><strong>Adults</strong></td>
                        <td>{booking.no_of_adults}</td>
                    </tr>

                    <tr>
                        <td><strong>Minors</strong></td>
                        <td>{booking.no_of_minors}</td>
                    </tr>

                    <tr>
                        <td><strong>Rooms</strong></td>
                        <td>{booking.no_of_rooms}</td>
                    </tr>

                    <tr>
                        <td><strong>Total Nights</strong></td>
                        <td>{summary.total_nights}</td>
                    </tr>

                    <tr>
                        <td><strong>Total Price</strong></td>
                        <td>₹{summary.total_price}</td>
                    </tr>

                </table>

                <hr>

                <p>
                    We wish you a wonderful stay!
                </p>

                <p>
                    — Team CheckInn
                </p>

            </body>
        </html>
        """