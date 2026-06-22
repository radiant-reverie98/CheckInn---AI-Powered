import React, { useState } from 'react';
import {
  Sparkles, MapPin, Wallet, CalendarDays, Hotel,
  Landmark, UtensilsCrossed, Lightbulb, Star,
  ArrowRight, ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react';

const hotels = [
  {
    name: "Prinsengracht Suites",
    type: "Boutique Hotel",
    rating: 4.9,
    reviews: 421,
    price: 145,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
    badge: "Top Pick"
  },
  {
    name: "The Canal House Hotel",
    type: "Heritage Hotel",
    rating: 4.8,
    reviews: 312,
    price: 110,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
    badge: "Popular"
  },
  {
    name: "Het Vondelpark Boutique",
    type: "Boutique Hotel",
    rating: 4.6,
    reviews: 198,
    price: 88,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80",
    badge: "Best Value"
  }
];

const attractions = [
  { name: "Rijksmuseum", category: "Museum", time: "3–4 hrs", must: true },
  { name: "Anne Frank House", category: "Historical", time: "1–2 hrs", must: true },
  { name: "Canal Ring Cruise", category: "Experience", time: "1 hr", must: false },
  { name: "Van Gogh Museum", category: "Museum", time: "2–3 hrs", must: true },
  { name: "Jordaan District Walk", category: "Neighbourhood", time: "2 hrs", must: false }
];

const restaurants = [
  { name: "De Kas", cuisine: "Dutch · Farm-to-table", price: "€€€", rating: 4.8 },
  { name: "Brouwerij 't IJ", cuisine: "Craft Beer · Snacks", price: "€", rating: 4.7 },
  { name: "Greetje", cuisine: "Traditional Dutch", price: "€€", rating: 4.6 }
];

const tips = [
  { title: "Best time to visit", text: "April–May for tulip season and mild weather. Book 6+ weeks ahead for peak dates." },
  { title: "Getting around", text: "Amsterdam is best explored by bike. Rent from MacBike or use the GVB tram network." },
  { title: "Budget tip", text: "The Amsterdam City Card covers museums and public transport — great value for 4 days." },
  { title: "Local etiquette", text: "Always use dedicated bike lanes and give way to cyclists on shared paths." }
];

const Section = ({ icon: Icon, label, color, children, count }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-slate-50/80 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-4 h-4 text-white" strokeWidth={1.75} />
          </div>
          <span className="text-[14px] font-bold text-[#0F172A]">{label}</span>
          <span className="text-[12px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {count}
          </span>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-slate-400" />
          : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && (
        <div className="border-t border-slate-100 bg-[#F8FAFC]">
          {children}
        </div>
      )}
    </div>
  );
};

