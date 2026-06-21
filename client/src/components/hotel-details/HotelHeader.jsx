import React, { useState } from 'react';
import { Star, MapPin, Heart, Share2 } from 'lucide-react';

const HotelHeader = ({
  hotelName = "Amsterdam Grand Hotel",
  rating = 4.8,
  reviewCount = 1248,
  location = "Amsterdam, Netherlands",
  pricePerNight = 95
}) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

          {/* Left: hotel info */}
          <div className="flex-1">
            <h1 className="text-[28px] sm:text-[32px] font-bold text-[#0F172A] tracking-tight mb-3">
              {hotelName}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {/* Star rating */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rating)
                          ? 'fill-amber-400 text-amber-400'
                          : i < rating
                          ? 'fill-amber-400/50 text-amber-400'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[15px] font-bold text-[#0F172A]">{rating}</span>
              </div>

              <span className="text-slate-300">•</span>

              {/* Review count */}
              <span className="text-[14px] text-slate-600 font-medium underline decoration-slate-300 underline-offset-2 cursor-pointer hover:text-[#007ACC] hover:decoration-[#007ACC] transition-colors duration-200">
                {reviewCount.toLocaleString()} Reviews
              </span>

              <span className="text-slate-300">•</span>

              {/* Location */}
              <div className="flex items-center gap-1 text-[14px] text-slate-600 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#007ACC]" />
                {location}
              </div>
            </div>
          </div>

          {/* Right: price + actions */}
          <div className="flex items-center justify-between lg:flex-col lg:items-end gap-4 lg:gap-3">

            {/* Price */}
            <div className="text-right">
              <span className="text-[30px] sm:text-[34px] font-bold text-[#007ACC] leading-none">
                €{pricePerNight}
              </span>
              <span className="text-[14px] text-slate-500 font-medium"> / night</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsSaved((v) => !v)}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-[#E2E8F0] hover:border-slate-300 text-[#0F172A] text-[13.5px] font-medium px-4 py-2.5 rounded-xl transition-all duration-200"
              >
                <Heart
                  className={`w-4 h-4 transition-colors duration-200 ${
                    isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-500'
                  }`}
                />
                {isSaved ? 'Saved' : 'Save Hotel'}
              </button>

              <button
                className="inline-flex items-center justify-center w-[42px] h-[42px] bg-white hover:bg-slate-50 border border-[#E2E8F0] hover:border-slate-300 rounded-xl transition-all duration-200"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HotelHeader;