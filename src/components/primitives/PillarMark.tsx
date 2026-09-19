// Custom SVG Marks for the Four Pillars (currentColor only, no gradients)
import React from 'react';
import { PillarId } from '../../domain/types';

interface PillarMarkProps {
  pillar: PillarId;
  className?: string;
  size?: number;
}

export const PillarMark: React.FC<PillarMarkProps> = ({ pillar, className = '', size = 24 }) => {
  switch (pillar) {
    case 'purpose':
      // Compass rose reduced to a single rising needle
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
          <polygon points="12,4 14.5,12 12,10 9.5,12" fill="currentColor" />
          <polygon points="12,20 14.5,12 12,14 9.5,12" fill="none" />
        </svg>
      );

    case 'leadership':
      // Rising stepped line representing progress & elevation
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M3 20H21" strokeWidth="1.5" />
          <path d="M4 17L9 12L13 15L20 6" />
          <polyline points="15 6 20 6 20 11" />
        </svg>
      );

    case 'business':
      // Stacked solid blocks representing enterprise and value structure
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <rect x="3" y="14" width="18" height="6" rx="1" strokeWidth="1.5" />
          <rect x="6" y="8" width="12" height="6" rx="1" strokeWidth="1.5" />
          <rect x="9" y="3" width="6" height="5" rx="1" strokeWidth="1.5" />
        </svg>
      );

    case 'impact':
      // Concentric expanding ripple arcs representing outward transformation
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <path d="M5.5 12C5.5 8.4 8.4 5.5 12 5.5" />
          <path d="M18.5 12C18.5 15.6 15.6 18.5 12 18.5" />
          <path d="M2.5 12C2.5 6.7 6.7 2.5 12 2.5" />
          <path d="M21.5 12C21.5 17.3 17.3 21.5 12 21.5" />
        </svg>
      );

    default:
      return null;
  }
};
