import { useEffect, useState } from 'react';
import { getEntry } from '../catalog';

export type Route =
  | { name: 'dashboard' }
  // moduleIndex is 0-based; undefined means "resume where the user left off"
  | { name: 'course'; standardId: string; moduleIndex?: number }
  | { name: 'exam'; standardId: string }
  | { name: 'notFound' };

// Vite's base path ("/" by default), without the trailing slash
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function parseRoute(pathname: string): Route {
  const path = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  const parts = path.split('/').filter(Boolean).map(decodeURIComponent);

  if (parts.length === 0) return { name: 'dashboard' };
  if (parts[0] !== 'curso' || !parts[1]) return { name: 'notFound' };

  const entry = getEntry(parts[1]);
  if (!entry) return { name: 'notFound' };

  if (parts.length === 2) return { name: 'course', standardId: entry.id };
  if (parts.length === 3 && parts[2] === 'examen') return { name: 'exam', standardId: entry.id };
  if (parts.length === 4 && parts[2] === 'modulo') {
    const number = Number(parts[3]);
    if (Number.isInteger(number) && number >= 1 && number <= entry.moduleCount) {
      return { name: 'course', standardId: entry.id, moduleIndex: number - 1 };
    }
  }
  return { name: 'notFound' };
}

// For app-relative links written in content, e.g. "/curso/27018/modulo/2"
export const withBase = (path: string) => `${BASE}${path}`;

export const paths = {
  dashboard: () => `${BASE}/`,
  course: (standardId: string) => `${BASE}/curso/${encodeURIComponent(standardId)}`,
  module: (standardId: string, moduleIndex: number) =>
    `${BASE}/curso/${encodeURIComponent(standardId)}/modulo/${moduleIndex + 1}`,
  exam: (standardId: string) => `${BASE}/curso/${encodeURIComponent(standardId)}/examen`,
};

const NAVIGATE_EVENT = 'app:navigate';

export function navigate(path: string, { replace = false } = {}) {
  if (path === window.location.pathname) return;
  if (replace) window.history.replaceState(null, '', path);
  else window.history.pushState(null, '', path);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(window.location.pathname));

  useEffect(() => {
    const update = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', update);
    window.addEventListener(NAVIGATE_EVENT, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(NAVIGATE_EVENT, update);
    };
  }, []);

  return route;
}
