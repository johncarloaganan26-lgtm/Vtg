import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Megaphone, Plus, Play, Pause, TrendingUp, Users, Target } from 'lucide-react';
import { Campaign } from '../../types';

export const CampaignsView: React.FC = () => {
  const { campaigns, addCampaign, toggleCampaignStatus } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [type, setType] = useState<Campaign['type']>('Outbound Sales');
  const [agents, setAgents] = useState(15);
  const [targetLeads, setTargetLeads] = useState(100);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !client.trim()) return;

    addCampaign({
      name: name.trim(),
      client: client.trim(),
      type,
      status: 'Active',
      activeAgents: agents,
      dialsToday: 0,
      targetLeads,
      conversionRate: 12.5,
    });

    setName('');
    setClient('');
    setIsAddModalOpen(false);
  };

  return (
    <div id="admin-campaigns-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campaign Operations & Dialing
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manage appointment setting, outbound telesales, and customer care workflows.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#8B151E] hover:bg-[#720E15] text-xs font-bold text-white flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Launch New Campaign</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => {
          const isActive = camp.status === 'Active';

          return (
            <div
              key={camp.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-50 text-red-800 border border-red-100">
                    {camp.type}
                  </span>
                  <button
                    onClick={() => toggleCampaignStatus(camp.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isActive ? (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-3 h-3 fill-current" />
                        <span>Paused</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-1">
                  {camp.name}
                </h3>
                <p className="text-xs text-slate-500 font-semibold mb-5">
                  Client: <span className="text-slate-800">{camp.client}</span>
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-slate-100 text-center mb-4">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Agents</div>
                    <div className="text-base font-black text-slate-900">{camp.activeAgents}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Dials Today</div>
                    <div className="text-base font-black text-slate-900">
                      {camp.dialsToday.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Conv Rate</div>
                    <div className="text-base font-black text-[#8B151E]">
                      {camp.conversionRate}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-red-700" />
                  Target: {camp.targetLeads} leads/day
                </span>
                <button
                  onClick={() => alert(`Opening Vicidial real-time monitoring for ${camp.name}...`)}
                  className="font-bold text-red-700 hover:underline"
                >
                  Live Monitor →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Launch Campaign Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Launch New Campaign</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. UK Solar Appointment Setter"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Client / Account
                </label>
                <input
                  type="text"
                  required
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="e.g. SolarDirect UK"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Campaign Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as Campaign['type'])}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Appointment Setting">Appointment Setting</option>
                  <option value="Outbound Sales">Outbound Sales</option>
                  <option value="Customer Care">Customer Care</option>
                  <option value="Lead Generation">Lead Generation</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Agents Assigned
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={agents}
                    onChange={(e) => setAgents(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Daily Lead Target
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={targetLeads}
                    onChange={(e) => setTargetLeads(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase text-white bg-[#8B151E] rounded-xl hover:bg-[#720E15]"
                >
                  Start Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
