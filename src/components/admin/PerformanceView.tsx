import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { Download, TrendingUp, Award, Calendar, CheckCircle2 } from 'lucide-react';

export const PerformanceView: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const podPerformance = [
    { pod: 'Pod Alpha', calls: 3840, conversions: 480, qa: 99.2 },
    { pod: 'Pod Bravo', calls: 3120, conversions: 390, qa: 98.6 },
    { pod: 'Pod Charlie', calls: 2980, conversions: 310, qa: 97.9 },
    { pod: 'Pod Delta', calls: 2450, conversions: 295, qa: 98.4 },
    { pod: 'Pod Echo', calls: 1890, conversions: 210, qa: 99.0 },
  ];

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div id="admin-performance-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Performance & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Detailed breakdown of conversion efficiency, QA ratings, and pod output.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-xs font-bold text-white flex items-center gap-2 shadow-xs transition-colors"
        >
          {downloadSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Report Generated!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download Executive Summary</span>
            </>
          )}
        </button>
      </div>

      {/* Pod Analytics Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Pod Conversion Comparison</h3>
              <p className="text-xs text-slate-500 font-medium">Daily completed appointments by pod</p>
            </div>
            <span className="px-3 py-1 bg-red-50 text-[#8B151E] text-xs font-bold rounded-lg">
              Live Feed
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={podPerformance} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="pod" tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="conversions" fill="#8B151E" radius={[6, 6, 0, 0]} name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
            <h3 className="text-sm font-extrabold text-slate-900 mb-4">QA Calibration Benchmarks</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Script Adherence</span>
                  <span className="text-[#8B151E]">99.4%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[#8B151E] h-2 rounded-full" style={{ width: '99.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Lead Qualification Accuracy</span>
                  <span className="text-[#8B151E]">98.8%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[#8B151E] h-2 rounded-full" style={{ width: '98.8%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Customer Satisfaction (CSAT)</span>
                  <span className="text-[#8B151E]">99.1%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[#8B151E] h-2 rounded-full" style={{ width: '99.1%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#8B151E] to-[#600D13] text-white p-6 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-base font-extrabold mb-1">18+ Years BPO Excellence</h4>
            <p className="text-xs text-red-100 leading-relaxed">
              Consistently exceeding industry benchmarks for qualified sales appointments and outbound telemarketing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
