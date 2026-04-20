import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, '');
  const now = new Date().toISOString();
  const posts = getAllPosts();

  const staticRoutes = [
    { path: '', changeFrequency: 'always' as const, priority: 1 },
    { path: '/blog', changeFrequency: 'daily' as const, priority: 0.9 },
    { path: '/history', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/disclaimer', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/terms-of-service', changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const allRoutes = [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.path || '/'}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...blogRoutes,
  ];

  return allRoutes;
}
