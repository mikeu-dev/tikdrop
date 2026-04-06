import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tikdrop.my.id').replace(/\/$/, '');

  const staticRoutes = [
    '',
    '/history',
    '/contact',
    '/disclaimer',
    '/privacy-policy',
    '/terms-of-service',
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route || '/'}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'always' : 'weekly') as 'always' | 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
