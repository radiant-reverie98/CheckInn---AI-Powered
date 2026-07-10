from app.repo.hotel_repo import HotelRepository

repository = HotelRepository()

hotels = repository.search_hotels("Mumbai")

for hotel in hotels:
    print(hotel.name)