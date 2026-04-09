import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, '');

  const now = new Date().toISOString();

  const staticRoutes = [
    { path: '', changeFrequency: 'always' as const, priority: 1 },
    { path: '/history', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/disclaimer', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/terms-of-service', changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path || '/'}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
