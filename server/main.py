import os
import sys
from datetime import date
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text

load_dotenv()
AI_DIR = os.path.join(os.path.dirname(__file__), "ai")
if AI_DIR not in sys.path:
    sys.path.insert(0, AI_DIR)

from database import init_db, engine
from graph import workflow
from langchain_core.messages import HumanMessage

init_db()
app = FastAPI(title="CheckInn API", version="1.1.0")
app.add_middleware(CORSMiddleware, allow_origins=[x.strip() for x in os.getenv("CLIENT_URL", "http://localhost:5173").split(",")], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

class ChatRequest(BaseModel):
    message: str
    thread_id: str = "default"

class BookingRequest(BaseModel):
    hotel_id: int
    room_id: int
    check_in: date
    check_out: date
    guests: int


def _auth_user(authorization: Optional[str]) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authentication required")
    return os.getenv("DEMO_USER_ID", "clerk-demo-user")

@app.get("/api/health")
def health():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as exc:
        return {"status": "error", "database": "error", "detail": str(exc)}

@app.post("/api/sally/chat")
def sally_chat(body: ChatRequest):
    if not body.message.strip():
        raise HTTPException(status_code=400, detail="message is required")
    try:
        result = workflow.invoke({"messages": [HumanMessage(content=body.message)]}, config={"configurable": {"thread_id": body.thread_id}})
        messages = result.get("messages", [])
        answer = messages[-1].content if messages else "I couldn't generate a response."
        if not isinstance(answer, str): answer = str(answer)
        return {"message": answer, "thread_id": body.thread_id, "intent": result.get("intent"), "hotels": result.get("hotels") or [], "rooms": result.get("rooms") or [], "selected_hotel_id": result.get("selected_hotel_id"), "selected_room_id": result.get("selected_room_id"), "booking_summary": result.get("booking_summary")}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Sally error: {exc}")

@app.get("/api/hotels")
def hotels(city: Optional[str] = None):
    q = "SELECT * FROM hotels"; params = {}
    if city: q += " WHERE LOWER(city)=LOWER(:city)"; params["city"] = city
    with engine.connect() as conn: return [dict(row._mapping) for row in conn.execute(text(q), params)]

@app.get("/api/hotels/{hotel_id}/rooms")
def rooms(hotel_id: int, guests: int = 1):
    with engine.connect() as conn:
        rows = conn.execute(text("SELECT * FROM rooms WHERE hotel_id=:hotel_id AND max_guests >= :guests AND available_rooms > 0 ORDER BY price_per_night"), {"hotel_id": hotel_id, "guests": guests})
        return [dict(row._mapping) for row in rows]

@app.post("/api/bookings")
def create_booking(body: BookingRequest, authorization: Optional[str] = Header(default=None)):
    user_id = _auth_user(authorization)
    if body.check_out <= body.check_in: raise HTTPException(status_code=400, detail="Check-out must be after check-in")
    if body.guests < 1: raise HTTPException(status_code=400, detail="Guests must be at least 1")
    nights = (body.check_out - body.check_in).days
    with engine.begin() as conn:
        room = conn.execute(text("SELECT r.*, h.name AS hotel_name FROM rooms r JOIN hotels h ON h.hotel_id=r.hotel_id WHERE r.room_id=:room_id AND r.hotel_id=:hotel_id"), {"room_id": body.room_id, "hotel_id": body.hotel_id}).mappings().first()
        if not room: raise HTTPException(status_code=404, detail="Hotel/room combination not found")
        if body.guests > room["max_guests"]: raise HTTPException(status_code=400, detail="Room cannot accommodate this many guests")
        if room["available_rooms"] < 1: raise HTTPException(status_code=409, detail="Room is no longer available")
        total = float(room["price_per_night"]) * nights
        result = conn.execute(text("UPDATE rooms SET available_rooms=available_rooms-1 WHERE room_id=:room_id AND available_rooms>0"), {"room_id": body.room_id})
        if result.rowcount != 1: raise HTTPException(status_code=409, detail="Room is no longer available")
        booking = conn.execute(text("INSERT INTO bookings (clerk_user_id,hotel_id,room_id,check_in,check_out,guests,total,status) VALUES (:user,:hotel,:room,:in_date,:out_date,:guests,:total,'CONFIRMED')"), {"user": user_id, "hotel": body.hotel_id, "room": body.room_id, "in_date": body.check_in, "out_date": body.check_out, "guests": body.guests, "total": total})
        return {"booking_id": booking.lastrowid, "status": "CONFIRMED", "hotel_name": room["hotel_name"], "room_type": room["room_type"], "nights": nights, "total": total}

@app.get("/api/bookings")
def my_bookings(authorization: Optional[str] = Header(default=None)):
    user_id = _auth_user(authorization)
    with engine.connect() as conn:
        rows = conn.execute(text("SELECT b.*, h.name AS hotel_name, r.room_type FROM bookings b JOIN hotels h ON h.hotel_id=b.hotel_id JOIN rooms r ON r.room_id=b.room_id WHERE b.clerk_user_id=:user ORDER BY b.booking_id DESC"), {"user": user_id})
        return [dict(row._mapping) for row in rows]

@app.get("/")
def root(): return {"message": "CheckInn API is running"}
