import React, { useState } from 'react';
import { Star, MapPin, Users, ArrowRight, SlidersHorizontal } from 'lucide-react';

const hotels = [
  {
    id: 1,
    name: "Prinsengracht Suites",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviews: 421,
    location: "Centrum, Amsterdam",
    guests: 3,
    type: "Suite",
    price: 145,
    badge: "Top Rated"
  },
  {
    id: 2,
    name: "The Canal House Hotel",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviews: 312,
    location: "Jordaan, Amsterdam",
    guests: 2,
    type: "Deluxe Room",
    price: 110,
    badge: "Popular"
  },
  {
    id: 3,
    name: "Het Vondelpark Boutique",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviews: 198,
    location: "Vondelpark, Amsterdam",
    guests: 2,
    type: "Standard Room",
    price: 88,
    badge: null
  },
  {
    id: 4,
    name: "Zuidas Tower Hotel",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
    rating: 4.5,
    reviews: 256,
    location: "Zuidas, Amsterdam",
    guests: 4,
    type: "Executive Room",
    price: 99,
    badge: null
  },
  {
    id: 5,
    name: "Amsterdam Grand Hotel",
    image: "https://images.unsplash.com/photo-1607712617949-8c993d290809?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviews: 389,
    location: "Dam Square, Amsterdam",
    guests: 2,
    type: "Premium Suite",
    price: 175,
    badge: "Best Value"
  },
  {
    id: 6,
    name: "Museumplein Residences",
    image: "https://images.unsplash.com/photo-1630587148265-761cbd139043?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
    rating: 4.4,
    reviews: 143,
    location: "Museum Quarter, Amsterdam",
    guests: 3,
    type: "Apartment",
    price: 120,
    badge: null
  }
];

const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Top Rated"];

const HotelResults = ({ onToggleMobileFilters }) => {
  const [sort, setSort] = useState("Recommended");

  const sorted = [...hotels].sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    if (sort === "Top Rated") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="flex-1 min-w-0">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div>
          <p className="text-[15px] font-bold text-[#0F172A]">
            {hotels.length} hotels found
          </p>
          <p className="text-[13px] text-slate-500 mt-0.5">Amsterdam · All dates</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile filter toggle */}
          <button
            onClick={onToggleMobileFilters}
            className="lg:hidden inline-flex items-center gap-1.5 bg-white border border-[#E2E8F0] text-[#0F172A] text-[13px] font-semibold px-4 py-2.5 rounded-xl shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#007ACC]" />
            Filters
          </button>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white border border-[#E2E8F0] text-[#0F172A] text-[13px] font-semibold px-4 py-2.5 rounded-xl shadow-sm outline-none focus:border-[#007ACC] transition-colors duration-200 cursor-pointer"
          >
            {sortOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {sorted.map((hotel) => (
          <div
            key={hotel.id}
            className="group bg-white border border-[#E2E8F0] hover:border-[#007ACC]/30 rounded-2xl overflow-hidden shadow-[0_4px_16px_-6px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_-10px_rgba(0,122,204,0.18)] hover:-translate-y-1.5 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {hotel.badge && (
                <div className="absolute top-3 left-3 bg-[#007ACC] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {hotel.badge}
                </div>
              )}

              <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#0F172A] text-[12px] font-bold px-2 py-1 rounded-full shadow-sm">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" strokeWidth={0} />
                {hotel.rating}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-[15.5px] font-bold text-[#0F172A] tracking-tight truncate">
                {hotel.name}
              </h3>

              <div className="flex items-center gap-1.5 text-[12.5px] text-slate-500 mt-1 mb-3">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                {hotel.location}
              </div>

              <div className="flex items-center gap-3 text-[12px] text-slate-500 mb-4 pb-4 border-b border-slate-100">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  Up to {hotel.guests} guests
                </span>
                <span className="text-slate-300">·</span>
                <span>{hotel.type}</span>
                <span className="text-slate-300">·</span>
                <span>{hotel.reviews} reviews</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[20px] font-bold text-[#007ACC]">€{hotel.price}</span>
                  <span className="text-[12.5px] text-slate-500"> / night</span>
                </div>

                <button className="inline-flex items-center gap-1.5 bg-[#007ACC] hover:bg-[#0369A1] text-white text-[12.5px] font-semibold px-3.5 py-2 rounded-xl transition-all duration-300 hover:shadow-[0_6px_16px_-4px_rgba(0,122,204,0.5)]">
                  Reserve
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelResults;