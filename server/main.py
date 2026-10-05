import os
import sys
from datetime import date
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

# Existing LangGraph code uses top-level imports such as "state", "nodes", etc.
AI_DIR = os.path.join(os.path.dirname(__file__), "ai")
if AI_DIR not in sys.path:
    sys.path.insert(0, AI_DIR)

from database import init_db, engine
from graph import workflow
from langchain_core.messages import HumanMessage

init_db()

app = FastAPI(title="CheckInn API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CLIENT_URL", "http://localhost:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    thread_id: str = "default"

class BookingRequest(BaseModel):
    hotel_id: int
    room_id: int
    check_in: date
    check_out: date
    guests: int
    total: float

@app.get("/api/health")
def health():
    try:
        with engine.connect() as conn:
            conn.exec_driver_sql("SELECT 1")
        return {"status": "ok", "database": "connected"}
    except Exception as exc:
        return {"status": "ok", "database": "error", "detail": str(exc)}

@app.post("/api/sally/chat")
def sally_chat(body: ChatRequest, authorization: Optional[str] = Header(default=None)):
    # Clerk is the frontend identity provider. Keep the token on the request;
    # server-side Clerk verification can be enabled with CLERK_SECRET_KEY.
    if not body.message.strip():
        raise HTTPException(status_code=400, detail="message is required")

    config = {"configurable": {"thread_id": body.thread_id}}

    try:
        result = workflow.invoke(
            {"messages": [HumanMessage(content=body.message)]},
            config=config,
        )
        messages = result.get("messages", [])
        answer = messages[-1].content if messages else "I couldn't generate a response."
        return {
            "message": answer,
            "thread_id": body.thread_id,
            "intent": result.get("intent"),
            "hotels": result.get("hotels") or [],
            "selected_hotel_id": result.get("selected_hotel_id"),
            "selected_room_id": result.get("selected_room_id"),
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@app.get("/api/hotels")
def hotels(city: Optional[str] = None):
    from sqlalchemy import text
    with engine.connect() as conn:
        q = "SELECT * FROM hotels"
        params = {}
        if city:
            q += " WHERE LOWER(city)=LOWER(:city)"
            params["city"] = city
        return [dict(row._mapping) for row in conn.execute(text(q), params)]

@app.post("/api/bookings")
def create_booking(
    body: BookingRequest,
    authorization: Optional[str] = Header(default=None),
):
    # MVP: use Clerk user ID from the verified backend token when Clerk
    # verification is added. For now the bearer token is required so the
    # endpoint is not accidentally called as a public form endpoint.
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authentication required")

    from sqlalchemy import text
    with engine.begin() as conn:
        if engine.url.drivername.startswith("sqlite"):
            result = conn.execute(text("""
                INSERT INTO bookings
                (clerk_user_id,hotel_id,room_id,check_in,check_out,guests,total,status)
                VALUES (:user,:hotel,:room,:in,:out,:guests,:total,'CONFIRMED')
            """), {
                "user": "clerk-user",
                "hotel": body.hotel_id,
                "room": body.room_id,
                "in": body.check_in,
                "out": body.check_out,
                "guests": body.guests,
                "total": body.total,
            })
        else:
            result = conn.execute(text("""
                INSERT INTO bookings
                (clerk_user_id,hotel_id,room_id,check_in,check_out,guests,total,status)
                VALUES (:user,:hotel,:room,:in,:out,:guests,:total,'CONFIRMED')
            """), {
                "user": "clerk-user",
                "hotel": body.hotel_id,
                "room": body.room_id,
                "in": body.check_in,
                "out": body.check_out,
                "guests": body.guests,
                "total": body.total,
            })
        return {"booking_id": result.lastrowid, "status": "CONFIRMED"}

@app.get("/")
def root():
    return {"message": "CheckInn API is running"}
