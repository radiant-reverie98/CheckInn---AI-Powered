import React from 'react';
import { Star, MapPin, ArrowUpRight } from 'lucide-react';

const SimilarHotels = () => {
  const hotels = [
    {
      name: "The Canal House Hotel",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
      rating: 4.8,
      reviews: 312,
      location: "Jordaan, Amsterdam",
      price: 110
    },
    {
      name: "Het Vondelpark Boutique",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
      rating: 4.6,
      reviews: 198,
      location: "Vondelpark, Amsterdam",
      price: 88
    },
    {
      name: "Prinsengracht Suites",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
      rating: 4.9,
      reviews: 421,
      location: "Centrum, Amsterdam",
      price: 145
    },
    {
      name: "Zuidas Tower Hotel",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
      rating: 4.5,
      reviews: 256,
      location: "Zuidas, Amsterdam",
      price: 99
    }
  ];

  return (
    <section className="bg-[#F8FAFC] font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
              Similar Hotels
            </h2>
            <p className="text-[13.5px] text-slate-500 mt-1">
              Other stays nearby that travelers also loved
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {hotels.map((hotel, index) => (
            <div
              key={index}
              className="group flex flex-col sm:flex-row bg-white border border-[#E2E8F0] hover:border-[#007ACC]/30 rounded-2xl overflow-hidden shadow-[0_4px_16px_-6px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_-10px_rgba(0,122,204,0.18)] hover:-translate-y-1 transition-all duration-400"
            >
              {/* Image */}
              <div className="relative w-full sm:w-72 h-52 sm:h-auto flex-shrink-0 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between sm:justify-start sm:gap-3 mb-2">
                    <h3 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-[#007ACC]/10 text-[#007ACC] text-[12.5px] font-bold px-2 py-0.5 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-[#007ACC]" strokeWidth={0} />
                      {hotel.rating}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[13px] text-slate-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {hotel.location}
                  </div>

                  <span className="text-[12.5px] text-slate-400">
                    {hotel.reviews} reviews
                  </span>
                </div>

                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 sm:gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <span className="text-[20px] font-bold text-[#007ACC]">€{hotel.price}</span>
                    <span className="text-[13px] text-slate-500"> / night</span>
                  </div>

                  <button className="inline-flex items-center gap-1.5 bg-white hover:bg-[#007ACC] border border-[#007ACC] text-[#007ACC] hover:text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_6px_16px_-4px_rgba(0,122,204,0.5)]">
                    Quick View
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SimilarHotels;