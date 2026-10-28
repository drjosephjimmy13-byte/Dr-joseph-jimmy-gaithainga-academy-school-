import React from 'react';
import { useSchool } from '../../context/SchoolContext';

interface SchoolLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
  subtextColor?: string;
  overrideLogoUrl?: string | null;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  size = 'md',
  showText = true,
  textColor = 'text-slate-900',
  subtextColor = 'text-slate-500',
  overrideLogoUrl
}) => {
  let contextLogoUrl: string | null = null;
  try {
    const school = useSchool();
    contextLogoUrl = school.customLogoUrl;
  } catch {
    contextLogoUrl = null;
  }

  const activeLogoUrl = overrideLogoUrl !== undefined ? overrideLogoUrl : contextLogoUrl;

  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm font-bold',
    lg: 'text-lg font-bold',
    xl: 'text-xl font-bold'
  };

  return (
    <div className="flex items-center gap-3">
      {/* Academy Crest Emblem / Custom Logo */}
      <div className={`relative ${sizeMap[size]} shrink-0 rounded-full bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 p-1 shadow-md ring-2 ring-amber-400/80 flex items-center justify-center text-amber-300 overflow-hidden`}>
        {activeLogoUrl ? (
          <img
            src={activeLogoUrl}
            alt="DR JOSEPH JIMMY GAITHAINGA ACADEMY SCHOOL Logo"
            className="w-full h-full object-contain rounded-full bg-white/10"
            onError={(e) => {
              // fallback if invalid URL
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ) : (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
          {/* Outer circle gold border */}
          <circle cx="50" cy="50" r="46" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 2" opacity="0.7" />
          <circle cx="50" cy="50" r="41" stroke="#fbbf24" strokeWidth="1.5" />
          
          {/* Shield outline */}
          <path
            d="M50 14 C65 14, 76 20, 76 34 C76 60, 50 78, 50 82 C50 78, 24 60, 24 34 C24 20, 35 14, 50 14 Z"
            fill="#1e3a8a"
            stroke="#f59e0b"
            strokeWidth="2"
          />

          {/* Open Book in lower shield */}
          <path
            d="M50 56 C44 51, 33 50, 28 54 L28 66 C34 62, 44 63, 50 68 C56 63, 66 62, 72 66 L72 54 C67 50, 56 51, 50 56 Z"
            fill="#ffffff"
            stroke="#d97706"
            strokeWidth="1.2"
          />
          <line x1="50" y1="56" x2="50" y2="68" stroke="#d97706" strokeWidth="1.2" />

          {/* Torch of Knowledge */}
          <path
            d="M48 40 L52 40 L51 53 L49 53 Z"
            fill="#f59e0b"
          />
          <path
            d="M46 39 C46 39, 48 34, 50 31 C52 34, 54 39, 54 39 Z"
            fill="#ef4444"
          />
          <circle cx="50" cy="33" r="2.5" fill="#facc15" />

          {/* Golden Stars for Excellence */}
          <polygon points="50,19 51.5,23 55,23 52,25.5 53,29 50,27 47,29 48,25.5 45,23 48.5,23" fill="#fbbf24" />

          {/* Laurel Branch accents */}
          <path d="M22 42 C18 50, 21 62, 28 70" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M78 42 C82 50, 79 62, 72 70" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </div>

      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`font-serif tracking-tight text-blue-950 uppercase ${textSizes[size]} leading-none`}>
            DR JOSEPH JIMMY GAITHAINGA
          </span>
          <span className="text-[11px] font-bold tracking-widest text-amber-700 uppercase mt-0.5">
            ACADEMY SCHOOL
          </span>
          <span className={`text-[10px] hidden sm:block italic ${subtextColor}`}>
            Knowledge &bull; Character &bull; Excellence
          </span>
        </div>
      )}
    </div>
  );
};
