'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';
import { StatusBadge } from '../../src/components/primitives/StatusBadge';
import { dataStore } from '../../src/data/store';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

export default function EventsPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  const upcomingEvents = dataStore.getEvents('upcoming');
  const pastEvents = dataStore.getEvents('past');

  const displayedEvents = filter === 'all'
    ? [...upcomingEvents, ...pastEvents]
    : filter === 'upcoming'
    ? upcomingEvents
    : pastEvents;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Events & Masterclasses' }]} />
          </div>
        </div>

        <section className="py-12 sm:py-16 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-ink-900)] leading-tight mb-4">
                Masterclasses & Public Dialogues
              </h1>
              <p className="font-display text-lg sm:text-xl font-light text-[var(--color-ink-700)] leading-relaxed">
                Open masterclasses, policy roundtables, and public lectures exploring ethics, capital, leadership, and venture building.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[var(--color-paper-100)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            {/* Filter tab buttons */}
            <div className="flex items-center gap-3 mb-8 border-b border-[var(--color-paper-200)] pb-4">
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 text-xs font-semibold rounded-[2px] transition-colors ${
                  filter === 'upcoming'
                    ? 'bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)]'
                    : 'text-[var(--color-ink-700)] hover:bg-[var(--color-paper-200)]'
                }`}
              >
                Upcoming Events ({upcomingEvents.length})
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-4 py-2 text-xs font-semibold rounded-[2px] transition-colors ${
                  filter === 'past'
                    ? 'bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)]'
                    : 'text-[var(--color-ink-700)] hover:bg-[var(--color-paper-200)]'
                }`}
              >
                Past Archives ({pastEvents.length})
              </button>
            </div>

            {/* Event List (archetype I: Schedule Rail) */}
            <div className="divide-y divide-[var(--color-paper-200)] bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] p-6 sm:p-8 rounded-[2px]">
              {displayedEvents.map((event) => {
                const dateObj = new Date(event.startsAt);
                const day = dateObj.toLocaleDateString('en-GB', { day: '2-digit' });
                const month = dateObj.toLocaleDateString('en-GB', { month: 'short' });
                const time = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

                return (
                  <div key={event.id} className="py-7 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Date Gutter */}
                    <div className="flex items-center gap-4 md:w-44 shrink-0">
                      <div className="font-display text-4xl font-light text-[var(--color-brand-blue-900)] leading-none">
                        {day}
                      </div>
                      <div className="text-xs uppercase font-bold text-[var(--color-ink-500)] tracking-wider border-l border-[var(--color-paper-200)] pl-3">
                        {month}<br />
                        {dateObj.getFullYear()}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 text-xs">
                        <StatusBadge status={event.registrationStatus} />
                        <span className="text-[var(--color-ink-500)]">• {event.category}</span>
                        <span className="text-[var(--color-ink-500)]">• {time} EAT</span>
                      </div>
                      <h2 className="font-display text-xl sm:text-2xl text-[var(--color-ink-900)]">
                        <Link href={`/events/${event.slug}`} className="hover:text-[var(--color-brand-blue-700)] hover:underline">
                          {event.title}
                        </Link>
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--color-ink-700)] mt-1 max-w-[65ch]">
                        {event.summary}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[var(--color-ink-500)] mt-2">
                        <span>Venue: {event.locationName || 'Kampala Campus & Virtual Stream'}</span>
                        <span>• Mode: {event.deliveryMode}</span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="md:shrink-0 flex items-center gap-3">
                      <Link
                        href={`/events/${event.slug}`}
                        className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
                      >
                        {event.registrationStatus === 'open' ? 'Register' : 'View Details'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
