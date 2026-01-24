
import { getAllVenues, getAllPosts, getAllEvents } from '../lib/api/wordpress';

import type { APIContext } from 'astro';

export async function GET({ site }: APIContext) {
  const baseUrl = site?.origin || 'https://comolocal.es';
  const date = new Date().toISOString();

  // 1. Define Static Pages (with trailing slashes)
  const staticPages = [
    '/',
    '/venues/',
    '/events/',
    '/blog/',
    '/map/',
    '/contact/',
    '/privacy/',
    '/terms/',
    '/sitemap/',
  ];

  // 2. Fetch Dynamic Content from WordPress
  const [venues, posts, events] = await Promise.all([
    getAllVenues(),
    getAllPosts(),
    getAllEvents()
  ]);

  // 3. Helper to generate URL XML tag
  const createUrlObject = (path: string, priority = 0.8) => {
    return `
      <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${date}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${priority}</priority>
      </url>
    `;
  };

  // 4. Generate XML content
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      
      <!-- Static Pages -->
      ${staticPages.map(page => createUrlObject(page, page === '/' ? 1.0 : 0.8)).join('')}

      <!-- Venues -->
      ${venues.map((venue: any) => createUrlObject(`/venues/${venue.slug}/`, 0.9)).join('')}

      <!-- Blog Posts -->
      ${posts.map((post: any) => createUrlObject(`/blog/${post.slug}/`, 0.7)).join('')}

      <!-- Events -->
      ${events.map((event: any) => createUrlObject(`/events/${event.slug}/`, 0.7)).join('')}

    </urlset>
  `.trim();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
