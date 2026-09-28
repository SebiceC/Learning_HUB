import type { CatalogEntry, LoadedCourse } from '../catalog';

export interface SearchResult {
  standardId: string;
  standardName: string;
  moduleIndex: number;
  moduleTitle: string;
  snippet: string;
  matchStart: number;
  matchLength: number;
}

export type SearchableCourse = LoadedCourse & { entry: CatalogEntry };

interface IndexEntry {
  entry: CatalogEntry;
  moduleIndex: number;
  moduleTitle: string;
  text: string;
  normalized: string;
}

// Lowercase and strip accents so "criptografia" matches "Criptografía".
// NFD decomposition keeps one char per base letter after removing marks, so indexes stay aligned.
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const stripMarkdown = (markdown: string) =>
  markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export function buildIndex(courses: SearchableCourse[]): IndexEntry[] {
  return courses.flatMap(({ entry, course }) =>
    course.modules.map((mod, moduleIndex) => {
      const text = `${mod.title}. ${stripMarkdown(mod.content)}`;
      return { entry, moduleIndex, moduleTitle: mod.title, text, normalized: normalize(text) };
    })
  );
}

const SNIPPET_RADIUS = 70;
const MAX_RESULTS = 40;

export function search(index: IndexEntry[], query: string): SearchResult[] {
  const needle = normalize(query.trim());
  if (needle.length < 2) return [];

  const results: SearchResult[] = [];
  for (const item of index) {
    const position = item.normalized.indexOf(needle);
    if (position === -1) continue;

    const start = Math.max(0, position - SNIPPET_RADIUS);
    const end = Math.min(item.text.length, position + needle.length + SNIPPET_RADIUS);
    const prefix = start > 0 ? '…' : '';
    results.push({
      standardId: item.entry.id,
      standardName: item.entry.name,
      moduleIndex: item.moduleIndex,
      moduleTitle: item.moduleTitle,
      snippet: prefix + item.text.slice(start, end) + (end < item.text.length ? '…' : ''),
      matchStart: prefix.length + position - start,
      matchLength: needle.length,
    });
    if (results.length >= MAX_RESULTS) break;
  }
  return results;
}
