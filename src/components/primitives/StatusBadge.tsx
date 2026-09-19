import React from 'react';

interface StatusBadgeProps {
  status: string;
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, className = '' }) => {
  const normalized = status.toLowerCase().replace(/_/g, ' ');
  const displayLabel = label || normalized.charAt(0).toUpperCase() + normalized.slice(1);

  let style = 'bg-[var(--color-paper-200)] text-[var(--color-ink-700)] border-[var(--color-paper-200)]';

  switch (status.toLowerCase()) {
    case 'published':
    case 'open':
    case 'active':
    case 'accepted':
    case 'enrolled':
    case 'graded':
    case 'succeeded':
    case 'registered':
      style = 'bg-[var(--color-accent-green-100)] text-[var(--color-accent-green-700)] border-[var(--color-accent-green-400)]';
      break;

    case 'closing_soon':
    case 'closing soon':
    case 'under_review':
    case 'under review':
    case 'submitted':
    case 'pending':
    case 'waitlist':
    case 'waitlisted':
    case 'in_progress':
      style = 'bg-[var(--color-status-warning-100)] text-[var(--color-status-warning-700)] border-[var(--color-status-warning-700)]/30';
      break;

    case 'cancelled':
    case 'declined':
    case 'failed':
    case 'withdrawn':
    case 'closed':
    case 'late':
    case 'missed':
      style = 'bg-[var(--color-status-danger-100)] text-[var(--color-status-danger-700)] border-[var(--color-status-danger-700)]/30';
      break;

    case 'draft':
    case 'archived':
    case 'not_started':
    default:
      style = 'bg-[var(--color-paper-100)] text-[var(--color-ink-500)] border-[var(--color-paper-200)]';
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold tracking-wide border rounded-[2px] uppercase ${style} ${className}`}
    >
      {displayLabel}
    </span>
  );
};
