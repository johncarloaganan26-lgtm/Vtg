import React from 'react';
import { useApp } from '../../../context/AppContext';
import { PageHero } from '../common/PageHero';
import {
  Shield,
  Target,
  Sparkles,
  Heart,
  Users,
  Award,
  CheckCircle2,
  PhoneCall,
  Laptop,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setPublicPage } = useApp();

  const leadershipGroups = [
    {
      groupTitle: 'Founders & Executive Leadership',
      members: [
        {
          initials: 'JL',
          name: 'Joshua Lim Lantaka',
          role: 'CEO ┃ Founder',
          color: 'bg-red-900 text-white',
        },
        {
          initials: 'TL',
          name: 'Teresa Lantaka',
          role: 'CFO ┃ Founder',
          color: 'bg-red-800 text-white',
        },
      ],
    },
    {
      groupTitle: 'Operations Management',
      members: [
        {
          initials: 'RF',
          name: 'Robin Fastidio',
          role: 'Senior Operations Manager',
          color: 'bg-slate-900 text-white',
        },
        {
          initials: 'JK',
          name: 'John Karl Da-ang',
          role: 'Operations Manager',
          color: 'bg-slate-800 text-white',
        },
        {
          initials: 'CC',
          name: 'Cess Calaycay',
          role: 'Operations Manager',
          color: 'bg-slate-800 text-white',
        },
      ],
    },
    {
      groupTitle: 'Administration',
      members: [
        {
          initials: 'WC',
          name: 'Wren Caca',
          role: 'Administrative Manager',
          color: 'bg-rose-900 text-white',
        },
        {
          initials: 'FL',
          name: 'Franchesca Lantaka',
          role: 'Administrative Staff',
          color: 'bg-rose-800 text-white',
        },
      ],
    },
    {
      groupTitle: 'Team Leaders',
      members: [
        {
          initials: 'JD',
          name: 'Jay Digan',
          role: 'Team Leader',
          color: 'bg-slate-800 text-white',
        },
        {
          initials: 'KB',
          name: 'Kate Belario',
          role: 'Team Leader',
          color: 'bg-slate-800 text-white',
        },
        {
          initials: 'RT',
          name: 'Rozzel Timbogan',
          role: 'Team Leader',
          color: 'bg-slate-800 text-white',
        },
        {
          initials: 'JA',
          name: 'Jane Alexis Dela Rea',
          role: 'Team Leader',
          color: 'bg-slate-800 text-white',
        },
        {
          initials: 'JC',
          name: 'Jan Carlo Untalsco',
          role: 'Team Leader',
          color: 'bg-slate-800 text-white',
        },
        {
          initials: 'AM',
          name: 'Angel Malayan',
          role: 'Team Leader',
          color: 'bg-slate-800 text-white',
        },
      ],
    },
    {
      groupTitle: 'Training & Coaching',
      members: [
        {
          initials: 'MJ',
          name: 'Mark Jordan Asuncion',
          role: 'Trainer',
          color: 'bg-amber-800 text-white',
        },
        {
          initials: 'DQ',
          name: 'Dominic Quiban',
          role: 'Trainer',
          color: 'bg-amber-800 text-white',
        },
      ],
    },
    {
      groupTitle: 'IT & Technical Support',
      members: [
        {
          initials: 'VM',
          name: 'Vince Manaig',
          role: 'IT Technician',
          color: 'bg-cyan-900 text-white',
        },
        {
          initials: 'IT',
          name: 'Technical Support Specialist',
          role: 'IT Technician',
          color: 'bg-cyan-800 text-white',
        },
      ],
    },
  ];

  const ideals = [
    {
      category: 'Foundation of Trust',
      title: 'Integrity',
      desc: 'The bedrock of client trust, ethical conduct, and transparent long-term relationships.',
      icon: Shield,
    },
    {
      category: 'Quality & Speed',
      title: 'Focus',
      desc: 'High-precision execution that ensures exceptional quality and faster turnaround.',
      icon: Target,
    },
    {
      category: 'Energy & Drive',
      title: 'Passion',
      desc: 'Genuine enthusiasm and energy invested in every client campaign and customer interaction.',
      icon: Sparkles,
    },
    {
      category: 'Positive Culture',
      title: 'Respect',
      desc: 'Cultivating an empowering workplace where collaboration and open communication thrive.',
      icon: Heart,
    },
    {
      category: 'Team Synergy',
      title: 'Camaraderie',
      desc: 'Strong team synergy and mutual trust driving high morale and low employee turnover.',
      icon: Users,
    },
    {
      category: 'Market Edge',
      title: 'Innovation',
      desc: 'Continual adoption of modern outreach tech and agile workflow optimizations.',
      icon: Award,
    },
  ];

  return (
    <div className="w-full bg-[#FAFAFA]">
      {/* 1. Hero Section matching reference Screenshot_20260828-092717.jpg */}
      <PageHero
        id="about-hero"
        badgeIcon={<Award className="w-3.5 h-3.5 text-red-500" />}
        badgeText="PROVEN INDUSTRY LEADERSHIP"
        titlePrefix="Building Global Growth with Philippine"
        titleHighlight="Heart"
        description="Over 18 years of pioneering telemarketing, qualified appointment setting, and customer support with relentless commitment to client growth."
      />

      {/* 2. Mission & Vision */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Mission */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-8 shadow-2xs relative overflow-hidden group hover:border-red-200 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#8B151E]">
                Mission
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-200 group-hover:text-red-100 transition-colors">
                01
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2.5 tracking-tight">
              Empowering Communities & Elevating Quality
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
              To deliver highest-standard telemarketing solutions while giving back to our local
              communities, creating sustainable livelihood opportunities, and setting benchmarks
              for operational integrity.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#8B151E] text-[11px] sm:text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Community-First Engagement</span>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-8 shadow-2xs relative overflow-hidden group hover:border-red-200 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#8B151E]">
                Vision
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-200 group-hover:text-red-100 transition-colors">
                02
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2.5 tracking-tight">
              Transforming Telemarketing Worldwide
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
              To lead the global transformation of human-centered telemarketing, creating
              measurable growth and lasting competitive advantage for our partners.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] sm:text-xs font-bold">
              <Target className="w-3.5 h-3.5 text-[#8B151E]" />
              <span>Measurable Client Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Company Profile & Experience */}
      <section className="bg-white border-y border-slate-200/80 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8B151E]">
                Company Profile & Experience
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Over 18 years of proven telemarketing excellence.
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                Vigorous Telemarketing Group (VTG) operates specialized BPO pods across the US,
                Canada, UK, Australia, and Asia. Our proprietary coaching, production, and QA
                frameworks ensure every campaign hits target KPIs with near-zero error.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                From agile 5-agent pilot teams to 100+ dedicated agent pods, we provide end-to-end
                management, telemarketing outreach, appointment setting, digital customer care, and
                back-office support.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setPublicPage('contact')}
                  className="px-5 py-2.5 rounded-full bg-[#8B151E] hover:bg-[#720E15] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs transition-all cursor-pointer"
                >
                  Partner with VTG
                </button>
                <button
                  onClick={() => setPublicPage('solutions')}
                  className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Explore Solutions
                </button>
              </div>
            </div>

            {/* Global Footprint & Scalability */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-5">
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Global Campaign Footprint
                </h4>
                <p className="text-xs text-slate-600 mb-3">
                  Decades of experience executing high-conversion telemarketing campaigns across
                  international markets:
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['United States', 'Canada', 'United Kingdom', 'Australia', 'Asia'].map(
                    (country, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800"
                      >
                        {country}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Specialized Services
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-[#8B151E]" />
                    <span>Outbound Call Center</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Laptop className="w-3.5 h-3.5 text-[#8B151E]" />
                    <span>Live Chat & Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-[#8B151E]" />
                    <span>Appointment Setting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8B151E]" />
                    <span>Data Entry & Cleaning</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 bg-white rounded-xl p-3.5 border">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8B151E]">
                  Scalability
                </span>
                <h5 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                  5 to 100+ Agent Setups
                </h5>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                  Flexible scaling for small to mid-size companies with near-zero error and
                  consistent quality management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Guiding Ideals - Work Ethics & Culture */}
      <section className="py-10 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left sm:text-center max-w-3xl sm:mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8B151E]">
            Our Guiding Ideals
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1.5 mb-2.5 tracking-tight">
            Work Ethics & Culture
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
            Integrity, focus, passion, respect, camaraderie and innovation are the ideals that guide
            our organization. As an equal-opportunity and LGBTQA+ friendly company, we strive to be
            at the top of the global stage while taking care of our staff, partners, and clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {ideals.map((ideal, idx) => {
            const Icon = ideal.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 hover:border-red-200 hover:shadow-xs transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {ideal.category}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#8B151E] flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">{ideal.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{ideal.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Guiding Operations & Strategy - The Leadership Team */}
      <section className="bg-white border-t border-slate-200/80 py-10 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left sm:text-center max-w-3xl sm:mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8B151E]">
              Guiding Operations & Strategy
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1.5 mb-2.5 tracking-tight">
              The Leadership Team
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
              The VTG Leadership Team is the driving force behind the organization's vision and
              success, guiding operations with strategic insight, dedication, and a deep commitment
              to empowering both employees and the clients they serve.
            </p>
          </div>

          <div className="space-y-12">
            {leadershipGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    {group.groupTitle}
                  </h3>
                  <div className="h-[1px] flex-1 bg-slate-200" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {group.members.map((member, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-slate-50/70 rounded-xl border border-slate-200/80 p-4.5 flex items-center gap-4 hover:bg-white hover:shadow-xs transition-all"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-xs ${member.color}`}
                      >
                        {member.initials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{member.name}</h4>
                        <p className="text-xs text-[#8B151E] font-semibold mt-0.5">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
