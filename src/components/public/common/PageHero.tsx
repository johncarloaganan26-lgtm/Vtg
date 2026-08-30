import React from 'react';
import defaultDeskHeroImage from '../../../assets/images/bpo_desk_hero_1787880643936.jpg';

interface PageHeroProps {
  id?: string;
  badgeIcon: React.ReactNode;
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix?: string;
  description: string;
  bgImage?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  id = 'page-hero',
  badgeIcon,
  badgeText,
  titlePrefix,
  titleHighlight,
  titleSuffix = '',
  description,
  bgImage = defaultDeskHeroImage,
}) => {
  return (
    <section
      id={id}
      className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-14 sm:pb-18 md:pb-20 lg:pb-24 overflow-hidden border-b border-slate-800/80 bg-slate-950"
    >
      {/* Background Photograph (Desk with headset and keyboard) */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="VTG Telemarketing Workspace"
          className="w-full h-full object-cover object-right md:object-center"
          referrerPolicy="no-referrer"
        />
        {/* Dark Gradient Overlay for text readability on left while revealing photo on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-slate-950/15" />
      </div>

      {/* Content Container - Left Aligned exactly like the reference screenshot */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-left flex flex-col items-start">
          {/* Frosted Translucent Pill Badge with Border */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3.5 sm:mb-4 shadow-sm">
            {badgeIcon}
            <span>{badgeText}</span>
          </div>

          {/* Large Bold Headline with Red Highlight */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[52px] font-extrabold tracking-tight text-white leading-[1.18] mb-3 sm:mb-4">
            {titlePrefix}{' '}
            <span className="text-red-600">{titleHighlight}</span>
            {titleSuffix && ` ${titleSuffix}`}
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-xs sm:text-sm md:text-base text-slate-200/90 leading-relaxed font-normal max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
