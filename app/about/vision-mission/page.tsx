import type { Metadata } from 'next';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../src/components/primitives/Breadcrumbs';
import { BRAND_STRINGS } from '../../../src/content/strings';

export const metadata: Metadata = {
  title: 'Vision & Mission',
  description: 'The long-term vision and programmatic mission driving Zoe Elpis Global School.'
};

export default function VisionMissionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Vision & Mission' }]} />
          </div>
        </div>

        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl mb-16">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-ink-900)] leading-tight mb-4">
                Vision & Institutional Mission
              </h1>
              <p className="font-display text-xl text-[var(--color-ink-700)] font-light leading-relaxed">
                Building an enduring hub for ethical enterprise builders, transformative leaders, and community innovators across Africa and beyond.
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <div className="bg-[var(--color-paper-100)] border-t-4 border-[var(--color-brand-blue-700)] p-8 sm:p-10 rounded-[2px] space-y-4">
                <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-brand-blue-700)]">
                  Our Vision
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-ink-900)]">
                  The Long-Term Horizon
                </h2>
                <p className="text-base sm:text-lg text-[var(--color-ink-800)] leading-relaxed font-serif italic">
                  &ldquo;{BRAND_STRINGS.vision}&rdquo;
                </p>
                <p className="text-xs text-[var(--color-ink-600)] pt-4 border-t border-[var(--color-paper-200)]">
                  Anchored on human dignity, generational stewardship, and economic resilience.
                </p>
              </div>

              <div className="bg-[var(--color-paper-100)] border-t-4 border-[var(--color-accent-gold-600)] p-8 sm:p-10 rounded-[2px] space-y-4">
                <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-accent-gold-600)]">
                  Our Mission
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-ink-900)]">
                  Practical Mandate
                </h2>
                <p className="text-base sm:text-lg text-[var(--color-ink-800)] leading-relaxed font-serif italic">
                  &ldquo;{BRAND_STRINGS.mission}&rdquo;
                </p>
                <p className="text-xs text-[var(--color-ink-600)] pt-4 border-t border-[var(--color-paper-200)]">
                  Executed across our 4 Schools, 5 Competency Levels, and Live Venture Studio.
                </p>
              </div>
            </div>

            {/* How we deliver (archetype B / C) */}
            <div className="border-t border-[var(--color-paper-200)] pt-16">
              <h3 className="font-display text-2xl sm:text-3xl text-[var(--color-ink-900)] mb-8">
                How We Deliver the Mission Across Four Pillars
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {BRAND_STRINGS.pillars.map((p, i) => (
                  <div key={p.id} className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                    <span className="font-mono text-xs text-[var(--color-ink-500)]">0{i + 1}</span>
                    <h4 className="font-display text-xl text-[var(--color-ink-900)]">{p.label}</h4>
                    <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                      {p.statement}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
