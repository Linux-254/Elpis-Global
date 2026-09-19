import type { Metadata } from 'next';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../src/components/primitives/Breadcrumbs';
import { BRAND_STRINGS } from '../../../src/content/strings';

export const metadata: Metadata = {
  title: 'Our Story & Relationship with AgapeElpis',
  description: 'The founding narrative of Zoe Elpis Global School and its institutional relationship with the AgapeElpis community.'
};

export default function StoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Our Story' }]} />
          </div>
        </div>

        <article className="py-16 sm:py-24 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-4" />
                  <h1 className="font-display text-3xl sm:text-5xl text-[var(--color-ink-900)] leading-tight mb-6">
                    {BRAND_STRINGS.story.heading}
                  </h1>
                  <p className="font-display text-xl sm:text-2xl font-light text-[var(--color-ink-700)] leading-relaxed">
                    {BRAND_STRINGS.story.standfirst}
                  </p>
                </div>

                <div className="space-y-6 text-base text-[var(--color-ink-900)] leading-relaxed border-t border-[var(--color-paper-200)] pt-8">
                  {BRAND_STRINGS.story.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Clear distinction section */}
                <div className="bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] p-6 sm:p-8 rounded-[2px] space-y-4">
                  <h3 className="font-display text-xl text-[var(--color-ink-900)]">
                    Institutional Relationship & Distinction
                  </h3>
                  <p className="text-sm text-[var(--color-ink-700)] leading-relaxed">
                    While born from the same ecosystem of hope, character, and service that birthed AgapeElpis, <strong>Zoe Elpis Global School (ZEGS)</strong> operates as an independent academic and executive training institution. Our focus is specialized education, formal certification, executive mentorship, and structured venture incubation.
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-8">
                <div className="aspect-[3/4] bg-[var(--color-paper-200)] overflow-hidden rounded-[2px] border border-[var(--color-paper-200)]">
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop"
                    alt="Facilitator guiding a cohort workshop"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]">
                  <h4 className="font-display text-lg text-[var(--color-ink-900)] mb-2">Institutional Inquiries</h4>
                  <p className="text-xs text-[var(--color-ink-700)] leading-relaxed mb-4">
                    For partnerships, institutional accreditations, or bespoke enterprise cohorts, contact the Registrar’s office.
                  </p>
                  <a
                    href="mailto:registrar@zegs.ac.ug"
                    className="text-xs font-semibold text-[var(--color-brand-blue-700)] hover:underline"
                  >
                    registrar@zegs.ac.ug →
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
