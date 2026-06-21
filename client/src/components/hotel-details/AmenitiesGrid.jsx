import React from 'react';
import {
  Wifi,
  Waves,
  Dumbbell,
  Sparkles,
  CircleParking,
  UtensilsCrossed,
  PlaneTakeoff,
  PawPrint,
  BellRing,
  AirVent
} from 'lucide-react';

const AmenitiesGrid = () => {
  const amenities = [
    { label: "Free WiFi", icon: Wifi },
    { label: "Swimming Pool", icon: Waves },
    { label: "Gym", icon: Dumbbell },
    { label: "Spa", icon: Sparkles },
    { label: "Parking", icon: CircleParking },
    { label: "Restaurant", icon: UtensilsCrossed },
    { label: "Airport Shuttle", icon: PlaneTakeoff },
    { label: "Pet Friendly", icon: PawPrint },
    { label: "Room Service", icon: BellRing },
    { label: "Air Conditioning", icon: AirVent }
  ];

  return (
    <section className="bg-[#F8FAFC] font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight mb-6">
          Amenities
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center gap-3 bg-white border border-[#E2E8F0] hover:border-[#007ACC]/40 rounded-2xl px-4 py-6 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,122,204,0.18)] hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-[#007ACC]/10 group-hover:bg-[#007ACC] flex items-center justify-center transition-colors duration-300">
                <amenity.icon
                  className="w-5 h-5 text-[#007ACC] group-hover:text-white transition-colors duration-300"
                  strokeWidth={1.75}
                />
              </div>
              <span className="text-[13.5px] font-semibold text-[#0F172A] leading-snug">
                {amenity.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AmenitiesGrid;