import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Anda dapat menambahkan URL blog atau URL dinamis Anda di sini juga ke depannya
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const staticRoutes = [
    '',
    '/history',
    '/contact',
    '/disclaimer',
    '/privacy-policy',
    '/terms-of-service',
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}${route === '' ? '/' : ''}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? 'always' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes as MetadataRoute.Sitemap;
}
