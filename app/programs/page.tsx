'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';
import { StatusBadge } from '../../src/components/primitives/StatusBadge';
import { dataStore } from '../../src/data/store';
import { Program, School, ProgramLevel } from '../../src/domain/types';
import { Search, Filter, ArrowRight, RotateCcw } from 'lucide-react';

function ProgramCatalogueContent() {
  const searchParams = useSearchParams();
  const initialSchool = searchParams.get('school') || 'all';
  const initialLevel = searchParams.get('level') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<string>(initialSchool);
  const [selectedLevel, setSelectedLevel] = useState<string>(initialLevel);
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'duration' | 'level'>('name');

  const schools = useMemo(() => dataStore.getSchools(), []);
  const allPrograms = useMemo(() => dataStore.getPrograms(), []);

  // Filter logic
  const filteredPrograms = useMemo(() => {
    return allPrograms.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSummary = p.summary.toLowerCase().includes(q);
        const matchAudience = p.audience?.some((t) => t.toLowerCase().includes(q));
        const matchFormat = p.format?.toLowerCase().includes(q);
        if (!matchName && !matchSummary && !matchAudience && !matchFormat) return false;
      }
      // School
      if (selectedSchool !== 'all') {
        const schoolObj = schools.find((s) => s.slug === selectedSchool || s.id === selectedSchool);
        if (schoolObj && p.schoolId !== schoolObj.id) return false;
      }
      // Level
      if (selectedLevel !== 'all' && p.levelSlug !== selectedLevel) {
        return false;
      }
      // Mode
      if (selectedMode !== 'all' && p.deliveryMode !== selectedMode) {
        return false;
      }
      // Format
      if (selectedFormat !== 'all' && p.format !== selectedFormat) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'duration') return a.durationWeeks - b.durationWeeks;
      if (sortBy === 'level') return a.levelSlug.localeCompare(b.levelSlug);
      return a.name.localeCompare(b.name);
    });
  }, [allPrograms, searchQuery, selectedSchool, selectedLevel, selectedMode, selectedFormat, sortBy, schools]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSchool('all');
    setSelectedLevel('all');
    setSelectedMode('all');
    setSelectedFormat('all');
    setSortBy('name');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        {/* Breadcrumbs */}
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Programmes' }]} />
          </div>
        </div>

        {/* Hero Banner */}
        <section className="py-12 sm:py-16 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-ink-900)] leading-tight mb-4">
                Academic & Executive Programmes
              </h1>
              <p className="font-display text-lg sm:text-xl font-light text-[var(--color-ink-700)] leading-relaxed">
                Practical, rigorous curricula spanning foundational courses, professional certifications, executive masterclasses, and enterprise fellowships.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Toolbar & Main Listing */}
        <section className="py-12 bg-[var(--color-paper-100)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            {/* Filter Bar */}
            <div className="bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] p-6 rounded-[2px] mb-8 space-y-4 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Search Input */}
                <div className="md:col-span-4 relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-500)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, topic, or keyword..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-700)] text-[var(--color-ink-900)]"
                  />
                </div>

                {/* School Filter */}
                <div className="md:col-span-3">
                  <select
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-700)] text-[var(--color-ink-900)]"
                  >
                    <option value="all">All Schools</option>
                    {schools.map((s) => (
                      <option key={s.id} value={s.slug}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div className="md:col-span-2">
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-700)] text-[var(--color-ink-900)]"
                  >
                    <option value="all">All Levels</option>
                    <option value="foundation">Foundation</option>
                    <option value="professional">Professional</option>
                    <option value="advanced">Advanced</option>
                    <option value="executive">Executive</option>
                    <option value="fellowship">Fellowship</option>
                  </select>
                </div>

                {/* Delivery Mode */}
                <div className="md:col-span-2">
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-700)] text-[var(--color-ink-900)]"
                  >
                    <option value="all">All Delivery Modes</option>
                    <option value="Online">Online</option>
                    <option value="Physical">Physical</option>
                    <option value="Blended">Blended</option>
                  </select>
                </div>

                {/* Reset button */}
                <div className="md:col-span-1 flex items-center justify-end">
                  <button
                    onClick={resetFilters}
                    title="Reset all filters"
                    className="p-2.5 text-xs text-[var(--color-ink-600)] hover:text-[var(--color-brand-blue-700)] border border-[var(--color-paper-200)] rounded-[2px] hover:bg-[var(--color-paper-100)]"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>

              {/* Status and Active Filters info */}
              <div className="flex items-center justify-between text-xs text-[var(--color-ink-500)] pt-2 border-t border-[var(--color-paper-200)]">
                <span>Showing <strong>{filteredPrograms.length}</strong> of {allPrograms.length} programmes</span>
                <div className="flex items-center gap-2">
                  <span>Sort by:</span>
                  <button
                    onClick={() => setSortBy('name')}
                    className={`px-2 py-0.5 rounded-[2px] ${sortBy === 'name' ? 'bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)]' : 'hover:underline'}`}
                  >
                    Name
                  </button>
                  <button
                    onClick={() => setSortBy('duration')}
                    className={`px-2 py-0.5 rounded-[2px] ${sortBy === 'duration' ? 'bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)]' : 'hover:underline'}`}
                  >
                    Duration
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {filteredPrograms.length === 0 ? (
              <div className="p-16 text-center bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px]">
                <p className="font-display text-xl text-[var(--color-ink-900)] mb-2">No matching programmes found</p>
                <p className="text-xs text-[var(--color-ink-600)] mb-6">Try adjusting your keywords or clearing filter parameters.</p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 text-xs font-semibold bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] rounded-[2px]"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPrograms.map((prog) => {
                  const school = schools.find((s) => s.id === prog.schoolId);

                  return (
                    <div
                      key={prog.id}
                      className="bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] p-6 sm:p-7 flex flex-col justify-between hover:border-[var(--color-brand-blue-700)] transition-colors"
                    >
                      <div>
                        {/* Tags & School */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-bold text-[var(--color-accent-gold-600)] uppercase tracking-wider">
                            {school?.name || prog.schoolId}
                          </span>
                          <StatusBadge status="open" label="Open" />
                        </div>

                        {/* Title */}
                        <h2 className="font-display text-xl sm:text-2xl text-[var(--color-ink-900)] mb-3">
                          <Link href={`/programs/${prog.slug}`} className="hover:text-[var(--color-brand-blue-700)] hover:underline">
                            {prog.name}
                          </Link>
                        </h2>

                        {/* Summary */}
                        <p className="text-xs text-[var(--color-ink-700)] leading-relaxed mb-6 line-clamp-3">
                          {prog.summary}
                        </p>
                      </div>

                      {/* Meta Footer */}
                      <div className="pt-4 border-t border-[var(--color-paper-200)]">
                        <div className="grid grid-cols-3 gap-2 text-[11px] text-[var(--color-ink-500)] mb-4">
                          <div>
                            <span className="block font-medium text-[var(--color-ink-700)]">Duration</span>
                            {prog.durationWeeks} Weeks
                          </div>
                          <div>
                            <span className="block font-medium text-[var(--color-ink-700)]">Mode</span>
                            {prog.deliveryMode}
                          </div>
                          <div>
                            <span className="block font-medium text-[var(--color-ink-700)]">Tuition</span>
                            UGX {(((prog.fees?.amount || 1200000)) / 1000).toFixed(0)}k
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Link
                            href={`/programs/${prog.slug}`}
                            className="flex-1 py-2 text-center text-xs font-semibold bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
                          >
                            View Syllabus
                          </Link>
                          <Link
                            href={`/apply?program=${prog.slug}`}
                            className="px-4 py-2 text-xs font-semibold border border-[var(--color-paper-200)] text-[var(--color-ink-900)] hover:bg-[var(--color-paper-100)] rounded-[2px]"
                          >
                            Apply
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm">Loading catalogue...</div>}>
      <ProgramCatalogueContent />
    </Suspense>
  );
}
