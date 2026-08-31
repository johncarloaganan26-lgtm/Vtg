import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Headphones,
  Megaphone,
  Star,
  ArrowUpRight,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Circle,
  Calendar,
  Plus,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { PERFORMANCE_CHART_DATA } from '../../data/initialData';
import { ApplicationStatus } from '../../types';

export const DashboardView: React.FC = () => {
  const {
    applicants,
    agents,
    campaigns,
    tasks,
    toggleTask,
    setAdminSection,
    setSelectedApplicant,
    setIsApplyModalOpen,
  } = useApp();

  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);

  // Dynamically compute live metrics from AppContext
  const totalApplicantsCount = applicants.length;
  const activeAgentsCount = agents.filter((a) => a.status !== 'Offline').length;
  const activeCampaignsCount = campaigns.filter((c) => c.status === 'Active').length;
  const averageQaScore =
    agents.length > 0
      ? (agents.reduce((acc, a) => acc + (a.qaScore || 0), 0) / agents.length).toFixed(1)
      : '98.7';

  // Dynamically compute chart data based on live active agents and campaigns dials
  const totalDailyDials = campaigns.reduce((acc, c) => acc + (c.dialsToday || 0), 0) || 12480;
  const totalDailyConversions = agents.reduce((acc, a) => acc + (a.conversionsToday || 0), 0) || 312;

  const dynamicChartData = PERFORMANCE_CHART_DATA.map((item, idx, arr) => {
    const progressFactor = (idx + 1) / arr.length;
    const baseCalls = Math.round((totalDailyDials / 10) * (0.4 + 0.6 * progressFactor));
    const baseConversions = Math.round((totalDailyConversions / 2) * (0.4 + 0.6 * progressFactor));
    return {
      date: item.date,
      calls: timeRange === 'Last 7 Days' ? Math.round(baseCalls * 0.7) : baseCalls,
      conversions: timeRange === 'Last 7 Days' ? Math.round(baseConversions * 0.7) : baseConversions,
    };
  });

  // Status badge colors matching screenshot
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'For Initial Interview':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'For Assessment':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'For Final Interview':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'New Applicant':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Hired':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
      case 'Rejected':
      default:
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  // Task badge styling matching screenshot
  const getTaskBadge = (variant: string, text: string) => {
    switch (variant) {
      case 'urgent':
        return (
          <span className="w-5 h-5 rounded-full bg-red-700 text-white text-[10px] font-extrabold flex items-center justify-center">
            {text}
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
            {text}
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
            {text}
          </span>
        );
      case 'normal':
      default:
        return (
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
            {text}
          </span>
        );
    }
  };

  // Custom Recharts Tooltip matching screenshot
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 text-xs">
          <div className="font-bold text-slate-800 mb-2">{label}</div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]" />
                <span>Outbound Calls</span>
              </div>
              <span className="font-extrabold text-slate-900">
                {payload[0]?.value?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FB7185]" />
                <span>Conversions</span>
              </div>
              <span className="font-extrabold text-slate-900">
                {payload[1]?.value?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="admin-dashboard-view" className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner matching screenshot */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back, <span className="font-extrabold text-black">Admin</span> 👋
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Here's what's happening at Vigorous Telemarketing Group today.
        </p>
      </div>

      {/* 4 Stat Metric Cards: 2x2 Grid on mobile (grid-cols-2) and responsive sizing */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Total Applicants */}
        <div
          id="stat-card-applicants"
          className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4"
        >
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 sm:w-6 sm:h-6 text-[#B91C1C]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate">Total Applicants</div>
            <div className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight my-0.5">
              {totalApplicantsCount.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              <span className="truncate">12% this month</span>
            </div>
          </div>
        </div>

        {/* Active Agents */}
        <div
          id="stat-card-agents"
          className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4"
        >
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
            <Headphones className="w-4 h-4 sm:w-6 sm:h-6 text-[#B91C1C]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate">Active Agents</div>
            <div className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight my-0.5">
              {activeAgentsCount.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              <span className="truncate">6% this month</span>
            </div>
          </div>
        </div>

        {/* Active Campaigns */}
        <div
          id="stat-card-campaigns"
          className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4"
        >
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
            <Megaphone className="w-4 h-4 sm:w-6 sm:h-6 text-[#B91C1C]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate">Active Campaigns</div>
            <div className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight my-0.5">
              {activeCampaignsCount.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              <span className="truncate">2 new this month</span>
            </div>
          </div>
        </div>

        {/* Average QA Score */}
        <div
          id="stat-card-qa"
          className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4"
        >
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
            <Star className="w-4 h-4 sm:w-6 sm:h-6 text-[#B91C1C]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate">Average QA Score</div>
            <div className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight my-0.5">
              {averageQaScore}%
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              <span className="truncate">1.2% this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Chart & Quick Actions / Right Applicants & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Performance Chart + Quick Actions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Performance Overview Card matching screenshot */}
          <div
            id="performance-overview-card"
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs"
          >
            {/* Header & Date Range */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Performance Overview
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Outbound calls, conversions and overall team performance
                </p>
              </div>

              {/* Time range selector matching screenshot */}
              <div className="relative">
                <button
                  onClick={() => setTimeRangeOpen(!timeRangeOpen)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{timeRange}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {timeRangeOpen && (
                  <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-20 text-xs font-semibold">
                    {['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setTimeRange(opt);
                          setTimeRangeOpen(false);
                        }}
                        className={`w-full px-3.5 py-1.5 text-left hover:bg-slate-50 ${
                          timeRange === opt ? 'text-red-700 font-bold bg-red-50/50' : 'text-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Area Chart matching screenshot */}
            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dynamicChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    {/* Crimson gradient */}
                    <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B91C1C" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#B91C1C" stopOpacity={0.0} />
                    </linearGradient>
                    {/* Pink gradient */}
                    <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FB7185" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#FB7185" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tick={{ fill: '#64748B', fontSize: 11 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    domain={[0, 1400]}
                    ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="calls"
                    stroke="#B91C1C"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorCalls)"
                    dot={{ stroke: '#B91C1C', strokeWidth: 2, r: 3, fill: '#FFFFFF' }}
                    activeDot={{ stroke: '#7F1D1D', strokeWidth: 2, r: 5, fill: '#B91C1C' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="conversions"
                    stroke="#FB7185"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorConversions)"
                    dot={{ stroke: '#FB7185', strokeWidth: 2, r: 2.5, fill: '#FFFFFF' }}
                    activeDot={{ stroke: '#E11D48', strokeWidth: 2, r: 4, fill: '#FB7185' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Legend matching screenshot */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100 text-xs font-semibold">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]" />
                <span>Outbound Calls</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FB7185]" />
                <span>Conversions</span>
              </div>
            </div>
          </div>

          {/* Quick Actions (4 Cards) matching screenshot */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs">
            <div className="mb-5">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Quick Actions
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Commonly used administrative tools
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Action 1: Add Applicant */}
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-red-50/30 hover:border-red-200 transition-all text-center flex flex-col items-center justify-between group"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 text-[#B91C1C] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Add Applicant</div>
                  <div className="text-[10px] text-slate-500">Create new record</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 group-hover:translate-x-0.5 transition-all mt-3" />
              </button>

              {/* Action 2: Manage Agents */}
              <button
                onClick={() => setAdminSection('agents')}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-red-50/30 hover:border-red-200 transition-all text-center flex flex-col items-center justify-between group"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 text-[#B91C1C] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Manage Agents</div>
                  <div className="text-[10px] text-slate-500">View and edit</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 group-hover:translate-x-0.5 transition-all mt-3" />
              </button>

              {/* Action 3: Create Campaign */}
              <button
                onClick={() => setAdminSection('campaigns')}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-red-50/30 hover:border-red-200 transition-all text-center flex flex-col items-center justify-between group"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 text-[#B91C1C] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Create Campaign</div>
                  <div className="text-[10px] text-slate-500">Start new campaign</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 group-hover:translate-x-0.5 transition-all mt-3" />
              </button>

              {/* Action 4: Generate Report */}
              <button
                onClick={() => setAdminSection('performance')}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-red-50/30 hover:border-red-200 transition-all text-center flex flex-col items-center justify-between group"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 text-[#B91C1C] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Generate Report</div>
                  <div className="text-[10px] text-slate-500">View analytics</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 group-hover:translate-x-0.5 transition-all mt-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Recent Applicants + Admin Tasks */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recent Applicants Card matching screenshot */}
          <div
            id="recent-applicants-card"
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                Recent Applicants
              </h3>
              <button
                onClick={() => setAdminSection('applicants')}
                className="text-xs font-bold text-red-700 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* List of 5 Applicants matching screenshot */}
            <div className="divide-y divide-slate-100">
              {applicants.slice(0, 5).map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApplicant(app)}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/80 -mx-2 px-2 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Initials Avatar matching screenshot */}
                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {app.initials}
                    </div>

                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {app.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        Applied for {app.role}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] text-slate-400 mb-1">{app.appliedDate}</div>
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-md border ${getStatusBadge(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Tasks Card matching screenshot */}
          <div
            id="admin-tasks-card"
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                Admin Tasks
              </h3>
              <button
                onClick={() => setAdminSection('settings')}
                className="text-xs font-bold text-red-700 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* List of 4 Tasks matching screenshot */}
            <div className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/50 -mx-2 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="mt-0.5 text-slate-400 hover:text-red-700 transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>

                    <div>
                      <div
                        className={`text-xs font-bold text-slate-900 ${
                          task.completed ? 'line-through text-slate-400' : ''
                        }`}
                      >
                        {task.title}
                      </div>
                      <div className="text-[11px] text-slate-400">{task.dueText}</div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {getTaskBadge(task.badgeVariant, task.badgeText)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
