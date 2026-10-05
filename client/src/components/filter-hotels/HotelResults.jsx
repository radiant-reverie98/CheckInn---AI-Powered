import React, { useEffect, useState } from 'react'
import { Star, MapPin, Users, ArrowRight, SlidersHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const HotelResults = ({ city, guests = 2, onToggleMobileFilters }) => {
  const [hotels, setHotels] = useState([])
  const [sort, setSort] = useState('Recommended')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError('')
      try {
        const params = city ? `?city=${encodeURIComponent(city)}` : ''
        const res = await fetch(`${API_URL}/api/hotels${params}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.detail || 'Could not load hotels')
        setHotels(data)
      } catch (e) { setError(e.message) } finally { setLoading(false) }
    }
    load()
  }, [city, guests])

  const sorted = [...hotels].sort((a, b) => {
    if (sort === 'Price: Low to High') return Number(a.price_per_night) - Number(b.price_per_night)
    if (sort === 'Price: High to Low') return Number(b.price_per_night) - Number(a.price_per_night)
    if (sort === 'Top Rated') return Number(b.rating) - Number(a.rating)
    return Number(b.rating) - Number(a.rating)
  })

  return (
    <div className='flex-1 min-w-0'>
      <div className='flex items-center justify-between mb-5 gap-3 flex-wrap'>
        <div><p className='text-[15px] font-bold text-[#0F172A]'>{loading ? 'Loading hotels…' : `${sorted.length} hotels found`}</p><p className='text-[13px] text-slate-500 mt-0.5'>{city || 'All destinations'} · {guests} guests</p></div>
        <div className='flex gap-3'><button onClick={onToggleMobileFilters} className='lg:hidden inline-flex items-center gap-1.5 bg-white border px-4 py-2.5 rounded-xl text-[13px] font-semibold'><SlidersHorizontal className='w-3.5 h-3.5 text-[#007ACC]' />Filters</button><select value={sort} onChange={e => setSort(e.target.value)} className='bg-white border px-4 py-2.5 rounded-xl text-[13px] font-semibold'><option>Recommended</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Top Rated</option></select></div>
      </div>
      {error && <div className='bg-red-50 text-red-700 border border-red-100 rounded-xl p-4 mb-4 text-sm'>{error}</div>}
      {loading ? <div className='py-20 text-center text-slate-400'>Finding the best stays…</div> : <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
        {sorted.map(hotel => <div key={hotel.hotel_id} className='group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all'>
          <div className='relative h-44 bg-gradient-to-br from-sky-100 to-slate-100 flex items-center justify-center'><span className='text-5xl'>🏨</span><div className='absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-bold'><Star className='inline w-3 h-3 fill-amber-400 text-amber-400' /> {hotel.rating}</div></div>
          <div className='p-5'><h3 className='font-bold text-[#0F172A]'>{hotel.name}</h3><div className='flex items-center gap-1 text-xs text-slate-500 mt-1'><MapPin className='w-3.5 h-3.5' />{hotel.city}</div><div className='flex gap-3 text-xs text-slate-500 mt-3 pb-4 border-b'><span><Users className='inline w-3.5 h-3.5' /> {hotel.available_rooms} rooms</span><span>{hotel.star_rating}-star</span></div><div className='flex justify-between items-center mt-4'><div><span className='text-xl font-bold text-[#007ACC]'>₹{Number(hotel.price_per_night).toLocaleString('en-IN')}</span><span className='text-xs text-slate-500'> / night</span></div><button onClick={() => navigate(`/hotel-details?hotelId=${hotel.hotel_id}`)} className='inline-flex items-center gap-1.5 bg-[#007ACC] text-white text-xs font-semibold px-3.5 py-2 rounded-xl'>View <ArrowRight className='w-3.5 h-3.5' /></button></div></div>
        </div>)}
      </div>}
      {!loading && !error && sorted.length === 0 && <div className='bg-white border rounded-2xl p-12 text-center text-slate-500'>No hotels found. Try another destination.</div>}
    </div>
  )
}

export default HotelResults