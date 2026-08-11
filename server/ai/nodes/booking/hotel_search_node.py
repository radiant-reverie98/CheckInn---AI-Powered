from data.hotel import MOCK_HOTELS
from state.sally_state import SallyState

def hotel_search_node(state: SallyState)-> SallyState:
    destination = state['destination'].lower()
    budget = state.get('budget')
    hotels = []
    for hotel in MOCK_HOTELS:
        hotel_loc = hotel['city'].lower()
        if destination == hotel_loc:
            hotel_price = hotel['price_per_night']
            if budget is not None:
                if hotel_price <= budget:
                    hotels.append(hotel)
            
            else: hotels.append(hotel)
    
    
    return {
        "hotels": hotels
    }