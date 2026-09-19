import type { Metadata } from 'next';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../src/components/primitives/Breadcrumbs';
import { SectionHeading } from '../../../src/components/primitives/SectionHeading';
import { dataStore } from '../../../src/data/store';

export const metadata: Metadata = {
  title: 'Academic Leadership & Directorate',
  description: 'Meet the governing council, deans of schools, and lead facilitators guiding Zoe Elpis Global School.'
};

export default function LeadershipPage() {
  const mentors = dataStore.getMentors();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Leadership' }]} />
          </div>
        </div>

        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <SectionHeading
              title="Academic Leadership & Advisory Council"
              standfirst="Our school is governed by seasoned enterprise founders, civic leaders, and academic practitioners committed to practical, transformative education."
              accent="gold"
            />

            {/* Advisory Directorate Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {mentors.map((m) => (
                <div key={m.id} className="bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] overflow-hidden flex flex-col justify-between">
                  <div className="aspect-[4/3] bg-[var(--color-paper-200)] overflow-hidden border-b border-[var(--color-paper-200)]">
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
                      <p className="text-xs font-medium text-[var(--color-brand-blue-700)] mb-4">
                        {m.role}
                      </p>
                      <p className="text-xs text-[var(--color-ink-700)] leading-relaxed mb-4">
                        {m.biography}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--color-paper-200)]">
                      <div className="text-[11px] font-bold text-[var(--color-ink-500)] mb-2 uppercase">Focus Areas</div>
                      <div className="flex flex-wrap gap-1.5">
                        {m.expertise.map((exp, i) => (
                          <span key={i} className="text-[10px] bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] text-[var(--color-ink-700)] px-2 py-0.5 rounded-[2px]">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Institutional Note */}
            <div className="p-8 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] text-center max-w-2xl mx-auto">
              <h4 className="font-display text-xl text-[var(--color-ink-900)] mb-2">Faculty & Fellow Applications</h4>
              <p className="text-xs text-[var(--color-ink-700)] leading-relaxed mb-4">
                ZEGS regularly appoints senior industry practitioners and visiting scholars as cohort leads and studio mentors.
              </p>
              <a
                href="mailto:academic@zegs.ac.ug"
                className="inline-block px-5 py-2.5 bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] text-xs font-semibold rounded-[2px] hover:bg-[var(--color-brand-blue-700)] transition-colors"
              >
                Inquire About Academic Appointments
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
