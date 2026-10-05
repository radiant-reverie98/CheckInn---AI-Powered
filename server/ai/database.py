import os
from contextlib import contextmanager

from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./checkinn.db",
)

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, pool_pre_ping=True, connect_args=connect_args)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

SCHEMA = [
    """
    CREATE TABLE IF NOT EXISTS hotels (
        hotel_id INTEGER PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        rating DECIMAL(3,2) NOT NULL,
        star_rating INT NOT NULL,
        price_per_night DECIMAL(12,2) NOT NULL,
        available_rooms INT NOT NULL DEFAULT 0
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS rooms (
        room_id INTEGER PRIMARY KEY,
        hotel_id INTEGER NOT NULL,
        room_type VARCHAR(255) NOT NULL,
        price_per_night DECIMAL(12,2) NOT NULL,
        max_guests INT NOT NULL,
        available_rooms INT NOT NULL DEFAULT 0,
        FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS bookings (
        booking_id INTEGER PRIMARY KEY AUTO_INCREMENT,
        clerk_user_id VARCHAR(255) NOT NULL,
        hotel_id INTEGER NOT NULL,
        room_id INTEGER NOT NULL,
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        guests INT NOT NULL,
        total DECIMAL(12,2) NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'CONFIRMED'
    )
    """,
]

# SQLite does not support AUTO_INCREMENT syntax.
SQLITE_BOOKINGS = SCHEMA[2].replace(
    "booking_id INTEGER PRIMARY KEY AUTO_INCREMENT",
    "booking_id INTEGER PRIMARY KEY AUTOINCREMENT",
)

def init_db():
    with engine.begin() as conn:
        conn.execute(text(SCHEMA[0]))
        conn.execute(text(SCHEMA[1]))
        conn.execute(text(SQLITE_BOOKINGS if DATABASE_URL.startswith("sqlite") else SCHEMA[2]))

        hotels = [
            (101, "Taj Lake Palace", "Udaipur", 4.8, 5, 42000, 3),
            (102, "The Leela Palace Udaipur", "Udaipur", 4.7, 5, 32000, 5),
            (103, "Trident Udaipur", "Udaipur", 4.5, 5, 12500, 8),
            (104, "Hotel Lakend", "Udaipur", 4.4, 5, 8500, 12),
            (105, "Chunda Palace", "Udaipur", 4.5, 5, 9500, 6),
        ]
        rooms = [
            (1001, 103, "Deluxe Garden View", 12500, 2, 4),
            (1002, 103, "Premier Lake View", 16000, 3, 2),
            (1003, 104, "Deluxe Lake View", 8500, 2, 6),
            (1004, 104, "Lake View Suite", 14000, 3, 2),
            (1005, 105, "Palace Room", 9500, 2, 5),
        ]

        for h in hotels:
            conn.execute(text("""
                INSERT INTO hotels
                (hotel_id,name,city,rating,star_rating,price_per_night,available_rooms)
                VALUES (:id,:name,:city,:rating,:stars,:price,:rooms)
                ON CONFLICT(hotel_id) DO NOTHING
            """ if DATABASE_URL.startswith("sqlite") else """
                INSERT IGNORE INTO hotels
                (hotel_id,name,city,rating,star_rating,price_per_night,available_rooms)
                VALUES (:id,:name,:city,:rating,:stars,:price,:rooms)
            """), dict(id=h[0],name=h[1],city=h[2],rating=h[3],stars=h[4],price=h[5],rooms=h[6]))

        for r in rooms:
            conn.execute(text("""
                INSERT INTO rooms
                (room_id,hotel_id,room_type,price_per_night,max_guests,available_rooms)
                VALUES (:id,:hotel,:type,:price,:guests,:rooms)
                ON CONFLICT(room_id) DO NOTHING
            """ if DATABASE_URL.startswith("sqlite") else """
                INSERT IGNORE INTO rooms
                (room_id,hotel_id,room_type,price_per_night,max_guests,available_rooms)
                VALUES (:id,:hotel,:type,:price,:guests,:rooms)
            """), dict(id=r[0],hotel=r[1],type=r[2],price=r[3],guests=r[4],rooms=r[5]))

def search_hotels_db(destination, budget=None):
    with engine.connect() as conn:
        q = "SELECT * FROM hotels WHERE LOWER(city)=LOWER(:city)"
        params = {"city": destination}
        if budget is not None:
            q += " AND price_per_night <= :budget"
            params["budget"] = budget
        return [dict(row._mapping) for row in conn.execute(text(q), params)]

def search_rooms_db(hotel_id, num_guests):
    with engine.connect() as conn:
        rows = conn.execute(text("""
            SELECT * FROM rooms
            WHERE hotel_id=:hotel_id
              AND max_guests >= :guests
              AND available_rooms > 0
        """), {"hotel_id": hotel_id, "guests": num_guests})
        return [dict(row._mapping) for row in rows]
