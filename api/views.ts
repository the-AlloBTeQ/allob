import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';
import { setSecurityHeaders } from '../src/lib/cors';

// Minimal, database-free view counter backed by Upstash Redis (installed via
// the Vercel Marketplace "Redis" integration) — not the Mongo/Prisma stack
// elsewhere in this repo, and not the deprecated Vercel KV product.
//
// GET  /api/views?slugs=1,2,3   -> { "1": 12, "2": 0, "3": 5 }  (read-only, no increment)
// POST /api/views  { slug }     -> { slug: "1", views: 13 }      (atomic increment)

const redis = Redis.fromEnv();

const KEY_PREFIX = 'article:views:';
const MAX_SLUGS = 50;
const MAX_SLUG_LENGTH = 50;

const isValidSlug = (slug: unknown): slug is string =>
  typeof slug === 'string' && slug.length > 0 && slug.length <= MAX_SLUG_LENGTH && /^[a-zA-Z0-9_-]+$/.test(slug);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Clickjacking / MIME-sniffing / CSP protection - previously defined in
  // lib/cors.ts but never applied to any deployed response.
  setSecurityHeaders(res);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const raw = typeof req.query.slugs === 'string' ? req.query.slugs : '';
      const slugs = raw
        .split(',')
        .map((s) => s.trim())
        .filter(isValidSlug)
        .slice(0, MAX_SLUGS);

      if (slugs.length === 0) {
        res.status(400).json({ error: 'Missing or invalid slugs query parameter' });
        return;
      }

      const keys = slugs.map((slug) => `${KEY_PREFIX}${slug}`);
      const values = await redis.mget<number[]>(...keys);

      const result: Record<string, number> = {};
      slugs.forEach((slug, index) => {
        result[slug] = values[index] ?? 0;
      });

      res.status(200).json(result);
      return;
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const slug = body.slug;

      if (!isValidSlug(slug)) {
        res.status(400).json({ error: 'Missing or invalid slug' });
        return;
      }

      const views = await redis.incr(`${KEY_PREFIX}${slug}`);
      res.status(200).json({ slug, views });
      return;
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('views api error:', error);
    res.status(500).json({ error: 'Internal error' });
  }
}
