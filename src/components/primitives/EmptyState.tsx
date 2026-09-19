import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  heading: string;
  body: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ heading, body, action, className = '' }) => {
  return (
    <div
      className={`border border-dashed border-[var(--color-paper-200)] bg-[var(--color-paper-100)] p-8 sm:p-12 text-center rounded-[2px] ${className}`}
    >
      <h3 className="font-display text-xl sm:text-2xl text-[var(--color-ink-900)] mb-3">{heading}</h3>
      <p className="text-[var(--color-ink-700)] max-w-[55ch] mx-auto text-sm sm:text-base mb-6 leading-relaxed">
        {body}
      </p>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
};
