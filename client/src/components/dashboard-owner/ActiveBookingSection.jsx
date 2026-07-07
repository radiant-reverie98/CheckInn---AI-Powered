import React, { useState } from 'react';
import {
  CalendarDays,
  ArrowRight,
  MoreVertical,
  Clock,
  CheckCircle2,
  IndianRupee,
  User,
  CalendarX,
  Plus
} from 'lucide-react';

const statusConfig = {
  'arriving': {
    label: 'Arriving Today',
    icon: Clock,
    colorClass: 'text-amber-600 bg-amber-50 border-amber-200'
  },
  'checked-in': {
    label: 'Checked In',
    icon: CheckCircle2,
    colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  }
};

const ActiveBookingsSection = () => {
  // Set to an empty array [] to trigger the empty state.
  // In a real app, this would be populated from your database.
  const [activeBookings, setActiveBookings] = useState([]);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_2px_10px_-4px_rgba(15,23,42,0.06)] font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
            <CalendarDays className="w-[18px] h-[18px] text-violet-600" strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#0F172A] leading-none">
              Active Bookings
            </h3>
            <p className="text-[12.5px] text-slate-400 mt-1">
              Guests currently on property or arriving today
            </p>
          </div>
        </div>
        <button className="text-[12.5px] font-semibold text-[#007ACC] hover:text-[#0069b3] transition-colors flex items-center gap-1 flex-shrink-0">
          View calendar
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Conditional Rendering: Empty State vs. List */}
      {activeBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-slate-50/30 rounded-b-2xl">
          <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4">
            <CalendarX className="w-6 h-6 text-violet-600" strokeWidth={1.75} />
          </div>
          <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1.5">
            No active bookings
          </h3>
          <p className="text-[13px] text-slate-400 mb-6 max-w-xs leading-relaxed">
            You don't have any guests arriving today or currently staying at the property.
          </p>
          
        </div>
      ) : (
        <>
          <div className="divide-y divide-[#EDF1F5]">
            {activeBookings.map((booking) => {
              const StatusIcon = statusConfig[booking.status].icon;
              
              return (
                <div
                  key={booking.id}
                  className="group px-6 py-4 flex items-center gap-5 hover:bg-slate-50/60 transition-colors duration-200"
                >
                  {/* Guest Avatar/Initials */}
                  <div className="w-10 h-10 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center flex-shrink-0">
                    <span className="text-[13px] font-semibold text-slate-600">
                      {booking.guestName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  {/* Core Info */}
                  <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    {/* Name & Room */}
                    <div className="sm:col-span-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-[14px] font-semibold text-[#0F172A] truncate">
                          {booking.guestName}
                        </h4>
                        <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                          {booking.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[12.5px] text-slate-500">
                        <span className="truncate">{booking.roomName}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="flex items-center gap-1 flex-shrink-0">
                          <User className="w-3 h-3" />
                          {booking.guests}
                        </span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="sm:col-span-3 text-[12.5px]">
                      <div className="font-medium text-[#0F172A] mb-1">
                        {booking.checkIn}
                      </div>
                      <div className="text-slate-500">
                        Out: {booking.checkOut}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="sm:col-span-3">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11.5px] font-semibold ${statusConfig[booking.status].colorClass}`}>
                        <StatusIcon className="w-3.5 h-3.5" strokeWidth={2} />
                        {statusConfig[booking.status].label}
                      </div>
                    </div>

                    {/* Amount & Payment */}
                    <div className="sm:col-span-2 text-right flex flex-col items-end">
                      <div className="flex items-center text-[14px] font-bold text-[#0F172A] mb-1">
                        <IndianRupee className="w-3.5 h-3.5 mr-0.5" strokeWidth={2.5} />
                        {booking.amount.toLocaleString('en-IN')}
                      </div>
                      <span className={`text-[11.5px] font-semibold ${booking.payment === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {booking.payment === 'paid' ? 'Paid' : 'Payment pending'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <button className="flex-shrink-0 w-8 h-8 rounded-lg text-slate-400 hover:text-[#0F172A] hover:bg-slate-200/50 flex items-center justify-center transition-colors">
                    <MoreVertical className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#E2E8F0] bg-slate-50/50 rounded-b-2xl">
            <p className="text-[12.5px] text-slate-500 text-center">
              Showing {activeBookings.length} active bookings
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ActiveBookingsSection;