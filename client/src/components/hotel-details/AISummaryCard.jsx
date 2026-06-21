import React from 'react';
import { Sparkles, Check } from 'lucide-react';

const AISummaryCard = ({
  summary = "Excellent choice for couples and solo travelers. Located close to major attractions and public transport.",
  matchScore = 95,
  highlights = [
    "Great city-center access",
    "Excellent breakfast",
    "Fast WiFi",
    "Quiet neighborhood",
    "Highly rated by international travelers"
  ]
}) => {
  return (
    <div className="font-sans max-w-md">
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#007ACC]/40 via-[#007ACC]/10 to-transparent shadow-[0_8px_30px_-8px_rgba(0,122,204,0.25)]">

        <div className="relative rounded-2xl bg-white/70 backdrop-blur-xl overflow-hidden">

          {/* Soft gradient wash */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#007ACC]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-10 w-40 h-40 bg-[#007ACC]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative p-6">

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#007ACC] to-[#0369A1] flex items-center justify-center shadow-sm flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-[15.5px] font-bold text-[#0F172A] leading-tight">
                  Sally's Travel Insight
                </h3>
              </div>

              <div className="inline-flex items-center gap-1 bg-[#007ACC]/10 border border-[#007ACC]/20 text-[#007ACC] text-[11.5px] font-bold px-2.5 py-1 rounded-full flex-shrink-0">
                {matchScore}% Match
              </div>
            </div>

            {/* Summary */}
            <p className="text-[13.5px] text-slate-600 leading-relaxed mb-5">
              {summary}
            </p>

            {/* Highlights */}
            <div className="space-y-2.5">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#007ACC]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#007ACC]" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] text-slate-700 font-medium leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AISummaryCard;