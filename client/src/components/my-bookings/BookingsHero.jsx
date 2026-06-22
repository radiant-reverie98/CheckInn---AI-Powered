import React from 'react';
import { Search, PlaneTakeoff, CheckCircle2, XCircle } from 'lucide-react';

const BookingsHero = () => {
  const stats = [
    {
      label: "Upcoming Trips",
      value: 3,
      icon: PlaneTakeoff,
      accent: "text-[#007ACC]",
      bg: "bg-[#007ACC]/10"
    },
    {
      label: "Completed Trips",
      value: 12,
      icon: CheckCircle2,
      accent: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      label: "Cancelled Trips",
      value: 1,
      icon: XCircle,
      accent: "text-rose-500",
      bg: "bg-rose-50"
    }
  ];

  return (
    <section className="bg-[#F8FAFC] font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white border border-[#E2E8F0] rounded-[28px] shadow-[0_4px_16px_-6px_rgba(15,23,42,0.06)] px-6 sm:px-10 py-10 sm:py-12 relative overflow-hidden">

          {/* Decorative gradient accent */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#007ACC]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 -left-20 w-72 h-72 bg-[#007ACC]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            {/* Title + subtitle */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-[28px] sm:text-[32px] font-bold text-[#0F172A] tracking-tight">
                  My Bookings
                </h1>
                <p className="text-[14.5px] text-slate-500 mt-1.5">
                  Manage your upcoming and past trips.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#007ACC] focus:bg-white rounded-xl pl-11 pr-4 py-3 text-[13.5px] text-[#0F172A] placeholder:text-slate-400 outline-none transition-all duration-300 focus:shadow-[0_0_0_4px_rgba(0,122,204,0.1)]"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#007ACC]/30 rounded-2xl px-5 py-5 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_28px_-10px_rgba(0,122,204,0.16)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-12 h-12 flex-shrink-0 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.accent}`} strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="block text-[24px] font-bold text-[#0F172A] tracking-tight leading-none">
                      {stat.value}
                    </span>
                    <span className="block text-[13px] font-medium text-slate-500 mt-1.5">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BookingsHero;