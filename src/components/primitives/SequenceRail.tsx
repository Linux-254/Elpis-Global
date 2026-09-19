import React from 'react';

export interface SequenceStep {
  order: number;
  label: string;
  body: string;
}

interface SequenceRailProps {
  steps: SequenceStep[];
  title?: string;
  className?: string;
  dark?: boolean;
}

export const SequenceRail: React.FC<SequenceRailProps> = ({
  steps,
  title,
  className = '',
  dark = false
}) => {
  return (
    <div className={`py-6 ${className}`}>
      {title && (
        <h3
          className={`font-display text-2xl mb-8 ${
            dark ? 'text-[var(--color-paper-50)]' : 'text-[var(--color-ink-900)]'
          }`}
        >
          {title}
        </h3>
      )}

      {/* Grid on desktop, snap carousel on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <div
              key={step.order}
              className={`relative p-6 sm:p-7 border border-[var(--color-paper-200)] ${
                dark
                  ? 'bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] border-white/10'
                  : 'bg-[var(--color-paper-50)] text-[var(--color-ink-900)]'
              }`}
            >
              {/* Hanging Display Numeral */}
              <div
                className="font-display text-4xl sm:text-5xl font-light leading-none mb-4 text-[var(--color-accent-gold-600)]"
                aria-hidden="true"
              >
                0{step.order}
              </div>

              <h4 className="font-display text-xl font-medium mb-2 tracking-tight">
                {step.label}
              </h4>
              <p
                className={`text-sm leading-relaxed ${
                  dark ? 'text-[var(--color-paper-100)] opacity-90' : 'text-[var(--color-ink-700)]'
                }`}
              >
                {step.body}
              </p>

              {/* Connecting arrow for steps 1-3 on desktop */}
              {!isLast && (
                <div
                  className="hidden lg:flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-full text-[var(--color-ink-700)] z-10 text-xs"
                  aria-hidden="true"
                >
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
