import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, Building, Phone, Calendar, Users, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MessagesView: React.FC = () => {
  const { campaignInquiries } = useApp();

  // Combine live campaign inquiries with initial sample inquiries
  const initialInquiries = [
    {
      id: 'demo-1',
      fullName: 'David Miller',
      companyName: 'Apex Healthcare Solutions LLC',
      workEmail: 'dmiller@apexhealth.com',
      phone: '+1 (555) 234-8901',
      serviceRequired: 'Appointment Setting',
      agentsNeeded: '16–30 agents',
      timeline: 'Within 2 weeks',
      budget: '$20k–$50k/mo',
      campaignDetails:
        'Hi Vigorous Telemarketing Team,\n\nWe are looking to partner with an established Philippine BPO to deploy a dedicated 30-agent outbound team for our healthcare appointment setting campaign. We require HIPAA compliant infrastructure, dedicated QA, and PST shift coverage.\n\nCould we schedule a call this Thursday at 2:00 PM PST to review pricing and SLA benchmarks?',
      createdAt: 'Today, 10:45 AM',
      status: 'New' as const,
    },
    {
      id: 'demo-2',
      fullName: 'Sarah Jenkins',
      companyName: 'SolarEdge UK',
      workEmail: 's.jenkins@solaredge.co.uk',
      phone: '+44 20 7946 0912',
      serviceRequired: 'Outbound Telesales & Closers',
      agentsNeeded: '6–15 agents',
      timeline: '1–2 months',
      budget: '$10k–$20k/mo',
      campaignDetails:
        'Requesting updated rate card and agent profile samples for UK residential solar appointment setting. We need native English accent and dialed timezone coverage from 9am to 6pm GMT.',
      createdAt: 'Yesterday, 3:15 PM',
      status: 'Contacted' as const,
    },
  ];

  const allMessages = [...campaignInquiries, ...initialInquiries];
  const [selectedId, setSelectedId] = useState<string>(allMessages[0]?.id || 'demo-1');
  const selectedMessage = allMessages.find((m) => m.id === selectedId) || allMessages[0];

  const [replyText, setReplyText] = useState('');
  const [replied, setReplied] = useState(false);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplied(true);
    setTimeout(() => {
      setReplied(false);
      setReplyText('');
    }, 2500);
  };

  return (
    <div id="admin-messages-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Client Inquiries & Campaign Proposals
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Review incoming enterprise leads submitted from the public website 8-question inquiry form.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden min-h-[600px]">
        {/* Left: Messages List */}
        <div className="lg:col-span-5 border-r border-slate-100 flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-700">
              Inbox ({allMessages.length} Proposals)
            </span>
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-[#8B151E] text-[10px] font-bold">
              {campaignInquiries.length > 0 ? `${campaignInquiries.length} Real-time` : 'Live'}
            </span>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1 max-h-[650px]">
            {allMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedId(msg.id)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedMessage?.id === msg.id
                    ? 'bg-red-50/50 border-l-4 border-[#8B151E]'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold text-slate-900">{msg.fullName}</span>
                  <span className="text-[10px] text-slate-400">{msg.createdAt}</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
                  <Building className="w-3 h-3 text-slate-400" />
                  <span>{msg.companyName}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-normal">
                  {msg.campaignDetails}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-red-50 text-[#8B151E]">
                    {msg.serviceRequired}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 text-slate-600">
                    {msg.agentsNeeded}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Message Details & Quick Reply */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 bg-white">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Campaign Proposal: {selectedMessage.serviceRequired}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                      <span className="font-bold text-slate-800">{selectedMessage.fullName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {selectedMessage.companyName}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {selectedMessage.workEmail}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {selectedMessage.phone}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {selectedMessage.createdAt}
                  </span>
                </div>

                {/* Structured Campaign Metadata Tags */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-100">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Agents Required
                    </span>
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Users className="w-3 h-3 text-[#8B151E]" />
                      {selectedMessage.agentsNeeded}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Target Timeline
                    </span>
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-[#8B151E]" />
                      {selectedMessage.timeline}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Monthly Budget
                    </span>
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Briefcase className="w-3 h-3 text-[#8B151E]" />
                      {selectedMessage.budget}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message text */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Campaign Description & Requirements
                </span>
                <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
                  {selectedMessage.campaignDetails}
                </div>
              </div>

              {/* Reply Box */}
              <form onSubmit={handleSendReply} className="space-y-3 pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Direct Response to {selectedMessage.workEmail}
                </label>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Draft customized proposal & rate card for ${selectedMessage.fullName}...`}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <div className="flex items-center justify-between">
                  {replied ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Proposal dispatched to {selectedMessage.workEmail}!
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">
                      Dispatches from executive@vigoroustelemarketing.com
                    </span>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#8B151E] hover:bg-[#720E15] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Proposal</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs">
              Select a message to view
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
