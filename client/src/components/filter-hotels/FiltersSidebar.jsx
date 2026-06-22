import React, { useState, useRef, useCallback } from 'react';
import {
  Star, Users, Building2, Wifi, ParkingCircle, Waves,
  Dumbbell, Sparkles, UtensilsCrossed, PlaneTakeoff,
  BellRing, PawPrint, Coffee, CalendarX, CreditCard,
  Zap, SlidersHorizontal, RotateCcw, Sparkle
} from 'lucide-react';

/* ── Reusable primitives ── */

const SectionCard = ({ title, children }) => (
  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.04)]">
    <h3 className="text-[13px] font-bold text-[#0F172A] uppercase tracking-widest mb-4">{title}</h3>
    {children}
  </div>
);

const FilterCheckbox = ({ label, checked, onChange, icon: Icon }) => (
  <label className="flex items-center gap-3 cursor-pointer group py-1">
    <div
      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
        checked
          ? 'bg-[#007ACC] border-[#007ACC]'
          : 'border-slate-300 group-hover:border-[#007ACC]'
      }`}
      onClick={onChange}
    >
      {checked && (
        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
    <div className="flex items-center gap-2 flex-1">
      {Icon && <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#007ACC] transition-colors duration-200" strokeWidth={1.75} />}
      <span className={`text-[13.5px] transition-colors duration-200 ${checked ? 'font-semibold text-[#0F172A]' : 'text-slate-600 group-hover:text-[#0F172A]'}`}>
        {label}
      </span>
    </div>
  </label>
);

/* ── Dual range slider ── */

const DualRangeSlider = ({ min, max, value, onChange }) => {
  const trackRef = useRef(null);

  const getPercent = (val) => ((val - min) / (max - min)) * 100;

  const handleTrackClick = useCallback((e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const clicked = Math.round(percent * (max - min) + min);
    const midpoint = (value[0] + value[1]) / 2;
    if (clicked < midpoint) onChange([clicked, value[1]]);
    else onChange([value[0], clicked]);
  }, [value, min, max, onChange]);

  return (
    <div className="relative h-5 flex items-center" ref={trackRef} onClick={handleTrackClick}>
      <div className="absolute w-full h-1.5 bg-slate-200 rounded-full" />
      <div
        className="absolute h-1.5 bg-[#007ACC] rounded-full"
        style={{ left: `${getPercent(value[0])}%`, right: `${100 - getPercent(value[1])}%` }}
      />
      {[0, 1].map((i) => (
        <input
          key={i}
          type="range"
          min={min}
          max={max}
          value={value[i]}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (i === 0) onChange([Math.min(v, value[1] - 10), value[1]]);
            else onChange([value[0], Math.max(v, value[0] + 10)]);
          }}
          onClick={(e) => e.stopPropagation()}
          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#007ACC] [&::-webkit-slider-thumb]:shadow-[0_2px_8px_-2px_rgba(0,122,204,0.4)] [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#007ACC] [&::-moz-range-thumb]:cursor-grab"
        />
      ))}
    </div>
  );
};

/* ── Main component ── */

const FiltersSidebar = () => {
  const [priceRange, setPriceRange] = useState([40, 350]);
  const [starRatings, setStarRatings] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [bookingOptions, setBookingOptions] = useState([]);
  const [sallyOnly, setSallyOnly] = useState(false);

  const toggle = (setter, value) =>
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  const resetAll = () => {
    setPriceRange([40, 350]);
    setStarRatings([]);
    setCapacities([]);
    setPropertyTypes([]);
    setAmenities([]);
    setBookingOptions([]);
    setSallyOnly(false);
  };

  const activeCount =
    starRatings.length + capacities.length + propertyTypes.length +
    amenities.length + bookingOptions.length + (sallyOnly ? 1 : 0);

  return (
    <aside className="font-sans w-full lg:w-72 xl:w-80 lg:sticky lg:top-6 lg:self-start flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4.5 h-4.5 text-[#007ACC]" strokeWidth={2} />
          <span className="text-[15px] font-bold text-[#0F172A] tracking-tight">Filters</span>
          {activeCount > 0 && (
            <span className="text-[11.5px] font-bold bg-[#007ACC] text-white px-2 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-500 hover:text-[#007ACC] transition-colors duration-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* 1 · Price Range */}
      <SectionCard title="Price Range">
        <div className="flex items-center justify-between mb-4">
          {[{ label: 'Min', val: priceRange[0] }, { label: 'Max', val: priceRange[1] }].map(({ label, val }) => (
            <div key={label} className="flex flex-col items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2 w-[46%]">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{label}</span>
              <span className="text-[15px] font-bold text-[#007ACC]">€{val}</span>
            </div>
          ))}
        </div>
        <DualRangeSlider min={0} max={700} value={priceRange} onChange={setPriceRange} />
        <div className="flex justify-between mt-2">
          <span className="text-[11px] text-slate-400">€0</span>
          <span className="text-[11px] text-slate-400">€700</span>
        </div>
      </SectionCard>

      {/* 2 · Star Rating */}
      <SectionCard title="Star Rating">
        <div className="flex flex-col gap-2">
          {[5, 4, 3, 2].map((n) => (
            <FilterCheckbox
              key={n}
              label={
                <span className="flex items-center gap-1">
                  {Array.from({ length: n }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" strokeWidth={0} />
                  ))}
                  <span className="ml-1 text-slate-500 text-[12.5px]">{n} Star</span>
                </span>
              }
              checked={starRatings.includes(n)}
              onChange={() => toggle(setStarRatings, n)}
            />
          ))}
        </div>
      </SectionCard>

      {/* 3 · Guest Capacity */}
      <SectionCard title="Guest Capacity">
        <div className="flex flex-col gap-2">
          {['1 Guest', '2 Guests', '3 Guests', '4+ Guests'].map((c) => (
            <FilterCheckbox
              key={c}
              label={c}
              icon={Users}
              checked={capacities.includes(c)}
              onChange={() => toggle(setCapacities, c)}
            />
          ))}
        </div>
      </SectionCard>

      {/* 4 · Property Type */}
      <SectionCard title="Property Type">
        <div className="flex flex-col gap-2">
          {['Hotel', 'Resort', 'Villa', 'Apartment', 'Hostel'].map((p) => (
            <FilterCheckbox
              key={p}
              label={p}
              icon={Building2}
              checked={propertyTypes.includes(p)}
              onChange={() => toggle(setPropertyTypes, p)}
            />
          ))}
        </div>
      </SectionCard>

      {/* 5 · Amenities */}
      <SectionCard title="Amenities">
        <div className="flex flex-col gap-2">
          {[
            { label: 'Free WiFi', icon: Wifi },
            { label: 'Free Parking', icon: ParkingCircle },
            { label: 'Swimming Pool', icon: Waves },
            { label: 'Gym', icon: Dumbbell },
            { label: 'Spa', icon: Sparkles },
            { label: 'Restaurant', icon: UtensilsCrossed },
            { label: 'Airport Shuttle', icon: PlaneTakeoff },
            { label: 'Room Service', icon: BellRing },
            { label: 'Pet Friendly', icon: PawPrint },
            { label: 'Breakfast Included', icon: Coffee },
          ].map(({ label, icon }) => (
            <FilterCheckbox
              key={label}
              label={label}
              icon={icon}
              checked={amenities.includes(label)}
              onChange={() => toggle(setAmenities, label)}
            />
          ))}
        </div>
      </SectionCard>

      {/* 6 · Booking Options */}
      <SectionCard title="Booking Options">
        <div className="flex flex-col gap-2">
          {[
            { label: 'Free Cancellation', icon: CalendarX },
            { label: 'Pay Later', icon: CreditCard },
            { label: 'Instant Confirmation', icon: Zap },
          ].map(({ label, icon }) => (
            <FilterCheckbox
              key={label}
              label={label}
              icon={icon}
              checked={bookingOptions.includes(label)}
              onChange={() => toggle(setBookingOptions, label)}
            />
          ))}
        </div>
      </SectionCard>

      {/* 7 · AI Filter */}
      <div
        className={`bg-white border-2 rounded-2xl p-5 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.04)] transition-colors duration-300 ${
          sallyOnly ? 'border-[#007ACC]' : 'border-[#E2E8F0]'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-300 ${sallyOnly ? 'bg-[#007ACC]' : 'bg-slate-100'}`}>
              <Sparkle className={`w-3.5 h-3.5 transition-colors duration-300 ${sallyOnly ? 'text-white' : 'text-slate-400'}`} strokeWidth={2} />
            </div>
            <span className="text-[13px] font-bold text-[#0F172A] uppercase tracking-widest">AI Filter</span>
          </div>

          {/* Toggle */}
          <button
            onClick={() => setSallyOnly(!sallyOnly)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
              sallyOnly ? 'bg-[#007ACC]' : 'bg-slate-200'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                sallyOnly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <p className={`text-[13.5px] font-semibold transition-colors duration-300 ${sallyOnly ? 'text-[#007ACC]' : 'text-[#0F172A]'}`}>
          Sally Recommended Only
        </p>
        <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">
          Show only hotels highly recommended by Sally AI.
        </p>
      </div>

    </aside>
  );
};

export default FiltersSidebar;