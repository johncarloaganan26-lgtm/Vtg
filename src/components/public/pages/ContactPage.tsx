import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { PageHero } from '../common/PageHero';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Building2,
  FileCheck,
  Send,
  CheckCircle,
  HelpCircle,
  Headphones,
  Calendar,
  Layers,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addCampaignInquiry } = useApp();

  const [formData, setFormData] = useState({
    fullNameTitle: '',
    corporateEmail: '',
    phoneWhatsApp: '',
    company: '',
    website: '',
    service: 'Appointment Setting',
    podSize: '4 - 9 Agents (Growth Pod)',
    timeline: 'Within 30 Days',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const services = [
    'Outbound Sales & Telemarketing',
    'Appointment Setting',
    'Inbound Customer Support',
    'Digital Care (Chat & Email)',
    'Technical Support',
    'Data Entry & Back-Office',
    'Virtual Assistant Services',
    'Lead Generation',
    'Other / Hybrid Solution',
  ];

  const podSizes = [
    '1 - 3 Agents (Pilot Pod)',
    '4 - 9 Agents (Growth Pod)',
    '10 - 24 Agents (Scale Pod)',
    '25+ Agents (Enterprise Pod)',
    'Not sure yet / Need consultation',
  ];

  const timelines = [
    'Immediate (Within 1-2 weeks)',
    'Within 30 Days',
    '1-3 Months',
    'Exploring Options',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.fullNameTitle.trim() ||
      !formData.corporateEmail.trim() ||
      !formData.company.trim() ||
      !formData.phoneWhatsApp.trim()
    ) {
      setErrorMsg('Please complete all required fields (*)');
      return;
    }

    addCampaignInquiry({
      fullNameTitle: formData.fullNameTitle,
      corporateEmail: formData.corporateEmail,
      phoneWhatsApp: formData.phoneWhatsApp,
      company: formData.company,
      website: formData.website,
      service: formData.service,
      podSize: formData.podSize,
      timeline: formData.timeline,
      message: formData.message,
    });

    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAFAFA]">
      {/* 1. Hero Section matching reference Screenshot_20260828-092717.jpg */}
      <PageHero
        id="contact-hero"
        badgeIcon={<Headphones className="w-3.5 h-3.5 text-red-500" />}
        badgeText="DIRECT EXECUTIVE COMMUNICATION"
        titlePrefix="Let’s Connect and Build Your"
        titleHighlight="Pipeline"
        description="Connect directly with our senior campaign strategists and leadership 24/7 for custom staffing models, pilot campaigns, or operations floor tours."
      />

      {/* 2. Main Content: Contact Channels + 8-Question Form */}
      <section className="py-10 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Support Channels Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <div className="mb-5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8B151E]">
                  Contact Channels
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">Direct Support</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Dedicated inboxes routed directly to executive supervisors and account directors.
                </p>
              </div>

              {/* Inboxes */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#8B151E] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase text-slate-400">General Inquiries</p>
                    <a
                      href="mailto:info@vigoroustelemarketing.com"
                      className="text-xs font-semibold text-slate-900 hover:text-[#8B151E] transition-colors break-all block mt-0.5"
                    >
                      info@vigoroustelemarketing.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#8B151E] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase text-slate-400">Client Services</p>
                    <a
                      href="mailto:clients@vigoroustelemarketing.com"
                      className="text-xs font-semibold text-slate-900 hover:text-[#8B151E] transition-colors break-all block mt-0.5"
                    >
                      clients@vigoroustelemarketing.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#8B151E] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase text-slate-400">Operations Desk</p>
                    <a
                      href="mailto:ops@vigoroustelemarketing.com"
                      className="text-xs font-semibold text-slate-900 hover:text-[#8B151E] transition-colors break-all block mt-0.5"
                    >
                      ops@vigoroustelemarketing.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#8B151E] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase text-slate-400">Direct Line</p>
                    <a
                      href="tel:+639159538248"
                      className="text-xs font-semibold text-slate-900 hover:text-[#8B151E] transition-colors block mt-0.5"
                    >
                      +63 915 953 8248
                    </a>
                  </div>
                </div>
              </div>

              {/* Physical & Registration Info */}
              <div className="space-y-4 pt-4 border-t border-slate-100 mt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase text-slate-400">Office Operations</p>
                    <p className="text-xs font-medium text-slate-800 mt-0.5">Monday – Friday, 24/7 Coverage</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase text-slate-400">Production Floor</p>
                    <p className="text-xs font-medium text-slate-800 mt-0.5">Calabarzon, Philippines</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase text-slate-400">Business Registration</p>
                    <p className="text-xs font-medium text-slate-800 mt-0.5">SEC Reg: 2022060057912-11</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Start a Conversation with Vigorous (8 Questions) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 md:p-10 shadow-2xs">
              <div className="mb-6 sm:mb-8">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8B151E]">
                  Inquiry Form
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                  Start a Conversation with Vigorous
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  Tell us about your campaign requirements and our solutions architect will follow
                  up within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200/90 p-8 text-center space-y-4 shadow-2xs">
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-600/20">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                      Inquiry Received
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">Proposal Request Received!</h3>
                  </div>
                  <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-900">{formData.fullNameTitle}</span>. Our
                    solutions team has received your inquiry for{' '}
                    <span className="font-bold text-emerald-700">{formData.service}</span> ({formData.podSize}). We will
                    review your specifications and connect with you at{' '}
                    <span className="font-bold text-slate-900">{formData.corporateEmail}</span> within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullNameTitle: '',
                        corporateEmail: '',
                        phoneWhatsApp: '',
                        company: '',
                        website: '',
                        service: 'Appointment Setting',
                        podSize: '4 - 9 Agents (Growth Pod)',
                        timeline: 'Within 30 Days',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-white border border-emerald-300 text-xs font-bold uppercase text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer shadow-2xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Q1 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        1. Your Full Name & Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullNameTitle}
                        onChange={(e) =>
                          setFormData({ ...formData, fullNameTitle: e.target.value })
                        }
                        placeholder="e.g. Sarah Jenkins, VP of Sales"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                      />
                    </div>

                    {/* Q2 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        2. Corporate Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.corporateEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, corporateEmail: e.target.value })
                        }
                        placeholder="sjenkins@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                      />
                    </div>

                    {/* Q3 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        3. Phone Number / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phoneWhatsApp}
                        onChange={(e) =>
                          setFormData({ ...formData, phoneWhatsApp: e.target.value })
                        }
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                      />
                    </div>

                    {/* Q4 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        4. Company / Organization Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Technologies Inc."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                      />
                    </div>
                  </div>

                  {/* Q5 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      5. Company Website *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                    />
                  </div>

                  {/* Q6 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      6. Primary Service of Interest *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                    >
                      {services.map((svc) => (
                        <option key={svc} value={svc}>
                          {svc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Q7 & Q8 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        7. Anticipated Agent Pod Size *
                      </label>
                      <select
                        value={formData.podSize}
                        onChange={(e) => setFormData({ ...formData, podSize: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                      >
                        {podSizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        8. Target Launch Timeline *
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                      >
                        {timelines.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Campaign Goals */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Briefly describe your campaign goals, target market, or specific requirements:
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline any key target industries, dialer preferences, daily call volume expectations, or CRM integrations..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B151E]/20 focus:border-[#8B151E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#8B151E] hover:bg-[#720E15] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Strategy Proposal</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
