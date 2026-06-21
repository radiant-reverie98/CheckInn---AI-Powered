import React from 'react';
import { ArrowRight } from 'lucide-react';

const PopularDestinations = () => {
  const destinations = [
    {
      name: "Amsterdam",
      description: "Beautiful canals, vibrant nightlife, and unforgettable city experiences.",
      hotels: "1,200+ Hotels",
      image: "https://images.unsplash.com/photo-1753810809056-4d5ddb6eeca2?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "Paris",
      description: "Iconic landmarks, world-class cuisine, and timeless romantic charm.",
      hotels: "2,400+ Hotels",
      image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "Rome",
      description: "Ancient history, golden architecture, and unforgettable Italian flavors.",
      hotels: "1,800+ Hotels",
      image: "https://images.unsplash.com/photo-1460722665083-c2599113f7e0?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "Berlin",
      description: "Bold creativity, rich culture, and a city that never stops evolving.",
      hotels: "1,500+ Hotels",
      image: "https://images.unsplash.com/photo-1747119421266-742889fcde8a?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "Barcelona",
      description: "Sun-soaked beaches, striking architecture, and lively Catalan culture.",
      hotels: "1,950+ Hotels",
      image: "https://images.unsplash.com/photo-1764107183244-0cef642a99a9?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "London",
      description: "Historic streets, world-class museums, and endless things to discover.",
      hotels: "2,100+ Hotels",
      image: "https://images.unsplash.com/photo-1761063814673-a9f0499d2081?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
    }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#007ACC] bg-[#007ACC]/10 px-3.5 py-1.5 rounded-full mb-5">
            <span className="text-sm leading-none">✦</span>
            Popular Destinations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            Explore the world's favorite destinations
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Discover amazing places to stay, explore, and create unforgettable memories.
          </p>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="group relative h-[420px] rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Image */}
              <img
                src={destination.image}
                alt={destination.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/45" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-7">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  {destination.name}
                </h3>
                <p className="text-white/85 text-[14px] leading-relaxed mb-4 max-w-[90%]">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-white/90">
                    {destination.hotels}
                  </span>

                  <span className="flex items-center gap-1.5 text-[14px] font-semibold text-white opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularDestinations;