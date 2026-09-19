'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../src/components/primitives/Breadcrumbs';
import { PullQuote } from '../../../src/components/primitives/PullQuote';
import { dataStore } from '../../../src/data/store';
import { Article } from '../../../src/domain/types';
import { ArrowRight, Calendar, Clock, User, Share2 } from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const article = slug ? dataStore.getArticleBySlug(slug) : null;

  if (!slug) return null;
  if (!article) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="font-display text-2xl text-[var(--color-ink-900)] mb-2">Essay Not Found</h1>
            <p className="text-xs text-[var(--color-ink-600)] mb-4">The article you requested is not listed in our journal.</p>
            <Link href="/news" className="text-xs font-semibold text-[var(--color-brand-blue-700)] underline">
              Back to Journal →
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const relatedArticles = dataStore.getArticles()
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        {/* Breadcrumb */}
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Journal', href: '/news' }, { label: article.title }]} />
          </div>
        </div>

        {/* 8-4 Offset Layout (archetype H) */}
        <article className="py-12 sm:py-20 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Article (Cols 1-8) */}
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-gold-600)] mb-3">
                    {article.category} • {article.readMinutes} min read
                  </div>

                  <h1 className="font-display text-3xl sm:text-5xl lg:text-5xl text-[var(--color-ink-900)] leading-tight mb-6">
                    {article.title}
                  </h1>

                  {/* Standfirst in Display */}
                  <p className="font-display text-xl sm:text-2xl font-light text-[var(--color-ink-700)] leading-relaxed pb-6 border-b border-[var(--color-paper-200)]">
                    {article.standfirst}
                  </p>
                </div>

                {/* Lead Image */}
                <div className="aspect-[16/9] bg-[var(--color-paper-200)] overflow-hidden rounded-[2px] border border-[var(--color-paper-200)]">
                  <img
                    src={article.heroImageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Body */}
                <div className="prose prose-sm sm:prose-base max-w-none text-[var(--color-ink-900)] space-y-6 leading-relaxed">
                  <p>
                    Across emerging markets in East Africa, the conventional separation of business profitability and societal ethics has created fragile enterprises. When institutions prioritize quarterly margins over foundational purpose and workforce dignity, long-term resilience is compromised.
                  </p>

                  <PullQuote
                    quote="True enterprise sustainability is not achieved by bolting on an occasional corporate donation; it is forged by embedding ethical stewardship into the core unit economics."
                    attribution={article.authorName}
                  />

                  <p>
                    At Zoe Elpis Global School, we advocate for a rigorous four-pillar integration. Purpose anchors strategic clarity; leadership develops trustworthy operational custodians; enterprise modeling ensures cash-flow viability; and deliberate impact creates durable societal wealth.
                  </p>

                  <p>
                    As practitioners, our responsibility is to move beyond superficial slogans and cultivate disciplined habits of financial transparency, customer respect, and community investment.
                  </p>
                </div>

                {/* Category Pill */}
                <div className="pt-6 border-t border-[var(--color-paper-200)] flex flex-wrap gap-2">
                  <span className="text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] px-3 py-1 text-[var(--color-ink-700)] rounded-[2px]">
                    #{article.category}
                  </span>
                  <span className="text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] px-3 py-1 text-[var(--color-ink-700)] rounded-[2px]">
                    #ZEGSJournal
                  </span>
                </div>
              </div>

              {/* Sidebar (Cols 9-12) */}
              <aside className="lg:col-span-4 space-y-8">
                {/* Author Card */}
                <div className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                  <div className="text-xs font-mono uppercase text-[var(--color-ink-500)] tracking-wider">
                    Author Profile
                  </div>
                  <h3 className="font-display text-xl text-[var(--color-ink-900)]">
                    {article.authorName}
                  </h3>
                  <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                    Faculty Fellow in Enterprise Economics and Institutional Governance at Zoe Elpis Global School.
                  </p>
                  <div className="pt-3 border-t border-[var(--color-paper-200)] text-xs text-[var(--color-ink-500)]">
                    Published on {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>

                {/* Related Essays */}
                <div className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] space-y-4">
                  <h4 className="font-display text-lg text-[var(--color-ink-900)]">Related Perspectives</h4>
                  <div className="divide-y divide-[var(--color-paper-200)]">
                    {relatedArticles.map((rel) => (
                      <div key={rel.id} className="py-3 first:pt-0 last:pb-0">
                        <span className="text-[10px] font-bold text-[var(--color-accent-gold-600)] uppercase block mb-1">
                          {rel.category}
                        </span>
                        <Link href={`/news/${rel.slug}`} className="font-display text-sm text-[var(--color-ink-900)] hover:text-[var(--color-brand-blue-700)] hover:underline block mb-1">
                          {rel.title}
                        </Link>
                        <span className="text-[11px] text-[var(--color-ink-500)]">{rel.readMinutes} min read</span>
                      </div>
                    ))}
                  </div>
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
