import { lazy, Suspense, useEffect } from 'react';
import { getEntry } from './catalog';
import { useProgress } from './lib/progress';
import { navigate, paths, useRoute, type Route } from './lib/router';
import Dashboard from './components/Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Link } from './components/Link';
import { MStripe } from './components/MStripe';

// Course and exam views pull in react-markdown and the course content, so they load on demand
const CourseView = lazy(() => import('./components/CourseView'));
const ExamView = lazy(() => import('./components/ExamView'));

const SITE_NAME = 'Learning HUB';

function pageTitle(route: Route) {
  if (route.name === 'dashboard') return SITE_NAME;
  if (route.name === 'notFound') return `Página no encontrada · ${SITE_NAME}`;
  const entry = getEntry(route.standardId);
  if (route.name === 'exam') return `Examen · ${entry?.name} · ${SITE_NAME}`;
  const module = route.moduleIndex !== undefined ? `Módulo ${route.moduleIndex + 1} · ` : '';
  return `${module}${entry?.name} · ${SITE_NAME}`;
}

function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <MStripe />
      <div className="flex-1 flex items-center justify-center text-[14px] font-bold uppercase tracking-[1.5px] text-[#7e7e7e]" role="status">
        Cargando…
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <MStripe />
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-[28px] md:text-[40px] font-bold text-white uppercase mb-4">Página no encontrada</h1>
        <p className="text-[16px] font-light text-[#bbbbbb] mb-10">La norma o el módulo que buscas no existe.</p>
        <Link to={paths.dashboard()} className="m-button">Volver al inicio</Link>
      </div>
    </div>
  );
}

function App() {
  const route = useRoute();
  const progress = useProgress();
  // "/curso/:id" resumes where the user left off in that standard, then canonicalizes the URL
  const resumeIndex =
    route.name === 'course' && route.moduleIndex === undefined
      ? Math.min(progress.positions[route.standardId] ?? 0, (getEntry(route.standardId)?.moduleCount ?? 1) - 1)
      : undefined;

  useEffect(() => {
    if (route.name === 'course' && resumeIndex !== undefined) {
      navigate(paths.module(route.standardId, resumeIndex), { replace: true });
    }
  }, [route, resumeIndex]);

  useEffect(() => {
    document.title = pageTitle(route);
    // Course views scroll their own content area; this resets the page for the other views
    window.scrollTo(0, 0);
  }, [route]);

  if (route.name === 'dashboard') return <Dashboard progress={progress} />;
  if (route.name === 'notFound') return <NotFound />;

  const entry = getEntry(route.standardId)!;
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        {route.name === 'exam' ? (
          <ExamView key={entry.id} entry={entry} progress={progress} />
        ) : route.moduleIndex !== undefined ? (
          <CourseView entry={entry} moduleIndex={route.moduleIndex} progress={progress} />
        ) : (
          <Loading />
        )}
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
