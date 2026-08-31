import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { VTGLogo } from '../../common/VTGLogo';
import { PageHero } from '../common/PageHero';
import { supabase } from '../../../lib/supabase';
import {
  Briefcase,
  CheckCircle2,
  Send,
  Sparkles,
  ShieldCheck,
  Building,
  Headphones,
  Award,
  AlertCircle,
  X,
  FileText,
  Shield,
  Loader2,
  Eye,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Laptop,
  Check,
  Edit3,
} from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  terms?: string;
  general?: string;
}

export const ApplyPage: React.FC = () => {
  const { addApplicant, applicants } = useApp();

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

  const [agreedTerms, setAgreedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'review' | null>(null);

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

  const validateForm = async (): Promise<boolean> => {
    const newErrors: FormErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();
    const trimmedPhone = formData.phone.trim();
    const trimmedLocation = formData.location.trim();

    // 1. Name validation
    if (!trimmedName) {
      newErrors.name = 'Full name is required.';
    } else if (trimmedName.length < 3) {
      newErrors.name = 'Please enter your complete full name (at least 3 characters).';
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please provide a valid email address (e.g. name@example.com).';
    } else {
      // Duplicate Email Error Trap (in local state)
      const isDuplicateInState = applicants.some(
        (app) => app.email && app.email.trim().toLowerCase() === trimmedEmail
      );

      if (isDuplicateInState) {
        newErrors.email = 'This email address is already registered with an active application.';
      } else {
        // Also check Supabase directly
        try {
          const { data } = await supabase
            .from('applicants')
            .select('id')
            .eq('email', trimmedEmail)
            .limit(1);

          if (data && data.length > 0) {
            newErrors.email = 'This email address is already registered in our applicant tracking system.';
          }
        } catch {
          // Continue if offline
        }
      }
    }

    // 3. Contact Number validation
    const digitsOnly = trimmedPhone.replace(/\D/g, '');
    if (!trimmedPhone) {
      newErrors.phone = 'Contact number is required.';
    } else if (digitsOnly.length < 10) {
      newErrors.phone = 'Please provide a valid 10-11 digit contact number (e.g. 0917 123 4567).';
    } else {
      // Duplicate Phone Error Trap
      const isDuplicatePhone = applicants.some((app) => {
        const existingDigits = (app.phone || '').replace(/\D/g, '');
        return existingDigits.length >= 10 && existingDigits === digitsOnly;
      });

      if (isDuplicatePhone) {
        newErrors.phone = 'This contact number has already been used for another application.';
      }
    }

    // 4. Location validation
    if (!trimmedLocation) {
      newErrors.location = 'Current location (City / Province) is required.';
    }

    // 5. Terms checkbox validation
    if (!agreedTerms) {
      newErrors.terms = 'You must agree to the Terms of Service and Privacy Policy before submitting.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const isValid = await validateForm();
    if (isValid) {
      setActiveModal('review');
    }
  };

  const handleFinalSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addApplicant({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        role: formData.role,
        experience: formData.hasBpoExperience === 'Yes' ? formData.bpoExperience : 'Fresh / Non-BPO',
        hasBpoExperience: formData.hasBpoExperience,
        bpoExperience: formData.bpoExperience,
        pastCompanies: formData.pastCompanies,
        education: formData.education,
        workSetup: formData.workSetup,
        referralSource: formData.referralSource,
        status: 'Under Review',
        skills: [formData.role, formData.bpoExperience, formData.workSetup.split('—')[0].trim()],
        rating: 4.5,
      });

      setActiveModal(null);
      setSubmitted(true);
    } catch (err: any) {
      setActiveModal(null);
      setErrors({
        general: err?.message || 'Failed to submit application. Please try again or contact recruitment.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#FAFAFA]">
      {/* 1. Hero Section */}
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
            <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200/90 p-8 sm:p-12 text-center space-y-4 shadow-2xs">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-600/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                  Application Received
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">Application Successfully Submitted!</h3>
              </div>
              <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-slate-900">{formData.name}</span>! Your application for the{' '}
                <span className="font-bold text-emerald-700">{formData.role}</span> position has been registered in our
                candidate tracking system. Our recruitment specialists will review your credentials
                and contact you at <span className="font-bold text-slate-900">{formData.phone}</span> /{' '}
                <span className="font-bold text-slate-900">{formData.email}</span>.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setAgreedTerms(false);
                    setErrors({});
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
                  className="px-6 py-2.5 rounded-full bg-white border border-emerald-300 text-xs font-bold uppercase text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer shadow-2xs"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleOpenReview} noValidate className="space-y-7">
              {errors.general && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.general}</span>
                </div>
              )}

              {/* Personal Information */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Applicant Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Q1: Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      1. Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Maria Santos Dela Cruz"
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs text-slate-800 focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-200 focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] font-medium text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Q2: Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      2. Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="maria.delacruz@gmail.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs text-slate-800 focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-200 focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] font-medium text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Q3: Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      3. Contact Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="+63 9XX XXX XXXX or 09XX XXX XXXX"
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs text-slate-800 focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-200 focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-[11px] font-medium text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Q4: Location */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      4. Current Location (City / Province) *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => {
                        setFormData({ ...formData, location: e.target.value });
                        if (errors.location) setErrors({ ...errors, location: undefined });
                      }}
                      placeholder="e.g. Calamba City, Laguna"
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs text-slate-800 focus:outline-none transition-colors ${
                        errors.location
                          ? 'border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-200 focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]'
                      }`}
                    />
                    {errors.location && (
                      <p className="mt-1 text-[11px] font-medium text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.location}
                      </p>
                    )}
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

              {/* Terms of Service & Privacy Policy Checkbox (Exact Red Design) */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => {
                      setAgreedTerms(e.target.checked);
                      if (errors.terms) {
                        setErrors((prev) => ({ ...prev, terms: undefined }));
                      }
                    }}
                    className="w-4 h-4 rounded border-slate-300 text-[#8B151E] focus:ring-[#8B151E] accent-[#8B151E] cursor-pointer"
                  />
                  <span className="text-xs text-slate-600">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveModal('terms');
                      }}
                      className="text-[#8B151E] hover:underline font-semibold cursor-pointer"
                    >
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveModal('privacy');
                      }}
                      className="text-[#8B151E] hover:underline font-semibold cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>
                {errors.terms && (
                  <p className="mt-1.5 text-[11px] font-medium text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>256-bit encrypted transmission • SEC Registered</span>
                </div>

                <button
                  type="submit"
                  disabled={!agreedTerms || isSubmitting}
                  className={`w-full sm:w-auto px-8 py-3 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 ${
                    agreedTerms && !isSubmitting
                      ? 'bg-[#8B151E] hover:bg-[#720E15] hover:shadow-lg cursor-pointer'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-80'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Review Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Terms of Service Modal */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B151E] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Terms of Service</h3>
                  <p className="text-xs text-slate-500">Applicant Screening & Recruitment Agreement</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-600 leading-relaxed">
              <p>
                Welcome to the official recruitment portal of{' '}
                <strong className="text-slate-900">Vigorous Telemarketing Group Inc.</strong> (SEC Reg. No. 2022060057912-11). By submitting your job application through this platform, you acknowledge and agree to the following terms:
              </p>

              <div>
                <h5 className="font-bold text-slate-900 text-xs mb-1">1. Accuracy of Submitted Credentials</h5>
                <p>
                  You certify that all statements, contact information, educational attainment, BPO work experience, and campaign histories supplied in this form are accurate and complete. Any intentional misrepresentation or fraudulent claim shall be grounds for immediate disqualification or termination of contract.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 text-xs mb-1">2. Pre-Employment Background & Reference Verification</h5>
                <p>
                  You authorize Vigorous Telemarketing Group and its designated HR recruitment officers to verify your educational background, conduct employment reference checks with former employers, and validate relevant government records in accordance with standard BPO recruitment protocols.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 text-xs mb-1">3. Confidentiality & Non-Disclosure</h5>
                <p>
                  During the interview, assessment, and training process, you may receive proprietary information regarding client campaigns, telemarketing scripts, scorecards, or CRM workflows. You agree to maintain strict confidentiality and not disclose proprietary operational materials to third parties.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 text-xs mb-1">4. Workstation & Technical Compliance</h5>
                <p>
                  For work-from-home (WFH) or hybrid tracks, candidates must maintain a dedicated noise-free workspace, stable primary and backup internet connections (minimum 25 Mbps), a compliant desktop/laptop workstation, and a noise-cancelling headset.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 text-xs mb-1">5. Equal Opportunity Employment</h5>
                <p>
                  Vigorous Telemarketing Group is an Equal Opportunity Employer. We evaluate all applicants strictly based on skills, campaign suitability, English proficiency, and merit without regard to race, gender, religion, age, or disability.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Effective August 2026 • Version 2.4</span>
              <button
                onClick={() => {
                  setAgreedTerms(true);
                  if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                  setActiveModal(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#8B151E] hover:bg-[#720E15] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                I Understand & Agree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Privacy Policy</h3>
                  <p className="text-xs text-slate-500">Philippine Data Privacy Act Compliance (RA 10173)</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900">Vigorous Telemarketing Group Inc.</strong> is committed to protecting your personal data in accordance with Republic Act No. 10173, also known as the{' '}
                <strong className="text-slate-900">Data Privacy Act of 2012 (DPA)</strong> of the Philippines, and its Implementing Rules and Regulations.
              </p>

              <div>
                <h5 className="font-bold text-slate-900 text-xs mb-1">1. Information We Collect</h5>
                <p>
                  When applying for a position, we collect personal information including your full name, email address, mobile phone number, residential location, educational history, BPO employment background, and workstation setup details.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 text-xs mb-1">2. Purpose of Data Processing</h5>
                <p>
                  Your information is collected and processed solely for:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                  <li>Evaluating qualifications for current and future BPO campaign openings</li>
                  <li>Scheduling and conducting phone, video, or in-person interviews</li>
                  <li>Administering mock calls, English language assessments, and typing tests</li>
                  <li>Facilitating pre-employment onboarding, contract drafting, and payroll enrollment</li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 text-xs mb-1">3. Data Protection & Security Controls</h5>
                <p>
                  We implement robust administrative, physical, and technical security measures—including TLS 256-bit encryption, role-based access control (RBAC), and audited database storage—to protect your personal information against unauthorized access, loss, or alteration.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 text-xs mb-1">4. Retention & Candidate Rights</h5>
                <p>
                  Under RA 10173, you retain the right to be informed, right to access, right to rectify errors in your applicant record, and the right to request deletion of your data upon written notice to our Data Protection Officer at{' '}
                  <span className="font-semibold text-slate-800">recruitment@vigoroustelemarketing.com</span>.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">NPC Compliant • Updated 2026</span>
              <button
                onClick={() => {
                  setAgreedTerms(true);
                  if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                  setActiveModal(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#8B151E] hover:bg-[#720E15] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                I Agree to Privacy Terms
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Review Application Modal (Red & White Theme) */}
      {activeModal === 'review' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-red-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Red & White Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#8B151E] via-[#9E1822] to-[#720E15] text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-xs border border-white/25 flex items-center justify-center text-white shadow-inner">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                      Step 2 of 2
                    </span>
                    <span className="text-white/80 text-xs font-medium">• Final Verification</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">Review Your Application</h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Review Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/60">
              <div className="p-3 bg-red-50/70 border border-red-200/80 rounded-xl text-xs text-[#8B151E] flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-[#8B151E]" />
                <span>
                  Please double check your contact information and qualifications before submitting to our HR team.
                </span>
              </div>

              {/* Card 1: Applicant Information */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-red-100/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 text-[#8B151E]">
                  <User className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Applicant Profile & Contact Details
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block mb-0.5">Full Name</span>
                    <span className="text-slate-900 font-bold text-sm">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block mb-0.5">Email Address</span>
                    <span className="text-slate-900 font-semibold">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block mb-0.5">Contact Number</span>
                    <span className="text-slate-900 font-semibold">{formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block mb-0.5">Current Location</span>
                    <span className="text-slate-900 font-semibold">{formData.location}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Position & Experience */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-red-100/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 text-[#8B151E]">
                  <Briefcase className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Position & Professional Background
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 font-medium block mb-1">Target Position</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 border border-red-200 text-[#8B151E] font-bold text-xs">
                      {formData.role}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block mb-0.5">BPO / Call Center Experience</span>
                    <span className="text-slate-900 font-semibold">
                      {formData.hasBpoExperience === 'Yes'
                        ? `Yes (${formData.bpoExperience})`
                        : 'No prior BPO experience'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block mb-0.5">Relevant Campaigns / Companies</span>
                    <span className="text-slate-900 font-medium">
                      {formData.pastCompanies.trim() || 'None provided'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3: Education & Workstation Setup */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-red-100/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 text-[#8B151E]">
                  <GraduationCap className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Education, Workstation & Referral
                  </h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block mb-0.5">Highest Educational Attainment</span>
                    <span className="text-slate-900 font-semibold">{formData.education}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block mb-0.5">Workstation & Equipment Setup</span>
                    <span className="text-slate-900 font-medium">{formData.workSetup}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block mb-0.5">Referral Source</span>
                    <span className="text-slate-900 font-medium">{formData.referralSource}</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Compliance & Consent Verified */}
              <div className="p-3.5 rounded-xl bg-red-50/60 border border-red-200 text-xs flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#8B151E] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div className="text-slate-700 leading-relaxed">
                  <span className="font-bold text-[#8B151E]">Terms & Data Privacy Act Consent:</span> You have
                  acknowledged and agreed to the <strong className="text-slate-900">Terms of Service</strong> and consented
                  to applicant data processing under <strong className="text-slate-900">Republic Act No. 10173 (Philippine Data Privacy Act)</strong>.
                </div>
              </div>
            </div>

            {/* Red & White Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-red-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-slate-700 hover:text-[#8B151E] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#8B151E]" />
                <span>Edit Information</span>
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-[#8B151E] hover:bg-[#720E15] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm & Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

