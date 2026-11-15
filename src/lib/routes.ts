export type Route =
  | { name: 'section'; section: 'live' | 'schedule' | 'highlights' }
  | { name: 'watch'; slug: string };

export const SECTION_PATHS = {
  live: '/',
  schedule: '/schedule',
  highlights: '/highlights',
} as const;

export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#/, '') || '/';
  const watch = /^\/watch\/([a-z0-9-]+)$/.exec(path);
  if (watch) return { name: 'watch', slug: watch[1] };
  if (path === SECTION_PATHS.schedule) return { name: 'section', section: 'schedule' };
  if (path === SECTION_PATHS.highlights) return { name: 'section', section: 'highlights' };
  return { name: 'section', section: 'live' };
}

export function watchPath(slug: string): string {
  return `/watch/${slug}`;
}