const TravelRecommendationCard = () => (
  <section className="bg-[#F8FAFC] font-sans py-12">
    <div className="max-w-3xl mx-auto px-4 sm:px-6">

      {/* Outer card */}
      <div className="bg-white border border-[#E2E8F0] rounded-[28px] shadow-[0_8px_40px_-12px_rgba(15,23,42,0.12)] overflow-hidden">

        {/* Hero header */}
        <div className="relative h-52 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1512470604058-a9c3cf4e36b5?ixlib=rb-4.1.0&auto=format&fit=crop&w=1400&q=80"
            alt="Amsterdam"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Sally badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
            <div className="w-5 h-5 rounded-lg bg-[#007ACC] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" strokeWidth={2} />
            </div>
            <span className="text-[12px] font-bold text-[#0F172A]">Sally Recommendation</span>
          </div>

          {/* Destination info */}
          <div className="absolute bottom-5 left-5 right-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-white text-[28px] font-bold tracking-tight leading-tight drop-shadow-sm">
                  Amsterdam
                </h2>
                <div className="flex items-center gap-1.5 text-white/80 text-[13px] mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Netherlands, Europe
                </div>
              </div>
              <button className="flex-shrink-0 inline-flex items-center gap-1.5 bg-[#007ACC] hover:bg-[#0369A1] text-white text-[12.5px] font-bold px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_6px_16px_-4px_rgba(0,122,204,0.55)]">
                Book Now
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Trip stats bar */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-[#E2E8F0] bg-white">
          {[
            { icon: Wallet, label: "Budget", value: "€800", color: "text-emerald-600", bg: "bg-emerald-50" },
            { icon: CalendarDays, label: "Duration", value: "4 Days", color: "text-[#007ACC]", bg: "bg-[#007ACC]/10" },
            { icon: Hotel, label: "Hotels Found", value: "3 Options", color: "text-violet-600", bg: "bg-violet-50" }
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="flex flex-col items-center justify-center gap-1.5 py-5 px-3">
              <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${color}`} strokeWidth={1.75} />
              </div>
              <span className={`text-[15px] font-bold ${color}`}>{value}</span>
              <span className="text-[11.5px] text-slate-500 font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="p-5 flex flex-col gap-4">

          {/* Hotels */}
          <Section icon={Hotel} label="Recommended Hotels" color="bg-[#007ACC]" count={hotels.length}>
            <div className="flex flex-col divide-y divide-slate-100">
              {hotels.map((h) => (
                <div key={h.name} className="flex items-center gap-4 px-5 py-4 hover:bg-white/80 transition-colors duration-200">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[13.5px] font-bold text-[#0F172A] truncate">{h.name}</p>
                      <span className="text-[11px] font-bold bg-[#007ACC]/10 text-[#007ACC] px-2 py-0.5 rounded-full flex-shrink-0">
                        {h.badge}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-500 mt-0.5">{h.type}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" strokeWidth={0} />
                      <span className="text-[12px] font-semibold text-[#0F172A]">{h.rating}</span>
                      <span className="text-[12px] text-slate-400">· {h.reviews} reviews</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[16px] font-bold text-[#007ACC]">€{h.price}</p>
                    <p className="text-[11px] text-slate-400">/ night</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Attractions */}
          <Section icon={Landmark} label="Top Attractions" color="bg-violet-500" count={attractions.length}>
            <div className="flex flex-col divide-y divide-slate-100">
              {attractions.map((a) => (
                <div key={a.name} className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-white/80 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.must ? 'bg-[#007ACC]' : 'bg-slate-300'}`} />
                    <div>
                      <p className="text-[13.5px] font-semibold text-[#0F172A]">{a.name}</p>
                      <p className="text-[12px] text-slate-500">{a.category} · {a.time}</p>
                    </div>
                  </div>
                  {a.must && (
                    <span className="text-[11px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full flex-shrink-0">
                      Must-see
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* Restaurants */}
          <Section icon={UtensilsCrossed} label="Suggested Restaurants" color="bg-amber-500" count={restaurants.length}>
            <div className="flex flex-col divide-y divide-slate-100">
              {restaurants.map((r) => (
                <div key={r.name} className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-white/80 transition-colors duration-200">
                  <div>
                    <p className="text-[13.5px] font-semibold text-[#0F172A]">{r.name}</p>
                    <p className="text-[12px] text-slate-500 mt-0.5">{r.cuisine}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[12.5px] font-bold text-slate-500">{r.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" strokeWidth={0} />
                      <span className="text-[12.5px] font-bold text-[#0F172A]">{r.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* AI Tips */}
          <Section icon={Lightbulb} label="AI Travel Tips" color="bg-emerald-500" count={tips.length}>
            <div className="flex flex-col divide-y divide-slate-100">
              {tips.map((tip, i) => (
                <div key={tip.title} className="flex items-start gap-4 px-5 py-4 hover:bg-white/80 transition-colors duration-200">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[13.5px] font-bold text-[#0F172A]">{tip.title}</p>
                    <p className="text-[13px] text-slate-600 mt-0.5 leading-relaxed">{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-slate-100 bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#007ACC] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" strokeWidth={2} />
            </div>
            <span className="text-[12.5px] text-slate-500">
              Generated by <span className="font-bold text-[#0F172A]">Sally AI</span> · Personalised for you
            </span>
          </div>
          <button className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#007ACC] hover:text-[#0369A1] transition-colors duration-200">
            Full Plan
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  </section>
);

export default TravelRecommendationCard;