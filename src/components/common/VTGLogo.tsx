import React, { useId } from 'react';

interface VTGLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  inverted?: boolean;
  onClick?: () => void;
}

export const VTGLogo: React.FC<VTGLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  inverted = false,
  onClick,
}) => {
  const pathId = useId();

  const sizeMap = {
    xs: { circle: 20, circleClass: 'w-5 h-5', textTitle: 'text-[10px]', textSub: 'text-[7px]' },
    sm: { circle: 32, circleClass: 'w-7 h-7 sm:w-8 sm:h-8', textTitle: 'text-xs sm:text-sm', textSub: 'text-[7.5px] sm:text-[9px]' },
    md: { circle: 44, circleClass: 'w-9 h-9 sm:w-11 sm:h-11', textTitle: 'text-sm sm:text-base', textSub: 'text-[9px] sm:text-[10px]' },
    lg: { circle: 56, circleClass: 'w-12 h-12 sm:w-14 sm:h-14', textTitle: 'text-lg sm:text-xl', textSub: 'text-xs' },
    xl: { circle: 72, circleClass: 'w-16 h-16 sm:w-18 sm:h-18', textTitle: 'text-xl sm:text-2xl', textSub: 'text-xs sm:text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      id="vtg-brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 sm:gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Authentic VTG Seal matching screen.png */}
      <div
        className={`relative flex-shrink-0 rounded-full transition-transform hover:scale-105 duration-200 ${currentSize.circleClass}`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle border */}
          <circle cx="50" cy="50" r="47" stroke="#1E293B" strokeWidth="4.5" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="43.5" stroke="#CBD5E1" strokeWidth="1" fill="none" strokeDasharray="2 2" />

          {/* Curved text on circle path */}
          <defs>
            <path
              id={pathId}
              d="M 16,50 A 34,34 0 1,0 84,50 A 34,34 0 1,0 16,50"
            />
          </defs>
          <text fontSize="7.5" fontWeight="700" fill="#64748B" letterSpacing="0.8">
            <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
              VIGOROUS TELEMARKETING
            </textPath>
          </text>

          {/* Diagonal telephone receiver */}
          <g transform="translate(18, 18) rotate(-15 30 30) scale(0.62)">
            <path
              d="M15.5 25C15.5 19 19.5 15 25.5 15C29 15 32 17.5 33 21L35.5 30C36 32 35 34 33 35.5L28.5 39C32 46 38 52 45 55.5L48.5 51C50 49 52 48 54 48.5L63 51C66.5 52 69 55 69 58.5C69 64.5 65 68.5 59 68.5C35 68.5 15.5 49 15.5 25Z"
              fill="#0F172A"
              stroke="#0F172A"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Gloss highlight on phone */}
            <path
              d="M26 19C23 19 20 21 19.5 25"
              stroke="#475569"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Red VTG Monogram */}
          <g>
            {/* V */}
            <text
              x="53"
              y="38"
              fill="#B91C1C"
              fontWeight="900"
              fontSize="22"
              fontFamily="Georgia, serif"
              style={{ filter: 'drop-shadow(0.5px 0.5px 0px #7F1D1D)' }}
            >
              V
            </text>
            {/* T */}
            <text
              x="69"
              y="48"
              fill="#B91C1C"
              fontWeight="900"
              fontSize="24"
              fontFamily="Georgia, serif"
              style={{ filter: 'drop-shadow(0.5px 0.5px 0px #7F1D1D)' }}
            >
              T
            </text>
            {/* G */}
            <text
              x="67"
              y="74"
              fill="#991B1B"
              fontWeight="900"
              fontSize="28"
              fontFamily="Georgia, serif"
              style={{ filter: 'drop-shadow(0.5px 0.5px 0px #7F1D1D)' }}
            >
              G
            </text>
          </g>
        </svg>
      </div>

      {/* Brand Text Lockup */}
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span
            className={`font-black tracking-wider uppercase ${currentSize.textTitle} text-[#B91C1C] drop-shadow-xs`}
            style={{ letterSpacing: '0.08em' }}
          >
            VIGOROUS
          </span>
          <span
            className={`font-bold tracking-widest uppercase ${currentSize.textSub} ${
              inverted ? 'text-slate-300' : 'text-slate-700'
            }`}
            style={{ letterSpacing: '0.22em' }}
          >
            TELEMARKETING GROUP
          </span>
        </div>
      )}
    </div>
  );
};
export default VTGLogo;
