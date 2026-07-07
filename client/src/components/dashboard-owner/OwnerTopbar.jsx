import React, { useState } from 'react';
import { Bell, Plus, BedDouble, Building2, ChevronDown, LogOut, Settings, User } from 'lucide-react';

const OwnerTopbar = ({
  ownerName = 'Tejendra',
  performanceDelta = 12,
  avatarUrl = '',
  notificationCount = 4,
  onAddProperty = () => {},
  onAddRoom = () => {}
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good Morning' :
    hour < 17 ? 'Good Afternoon' :
    'Good Evening';

  const initials = ownerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const notifications = [
    { id: 1, title: 'New booking confirmed',     desc: 'Deluxe King — Check-in tomorrow',   time: '2m ago',  dot: 'bg-emerald-500' },
    { id: 2, title: 'Guest review received',     desc: '★★★★★  Amsterdam Grand Hotel',      time: '1h ago',  dot: 'bg-[#007ACC]'   },
    { id: 3, title: 'Booking cancellation',      desc: 'Premium Suite — June 28',           time: '3h ago',  dot: 'bg-amber-400'   },
    { id: 4, title: 'Revenue milestone reached', desc: '€10,000 this month',                time: 'Yesterday', dot: 'bg-violet-500' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] shadow-[0_1px_4px_-2px_rgba(15,23,42,0.06)] font-sans">
      <div className="flex items-center justify-between px-6 h-16 gap-4">

        {/* Left: greeting */}
        <div className="min-w-0">
          <h1 className="text-[17px] font-bold text-[#0F172A] leading-tight tracking-tight truncate">
            {greeting}, {ownerName} 👋
          </h1>
          <p className="text-[12.5px] text-slate-500 leading-none mt-0.5 hidden sm:block">
            Your properties are performing{' '}
            <span className="text-emerald-600 font-semibold">{performanceDelta}% better</span>{' '}
            this month.
          </p>
        </div>

        {/* Right: actions + icons */}
        <div className="flex items-center gap-2.5 flex-shrink-0">

          {/* Add Property */}
          <button
            onClick={onAddProperty}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#007ACC] hover:bg-[#0369A1] text-white text-[13px] font-semibold px-3.5 py-2 rounded-xl transition-all duration-200 hover:shadow-[0_4px_12px_-4px_rgba(0,122,204,0.5)]"
          >
            <Building2 className="w-3.5 h-3.5" />
            Add Property
          </button>

          {/* Add Room */}
          <button
            onClick={onAddRoom}
            className="hidden sm:inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-[#0F172A] text-[13px] font-semibold px-3.5 py-2 rounded-xl border border-[#E2E8F0] hover:border-slate-300 transition-all duration-200"
          >
            <BedDouble className="w-3.5 h-3.5 text-slate-500" />
            Add Room
          </button>

          {/* Mobile add button (collapsed) */}
          <button
            onClick={onAddProperty}
            className="sm:hidden w-8 h-8 flex items-center justify-center bg-[#007ACC] text-white rounded-xl"
            aria-label="Add property"
          >
            <Plus className="w-4 h-4" />
          </button>

          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); }}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#0F172A] border border-transparent hover:border-[#E2E8F0] transition-all duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-[18px] h-[18px]" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_16px_40px_-12px_rgba(15,23,42,0.18)] z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <p className="text-[13.5px] font-bold text-[#0F172A]">Notifications</p>
                    <span className="text-[11px] font-semibold text-[#007ACC] bg-[#007ACC]/10 px-2 py-0.5 rounded-full">
                      {notificationCount} new
                    </span>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors duration-150"
                      >
                        <span className={`w-2 h-2 rounded-full ${n.dot} flex-shrink-0 mt-1.5`} />
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#0F172A] leading-snug">{n.title}</p>
                          <p className="text-[12px] text-slate-500 truncate">{n.desc}</p>
                        </div>
                        <span className="text-[11px] text-slate-400 flex-shrink-0 mt-0.5">{n.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 border-t border-slate-100">
                    <button className="w-full text-[12.5px] font-medium text-[#007ACC] hover:text-[#0369A1] text-center transition-colors duration-200">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile avatar + dropdown */}
          <div className="relative">
            <button
              onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
              className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-50 border border-transparent hover:border-[#E2E8F0] transition-all duration-200"
              aria-label="Profile menu"
            >
              <div className="w-7 h-7 rounded-full bg-[#007ACC] flex items-center justify-center text-white text-[11px] font-bold overflow-hidden flex-shrink-0">
                {avatarUrl
                  ? <img src={avatarUrl} alt={ownerName} className="w-full h-full object-cover" />
                  : initials
                }
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_16px_40px_-12px_rgba(15,23,42,0.18)] z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-[13px] font-semibold text-[#0F172A] leading-none">{ownerName}</p>
                    <p className="text-[11.5px] text-slate-500 mt-1">Hotel Partner</p>
                  </div>
                  <div className="py-1.5">
                    {[
                      { icon: User,     label: 'My Profile'   },
                      { icon: Settings, label: 'Settings'     }
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-slate-600 hover:bg-slate-50 hover:text-[#0F172A] transition-colors duration-150"
                      >
                        <item.icon className="w-3.5 h-3.5 text-slate-400" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 py-1.5">
                    <button className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-red-500 hover:bg-red-50 transition-colors duration-150">
                      <LogOut className="w-3.5 h-3.5" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default OwnerTopbar;