'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  GraduationCap,
  Sparkles,
  Menu,
  X,
  Shield,
  Calendar,
  Compass,
  FileCheck,
  Users,
  Award,
  BookMarked
} from 'lucide-react';
import { dataStore } from '../../data/store';
import { SEED_USERS } from '../../data/seed';

const subscribe = (cb: () => void) => dataStore.subscribe(cb);
const getUserSnapshot = () => dataStore.getCurrentUser();
const getUserServerSnapshot = () => SEED_USERS[1];

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentUser = useSyncExternalStore(subscribe, getUserSnapshot, getUserServerSnapshot);

  const isHome = pathname === '/';
  const isPrograms = pathname.startsWith('/programs') || pathname.startsWith('/schools');
  const isPortal = pathname.startsWith('/portal') || pathname.startsWith('/student');
  const isApply = pathname.startsWith('/apply') || pathname.startsWith('/admissions');
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {/* Mobile Bottom Bar Container */}
      <nav
        aria-label="Mobile Navigation Bar"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[400] bg-[var(--color-brand-blue-900)]/95 backdrop-blur-md border-t border-white/15 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* 1. Home */}
          <Link
            href="/"
            onClick={() => setDrawerOpen(false)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded transition-all ${
              isHome && !drawerOpen
                ? 'text-[var(--color-accent-gold-400)] font-semibold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Home size={18} aria-hidden="true" />
            <span className="text-[10px] mt-1 tracking-tight">Home</span>
          </Link>

          {/* 2. Programmes */}
          <Link
            href="/programs"
            onClick={() => setDrawerOpen(false)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded transition-all ${
              isPrograms && !drawerOpen
                ? 'text-[var(--color-accent-gold-400)] font-semibold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <BookOpen size={18} aria-hidden="true" />
            <span className="text-[10px] mt-1 tracking-tight">Courses</span>
          </Link>

          {/* 3. Online Campus / Portal (Center Accent) */}
          <Link
            href={currentUser ? '/student/dashboard' : '/student/login'}
            onClick={() => setDrawerOpen(false)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded transition-all relative ${
              isPortal && !drawerOpen
                ? 'text-[var(--color-accent-gold-400)] font-semibold'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <div className="p-1 bg-[var(--color-accent-gold-400)]/20 rounded-full mb-0.5">
              <GraduationCap size={18} className="text-[var(--color-accent-gold-400)]" aria-hidden="true" />
            </div>
            <span className="text-[10px] tracking-tight text-[var(--color-accent-gold-400)] font-medium">Campus</span>
          </Link>

          {/* 4. Apply Now */}
          <Link
            href="/apply"
            onClick={() => setDrawerOpen(false)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded transition-all ${
              isApply && !drawerOpen
                ? 'text-[var(--color-accent-gold-400)] font-semibold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Sparkles size={18} aria-hidden="true" />
            <span className="text-[10px] mt-1 tracking-tight">Apply</span>
          </Link>

          {/* 5. Quick Hub / Drawer Button */}
          <button
            type="button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-expanded={drawerOpen}
            aria-label="Open Full Academic Navigation"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded transition-all ${
              drawerOpen
                ? 'text-[var(--color-accent-gold-400)] font-semibold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {drawerOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            <span className="text-[10px] mt-1 tracking-tight">Menu</span>
          </button>
        </div>
      </nav>

      {/* Slide-over Full Academic Hub for Mobile */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-[390] bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="absolute bottom-14 left-0 right-0 max-h-[80vh] overflow-y-auto bg-[var(--color-brand-blue-900)] text-white rounded-t-2xl border-t border-white/20 p-5 shadow-2xl space-y-5 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-display font-semibold text-base text-[var(--color-accent-gold-400)]">
                  Zoe Elpis Academic Directory
                </h3>
                <p className="text-xs text-white/70">Online Global Academy Platform</p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 bg-white/10 text-white rounded hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            {/* Grid of Sections */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link
                href="/schools"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2.5 p-3 bg-white/5 hover:bg-white/10 rounded border border-white/10"
              >
                <Compass size={16} className="text-[var(--color-accent-gold-400)]" />
                <div>
                  <div className="font-semibold text-white">4 Schools</div>
                  <div className="text-[10px] text-white/60">Disciplines & Pillars</div>
                </div>
              </Link>

              <Link
                href="/learning/model"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2.5 p-3 bg-white/5 hover:bg-white/10 rounded border border-white/10"
              >
                <BookMarked size={16} className="text-[var(--color-accent-gold-400)]" />
                <div>
                  <div className="font-semibold text-white">Online Model</div>
                  <div className="text-[10px] text-white/60">Learn & Build</div>
                </div>
              </Link>

              <Link
                href="/mentorship"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2.5 p-3 bg-white/5 hover:bg-white/10 rounded border border-white/10"
              >
                <Users size={16} className="text-[var(--color-accent-gold-400)]" />
                <div>
                  <div className="font-semibold text-white">Mentorship</div>
                  <div className="text-[10px] text-white/60">1-on-1 Advisory</div>
                </div>
              </Link>

              <Link
                href="/events"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2.5 p-3 bg-white/5 hover:bg-white/10 rounded border border-white/10"
              >
                <Calendar size={16} className="text-[var(--color-accent-gold-400)]" />
                <div>
                  <div className="font-semibold text-white">Masterclasses</div>
                  <div className="text-[10px] text-white/60">Live Online Sessions</div>
                </div>
              </Link>

              <Link
                href="/verify"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2.5 p-3 bg-white/5 hover:bg-white/10 rounded border border-white/10"
              >
                <Award size={16} className="text-[var(--color-accent-gold-400)]" />
                <div>
                  <div className="font-semibold text-white">Verify Certificate</div>
                  <div className="text-[10px] text-white/60">Registry Lookup</div>
                </div>
              </Link>

              <Link
                href="/contact"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2.5 p-3 bg-white/5 hover:bg-white/10 rounded border border-white/10"
              >
                <FileCheck size={16} className="text-[var(--color-accent-gold-400)]" />
                <div>
                  <div className="font-semibold text-white">Contact & FAQs</div>
                  <div className="text-[10px] text-white/60">Direct Support</div>
                </div>
              </Link>
            </div>

            {/* Portal & Admin Control Area */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <Link
                  href="/student/login"
                  onClick={() => setDrawerOpen(false)}
                  className="flex-1 mr-2 py-2.5 px-3 bg-[var(--color-accent-gold-400)] text-[var(--color-ink-900)] text-center font-semibold text-xs rounded hover:bg-white transition-colors"
                >
                  Student Portal Login
                </Link>
                <Link
                  href="/admin/dashboard"
                  onClick={() => setDrawerOpen(false)}
                  className="py-2.5 px-3 bg-white/10 text-white font-medium text-xs rounded hover:bg-white/20 transition-colors flex items-center gap-1.5"
                >
                  <Shield size={14} className="text-[var(--color-accent-gold-400)]" />
                  <span>Admin</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
