import React from 'react';
import { Headphones, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CtaBanner: React.FC = () => {
  const { setIsContactModalOpen } = useApp();

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="cta-ribbon-card"
          className="relative overflow-hidden rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl shadow-red-950/20 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Background Image across entire banner */}
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="/images/bpo_desk_hero_1787880643936.jpg"
              alt="VTG BPO Workspace"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
            />
            {/* Rich, Vibrant Red Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B151E]/95 via-[#9E141E]/92 to-[#720E15]/95 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[#8B151E]/75" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />
          </div>

          {/* Left info */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-white text-center sm:text-left">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Headphones className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B151E]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl md:text-[26px] font-extrabold tracking-tight text-white mb-1">
                Ready to Build Momentum Together?
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-red-100 font-medium max-w-xl">
                Let's connect and find the right solution for your business.
              </p>
            </div>
          </div>

          {/* Right Button */}
          <div className="relative z-10 flex-shrink-0 w-full sm:w-auto text-center">
            <button
              id="cta-talk-btn"
              onClick={() => setIsContactModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-red-50 hover:text-[#8B151E] active:scale-[0.98] rounded-full transition-all duration-150 shadow-lg cursor-pointer group"
            >
              <span>LET'S TALK</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] text-slate-900 group-hover:text-[#8B151E] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

