import { useEffect, useMemo, useState } from 'react';
import { ChevronRight, Search, X, PlayCircle } from 'lucide-react';
import { catalog, getEntry, totalModules } from '../catalog';
import { loadAllCourses } from '../lib/courses';
import { buildIndex, search } from '../lib/search';
import type { Progress } from '../lib/progress';
import { paths } from '../lib/router';
import { MStripe } from './MStripe';
import { EcosystemMap } from './EcosystemMap';
import { Link } from './Link';

type SearchIndex = ReturnType<typeof buildIndex>;

export default function Dashboard({ progress }: { progress: Progress }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [wantIndex, setWantIndex] = useState(false);
  const [indexError, setIndexError] = useState(false);
  const searching = query.trim().length >= 2;

  // Search needs every course's content, which is code-split: load it on first focus or query
  useEffect(() => {
    if ((!wantIndex && !searching) || index) return;
    let cancelled = false;
    loadAllCourses()
      .then(courses => { if (!cancelled) setIndex(buildIndex(courses)); })
      .catch(() => { if (!cancelled) setIndexError(true); });
    return () => { cancelled = true; };
  }, [wantIndex, searching, index]);

  const results = useMemo(() => (index && searching ? search(index, query) : []), [index, query, searching]);

  const last = progress.lastVisited;
  const lastEntry = last ? getEntry(last.standardId) : undefined;

  return (
    <div className="min-h-screen bg-black text-[#bbbbbb] flex flex-col">
      <MStripe />

      <header className="bg-black border-b border-[#3c3c3c]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8">
          <div>
            <h1 className="text-[36px] md:text-[56px] font-bold text-white tracking-tight uppercase leading-[1.05]">
              Learning HUB.
            </h1>
            <p className="text-[16px] md:text-[20px] font-light text-[#bbbbbb] mt-2">
              {catalog.length} normas · {totalModules} módulos · cursos con preguntas y examen final
            </p>
          </div>
          <div className="relative w-full lg:w-[420px]">
            <Search className="w-5 h-5 text-[#7e7e7e] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setWantIndex(true)}
              placeholder="Buscar un control o concepto (p. ej. 8.24, consentimiento)"
              className="m-input pl-12 pr-12"
              aria-label="Buscar en todas las normas"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7e7e7e] hover:text-white"
                aria-label="Borrar búsqueda"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto w-full px-4 md:px-8 py-12 md:py-24 flex-1">
        {searching ? (
          <section aria-live="polite">
            <div className="mb-8 border-b border-[#3c3c3c] pb-4">
              <h2 className="text-[24px] md:text-[32px] font-bold text-white uppercase">
                {indexError
                  ? 'No se pudo cargar la búsqueda'
                  : !index
                    ? 'Buscando…'
                    : results.length === 0
                      ? 'Sin resultados'
                      : `${results.length} resultado${results.length === 1 ? '' : 's'}`}
              </h2>
              <p className="text-[16px] font-light mt-2">
                {indexError ? 'Comprueba tu conexión y recarga la página.' : `para «${query.trim()}»`}
              </p>
            </div>
            <ul className="space-y-4">
              {results.map(result => (
                <li key={`${result.standardId}-${result.moduleIndex}`}>
                  <Link
                    to={paths.module(result.standardId, result.moduleIndex)}
                    className="m-card block w-full text-left p-6 border border-transparent hover:border-[#3c3c3c] hover:bg-[#262626] transition-colors group"
                  >
                    <span className="block text-[12px] font-bold uppercase tracking-[1.5px] text-[#7e7e7e] mb-2">{result.standardName}</span>
                    <span className="block text-[18px] font-bold text-white group-hover:text-[#1c69d4] mb-3">{result.moduleTitle}</span>
                    <span className="block text-[14px] font-light text-[#bbbbbb] leading-relaxed">
                      {result.snippet.slice(0, result.matchStart)}
                      <mark className="bg-[#1c69d4] text-white px-0.5">{result.snippet.slice(result.matchStart, result.matchStart + result.matchLength)}</mark>
                      {result.snippet.slice(result.matchStart + result.matchLength)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <>
            {last && lastEntry && (
              <Link
                to={paths.module(lastEntry.id, last.moduleIndex)}
                className="w-full mb-16 md:mb-24 p-6 md:p-8 border border-[#1c69d4] bg-[#0d0d0d] hover:bg-[#1a1a1a] transition-colors flex items-center justify-between gap-6 text-left group"
              >
                <div className="min-w-0">
                  <span className="block text-[12px] font-bold uppercase tracking-[1.5px] text-[#1c69d4] mb-2">Continuar donde lo dejaste</span>
                  <span className="block text-[20px] md:text-[24px] font-bold text-white uppercase truncate">
                    {last.moduleTitle ?? `Módulo ${last.moduleIndex + 1}`}
                  </span>
                  <span className="block text-[14px] font-light text-[#bbbbbb] mt-1">
                    {lastEntry.name} · Módulo {last.moduleIndex + 1} de {lastEntry.moduleCount}
                  </span>
                </div>
                <PlayCircle className="w-10 h-10 text-white flex-shrink-0 group-hover:text-[#1c69d4] transition-colors" />
              </Link>
            )}

            {Array.from(new Set(catalog.map(entry => entry.category))).map(category => (
              <section key={category} className="mb-16 md:mb-24">
                <div className="mb-8 md:mb-12 border-b border-[#3c3c3c] pb-4">
                  <h2 className="text-[24px] md:text-[32px] font-bold text-white uppercase leading-[1.15]">{category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catalog.filter(entry => entry.category === category).map(entry => {
                    const percent = progress.progressPercent(entry.id);
                    const done = progress.completedCount(entry.id);
                    const exam = progress.exams[entry.id];
                    const action = done === 0 ? 'Empezar' : done === entry.moduleCount ? 'Repasar' : 'Continuar';
                    return (
                      <Link
                        key={entry.id}
                        to={paths.course(entry.id)}
                        className="m-card p-6 md:p-8 group text-left hover:bg-[#262626] transition-colors border border-transparent hover:border-[#3c3c3c] flex flex-col h-full"
                      >
                        <div className="flex justify-between items-start mb-10 md:mb-16 text-[12px] font-bold tracking-[1.5px] uppercase w-full">
                          <span className="text-white">
                            {entry.moduleCount} módulos
                            {entry.generated && <span className="text-[#7e7e7e]"> · Generado con IA</span>}
                          </span>
                          {exam && (
                            <span className={exam.best >= 70 ? 'text-[#1c69d4]' : 'text-[#7e7e7e]'}>Examen: {exam.best}%</span>
                          )}
                        </div>

                        <h3 className="text-[22px] md:text-[24px] leading-[1.3] font-bold text-white uppercase mb-4 group-hover:text-[#1c69d4] transition-colors">
                          {entry.name}
                        </h3>
                        <p className="text-[16px] font-light text-[#bbbbbb] mb-10 md:mb-12 flex-1">{entry.desc}</p>

                        <div className="mt-auto w-full">
                          <div className="flex items-center justify-between text-[14px] font-bold tracking-[1.5px] uppercase mb-4 text-[#7e7e7e]">
                            <span>{done}/{entry.moduleCount} completados</span>
                            <span>{percent}%</span>
                          </div>
                          <div className="w-full bg-black h-1">
                            <div className="bg-white h-full transition-all" style={{ width: `${percent}%` }}></div>
                          </div>
                          <div className="mt-8 flex items-center text-[14px] font-bold uppercase tracking-[1.5px] text-white">
                            {action} <ChevronRight className="w-4 h-4 ml-2" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}

            <EcosystemMap />
          </>
        )}
      </main>

      <footer className="bg-black border-t border-[#3c3c3c] py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto text-[14px] font-light text-[#7e7e7e]">
          © {new Date().getFullYear()} Learning HUB · Material de estudio. No sustituye al texto oficial de las normas.
        </div>
      </footer>
    </div>
  );
}
