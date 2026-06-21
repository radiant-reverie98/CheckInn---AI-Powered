import React from 'react';
import { Camera, Images } from 'lucide-react';

const HotelGallery = ({ hotelName = "Amsterdam Grand Hotel" }) => {
  const images = {
    featured: "https://images.unsplash.com/photo-1607712617949-8c993d290809?ixlib=rb-4.1.0&auto=format&fit=crop&w=1400&q=80",
    topRight: "https://images.unsplash.com/photo-1612320743558-020669ff20e8?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
    bottomRight: "https://images.unsplash.com/photo-1630587148265-761cbd139043?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
  };

  const totalPhotos = 24;

  return (
    <section className="bg-[#F8FAFC] py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.43fr] gap-4 h-auto lg:h-[480px]">

          {/* Featured image — left, ~70% width on desktop */}
          <div className="group relative h-[320px] lg:h-full rounded-[20px] overflow-hidden cursor-pointer">
            <img
              src={images.featured}
              alt={`${hotelName} — featured view`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Image count badge */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#0F172A] text-[12px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
              <Camera className="w-3.5 h-3.5" />
              {totalPhotos} Photos
            </div>

            {/* Hotel name overlay */}
            <div className="absolute bottom-5 left-5 right-5">
              <h2 className="text-white text-2xl lg:text-[28px] font-bold tracking-tight drop-shadow-sm">
                {hotelName}
              </h2>
            </div>
          </div>

          {/* Right column — two stacked images */}
          <div className="grid grid-rows-2 gap-4 h-[420px] lg:h-full">

            {/* Top right image */}
            <div className="group relative rounded-[20px] overflow-hidden cursor-pointer">
              <img
                src={images.topRight}
                alt={`${hotelName} — interior detail`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Bottom right image with View All Photos button */}
            <div className="group relative rounded-[20px] overflow-hidden cursor-pointer">
              <img
                src={images.bottomRight}
                alt={`${hotelName} — additional view`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/85" />

              <button className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-[#0F172A] text-[12.5px] font-semibold px-3.5 py-2 rounded-lg shadow-md transition-all duration-300 hover:scale-[1.03]">
                <Images className="w-3.5 h-3.5 text-[#007ACC]" />
                View All Photos
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HotelGallery;