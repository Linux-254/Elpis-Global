import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';
import { dataStore } from '../../src/data/store';

export const metadata: Metadata = {
  title: 'Institutional Site Map & Complete Index',
  description: 'Complete directory of all pages, schools, programs, level ladders, policies, and interactive tools at Zoe Elpis Global School.'
};

export default function SitemapPage() {
  const schools = dataStore.getSchools();
  const programs = dataStore.getPrograms();
  const articles = dataStore.getArticles();
  const events = dataStore.getEvents();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Site Index & Directory' }]} />
          </div>
        </div>

        <section className="py-16 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-ink-900)] mb-4">
              Complete Institutional Directory
            </h1>
            <p className="font-display text-lg font-light text-[var(--color-ink-700)] mb-12">
              Comprehensive navigation index of every section, program track, policy, and tool across Zoe Elpis Global School.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-xs">
              {/* Pillar 1: About & Institution */}
              <div className="space-y-4">
                <h3 className="font-display text-lg text-[var(--color-ink-900)] border-b border-[var(--color-paper-300)] pb-2">
                  Institutional Identity
                </h3>
                <ul className="space-y-2 text-[var(--color-ink-700)]">
                  <li><Link href="/" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Homepage</Link></li>
                  <li><Link href="/about" className="hover:text-[var(--color-brand-blue-700)] hover:underline">About ZEGS Overview</Link></li>
                  <li><Link href="/about/story" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Our Founding Story</Link></li>
                  <li><Link href="/about/vision-mission" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Vision & Mission</Link></li>
                  <li><Link href="/about/values" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Core Values</Link></li>
                  <li><Link href="/about/leadership" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Leadership & Governance</Link></li>
                  <li><Link href="/impact" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Impact & Case Studies</Link></li>
                  <li><Link href="/mentorship" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Mentorship Network</Link></li>
                </ul>
              </div>

              {/* Pillar 2: Academic Schools & Programs */}
              <div className="space-y-4">
                <h3 className="font-display text-lg text-[var(--color-ink-900)] border-b border-[var(--color-paper-300)] pb-2">
                  Academic Schools
                </h3>
                <ul className="space-y-2 text-[var(--color-ink-700)]">
                  <li><Link href="/schools" className="hover:text-[var(--color-brand-blue-700)] hover:underline">All Schools Index</Link></li>
                  {schools.map((s) => (
                    <li key={s.id}>
                      <Link href={`/schools/${s.slug}`} className="hover:text-[var(--color-brand-blue-700)] hover:underline">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2 font-semibold text-[var(--color-ink-900)]">The 5 Competency Levels:</li>
                  <li><Link href="/programs/foundation" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Level 01 • Foundation</Link></li>
                  <li><Link href="/programs/professional" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Level 02 • Professional</Link></li>
                  <li><Link href="/programs/advanced" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Level 03 • Advanced</Link></li>
                  <li><Link href="/programs/executive" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Level 04 • Executive</Link></li>
                  <li><Link href="/programs/fellowship" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Level 05 • Fellowship</Link></li>
                </ul>
              </div>

              {/* Pillar 3: Learning & Events */}
              <div className="space-y-4">
                <h3 className="font-display text-lg text-[var(--color-ink-900)] border-b border-[var(--color-paper-300)] pb-2">
                  Learning & Events
                </h3>
                <ul className="space-y-2 text-[var(--color-ink-700)]">
                  <li><Link href="/learning" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Learning Overview</Link></li>
                  <li><Link href="/learning/model" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Teaching & Mentorship Model</Link></li>
                  <li><Link href="/learning/online" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Online Virtual Cohorts</Link></li>
                  <li><Link href="/learning/physical" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Physical Campus Residencies</Link></li>
                  <li><Link href="/learning/blended" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Blended Hybrid Model</Link></li>
                  <li><Link href="/events" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Masterclasses & Events</Link></li>
                  <li><Link href="/news" className="hover:text-[var(--color-brand-blue-700)] hover:underline">The ZEGS Journal</Link></li>
                </ul>
              </div>

              {/* Pillar 4: Admissions, Tools & Legal */}
              <div className="space-y-4">
                <h3 className="font-display text-lg text-[var(--color-ink-900)] border-b border-[var(--color-paper-300)] pb-2">
                  Admissions & Services
                </h3>
                <ul className="space-y-2 text-[var(--color-ink-700)]">
                  <li><Link href="/admissions" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Admissions Overview</Link></li>
                  <li><Link href="/apply" className="hover:text-[var(--color-brand-blue-700)] hover:underline font-bold text-[var(--color-brand-blue-900)]">Online Application Wizard</Link></li>
                  <li><Link href="/verify" className="hover:text-[var(--color-brand-blue-700)] hover:underline font-bold text-[var(--color-accent-green-700)]">Credential Verification Registry</Link></li>
                  <li><Link href="/contact" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Contact & Campus Headquarters</Link></li>
                  <li><Link href="/privacy" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Privacy & Data Protection</Link></li>
                  <li><Link href="/terms" className="hover:text-[var(--color-brand-blue-700)] hover:underline">Terms of Enrolment</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
