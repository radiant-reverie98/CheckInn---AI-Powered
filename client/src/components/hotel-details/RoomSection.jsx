import React from 'react'
import { Users, Check, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const RoomSection = ({ rooms = [], hotelId }) => {
  const navigate = useNavigate()
  return (
    <section className="py-6">
      <h2 className="text-[22px] font-bold text-[#0F172A] mb-6">Available Rooms</h2>
      {rooms.length === 0 ? <div className="bg-white border rounded-2xl p-10 text-center text-slate-500">No rooms are currently available.</div> :
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => <div key={room.room_id} className="bg-white border rounded-2xl overflow-hidden shadow-sm">
          <div className="h-44 bg-gradient-to-br from-sky-100 to-slate-100 flex items-center justify-center text-5xl">🛏️</div>
          <div className="p-5">
            <div className="flex justify-between gap-3"><h3 className="font-bold">{room.room_type}</h3><span className="text-[#007ACC] font-bold">₹{Number(room.price_per_night).toLocaleString('en-IN')}</span></div>
            <div className="text-sm text-slate-500 mt-2"><Users className="inline w-4 h-4" /> Up to {room.max_guests} guests · {room.available_rooms} available</div>
            <div className="mt-4 space-y-2 text-xs text-slate-600"><div><Check className="inline w-3 h-3 text-[#007ACC]" /> Free WiFi</div><div><Check className="inline w-3 h-3 text-[#007ACC]" /> Air conditioning</div></div>
            <button onClick={() => navigate(`/copilot?hotelId=${hotelId}&roomId=${room.room_id}`)} className="mt-5 w-full bg-[#007ACC] text-white py-2.5 rounded-xl font-semibold flex justify-center items-center gap-2">Continue with Sally <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>)}
      </div>}
    </section>
  )
}
export default RoomSection
