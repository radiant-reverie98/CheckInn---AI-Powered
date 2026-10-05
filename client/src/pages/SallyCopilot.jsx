import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import Navbar from '../components/general/Navbar'
import SallyHero from '../components/sally-copilot/SallyHero'
import SallyChatInput from '../components/sally-copilot/SallyChatInput'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function SallyCopilot() {
  const { getToken, isSignedIn } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (message) => {
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
      if (!response.ok) throw new Error(data.detail || 'Request failed')

      setMessages((m) => [...m, {
        role: 'assistant',
        content: data.message,
        hotels: data.hotels,
      }])
    } catch (error) {
      setMessages((m) => [...m, {
        role: 'assistant',
        content: `Sorry, something went wrong: ${error.message}`,
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <SallyHero />

      <div className="max-w-3xl mx-auto px-4 pb-6 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`rounded-2xl p-4 ${msg.role === 'user'
              ? 'bg-[#007ACC] text-white ml-12'
              : 'bg-white border border-slate-200 mr-12'}`}
          >
            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>

            {msg.hotels?.length > 0 && (
              <div className="mt-3 space-y-2">
                {msg.hotels.map((hotel) => (
                  <div key={hotel.hotel_id} className="p-3 rounded-xl bg-slate-50 border">
                    <div className="font-semibold">{hotel.name}</div>
                    <div className="text-xs text-slate-500">
                      {hotel.city} · ⭐ {hotel.rating} · ₹{hotel.price_per_night}/night
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="text-sm text-slate-400">Sally is thinking...</div>
        )}
      </div>

      <SallyChatInput onSend={sendMessage} />
    </div>
  )
}

export default SallyCopilot
