from state.sally_state import SallyState


def booking_summary_node(state: SallyState):

    selected_hotel_id = state["selected_hotel_id"]
    selected_rooms = state["selected_rooms"]

    # Find selected hotel
    selected_hotel = next(
        hotel
        for hotel in state["hotels"]
        if hotel["hotel_id"] == selected_hotel_id
    )

    # Build selected room details
    room_details = []

    for selected in selected_rooms:

        room = next(
            room
            for room in state["rooms"]
            if room["room_id"] == selected["room_id"]
        )

        room_details.append({
            **room,
            "quantity": selected["quantity"]
        })

    summary = {
        "destination": state["destination"],
        "check_in": state["start_date"],
        "check_out": state["end_date"],
        "num_guests": state["num_guests"],
        "hotel": selected_hotel,
        "rooms": room_details
    }

    return {
        "booking_summary": summary
    }
    
    