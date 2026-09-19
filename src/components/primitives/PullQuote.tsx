import React from 'react';

interface PullQuoteProps {
  quote: string;
  attribution?: string;
  className?: string;
}

export const PullQuote: React.FC<PullQuoteProps> = ({ quote, attribution, className = '' }) => {
  // If attribution is missing, do not render per spec rule
  if (!attribution) return null;

  return (
    <figure
      className={`my-10 p-8 sm:p-12 bg-[var(--color-paper-100)] border-l-2 border-[var(--color-accent-gold-600)] relative ${className}`}
    >
      <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-6" aria-hidden="true" />
      <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-light italic leading-snug text-[var(--color-ink-900)] mb-6 max-w-[65ch]">
        “{quote}”
      </blockquote>
      <figcaption className="text-sm font-semibold tracking-wider text-[var(--color-ink-700)] uppercase">
        — {attribution}
      </figcaption>
    </figure>
  );
};
