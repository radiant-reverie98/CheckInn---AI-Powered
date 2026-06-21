import React from 'react';
import Navbar from '../components/general/Navbar';
import Footer from '../components/general/Footer';
import HotelGallery from '../components/hotel-details/HotelGallery';
import HotelHeader from '../components/hotel-details/HotelHeader';
import AISummaryCard from '../components/hotel-details/AISummaryCard';
import AmenitiesGrid from '../components/hotel-details/AmenitiesGrid';
import RoomSection from '../components/hotel-details/RoomSection';
import ReviewsSection from '../components/hotel-details/ReviewsSection';
import BookingSidebar from '../components/hotel-details/BookingSidebar';
import SimilarHotels from '../components/hotel-details/SimilarHotels';
import HotelPolicies from '../components/hotel-details/HotelPolicies';

function HotelDetails() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      <HotelGallery />

      <HotelHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content column — everything that scrolls normally */}
          <div className="lg:col-span-2 space-y-12">
            <AISummaryCard />
            <AmenitiesGrid />
            <RoomSection />
            <ReviewsSection />
          </div>

          {/* Sidebar column — sticks in place as the main column scrolls */}
          <div className="lg:col-span-1">
            <BookingSidebar />
          </div>
        </div>
      </main>
         <SimilarHotels/>
         <HotelPolicies/>

      <Footer />
    </div>
  );
}

export default HotelDetails;