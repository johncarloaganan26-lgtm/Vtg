import React from 'react';
import { Award, Headphones, Users, ShieldCheck, Gauge, Cpu, Network } from 'lucide-react';
import bpoTeamDarkImage from '../../assets/images/bpo_team_dark_1787877207115.jpg';

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section id="why-us" className="relative bg-[#0F141C] text-white pt-12 sm:pt-16 lg:pt-20 pb-0 overflow-hidden">
      {/* Subtle brand red ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(185,28,28,0.15),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-16">
          {/* Left Column: Heading, Mission & Clear Image */}
          <div className="lg:col-span-5">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-red-500 block mb-2 sm:mb-3">
              WHY CHOOSE US
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-white tracking-tight leading-tight mb-3 sm:mb-5">
              Your Growth is
              <br />
              Our <span className="text-red-500">Commitment</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-md mb-6">
              We combine people, technology, and proven processes to deliver results
              that matter. More than a service provider, we're your growth partner.
            </p>

            {/* Clear Image - No overlays, no text on it */}
            <div className="rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-900 aspect-[16/10] max-w-md">
              <img
                src={bpoTeamDarkImage}
                alt="VTG Professional Operations Floor"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: 4 Feature Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Pillar 1 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-950/80 border border-red-800/40 flex items-center justify-center flex-shrink-0 text-red-400">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 sm:mb-1 tracking-tight">
                  Experienced Team
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  18+ years of industry expertise you can trust.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-950/80 border border-red-800/40 flex items-center justify-center flex-shrink-0 text-red-400">
                <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 sm:mb-1 tracking-tight">
                  Performance Driven
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  Results-focused strategies that maximize ROI.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-950/80 border border-red-800/40 flex items-center justify-center flex-shrink-0 text-red-400">
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 sm:mb-1 tracking-tight">
                  Advanced Technology
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  Tools and systems that keep us ahead.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-950/80 border border-red-800/40 flex items-center justify-center flex-shrink-0 text-red-400">
                <Network className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 sm:mb-1 tracking-tight">
                  Scalable Operations
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  Solutions that grow with your business.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Red Stats Banner Bar */}
        <div
          id="why-us-red-ribbon"
          className="relative bg-gradient-to-r from-[#8B151E] via-[#991B1B] to-[#7B1017] rounded-t-2xl p-5 sm:p-7 lg:p-8 shadow-xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-white">
            {/* Stat 1 */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">18+</div>
                <div className="text-[10px] sm:text-[11px] font-medium text-red-100">Years in Business</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">100+</div>
                <div className="text-[10px] sm:text-[11px] font-medium text-red-100">Agent Pods</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">10K+</div>
                <div className="text-[10px] sm:text-[11px] font-medium text-red-100">Clients Served</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">99%</div>
                <div className="text-[10px] sm:text-[11px] font-medium text-red-100">QA Pass Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
