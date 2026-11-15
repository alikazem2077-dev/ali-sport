import { useEffect, useState } from 'react';
import { parseRoute, type Route } from '@/lib/routes';

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));

  useEffect(() => {
    const handleChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener('hashchange', handleChange);
    return () => window.removeEventListener('hashchange', handleChange);
  }, []);

  return route;
}

export function navigateTo(path: string): void {
  window.location.hash = path;
}
