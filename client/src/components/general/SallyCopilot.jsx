import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, MapPin } from 'lucide-react';

const SallyCopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  const suggestedPrompts = [
    "Amsterdam under €100/night",
    "Plan a weekend in Paris",
    "Family trip to Rome",
    "Hotels near Schiphol Airport",
    "Business trip to Berlin"
  ];

  // Micro-interaction: pulse the trigger button every 30s until first opened
  useEffect(() => {
    if (hasOpenedOnce) return;

    const interval = setInterval(() => {
      setIsPulsing(true);
      const timeout = setTimeout(() => setIsPulsing(false), 2000);
      return () => clearTimeout(timeout);
    }, 30000);

    return () => clearInterval(interval);
  }, [hasOpenedOnce]);

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const openDrawer = () => {
    setIsOpen(true);
    setHasOpenedOnce(true);
    setIsPulsing(false);
  };

  const handleSend = (text) => {
    const content = (text ?? inputValue).trim();
    if (!content) return;

    setMessages((prev) => [...prev, { role: 'user', content }]);
    setInputValue('');

    // Placeholder response — replace with a real API call to your backend / model
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'sally',
          content: "Let me look into that for you. In a connected build, I'd search live availability and bring back tailored options here."
        }
      ]);
    }, 600);
  };

  const handlePromptClick = (prompt) => {
    handleSend(prompt);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={openDrawer}
        className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-white text-[#0F172A] font-semibold border rounded-full shadow-[0_8px_24px_-8px_rgba(15,23,42,0.18)] hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.28)] hover:scale-[1.03] hover:border-[#007ACC] transition-all duration-300 ${
          isPulsing ? 'border-[#007ACC] px-6 py-3.5' : 'border-[#E2E8F0] px-5 py-3'
        } ${isOpen ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        style={{ fontSize: '14.5px' }}
      >
        <Sparkles className="w-4 h-4 text-[#007ACC]" />
        {isPulsing ? 'Need help planning?' : 'Ask Sally'}
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-[#0F172A]/20 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] lg:w-[460px] bg-white border-l border-[#E2E8F0] shadow-[-20px_0_60px_-15px_rgba(15,23,42,0.25)] z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-start justify-between mb-4">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#007ACC] bg-[#007ACC]/10 px-3 py-1.5 rounded-full">
              <span className="text-sm leading-none">✦</span>
              AI Travel Copilot
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#007ACC] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[19px] font-bold text-[#0F172A] leading-none">Sally</h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Online
                </span>
              </div>
              <p className="text-[13px] text-slate-500 mt-1">Your personal travel companion</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6">
          {messages.length === 0 ? (
            <div>
              <h3 className="text-[22px] font-bold text-[#0F172A] leading-snug mb-3">
                Hi 👋<br />I'm Sally.
              </h3>
              <p className="text-[14.5px] text-slate-600 leading-relaxed mb-7">
                I can help you discover hotels, compare options, plan trips, and manage bookings.
              </p>

              <p className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Try asking
              </p>
              <div className="flex flex-col gap-2.5">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="flex items-center gap-2.5 text-left bg-white border border-[#E2E8F0] hover:border-[#007ACC] hover:bg-[#007ACC]/5 rounded-xl px-4 py-3.5 transition-colors duration-200"
                  >
                    <MapPin className="w-4 h-4 text-[#007ACC] flex-shrink-0" />
                    <span className="text-[13.5px] font-medium text-[#0F172A]">{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-[14px] leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-[#007ACC] text-white rounded-2xl rounded-br-md'
                        : 'bg-white text-[#0F172A] border border-[#E2E8F0] rounded-2xl rounded-bl-md'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-6 py-5 border-t border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Sally about your next trip..."
              className="flex-1 bg-slate-50 border border-[#E2E8F0] rounded-full px-5 py-3 text-[14px] text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007ACC]/30 focus:border-[#007ACC] transition-colors duration-200"
            />
            <button
              onClick={() => handleSend()}
              aria-label="Send message"
              className="w-11 h-11 rounded-full bg-[#007ACC] hover:bg-[#0369A1] flex items-center justify-center flex-shrink-0 transition-colors duration-200"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SallyCopilot;