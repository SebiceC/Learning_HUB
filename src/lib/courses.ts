import { catalog, getEntry, type LoadedCourse } from '../catalog';
import type { CourseModule, Question } from '../types';

// One promise per standard, so React's use() receives a stable promise across renders
const cache = new Map<string, Promise<LoadedCourse>>();

export function loadCourse(standardId: string): Promise<LoadedCourse> {
  let promise = cache.get(standardId);
  if (!promise) {
    const entry = getEntry(standardId);
    if (!entry) return Promise.reject(new Error(`Norma desconocida: ${standardId}`));

    promise = entry.load().then(loaded => {
      if (import.meta.env.DEV && loaded.course.modules.length !== entry.moduleCount) {
        console.warn(`catalog.ts: moduleCount de ${standardId} es ${entry.moduleCount}, pero el curso tiene ${loaded.course.modules.length} módulos`);
      }
      return loaded;
    });
    // Drop failed loads (e.g. offline) so a later attempt can retry
    promise.catch(() => cache.delete(standardId));
    cache.set(standardId, promise);
  }
  return promise;
}

export const loadAllCourses = () =>
  Promise.all(catalog.map(entry => loadCourse(entry.id).then(loaded => ({ entry, ...loaded }))));

// Module's own quiz first, then the extra questions from data/questions
export const getQuestions = (module: CourseModule, extraQuestions: Record<string, Question[]>): Question[] => [
  module.quiz,
  ...(extraQuestions[module.id] ?? []),
];
