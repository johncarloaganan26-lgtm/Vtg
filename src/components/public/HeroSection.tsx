import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Headphones, Users, Star, ArrowRight } from 'lucide-react';
import defaultHeadsetImage from '../../assets/images/headset_isolated_1787931086549.jpg';

export const HeroSection: React.FC = () => {
  const { activeHeroImage, setIsContactModalOpen, setPublicPage } = useApp();

  // Use the isolated studio headset image or user-configured activeHeroImage
  const heroHeadsetImage =
    activeHeroImage &&
    !activeHeroImage.includes('headset_hero_1787877116496') &&
    !activeHeroImage.includes('headset_product_1787880660062')
      ? activeHeroImage
      : defaultHeadsetImage;

  return (
    <section
      id="home"
      className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-24 overflow-hidden bg-white"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-[8%] top-32 size-[360px] rounded-full bg-red-50/70 blur-[1px] sm:size-[480px] lg:size-[560px]" />
        <div className="absolute right-[17%] top-56 hidden grid-cols-6 gap-3 text-[#B91C1C]/35 sm:grid">
          {Array.from({ length: 36 }).map((_, index) => (
            <span key={index} className="size-1 rounded-full bg-current" />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Badge, Typography, Buttons & Desktop Stats */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Top Pill Badge */}
            <div
              id="hero-badge"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-900 bg-white text-[11px] sm:text-xs font-bold tracking-wider uppercase text-slate-900 shadow-xs mb-5 sm:mb-6"
            >
              <Star className="w-3.5 h-3.5 fill-[#8B151E] text-[#8B151E]" />
              <span>18+ YEARS BPO EXCELLENCE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-4 sm:mb-5">
              Let’s Work Together
              <br />
              to Create
              <br />
              <span className="text-[#8B151E]">Momentum</span> with Us.
            </h1>

            {/* Red Accent Bar */}
            <div className="w-14 sm:w-16 h-1 sm:h-1.5 bg-[#8B151E] rounded-full mb-5 sm:mb-6" />

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mb-6 sm:mb-8">
              Premier BPO &amp; telemarketing solutions delivering qualified appointments,
              high-conversion outbound sales, and dedicated 24/7 customer care.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8 lg:mb-12">
              <button
                id="hero-cta-talk"
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#8B151E] hover:bg-[#720E15] active:scale-95 rounded-full shadow-lg shadow-red-950/20 transition-all cursor-pointer group"
              >
                <span>LET'S TALK</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                id="hero-cta-solutions"
                onClick={() => setPublicPage('solutions')}
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 bg-white border border-[#8B151E] hover:bg-red-50/40 active:scale-95 rounded-full transition-all cursor-pointer"
              >
                <span>EXPLORE SOLUTIONS</span>
              </button>
            </div>

            {/* Desktop Stats Row (Inside left column, beneath buttons) */}
            <div className="hidden lg:flex items-center gap-6 sm:gap-8 pt-2">
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#8B151E] tracking-tight">18+</div>
                <div className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                  YEARS EXP
                </div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#8B151E] tracking-tight">100+</div>
                <div className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                  AGENT PODS
                </div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#8B151E] tracking-tight">99%</div>
                <div className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                  QA PASS
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Headset Showcase + Floating 3-Feature Card */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center w-full">
            {/* Clean Headset Container with No Clutter Background */}
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] aspect-square flex items-center justify-center">
              {/* Headset Image */}
              <div className="relative z-10 w-[260px] sm:w-[320px] lg:w-[380px] aspect-square flex items-center justify-center p-2">
                <img
                  src={heroHeadsetImage}
                  alt="VTG Professional Headset"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Desktop Floating White 3-Feature Card (Overlapping bottom right) */}
              <div
                id="hero-features-card-desktop"
                className="hidden lg:block absolute -bottom-6 -right-6 z-20 bg-white rounded-2xl p-4 sm:p-5 shadow-xl shadow-slate-900/10 border border-slate-100 min-w-[240px]"
              >
                <div className="space-y-3">
                  {/* Row 1 */}
                  <div className="flex items-center gap-3 pb-2.5 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-[#8B151E]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">
                      High-Conversion Sales
                    </span>
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center gap-3 pb-2.5 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                      <Headphones className="w-4 h-4 text-[#8B151E]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">
                      24/7 Customer Care
                    </span>
                  </div>

                  {/* Row 3 */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-[#8B151E]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">
                      Scalable &amp; Reliable
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Floating White 3-Feature Card (Centered directly beneath headset) */}
            <div
              id="hero-features-card-mobile"
              className="lg:hidden w-full max-w-sm mx-auto mt-6 bg-white rounded-2xl p-4 shadow-lg shadow-slate-900/5 border border-slate-100"
            >
              <div className="space-y-3">
                {/* Row 1 */}
                <div className="flex items-center gap-3 pb-2.5 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-[#8B151E]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    High-Conversion Sales
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex items-center gap-3 pb-2.5 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-4 h-4 text-[#8B151E]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    24/7 Customer Care
                  </span>
                </div>

                {/* Row 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-[#8B151E]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    Scalable &amp; Reliable
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Stats Row (Placed directly beneath the feature card, matching ChatGPT mobile image) */}
            <div
              id="hero-stats-mobile"
              className="lg:hidden flex items-center justify-around w-full max-w-sm mx-auto mt-8 pt-6 border-t border-slate-100"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#8B151E] tracking-tight">18+</div>
                <div className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                  YEARS EXP
                </div>
              </div>
              <div className="h-9 w-px bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#8B151E] tracking-tight">100+</div>
                <div className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                  AGENT PODS
                </div>
              </div>
              <div className="h-9 w-px bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#8B151E] tracking-tight">99%</div>
                <div className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
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
