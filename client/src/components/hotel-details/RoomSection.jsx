import React from 'react';
import { Users, Maximize, Check, ArrowRight } from 'lucide-react';

const RoomsSection = () => {
  const rooms = [
    {
      name: "Deluxe King Room",
      image: "https://images.unsplash.com/photo-1729605411476-defbdab14c54?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
      size: "32 m²",
      capacity: 2,
      features: ["King-size bed", "City view", "Free WiFi", "Air conditioning"],
      price: 95
    },
    {
      name: "Premium Suite",
      image: "https://images.unsplash.com/photo-1647249893022-9287c83b8cc3?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
      size: "54 m²",
      capacity: 3,
      features: ["Separate living area", "Premium minibar", "Free WiFi", "Bathtub & rain shower"],
      price: 165
    },
    {
      name: "Executive Room",
      image: "https://images.unsplash.com/photo-1680503146476-abb8c752e1f4?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
      size: "38 m²",
      capacity: 2,
      features: ["Work desk", "Lounge access", "Free WiFi", "Premium toiletries"],
      price: 130
    }
  ];

  return (
    <section className="bg-[#F8FAFC] font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight mb-6">
          Available Rooms
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="group bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-[0_4px_16px_-6px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_-10px_rgba(0,122,204,0.18)] hover:-translate-y-1.5 transition-all duration-400"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#0F172A] text-[11.5px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  <Maximize className="w-3 h-3 text-[#007ACC]" />
                  {room.size}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
                    {room.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[12.5px] text-slate-500 font-medium flex-shrink-0 mt-0.5">
                    <Users className="w-3.5 h-3.5" />
                    {room.capacity}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-5">
                  {room.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#007ACC] flex-shrink-0" strokeWidth={2.5} />
                      <span className="text-[13px] text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price + Reserve */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-[22px] font-bold text-[#007ACC]">€{room.price}</span>
                    <span className="text-[13px] text-slate-500"> / night</span>
                  </div>

                  <button className="inline-flex items-center gap-1.5 bg-[#007ACC] hover:bg-[#0369A1] text-white text-[13.5px] font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_6px_16px_-4px_rgba(0,122,204,0.5)]">
                    Reserve
                    <ArrowRight className="w-3.5 h-3.5" />
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

export default RoomsSection;