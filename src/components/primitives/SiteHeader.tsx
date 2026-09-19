'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight, User, Shield } from 'lucide-react';
import { dataStore } from '../../data/store';
import { SEED_USERS } from '../../data/seed';

const subscribe = (cb: () => void) => dataStore.subscribe(cb);
const getUserSnapshot = () => dataStore.getCurrentUser();
const getUserServerSnapshot = () => SEED_USERS[1];

interface SiteHeaderProps {
  variant?: 'over-hero' | 'solid';
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ variant = 'solid' }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const currentUser = useSyncExternalStore(subscribe, getUserSnapshot, getUserServerSnapshot);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 64) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMobileSubmenu = (key: string) => {
    setMobileExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isOverHeroHome = variant === 'over-hero' && !scrolled && pathname === '/';

  return (
    <>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-[700] focus:px-4 focus:py-2 focus:bg-[var(--color-accent-gold-400)] focus:text-[var(--color-ink-900)] focus:font-semibold focus:outline-none rounded-[2px]"
      >
        Skip to main content
      </a>

      <header
        className={`w-full z-[300] transition-colors duration-220 ${
          isOverHeroHome
            ? 'absolute top-0 left-0 bg-transparent text-[var(--color-paper-50)]'
            : 'sticky top-0 bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] shadow-sm'
        }`}
        ref={navRef}
      >
        {/* Row 1: Slim Utility Bar (collapses on scroll) */}
        {!scrolled && (
          <div className="border-b border-white/10 text-xs py-1.5 sm:py-2 px-3 sm:px-8">
            <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-2 sm:gap-4 min-w-0">
              <div className="flex items-center gap-1.5 font-medium tracking-wide opacity-90 shrink-0">
                <div className="w-3.5 h-3.5 text-[var(--color-accent-gold-400)] shrink-0 sm:hidden">
                  <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
                    <path d="M32 6C30.5 12 25 17 25 24C25 29 28.5 32.5 32 35C35.5 32.5 39 29 39 24C39 17 33.5 12 32 6Z" />
                    <path d="M30.5 36L29 54H35L33.5 36C33 36.2 32.5 36.3 32 36.3C31.5 36.3 31 36.2 30.5 36Z" />
                  </svg>
                </div>
                <span className="sm:hidden font-bold tracking-wider text-[var(--color-paper-50)]">ZEGS</span>
                <span className="hidden sm:inline">Zoe Elpis Global School</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">
                <div className="hidden md:flex items-center gap-4 sm:gap-6">
                  <Link href="/events" className="inline-flex items-center leading-none text-xs text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] transition-colors whitespace-nowrap">
                    Events
                  </Link>
                  <Link href="/news" className="inline-flex items-center leading-none text-xs text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] transition-colors whitespace-nowrap">
                    Journal
                  </Link>
                  <Link href="/contact" className="inline-flex items-center leading-none text-xs text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] transition-colors whitespace-nowrap">
                    Contact
                  </Link>

                  <span className="h-3 w-[1px] bg-white/25 inline-block mx-0.5" aria-hidden="true" />
                </div>

                {currentUser ? (
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <Link
                      href="/student/dashboard"
                      className="inline-flex items-center gap-1.5 leading-none text-xs font-medium text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] transition-colors whitespace-nowrap"
                    >
                      <User size={13} aria-hidden="true" className="shrink-0" />
                      <span className="hidden sm:inline">Student Portal</span>
                      <span className="sm:hidden">Portal</span>
                    </Link>
                    {currentUser.role === 'admin' && (
                      <Link
                        href="/admin/dashboard"
                        className="inline-flex items-center gap-1 leading-none text-xs font-semibold text-[var(--color-accent-gold-400)] hover:text-white transition-colors whitespace-nowrap px-2 py-1 bg-white/10 hover:bg-white/20 rounded-[2px] border border-[var(--color-accent-gold-400)]/30 shrink-0"
                      >
                        <Shield size={12} aria-hidden="true" className="shrink-0 text-[var(--color-accent-gold-400)]" />
                        <span className="whitespace-nowrap">Admin</span>
                      </Link>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/student/login"
                    className="inline-flex items-center gap-1.5 leading-none text-xs font-medium text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] transition-colors whitespace-nowrap px-2 py-1 bg-white/10 hover:bg-white/20 rounded-[2px] shrink-0"
                  >
                    <User size={13} aria-hidden="true" className="shrink-0" />
                    <span className="hidden sm:inline">Student Login</span>
                    <span className="sm:hidden">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Row 2: Primary Bar */}
        <div className={`px-4 sm:px-8 transition-all duration-220 ${scrolled ? 'py-3' : 'py-4'}`}>
          <div className="max-w-[1320px] mx-auto flex items-center justify-between">
            {/* Logo Lockup */}
            <Link href="/" className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold-400)]">
              {/* Clean Vector Emblem */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 text-[var(--color-paper-50)] shrink-0 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
                  <path d="M32 6C30.5 12 25 17 25 24C25 29 28.5 32.5 32 35C35.5 32.5 39 29 39 24C39 17 33.5 12 32 6Z" />
                  <path d="M32 23C32.8 20 34.5 17.5 36 15.5C37.2 18.5 37.5 21.5 36.5 24.5C35.5 27.5 33.5 29.5 32 31C30.5 29.5 28.5 27.5 27.5 24.5C26.5 21.5 26.8 18.5 28 15.5C29.5 17.5 31.2 20 32 23Z" fillOpacity="0.4" />
                  <path d="M30.5 36L29 54H35L33.5 36C33 36.2 32.5 36.3 32 36.3C31.5 36.3 31 36.2 30.5 36Z" />
                  <path d="M27 38.5C21 37.5 13 40 8 45.5V56.5C14 51.5 21.5 50.5 27 52V38.5Z" />
                  <path d="M37 38.5C43 37.5 51 40 56 45.5V56.5C50 51.5 42.5 50.5 37 52V38.5Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-semibold text-lg sm:text-xl tracking-wider leading-none text-[var(--color-paper-50)]">
                  ZOE ELPIS
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.14em] text-[var(--color-brand-blue-100)] mt-0.5">
                  GLOBAL SCHOOL
                </span>
              </div>
            </Link>

            {/* Desktop Primary Navigation */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium" aria-label="Main Navigation">
              {/* About Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={activeDropdown === 'about'}
                  className="flex items-center gap-1.5 py-2 hover:text-[var(--color-accent-gold-400)] transition-colors focus:outline-none"
                  onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                >
                  <span>About</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'about' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-[var(--color-brand-blue-900)] border-t border-white/20 shadow-2xl p-7 grid grid-cols-3 gap-6 rounded-b-[2px]">
                    <div>
                      <h4 className="font-display text-sm uppercase tracking-wider text-[var(--color-accent-gold-400)] mb-3 pb-1 border-b border-white/10">
                        The Institution
                      </h4>
                      <ul className="space-y-2.5 text-sm">
                        <li>
                          <Link href="/about/story" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block">
                            Our Story & Heritage
                          </Link>
                        </li>
                        <li>
                          <Link href="/about/vision-mission" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block">
                            Vision & Mission
                          </Link>
                        </li>
                        <li>
                          <Link href="/about/values" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block">
                            Core Institutional Values
                          </Link>
                        </li>
                        <li>
                          <Link href="/about/leadership" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block">
                            Leadership & Governance
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-display text-sm uppercase tracking-wider text-[var(--color-accent-gold-400)] mb-3 pb-1 border-b border-white/10">
                        Four Pillars
                      </h4>
                      <ul className="space-y-2.5 text-sm">
                        <li>
                          <Link href="/schools/purpose" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block">
                            Purpose Discovery
                          </Link>
                        </li>
                        <li>
                          <Link href="/schools/leadership" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block">
                            Leadership & Influence
                          </Link>
                        </li>
                        <li>
                          <Link href="/schools/business" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block">
                            Business & Enterprise
                          </Link>
                        </li>
                        <li>
                          <Link href="/schools/impact" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block">
                            Impact & Transformation
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/5 p-4 rounded-[2px] border border-white/10">
                      <h5 className="font-display text-sm font-semibold text-[var(--color-paper-50)] mb-2">
                        Institutional Rationale
                      </h5>
                      <p className="text-xs text-[var(--color-brand-blue-100)] leading-relaxed mb-3">
                        Purpose gives direction. Leadership gives influence. Business creates value. Impact gives meaning to what we build.
                      </p>
                      <Link
                        href="/about"
                        className="text-xs font-semibold text-[var(--color-accent-gold-400)] hover:underline inline-flex items-center gap-1"
                      >
                        Read Overview →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Schools Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('schools')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={activeDropdown === 'schools'}
                  className="flex items-center gap-1.5 py-2 hover:text-[var(--color-accent-gold-400)] transition-colors focus:outline-none"
                  onClick={() => setActiveDropdown(activeDropdown === 'schools' ? null : 'schools')}
                >
                  <span>Schools</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'schools' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'schools' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-[var(--color-brand-blue-900)] border-t border-white/20 shadow-2xl p-7 grid grid-cols-2 gap-6 rounded-b-[2px]">
                    <div className="space-y-4">
                      <Link href="/schools/purpose" className="group block p-2.5 rounded hover:bg-white/5 transition-colors">
                        <div className="text-sm font-semibold text-[var(--color-paper-50)] group-hover:text-[var(--color-accent-gold-400)]">
                          School of Purpose & Personal Development
                        </div>
                        <div className="text-xs text-[var(--color-brand-blue-100)] mt-0.5">
                          Identity, vision mapping, mindset, and personal discipline.
                        </div>
                      </Link>

                      <Link href="/schools/leadership" className="group block p-2.5 rounded hover:bg-white/5 transition-colors">
                        <div className="text-sm font-semibold text-[var(--color-paper-50)] group-hover:text-[var(--color-accent-gold-400)]">
                          School of Leadership & Influence
                        </div>
                        <div className="text-xs text-[var(--color-brand-blue-100)] mt-0.5">
                          Public communication, servant leadership, and governance.
                        </div>
                      </Link>
                    </div>

                    <div className="space-y-4">
                      <Link href="/schools/business" className="group block p-2.5 rounded hover:bg-white/5 transition-colors">
                        <div className="text-sm font-semibold text-[var(--color-paper-50)] group-hover:text-[var(--color-accent-gold-400)]">
                          School of Business & Entrepreneurship
                        </div>
                        <div className="text-xs text-[var(--color-brand-blue-100)] mt-0.5">
                          Enterprise modeling, unit economics, cash flow, and scaling.
                        </div>
                      </Link>

                      <Link href="/schools/impact" className="group block p-2.5 rounded hover:bg-white/5 transition-colors">
                        <div className="text-sm font-semibold text-[var(--color-paper-50)] group-hover:text-[var(--color-accent-gold-400)]">
                          School of Impact & Social Transformation
                        </div>
                        <div className="text-xs text-[var(--color-brand-blue-100)] mt-0.5">
                          NGO management, proposal writing, and verified M&E systems.
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Programmes Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('programs')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={activeDropdown === 'programs'}
                  className="flex items-center gap-1.5 py-2 hover:text-[var(--color-accent-gold-400)] transition-colors focus:outline-none"
                  onClick={() => setActiveDropdown(activeDropdown === 'programs' ? null : 'programs')}
                >
                  <span>Programmes</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'programs' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'programs' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[820px] bg-[var(--color-brand-blue-900)] border-t border-white/20 shadow-2xl p-7 grid grid-cols-3 gap-6 rounded-b-[2px]">
                    <div>
                      <h4 className="font-display text-sm uppercase tracking-wider text-[var(--color-accent-gold-400)] mb-3 pb-1 border-b border-white/10">
                        By Level
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="/programs/foundation" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block">
                            Foundation Programmes
                          </Link>
                        </li>
                        <li>
                          <Link href="/programs/professional" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block">
                            Professional Certificates
                          </Link>
                        </li>
                        <li>
                          <Link href="/programs/advanced" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block">
                            Advanced Masterclasses
                          </Link>
                        </li>
                        <li>
                          <Link href="/programs/executive" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block">
                            Executive Training
                          </Link>
                        </li>
                        <li>
                          <Link href="/programs/fellowship" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block">
                            Impact Leaders Fellowship
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-display text-sm uppercase tracking-wider text-[var(--color-accent-gold-400)] mb-3 pb-1 border-b border-white/10">
                        Signature Programmes
                      </h4>
                      <ul className="space-y-2 text-xs">
                        <li>
                          <Link href="/programs/purpose-discovery-program" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block font-medium">
                            Purpose Discovery Program
                          </Link>
                        </li>
                        <li>
                          <Link href="/programs/leadership-and-influence-academy" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block font-medium">
                            Leadership & Influence Academy
                          </Link>
                        </li>
                        <li>
                          <Link href="/programs/from-idea-to-enterprise" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block font-medium">
                            From Idea to Enterprise
                          </Link>
                        </li>
                        <li>
                          <Link href="/programs/ngo-and-project-management-academy" className="text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] block font-medium">
                            NGO & Project Management
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/5 p-4 rounded-[2px] flex flex-col justify-between">
                      <div>
                        <h5 className="font-display text-sm font-semibold text-[var(--color-paper-50)] mb-1">
                          Full Academic Catalogue
                        </h5>
                        <p className="text-xs text-[var(--color-brand-blue-100)] leading-relaxed">
                          Filter courses by school, format, duration, and delivery mode.
                        </p>
                      </div>
                      <div className="space-y-2 pt-4">
                        <Link
                          href="/programs"
                          className="block w-full text-center py-2 px-3 text-xs font-semibold bg-[var(--color-paper-50)] text-[var(--color-brand-blue-900)] hover:bg-[var(--color-accent-gold-400)] transition-colors rounded-[2px]"
                        >
                          Browse All Programmes
                        </Link>
                        <Link
                          href="/admissions"
                          className="block w-full text-center py-1.5 text-xs text-[var(--color-accent-gold-400)] hover:underline"
                        >
                          How Admission Works
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Learning Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('learning')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={activeDropdown === 'learning'}
                  className="flex items-center gap-1.5 py-2 hover:text-[var(--color-accent-gold-400)] transition-colors focus:outline-none"
                  onClick={() => setActiveDropdown(activeDropdown === 'learning' ? null : 'learning')}
                >
                  <span>Learning</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'learning' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'learning' && (
                  <div className="absolute top-full left-0 w-64 bg-[var(--color-brand-blue-900)] border-t border-white/20 shadow-2xl p-4 space-y-2 rounded-b-[2px]">
                    <Link href="/learning/model" className="block px-3 py-2 text-sm text-[var(--color-paper-50)] hover:bg-white/5 hover:text-[var(--color-accent-gold-400)] rounded">
                      Our Teaching Model
                    </Link>
                    <Link href="/learning/online" className="block px-3 py-2 text-sm text-[var(--color-paper-50)] hover:bg-white/5 hover:text-[var(--color-accent-gold-400)] rounded">
                      Online Learning
                    </Link>
                    <Link href="/learning/physical" className="block px-3 py-2 text-sm text-[var(--color-paper-50)] hover:bg-white/5 hover:text-[var(--color-accent-gold-400)] rounded">
                      Physical Masterclasses
                    </Link>
                    <Link href="/learning/blended" className="block px-3 py-2 text-sm text-[var(--color-paper-50)] hover:bg-white/5 hover:text-[var(--color-accent-gold-400)] rounded">
                      Blended Delivery
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/impact" className="py-2 hover:text-[var(--color-accent-gold-400)] transition-colors">
                Impact
              </Link>

              <Link href="/mentorship" className="py-2 hover:text-[var(--color-accent-gold-400)] transition-colors">
                Mentorship
              </Link>

              <Link href="/admissions" className="py-2 hover:text-[var(--color-accent-gold-400)] transition-colors">
                Admissions
              </Link>
            </nav>

            {/* Actions & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/apply"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold tracking-wider uppercase bg-[var(--color-paper-50)] text-[var(--color-brand-blue-900)] hover:bg-[var(--color-accent-gold-400)] hover:text-[var(--color-ink-900)] transition-colors rounded-[2px]"
              >
                Apply Now
              </Link>

              {/* Mobile Drawer Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[var(--color-paper-50)] hover:text-[var(--color-accent-gold-400)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold-400)] rounded-[2px]"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Fullscreen Drawer with in-place Accordions */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[60px] bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] overflow-y-auto z-[400] px-6 py-8 flex flex-col justify-between">
            <div className="space-y-4">
              <Link
                href="/apply"
                className="w-full text-center py-3.5 px-4 font-bold tracking-wider uppercase bg-[var(--color-accent-gold-400)] text-[var(--color-ink-900)] block rounded-[2px] mb-6"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply Now
              </Link>

              {/* Programmes Accordion */}
              <div className="border-b border-white/10 pb-3">
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu('programs')}
                  className="w-full flex items-center justify-between font-display text-xl py-2 text-left"
                >
                  <span>Programmes</span>
                  <ChevronRight size={18} className={`transition-transform ${mobileExpanded['programs'] ? 'rotate-90' : ''}`} />
                </button>
                {mobileExpanded['programs'] && (
                  <div className="pl-4 pt-2 space-y-2 text-sm text-[var(--color-brand-blue-100)]">
                    <Link href="/programs" className="block py-1 text-[var(--color-accent-gold-400)] font-semibold" onClick={() => setMobileMenuOpen(false)}>
                      Browse Full Catalogue
                    </Link>
                    <Link href="/programs/foundation" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Foundation Programmes
                    </Link>
                    <Link href="/programs/professional" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Professional Certificates
                    </Link>
                    <Link href="/programs/advanced" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Advanced Masterclasses
                    </Link>
                    <Link href="/programs/fellowship" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Impact Leaders Fellowship
                    </Link>
                  </div>
                )}
              </div>

              {/* Schools Accordion */}
              <div className="border-b border-white/10 pb-3">
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu('schools')}
                  className="w-full flex items-center justify-between font-display text-xl py-2 text-left"
                >
                  <span>Schools</span>
                  <ChevronRight size={18} className={`transition-transform ${mobileExpanded['schools'] ? 'rotate-90' : ''}`} />
                </button>
                {mobileExpanded['schools'] && (
                  <div className="pl-4 pt-2 space-y-2 text-sm text-[var(--color-brand-blue-100)]">
                    <Link href="/schools" className="block py-1 text-[var(--color-accent-gold-400)] font-semibold" onClick={() => setMobileMenuOpen(false)}>
                      Schools Overview
                    </Link>
                    <Link href="/schools/purpose" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Purpose & Personal Development
                    </Link>
                    <Link href="/schools/leadership" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Leadership & Influence
                    </Link>
                    <Link href="/schools/business" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Business & Entrepreneurship
                    </Link>
                    <Link href="/schools/impact" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Impact & Social Transformation
                    </Link>
                  </div>
                )}
              </div>

              {/* Learning Accordion */}
              <div className="border-b border-white/10 pb-3">
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu('learning')}
                  className="w-full flex items-center justify-between font-display text-xl py-2 text-left"
                >
                  <span>Learning Model</span>
                  <ChevronRight size={18} className={`transition-transform ${mobileExpanded['learning'] ? 'rotate-90' : ''}`} />
                </button>
                {mobileExpanded['learning'] && (
                  <div className="pl-4 pt-2 space-y-2 text-sm text-[var(--color-brand-blue-100)]">
                    <Link href="/learning/model" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Teaching Model (Learn, Apply, Build, Impact)
                    </Link>
                    <Link href="/learning/online" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Online Delivery
                    </Link>
                    <Link href="/learning/physical" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Physical Masterclasses
                    </Link>
                    <Link href="/learning/blended" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Blended Learning
                    </Link>
                  </div>
                )}
              </div>

              {/* About Accordion */}
              <div className="border-b border-white/10 pb-3">
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu('about')}
                  className="w-full flex items-center justify-between font-display text-xl py-2 text-left"
                >
                  <span>About</span>
                  <ChevronRight size={18} className={`transition-transform ${mobileExpanded['about'] ? 'rotate-90' : ''}`} />
                </button>
                {mobileExpanded['about'] && (
                  <div className="pl-4 pt-2 space-y-2 text-sm text-[var(--color-brand-blue-100)]">
                    <Link href="/about" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      About the School
                    </Link>
                    <Link href="/about/story" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Our Story
                    </Link>
                    <Link href="/about/vision-mission" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Vision & Mission
                    </Link>
                    <Link href="/about/values" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Core Values
                    </Link>
                    <Link href="/about/leadership" className="block py-1" onClick={() => setMobileMenuOpen(false)}>
                      Leadership Profiles
                    </Link>
                  </div>
                )}
              </div>

              <div className="border-b border-white/10 py-3">
                <Link href="/impact" className="font-display text-xl block" onClick={() => setMobileMenuOpen(false)}>
                  Impact & Verification
                </Link>
              </div>

              <div className="border-b border-white/10 py-3">
                <Link href="/mentorship" className="font-display text-xl block" onClick={() => setMobileMenuOpen(false)}>
                  Mentorship Network
                </Link>
              </div>

              <div className="border-b border-white/10 py-3">
                <Link href="/admissions" className="font-display text-xl block" onClick={() => setMobileMenuOpen(false)}>
                  Admissions
                </Link>
              </div>

              <div className="border-b border-white/10 py-3">
                <Link href="/events" className="font-display text-xl block" onClick={() => setMobileMenuOpen(false)}>
                  Upcoming Events
                </Link>
              </div>

              <div className="border-b border-white/10 py-3">
                <Link href="/news" className="font-display text-xl block" onClick={() => setMobileMenuOpen(false)}>
                  Journal
                </Link>
              </div>

              <div className="border-b border-white/10 py-3">
                <Link href="/contact" className="font-display text-xl block" onClick={() => setMobileMenuOpen(false)}>
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Bottom Account Strip */}
            <div className="pt-8 border-t border-white/20">
              {currentUser ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/student/dashboard"
                    className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-gold-400)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>My Student Dashboard ({currentUser.fullName})</span>
                  </Link>
                  {currentUser.role === 'admin' && (
                    <Link
                      href="/admin/dashboard"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-accent-gold-400)] hover:text-white py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Shield size={14} className="text-[var(--color-accent-gold-400)]" />
                      <span>Admin CMS Dashboard</span>
                    </Link>
                  )}
                </div>
              ) : (
                <Link
                  href="/student/login"
                  className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-gold-400)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={16} />
                  <span>Student Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
