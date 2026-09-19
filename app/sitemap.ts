import { MetadataRoute } from 'next';
import { dataStore } from '../src/data/store';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zegs.ac.ug';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/about/story',
    '/about/vision-mission',
    '/about/values',
    '/about/leadership',
    '/schools',
    '/programs',
    '/programs/foundation',
    '/programs/professional',
    '/programs/advanced',
    '/programs/executive',
    '/programs/fellowship',
    '/learning',
    '/learning/model',
    '/learning/online',
    '/learning/physical',
    '/learning/blended',
    '/events',
    '/news',
    '/impact',
    '/mentorship',
    '/admissions',
    '/apply',
    '/verify',
    '/contact',
    '/privacy',
    '/terms',
    '/sitemap'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/programs') || route.startsWith('/apply') ? 0.9 : 0.8
  }));

  const schools = dataStore.getSchools().map((s) => ({
    url: `${baseUrl}/schools/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85
  }));

  const programs = dataStore.getPrograms().map((p) => ({
    url: `${baseUrl}/programs/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }));

  const articles = dataStore.getArticles().map((a) => ({
    url: `${baseUrl}/news/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  const events = dataStore.getEvents().map((e) => ({
    url: `${baseUrl}/events/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8
  }));

  return [...staticRoutes, ...schools, ...programs, ...articles, ...events];
}
