/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SunloLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SunloLogo: React.FC<SunloLogoProps> = ({
  className = '',
  showWordmark = true,
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Sunlo sunburst icon matching the screenshot */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center shrink-0 rounded-full bg-[#234238] text-[#F7F5EE] p-1.5`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-[#F7F5EE]"
        >
          {/* Center core */}
          <circle cx="12" cy="12" r="3.2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" />
          {/* 8 Radiating gentle sun rays */}
          <line x1="12" y1="2.5" x2="12" y2="4.5" />
          <line x1="12" y1="19.5" x2="12" y2="21.5" />
          <line x1="2.5" y1="12" x2="4.5" y2="12" />
          <line x1="19.5" y1="12" x2="21.5" y2="12" />
          <line x1="5.3" y1="5.3" x2="6.8" y2="6.8" />
          <line x1="17.2" y1="17.2" x2="18.7" y2="18.7" />
          <line x1="5.3" y1="18.7" x2="6.8" y2="17.2" />
          <line x1="17.2" y1="6.8" x2="18.7" y2="5.3" />
        </svg>
      </div>

      {showWordmark && (
        <span
          className={`font-semibold tracking-tight text-[#234238] lowercase ${textSizes[size]} whitespace-nowrap`}
        >
          sunlo
        </span>
      )}
    </div>
  );
};

