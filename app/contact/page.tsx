'use client';

import React, { useState } from 'react';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';
import { BRAND_STRINGS } from '../../src/content/strings';
import { Mail, Phone, MapPin, Clock, CheckCircle2, MessageSquare, Building2, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: 'Admissions Office',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        {/* Breadcrumb */}
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Contact & Campus' }]} />
          </div>
        </div>

        {/* Hero */}
        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink-900)] leading-tight mb-4">
                Connect with Zoe Elpis Global School
              </h1>
              <p className="font-display text-xl sm:text-2xl font-light text-[var(--color-ink-700)] leading-relaxed">
                Whether you have questions about admissions, institutional partnerships, or campus visits, our team responds within 24 business hours.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Matrix + Form */}
        <section className="py-20 bg-[var(--color-paper-100)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Campus Details */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] p-8 rounded-[2px] space-y-6">
                  <h2 className="font-display text-2xl text-[var(--color-ink-900)]">Campus Headquarters</h2>

                  <div className="space-y-4 text-xs sm:text-sm text-[var(--color-ink-700)]">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-[var(--color-brand-blue-700)] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[var(--color-ink-900)] block">Physical Address</strong>
                        Plot 14, Clement Hill Road, Nakasero<br />
                        Kampala, Uganda
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-[var(--color-brand-blue-700)] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[var(--color-ink-900)] block">Telephone / WhatsApp</strong>
                        +256 414 123 456 / +256 700 890 123
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-[var(--color-brand-blue-700)] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[var(--color-ink-900)] block">Office Hours</strong>
                        Monday – Friday: 08:30 – 17:30 EAT<br />
                        Saturday: 09:00 – 13:00 EAT (By Appointment)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Departmental Inboxes */}
                <div className="bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] p-8 rounded-[2px] space-y-4 text-xs">
                  <h3 className="font-display text-lg text-[var(--color-ink-900)]">Departmental Inboxes</h3>
                  <div className="space-y-2.5 text-[var(--color-ink-700)]">
                    <div className="flex justify-between py-1.5 border-b border-[var(--color-paper-200)]">
                      <span>Admissions & Enrollment</span>
                      <a href="mailto:admissions@zegs.ac.ug" className="font-mono text-[var(--color-brand-blue-700)] hover:underline">
                        admissions@zegs.ac.ug
                      </a>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[var(--color-paper-200)]">
                      <span>Academic Registrar</span>
                      <a href="mailto:registrar@zegs.ac.ug" className="font-mono text-[var(--color-brand-blue-700)] hover:underline">
                        registrar@zegs.ac.ug
                      </a>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[var(--color-paper-200)]">
                      <span>Executive Education</span>
                      <a href="mailto:executive@zegs.ac.ug" className="font-mono text-[var(--color-brand-blue-700)] hover:underline">
                        executive@zegs.ac.ug
                      </a>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span>Media & Partnerships</span>
                      <a href="mailto:partnerships@zegs.ac.ug" className="font-mono text-[var(--color-brand-blue-700)] hover:underline">
                        partnerships@zegs.ac.ug
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] p-8 sm:p-10 rounded-[2px] shadow-xs">
                  {submitted ? (
                    <div className="text-center space-y-4 py-12">
                      <CheckCircle2 size={48} className="text-[var(--color-accent-green-700)] mx-auto" />
                      <h2 className="font-display text-3xl text-[var(--color-ink-900)]">Inquiry Successfully Transmitted</h2>
                      <p className="text-xs sm:text-sm text-[var(--color-ink-700)] max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out, {form.fullName}. An advisor from the <strong>{form.department}</strong> has received your message and will reply to <strong>{form.email}</strong> within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm({ fullName: '', email: '', phone: '', department: 'Admissions Office', subject: '', message: '' });
                        }}
                        className="px-6 py-2.5 bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] text-xs font-semibold rounded-[2px]"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h2 className="font-display text-2xl text-[var(--color-ink-900)] mb-2">Send an Official Inquiry</h2>
                      <p className="text-xs text-[var(--color-ink-600)] mb-6">
                        Complete the form below and your inquiry will be routed directly to the appropriate dean or administrative officer.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={form.fullName}
                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                            placeholder="e.g. Grace Tumusiime"
                            className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              placeholder="grace@example.com"
                              className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              placeholder="+256 700 000 000"
                              className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                              Recipient Department *
                            </label>
                            <select
                              value={form.department}
                              onChange={(e) => setForm({ ...form, department: e.target.value })}
                              className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                            >
                              <option value="Admissions Office">Admissions Office</option>
                              <option value="Academic Registrar">Academic Registrar (Transcripts & Certificates)</option>
                              <option value="School of Purpose">School of Purpose</option>
                              <option value="School of Leadership">School of Leadership</option>
                              <option value="School of Business">School of Business</option>
                              <option value="Executive & Corporate Programs">Executive & Corporate Programs</option>
                              <option value="Institutional Partnerships">Institutional Partnerships</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                              Subject *
                            </label>
                            <input
                              type="text"
                              required
                              value={form.subject}
                              onChange={(e) => setForm({ ...form, subject: e.target.value })}
                              placeholder="e.g. Inquiring about October 2026 Fellowship intake"
                              className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                            Message Details *
                          </label>
                          <textarea
                            required
                            rows={5}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="Write your message here..."
                            className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] text-xs font-bold uppercase tracking-wider rounded-[2px] hover:bg-[var(--color-brand-blue-700)] transition-colors disabled:opacity-50"
                          >
                            <Send size={14} />
                            {isSubmitting ? 'Sending...' : 'Transmit Inquiry'}
                          </button>
                        </div>
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
