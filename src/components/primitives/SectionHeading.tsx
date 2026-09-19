import React from 'react';
import { PillarId } from '../../domain/types';

interface SectionHeadingProps {
  title: string;
  standfirst?: string;
  accent?: PillarId | 'gold' | 'none';
  align?: 'start' | 'center';
  className?: string;
  dark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  standfirst,
  accent = 'none',
  align = 'start',
  className = '',
  dark = false
}) => {
  const getAccentRule = () => {
    if (accent === 'none') return null;
    let colorClass = 'bg-[var(--color-accent-gold-600)]';
    if (dark) colorClass = 'bg-[var(--color-accent-gold-400)]';
    else if (accent === 'leadership') colorClass = 'bg-[var(--color-brand-blue-700)]';
    else if (accent === 'business') colorClass = 'bg-[var(--color-accent-green-700)]';
    else if (accent === 'impact') colorClass = 'bg-[var(--color-ink-900)]';

    return <div className={`w-12 h-[2px] mb-4 ${colorClass}`} aria-hidden="true" />;
  };

  return (
    <div className={`mb-8 sm:mb-12 ${align === 'center' ? 'text-center mx-auto' : ''} ${className}`}>
      {getAccentRule()}
      <h2
        className={`font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight leading-[1.12] ${
          dark ? 'text-[var(--color-paper-50)]' : 'text-[var(--color-ink-900)]'
        }`}
      >
        {title}
      </h2>
      {standfirst && (
        <p
          className={`mt-4 text-base sm:text-lg max-w-[65ch] font-light leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          } ${dark ? 'text-[var(--color-paper-100)] opacity-90' : 'text-[var(--color-ink-700)]'}`}
        >
          {standfirst}
        </p>
      )}
    </div>
  );
};
