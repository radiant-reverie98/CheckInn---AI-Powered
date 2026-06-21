import React from 'react';
import { Sparkles, ScaleIcon, Compass, CalendarCheck, ArrowRight, MapPin } from 'lucide-react';

const FinalCTA = () => {
  const highlights = [
    { icon: Sparkles, label: "Personalized hotel recommendations" },
    { icon: ScaleIcon, label: "Hotel comparison with pros and cons" },
    { icon: Compass, label: "Smart travel planning assistance" },
    { icon: CalendarCheck, label: "Seamless booking experience" }
  ];

  return (
    <section className="bg-gradient-to-b from-white to-[#EAF4FC] py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left column: content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#007ACC] bg-[#007ACC]/10 px-3.5 py-1.5 rounded-full mb-6">
              <span className="text-sm leading-none">✦</span>
              Meet Sally
            </div>

            <h2 className="text-4xl md:text-[44px] font-bold text-[#0F172A] tracking-tight leading-[1.15] mb-5">
              Travel smarter with Sally
            </h2>

            <p className="text-lg text-slate-700 font-medium mb-4">
              Your AI travel copilot for discovering, comparing, and booking the perfect stay.
            </p>

            <p className="text-[15px] text-slate-600 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Whether you're planning a weekend getaway, a business trip, or your next dream vacation, Sally helps you compare hotels, understand the pros and cons of each option, and book with confidence.
            </p>

            {/* Feature highlights */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-left bg-white/60 border border-[#E2E8F0] rounded-xl px-4 py-3.5"
                >
                  <div className="w-8 h-8 rounded-full bg-[#007ACC]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-[#007ACC]" />
                  </div>
                  <span className="text-[13.5px] font-medium text-[#0F172A] leading-snug">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button className="inline-flex items-center justify-center gap-2 bg-[#007ACC] hover:bg-[#0369A1] text-white text-[15px] font-semibold px-7 py-3.5 rounded-xl transition-colors duration-300 shadow-sm">
                Start Planning With Sally
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-[#0F172A] text-[15px] font-semibold px-7 py-3.5 rounded-xl border border-[#E2E8F0] transition-colors duration-300">
                Browse Hotels
              </button>
            </div>
          </div>

          {/* Right column: Sally mockup card */}
          <div className="relative">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_50px_-15px_rgba(0,122,204,0.18)] p-8 max-w-md mx-auto lg:ml-auto lg:mr-0">

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <div className="w-11 h-11 rounded-full bg-[#007ACC] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#0F172A] leading-none mb-1">Sally</p>
                  <p className="text-[12px] text-slate-500">Travel copilot</p>
                </div>
              </div>

              <p className="text-[14.5px] text-slate-700 leading-relaxed mb-5">
                I found 12 hotels in Amsterdam. Based on your budget and preferences, I recommend:
              </p>

              <div className="bg-[#F8FAFC] border border-slate-100 rounded-xl p-5 mb-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#007ACC]" />
                  <p className="text-[15px] font-bold text-[#0F172A]">Amsterdam Grand Hotel</p>
                </div>

                <div className="space-y-1.5 mb-3">
                  <p className="text-[13px] text-slate-600"><span className="text-emerald-600 font-medium">✓</span> Great location</p>
                  <p className="text-[13px] text-slate-600"><span className="text-emerald-600 font-medium">✓</span> Excellent WiFi</p>
                  <p className="text-[13px] text-slate-600"><span className="text-emerald-600 font-medium">✓</span> Breakfast included</p>
                </div>

                <p className="text-[13px] text-slate-500">
                  <span className="font-medium">•</span> Smaller rooms
                </p>
              </div>

              <p className="text-[13px] text-slate-500 leading-relaxed">
                Want to see how it compares to the other 11 options?
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;