import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { PageHero } from '../common/PageHero';
import {
  Heart,
  GraduationCap,
  Sparkles,
  ShieldAlert,
  Ribbon,
  CheckCircle2,
  Users,
  Calendar,
  ArrowRight,
  Award,
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { setPublicPage } = useApp();
  const [selectedPillar, setSelectedPillar] = useState<string>('all');

  const csrStories = [
    {
      id: 'reviving-classrooms',
      category: 'Community Outreach',
      pillar: 'education',
      title: 'Reviving Classrooms, Restoring Hope',
      desc: 'Vigorous Telemarketing Group joins forces with public schools to rehabilitate learning spaces, donate essential educational materials, and support teachers in underprivileged communities.',
      badge: 'Education Rehabilitation',
      date: 'Recent Outreach',
      bullets: [
        'Classroom repairs & supply donations',
        'Teacher support & learning kits',
        '2,400+ students supported',
      ],
      icon: GraduationCap,
      accent: 'border-red-200 bg-red-50/50',
    },
    {
      id: 'united-for-education',
      category: 'Community Outreach',
      pillar: 'education',
      title: 'United for Education',
      desc: 'Mobilizing company-wide volunteer drives and fundraising to provide back-to-school backpacks, books, and hygiene kits for children in regional communities.',
      badge: 'Youth Education',
      date: 'Annual Campaign',
      bullets: [
        'School bag & stationery distribution',
        'Health & hygiene awareness',
        '5 partner school districts',
      ],
      icon: Users,
      accent: 'border-amber-200 bg-amber-50/50',
    },
    {
      id: 'extending-compassion',
      category: 'Disaster Relief',
      pillar: 'relief',
      title: 'Extending Compassion in Crisis',
      desc: 'Rapid-response relief operations providing emergency food packs, clean water, and hygiene essentials to families affected by natural disasters.',
      badge: 'Emergency Relief',
      date: 'Rapid Response',
      bullets: [
        'Family food pack distributions',
        'Medical & sanitation kits',
        '4,800+ families assisted',
      ],
      icon: ShieldAlert,
      accent: 'border-blue-200 bg-blue-50/50',
    },
    {
      id: 'fight-for-cure',
      category: 'Healthcare Advocacy',
      pillar: 'health',
      title: 'Fight for a Cure',
      desc: 'Partnering with cancer support networks to raise funds, drive public awareness, and provide direct assistance to patients undergoing treatment.',
      badge: 'Health & Wellness',
      date: 'Ongoing Initiative',
      bullets: [
        'Fundraising walks & donor drives',
        'Patient treatment support',
        'Cancer awareness campaigns',
      ],
      icon: Ribbon,
      accent: 'border-rose-200 bg-rose-50/50',
    },
  ];

  const filteredStories =
    selectedPillar === 'all'
      ? csrStories
      : csrStories.filter((s) => s.pillar === selectedPillar);

  return (
    <div className="w-full bg-[#FAFAFA]">
      {/* 1. Hero Section matching reference Screenshot_20260828-092717.jpg */}
      <PageHero
        id="blog-hero"
        badgeIcon={<Heart className="w-3.5 h-3.5 text-red-500 fill-current" />}
        badgeText="STORIES OF IMPACT & CULTURE"
        titlePrefix="Stories of Purpose, People &"
        titleHighlight="Community"
        description="Highlights from our grassroots CSR initiatives, team culture spotlights, community giving programs, and milestone celebrations."
      />

      {/* 2. Filter Pills */}
      <section className="pt-6 pb-2 sm:pt-8 sm:pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2">
          {[
            { label: 'All Stories', key: 'all' },
            { label: 'Education & Youth', key: 'education' },
            { label: 'Disaster Relief', key: 'relief' },
            { label: 'Health & Wellness', key: 'health' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedPillar(tab.key)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedPillar === tab.key
                  ? 'bg-[#8B151E] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. CSR Stories Grid */}
      <section className="py-6 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredStories.map((story) => {
            const Icon = story.icon;
            return (
              <article
                key={story.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xs hover:border-red-200 transition-all flex flex-col justify-between"
              >
                <div className="p-5 sm:p-7">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-red-50 text-[#8B151E] border border-red-100">
                      {story.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{story.date}</span>
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 tracking-tight">
                    {story.title}
                  </h3>
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold mb-3">
                    {story.badge}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {story.desc}
                  </p>

                  {/* Bullets */}
                  <div className="rounded-xl p-3 sm:p-3.5 bg-slate-50 border border-slate-100 space-y-1.5">
                    {story.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B151E] flex-shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="px-5 py-3 sm:px-7 sm:py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <Icon className="w-3.5 h-3.5 text-[#8B151E]" />
                    <span>Vigorous CSR Pillar</span>
                  </div>
                  <button
                    onClick={() => setPublicPage('contact')}
                    className="text-xs font-bold text-[#8B151E] hover:text-[#720E15] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Support Initiative</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. Impact by the Numbers */}
      <section className="bg-white border-y border-slate-200/80 py-10 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left sm:text-center max-w-3xl sm:mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8B151E]">
              Impact by the Numbers
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1.5 mb-2.5 tracking-tight">
              Measurable Change Across Communities
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
              Every hour our team works powers tangible contributions toward sustainable community
              development.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              {
                stat: '12,000+',
                desc: 'Lives Touched Across Outreach Programs',
              },
              {
                stat: '48+',
                desc: 'Community & Relief Drives Conducted',
              },
              {
                stat: '100%',
                desc: 'Employee Volunteer Participation Rate',
              },
              {
                stat: '₱2.4M+',
                desc: 'Direct Aid & Scholarships Mobilized',
              },
            ].map((metric, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center flex flex-col justify-center"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#8B151E] mb-1 tracking-tight">
                  {metric.stat}
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                  {metric.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CSR Pillars That Drive Our Work */}
      <section className="py-10 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left sm:text-center max-w-3xl sm:mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8B151E]">
            CSR Pillars That Drive Our Work
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1.5 mb-2.5 tracking-tight">
            Guiding Our Humanitarian Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B151E] flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Education & Youth</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Building stronger futures by ensuring every child has access to quality education,
              safe learning spaces, and essential study materials.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Emergency Relief</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Deploying immediate disaster response teams to deliver food, clean water, and medical
              essentials when crisis strikes our communities.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Health & Wellness</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Championing access to critical medical care, cancer patient support programs, and
              public health awareness drives.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
