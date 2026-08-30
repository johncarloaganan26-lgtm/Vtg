import React, { useState } from 'react';
import { FAQS_DATA } from '../../data/initialData';
import { Plus, Minus } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-4xl">
          <div className="space-y-3">
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

        </div>
      </div>
    </section>
  );
};
