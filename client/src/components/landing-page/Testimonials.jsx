import React from 'react';
import { Route, Search, Scale, MessageCircle } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      destination: "Amsterdam Trip",
      quote: "Sally compared multiple hotels for me and explained the pros and cons of each one. I found the perfect hotel without spending hours researching."
    },
    {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      destination: "Paris Getaway",
      quote: "I simply told Sally my budget and destination. She recommended the best options and helped me choose confidently. The whole trip was flawless."
    },
    {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      destination: "Rome Vacation",
      quote: "The booking experience was incredibly smooth. Everything from finding hotels to receiving confirmation emails worked perfectly."
    },
    {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      destination: "Tokyo Business Trip",
      quote: "Sally helped me find a quiet hotel near the conference center with fast Wi-Fi. The check-in and check-out process was completely seamless."
    },
    {
      name: "Sophia Martinez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      destination: "Bali Retreat",
      quote: "I wanted a beachfront villa under budget. CheckInn made it so easy to compare options, and the stay was magical from start to finish."
    }
  ];

  const StarRating = () => (
    <div className="flex space-x-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="relative py-24 bg-[#F8FAFC] font-sans overflow-hidden selection:bg-[#007ACC] selection:text-white">
      {/* Inline styles for the marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            Loved by Travelers
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-10">
            See how travelers are using CheckInn and Sally to plan smarter trips.
          </p>

          {/* Feature Context: Meet Sally */}
          <div className="inline-flex flex-col items-center bg-white rounded-2xl px-9 py-10 shadow-sm border border-slate-200 max-w-md mx-auto text-center">

            <div className="w-14 h-14 rounded-full bg-[#007ACC] flex items-center justify-center mb-5">
              <Route className="w-[26px] h-[26px] text-white" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#007ACC] bg-[#007ACC]/10 px-3.5 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007ACC]" />
              Meet Sally
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mb-3 leading-snug">
              Your AI travel copilot
            </h3>

            <p className="text-[15px] text-slate-600 leading-relaxed max-w-sm mb-7">
              Sally compares hotels side by side, weighs the tradeoffs against what matters to you, and turns hours of tab-juggling into one confident decision.
            </p>

            <div className="flex justify-center gap-7 pt-6 border-t border-slate-100 w-full">
              <div className="text-center">
                <Search className="w-[18px] h-[18px] text-[#007ACC] mx-auto" />
                <p className="text-[12px] text-slate-500 mt-1.5">Instant search</p>
              </div>
              <div className="text-center">
                <Scale className="w-[18px] h-[18px] text-[#007ACC] mx-auto" />
                <p className="text-[12px] text-slate-500 mt-1.5">Side-by-side compare</p>
              </div>
              <div className="text-center">
                <MessageCircle className="w-[18px] h-[18px] text-[#007ACC] mx-auto" />
                <p className="text-[12px] text-slate-500 mt-1.5">Plain-language advice</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scrolling Marquee Container */}
      <div className="marquee-container flex relative w-full overflow-hidden pb-8 pt-4">
        {/* We map the track twice to create a seamless infinite loop */}
        {[1, 2].map((trackIndex) => (
          <div
            key={trackIndex}
            className="animate-marquee flex whitespace-nowrap pl-6"
            aria-hidden={trackIndex === 2 ? "true" : "false"}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-[320px] sm:w-[380px] shrink-0 whitespace-normal bg-white border border-slate-200 rounded-2xl p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] mx-3 flex flex-col justify-between h-full transition-shadow duration-300 hover:shadow-[0_12px_30px_-8px_rgba(0,122,204,0.12)] cursor-default"
              >
                <div>
                  <StarRating />
                  <p className="text-slate-700 text-[15px] leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center mt-auto pt-5 border-t border-slate-100">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                  />
                  <div className="ml-3">
                    <div className="flex items-center">
                      <h4 className="text-[14px] font-bold text-[#0F172A]">
                        {testimonial.name}
                      </h4>
                    </div>
                    {/* Verified Checkout Badge */}
                    <div className="flex items-center mt-1">
                      <svg className="w-3 h-3 text-emerald-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[12px] font-medium text-emerald-600">Verified Checkout</span>
                      <span className="mx-1.5 text-slate-300">•</span>
                      <span className="text-[12px] font-medium text-slate-500">{testimonial.destination}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth fading at the edges */}
      <div className="absolute left-0 w-16 md:w-32 h-full top-0 bg-gradient-to-r from-[#F8FAFC] to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 w-16 md:w-32 h-full top-0 bg-gradient-to-l from-[#F8FAFC] to-transparent pointer-events-none z-10"></div>
    </section>
  );
};

export default Testimonials;