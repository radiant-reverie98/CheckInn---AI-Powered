import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  MessageSquareHeart,
  Star,
  Paperclip,
  MoreHorizontal,
  Coffee
} from 'lucide-react';

const initialMessages = [
  {
    id: 1,
    sender: 'sally',
    text: "Hi there! 👋 I'm Sally. I've been taking a look at how Sunset Villa is doing this week, and honestly, you're doing a fantastic job!",
    timestamp: 'Just now'
  },
  {
    id: 2,
    sender: 'sally',
    text: "Your guests are loving the cleanliness (4.9/5 stars! ✨). However, I did notice a couple of recent reviews mentioned the living room AC was a bit noisy. \n\nWould you like me to go ahead and schedule a quick maintenance check, or should we focus on brainstorming some ways to get your November calendar fully booked?",
    timestamp: 'Just now'
  }
];

const quickActions = [
  { icon: Sparkles, label: 'How can I boost my Q4 bookings?' },
  { icon: Star, label: 'What are guests saying lately?' },
  { icon: MessageSquareHeart, label: 'Help me reply to a review' }
];

const SallySection = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
      timestamp: 'Just now'
    };
    
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Sally thinking and responding
    setTimeout(() => {
      const sallyReply = {
        id: Date.now() + 1,
        sender: 'sally',
        text: "I'd love to help with that! Let me quickly grab a coffee ☕ and run through your latest property data so I can give you the best advice...",
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, sallyReply]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_2px_10px_-4px_rgba(15,23,42,0.06)] font-sans flex flex-col h-[600px]">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-slate-50/50 rounded-t-2xl flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#007ACC] to-[#00a3ff] flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5 text-white" strokeWidth={1.75} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-[15px] font-semibold text-[#0F172A] leading-none">
                Chat with Sally
              </h3>
              <span className="text-[14px]">👋</span>
            </div>
            <p className="text-[12.5px] text-slate-500 mt-1">
              Your friendly co-host and property assistant
            </p>
          </div>
        </div>
        <button className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#0F172A] hover:bg-slate-200/50 flex items-center justify-center transition-colors">
          <MoreHorizontal className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]/50">
        {messages.map((msg) => {
          const isSally = msg.sender === 'sally';
          return (
            <div key={msg.id} className={`flex gap-3 ${isSally ? '' : 'flex-row-reverse'}`}>
              {/* Avatar */}
              {isSally && (
                <div className="w-8 h-8 rounded-full bg-[#007ACC]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-[#007ACC]" strokeWidth={2} />
                </div>
              )}
              
              {/* Message Bubble */}
              <div className={`flex flex-col ${isSally ? 'items-start' : 'items-end'} max-w-[85%]`}>
                <div 
                  className={`px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                    isSally 
                      ? 'bg-white border border-[#E2E8F0] text-[#0F172A] rounded-tl-sm' 
                      : 'bg-[#007ACC] text-white rounded-tr-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[11px] font-medium text-slate-400 mt-1.5 px-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#007ACC]/10 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-[#007ACC]" strokeWidth={2} />
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5 shadow-sm">
              <div className="w-1.5 h-1.5 bg-[#007ACC]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-[#007ACC]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-[#007ACC]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-[#E2E8F0] rounded-b-2xl flex-shrink-0">
        
        {/* Quick Actions */}
        <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
          {quickActions.map((action, index) => (
            <button 
              key={index}
              onClick={() => setInputValue(action.label)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-[#E2E8F0] shadow-sm rounded-full text-[12.5px] font-medium text-slate-600 transition-colors whitespace-nowrap"
            >
              <action.icon className="w-3.5 h-3.5 text-[#007ACC]" strokeWidth={2} />
              {action.label}
            </button>
          ))}
        </div>

        {/* Chat Input Form */}
        <form 
          onSubmit={handleSendMessage}
          className="flex items-end gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-2 focus-within:ring-2 focus-within:ring-[#007ACC]/20 focus-within:border-[#007ACC] transition-all"
        >
          <button 
            type="button" 
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
          >
            <Paperclip className="w-5 h-5" strokeWidth={1.75} />
          </button>
          
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about your property..."
            className="w-full max-h-32 bg-transparent text-[13.5px] text-[#0F172A] placeholder:text-slate-400 resize-none outline-none py-2 px-1 scrollbar-hide min-h-[40px]"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2.5 bg-[#007ACC] hover:bg-[#0069b3] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4" strokeWidth={2} />
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default SallySection;