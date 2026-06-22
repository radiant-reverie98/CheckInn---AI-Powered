import React, { useState, useRef, useEffect } from 'react';
import { MapPin, CalendarDays, Users, Search, Plus, Minus, ChevronDown } from 'lucide-react';

const HotelSearchBar = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestOpen, setGuestOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });

  const guestRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setGuestOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const adjust = (key, delta) => {
    setGuests((prev) => ({
      ...prev,
      [key]: Math.max(key === 'adults' || key === 'rooms' ? 1 : 0, prev[key] + delta)
    }));
  };

  const guestSummary = () => {
    const parts = [`${guests.adults} Adult${guests.adults > 1 ? 's' : ''}`];
    if (guests.children > 0) parts.push(`${guests.children} Child${guests.children > 1 ? 'ren' : ''}`);
    parts.push(`${guests.rooms} Room${guests.rooms > 1 ? 's' : ''}`);
    return parts.join(' · ');
  };

  const fieldClass = (name) =>
    `flex flex-col justify-center gap-0.5 cursor-pointer transition-all duration-200 ${
      activeField === name ? 'bg-white shadow-[0_4px_20px_-4px_rgba(0,122,204,0.18)] rounded-2xl' : 'hover:bg-white/70 rounded-2xl'
    }`;

  const GuestRow = ({ label, sub, gKey }) => (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-[13.5px] font-semibold text-[#0F172A]">{label}</p>
        <p className="text-[12px] text-slate-400 mt-0.5">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => adjust(gKey, -1)}
          className="w-8 h-8 rounded-full border border-slate-200 hover:border-[#007ACC] flex items-center justify-center text-slate-500 hover:text-[#007ACC] transition-colors duration-200 disabled:opacity-30"
          disabled={guests[gKey] <= (gKey === 'adults' || gKey === 'rooms' ? 1 : 0)}
        >
          <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
        <span className="text-[14px] font-bold text-[#0F172A] w-4 text-center">{guests[gKey]}</span>
        <button
          onClick={() => adjust(gKey, 1)}
          className="w-8 h-8 rounded-full border border-slate-200 hover:border-[#007ACC] flex items-center justify-center text-slate-500 hover:text-[#007ACC] transition-colors duration-200"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );

  return (
    <section className="bg-[#F8FAFC] font-sans py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-[30px] sm:text-[36px] font-bold text-[#0F172A] tracking-tight">
            Find your perfect stay
          </h1>
          <p className="text-[14.5px] text-slate-500 mt-2">
            Search over 10,000 hotels in the world's finest destinations.
          </p>
        </div>

        {/* Search container */}
        <div className="bg-[#F1F5F9] rounded-[28px] p-2 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.1)]">
          <div className="flex flex-col lg:flex-row gap-2">

            {/* Destination */}
            <div
              className={`flex-[2] px-5 py-4 ${fieldClass('destination')}`}
              onClick={() => setActiveField('destination')}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#007ACC] flex-shrink-0" strokeWidth={2} />
                <span className="text-[11.5px] font-bold text-[#0F172A] uppercase tracking-widest">
                  Destination
                </span>
              </div>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setActiveField('destination')}
                onBlur={() => setActiveField(null)}
                placeholder="Where are you going?"
                className="mt-1 bg-transparent text-[13.5px] font-medium text-[#0F172A] placeholder:text-slate-400 outline-none w-full"
              />
            </div>

            <div className="hidden lg:block w-px bg-slate-200 my-3" />

            {/* Check-in */}
            <div
              className={`flex-1 px-5 py-4 ${fieldClass('checkin')}`}
              onClick={() => setActiveField('checkin')}
            >
              <div className="flex items-center gap-2.5">
                <CalendarDays className="w-4 h-4 text-[#007ACC] flex-shrink-0" strokeWidth={2} />
                <span className="text-[11.5px] font-bold text-[#0F172A] uppercase tracking-widest">
                  Check-in
                </span>
              </div>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                onFocus={() => setActiveField('checkin')}
                onBlur={() => setActiveField(null)}
                className="mt-1 bg-transparent text-[13.5px] font-medium text-[#0F172A] placeholder:text-slate-400 outline-none w-full cursor-pointer appearance-none"
              />
            </div>

            <div className="hidden lg:block w-px bg-slate-200 my-3" />

            {/* Check-out */}
            <div
              className={`flex-1 px-5 py-4 ${fieldClass('checkout')}`}
              onClick={() => setActiveField('checkout')}
            >
              <div className="flex items-center gap-2.5">
                <CalendarDays className="w-4 h-4 text-[#007ACC] flex-shrink-0" strokeWidth={2} />
                <span className="text-[11.5px] font-bold text-[#0F172A] uppercase tracking-widest">
                  Check-out
                </span>
              </div>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                onFocus={() => setActiveField('checkout')}
                onBlur={() => setActiveField(null)}
                className="mt-1 bg-transparent text-[13.5px] font-medium text-[#0F172A] placeholder:text-slate-400 outline-none w-full cursor-pointer appearance-none"
              />
            </div>

            <div className="hidden lg:block w-px bg-slate-200 my-3" />

            {/* Guests */}
            <div className="flex-1 relative" ref={guestRef}>
              <div
                className={`px-5 py-4 h-full ${fieldClass('guests')}`}
                onClick={() => { setGuestOpen(!guestOpen); setActiveField('guests'); }}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#007ACC] flex-shrink-0" strokeWidth={2} />
                  <span className="text-[11.5px] font-bold text-[#0F172A] uppercase tracking-widest">
                    Guests
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[13.5px] font-medium text-[#0F172A] truncate">
                    {guestSummary()}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-1 transition-transform duration-200 ${guestOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>

              {/* Guest dropdown */}
              {guestOpen && (
                <div className="absolute top-full mt-3 left-0 w-72 bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_16px_40px_-10px_rgba(15,23,42,0.14)] p-4 z-50">
                  <GuestRow label="Adults" sub="Ages 13 or above" gKey="adults" />
                  <GuestRow label="Children" sub="Ages 2–12" gKey="children" />
                  <GuestRow label="Rooms" sub="Number of rooms" gKey="rooms" />
                  <button
                    onClick={() => setGuestOpen(false)}
                    className="mt-3 w-full text-center text-[13px] font-bold text-[#007ACC] hover:text-[#0369A1] transition-colors duration-200"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Search button */}
            <button className="flex items-center justify-center gap-2 bg-[#007ACC] hover:bg-[#0369A1] text-white font-bold text-[14px] px-7 py-4 rounded-[20px] transition-all duration-300 hover:shadow-[0_8px_24px_-6px_rgba(0,122,204,0.55)] active:scale-95 flex-shrink-0 w-full lg:w-auto">
              <Search className="w-4.5 h-4.5" strokeWidth={2.5} />
              Search
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HotelSearchBar;