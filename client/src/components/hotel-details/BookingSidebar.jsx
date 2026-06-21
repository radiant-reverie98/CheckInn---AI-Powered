import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Users, ChevronDown, Minus, Plus, ShieldCheck, BedDouble } from 'lucide-react';

const BookingSidebar = () => {
  const roomTypes = [
    { id: "deluxe-king", name: "Deluxe King Room", price: 95, maxAvailable: 5 },
    { id: "premium-suite", name: "Premium Suite", price: 165, maxAvailable: 3 },
    { id: "executive-room", name: "Executive Room", price: 130, maxAvailable: 5 }
  ];

  // --- Dates ---
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [dateError, setDateError] = useState('');

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const handleCheckInChange = (value) => {
    setCheckIn(value);
    setDateError('');
    if (checkOut && new Date(checkOut) <= new Date(value)) {
      setCheckOut('');
    }
  };

  const handleCheckOutChange = (value) => {
    if (checkIn && new Date(value) <= new Date(checkIn)) {
      setDateError('Check-out must be after check-in.');
      return;
    }
    setDateError('');
    setCheckOut(value);
  };

  // --- Room type selection ---
  // { [roomId]: quantity }
  const [roomSelection, setRoomSelection] = useState({});

  const updateRoomQuantity = (roomId, delta, max) => {
    setRoomSelection((prev) => {
      const current = prev[roomId] || 0;
      const next = Math.min(Math.max(current + delta, 0), max);
      const updated = { ...prev, [roomId]: next };
      if (next === 0) delete updated[roomId];
      return updated;
    });
  };

  const { totalRooms, roomSubtotalPerNight } = useMemo(() => {
    return roomTypes.reduce(
      (acc, room) => {
        const qty = roomSelection[room.id] || 0;
        acc.totalRooms += qty;
        acc.roomSubtotalPerNight += qty * room.price;
        return acc;
      },
      { totalRooms: 0, roomSubtotalPerNight: 0 }
    );
  }, [roomSelection]);

  const [roomMenuOpen, setRoomMenuOpen] = useState(false);
  const roomMenuRef = useRef(null);

  // --- Guests ---
  const [guestMenuOpen, setGuestMenuOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const guestMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (guestMenuRef.current && !guestMenuRef.current.contains(e.target)) {
        setGuestMenuOpen(false);
      }
      if (roomMenuRef.current && !roomMenuRef.current.contains(e.target)) {
        setRoomMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalGuests = adults + children;
  const guestSummary = `${totalGuests} ${totalGuests === 1 ? 'guest' : 'guests'}`;
  const roomSummary = totalRooms === 0 ? 'Select rooms' : `${totalRooms} ${totalRooms === 1 ? 'room' : 'rooms'} selected`;

  // --- Pricing ---
  const datesSelected = Boolean(checkIn && checkOut && nights > 0);
  const roomsSelected = totalRooms > 0;
  const canBook = datesSelected && roomsSelected;

  const subtotal = canBook ? roomSubtotalPerNight * nights : 0;
  const taxesAndFees = Math.round(subtotal * 0.12);
  const total = subtotal + taxesAndFees;

  return (
    <div className="lg:sticky lg:top-24 font-sans">
      <div className="bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(15,23,42,0.18)] border border-[#E2E8F0] p-6 max-w-sm w-full">

        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[16px] font-bold text-[#0F172A]">Book your stay</h3>
          <div className="flex items-center gap-1 text-[12px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Free cancellation
          </div>
        </div>

        {/* Date pickers */}
        <div className="grid grid-cols-2 border border-[#E2E8F0] rounded-xl overflow-hidden mb-3">
          <div className="border-r border-[#E2E8F0] px-3 py-2.5">
            <label htmlFor="sidebar-check-in" className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1">
              Check-in
            </label>
            <input
              id="sidebar-check-in"
              type="date"
              value={checkIn}
              min={todayStr}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="w-full text-[13px] font-semibold text-[#0F172A] focus:outline-none bg-transparent"
            />
          </div>
          <div className="px-3 py-2.5">
            <label htmlFor="sidebar-check-out" className="block text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1">
              Check-out
            </label>
            <input
              id="sidebar-check-out"
              type="date"
              value={checkOut}
              min={checkIn ? checkIn : tomorrowStr}
              disabled={!checkIn}
              onChange={(e) => handleCheckOutChange(e.target.value)}
              className="w-full text-[13px] font-semibold text-[#0F172A] disabled:text-slate-300 focus:outline-none bg-transparent"
            />
          </div>
        </div>

        {dateError && (
          <p className="text-[12px] text-red-600 mb-3">{dateError}</p>
        )}

        {/* Room type selector */}
        <div className="relative mb-3" ref={roomMenuRef}>
          <button
            onClick={() => setRoomMenuOpen((v) => !v)}
            className="w-full flex items-center justify-between border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-left hover:border-slate-300 transition-colors duration-200"
          >
            <div>
              <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1">Room type</p>
              <p className="text-[13px] font-semibold text-[#0F172A] flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-slate-400" />
                {roomSummary}
              </p>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${roomMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {roomMenuOpen && (
            <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-xl shadow-[0_12px_32px_-8px_rgba(15,23,42,0.18)] p-4">
              {roomTypes.map((room, index) => {
                const qty = roomSelection[room.id] || 0;
                return (
                  <div
                    key={room.id}
                    className={`flex items-center justify-between py-2.5 ${index > 0 ? 'border-t border-slate-100 mt-1 pt-3' : ''}`}
                  >
                    <div>
                      <p className="text-[13.5px] font-semibold text-[#0F172A]">{room.name}</p>
                      <p className="text-[11.5px] text-slate-500">€{room.price} / night</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateRoomQuantity(room.id, -1, room.maxAvailable)}
                        disabled={qty <= 0}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-[#E2E8F0] text-slate-600 hover:border-[#007ACC] hover:text-[#007ACC] disabled:opacity-30 disabled:hover:border-[#E2E8F0] disabled:hover:text-slate-600 transition-colors duration-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-4 text-center text-[13px] font-semibold text-[#0F172A]">{qty}</span>
                      <button
                        onClick={() => updateRoomQuantity(room.id, 1, room.maxAvailable)}
                        disabled={qty >= room.maxAvailable}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-[#E2E8F0] text-slate-600 hover:border-[#007ACC] hover:text-[#007ACC] disabled:opacity-30 transition-colors duration-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => setRoomMenuOpen(false)}
                className="w-full mt-3 text-[13px] font-semibold text-[#007ACC] hover:text-[#0369A1] text-center py-1.5"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Guest selector */}
        <div className="relative mb-5" ref={guestMenuRef}>
          <button
            onClick={() => setGuestMenuOpen((v) => !v)}
            className="w-full flex items-center justify-between border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-left hover:border-slate-300 transition-colors duration-200"
          >
            <div>
              <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wide mb-1">Guests</p>
              <p className="text-[13px] font-semibold text-[#0F172A] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                {guestSummary}
              </p>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${guestMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {guestMenuOpen && (
            <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-xl shadow-[0_12px_32px_-8px_rgba(15,23,42,0.18)] p-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-[13.5px] font-semibold text-[#0F172A]">Adults</p>
                  <p className="text-[11.5px] text-slate-500">Ages 13+</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAdults((v) => Math.max(1, v - 1))}
                    disabled={adults <= 1}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-[#E2E8F0] text-slate-600 hover:border-[#007ACC] hover:text-[#007ACC] disabled:opacity-30 disabled:hover:border-[#E2E8F0] disabled:hover:text-slate-600 transition-colors duration-200"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-4 text-center text-[13px] font-semibold text-[#0F172A]">{adults}</span>
                  <button
                    onClick={() => setAdults((v) => Math.min(8, v + 1))}
                    disabled={adults >= 8}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-[#E2E8F0] text-slate-600 hover:border-[#007ACC] hover:text-[#007ACC] disabled:opacity-30 transition-colors duration-200"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-slate-100 mt-1 pt-3">
                <div>
                  <p className="text-[13.5px] font-semibold text-[#0F172A]">Children</p>
                  <p className="text-[11.5px] text-slate-500">Ages 2–12</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChildren((v) => Math.max(0, v - 1))}
                    disabled={children <= 0}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-[#E2E8F0] text-slate-600 hover:border-[#007ACC] hover:text-[#007ACC] disabled:opacity-30 transition-colors duration-200"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-4 text-center text-[13px] font-semibold text-[#0F172A]">{children}</span>
                  <button
                    onClick={() => setChildren((v) => Math.min(6, v + 1))}
                    disabled={children >= 6}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-[#E2E8F0] text-slate-600 hover:border-[#007ACC] hover:text-[#007ACC] disabled:opacity-30 transition-colors duration-200"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => setGuestMenuOpen(false)}
                className="w-full mt-3 text-[13px] font-semibold text-[#007ACC] hover:text-[#0369A1] text-center py-1.5"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Book Now button */}
        <button
          disabled={!canBook}
          className="w-full bg-[#007ACC] hover:bg-[#0369A1] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[15px] font-bold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_10px_24px_-6px_rgba(0,122,204,0.5)] mb-2"
        >
          Book Now
        </button>

        <p className="text-center text-[12px] text-slate-400 mb-5">
          You won't be charged yet
        </p>

        {/* Price breakdown */}
        {canBook && (
          <div className="space-y-2.5 pt-5 border-t border-slate-100">
            {roomTypes.map((room) => {
              const qty = roomSelection[room.id] || 0;
              if (qty === 0) return null;
              return (
                <div key={room.id} className="flex items-center justify-between text-[13.5px]">
                  <span className="text-slate-600">{room.name} × {qty} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                  <span className="text-[#0F172A] font-medium">€{room.price * qty * nights}</span>
                </div>
              );
            })}
            <div className="flex items-center justify-between text-[13.5px]">
              <span className="text-slate-600">Taxes & fees</span>
              <span className="text-[#0F172A] font-medium">€{taxesAndFees}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-[15px] font-bold text-[#0F172A]">Total</span>
              <span className="text-[19px] font-bold text-[#007ACC]">€{total}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingSidebar;