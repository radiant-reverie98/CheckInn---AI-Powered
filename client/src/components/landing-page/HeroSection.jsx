import React, { useState } from 'react';

const HeroSection = () => {
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');

  return (
    <section className="relative w-full bg-white pt-20 pb-16 lg:pt-28 lg:pb-24 font-sans selection:bg-[#007ACC] selection:text-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Typography Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-[1.15] tracking-tight mb-6">
            Find the perfect stay for your next journey
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
            Search hotels, compare options, and plan your trip effortlessly.
          </p>
        </div>

        {/* Premium Search Widget (Airbnb / Booking inspired) */}
        <div className="max-w-4xl mx-auto mb-8 relative">
          <div className="bg-white rounded-3xl md:rounded-full shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] border border-slate-200 p-2 md:p-3 flex flex-col md:flex-row items-center w-full transition-all hover:shadow-[0_16px_50px_-12px_rgba(0,0,0,0.15)]">
            
            {/* Location Input */}
            <div className="w-full md:flex-1 px-4 md:px-6 py-3 md:py-2 border-b md:border-b-0 md:border-r border-slate-200 focus-within:bg-slate-50 rounded-2xl md:rounded-l-full md:rounded-r-none transition-colors">
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wide mb-1">
                Where to?
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-none p-0 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 text-[15px] font-medium"
                placeholder="Search destinations, hotels..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Dates Input */}
            <div className="w-full md:w-auto md:min-w-[200px] px-4 md:px-6 py-3 md:py-2 border-b md:border-b-0 md:border-r border-slate-200 focus-within:bg-slate-50 md:rounded-none rounded-2xl transition-colors">
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wide mb-1">
                Dates
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-none p-0 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 text-[15px] font-medium"
                placeholder="Add dates"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
              />
            </div>

            {/* Guests Input */}
            <div className="w-full md:w-auto md:min-w-[160px] px-4 md:px-6 py-3 md:py-2 focus-within:bg-slate-50 md:rounded-none rounded-2xl transition-colors">
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wide mb-1">
                Guests
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-none p-0 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 text-[15px] font-medium"
                placeholder="Add guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>

            {/* Primary CTA */}
            <div className="w-full md:w-auto p-2 md:p-0 md:ml-2">
              <button className="w-full md:w-auto bg-[#007ACC] hover:bg-[#005A9E] text-white px-8 py-4 md:py-3.5 rounded-2xl md:rounded-full font-semibold text-[15px] shadow-sm transition-colors flex justify-center items-center h-full">
                <svg className="w-5 h-5 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="md:hidden ml-2">Search Hotels</span>
                <span className="hidden md:block">Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="text-center mb-16">
          <button className="inline-flex items-center justify-center px-6 py-2.5 text-[15px] font-semibold text-slate-600 hover:text-[#007ACC] hover:bg-slate-50 rounded-full transition-colors">
            Explore Destinations
            <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Premium Travel Imagery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[400px] md:h-[480px] max-w-6xl mx-auto">
          {/* Main Large Image */}
          <div className="md:col-span-8 rounded-2xl md:rounded-3xl overflow-hidden relative group">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqbGGKVc4tGZz7NLry6Cj3Ch0T9b6_-IfLg9llHmtqDdt6NM__JmM3Fbw&s=10" 
              alt="Premium Hotel Lounge" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-semibold text-lg">Boutique Stays</p>
              <p className="text-sm text-white/80">Handpicked premium locations</p>
            </div>
          </div>
          
          {/* Side Stacked Images */}
          <div className="hidden md:flex md:col-span-4 flex-col gap-4">
            <div className="flex-1 rounded-3xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="European City Travel" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex-1 rounded-3xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Minimalist Hotel Room" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;