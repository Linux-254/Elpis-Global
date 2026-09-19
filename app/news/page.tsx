'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';
import { dataStore } from '../../src/data/store';
import { ArrowRight } from 'lucide-react';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const allArticles = dataStore.getArticles();

  const categories = ['all', 'Institutional Thought', 'Enterprise Economics', 'Leadership', 'Impact'];

  const filteredArticles = selectedCategory === 'all'
    ? allArticles
    : allArticles.filter((a) => a.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'The ZEGS Journal' }]} />
          </div>
        </div>

        <section className="py-12 sm:py-16 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-ink-900)] leading-tight mb-4">
                The ZEGS Journal & Insights
              </h1>
              <p className="font-display text-lg sm:text-xl font-light text-[var(--color-ink-700)] leading-relaxed">
                Essays, research notes, and policy critiques from our faculty, fellows, and visiting practitioners.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[var(--color-paper-100)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[var(--color-paper-200)]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-[2px] capitalize transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)]'
                      : 'text-[var(--color-ink-700)] hover:bg-[var(--color-paper-200)]'
                  }`}
                >
                  {cat === 'all' ? 'All Essays' : cat}
                </button>
              ))}
            </div>

            {/* Articles Grid (archetype E) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  className="bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] overflow-hidden flex flex-col justify-between hover:border-[var(--color-brand-blue-700)] transition-colors"
                >
                  <div>
                    <div className="aspect-[16/10] bg-[var(--color-paper-200)] overflow-hidden border-b border-[var(--color-paper-200)]">
                      <img
                        src={art.heroImageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-6">
                      <div className="text-[11px] font-semibold text-[var(--color-accent-gold-600)] uppercase tracking-wider mb-2">
                        {art.category} • {art.readMinutes} min read
                      </div>
                      <h2 className="font-display text-xl sm:text-2xl text-[var(--color-ink-900)] mb-3 leading-snug">
                        <Link href={`/news/${art.slug}`} className="hover:text-[var(--color-brand-blue-700)] hover:underline">
                          {art.title}
                        </Link>
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed line-clamp-3">
                        {art.standfirst}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-[var(--color-paper-200)] bg-[var(--color-paper-100)] flex items-center justify-between text-xs text-[var(--color-ink-500)]">
                    <span>By {art.authorName}</span>
                    <Link href={`/news/${art.slug}`} className="font-semibold text-[var(--color-brand-blue-700)] hover:underline">
                      Read →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
