import React from 'react';
import { Sparkles, MapPin, Star, Copy, ThumbsUp, ThumbsDown, RotateCcw, Check } from 'lucide-react';

/* ── Typing indicator ── */
const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3.5">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-2 h-2 bg-[#007ACC] rounded-full animate-bounce"
        style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
      />
    ))}
  </div>
);

/* ── Inline hotel card ── */
const HotelCard = ({ name, location, rating, reviews, price, image }) => (
  <div className="mt-3 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-[0_4px_16px_-6px_rgba(15,23,42,0.08)] max-w-xs">
    {image && (
      <div className="relative h-32 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-white text-[12px] font-bold">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" strokeWidth={0} />
          {rating}
          {reviews && <span className="font-normal text-white/80 ml-0.5">· {reviews} reviews</span>}
        </div>
      </div>
    )}
    <div className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="text-[13px] font-bold text-[#0F172A]">{name}</p>
        {location && (
          <p className="text-[11.5px] text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" />{location}
          </p>
        )}
      </div>
      {price && (
        <div className="text-right flex-shrink-0 ml-3">
          <p className="text-[15px] font-bold text-[#007ACC]">€{price}</p>
          <p className="text-[11px] text-slate-400">/ night</p>
        </div>
      )}
    </div>
  </div>
);

/* ── Action bar for AI messages ── */
const MessageActions = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {[
        { icon: copied ? Check : Copy, label: copied ? 'Copied' : 'Copy', action: handleCopy, active: copied },
        { icon: ThumbsUp, label: 'Helpful', action: () => {} },
        { icon: ThumbsDown, label: 'Not helpful', action: () => {} },
        { icon: RotateCcw, label: 'Regenerate', action: () => {} }
      ].map(({ icon: Icon, label, action, active }) => (
        <button
          key={label}
          onClick={action}
          title={label}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11.5px] font-medium transition-colors duration-200 ${
            active
              ? 'bg-[#007ACC]/10 text-[#007ACC]'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Icon className="w-3.5 h-3.5" strokeWidth={2} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};

/* ── Main ChatMessage component ── */
const ChatMessage = ({
  role = 'assistant',           // 'user' | 'assistant'
  text = '',
  timestamp,
  isTyping = false,
  hotel = null,                 // optional hotel card: { name, location, rating, reviews, price, image }
}) => {
  const isUser = role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end px-4 sm:px-0 font-sans">
        <div className="flex flex-col items-end max-w-[78%] sm:max-w-[62%]">
          <div className="bg-[#007ACC] text-white text-[14px] font-medium px-5 py-3.5 rounded-2xl rounded-tr-md leading-relaxed shadow-[0_4px_16px_-6px_rgba(0,122,204,0.45)]">
            {text}
          </div>
          {timestamp && (
            <span className="text-[11.5px] text-slate-400 mt-1.5 mr-1">{timestamp}</span>
          )}
        </div>
      </div>
    );
  }

  /* ── Assistant message ── */
  return (
    <div className="flex items-start gap-3 px-4 sm:px-0 font-sans group">

      {/* Sally avatar */}
      <div className="relative flex-shrink-0 mt-0.5">
        <div className="w-9 h-9 rounded-[14px] bg-[#007ACC] flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(0,122,204,0.45)]">
          <Sparkles className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
      </div>

      <div className="flex-1 min-w-0 max-w-[82%] sm:max-w-[68%]">

        {/* Name + timestamp */}
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-[13px] font-bold text-[#0F172A]">Sally</span>
          {timestamp && (
            <span className="text-[11.5px] text-slate-400">{timestamp}</span>
          )}
        </div>

        {/* Bubble */}
        <div className="bg-white border border-[#E2E8F0] text-slate-700 text-[14px] px-5 py-3.5 rounded-2xl rounded-tl-md leading-relaxed shadow-[0_2px_10px_-4px_rgba(15,23,42,0.05)]">
          {isTyping ? (
            <TypingIndicator />
          ) : (
            <>
              <p className="whitespace-pre-wrap">{text}</p>
              {hotel && <HotelCard {...hotel} />}
            </>
          )}
        </div>

        {/* Action bar */}
        {!isTyping && <MessageActions />}
      </div>
    </div>
  );
};

/* ── Preview of all states ── */
export const ChatMessagePreview = () => (
  <section className="bg-[#F8FAFC] font-sans py-12">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-6">

      <ChatMessage
        role="user"
        text="Find me a luxury hotel in Amsterdam with a canal view under €200/night."
        timestamp="2:41 PM"
      />

      <ChatMessage
        role="assistant"
        text="I found 3 stunning options for you! The Prinsengracht Suites tops the list — canal-facing rooms from €145/night, rated 4.9★ by 421 guests. Shall I check availability for your dates?"
        timestamp="2:41 PM"
        hotel={{
          name: "Prinsengracht Suites",
          location: "Centrum, Amsterdam",
          rating: 4.9,
          reviews: 421,
          price: 145,
          image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=80"
        }}
      />

      <ChatMessage
        role="user"
        text="Yes, check for July 12–16, 2 adults."
        timestamp="2:43 PM"
      />

      <ChatMessage
        role="assistant"
        isTyping={true}
      />

    </div>
  </section>
);

export default ChatMessage;