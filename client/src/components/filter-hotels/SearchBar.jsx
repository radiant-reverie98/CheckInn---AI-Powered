import React, { useState } from 'react'
import { MapPin, CalendarDays, Users, Search } from 'lucide-react'

const HotelSearchBar = ({ onSearch }) => {
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)

  const search = () => onSearch?.({ city: destination.trim(), checkIn, checkOut, guests: adults })

  return (
    <section className="bg-[#F8FAFC] py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-7"><h1 className="text-3xl font-bold text-[#0F172A]">Find your perfect stay</h1><p className="text-sm text-slate-500 mt-2">Search our connected CheckInn hotel inventory.</p></div>
        <div className="bg-white border rounded-2xl p-3 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-2">
          <label className="p-3 border rounded-xl"><span className="text-[10px] font-bold uppercase text-slate-500">Destination</span><div className="flex items-center gap-2 mt-1"><MapPin className="w-4 h-4 text-[#007ACC]" /><input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Udaipur" className="w-full outline-none text-sm" /></div></label>
          <label className="p-3 border rounded-xl"><span className="text-[10px] font-bold uppercase text-slate-500">Check-in</span><div className="flex items-center gap-2 mt-1"><CalendarDays className="w-4 h-4 text-[#007ACC]" /><input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full outline-none text-sm" /></div></label>
          <label className="p-3 border rounded-xl"><span className="text-[10px] font-bold uppercase text-slate-500">Check-out</span><div className="flex items-center gap-2 mt-1"><CalendarDays className="w-4 h-4 text-[#007ACC]" /><input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full outline-none text-sm" /></div></label>
          <label className="p-3 border rounded-xl"><span className="text-[10px] font-bold uppercase text-slate-500">Guests</span><div className="flex items-center gap-2 mt-1"><Users className="w-4 h-4 text-[#007ACC]" /><input type="number" min="1" max="10" value={adults} onChange={e => setAdults(Number(e.target.value) || 1)} className="w-full outline-none text-sm" /></div></label>
          <button onClick={search} className="bg-[#007ACC] text-white rounded-xl font-bold flex items-center justify-center gap-2"><Search className="w-4 h-4" />Search</button>
        </div>
      </div>
    </section>
  )
}
export default HotelSearchBar
