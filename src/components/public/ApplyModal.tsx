import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { VTGLogo } from '../common/VTGLogo';

export const ApplyModal: React.FC = () => {
  const { isApplyModalOpen, setIsApplyModalOpen, addApplicant } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: 'Appointment Setter',
    hasBpoExperience: 'Yes',
    bpoExperience: '1 to 2 years',
    pastCompanies: '',
    education: "College Graduate (Bachelor's Degree)",
    workSetup: 'Yes — Desktop/Laptop, headset, reliable internet',
    referralSource: 'Facebook / Social Media',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isApplyModalOpen) return null;

  const positions = [
    'Outbound Sales Representative',
    'Appointment Setter',
    'Inbound Customer Support Agent',
    'Chat & Email Support Specialist',
    'Technical Support Specialist',
    'Virtual Assistant',
    'Data Entry Specialist',
    'Team Leader / Supervisor',
    'Quality Assurance Specialist',
    'IT Support Specialist',
  ];

  const experienceOptions = [
    'No BPO experience',
    'Less than 6 months',
    '6 months to 1 year',
    '1 to 2 years',
    '2 to 3 years',
    '3 to 5 years',
    '5+ years',
  ];

  const educationOptions = [
    'High School Graduate / Senior High',
    'Vocational / Technical Course',
    'College Undergraduate',
    "College Graduate (Bachelor's Degree)",
    'Post-Graduate',
  ];

  const workSetupOptions = [
    'Yes — Desktop/Laptop, headset, reliable internet',
    'Yes — Partial setup (need equipment upgrade)',
    'No — Interested in on-site / office-based only',
  ];

  const referralOptions = [
    'Facebook / Social Media',
    'LinkedIn',
    'JobStreet / OnlineJobs.ph',
    'Employee Referral',
    'Walk-in',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.location.trim()) {
      setErrorMsg('Please complete all mandatory fields (*)');
      return;
    }

    addApplicant({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim(),
      role: formData.role,
      experience: formData.hasBpoExperience === 'Yes' ? formData.bpoExperience : 'Fresh / Non-BPO',
      hasBpoExperience: formData.hasBpoExperience,
      bpoExperience: formData.bpoExperience,
      pastCompanies: formData.pastCompanies.trim(),
      education: formData.education,
      workSetup: formData.workSetup,
      referralSource: formData.referralSource,
      status: 'Under Review',
      skills: [formData.role, formData.experience, formData.workSetup.split('—')[0].trim()],
      rating: 4.5,
    });

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsApplyModalOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setErrorMsg('');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="apply-modal-card"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header banner with VTG Logo */}
        <div className="bg-gradient-to-r from-[#8B151E] via-[#750E16] to-[#5C0A10] text-white p-5 sm:p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <VTGLogo size="sm" showText={false} className="p-1 rounded-lg bg-white/10" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
                  Job Application Form
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider text-white">
                  VTG Careers
                </span>
              </div>
              <p className="text-xs text-red-100">
                Join the Vigorous Telemarketing Group team. Please complete all fields accurately.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">Application Submitted!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-slate-800">{formData.name}</span>. Your
                application for <span className="font-bold text-[#8B151E]">{formData.role}</span> has
                been registered. Our recruitment team will review your qualifications and reach out
                via <span className="font-bold">{formData.phone}</span> /{' '}
                <span className="font-bold">{formData.email}</span>.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#8B151E] hover:bg-[#720E15] rounded-full cursor-pointer shadow-md"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                  {errorMsg}
                </div>
              )}

              {/* Personal details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    1. Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maria Santos"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    2. Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maria.santos@gmail.com"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    3. Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+63 9XX XXX XXXX"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    4. Current Location (City / Province) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Calamba, Laguna"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                  />
                </div>
              </div>

              {/* Position */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  5. Position Applying For *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 bg-white"
                >
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    6. Do you have BPO / Call Center Experience? *
                  </label>
                  <select
                    value={formData.hasBpoExperience}
                    onChange={(e) =>
                      setFormData({ ...formData, hasBpoExperience: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 bg-white"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    7. If YES, how many years of BPO experience?
                  </label>
                  <select
                    disabled={formData.hasBpoExperience === 'No'}
                    value={formData.bpoExperience}
                    onChange={(e) =>
                      setFormData({ ...formData, bpoExperience: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 bg-white disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    {experienceOptions.map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Q8 Past campaigns */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  8. Past BPO Companies & Campaigns Handled
                </label>
                <textarea
                  rows={2}
                  value={formData.pastCompanies}
                  onChange={(e) => setFormData({ ...formData, pastCompanies: e.target.value })}
                  placeholder="e.g. Concentrix (Telco Inbound), TaskUs (Chat Support)..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                />
              </div>

              {/* Q9 Education */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  9. Highest Educational Attainment *
                </label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 bg-white"
                >
                  {educationOptions.map((edu) => (
                    <option key={edu} value={edu}>
                      {edu}
                    </option>
                  ))}
                </select>
              </div>

              {/* Q10 & Q11 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    10. Workable home office setup? *
                  </label>
                  <select
                    value={formData.workSetup}
                    onChange={(e) => setFormData({ ...formData, workSetup: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 bg-white"
                  >
                    {workSetupOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    11. How did you hear about VTG? *
                  </label>
                  <select
                    value={formData.referralSource}
                    onChange={(e) =>
                      setFormData({ ...formData, referralSource: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 bg-white"
                  >
                    {referralOptions.map((ref) => (
                      <option key={ref} value={ref}>
                        {ref}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Confidential & Data Privacy Act Compliant</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#8B151E] hover:bg-[#720E15] active:scale-[0.98] rounded-full transition-all shadow-md shadow-red-900/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
