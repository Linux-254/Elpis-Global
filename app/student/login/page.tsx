'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { dataStore } from '../../../src/data/store';
import { GraduationCap, Shield, ArrowRight, CheckCircle2, Lock, Mail } from 'lucide-react';

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('student@zegs.ac.ug');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const user = dataStore.login(email);
      setLoading(false);
      if (user) {
        if (user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/student/dashboard');
        }
      } else {
        // Automatically create account for any valid student email
        const newUser = dataStore.saveUser({
          email,
          fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
          role: 'student'
        });
        dataStore.setCurrentUser(newUser);
        router.push('/student/dashboard');
      }
    }, 400);
  };

  const quickLoginAs = (role: 'student' | 'admin') => {
    if (role === 'student') {
      dataStore.login('student@zegs.ac.ug');
      router.push('/student/dashboard');
    } else {
      dataStore.login('admin@zegs.ac.ug');
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper-50)]">
      <SiteHeader variant="solid" />

      <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-8 py-12 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-[var(--color-paper-300)] p-8 sm:p-10 shadow-sm rounded-[2px] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[var(--color-brand-blue-900)] text-[var(--color-accent-gold-400)] mx-auto flex items-center justify-center rounded-[2px]">
              <GraduationCap size={24} />
            </div>
            <h1 className="font-display font-semibold text-2xl text-[var(--color-ink-900)]">
              Online Campus Sign In
            </h1>
            <p className="text-xs text-[var(--color-ink-600)]">
              Access your enrolled cohort modules, live masterclass links, assignments, and digital credentials.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-ink-800)] mb-1">
                Student / Institutional Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-[var(--color-ink-400)]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@zegs.ac.ug"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[var(--color-paper-300)] text-[var(--color-ink-900)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-[var(--color-ink-800)]">
                  Password
                </label>
                <span className="text-[11px] text-[var(--color-brand-blue-800)] hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-[var(--color-ink-400)]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[var(--color-paper-300)] text-[var(--color-ink-900)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white font-semibold text-xs tracking-wider uppercase rounded-[2px] transition-colors flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Campus'}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Instant Role Preview Selector for reviewers */}
          <div className="pt-4 border-t border-[var(--color-paper-200)] space-y-3">
            <span className="text-[11px] font-semibold text-[var(--color-ink-500)] uppercase tracking-wider block text-center">
              Quick Role Switcher
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => quickLoginAs('student')}
                className="p-2.5 bg-[var(--color-paper-100)] hover:bg-[var(--color-paper-200)] border border-[var(--color-paper-300)] text-left rounded-[2px] transition-colors"
              >
                <div className="flex items-center gap-1.5 font-semibold text-xs text-[var(--color-ink-900)]">
                  <GraduationCap size={14} className="text-[var(--color-accent-gold-700)]" />
                  <span>Student Demo</span>
                </div>
                <div className="text-[10px] text-[var(--color-ink-600)]">David Mukasa</div>
              </button>

              <button
                type="button"
                onClick={() => quickLoginAs('admin')}
                className="p-2.5 bg-[var(--color-brand-blue-900)] text-white hover:bg-[var(--color-brand-blue-800)] border border-[var(--color-brand-blue-950)] text-left rounded-[2px] transition-colors"
              >
                <div className="flex items-center gap-1.5 font-semibold text-xs text-[var(--color-accent-gold-400)]">
                  <Shield size={14} />
                  <span>Admin Demo</span>
                </div>
                <div className="text-[10px] text-white/70">Full Site Control</div>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-[var(--color-ink-600)]">
            New prospective applicant?{' '}
            <Link href="/apply" className="font-semibold text-[var(--color-brand-blue-800)] hover:underline">
              Submit Online Application
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
