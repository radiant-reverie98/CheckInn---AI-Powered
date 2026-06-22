import React from 'react';
import { CalendarSearch } from 'lucide-react';
import BookingCard from './BookingCard';

const BookingsList = ({ status = "Upcoming" }) => {
  const allBookings = [
    {
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
      hotelName: "Prinsengracht Suites",
      location: "Centrum, Amsterdam",
      bookingId: "CHK-29841",
      checkIn: "12 Jul 2026",
      checkOut: "16 Jul 2026",
      guests: 2,
      roomType: "Premium Suite",
      status: "Upcoming",
      price: 580
    },
    {
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
      hotelName: "The Canal House Hotel",
      location: "Jordaan, Amsterdam",
      bookingId: "CHK-27310",
      checkIn: "28 Aug 2026",
      checkOut: "31 Aug 2026",
      guests: 1,
      roomType: "Deluxe King Room",
      status: "Upcoming",
      price: 330
    },
    {
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
      hotelName: "Het Vondelpark Boutique",
      location: "Vondelpark, Amsterdam",
      bookingId: "CHK-18823",
      checkIn: "02 Mar 2026",
      checkOut: "05 Mar 2026",
      guests: 2,
      roomType: "Executive Room",
      status: "Completed",
      price: 264
    },
    {
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
      hotelName: "Zuidas Tower Hotel",
      location: "Zuidas, Amsterdam",
      bookingId: "CHK-15502",
      checkIn: "19 Nov 2025",
      checkOut: "22 Nov 2025",
      guests: 3,
      roomType: "Premium Suite",
      status: "Cancelled",
      price: 495
    }
  ];

  const filteredBookings = allBookings.filter((b) => b.status === status);

  return (
    <section className="bg-[#F8FAFC] font-sans py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {filteredBookings.length > 0 ? (
          <div className="flex flex-col gap-5">
            {filteredBookings.map((booking, index) => (
              <BookingCard key={booking.bookingId || index} {...booking} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center bg-white border border-[#E2E8F0] rounded-2xl py-16 px-6">
            <div className="w-14 h-14 rounded-2xl bg-[#007ACC]/10 flex items-center justify-center mb-4">
              <CalendarSearch className="w-6 h-6 text-[#007ACC]" strokeWidth={1.75} />
            </div>
            <h3 className="text-[16px] font-bold text-[#0F172A] tracking-tight">
              No {status.toLowerCase()} bookings
            </h3>
            <p className="text-[13.5px] text-slate-500 mt-1.5 max-w-sm">
              You don't have any {status.toLowerCase()} trips yet. Once you do, they'll show up here.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default BookingsList;