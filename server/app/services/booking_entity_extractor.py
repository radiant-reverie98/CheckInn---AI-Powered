from datetime import datetime

from langchain_core.prompts import ChatPromptTemplate

from app.core.llm import llm
from app.schema.booking_schema import BookingSchema


structured_llm = llm.with_structured_output(BookingSchema,
                                            method="json_schema")


prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """

You are a booking entity extraction assistant.

Today's date is {current_date} ({current_day}).

Your only responsibility is to extract booking entities from the latest user message.

Extract only the information explicitly mentioned or updated in the latest user message.

Booking fields:
- destination
- selected_hotel
- check_in
- check_out
- no_of_adults
- no_of_minors
- no_of_rooms
- budget

Important instructions:
- Do NOT invent or assume information the user hasn't communicated in some form.
- However, DO interpret natural descriptions of travelers into numeric counts —
  this is extraction, not invention. Examples:
    - "me and my wife" -> no_of_adults: 2
    - "just me" / "traveling solo" -> no_of_adults: 1
    - "3 of us" -> no_of_adults: 3
    - "my family of 4" -> no_of_adults: 4 (unless kids are mentioned separately)
    - "me, my husband, and our 2 kids" -> no_of_adults: 2, no_of_minors: 2
- If the traveler count is genuinely ambiguous (e.g. "a few of us"), leave it null
  rather than guessing a specific number.
- Do NOT overwrite existing values.
- If a field is not mentioned or updated in the latest user message, leave it as null.
- Return only the newly extracted or updated fields.
- When the user gives a relative date (e.g. "this Sunday", "tomorrow", "next week",
  "in 3 days"), resolve it to an actual calendar date using today's date above.
- Assume the nearest upcoming occurrence for weekday references (e.g. "this Sunday"
  means the next Sunday from today, even if today is a Sunday).

Note:
- destination, check_in, check_out, no_of_adults and no_of_minors are required before searching hotels.
- selected_hotel is required only after the user chooses a hotel and before creating a booking.

""",
        ),
        (
            "human",
            """
Current booking information:
{current_entities}

Latest user message:
{user_message}
""",
        ),
    ]
)


def extract_booking_entities_service(
    user_message: str,
    current_entities: BookingSchema,
) -> BookingSchema:
    now = datetime.now()

    chain = prompt | structured_llm

    return chain.invoke(
        {
            "current_entities": current_entities.model_dump(),
            "user_message": user_message,
            "current_date": now.strftime("%Y-%m-%d"),
            "current_day": now.strftime("%A"),
        }
    )