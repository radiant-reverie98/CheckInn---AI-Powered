import React, { useState } from 'react';
import {
  Clock,
  LogOut,
  CalendarX,
  Baby,
  PawPrint,
  CigaretteOff,
  CreditCard,
  ChevronDown
} from 'lucide-react';

const HotelPolicies = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const policies = [
    {
      icon: Clock,
      title: "Check-in Time",
      summary: "From 3:00 PM",
      details: "Check-in starts at 3:00 PM. Early check-in may be available on request, subject to room availability, and could include an additional charge. Please bring a valid photo ID and the credit card used for booking."
    },
    {
      icon: LogOut,
      title: "Check-out Time",
      summary: "Until 11:00 AM",
      details: "Check-out is until 11:00 AM. Late check-out can be arranged in advance at the front desk and is offered free of charge when availability allows, otherwise a half-day rate may apply."
    },
    {
      icon: CalendarX,
      title: "Cancellation Policy",
      summary: "Free cancellation up to 48h before arrival",
      details: "Cancel free of charge up to 48 hours before your scheduled arrival date. Cancellations made within 48 hours of check-in will incur a charge equal to one night's stay. No-shows are charged the full reservation amount."
    },
    {
      icon: Baby,
      title: "Child Policy",
      summary: "Children of all ages welcome",
      details: "Children of all ages are welcome. Kids under 12 stay free when using existing bedding. A cot can be added on request for an extra fee, and an extra bed can be arranged for children over 12 at an additional cost."
    },
    {
      icon: PawPrint,
      title: "Pet Policy",
      summary: "Pets allowed on request",
      details: "Pets are welcome in select rooms for an additional cleaning fee per stay. Please notify the hotel in advance so a suitable room can be prepared. Service animals are always accommodated free of charge."
    },
    {
      icon: CigaretteOff,
      title: "Smoking Policy",
      summary: "Non-smoking property",
      details: "This is a strictly non-smoking property, including all guest rooms, balconies, and indoor common areas. A designated outdoor smoking area is available near the main entrance. A cleaning surcharge applies if smoking is detected in a room."
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      summary: "Cards, digital wallets & cash accepted",
      details: "We accept Visa, Mastercard, and American Express, as well as Apple Pay and Google Pay. Cash payments are accepted at the front desk in euros. A valid card is required at check-in to cover incidentals."
    }
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-[#F8FAFC] font-sans py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-7">
          <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Hotel Policies
          </h2>
          <p className="text-[13.5px] text-slate-500 mt-1">
            Everything you need to know before you stay
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_4px_16px_-6px_rgba(15,23,42,0.06)] overflow-hidden divide-y divide-slate-100">
          {policies.map((policy, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="transition-colors duration-300">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center gap-4 px-5 sm:px-6 py-5 text-left hover:bg-slate-50/80 transition-colors duration-300"
                >
                  <div
                    className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      isOpen ? "bg-[#007ACC]" : "bg-[#007ACC]/10"
                    }`}
                  >
                    <policy.icon
                      className={`w-[18px] h-[18px] transition-colors duration-300 ${
                        isOpen ? "text-white" : "text-[#007ACC]"
                      }`}
                      strokeWidth={1.75}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold text-[#0F172A] tracking-tight">
                      {policy.title}
                    </h3>
                    <p className="text-[13px] text-slate-500 mt-0.5 truncate">
                      {policy.summary}
                    </p>
                  </div>

                  <ChevronDown
                    className={`w-4.5 h-4.5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#007ACC]" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[13.5px] leading-relaxed text-slate-600 px-5 sm:px-6 pb-5 pl-[4.5rem] sm:pl-[4.75rem]">
                      {policy.details}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HotelPolicies;