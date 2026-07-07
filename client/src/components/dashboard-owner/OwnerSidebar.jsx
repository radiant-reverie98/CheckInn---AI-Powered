import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  Building2,
  BedDouble,
  CalendarCheck,
  Users,
  BarChart3,
  Sparkles,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut
} from 'lucide-react';

const navItems = [
  { id: 'dashboard',  label: 'Dashboard',  icon: LayoutDashboard, href: '/owner/dashboard' },
  { id: 'properties', label: 'Properties', icon: Building2,       href: '/properties' },
  { id: 'rooms',      label: 'Rooms',      icon: BedDouble,       href: '/rooms' },
  { id: 'bookings',   label: 'Bookings',   icon: CalendarCheck,   href: '/bookings' },
  { id: 'guests',     label: 'Guests',     icon: Users,           href: '/guests' },
  { id: 'analytics',  label: 'Analytics',  icon: BarChart3,       href: '/analytics' },
  { id: 'sally-ai',   label: 'Sally AI',   icon: Sparkles,        href: '/owner/sally' },
  { id: 'settings',   label: 'Settings',   icon: Settings,        href: '/settings' }
];

const OwnerSidebar = ({
  owner = { name: 'Tejendra Singh', propertyCount: 3, avatarUrl: '' }
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const initials = owner.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const SidebarContent = ({ mobile = false }) => (
    <div
      className={`flex flex-col h-full bg-white border-r border-[#E2E8F0] transition-all duration-300 ${
        mobile ? 'w-72' : collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center h-16 px-4 border-b border-[#E2E8F0] flex-shrink-0 ${collapsed && !mobile ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#007ACC] flex items-center justify-center flex-shrink-0">
            <Compass className="w-4 h-4 text-white" />
          </div>
          {(!collapsed || mobile) && (
            <div className="min-w-0">
              <p className="text-[14.5px] font-bold text-[#0F172A] tracking-tight leading-none">CheckInn</p>
              <p className="text-[10.5px] text-[#007ACC] font-semibold mt-0.5">Partner Portal</p>
            </div>
          )}
        </div>

        {!mobile && (
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="w-6 h-6 rounded-full bg-slate-100 hover:bg-[#007ACC]/10 hover:text-[#007ACC] text-slate-400 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed
              ? <ChevronRight className="w-3.5 h-3.5" />
              : <ChevronLeft className="w-3.5 h-3.5" />
            }
          </button>
        )}

        {mobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="w-7 h-7 rounded-full text-slate-400 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <Link
              key={item.id}
              to={item.href}
              onClick={() => {
                setActiveItem(item.id); 
                if (mobile) setMobileOpen(false); 
              }}
              aria-label={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group relative ${
                isActive
                  ? 'bg-[#007ACC]/10 text-[#007ACC]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]'
              } ${collapsed && !mobile ? 'justify-center' : ''}`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#007ACC] rounded-r-full" />
              )}
              <item.icon
                className={`w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200 ${
                  isActive ? 'text-[#007ACC]' : 'text-slate-400 group-hover:text-slate-600'
                }`}
                strokeWidth={isActive ? 2 : 1.75}
              />
              {(!collapsed || mobile) && (
                <span className={`text-[13.5px] font-medium leading-none ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              )}

              {/* Tooltip on collapsed state */}
              {collapsed && !mobile && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#0F172A] text-white text-[12px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50">
                  {item.label}
                  <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#0F172A]" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Owner profile card */}
      <div className={`flex-shrink-0 border-t border-[#E2E8F0] p-3 ${collapsed && !mobile ? 'px-2' : ''}`}>
        {collapsed && !mobile ? (
          // Collapsed — just avatar + logout stacked
          <div className="flex flex-col items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#007ACC] flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">
              {owner.avatarUrl
                ? <img src={owner.avatarUrl} alt={owner.name} className="w-full h-full rounded-full object-cover" />
                : initials
              }
            </div>
            <button
              onClick={() => {}}
              aria-label="Logout"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          // Expanded
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-full bg-[#007ACC] flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0 overflow-hidden">
                {owner.avatarUrl
                  ? <img src={owner.avatarUrl} alt={owner.name} className="w-full h-full object-cover" />
                  : initials
                }
              </div>
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-[#0F172A] leading-none truncate">{owner.name}</p>
                <p className="text-[11.5px] text-slate-500 mt-0.5">
                  {owner.propertyCount} {owner.propertyCount === 1 ? 'Property' : 'Properties'}
                </p>
              </div>
            </div>
            <button
              onClick={() => {}}
              className="w-full flex items-center justify-center gap-1.5 text-[12.5px] font-medium text-slate-500 hover:text-red-500 hover:bg-red-50 py-1.5 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────────────────── */}
      <aside className="hidden lg:flex h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* ── Mobile: hamburger trigger ────────────────────────────────────── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 w-9 h-9 bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-center shadow-sm"
        aria-label="Open sidebar"
      >
        <Menu className="w-4 h-4 text-[#0F172A]" />
      </button>

      {/* ── Mobile: backdrop ─────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-[#0F172A]/30 z-40"
        />
      )}

      {/* ── Mobile: drawer ───────────────────────────────────────────────── */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full z-50 shadow-2xl transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent mobile />
      </aside>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default OwnerSidebar;