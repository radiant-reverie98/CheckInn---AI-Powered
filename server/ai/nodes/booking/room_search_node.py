from state.sally_state import SallyState
from data.room import MOCK_ROOMS

def room_search_node(state: SallyState)->SallyState:
    selected_hotel_id = state['selected_hotel_id']
    
    rooms = []
    for room in MOCK_ROOMS:
        if room["hotel_id"] == selected_hotel_id:
            rooms.append(room)
    
    return {
        "rooms" : rooms
    }