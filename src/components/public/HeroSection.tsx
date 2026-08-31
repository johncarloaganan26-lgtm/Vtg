import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Headphones, Users, Star, ArrowRight } from 'lucide-react';

const defaultHeadsetImage = '/assets/images/headset-transparent.png';

export const HeroSection: React.FC = () => {
  const { setIsContactModalOpen, setPublicPage } = useApp();

  return (
    <section
      id="home"
      className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-10 sm:pb-12 lg:pb-16 overflow-hidden bg-[#FCFDFF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column: Badge, Typography, Buttons & Desktop Stats */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Top Pill Badge */}
            <div
              id="hero-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-900 bg-white text-[11px] sm:text-xs font-bold tracking-wider uppercase text-slate-900 shadow-xs mb-4 sm:mb-5"
            >
              <Star className="w-3.5 h-3.5 fill-[#8B151E] text-[#8B151E]" />
              <span>18+ YEARS BPO EXCELLENCE</span>
            </div>

            {/* Main Headline matching mockup */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.14] mb-3.5 sm:mb-4">
              Let’s Work Together
              <br />
              to Create
              <br />
              <span className="text-[#8B151E]">Momentum</span> with Us.
            </h1>

            {/* Red Accent Bar */}
            <div className="w-12 sm:w-14 h-1 bg-[#8B151E] rounded-full mb-4 sm:mb-5" />

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-lg xl:max-w-xl mb-6 sm:mb-7">
              Premier BPO &amp; telemarketing solutions delivering qualified appointments,
              high-conversion outbound sales, and dedicated 24/7 customer care.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-8">
              <button
                id="hero-cta-talk"
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#8B151E] hover:bg-[#720E15] active:scale-95 rounded-full shadow-md shadow-red-950/20 transition-all cursor-pointer group"
              >
                <span>LET'S TALK</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                id="hero-cta-solutions"
                onClick={() => setPublicPage('solutions')}
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 bg-white border border-[#8B151E] hover:bg-red-50/40 active:scale-95 rounded-full transition-all cursor-pointer"
              >
                <span>EXPLORE SOLUTIONS</span>
              </button>
            </div>

            {/* Desktop Stats Row (Inside left column, aligned with right orbit) */}
            <div className="hidden lg:flex items-center gap-6 sm:gap-7 pt-2">
              <div>
                <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-[#8B151E] tracking-tight">18+</div>
                <div className="text-[10px] font-bold tracking-wider text-slate-600 uppercase mt-0.5">
                  YEARS EXP
                </div>
              </div>
              <div className="h-9 w-px bg-slate-200" />
              <div>
                <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-[#8B151E] tracking-tight">100+</div>
                <div className="text-[10px] font-bold tracking-wider text-slate-600 uppercase mt-0.5">
                  AGENT PODS
                </div>
              </div>
              <div className="h-9 w-px bg-slate-200" />
              <div>
                <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-[#8B151E] tracking-tight">99%</div>
                <div className="text-[10px] font-bold tracking-wider text-slate-600 uppercase mt-0.5">
                  QA PASS
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Headset with Orbital Circular Layout matching Left Height */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center w-full my-auto">
            {/* Visual Circular Container */}
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] xl:max-w-[410px] aspect-square flex items-center justify-center my-2">
              {/* Outer Decorative Dashed Orbital Track */}
              <div className="absolute inset-0 m-auto w-[240px] sm:w-[290px] lg:w-[330px] xl:w-[360px] h-[240px] sm:h-[290px] lg:h-[330px] xl:h-[360px] rounded-full border border-dashed border-[#8B151E]/20 pointer-events-none animate-[spin_120s_linear_infinite]" />

              {/* Inner Decorative Solid Orbital Track */}
              <div className="absolute inset-0 m-auto w-[200px] sm:w-[245px] lg:w-[280px] xl:w-[305px] h-[200px] sm:h-[245px] lg:h-[280px] xl:h-[305px] rounded-full border border-[#8B151E]/10 pointer-events-none" />

              {/* Soft Blush Circle Backdrop with Dot Matrix and Orbital Line */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-[210px] sm:w-[255px] lg:w-[290px] xl:w-[320px] h-[210px] sm:h-[255px] lg:h-[290px] xl:h-[320px] rounded-full bg-gradient-to-br from-[#FCEDEE]/85 via-[#FDF2F3]/65 to-[#FCEDEE]/35 shadow-inner">
                  {/* Subtle Dot Grid Matrix */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-35"
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <pattern id="dot-grid" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                      <circle cx="3" cy="3" r="1.5" fill="#8B151E" opacity="0.35" />
                    </pattern>
                    <rect x="35" y="60" width="160" height="160" fill="url(#dot-grid)" />
                  </svg>

                  {/* Red Sweeping Orbital Trace Line & Anchor Node */}
                  <svg
                    className="absolute -top-4 -right-4 w-[115%] h-[115%] pointer-events-none"
                    viewBox="0 0 500 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 100 400 C 240 480, 480 380, 440 180 C 400 60, 240 70, 200 150 C 180 190, 220 250, 300 210"
                      stroke="#8B151E"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      opacity="0.4"
                    />
                    <circle cx="300" cy="210" r="3.5" fill="#8B151E" />
                    <circle cx="300" cy="210" r="7" stroke="#8B151E" strokeWidth="1" opacity="0.35" />
                  </svg>
                </div>
              </div>

              {/* Headset Image in Center */}
              <div className="relative z-10 w-[200px] sm:w-[245px] lg:w-[280px] xl:w-[310px] aspect-square flex items-center justify-center p-2">
                <img
                  src={defaultHeadsetImage}
                  alt="VTG BPO Professional Headset"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain scale-110 sm:scale-115 lg:scale-120 filter drop-shadow-xl brightness-105 contrast-110 mix-blend-multiply transition-transform duration-500 hover:scale-[1.24]"
                />
              </div>

              {/* ============================================================ */}
              {/* ORBITAL FEATURE 1: High-Conversion Sales (1: TOP-LEFT)      */}
              {/* ============================================================ */}
              <div
                id="hero-orbit-feature-sales"
                className="absolute top-1 -left-2 sm:top-2 sm:-left-4 lg:top-2 lg:-left-6 z-20 group transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl shadow-md shadow-slate-900/5 border border-slate-100/90 hover:border-red-200/80 transition-all">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#8B151E] to-[#680C13] text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-red-950/20">
                    <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <div className="pr-1 text-left">
                    <div className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 leading-tight whitespace-nowrap">
                      High-Conversion Sales
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-[9px] sm:text-[10px] text-emerald-600 font-semibold mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>+45% Lead Conversion</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* ORBITAL FEATURE 2: 24/7 Customer Care (2: MIDDLE-RIGHT)     */}
              {/* ============================================================ */}
              <div
                id="hero-orbit-feature-care"
                className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-4 lg:-right-6 z-20 group transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl shadow-md shadow-slate-900/5 border border-slate-100/90 hover:border-red-200/80 transition-all">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#8B151E] to-[#680C13] text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-red-950/20">
                    <Headphones className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <div className="pr-1 text-left">
                    <div className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 leading-tight whitespace-nowrap">
                      24/7 Customer Care
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-[9px] sm:text-[10px] text-[#8B151E] font-semibold mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Always-On Live Pods</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* ORBITAL FEATURE 3: Scalable & Reliable (3: BOTTOM-LEFT)     */}
              {/* ============================================================ */}
              <div
                id="hero-orbit-feature-scalable"
                className="absolute bottom-1 -left-2 sm:bottom-2 sm:-left-4 lg:bottom-2 lg:-left-6 z-20 group transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl shadow-md shadow-slate-900/5 border border-slate-100/90 hover:border-red-200/80 transition-all">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#8B151E] to-[#680C13] text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-red-950/20">
                    <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <div className="pr-1 text-left">
                    <div className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 leading-tight whitespace-nowrap">
                      Scalable &amp; Reliable
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-500 font-semibold mt-0.5">
                      <span>99.9% Uptime SLA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Stats Row (Placed cleanly beneath the headphone visual) */}
            <div
              id="hero-stats-mobile"
              className="lg:hidden flex items-center justify-around w-full max-w-sm mx-auto mt-4 pt-4 border-t border-slate-100"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#8B151E] tracking-tight">18+</div>
                <div className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-600 uppercase mt-0.5">
                  YEARS EXP
                </div>
              </div>
              <div className="h-9 w-px bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#8B151E] tracking-tight">100+</div>
                <div className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-600 uppercase mt-0.5">
                  AGENT PODS
                </div>
              </div>
              <div className="h-9 w-px bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#8B151E] tracking-tight">99%</div>
                <div className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-600 uppercase mt-0.5">
                  QA PASS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
