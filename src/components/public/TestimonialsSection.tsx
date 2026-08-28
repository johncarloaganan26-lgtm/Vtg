import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../../data/initialData';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activePage, setActivePage] = useState(0);

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left sm:text-center max-w-3xl sm:mx-auto mb-8 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-slate-500 block mb-1.5 sm:mb-2">
            WHAT OUR CLIENTS SAY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Trusted by Businesses
            <br className="hidden sm:inline" />
            {' '}Like <span className="text-[#B91C1C]">Yours</span>
          </h2>
        </div>

        {/* 3 Testimonial Cards matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 mb-8 sm:mb-12">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={t.id}
              id={`testimonial-card-${idx}`}
              className="bg-[#FAF9F6] rounded-2xl p-5 sm:p-7 lg:p-8 border border-slate-100/80 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow relative"
            >
              <div>
                {/* Red Quote mark */}
                <div className="text-[#B91C1C] mb-3 sm:mb-4">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 fill-[#B91C1C]/10 text-[#B91C1C]" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-5 sm:mb-8">
                  "{t.quote}"
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 pt-3.5 sm:pt-4 border-t border-slate-200/60">
                <img
                  src={t.avatarUrl}
                  alt={t.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                    {t.author}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots matching screenshot */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`h-2 transition-all duration-200 rounded-full ${
                activePage === page ? 'w-6 bg-[#B91C1C]' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Page ${page + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
