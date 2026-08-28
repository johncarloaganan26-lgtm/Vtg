import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  FileText,
  Trash2,
  CheckCircle,
  Clock,
  Download,
} from 'lucide-react';
import { ApplicationStatus, Applicant } from '../../types';

export const ApplicantsView: React.FC = () => {
  const {
    applicants,
    updateApplicantStatus,
    deleteApplicant,
    setSelectedApplicant,
    setIsApplyModalOpen,
    adminSearchQuery,
    setAdminSearchQuery,
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('All');

  const statusOptions: ApplicationStatus[] = [
    'New Applicant',
    'For Assessment',
    'For Initial Interview',
    'For Final Interview',
    'Hired',
    'Rejected',
  ];

  const getStatusBadgeClass = (status: ApplicationStatus) => {
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

  const filteredApplicants = applicants.filter((app) => {
    const matchesFilter = filterStatus === 'All' || app.status === filterStatus;
    const query = adminSearchQuery.toLowerCase();
    const matchesSearch =
      app.name.toLowerCase().includes(query) ||
      app.role.toLowerCase().includes(query) ||
      app.email.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Role', 'Status', 'Email', 'Phone', 'Experience', 'Date'];
    const rows = filteredApplicants.map((a) => [
      a.id,
      `"${a.name}"`,
      a.role,
      a.status,
      a.email,
      a.phone,
      `${a.experienceYears} yrs`,
      a.appliedDate,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VTG_Applicants_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="admin-applicants-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Applicant Pipeline & Talent Pool
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Track, interview, and manage customer service and technical support applicants.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#8B151E] hover:bg-[#720E15] text-xs font-bold text-white flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Applicant</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['All', ...statusOptions].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                filterStatus === status
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={adminSearchQuery}
            onChange={(e) => setAdminSearchQuery(e.target.value)}
            placeholder="Search candidates..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
          />
        </div>
      </div>

      {/* Candidates Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-slate-700 font-extrabold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Applicant</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Experience</th>
                <th className="py-3.5 px-4">Status & Stage</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                    No candidates found matching current filter.
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                    onClick={() => setSelectedApplicant(app)}
                  >
                    {/* Name + Initials */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 font-bold text-slate-800 text-xs flex items-center justify-center flex-shrink-0">
                          {app.initials}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">
                            {app.name}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Applied {app.appliedDate}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-4 font-bold text-slate-800">{app.role}</td>

                    {/* Contact */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{app.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{app.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Experience */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                        {app.experienceYears} {app.experienceYears === 1 ? 'Year' : 'Years'}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td
                      className="py-3.5 px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateApplicantStatus(app.id, e.target.value as ApplicationStatus)
                        }
                        className={`text-xs font-bold rounded-lg px-2.5 py-1 border focus:outline-none ${getStatusBadgeClass(
                          app.status
                        )}`}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td
                      className="py-3.5 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedApplicant(app)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => deleteApplicant(app.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
