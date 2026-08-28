import React from 'react';
import { useApp } from '../../../context/AppContext';
import { PageHero } from '../common/PageHero';
import {
  CalendarCheck,
  MessageSquare,
  TrendingUp,
  Headphones,
  Sliders,
  Database,
  HeartHandshake,
  UserCheck,
  Target,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Layers,
  Sparkles,
  Briefcase,
} from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  const { setPublicPage } = useApp();

  const serviceOfferings = [
    {
      category: 'Sales Development',
      title: 'Appointment Setting',
      icon: CalendarCheck,
      desc: 'Strategic B2B & B2C prospecting that thoroughly vets leads and secures qualified, high-intent meetings for your sales team.',
      bullets: [
        'Pre-vetted prospect qualification',
        'Direct calendar sync with your sales reps',
        'Tailored outreach scripts',
      ],
    },
    {
      category: 'Digital Care',
      title: 'Chat & Email Support',
      icon: MessageSquare,
      desc: '24/7 responsive digital support across live chat, ticketing, and email to ensure fast resolutions and high customer satisfaction.',
      bullets: [
        'Rapid response time metrics',
        'Multi-ticket triage and CRM tagging',
        '24/7 coverage capabilities',
      ],
    },
    {
      category: 'Revenue Acceleration',
      title: 'Outbound Sales',
      icon: TrendingUp,
      desc: 'High-velocity sales campaigns driven by experienced closers with intensive product training and proven objection-handling skills.',
      bullets: [
        'High conversion phone campaigns',
        'Objection handling mastery',
        'Deep product knowledge training',
      ],
    },
    {
      category: 'System & IT',
      title: 'Technical Support',
      icon: Headphones,
      desc: 'Tier 1 & Tier 2 technical troubleshooting to rapidly resolve system, software, and hardware issues with zero downtime.',
      bullets: [
        'Tier 1 & Tier 2 troubleshooting',
        'Vigilant incident resolution',
        'System navigation & user guidance',
      ],
    },
    {
      category: 'Operations',
      title: 'Contact Center Management',
      icon: Sliders,
      desc: 'Turnkey contact center infrastructure with dedicated supervisors, live QA auditing, and real-time performance analytics.',
      bullets: [
        'Daily operations optimization',
        'Continuous QA insights & feedback loops',
        'Cohesive team culture & low attrition',
      ],
    },
    {
      category: 'Back Office',
      title: 'Data Entry & Management',
      icon: Database,
      desc: 'High-speed data encoding, document processing, and database cleaning executed with strict confidentiality and near-zero error.',
      bullets: [
        'Near-zero error accuracy rates',
        'Strict data privacy & classification',
        'Fast, high-volume document handling',
      ],
    },
    {
      category: 'Customer Experience',
      title: 'Customer Service',
      icon: HeartHandshake,
      desc: 'Empathetic inbound voice support and omnichannel care focused on First Contact Resolution and positive brand experiences.',
      bullets: [
        'High CSAT customer satisfaction',
        'Empathetic issue resolution',
        'Omnichannel continuity',
      ],
    },
    {
      category: 'Executive & Admin',
      title: 'Virtual Assistant',
      icon: UserCheck,
      desc: 'Dedicated administrative professionals managing executive calendars, emails, research, and daily back-office workflows.',
      bullets: [
        'Multi-platform email & social management',
        'Calendar & administrative workflows',
        'Dedicated executive support',
      ],
    },
    {
      category: 'Pipeline Growth',
      title: 'Lead Generation',
      icon: Target,
      desc: 'Targeted omnichannel lead generation identifying qualified market segments to fill your sales pipeline with verified buyers.',
      bullets: [
        'Inbound & outbound qualification',
        'Prospect interest capture',
        'Zero lead waste methodology',
      ],
    },
  ];

  const advantages = [
    {
      title: 'Flexible Manpower',
      desc: 'Custom team sizing and dedicated operational management aligned to your exact targets and budget.',
      icon: Users,
    },
    {
      title: 'Product Knowledge',
      desc: 'Rapid onboarding with Subject Matter Experts and QA audits to maximize conversion rates.',
      icon: Award,
    },
    {
      title: 'Fully Equipped',
      desc: 'Modern tech stack, telecom redundancy, and enterprise CRM workflows ready from day one.',
      icon: Layers,
    },
    {
      title: 'Responsiveness',
      desc: 'Proactive client communication and agile problem-solving tailored to your business needs.',
      icon: Sparkles,
    },
    {
      title: 'Scalability',
      desc: 'Seamlessly scale pods from 5 to 100+ agents without sacrificing quality or performance.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="w-full bg-[#FAFAFA]">
      {/* 1. Hero Section matching reference Screenshot_20260828-092717.jpg */}
      <PageHero
        id="solutions-hero"
        badgeIcon={<Layers className="w-3.5 h-3.5 text-red-500" />}
        badgeText="COMPREHENSIVE BPO SOLUTIONS"
        titlePrefix="Tailored Services Built to Drive"
        titleHighlight="Momentum"
        description="Scalable BPO infrastructure, experienced agents, and verified outreach workflows to accelerate your pipeline."
      />

      {/* 2. Specialized Divisions Grid */}
      <section className="py-10 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left sm:text-center max-w-3xl sm:mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8B151E]">
            Comprehensive BPO Capabilities
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1.5 mb-2.5 tracking-tight">
            Tailored Outsourcing Solutions Built for Performance
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
            Choose from our specialized practice groups or combine services into a hybrid pod
            engineered specifically for your growth targets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {serviceOfferings.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-red-200"
              >
                <div>
                  {/* Category Pill & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-50 text-[#8B151E] border border-red-100">
                      {service.category}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-[#8B151E] group-hover:text-white group-hover:border-red-800 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 mb-7 border-t border-slate-100 pt-5">
                    {service.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#8B151E] flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inquire Action Button */}
                <button
                  onClick={() => setPublicPage('contact')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#8B151E] hover:text-white text-slate-800 text-xs font-bold uppercase tracking-wider transition-colors border border-slate-200 hover:border-red-800 cursor-pointer"
                >
                  <span>Inquire about this service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. What We Can Provide Section */}
      <section className="bg-white border-y border-slate-200/80 py-10 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left sm:text-center max-w-3xl sm:mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8B151E]">
              What We Can Provide
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1.5 mb-2.5 tracking-tight">
              Enterprise Readiness & Operational Advantages
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
              Why leading enterprises and growing businesses choose Vigorous Telemarketing Group as
              their long-term outsourcing partner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col items-start hover:bg-white hover:shadow-xs transition-all"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-100/70 text-[#8B151E] flex items-center justify-center mb-3 sm:mb-4">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5">{adv.title}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">{adv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Strategy Call CTA Banner */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-950 via-[#8B151E] to-[#6A0F15] p-6 sm:p-10 lg:p-14 text-white overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-2.5 sm:mb-4 text-white">
              Ready to scale your campaign with Vigorous?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-red-100 leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal">
              Schedule a strategy call with our solutions team to define your agent pod size, script
              requirements, and KPI goals.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => setPublicPage('contact')}
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white hover:bg-slate-100 text-slate-900 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Request a Strategy Proposal</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B151E]" />
              </button>

              <button
                onClick={() => setPublicPage('apply')}
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-white/30 backdrop-blur-sm transition-all cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <span>Career Opportunities</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
