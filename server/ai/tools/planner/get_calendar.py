from langchain.tools import tool
from datetime import datetime, timedelta
from dotenv import load_dotenv
import requests
import os

load_dotenv()


@tool
def get_calendar(
    start_date: str,
    duration: int,
    country_code: str
):
    """
    Returns weekday, weekend, and public holiday information
    for the requested trip dates.

    Args:
        start_date: Trip start date in YYYY-MM-DD format.
        duration: Number of days in the trip.
        country_code: ISO country code such as IN, US, GB.
    """

    # -------------------------
    # 1. Validate input
    # -------------------------

    try:
        start = datetime.strptime(
            start_date,
            "%Y-%m-%d"
        ).date()

    except ValueError:
        return {
            "error": (
                f"Invalid start_date '{start_date}'. "
                "Expected YYYY-MM-DD."
            )
        }

    if duration <= 0:
        return {
            "error": "Duration must be greater than 0."
        }

    api_key = os.getenv("CALENDARIFIC_API_KEY")

    if not api_key:
        return {
            "error": "CALENDARIFIC_API_KEY is missing."
        }

    try:

        end = start + timedelta(days=duration - 1)

        # Handles trips crossing New Year
        years = range(start.year, end.year + 1)

        holidays = {}

        # -------------------------
        # 2. Fetch holiday data
        # -------------------------

        for year in years:

            url = "https://calendarific.com/api/v2/holidays"

            params = {
                "api_key": api_key,
                "country": country_code.upper(),
                "year": year,
                "type": "national"
            }

            response = requests.get(
                url,
                params=params,
                timeout=10
            )

            response.raise_for_status()

            data = response.json()

            holiday_data = (
                data
                .get("response", {})
                .get("holidays", [])
            )

            # -------------------------
            # 3. Store holidays by date
            # -------------------------

            for holiday in holiday_data:

                holiday_date = (
                    holiday
                    .get("date", {})
                    .get("iso")
                )

                if not holiday_date:
                    continue

                # Some APIs may include time information
                holiday_date = holiday_date[:10]

                holidays.setdefault(
                    holiday_date,
                    []
                ).append({
                    "name": holiday.get("name"),
                    "type": holiday.get("type", [])
                })

        # -------------------------
        # 4. Build trip calendar
        # -------------------------

        calendar = {}

        for i in range(duration):

            current_date = start + timedelta(days=i)

            date_string = current_date.isoformat()

            day_holidays = holidays.get(
                date_string,
                []
            )

            calendar[date_string] = {
                "day": current_date.strftime("%A"),

                "is_weekend": (
                    current_date.weekday() >= 5
                ),

                "is_holiday": bool(day_holidays),

                "holidays": day_holidays
            }

        # -------------------------
        # 5. Return compact context
        # -------------------------

        return {
            "country_code": country_code.upper(),
            "start_date": start.isoformat(),
            "end_date": end.isoformat(),
            "duration": duration,
            "calendar": calendar
        }

    except requests.RequestException as e:

        return {
            "error": (
                f"Holiday API request failed: {str(e)}"
            )
        }

    except Exception as e:

        return {
            "error": (
                f"Calendar processing failed: "
                f"{type(e).__name__}: {str(e)}"
            )
        }


if __name__ == "__main__":

    from rich import print

    result = get_calendar.invoke({
        "start_date": "2026-08-14",
        "duration": 3,
        "country_code": "IN"
    })

    print(result)