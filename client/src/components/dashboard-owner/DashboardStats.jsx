import React from 'react';
import {
  Building2,
  CalendarCheck,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  Target
} from 'lucide-react';

const stats = [
  {
    label: 'Total Properties',
    value: '12',
    trend: '+2 this month',
    trendType: 'positive',
    icon: Building2,
    iconBg: 'bg-[#007ACC]/10',
    iconColor: 'text-[#007ACC]'
  },
  {
    label: 'Active Bookings',
    value: '148',
    trend: '+18% vs last month',
    trendType: 'positive',
    icon: CalendarCheck,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600'
  },
  {
    label: 'Monthly Revenue',
    value: '₹8.4L',
    trend: '+12.4% vs last month',
    trendType: 'positive',
    icon: IndianRupee,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600'
  },
  {
    label: 'Occupancy Rate',
    value: '87%',
    trend: '+5% vs last month',
    trendType: 'positive',
    icon: TrendingUp,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600'
  }
];

const insights = [
  {
    priority: 'high',
    priorityLabel: 'Act soon',
    icon: AlertTriangle,
    title: 'Weekend rates are underpriced',
    description:
      'Comparable listings in your area are booked 22% higher for the next two Saturdays. Raising weekend rates could add an estimated ₹34,000 this month.',
    action: 'Review pricing'
  },
  {
    priority: 'medium',
    priorityLabel: 'Opportunity',
    icon: Target,
    title: 'Sunset Villa has low visibility',
    description:
      'This property gets 40% fewer views than similar listings. Adding 3 more photos and a virtual tour usually improves conversion by ~15%.',
    action: 'Improve listing'
  },
  {
    priority: 'low',
    priorityLabel: 'For your info',
    icon: Lightbulb,
    title: 'Guests are booking earlier',
    description:
      'Average lead time grew from 9 to 14 days over the past month. Consider extending your booking calendar further out.',
    action: 'See booking trends'
  }
];

const priorityStyles = {
  high: {
    dot: 'bg-red-500',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    badge: 'text-red-700 bg-red-50'
  },
  medium: {
    dot: 'bg-amber-500',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    badge: 'text-amber-700 bg-amber-50'
  },
  low: {
    dot: 'bg-[#007ACC]',
    iconBg: 'bg-[#007ACC]/10',
    iconColor: 'text-[#007ACC]',
    badge: 'text-[#007ACC] bg-[#007ACC]/10'
  }
};

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 font-sans">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_-10px_rgba(15,23,42,0.14)] hover:-translate-y-1 transition-all duration-300"
        >
          {/* Top row: label + icon */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide">
              {stat.label}
            </p>
            <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center flex-shrink-0`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} strokeWidth={1.75} />
            </div>
          </div>

          {/* KPI value */}
          <p className="text-[32px] font-bold text-[#0F172A] leading-none tracking-tight mb-3">
            {stat.value}
          </p>

          {/* Trend */}
          <div className="flex items-center gap-1.5">
            <div className={`inline-flex items-center gap-1 text-[12px] font-semibold px-2 py-0.5 rounded-full ${
              stat.trendType === 'positive'
                ? 'text-emerald-700 bg-emerald-50'
                : 'text-red-600 bg-red-50'
            }`}>
              <ArrowUpRight className="w-3 h-3" />
              {stat.trend.split(' ')[0]}
            </div>
            <span className="text-[12px] text-slate-400">
              {stat.trend.split(' ').slice(1).join(' ')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const AIInsightsSection = () => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_2px_10px_-4px_rgba(15,23,42,0.06)] font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#007ACC]/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-[18px] h-[18px] text-[#007ACC]" strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#0F172A] leading-none">
              AI Insights
            </h3>
            <p className="text-[12.5px] text-slate-400 mt-1">
              Generated from your portfolio's performance this week
            </p>
          </div>
        </div>
        <button className="text-[12.5px] font-semibold text-[#007ACC] hover:text-[#0069b3] transition-colors flex items-center gap-1 flex-shrink-0">
          View all
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Insight rows */}
      <div className="divide-y divide-[#EDF1F5]">
        {insights.map((insight, index) => {
          const style = priorityStyles[insight.priority];
          return (
            <div
              key={index}
              className="group px-6 py-5 flex items-start gap-4 hover:bg-slate-50/60 transition-colors duration-200"
            >
              <div className={`w-10 h-10 rounded-xl ${style.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <insight.icon className={`w-[18px] h-[18px] ${style.iconColor}`} strokeWidth={1.75} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="text-[14px] font-semibold text-[#0F172A]">
                    {insight.title}
                  </h4>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${style.badge}`}>
                    {insight.priorityLabel}
                  </span>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed max-w-2xl">
                  {insight.description}
                </p>
              </div>

              <button className="flex-shrink-0 self-center text-[12.5px] font-semibold text-slate-500 hover:text-[#007ACC] transition-colors flex items-center gap-1 whitespace-nowrap opacity-0 group-hover:opacity-100">
                {insight.action}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-6 p-6 bg-[#F8FAFC] min-h-screen">
      <DashboardStats />
      <AIInsightsSection />
    </div>
  );
};

export default Dashboard;
export { DashboardStats, AIInsightsSection };