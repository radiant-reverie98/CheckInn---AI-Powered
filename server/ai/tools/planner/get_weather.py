import os
import requests

from datetime import datetime, timedelta
from collections import Counter

from dotenv import load_dotenv
from langchain.tools import tool

load_dotenv()


def format_weather(data: dict, start_date: str, duration: int):
    """
    Converts OpenWeather's 3-hour forecast into
    itinerary-friendly morning/afternoon/evening summaries.
    """

    # Convert string date -> Python date
    start = datetime.strptime(start_date, "%Y-%m-%d").date()

    # Generate all travel dates
    travel_dates = {
        str(start + timedelta(days=i))
        for i in range(duration)
    }

    # Temporary structure for collecting multiple readings
    forecast = {}

    for item in data["list"]:

        date, time = item["dt_txt"].split(" ")

        # Ignore weather outside user's travel dates
        if date not in travel_dates:
            continue

        hour = int(time.split(":")[0])

        # Divide day into itinerary-friendly periods
        if 5 <= hour < 12:
            period = "morning"

        elif 12 <= hour < 17:
            period = "afternoon"

        elif 17 <= hour < 22:
            period = "evening"

        else:
            continue

        if date not in forecast:
            forecast[date] = {}

        if period not in forecast[date]:
            forecast[date][period] = []

        forecast[date][period].append(
            {
                "temperature": item["main"]["temp"],
                "condition": item["weather"][0]["description"],
                "rain_probability": item["pop"] * 100,
            }
        )

    # --------------------------------------------------
    # Aggregate multiple 3-hour readings
    # --------------------------------------------------

    formatted_forecast = {}

    for date, periods in forecast.items():

        formatted_forecast[date] = {}

        for period, readings in periods.items():

            temperatures = [
                reading["temperature"]
                for reading in readings
            ]

            rain_probabilities = [
                reading["rain_probability"]
                for reading in readings
            ]

            conditions = [
                reading["condition"]
                for reading in readings
            ]

            # Most frequently occurring weather condition
            dominant_condition = Counter(conditions).most_common(1)[0][0]

            formatted_forecast[date][period] = {
                "avg_temperature": round(
                    sum(temperatures) / len(temperatures),
                    1
                ),

                "max_rain_probability": round(
                    max(rain_probabilities)
                ),

                "condition": dominant_condition,
            }

    return {
        "location": data["city"]["name"],
        "country": data["city"]["country"],
        "start_date": start_date,
        "duration": duration,
        "forecast": formatted_forecast,
    }


@tool
def get_weather(
    destination: str,
    start_date: str,
    duration: int
):
    """
    Get weather forecast for a trip.

    Args:
        destination:
            Destination where the user is travelling.

        start_date:
            Starting date of the trip.
            Must be in YYYY-MM-DD format.

        duration:
            Number of days the user will stay at the destination.

    Returns:
        Weather forecast divided into morning,
        afternoon and evening for the travel dates.
    """

    url = "https://api.openweathermap.org/data/2.5/forecast"

    params = {
        "q": destination,
        "appid": os.getenv("OPEN_WEATHER_API_KEY"),
        "units": "metric",
    }

    try:
        response = requests.get(
            url,
            params=params,
            timeout=10
        )

        response.raise_for_status()

        data = response.json()

    except requests.RequestException as e:
        return {
            "error": f"Unable to fetch weather data: {str(e)}"
        }

    # Validate OpenWeather response
    if "list" not in data:
        return {
            "error": "Weather forecast is unavailable for this destination."
        }

    try:
        useful_weather = format_weather(
            data=data,
            start_date=start_date,
            duration=duration
        )

    except ValueError:
        return {
            "error": "start_date must be in YYYY-MM-DD format."
        }

    # Requested dates may be outside OpenWeather forecast range
    if not useful_weather["forecast"]:
        return {
            "location": data["city"]["name"],
            "error": (
                "Weather forecast is not available for the requested "
                "travel dates because they are outside the forecast range."
            )
        }

    return useful_weather