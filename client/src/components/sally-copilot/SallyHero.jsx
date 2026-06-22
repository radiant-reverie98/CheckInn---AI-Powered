import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, CalendarDays, Hotel, Route, ArrowRight, Star } from 'lucide-react';

const capabilities = [
  "finding the perfect hotel for your budget...",
  "planning a 7-day Paris itinerary...",
  "comparing resorts in Bali...",
  "booking family-friendly stays...",
  "discovering hidden gems in Tokyo...",
  "creating a romantic weekend getaway..."
];

const chips = [
  { icon: Hotel, label: "Find Hotels" },
  { icon: MapPin, label: "Explore Destinations" },
  { icon: CalendarDays, label: "Plan Itinerary" },
  { icon: Route, label: "Build Trip" }
];

const messages = [
  {
    from: "user",
    text: "Find me a luxury hotel in Amsterdam with a canal view under €200/night."
  },
  {
    from: "sally",
    text: "I found 3 stunning options for you! The Prinsengracht Suites tops the list — canal-facing rooms from €145/night, rated 4.9★ by 421 guests. Shall I check availability for your dates?",
    hotel: { name: "Prinsengracht Suites", rating: 4.9, price: 145, location: "Centrum, Amsterdam" }
  }
];

const SallyHero = () => {
  const [capIndex, setCapIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [showMessages, setShowMessages] = useState([false, false]);

  /* Typewriter */
  useEffect(() => {
    const target = capabilities[capIndex];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 38);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 18);
        return () => clearTimeout(t);
      } else {
        setCapIndex((i) => (i + 1) % capabilities.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, capIndex]);

  /* Stagger chat messages */
  useEffect(() => {
    const t0 = setTimeout(() => setShowMessages([true, false]), 600);
    const t1 = setTimeout(() => setShowMessages([true, true]), 1800);
    return () => { clearTimeout(t0); clearTimeout(t1); };
  }, []);

  return (
    <section className="bg-[#F8FAFC] font-sans py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left: Copy ── */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#007ACC]/10 border border-[#007ACC]/20 text-[#007ACC] text-[12.5px] font-bold px-3.5 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
              AI Travel Assistant · Powered by CheckInn
            </div>

            <h1 className="text-[40px] sm:text-[52px] font-bold text-[#0F172A] tracking-tight leading-[1.1] mb-5">
              Meet{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#007ACC]">Sally</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-[#007ACC]/10 rounded-sm -z-0" />
              </span>
              <br />
              <span className="text-[32px] sm:text-[38px] text-slate-500 font-semibold">
                Your AI-powered travel companion.
              </span>
            </h1>

            <p className="text-[15.5px] text-slate-600 leading-relaxed max-w-lg mb-8">
              Sally helps you discover the perfect hotels, craft personalised itineraries,
              and uncover the world's finest travel experiences — all in one conversation.
            </p>

            {/* Typewriter */}
            <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-2xl px-5 py-4 shadow-[0_4px_16px_-6px_rgba(15,23,42,0.06)] mb-8 max-w-lg">
              <Sparkles className="w-4 h-4 text-[#007ACC] flex-shrink-0" strokeWidth={2} />
              <span className="text-[13.5px] text-slate-500">Sally is&nbsp;</span>
              <span className="text-[13.5px] font-semibold text-[#007ACC]">{displayed}</span>
              <span className="w-0.5 h-4 bg-[#007ACC] animate-pulse ml-0.5 flex-shrink-0 rounded-full" />
            </div>

            {/* Capability chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              {chips.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white border border-[#E2E8F0] hover:border-[#007ACC]/40 hover:shadow-[0_4px_14px_-4px_rgba(0,122,204,0.18)] text-[#0F172A] text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 cursor-default">
                  <Icon className="w-3.5 h-3.5 text-[#007ACC]" strokeWidth={2} />
                  {label}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-2 bg-[#007ACC] hover:bg-[#0369A1] text-white text-[14px] font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_24px_-6px_rgba(0,122,204,0.55)] active:scale-95">
                <Sparkles className="w-4 h-4" strokeWidth={2} />
                Chat with Sally
              </button>
              <button className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#007ACC] hover:text-[#0369A1] transition-colors duration-200">
                See how it works
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Right: Chat mockup ── */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#007ACC]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-10 w-64 h-64 bg-[#007ACC]/6 rounded-full blur-3xl pointer-events-none" />

            <div className="relative bg-white border border-[#E2E8F0] rounded-[28px] shadow-[0_24px_64px_-16px_rgba(15,23,42,0.12)] overflow-hidden">

              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-[#007ACC]/5 to-transparent">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-[#007ACC] flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(0,122,204,0.5)]">
                    <Sparkles className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0F172A]">Sally</p>
                  <p className="text-[12px] text-emerald-500 font-medium">Online · Ready to help</p>
                </div>
                <div className="ml-auto flex gap-1.5">
                  {['bg-rose-400', 'bg-amber-400', 'bg-emerald-400'].map((c, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="px-5 py-5 space-y-4 min-h-[340px]">
                {/* User message */}
                <div className={`flex justify-end transition-all duration-500 ${showMessages[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="bg-[#007ACC] text-white text-[13.5px] font-medium px-4 py-3 rounded-2xl rounded-tr-md max-w-[82%] leading-relaxed shadow-[0_4px_12px_-4px_rgba(0,122,204,0.4)]">
                    {messages[0].text}
                  </div>
                </div>

                {/* Sally message */}
                <div className={`flex items-start gap-3 transition-all duration-500 delay-200 ${showMessages[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="w-8 h-8 rounded-xl bg-[#007ACC] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                    <Sparkles className="w-4 h-4 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] text-slate-700 text-[13.5px] px-4 py-3 rounded-2xl rounded-tl-md max-w-full leading-relaxed">
                      {messages[1].text}
                    </div>

                    {/* Hotel result card */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-[0_4px_16px_-6px_rgba(15,23,42,0.08)]">
                      <div className="relative h-28 overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
                          alt="Prinsengracht Suites"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-white text-[12px] font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" strokeWidth={0} />
                          {messages[1].hotel.rating} · 421 reviews
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-4 py-3">
                        <div>
                          <p className="text-[13px] font-bold text-[#0F172A]">{messages[1].hotel.name}</p>
                          <p className="text-[11.5px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />{messages[1].hotel.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[15px] font-bold text-[#007ACC]">€{messages[1].hotel.price}</p>
                          <p className="text-[11px] text-slate-400">/ night</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input bar */}
              <div className="px-5 py-4 border-t border-slate-100">
                <div className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-4 py-3">
                  <span className="text-[13px] text-slate-400 flex-1">Ask Sally anything about your trip...</span>
                  <button className="w-8 h-8 bg-[#007ACC] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SallyHero;