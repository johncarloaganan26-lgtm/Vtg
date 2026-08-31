import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Headphones, Plus, Star, PhoneCall, Shield, Search } from 'lucide-react';
import { Agent } from '../../types';

export const AgentsView: React.FC = () => {
  const { agents, addAgent, updateAgentStatus } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPod, setSelectedPod] = useState('All');
  const [agentSearch, setAgentSearch] = useState('');

  // Add agent form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('Outbound Sales Specialist');
  const [pod, setPod] = useState('Pod Alpha (FinTech)');

  // Extract dynamic list of pods from agents
  const dynamicPods = ['All', ...Array.from(new Set(agents.map((a) => a.pod)))];
  const uniquePodsCount = new Set(agents.map((a) => a.pod)).size;

  const filteredAgents = agents.filter((agt) => {
    const matchesPod = selectedPod === 'All' || agt.pod === selectedPod || agt.pod.includes(selectedPod.split(' ')[1] || '');
    const matchesSearch = agt.name.toLowerCase().includes(agentSearch.toLowerCase()) || agt.role.toLowerCase().includes(agentSearch.toLowerCase());
    return matchesPod && matchesSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addAgent({
      name: name.trim(),
      role,
      pod,
      status: 'Online',
      qaScore: 99.0,
      callsToday: 0,
      conversionsToday: 0,
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=150&q=80`,
    });

    setName('');
    setIsAddModalOpen(false);
  };

  const getStatusDot = (status: Agent['status']) => {
    switch (status) {
      case 'In Call':
        return 'bg-emerald-500 animate-pulse';
      case 'Online':
        return 'bg-sky-500';
      case 'Break':
        return 'bg-amber-500';
      case 'Offline':
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <div id="admin-agents-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Active Agents Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Real-time status, QA evaluation scores, and daily call statistics across {uniquePodsCount} active pods.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#8B151E] hover:bg-[#720E15] text-xs font-bold text-white flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Deploy New Agent</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {dynamicPods.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPod(p)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                selectedPod === p
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={agentSearch}
            onChange={(e) => setAgentSearch(e.target.value)}
            placeholder="Search agents..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
          />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAgents.map((agt) => (
          <div
            key={agt.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={agt.avatarUrl}
                      alt={agt.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${getStatusDot(
                        agt.status
                      )}`}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                      {agt.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">{agt.role}</p>
                    <span className="text-[10px] font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded-md inline-block mt-1">
                      {agt.pod}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center my-3">
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">QA Score</div>
                  <div className="text-sm font-black text-slate-900 flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    <span>{agt.qaScore}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Dials Today</div>
                  <div className="text-sm font-black text-slate-900">{agt.callsToday}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Conversions</div>
                  <div className="text-sm font-black text-[#8B151E]">{agt.conversionsToday}</div>
                </div>
              </div>
            </div>

            {/* Status changer */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <span className="text-xs font-semibold text-slate-500">Status:</span>
              <select
                value={agt.status}
                onChange={(e) =>
                  updateAgentStatus(agt.id, e.target.value as Agent['status'])
                }
                className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
              >
                <option value="Online">Online</option>
                <option value="In Call">In Call</option>
                <option value="Break">Break</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Add Agent Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Deploy New Agent</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Raymond Cruz"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Role Title
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Pod Assignment
                </label>
                <select
                  value={pod}
                  onChange={(e) => setPod(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Pod Alpha (FinTech)">Pod Alpha (FinTech)</option>
                  <option value="Pod Bravo (Real Estate)">Pod Bravo (Real Estate)</option>
                  <option value="Pod Charlie (HealthPlus)">Pod Charlie (HealthPlus)</option>
                  <option value="Pod Delta (SaaS Support)">Pod Delta (SaaS Support)</option>
                </select>
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
                  Confirm & Deploy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
