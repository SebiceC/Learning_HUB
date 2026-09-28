import { useCallback } from 'react';
import { usePersistentState } from './storage';
import { getEntry } from '../catalog';

// Keys: module = "<standardId>:<moduleId>", answer = "<standardId>:<moduleId>:<questionIndex>"
export const moduleKey = (standardId: string, moduleId: string) => `${standardId}:${moduleId}`;
export const answerKey = (standardId: string, moduleId: string, questionIndex: number) =>
  `${standardId}:${moduleId}:${questionIndex}`;

export interface LastVisited {
  standardId: string;
  moduleIndex: number;
  // Stored so the dashboard can show it without loading the course
  moduleTitle?: string;
}

export interface ExamResult {
  best: number;
  last: number;
  attempts: number;
}

const withoutPrefix = <T,>(record: Record<string, T>, prefix: string) =>
  Object.fromEntries(Object.entries(record).filter(([key]) => !key.startsWith(prefix)));

export function useProgress() {
  const [answers, setAnswers] = usePersistentState<Record<string, number>>('iso-hub:answers', {});
  const [completed, setCompleted] = usePersistentState<Record<string, boolean>>('iso-hub:completed-modules', {});
  const [lastVisited, setLastVisitedState] = usePersistentState<LastVisited | null>('iso-hub:last-visited', null);
  // Last module index per standard, so each course resumes where it was left
  const [positions, setPositions] = usePersistentState<Record<string, number>>('iso-hub:positions', {});
  const [exams, setExams] = usePersistentState<Record<string, ExamResult>>('iso-hub:exams', {});

  const setLastVisited = useCallback((visit: LastVisited) => {
    setLastVisitedState(visit);
    setPositions(prev => (prev[visit.standardId] === visit.moduleIndex ? prev : { ...prev, [visit.standardId]: visit.moduleIndex }));
  }, [setLastVisitedState, setPositions]);

  const answer = (standardId: string, moduleId: string, questionIndex: number, option: number) =>
    setAnswers(prev => ({ ...prev, [answerKey(standardId, moduleId, questionIndex)]: option }));

  const completeModule = (standardId: string, moduleId: string) =>
    setCompleted(prev => ({ ...prev, [moduleKey(standardId, moduleId)]: true }));

  // Clears the module's answers so its questions can be retried; completion is kept
  const retryModule = (standardId: string, moduleId: string) =>
    setAnswers(prev => withoutPrefix(prev, `${moduleKey(standardId, moduleId)}:`));

  const resetStandard = (standardId: string) => {
    setAnswers(prev => withoutPrefix(prev, `${standardId}:`));
    setCompleted(prev => withoutPrefix(prev, `${standardId}:`));
    setExams(prev => Object.fromEntries(Object.entries(prev).filter(([id]) => id !== standardId)));
    setLastVisitedState(prev => (prev?.standardId === standardId ? null : prev));
    setPositions(prev => Object.fromEntries(Object.entries(prev).filter(([id]) => id !== standardId)));
  };

  const recordExam = (standardId: string, score: number) =>
    setExams(prev => {
      const current = prev[standardId];
      return {
        ...prev,
        [standardId]: {
          best: Math.max(score, current?.best ?? 0),
          last: score,
          attempts: (current?.attempts ?? 0) + 1,
        },
      };
    });

  // Counted from the stored keys, so the dashboard does not need to load course content
  const completedCount = (standardId: string) => {
    const total = getEntry(standardId)?.moduleCount ?? 0;
    const done = Object.keys(completed).filter(key => key.startsWith(`${standardId}:`) && completed[key]).length;
    return Math.min(done, total);
  };

  const progressPercent = (standardId: string) => {
    const total = getEntry(standardId)?.moduleCount ?? 0;
    return total ? Math.round((completedCount(standardId) / total) * 100) : 0;
  };

  return {
    answers, completed, lastVisited, positions, exams,
    answer, completeModule, retryModule, resetStandard, recordExam,
    setLastVisited, completedCount, progressPercent,
  };
}

export type Progress = ReturnType<typeof useProgress>;
