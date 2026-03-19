import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={sizeClasses[size]}>
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00B4D8"/>
              <stop offset="100%" stopColor="#00F5A0"/>
            </linearGradient>
            <clipPath id="gearClip">
              <rect x="0" y="0" width="400" height="400"/>
            </clipPath>
          </defs>
          
          {/* Dark background */}
          <rect width="400" height="400" rx="40" fill="#0D1117"/>
          
          <g transform="translate(200,200)">
            {/* Gear/Cog shape */}
            <g fill="url(#grad)">
              {/* Gear teeth - 8 teeth */}
              <rect x="-14" y="-120" width="28" height="30" rx="4"/>
              <rect x="-14" y="90" width="28" height="30" rx="4"/>
              <rect x="90" y="-14" width="30" height="28" rx="4"/>
              <rect x="-120" y="-14" width="30" height="28" rx="4"/>
              
              <rect x="58" y="-102" width="28" height="30" rx="4" transform="rotate(45 72 -87)"/>
              <rect x="-86" y="72" width="28" height="30" rx="4" transform="rotate(45 -72 87)"/>
              <rect x="58" y="72" width="28" height="30" rx="4" transform="rotate(-45 72 87)"/>
              <rect x="-86" y="-102" width="28" height="30" rx="4" transform="rotate(-45 -72 -87)"/>
              
              {/* Gear outer ring */}
              <circle cx="0" cy="0" r="95" fill="none" stroke="url(#grad)" strokeWidth="22"/>
              
              {/* Gear inner cutout */}
              <circle cx="0" cy="0" r="84" fill="#0D1117"/>
              <circle cx="0" cy="0" r="62" fill="none" stroke="url(#grad)" strokeWidth="3"/>
            </g>
            
            {/* Rocket integrated into the center */}
            <g fill="url(#grad)">
              {/* Rocket body - pointed top, streamlined */}
              <path d="M0,-72 C8,-72 18,-50 20,-20 L20,30 C20,36 12,42 0,42 C-12,42 -20,36 -20,30 L-20,-20 C-18,-50 -8,-72 0,-72 Z" fill="url(#grad)"/>
              
              {/* Rocket nose cone highlight */}
              <path d="M0,-72 C4,-72 10,-55 12,-35 L0,-40 L-12,-35 C-10,-55 -4,-72 0,-72 Z" fill="#0D1117" opacity="0.3"/>
              
              {/* Window/porthole */}
              <circle cx="0" cy="-8" r="8" fill="#0D1117"/>
              <circle cx="0" cy="-8" r="5.5" fill="url(#grad)" opacity="0.5"/>
              
              {/* Left fin */}
              <path d="M-20,18 L-38,50 L-38,38 L-20,30 Z" fill="url(#grad)"/>
              
              {/* Right fin */}
              <path d="M20,18 L38,50 L38,38 L20,30 Z" fill="url(#grad)"/>
              
              {/* Rocket exhaust/flame */}
              <path d="M-12,42 L-8,58 L0,50 L8,58 L12,42" fill="none" stroke="url(#grad)" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M-6,50 L-3,62 L0,56 L3,62 L6,50" fill="none" stroke="url(#grad)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6"/>
              
              {/* Body detail lines */}
              <line x1="-16" y1="20" x2="16" y2="20" stroke="#0D1117" strokeWidth="1.5" opacity="0.4"/>
              <line x1="-18" y1="28" x2="18" y2="28" stroke="#0D1117" strokeWidth="1.5" opacity="0.4"/>
            </g>
          </g>
        </svg>
      </div>
      {showText && (
        <span className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          StartupOps
        </span>
      )}
    </div>
  );
};
