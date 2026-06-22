import React from 'react';
import {
  MapPin,
  Hash,
  CalendarDays,
  Users,
  BedDouble,
  Eye,
  FileDown,
  PhoneCall
} from 'lucide-react';

const BookingCard = ({
  image = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
  hotelName = "Prinsengracht Suites",
  location = "Centrum, Amsterdam",
  bookingId = "CHK-29841",
  checkIn = "12 Jul 2026",
  checkOut = "16 Jul 2026",
  guests = 2,
  roomType = "Premium Suite",
  status = "Upcoming",
  price = 580
}) => {
  const statusStyles = {
    Upcoming: "bg-[#007ACC]/10 text-[#007ACC]",
    Completed: "bg-emerald-50 text-emerald-600",
    Cancelled: "bg-rose-50 text-rose-500"
  };

  const details = [
    { icon: Hash, label: "Booking ID", value: bookingId },
    { icon: CalendarDays, label: "Check-In", value: checkIn },
    { icon: CalendarDays, label: "Check-Out", value: checkOut },
    { icon: Users, label: "Guests", value: `${guests} ${guests === 1 ? "Guest" : "Guests"}` },
    { icon: BedDouble, label: "Room Type", value: roomType }
  ];

  return (
    <div className="group bg-white border border-[#E2E8F0] hover:border-[#007ACC]/30 rounded-2xl overflow-hidden shadow-[0_4px_16px_-6px_rgba(15,23,42,0.06)] hover:shadow-[0_18px_40px_-12px_rgba(0,122,204,0.18)] hover:-translate-y-1 transition-all duration-400 font-sans">

      <div className="flex flex-col lg:flex-row">

        {/* Image */}
        <div className="relative w-full lg:w-64 h-52 lg:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={image}
            alt={hotelName}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className={`absolute top-3 left-3 text-[11.5px] font-bold px-2.5 py-1 rounded-full shadow-sm ${statusStyles[status]}`}>
            {status}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
            <div>
              <h3 className="text-[18px] font-bold text-[#0F172A] tracking-tight">
                {hotelName}
              </h3>
              <div className="flex items-center gap-1.5 text-[13px] text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {location}
              </div>
            </div>

            <div className="text-left sm:text-right flex-shrink-0">
              <span className="text-[22px] font-bold text-[#007ACC]">€{price}</span>
              <span className="text-[13px] text-slate-500"> total</span>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6 pb-6 border-b border-slate-100">
            {details.map((item, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <item.icon className="w-3.5 h-3.5" />
                  <span className="text-[11.5px] font-medium uppercase tracking-wide">{item.label}</span>
                </div>
                <span className="text-[13.5px] font-semibold text-[#0F172A]">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-1.5 bg-[#007ACC] hover:bg-[#0369A1] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_6px_16px_-4px_rgba(0,122,204,0.5)]">
              <Eye className="w-3.5 h-3.5" />
              View Details
            </button>

            <button className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-[#E2E8F0] hover:border-slate-300 text-[#0F172A] text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-all duration-300">
              <FileDown className="w-3.5 h-3.5 text-slate-500" />
              Download Invoice
            </button>

            <button className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-[#E2E8F0] hover:border-slate-300 text-[#0F172A] text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-all duration-300">
              <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
              Contact Hotel
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingCard;