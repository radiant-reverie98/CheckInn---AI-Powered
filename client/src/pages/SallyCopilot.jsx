import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import Navbar from '../components/general/Navbar'
import SallyHero from '../components/sally-copilot/SallyHero'
import SallyChatInput from '../components/sally-copilot/SallyChatInput'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function SallyCopilot() {
  const { getToken, isSignedIn } = useAuth()
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I’m Sally. Tell me your destination, dates and number of guests, and I’ll help you find a hotel.' }
  ])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (message) => {
    if (!message?.trim() || loading) return
    setMessages((m) => [...m, { role: 'user', content: message }])
    setLoading(true)

    try {
      const token = isSignedIn ? await getToken() : null
      const threadId = localStorage.getItem('sally_thread_id') || crypto.randomUUID()
      localStorage.setItem('sally_thread_id', threadId)

      const response = await fetch(`${API_URL}/api/sally/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message, thread_id: threadId }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || 'Backend request failed')

      setMessages((m) => [...m, {
        role: 'assistant',
        content: data.message,
        hotels: data.hotels,
        rooms: data.rooms,
        bookingSummary: data.booking_summary,
      }])
    } catch (error) {
      setMessages((m) => [...m, {
        role: 'assistant',
        content: `Sally could not reach the backend: ${error.message}`,
      }])
    } finally {
      setLoading(false)
    }
  }

  const clearChat = () => {
    localStorage.removeItem('sally_thread_id')
    setMessages([{ role: 'assistant', content: 'New trip started. Where would you like to go?' }])
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <SallyHero />

      <div className="max-w-4xl mx-auto px-4 pb-32">
        <div className="flex justify-end mb-3">
          <button onClick={clearChat} className="text-xs px-3 py-2 rounded-lg border bg-white hover:bg-slate-100">
            New conversation
          </button>
        </div>

        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
              <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-[#007ACC] text-white' : 'bg-white border border-slate-200'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>

                {msg.hotels?.length > 0 && (
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {msg.hotels.map((hotel) => (
                      <button
                        key={hotel.hotel_id}
                        onClick={() => sendMessage(`I want to stay at hotel ${hotel.hotel_id} (${hotel.name})`)}
                        className="text-left p-4 rounded-xl bg-slate-50 border hover:border-[#007ACC] transition"
                      >
                        <div className="font-semibold">{hotel.name}</div>
                        <div className="text-xs text-slate-500 mt-1">{hotel.city} · ⭐ {hotel.rating} · ₹{Number(hotel.price_per_night).toLocaleString()}/night</div>
                        <div className="text-xs text-[#007ACC] mt-2">Select hotel →</div>
                      </button>
                    ))}
                  </div>
                )}

                {msg.rooms?.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {msg.rooms.map((room) => (
                      <button
                        key={room.room_id}
                        onClick={() => sendMessage(`I choose room ${room.room_id} (${room.room_type})`)}
                        className="w-full text-left p-3 rounded-xl bg-slate-50 border hover:border-[#007ACC] transition"
                      >
                        <div className="font-medium">{room.room_type}</div>
                        <div className="text-xs text-slate-500">Up to {room.max_guests} guests · ₹{Number(room.price_per_night).toLocaleString()}/night · {room.available_rooms} available</div>
                      </button>
                    ))}
                  </div>
                )}

                {msg.bookingSummary && (
                  <div className="mt-4 rounded-xl border bg-slate-50 p-4">
                    <div className="font-semibold">Booking summary</div>
                    <div className="text-sm mt-2">{msg.bookingSummary.hotel?.name}</div>
                    <div className="text-sm">{msg.bookingSummary.room?.room_type}</div>
                    <div className="text-sm">{msg.bookingSummary.nights} night(s) · ₹{Number(msg.bookingSummary.total || 0).toLocaleString()}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && <div className="text-sm text-slate-400">Sally is thinking…</div>}
        </div>
      </div>

      <SallyChatInput onSend={sendMessage} />
    </div>
  )
}

export default SallyCopilot
