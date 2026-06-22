import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Mic, ArrowUp, X } from 'lucide-react';

const examples = [
  { emoji: "🏝️", text: "Plan a 4-day trip to Bali." },
  { emoji: "🗼", text: "Find me a hotel in Paris under €150." },
  { emoji: "🚲", text: "Create an itinerary for Amsterdam." }
];

const SallyChatInput = ({ onSend }) => {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [listening, setListening] = useState(false);
  const [rows, setRows] = useState(1);
  const textareaRef = useRef(null);

  /* Auto-grow textarea */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const lineH = 24;
    const maxH = lineH * 6;
    const scrollH = el.scrollHeight;
    el.style.height = Math.min(scrollH, maxH) + 'px';
    el.style.overflowY = scrollH > maxH ? 'auto' : 'hidden';
    setRows(Math.min(Math.ceil(scrollH / lineH), 6));
  }, [value]);

  const canSend = value.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;
    onSend?.(value.trim());
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const injectExample = (text) => {
    setValue(text);
    textareaRef.current?.focus();
  };

  const toggleListening = () => setListening((p) => !p);

  return (
    <section className="bg-[#F8FAFC] font-sans py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Label row */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-7 h-7 rounded-xl bg-[#007ACC] flex items-center justify-center shadow-[0_4px_10px_-4px_rgba(0,122,204,0.5)]">
            <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2} />
          </div>
          <span className="text-[14px] font-bold text-[#0F172A]">
            Ask Sally
          </span>
          <span className="text-[12px] text-slate-400 font-medium">· AI Travel Assistant</span>
        </div>

        {/* Main input card */}
        <div
          className={`relative bg-white rounded-[24px] transition-all duration-300 ${
            focused
              ? 'shadow-[0_0_0_2px_#007ACC,0_16px_40px_-10px_rgba(0,122,204,0.2)]'
              : 'shadow-[0_4px_24px_-6px_rgba(15,23,42,0.1)] border border-[#E2E8F0]'
          }`}
        >
          {/* Textarea */}
          <div className="px-5 pt-5 pb-3">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKey}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Ask Sally anything about your next trip..."
              rows={1}
              className="w-full bg-transparent text-[15px] text-[#0F172A] placeholder:text-slate-400 outline-none resize-none leading-6 font-medium"
            />
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 pb-4 pt-1 gap-3">

            {/* Char hint */}
            <div className="flex items-center gap-2">
              {value.length > 0 && (
                <button
                  onClick={() => setValue('')}
                  className="flex items-center gap-1 text-[12px] text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}
              {value.length === 0 && (
                <span className="text-[12px] text-slate-400">
                  Press <kbd className="bg-slate-100 text-slate-500 text-[11px] font-semibold px-1.5 py-0.5 rounded-md border border-slate-200">Enter</kbd> to send
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Voice button */}
              <button
                onClick={toggleListening}
                title="Voice input"
                className={`relative w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  listening
                    ? 'bg-rose-500 text-white shadow-[0_4px_14px_-4px_rgba(239,68,68,0.6)]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                {listening && (
                  <span className="absolute inset-0 rounded-2xl bg-rose-500 animate-ping opacity-30" />
                )}
                <Mic className="w-4 h-4 relative z-10" strokeWidth={2} />
              </button>

              {/* Send button */}
              <button
                onClick={handleSend}
                disabled={!canSend}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  canSend
                    ? 'bg-[#007ACC] hover:bg-[#0369A1] text-white shadow-[0_4px_14px_-4px_rgba(0,122,204,0.55)] hover:shadow-[0_6px_20px_-6px_rgba(0,122,204,0.65)] active:scale-95'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Example prompts */}
        <div className="mt-5">
          <p className="text-[12px] text-slate-400 font-semibold uppercase tracking-wider mb-3">
            Try asking Sally
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2.5">
            {examples.map(({ emoji, text }) => (
              <button
                key={text}
                onClick={() => injectExample(text)}
                className="group flex items-center gap-2.5 bg-white hover:bg-[#007ACC] border border-[#E2E8F0] hover:border-[#007ACC] text-left px-4 py-3 rounded-2xl transition-all duration-300 hover:shadow-[0_6px_20px_-6px_rgba(0,122,204,0.4)] flex-1 sm:flex-none"
              >
                <span className="text-[16px] flex-shrink-0">{emoji}</span>
                <span className="text-[13px] font-semibold text-slate-600 group-hover:text-white transition-colors duration-300 leading-snug">
                  {text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-[12px] text-slate-400 text-center mt-5 leading-relaxed">
          Sally may occasionally make mistakes. Always verify important travel details.
        </p>

      </div>
    </section>
  );
};

export default SallyChatInput;