from state.sally_state import SallyState
from langchain_core.messages import AIMessage


def booking_summary_node(state: SallyState):
    hotel_id = state.get("selected_hotel_id")
    room_id = state.get("selected_room_id")
    hotel = next((h for h in state.get("hotels", []) if h.get("hotel_id") == hotel_id), None)
    room = next((r for r in state.get("rooms", []) if r.get("room_id") == room_id), None)
    if not hotel or not room:
        return {"messages": [AIMessage(content="I selected the room, but I could not build the booking summary yet.")]}

    check_in = state.get("start_date")
    check_out = state.get("end_date")
    nights = (check_out - check_in).days if check_in and check_out else 1
    total = float(room.get("price_per_night", 0)) * max(nights, 1)
    summary = {
        "destination": state.get("destination"), "check_in": check_in, "check_out": check_out,
        "num_guests": state.get("num_guests"), "hotel": hotel, "room": room,
        "nights": nights, "total": total,
    }
    return {
        "booking_summary": summary,
        "booking_total": total,
        "num_nights": nights,
        "messages": [AIMessage(content=f"Great choice! {hotel['name']} — {room['room_type']} is selected. {nights} night(s) comes to ₹{total:,.0f}. You can now confirm the booking.")],
    }
