import React, { useState } from 'react';
import { FAQS_DATA } from '../../data/initialData';
import { Plus, Minus, HelpCircle, ArrowRight, Headphones } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { setIsContactModalOpen } = useApp();

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-[#FAF9F6] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left sm:text-center max-w-2xl sm:mx-auto mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#B91C1C] block mb-1.5 sm:mb-2">
            FAQS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Grid: Accordion + Quick Help Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-10 sm:mb-14">
          {/* Left Column: Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-150 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 text-left flex items-center justify-between text-xs sm:text-sm md:text-base font-bold text-slate-900 hover:text-[#B91C1C] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="ml-3 sm:ml-4 flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B91C1C]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-6 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-2.5 sm:pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Contact CTA Box */}
          <div className="lg:col-span-5">
            <div
              id="faq-help-card"
              className="bg-[#FFF5F5] border border-red-100 rounded-2xl p-5 sm:p-8 md:p-10 flex flex-col items-center text-center shadow-2xs"
            >
              {/* Question bubble graphic */}
              <div className="relative mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white shadow-xs border border-red-100 flex items-center justify-center">
                  <HelpCircle className="w-7 h-7 sm:w-9 sm:h-9 text-[#B91C1C]" />
                </div>
                {/* Secondary decorative bubble */}
                <div className="absolute -bottom-1 -right-1 sm:-right-2 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-red-100 flex items-center justify-center text-[10px] sm:text-xs font-bold text-[#B91C1C]">
                  ?
                </div>
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-1.5 sm:mb-2">
                Have more questions?
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-5 sm:mb-8">
                We're here to help.
              </p>

              <button
                id="faq-contact-btn"
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#8B151E] hover:bg-[#720E15] active:scale-[0.98] rounded-full transition-all duration-150 shadow-sm shadow-red-900/20 cursor-pointer"
              >
                <span>CONTACT US</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Integrated Bottom Momentum CTA Banner */}
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
