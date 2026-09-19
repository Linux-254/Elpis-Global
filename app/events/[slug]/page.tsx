'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../src/components/primitives/Breadcrumbs';
import { StatusBadge } from '../../../src/components/primitives/StatusBadge';
import { dataStore } from '../../../src/data/store';
import { EventItem } from '../../../src/domain/types';
import { Calendar, Clock, MapPin, Download, CheckCircle2, User, Mail, Phone, ExternalLink } from 'lucide-react';

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const event = slug ? dataStore.getEventBySlug(slug) : null;
  const [showRegModal, setShowRegModal] = useState(false);
  const [regForm, setRegForm] = useState({ fullName: '', email: '', phone: '', organisation: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  if (!slug) return null;
  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="font-display text-2xl text-[var(--color-ink-900)] mb-2">Event Not Found</h1>
            <p className="text-xs text-[var(--color-ink-600)] mb-4">The event you requested is not listed in our schedule.</p>
            <Link href="/events" className="text-xs font-semibold text-[var(--color-brand-blue-700)] underline">
              Back to Events Schedule →
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const startDate = new Date(event.startsAt);
  const endDate = new Date(event.endsAt);

  const formattedDate = startDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const startTime = startDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const endTime = endDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  // Generate .ics file download
  const handleDownloadIcs = () => {
    const formatDateIcs = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const locationText = event.locationName || 'Kampala Campus & Virtual Stream';
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Zoe Elpis Global School//NONSGML Events//EN
BEGIN:VEVENT
UID:${event.id}@zegs.ac.ug
DTSTAMP:${formatDateIcs(new Date())}
DTSTART:${formatDateIcs(startDate)}
DTEND:${formatDateIcs(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.summary}
LOCATION:${locationText}
URL:https://zegs.ac.ug/events/${event.slug}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.slug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Google Calendar link
  const locationText = event.locationName || 'Kampala Campus & Virtual Stream';
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${
    endDate.toISOString().replace(/[-:]/g, '').split('.')[0]
  }Z&details=${encodeURIComponent(event.summary)}&location=${encodeURIComponent(locationText)}`;

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.fullName || !regForm.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      dataStore.registerForEvent(event.id, {
        fullName: regForm.fullName,
        email: regForm.email,
        phone: regForm.phone,
        deliveryPreference: event.deliveryMode === 'online' ? 'online' : event.deliveryMode === 'blended' ? 'blended' : 'physical'
      });
      setIsSubmitting(false);
      setRegSuccess(true);
    }, 400);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Events', href: '/events' }, { label: event.title }]} />
          </div>
        </div>

        <section className="py-12 sm:py-20 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3">
                  <StatusBadge status={event.registrationStatus} />
                  <span className="text-xs font-semibold text-[var(--color-accent-gold-600)] uppercase tracking-wider">
                    {event.category} • {event.deliveryMode}
                  </span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl text-[var(--color-ink-900)] leading-tight">
                  {event.title}
                </h1>

                <p className="font-display text-xl text-[var(--color-ink-700)] font-light leading-relaxed">
                  {event.summary}
                </p>

                {/* Event Schedule Matrix */}
                <div className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[var(--color-ink-500)] block mb-1">Date & Time</span>
                    <span className="font-semibold text-[var(--color-ink-900)] block">{formattedDate}</span>
                    <span className="text-[var(--color-ink-600)]">{startTime} – {endTime} EAT</span>
                  </div>
                  <div>
                    <span className="text-[var(--color-ink-500)] block mb-1">Location / Platform</span>
                    <span className="font-semibold text-[var(--color-ink-900)] block">
                      {event.locationName || 'Kampala Campus & Virtual Stream'}
                    </span>
                    <span className="text-[var(--color-ink-600)]">Mode: {event.deliveryMode}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {event.registrationStatus === 'open' && (
                    <button
                      onClick={() => setShowRegModal(true)}
                      className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
                    >
                      Register Free Attendance
                    </button>
                  )}

                  <button
                    onClick={handleDownloadIcs}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold border border-[var(--color-ink-900)] text-[var(--color-ink-900)] hover:bg-[var(--color-paper-200)] rounded-[2px] transition-colors"
                  >
                    <Download size={14} />
                    <span>Add to Calendar (.ICS)</span>
                  </button>

                  <a
                    href={googleCalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[var(--color-brand-blue-700)] hover:underline"
                  >
                    <span>Google Calendar</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                {/* Narrative content */}
                <div className="pt-8 border-t border-[var(--color-paper-200)] space-y-4 text-sm text-[var(--color-ink-900)] leading-relaxed">
                  <h3 className="font-display text-2xl text-[var(--color-ink-900)]">About This Masterclass</h3>
                  <p>{event.description}</p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] space-y-4">
                  <h3 className="font-display text-lg text-[var(--color-ink-900)]">Session Details</h3>
                  <div className="space-y-3 text-xs text-[var(--color-ink-700)]">
                    <div className="flex justify-between py-2 border-b border-[var(--color-paper-200)]">
                      <span className="text-[var(--color-ink-500)]">Capacity</span>
                      <span className="font-semibold">{event.capacity ? `${event.capacity} seats` : 'Open Broadcast'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[var(--color-paper-200)]">
                      <span className="text-[var(--color-ink-500)]">Cost</span>
                      <span className="font-semibold text-[var(--color-accent-green-700)]">Free (Public Lecture)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-[var(--color-ink-500)]">Certificate</span>
                      <span className="font-semibold">Certificate of Attendance</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] space-y-2">
                  <h4 className="font-display text-base text-[var(--color-ink-900)]">Host an Institutional Workshop</h4>
                  <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                    ZEGS delivers custom corporate masterclasses and governance retreats on-site for companies and non-profits.
                  </p>
                  <a
                    href="mailto:events@zegs.ac.ug"
                    className="text-xs font-semibold text-[var(--color-brand-blue-700)] hover:underline block pt-2"
                  >
                    Inquire for your organisation →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Modal */}
        {showRegModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
              {regSuccess ? (
                <div className="text-center space-y-4 py-4">
                  <CheckCircle2 size={48} className="text-[var(--color-accent-green-700)] mx-auto" />
                  <h3 className="font-display text-2xl text-[var(--color-ink-900)]">Registration Confirmed</h3>
                  <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                    Thank you, {regForm.fullName}. We have reserved your place for <strong>{event.title}</strong>. A calendar invite and session access link have been sent to <strong>{regForm.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setShowRegModal(false);
                      setRegSuccess(false);
                    }}
                    className="px-6 py-2.5 bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] text-xs font-semibold rounded-[2px]"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--color-paper-200)]">
                    <h3 className="font-display text-xl text-[var(--color-ink-900)]">Register for Masterclass</h3>
                    <button
                      onClick={() => setShowRegModal(false)}
                      className="text-xs font-mono text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <form onSubmit={handleSubmitRegistration} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={regForm.fullName}
                        onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                        placeholder="e.g. Christine Nakato"
                        className="w-full px-3 py-2 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-700)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        placeholder="christine@example.com"
                        className="w-full px-3 py-2 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-700)]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={regForm.phone}
                          onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                          placeholder="+256 700 000000"
                          className="w-full px-3 py-2 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-700)]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                          Organisation / Role
                        </label>
                        <input
                          type="text"
                          value={regForm.organisation}
                          onChange={(e) => setRegForm({ ...regForm, organisation: e.target.value })}
                          placeholder="e.g. Founder, AgriTech"
                          className="w-full px-3 py-2 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-700)]"
                        />
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] text-xs font-bold uppercase tracking-wider rounded-[2px] hover:bg-[var(--color-brand-blue-700)] transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? 'Registering...' : 'Confirm Registration'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
