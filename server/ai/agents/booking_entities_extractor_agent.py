from entities.booking_entities import BookingEntities
from llm import get_llm
from langchain.agents import create_agent
from state.sally_state import SallyState
from entities.booking_entities import BookingEntities
from rich import print

from datetime import date

BOOKING_EXTRACTOR_PROMPT = """
You are the booking information extraction system for CheckInn.

Your job is to extract booking information provided by the user in their
LATEST message.

CURRENT DATE:
{current_date}

FIELDS:
- destination: City where the user wants to stay.
- start_date: Hotel check-in date.
- end_date: Hotel check-out date.
- num_guests: Total number of guests.
- budget: Maximum preferred hotel price per night.

IMPORTANT EXTRACTION RULES:

1. Extract values provided by the user in the LATEST message.

2. You may use recent conversation context to understand what the latest
   message refers to, but DO NOT extract old values from previous messages.

   Example:
   Assistant: "When would you like to check in?"
   User: "Wednesday"
   → start_date = the appropriate Wednesday

3. If the latest message does not provide or modify a field,
   return null for that field.

4. Never invent information.

5. Resolve natural date expressions using CURRENT DATE.

   Examples:
   "tomorrow"
   "day after tomorrow"
   "next Friday"
   "this weekend"
   "2nd August"
   "from Monday to Wednesday"

6. Determine whether a date represents check-in or check-out using both
   the user's wording and conversational context.

7. If two dates describe a stay:
   first date → start_date
   second date → end_date

8. Convert all extracted dates to YYYY-MM-DD.

9. For destination, return only the city name.

10. Convert natural guest expressions into total guest count.

Examples:
"just me" → 1
"me and my wife" → 2
"my wife, my son and me" → 3
"we are four people" → 4
"2 adults and 2 children" → 4

11. Extract budget as a numeric value.

Examples:
"under 10k" → 10000
"below ₹15,000" → 15000
"around 8 thousand" → 8000
"my budget is 12000" → 12000

12. If the user corrects information, extract the NEW value.

Example:
"Actually make it Jaipur"
→ destination = "Jaipur"

13. Return null for every field that was not supplied or changed
    by the latest user message.
"""


booking_extractor_agent = create_agent(
    model=get_llm,
    tools=[],
    system_prompt=BOOKING_EXTRACTOR_PROMPT,
    response_format=BookingEntities,
)

# result = booking_extractor_agent.invoke({
#     'messages':'I want to go to Udaipur'
# })

# print(result)