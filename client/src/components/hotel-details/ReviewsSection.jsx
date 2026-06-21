import React from 'react';
import { Star, BadgeCheck } from 'lucide-react';

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?ixlib=rb-4.1.0&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 5,
      date: "March 2026",
      content: "Sally compared multiple hotels for me and explained the pros and cons of each one clearly. The Amsterdam Grand Hotel was exactly what we needed — central, quiet at night, and the breakfast spread was genuinely excellent."
    },
    {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?ixlib=rb-4.1.0&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 5,
      date: "February 2026",
      content: "Needed a hotel near the conference center with reliable WiFi for back-to-back calls. Check-in and check-out were both seamless, and the room was quiet enough to actually get work done in the evenings."
    },
    {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.1.0&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4,
      date: "January 2026",
      content: "Lovely stay overall — the room was spotless and the staff went out of their way to help us plan our days. Only minor downside was the elevator wait during peak check-in hours, but otherwise no complaints."
    },
    {
      name: "Marcus Reid",
      avatar: "https://images.unsplash.com/photo-1543949806-2c9935e6aa78?ixlib=rb-4.1.0&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 5,
      date: "December 2025",
      content: "Booked a last-minute weekend trip and CheckInn made the whole process painless. The room exceeded what the photos showed, and the location put us within walking distance of everything we wanted to see."
    }
  ];

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="bg-[#F8FAFC] font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Guest Reviews
          </h2>
          <div className="hidden sm:flex items-center gap-1.5">
            <StarRating rating={5} />
            <span className="text-[13px] text-slate-500 font-medium ml-1">4.8 · 1,248 reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_10px_28px_-10px_rgba(15,23,42,0.12)] transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-[14px] font-bold text-[#0F172A]">{review.name}</h4>
                      <BadgeCheck className="w-3.5 h-3.5 text-[#007ACC]" />
                    </div>
                    <p className="text-[12px] text-slate-500">{review.date}</p>
                  </div>
                </div>

                <StarRating rating={review.rating} />
              </div>

              <p className="text-[13.5px] text-slate-600 leading-relaxed">
                {review.content}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;