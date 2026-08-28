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
          className="relative bg-gradient-to-r from-[#8B151E] via-[#9B1822] to-[#701017] rounded-2xl p-5 sm:p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6"
        >
          {/* Left info */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 text-white text-center sm:text-left">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Headphones className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B151E]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight mb-1">
                Ready to Build Momentum Together?
              </h3>
              <p className="text-xs sm:text-sm text-red-100 font-medium">
                Let's connect and find the right solution for your business.
              </p>
            </div>
          </div>

          {/* Right Button */}
          <div className="flex-shrink-0 w-full sm:w-auto text-center">
            <button
              id="cta-talk-btn"
              onClick={() => setIsContactModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-100 active:scale-[0.98] rounded-full transition-all duration-150 shadow-md cursor-pointer"
            >
              <span>LET'S TALK</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] text-slate-900" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
