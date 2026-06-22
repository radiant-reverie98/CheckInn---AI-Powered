import React, { useState, useRef, useEffect } from 'react';
import { PlaneTakeoff, CheckCircle2, XCircle } from 'lucide-react';

const BookingsTabs = ({ activeTab = "Upcoming", onTabChange = () => {} }) => {
  const tabs = [
    { label: "Upcoming", icon: PlaneTakeoff, count: 3 },
    { label: "Completed", icon: CheckCircle2, count: 12 },
    { label: "Cancelled", icon: XCircle, count: 1 }
  ];

  const activeIndex = tabs.findIndex((tab) => tab.label === activeTab);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  useEffect(() => {
    const node = tabRefs.current[activeIndex];
    if (node) {
      setIndicatorStyle({ left: node.offsetLeft, width: node.offsetWidth });
    }
  }, [activeIndex]);

  return (
    <section className="bg-[#F8FAFC] font-sans py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative inline-flex w-full sm:w-auto items-center bg-white border border-[#E2E8F0] rounded-2xl p-1.5 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.05)] overflow-x-auto">

          {/* Sliding indicator */}
          <div
            className="absolute top-1.5 bottom-1.5 bg-[#007ACC] rounded-xl transition-all duration-300 ease-out"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />

          {tabs.map((tab, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={tab.label}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => onTabChange(tab.label)}
                className={`relative z-10 flex items-center justify-center gap-2 flex-1 sm:flex-none px-5 sm:px-6 py-2.5 rounded-xl text-[13.5px] font-semibold whitespace-nowrap transition-colors duration-300 ${
                  isActive ? "text-white" : "text-slate-500 hover:text-[#0F172A]"
                }`}
              >
                <tab.icon className="w-4 h-4" strokeWidth={2} />
                {tab.label}
                <span
                  className={`text-[11.5px] font-bold px-1.5 py-0.5 rounded-md transition-colors duration-300 ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BookingsTabs;