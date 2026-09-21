// Lightweight client for the /api/views serverless function.
// Fails silently (returns null/empty) so a missing KV store or network
// hiccup never breaks the articles pages — it just means view counts
// don't show yet, instead of showing a fake number.

export const fetchViewCounts = async (slugs: (string | number)[]): Promise<Record<string, number>> => {
  const cleanSlugs = slugs.map((s) => String(s)).filter(Boolean);
  if (cleanSlugs.length === 0) return {};

  try {
    const response = await fetch(`/api/views?slugs=${encodeURIComponent(cleanSlugs.join(','))}`);
    if (!response.ok) return {};
    const data = await response.json();
    if (!data || typeof data !== 'object') return {};
    return data as Record<string, number>;
  } catch (error) {
    console.warn('Could not load article view counts:', error);
    return {};
  }
};

export const incrementViewCount = async (slug: string | number): Promise<number | null> => {
  try {
    const response = await fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: String(slug) })
    });
    if (!response.ok) return null;
    const data = await response.json();
    return typeof data?.views === 'number' ? data.views : null;
  } catch (error) {
    console.warn('Could not record article view:', error);
    return null;
  }
};
