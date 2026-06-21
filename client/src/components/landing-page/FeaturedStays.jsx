import React from 'react';
import { Star, Wifi, Coffee, Waves } from 'lucide-react';

const FeaturedStays = () => {
  const hotels = [
    {
      name: "Amsterdam Grand Hotel",
      city: "Amsterdam, Netherlands",
      price: 95,
      rating: 4.8,
      amenities: ["Free WiFi", "Breakfast Included"],
      sallysPick: true,
      image: "https://images.unsplash.com/photo-1746549855427-57e6da7040db?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "Paris Royal Suites",
      city: "Paris, France",
      price: 120,
      rating: 4.9,
      amenities: ["Free WiFi", "Breakfast Included", "Pool"],
      sallysPick: true,
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "Rome Heritage Hotel",
      city: "Rome, Italy",
      price: 105,
      rating: 4.7,
      amenities: ["Free WiFi", "Breakfast Included"],
      sallysPick: false,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "Berlin Central Stay",
      city: "Berlin, Germany",
      price: 89,
      rating: 4.6,
      amenities: ["Free WiFi"],
      sallysPick: false,
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "Barcelona Beach Resort",
      city: "Barcelona, Spain",
      price: 135,
      rating: 4.9,
      amenities: ["Free WiFi", "Breakfast Included", "Pool"],
      sallysPick: false,
      image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
    },
    {
      name: "London Riverside Hotel",
      city: "London, United Kingdom",
      price: 145,
      rating: 4.8,
      amenities: ["Free WiFi", "Breakfast Included"],
      sallysPick: false,
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
    }
  ];

  const amenityIcon = (amenity) => {
    if (amenity === "Free WiFi") return <Wifi className="w-3 h-3" />;
    if (amenity === "Breakfast Included") return <Coffee className="w-3 h-3" />;
    if (amenity === "Pool") return <Waves className="w-3 h-3" />;
    return null;
  };

  return (
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#007ACC] bg-[#007ACC]/10 px-3.5 py-1.5 rounded-full mb-5">
            <span className="text-sm leading-none">✦</span>
            Featured Stays
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            Handpicked hotels loved by travelers
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Explore some of the most popular hotels across our top destinations.
          </p>
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.16)] overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {hotel.sallysPick && (
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#0F172A] text-[11px] font-medium px-2.5 py-1 rounded-full shadow-sm">
                    <span className="text-amber-400 text-[10px] leading-none">⭐</span>
                    Sally's Pick
                  </div>
                )}

                <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#0F172A] text-[12px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {hotel.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-[17px] font-bold text-[#0F172A] mb-1 tracking-tight">
                  {hotel.name}
                </h3>
                <p className="text-[13px] text-slate-500 mb-4">
                  {hotel.city}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {hotel.amenities.map((amenity, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md"
                    >
                      {amenityIcon(amenity)}
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-[19px] font-bold text-[#0F172A]">€{hotel.price}</span>
                    <span className="text-[13px] text-slate-500"> / night</span>
                  </div>
                  <button className="text-[13px] font-semibold text-[#007ACC] hover:text-white border border-[#007ACC] hover:bg-[#007ACC] px-3.5 py-1.5 rounded-lg transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Hotels */}
        <div className="flex justify-center mt-14">
          <button className="bg-[#007ACC] hover:bg-[#0369A1] text-white text-[15px] font-semibold px-8 py-3.5 rounded-xl transition-colors duration-300 shadow-sm">
            View All Hotels
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedStays;