from tools.booking.search_rooms import search_rooms
from tools.booking.search_hotels import search_hotels
from tools.booking.select_room import select_room
from llm import get_llm
from state.sally_state import SallyState
from langchain.agents import create_agent
from langchain_core.messages import ToolMessage
import json

BOOKING_AGENT_PROMPT = """
You are Sally's Booking Agent for CheckInn. Help users discover hotels, select a hotel, discover rooms, and select a room.

Context:
Destination: {destination}
Check-in: {start_date}
Check-out: {end_date}
Guests: {num_guests}
Budget: {budget}
Selected hotel: {selected_hotel_id}
Selected room: {selected_room_id}

Rules:
- Use search_hotels when hotels are needed. Never invent hotels or IDs.
- Only call search_rooms after the user selects a hotel returned by search_hotels.
- Only call select_room after the user explicitly selects a room returned by search_rooms.
- Natural references like "the first one", "cheapest", "Premier", or "Hotel Lakend" are valid when they uniquely match the previously displayed options.
- Do not create bookings, process payments, or claim a booking is confirmed.
- Keep responses concise and conversational.
"""


def booking_agent_node(state: SallyState):
    system_prompt = BOOKING_AGENT_PROMPT.format(
        destination=state.get("destination"), start_date=state.get("start_date"),
        end_date=state.get("end_date"), num_guests=state.get("num_guests"),
        budget=state.get("budget"), selected_hotel_id=state.get("selected_hotel_id"),
        selected_room_id=state.get("selected_room_id"),
    )
    agent = create_agent(model=get_llm, tools=[search_hotels, search_rooms, select_room], system_prompt=system_prompt)
    result = agent.invoke({"messages": state["messages"]})
    updates = {"messages": [result["messages"][-1]]}

    for message in result["messages"]:
        if isinstance(message, ToolMessage):
            payload = message.content
            try:
                if isinstance(payload, str):
                    payload = json.loads(payload)
            except Exception:
                payload = None
            if not isinstance(payload, dict):
                continue
            if message.name == "search_hotels":
                updates["hotels"] = payload.get("hotels", [])
            elif message.name == "search_rooms":
                updates["rooms"] = payload.get("rooms", [])

        for tool_call in getattr(message, "tool_calls", []) or []:
            if tool_call["name"] == "search_rooms":
                updates["selected_hotel_id"] = tool_call["args"].get("hotel_id")
            elif tool_call["name"] == "select_room":
                updates["selected_room_id"] = tool_call["args"].get("room_id")

    return updates
