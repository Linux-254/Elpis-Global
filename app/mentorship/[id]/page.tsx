'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../src/components/primitives/Breadcrumbs';
import { dataStore } from '../../../src/data/store';
import { Mentor, MentorSocialLink } from '../../../src/domain/types';
import {
  Globe,
  Linkedin,
  ExternalLink,
  FileText,
  BookOpen,
  CheckCircle2,
  Share2,
  Calendar,
  Building,
  Award,
  ArrowLeft,
  Mail,
  UserCheck
} from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function MentorProfilePage({ params }: Props) {
  const resolvedParams = use(params);
  const mentorId = resolvedParams.id;
  const mentor = dataStore.getMentorById(mentorId) || dataStore.getMentors().find(m => m.id === mentorId);

  const [inquirySent, setInquirySent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (mentor && form.name && form.email) {
      dataStore.requestMentorship({
        mentorId: mentor.id,
        requesterName: form.name,
        requesterEmail: form.email,
        goal: form.message,
        format: 'virtual',
        frequency: 'bi-weekly'
      });
      setInquirySent(true);
    }
  };

  if (!mentor) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 max-w-[1320px] mx-auto px-4 sm:px-8 py-20 text-center">
          <h1 className="font-display text-3xl text-[var(--color-ink-900)] mb-4">Mentor Profile Not Found</h1>
          <p className="text-sm text-[var(--color-ink-600)] mb-6">
            The requested faculty advisory profile could not be located or may have moved.
          </p>
          <Link
            href="/mentorship"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] text-xs font-semibold rounded-[2px]"
          >
            <ArrowLeft size={14} />
            <span>Return to Mentorship Network</span>
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-paper-50)]">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        {/* Breadcrumbs */}
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs
              items={[
                { label: 'Mentorship Network', href: '/mentorship' },
                { label: mentor.fullName }
              ]}
            />
          </div>
        </div>

        {/* Mentor Header Profile Section */}
        <section className="py-12 sm:py-16 bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
              {/* Portrait */}
              <div className="w-full md:w-72 lg:w-80 shrink-0 aspect-[4/5] bg-[var(--color-paper-200)] border border-[var(--color-paper-300)] rounded-[2px] overflow-hidden shadow-xs">
                <img
                  src={mentor.photoUrl}
                  alt={mentor.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bio & Details */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-[var(--color-accent-gold-600)] uppercase tracking-wider">
                    {mentor.organisation}
                  </span>
                  <span className="text-[var(--color-ink-300)]">•</span>
                  <span className="text-xs text-[var(--color-ink-600)] font-medium">
                    ZEGS Advisory Faculty
                  </span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink-900)] mb-2">
                  {mentor.fullName}
                </h1>

                <p className="text-base sm:text-lg text-[var(--color-brand-blue-800)] font-medium mb-5">
                  {mentor.role}
                </p>

                {/* Social Media & Online Presence Bar */}
                <div className="mb-6 p-4 bg-white border border-[var(--color-paper-200)] rounded-[2px] shadow-xs">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-ink-500)] mb-3 flex items-center gap-1.5">
                    <Share2 size={13} className="text-[var(--color-brand-blue-800)]" />
                    <span>Verified Professional Presence</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {mentor.linkedinUrl ? (
                      <a
                        href={mentor.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold rounded-[2px] transition-colors"
                      >
                        <Linkedin size={14} />
                        <span>View LinkedIn Profile</span>
                        <ExternalLink size={12} className="opacity-80" />
                      </a>
                    ) : (
                      <span className="text-xs text-[var(--color-ink-400)] italic">
                        No LinkedIn URL specified
                      </span>
                    )}

                    {mentor.websiteUrl && (
                      <a
                        href={mentor.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[var(--color-paper-100)] text-[var(--color-ink-900)] border border-[var(--color-paper-300)] text-xs font-semibold rounded-[2px] transition-colors"
                      >
                        <Globe size={14} className="text-[var(--color-accent-gold-600)]" />
                        <span>Personal Website / Portfolio</span>
                        <ExternalLink size={12} className="text-[var(--color-ink-400)]" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Expertise Badges */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-[var(--color-ink-800)] uppercase tracking-wider">
                    Core Focus & Advisory Domains
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((exp, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white border border-[var(--color-paper-300)] text-[var(--color-ink-800)] px-3 py-1 rounded-[2px] font-medium"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Columns: Left (Bio & Articles), Right (Advisory Consultation Form) */}
        <section className="py-16">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Biography & Featured Articles */}
              <div className="lg:col-span-7 space-y-10">
                {/* Biography */}
                <div className="bg-white border border-[var(--color-paper-200)] p-6 sm:p-8 rounded-[2px]">
                  <h2 className="font-display text-2xl text-[var(--color-ink-900)] mb-4 pb-3 border-b border-[var(--color-paper-200)] flex items-center gap-2">
                    <UserCheck size={20} className="text-[var(--color-brand-blue-800)]" />
                    <span>Academic & Executive Background</span>
                  </h2>
                  <p className="text-sm sm:text-base text-[var(--color-ink-700)] leading-relaxed whitespace-pre-line">
                    {mentor.biography}
                  </p>
                </div>

                {/* Social Media Presence: LinkedIn Articles & Publications */}
                <div className="bg-white border border-[var(--color-paper-200)] p-6 sm:p-8 rounded-[2px]">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--color-paper-200)]">
                    <div>
                      <h2 className="font-display text-2xl text-[var(--color-ink-900)] flex items-center gap-2">
                        <FileText size={20} className="text-[var(--color-brand-blue-800)]" />
                        <span>LinkedIn Articles & Publications</span>
                      </h2>
                      <p className="text-xs text-[var(--color-ink-500)] mt-1">
                        Essays, Pulse articles, and commentary authored by {mentor.fullName}.
                      </p>
                    </div>
                    {mentor.socialLinks && mentor.socialLinks.length > 0 && (
                      <span className="px-2.5 py-1 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] text-[var(--color-brand-blue-900)] text-xs font-bold rounded">
                        {mentor.socialLinks.length} {mentor.socialLinks.length === 1 ? 'Link' : 'Links'}
                      </span>
                    )}
                  </div>

                  {(!mentor.socialLinks || mentor.socialLinks.length === 0) ? (
                    <div className="p-8 bg-[var(--color-paper-50)] border border-dashed border-[var(--color-paper-200)] rounded text-center">
                      <BookOpen size={28} className="mx-auto text-[var(--color-ink-400)] mb-2" />
                      <p className="text-xs text-[var(--color-ink-600)] font-medium">
                        No specific LinkedIn articles or publications have been linked for this mentor yet.
                      </p>
                      {mentor.linkedinUrl && (
                        <a
                          href={mentor.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#0A66C2] font-semibold hover:underline mt-2"
                        >
                          <span>Visit their LinkedIn profile to view recent activity</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {mentor.socialLinks.map((link: MentorSocialLink, idx: number) => {
                        const isLinkedIn = link.type === 'linkedin_article' || link.type === 'linkedin_profile' || link.url.includes('linkedin.com');
                        return (
                          <div
                            key={link.id || idx}
                            className="p-4 bg-[var(--color-paper-50)] hover:bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {isLinkedIn ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#0A66C2] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                    <Linkedin size={11} />
                                    <span>LinkedIn Article</span>
                                  </span>
                                ) : link.type === 'website' ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                    <Globe size={11} />
                                    <span>Personal Website</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-700)] bg-[var(--color-paper-200)] px-2 py-0.5 rounded">
                                    <FileText size={11} />
                                    <span>Publication</span>
                                  </span>
                                )}
                              </div>

                              <h3 className="font-display font-semibold text-sm sm:text-base text-[var(--color-ink-900)]">
                                {link.title}
                              </h3>
                              <p className="text-[11px] text-[var(--color-ink-500)] truncate mt-0.5 font-mono">
                                {link.url}
                              </p>
                            </div>

                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[var(--color-paper-200)] text-[var(--color-brand-blue-900)] border border-[var(--color-paper-300)] text-xs font-semibold rounded-[2px] transition-colors shrink-0"
                            >
                              <span>Read Article</span>
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Advisory Consultation Form */}
              <div className="lg:col-span-5">
                <div className="bg-white border border-[var(--color-paper-200)] p-6 sm:p-8 rounded-[2px] sticky top-8 shadow-xs">
                  {inquirySent ? (
                    <div className="text-center py-8 space-y-4">
                      <CheckCircle2 size={44} className="text-[var(--color-accent-green-700)] mx-auto" />
                      <h3 className="font-display text-2xl text-[var(--color-ink-900)]">Inquiry Received</h3>
                      <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                        Thank you, {form.name}. Your advisory consultation request for <strong>{mentor.fullName}</strong> has been transmitted to our Academic Registry. We will confirm dates at {form.email}.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setInquirySent(false);
                          setForm({ name: '', email: '', message: '' });
                        }}
                        className="px-5 py-2 bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] text-xs font-semibold rounded-[2px]"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-6 pb-4 border-b border-[var(--color-paper-200)]">
                        <h2 className="font-display text-xl text-[var(--color-ink-900)] mb-1">
                          Request Advisory Consultation
                        </h2>
                        <p className="text-xs text-[var(--color-ink-600)]">
                          Schedule a direct 1-on-1 strategic review with {mentor.fullName}.
                        </p>
                      </div>

                      <form onSubmit={handleSendInquiry} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="e.g. Tendai Mbeki"
                            className="w-full px-3 py-2 text-xs bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="tendai@enterprise.co.zw"
                            className="w-full px-3 py-2 text-xs bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                            Venture Overview & Specific Questions *
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="Outline your enterprise, key milestones, and the specific advisory questions you would like to address..."
                            className="w-full px-3 py-2 text-xs bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-[var(--color-paper-50)] text-xs font-bold uppercase tracking-wider rounded-[2px] transition-colors"
                        >
                          Submit Advisory Request
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
