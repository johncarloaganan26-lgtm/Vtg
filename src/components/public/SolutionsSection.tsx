import React from 'react';
import { Target, BarChart3, Headphones, Users2, ArrowRight } from 'lucide-react';
import { SOLUTIONS_DATA } from '../../data/initialData';
import { useApp } from '../../context/AppContext';

export const SolutionsSection: React.FC = () => {
  const { setIsContactModalOpen } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'target':
        return <Target className="w-5 h-5 text-[#B91C1C]" />;
      case 'barChart':
        return <BarChart3 className="w-5 h-5 text-[#B91C1C]" />;
      case 'headphones':
        return <Headphones className="w-5 h-5 text-[#B91C1C]" />;
      case 'users':
      default:
        return <Users2 className="w-5 h-5 text-[#B91C1C]" />;
    }
  };

  return (
    <section id="solutions" className="py-12 sm:py-16 lg:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left sm:text-center max-w-3xl sm:mx-auto mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#B91C1C] block mb-1.5 sm:mb-2">
            OUR SOLUTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Powerful Solutions for
            <br className="hidden sm:inline" />
            {' '}Growing Your <span className="text-[#B91C1C]">Business</span>
          </h2>
        </div>

        {/* 4 Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-4 xl:gap-6 mb-8 sm:mb-12">
          {SOLUTIONS_DATA.map((item) => (
            <div
              key={item.id}
              id={`solution-card-${item.id}`}
              className="bg-white rounded-2xl p-5 sm:p-6 lg:p-5 xl:p-7 border border-slate-100 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between group hover:-translate-y-0.5"
            >
              <div>
                {/* Red circular icon badge */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-50 flex items-center justify-center mb-3.5 sm:mb-5 group-hover:bg-red-100 transition-colors">
                  {getIcon(item.iconName)}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 sm:mb-2 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Sub-metric tag */}
              <div className="mt-4 pt-3.5 border-t border-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span className="text-red-700 font-medium">{item.metric}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            id="explore-solutions-btn"
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#8B151E] hover:bg-[#720E15] active:scale-[0.98] rounded-full transition-all duration-150 shadow-sm shadow-red-900/20 cursor-pointer"
          >
            <span>EXPLORE ALL SOLUTIONS</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
