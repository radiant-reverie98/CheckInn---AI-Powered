import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/general/Navbar'
import Footer from '../components/general/Footer'
import HotelHeader from '../components/hotel-details/HotelHeader'
import RoomSection from '../components/hotel-details/RoomSection'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function HotelDetails() {
  const [params] = useSearchParams()
  const hotelId = params.get('hotelId')
  const [hotel, setHotel] = useState(null)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const hotels = await fetch(`${API_URL}/api/hotels`).then(r => r.json())
        const found = hotels.find(h => String(h.hotel_id) === String(hotelId)) || hotels[0]
        setHotel(found)
        if (found) {
          const roomData = await fetch(`${API_URL}/api/hotels/${found.hotel_id}/rooms?guests=1`).then(r => r.json())
          setRooms(roomData)
        }
      } finally { setLoading(false) }
    }
    load()
  }, [hotelId])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading hotel…</div>
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found.</div>

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />
      <HotelHeader hotelName={hotel.name} rating={Number(hotel.rating)} location={hotel.city} pricePerNight={Number(hotel.price_per_night).toLocaleString('en-IN')} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">About this stay</h2>
          <p className="text-slate-600">A CheckInn property in {hotel.city}, with {hotel.available_rooms} rooms currently available.</p>
        </div>
        <RoomSection rooms={rooms} hotelId={hotel.hotel_id} />
      </main>
      <Footer />
    </div>
  )
}
export default HotelDetails
