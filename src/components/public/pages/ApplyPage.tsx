import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { VTGLogo } from '../../common/VTGLogo';
import { PageHero } from '../common/PageHero';
import {
  Briefcase,
  CheckCircle2,
  Send,
  Sparkles,
  ShieldCheck,
  Building,
  Headphones,
  Award,
} from 'lucide-react';

export const ApplyPage: React.FC = () => {
  const { addApplicant } = useApp();

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
    skills: 'English fluency, cold calling, CRM',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      role: formData.role,
      experience: formData.hasBpoExperience === 'Yes' ? formData.bpoExperience : 'Fresh / Non-BPO',
      hasBpoExperience: formData.hasBpoExperience,
      bpoExperience: formData.bpoExperience,
      pastCompanies: formData.pastCompanies,
      education: formData.education,
      workSetup: formData.workSetup,
      referralSource: formData.referralSource,
      status: 'Under Review',
      skills: [formData.role, formData.experience, formData.workSetup.split('—')[0].trim()],
      rating: 4.5,
    });

    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAFAFA]">
      {/* 1. Hero Section matching reference Screenshot_20260828-092717.jpg */}
      <PageHero
        id="apply-hero"
        badgeIcon={<Briefcase className="w-3.5 h-3.5 text-red-500" />}
        badgeText="CAREERS AT VIGOROUS GROUP"
        titlePrefix="Launch Your Career with an Industry"
        titleHighlight="Leader"
        description="Join over 100+ dedicated agents across our modern operations floor with competitive compensation, paid training, HMO coverage, and clear growth paths."
      />

      {/* 2. Application Form Section */}
      <section id="application-form" className="py-10 sm:py-16 lg:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 md:p-10 shadow-2xs">
          {/* Header with Logo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 sm:pb-8 sm:mb-8 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <VTGLogo size="sm" />
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Official Vigorous Telemarketing Group Talent Portal • SEC Reg: 2022060057912-11
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#8B151E] text-xs font-bold self-start sm:self-center">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Active Hiring</span>
            </div>
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-red-50/60 border border-red-200 p-8 sm:p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#8B151E] text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Application Submitted!</h3>
              <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold">{formData.name}</span>! Your application for the{' '}
                <span className="font-bold">{formData.role}</span> position has been registered in our
                candidate tracking system. Our recruitment specialists will review your credentials
                and contact you at <span className="font-bold">{formData.phone}</span> /{' '}
                <span className="font-bold">{formData.email}</span>.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
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
                      skills: 'English fluency, cold calling, CRM',
                    });
                  }}
                  className="px-6 py-2.5 rounded-full bg-white border border-slate-300 text-xs font-bold uppercase text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                  {errorMsg}
                </div>
              )}

              {/* Personal Information */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Applicant Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Q1 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      1. Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maria Santos Dela Cruz"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                    />
                  </div>

                  {/* Q2 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      2. Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maria.delacruz@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                    />
                  </div>

                  {/* Q3 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      3. Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+63 9XX XXX XXXX"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                    />
                  </div>

                  {/* Q4 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      4. Current Location (City / Province) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Calamba City, Laguna"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                    />
                  </div>
                </div>
              </div>

              {/* Role & Experience */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Role & Professional Background
                </h4>

                {/* Q5 */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    5. Position Applying For *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                  >
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Q6 & Q7 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      6. Do you have BPO / Call Center Experience? *
                    </label>
                    <select
                      value={formData.hasBpoExperience}
                      onChange={(e) =>
                        setFormData({ ...formData, hasBpoExperience: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      7. If YES, how many years of BPO experience do you have?
                    </label>
                    <select
                      disabled={formData.hasBpoExperience === 'No'}
                      value={formData.bpoExperience}
                      onChange={(e) =>
                        setFormData({ ...formData, bpoExperience: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white disabled:bg-slate-100 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                    >
                      {experienceOptions.map((exp) => (
                        <option key={exp} value={exp}>
                          {exp}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Q8 */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    8. Past BPO Companies & Campaigns Handled
                  </label>
                  <textarea
                    rows={3}
                    value={formData.pastCompanies}
                    onChange={(e) => setFormData({ ...formData, pastCompanies: e.target.value })}
                    placeholder="Briefly list any BPO companies, campaigns (e.g. Telco, Financial, Healthcare, Lead Gen), and tools you have worked with..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                  />
                </div>

                {/* Q9 */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    9. Highest Educational Attainment *
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                  >
                    {educationOptions.map((edu) => (
                      <option key={edu} value={edu}>
                        {edu}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Work Setup & Referral */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Logistics & Discovery
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  {/* Q10 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      10. Do you have a workable home office setup? *
                    </label>
                    <select
                      value={formData.workSetup}
                      onChange={(e) => setFormData({ ...formData, workSetup: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                    >
                      {workSetupOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Q11 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      11. How did you hear about Vigorous Telemarketing Group? *
                    </label>
                    <select
                      value={formData.referralSource}
                      onChange={(e) =>
                        setFormData({ ...formData, referralSource: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                    >
                      {referralOptions.map((ref) => (
                        <option key={ref} value={ref}>
                          {ref}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Your information is protected under Republic Act 10173 (Data Privacy Act).</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#8B151E] hover:bg-[#720E15] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
