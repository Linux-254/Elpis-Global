'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';
import { SectionHeading } from '../../src/components/primitives/SectionHeading';
import { dataStore } from '../../src/data/store';
import { Mentor } from '../../src/domain/types';
import { CheckCircle2, User, Mail, MessageSquare } from 'lucide-react';

export default function MentorshipPage() {
  const mentors = dataStore.getMentors();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMentor && form.name && form.email) {
      dataStore.requestMentorship({
        mentorId: selectedMentor.id,
        requesterName: form.name,
        requesterEmail: form.email,
        goal: form.message,
        format: 'virtual',
        frequency: 'bi-weekly'
      });
    }
    setInquirySent(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Mentorship Network' }]} />
          </div>
        </div>

        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink-900)] leading-tight mb-4">
                The ZEGS Mentorship Network
              </h1>
              <p className="font-display text-xl sm:text-2xl font-light text-[var(--color-ink-700)] leading-relaxed">
                Practitioner guidance that bridges the gap between conceptual frameworks and operational reality.
              </p>
            </div>
          </div>
        </section>

        {/* What Mentorship Means */}
        <section className="py-20 bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <SectionHeading
              title="How Mentorship Works at ZEGS"
              standfirst="Every enrolled fellow in our certificate, advanced, and fellowship tracks is paired with a verified sector leader."
              accent="gold"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                <div className="text-xs font-mono text-[var(--color-ink-500)]">STAGE 01</div>
                <h3 className="font-display text-2xl text-[var(--color-ink-900)]">Diagnostic Pairing</h3>
                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                  During week two, our academic council analyzes your venture sector and pairs you with a mentor with relevant domain expertise.
                </p>
              </div>

              <div className="p-8 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                <div className="text-xs font-mono text-[var(--color-ink-500)]">STAGE 02</div>
                <h3 className="font-display text-2xl text-[var(--color-ink-900)]">Bi-Weekly Review</h3>
                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                  Scheduled 1-on-1 strategic consultations focusing on financial models, go-to-market testing, and ethical governance audits.
                </p>
              </div>

              <div className="p-8 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                <div className="text-xs font-mono text-[var(--color-ink-500)]">STAGE 03</div>
                <h3 className="font-display text-2xl text-[var(--color-ink-900)]">Jury Sponsorship</h3>
                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                  Mentors endorse your capstone project before the defense jury and provide ongoing advisory support post-graduation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Directory */}
        <section className="py-20 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)] mb-12 pb-4 border-b border-[var(--color-paper-200)]">
              Lead Mentors & Advisory Fellows
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentors.map((m) => (
                <div key={m.id} className="bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] overflow-hidden flex flex-col justify-between">
                  <div className="aspect-[4/3] bg-[var(--color-paper-200)] overflow-hidden">
                    <img src={m.photoUrl} alt={m.fullName} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[var(--color-accent-gold-600)] uppercase tracking-wider mb-1">
                        {m.organisation}
                      </div>
                      <h3 className="font-display text-2xl text-[var(--color-ink-900)] mb-1">
                        {m.fullName}
                      </h3>
                      <p className="text-xs font-medium text-[var(--color-brand-blue-700)] mb-3">
                        {m.role}
                      </p>
                      <p className="text-xs text-[var(--color-ink-700)] leading-relaxed mb-4">
                        {m.biography}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--color-paper-200)]">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {m.expertise.map((exp, i) => (
                          <span key={i} className="text-[10px] bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] text-[var(--color-ink-700)] px-2 py-0.5 rounded-[2px]">
                            {exp}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setSelectedMentor(m);
                          setInquirySent(false);
                        }}
                        className="w-full py-2 text-center text-xs font-semibold bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
                      >
                        Request Advisory Consultation
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal for consultation */}
        {selectedMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] p-6 sm:p-8 max-w-lg w-full shadow-2xl">
              {inquirySent ? (
                <div className="text-center space-y-4 py-4">
                  <CheckCircle2 size={48} className="text-[var(--color-accent-green-700)] mx-auto" />
                  <h3 className="font-display text-2xl text-[var(--color-ink-900)]">Inquiry Received</h3>
                  <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                    Thank you, {form.name}. Your advisory consultation request for <strong>{selectedMentor.fullName}</strong> has been logged with our Academic Office. We will review availability and contact you at {form.email}.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedMentor(null);
                      setInquirySent(false);
                    }}
                    className="px-6 py-2.5 bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] text-xs font-semibold rounded-[2px]"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--color-paper-200)]">
                    <h3 className="font-display text-xl text-[var(--color-ink-900)]">
                      Advisory Request • {selectedMentor.fullName}
                    </h3>
                    <button onClick={() => setSelectedMentor(null)} className="text-xs font-mono">✕ Close</button>
                  </div>

                  <form onSubmit={handleSendInquiry} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">Advisory Need / Project Overview *</label>
                      <textarea
                        required
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Briefly describe your venture and specific questions for this mentor..."
                        className="w-full px-3 py-2 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] text-xs font-bold uppercase tracking-wider rounded-[2px]"
                    >
                      Submit Advisory Request
                    </button>
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
