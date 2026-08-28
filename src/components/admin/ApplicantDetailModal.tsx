import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  FileText,
  CheckCircle2,
  AlertCircle,
  Award,
  ChevronRight,
} from 'lucide-react';
import { ApplicationStatus } from '../../types';

export const ApplicantDetailModal: React.FC = () => {
  const { selectedApplicant, setSelectedApplicant, updateApplicantStatus } = useApp();

  if (!selectedApplicant) return null;

  const app = selectedApplicant;

  const stages: ApplicationStatus[] = [
    'New Applicant',
    'For Assessment',
    'For Initial Interview',
    'For Final Interview',
    'Hired',
  ];

  const currentStageIndex = stages.indexOf(app.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="applicant-detail-card"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-800 text-white font-black text-xl flex items-center justify-center border-2 border-red-500/30">
              {app.initials}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-extrabold tracking-tight">{app.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase">
                  {app.role}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-red-400" />
                  {app.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  {app.phone}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedApplicant(null)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Recruitment Pipeline Progress */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Application Pipeline Stage
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {stages.map((stage, idx) => {
                const isPassed = currentStageIndex >= idx;
                const isCurrent = app.status === stage;

                return (
                  <button
                    key={stage}
                    onClick={() => updateApplicantStatus(app.id, stage)}
                    className={`p-2 rounded-xl text-center text-[10px] font-bold border transition-all ${
                      isCurrent
                        ? 'bg-[#8B151E] text-white border-[#8B151E] ring-2 ring-red-700/20'
                        : isPassed
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="mb-1">{idx + 1}</div>
                    <div className="truncate">{stage}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                Experience Level
              </span>
              <span className="text-sm font-extrabold text-slate-900">
                {app.experienceYears} Years BPO Telemarketing
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                Applied Time
              </span>
              <span className="text-sm font-extrabold text-slate-900">
                {app.appliedDate}
              </span>
            </div>
          </div>

          {/* Resume / Document preview */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Submitted Documents
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {app.resumeFileName || 'Resume_Applicant_CV.pdf'}
                  </div>
                  <div className="text-[11px] text-slate-500">Verified PDF Document • 450 KB</div>
                </div>
              </div>
              <button
                onClick={() =>
                  alert(`Downloading ${app.resumeFileName || 'Resume.pdf'} for HR review...`)
                }
                className="px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-50 rounded-lg border border-red-200"
              >
                View / Download
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Recruiter & Interview Notes
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 leading-relaxed">
              {app.notes || 'Candidate profile logged into Vigorous Telemarketing database.'}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={() => {
                updateApplicantStatus(app.id, 'Hired');
                setSelectedApplicant(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
            >
              Approve & Mark as Hired
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  updateApplicantStatus(app.id, 'Rejected');
                  setSelectedApplicant(null);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-rose-700 text-xs font-bold"
              >
                Reject
              </button>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
