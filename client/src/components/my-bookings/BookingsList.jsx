import React, { useEffect, useState } from 'react'
import { CalendarSearch } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react'
import BookingCard from './BookingCard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const BookingsList = ({ status = 'Upcoming' }) => {
  const { getToken } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const token = await getToken()
        const res = await fetch(`${API_URL}/api/bookings`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
        const data = await res.json()
        if (!res.ok) throw new Error(data.detail || 'Could not load bookings')
        setBookings(data)
      } catch (e) { setError(e.message) } finally { setLoading(false) }
    }
    load()
  }, [getToken])

  const now = new Date()
  const filtered = bookings.filter(b => {
    const end = new Date(b.check_out)
    if (status === 'Upcoming') return end >= now && b.status !== 'CANCELLED'
    if (status === 'Completed') return end < now && b.status !== 'CANCELLED'
    if (status === 'Cancelled') return b.status === 'CANCELLED'
    return true
  })

  if (loading) return <section className="py-16 text-center text-slate-400">Loading your bookings…</section>

  return <section className="bg-[#F8FAFC] py-8"><div className="max-w-7xl mx-auto px-4">
    {error && <div className="bg-red-50 text-red-700 rounded-xl p-4 mb-4 text-sm">{error}</div>}
    {filtered.length > 0 ? <div className="flex flex-col gap-5">{filtered.map((b) => (
      <BookingCard key={b.booking_id} image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80" hotelName={b.hotel_name} location="CheckInn" bookingId={`CHK-${b.booking_id}`} checkIn={b.check_in} checkOut={b.check_out} guests={b.guests} roomType={b.room_type} status={b.status === 'CONFIRMED' ? 'Upcoming' : b.status} price={Number(b.total)} />
    ))}</div> : <div className="bg-white border rounded-2xl py-16 px-6 text-center"><CalendarSearch className="w-8 h-8 text-[#007ACC] mx-auto mb-4" /><h3 className="font-bold">No {status.toLowerCase()} bookings</h3><p className="text-sm text-slate-500 mt-2">Your real CheckInn bookings will appear here.</p></div>}
  </div></section>
}
export default BookingsList
