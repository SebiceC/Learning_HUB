import { use, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Circle, CheckCircle2, List, X, RotateCcw, GraduationCap } from 'lucide-react';
import { getEntry, type CatalogEntry } from '../catalog';
import { getQuestions, loadCourse } from '../lib/courses';
import { answerKey, moduleKey, type Progress } from '../lib/progress';
import { navigate, paths } from '../lib/router';
import { MStripe } from './MStripe';
import { Markdown } from './Markdown';
import { QuestionCard } from './QuestionCard';
import { Link } from './Link';

interface CourseViewProps {
  entry: CatalogEntry;
  moduleIndex: number;
  progress: Progress;
}

export default function CourseView({ entry, moduleIndex, progress }: CourseViewProps) {
  const { course, extraQuestions } = use(loadCourse(entry.id));
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const currentModule = course.modules[moduleIndex];
  const questions = getQuestions(currentModule, extraQuestions);
  const selectedFor = (qi: number) => progress.answers[answerKey(entry.id, currentModule.id, qi)];
  const answeredCount = questions.filter((_, qi) => selectedFor(qi) !== undefined).length;
  const correctCount = questions.filter((q, qi) => selectedFor(qi) === q.answerIndex).length;
  const allAnswered = answeredCount === questions.length;
  const isLast = moduleIndex === course.modules.length - 1;
  const percent = progress.progressPercent(entry.id);
  const { setLastVisited } = progress;

  // Scroll the content area (not the window) back to the top and remember the position
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
    setLastVisited({ standardId: entry.id, moduleIndex, moduleTitle: currentModule.title });
  }, [entry.id, moduleIndex, currentModule.title, setLastVisited]);

  const completeAndContinue = () => {
    progress.completeModule(entry.id, currentModule.id);
    if (!isLast) navigate(paths.module(entry.id, moduleIndex + 1));
  };

  const outline = (
    <ul className="py-4 flex-1 overflow-y-auto">
      {course.modules.map((mod, idx) => {
        const isActive = idx === moduleIndex;
        const isCompleted = progress.completed[moduleKey(entry.id, mod.id)];
        return (
          <li key={mod.id}>
            <Link
              to={paths.module(entry.id, idx)}
              onClick={() => setOutlineOpen(false)}
              aria-current={isActive ? 'page' : undefined}
              className={`group w-full text-left px-6 py-4 transition-colors relative flex items-start ${isActive ? 'bg-[#1a1a1a]' : 'hover:bg-[#0d0d0d]'}`}
            >
              <span className="mt-0.5 mr-4 flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <Circle className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#3c3c3c]'}`} />
                )}
              </span>
              <span className={`text-[16px] leading-tight ${isActive ? 'text-white font-bold' : isCompleted ? 'text-[#7e7e7e] font-light' : 'text-[#bbbbbb] font-light group-hover:text-white'}`}>
                {mod.title}
              </span>
              {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#1c69d4]"></span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  const outlineFooter = (
    <div className="p-6 border-t border-[#3c3c3c] space-y-4">
      <Link to={paths.exam(entry.id)} className="m-button w-full">
        <GraduationCap className="w-4 h-4 mr-2" /> Examen final
      </Link>
      {confirmReset ? (
        <div className="text-[14px] text-[#bbbbbb]">
          <p className="mb-3">¿Borrar el progreso, las respuestas y los exámenes de esta norma?</p>
          <div className="flex gap-3">
            <button
              onClick={() => { progress.resetStandard(entry.id); setConfirmReset(false); }}
              className="flex-1 h-10 bg-[#e22718] text-white text-[12px] font-bold uppercase tracking-[1.5px]"
            >
              Sí, reiniciar
            </button>
            <button onClick={() => setConfirmReset(false)} className="flex-1 h-10 border border-[#3c3c3c] text-white text-[12px] font-bold uppercase tracking-[1.5px]">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setConfirmReset(true)}
          className="w-full flex items-center justify-center text-[12px] font-bold uppercase tracking-[1.5px] text-[#7e7e7e] hover:text-[#e22718] transition-colors"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Reiniciar progreso
        </button>
      )}
    </div>
  );

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      <header className="bg-black border-b border-[#3c3c3c] flex flex-col z-20">
        <div className="px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-8 min-w-0">
            <Link
              to={paths.dashboard()}
              className="text-white hover:text-[#bbbbbb] transition-colors flex items-center text-[14px] font-bold uppercase tracking-[1.5px] flex-shrink-0"
              aria-label="Volver al inicio"
            >
              <ChevronLeft className="w-5 h-5 md:mr-2" />
              <span className="hidden md:inline">Inicio</span>
            </Link>
            <div className="h-6 w-px bg-[#3c3c3c] hidden md:block"></div>
            <h1 className="text-[16px] md:text-[20px] font-bold text-white uppercase tracking-wider truncate">{course.title}</h1>
          </div>
          <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
            <div className="hidden md:block text-[12px] uppercase tracking-[1.5px] text-[#7e7e7e]">Progreso</div>
            <div className="hidden sm:block w-24 md:w-32 bg-[#1a1a1a] h-1">
              <div className="bg-white h-1 transition-all duration-500" style={{ width: `${percent}%` }}></div>
            </div>
            <span className="text-[14px] font-bold text-white">{percent}%</span>
            <button
              onClick={() => setOutlineOpen(true)}
              className="lg:hidden text-white flex items-center text-[12px] font-bold uppercase tracking-[1.5px]"
              aria-label="Abrir índice del curso"
            >
              <List className="w-5 h-5 sm:mr-2" />
              <span className="hidden sm:inline">Índice</span>
            </button>
          </div>
        </div>
        <MStripe />
      </header>

      <div className="flex flex-1 overflow-hidden bg-black">
        {/* Desktop outline */}
        <aside className="w-80 bg-black border-r border-[#3c3c3c] flex-col hidden lg:flex">
          <div className="p-6 border-b border-[#3c3c3c]">
            <h2 className="text-[14px] font-bold tracking-[1.5px] text-[#7e7e7e] uppercase">
              Índice · {progress.completedCount(entry.id)}/{course.modules.length}
            </h2>
          </div>
          {outline}
          {outlineFooter}
        </aside>

        {/* Mobile outline drawer */}
        {outlineOpen && (
          <div className="fixed inset-0 z-30 lg:hidden flex">
            <button className="absolute inset-0 bg-black/70" onClick={() => setOutlineOpen(false)} aria-label="Cerrar índice"></button>
            <aside className="relative ml-auto w-[85%] max-w-sm h-full bg-black border-l border-[#3c3c3c] flex flex-col">
              <div className="p-6 border-b border-[#3c3c3c] flex items-center justify-between">
                <h2 className="text-[14px] font-bold tracking-[1.5px] text-[#7e7e7e] uppercase">
                  Índice · {progress.completedCount(entry.id)}/{course.modules.length}
                </h2>
                <button onClick={() => setOutlineOpen(false)} className="text-white" aria-label="Cerrar índice">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {outline}
              {outlineFooter}
            </aside>
          </div>
        )}

        <main ref={mainRef} className="flex-1 flex flex-col relative overflow-y-auto pb-32">
          <div className="w-full bg-black py-12 md:py-24 px-4 md:px-16 border-b border-[#3c3c3c]">
            <div className="max-w-4xl mx-auto">
              <p className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#7e7e7e] mb-4">
                Módulo {moduleIndex + 1} de {course.modules.length}
              </p>
              <h1 className="text-[32px] md:text-[56px] leading-[1.05] font-bold text-white uppercase mb-4">
                {currentModule.title}
              </h1>
              <p className="text-[16px] md:text-[20px] font-light text-[#bbbbbb]">
                {entry.name} · {course.description}
              </p>
              {entry.generated && (
                <p className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#7e7e7e] mt-4">
                  Generado con IA desde {entry.generated.source} · {entry.generated.date}
                </p>
              )}
            </div>
          </div>

          <div className="max-w-4xl mx-auto w-full px-4 py-8 md:p-16">
            <div className="mb-16 md:mb-24">
              <Markdown content={currentModule.content} />
            </div>

            <div className="flex items-end justify-between border-b border-[#3c3c3c] pb-4 mb-8">
              <h2 className="text-[20px] md:text-[24px] font-bold text-white uppercase">Comprueba lo aprendido</h2>
              <span className="text-[14px] font-bold text-[#7e7e7e]">{answeredCount}/{questions.length}</span>
            </div>

            <div className="space-y-8">
              {questions.map((question, qi) => (
                <QuestionCard
                  key={`${currentModule.id}-${qi}`}
                  question={question}
                  label={`Pregunta ${qi + 1} de ${questions.length}`}
                  selected={selectedFor(qi)}
                  onSelect={option => progress.answer(entry.id, currentModule.id, qi, option)}
                />
              ))}
            </div>

            {allAnswered && (
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border border-[#3c3c3c]">
                <p className="text-white">
                  <span className="font-bold">{correctCount}/{questions.length}</span> respuestas correctas
                </p>
                <button
                  onClick={() => progress.retryModule(entry.id, currentModule.id)}
                  className="flex items-center text-[12px] font-bold uppercase tracking-[1.5px] text-[#bbbbbb] hover:text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Reintentar preguntas
                </button>
              </div>
            )}

            {entry.related.length > 0 && (
              <div className="mt-16">
                <h2 className="text-[14px] font-bold tracking-[1.5px] uppercase text-[#7e7e7e] mb-6">Normas relacionadas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {entry.related.map(rel => {
                    const target = getEntry(rel.id);
                    if (!target) return null;
                    return (
                      <Link
                        key={rel.id}
                        to={paths.course(rel.id)}
                        className="m-card p-6 text-left border border-transparent hover:border-[#3c3c3c] hover:bg-[#262626] transition-colors group"
                      >
                        <span className="block text-[16px] font-bold uppercase text-white group-hover:text-[#1c69d4] mb-2">{target.name}</span>
                        <span className="block text-[14px] font-light text-[#bbbbbb]">{rel.reason}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center border-t border-[#3c3c3c] pt-12 mt-16 gap-4">
              {moduleIndex > 0 ? (
                <Link to={paths.module(entry.id, moduleIndex - 1)} className="m-button-icon flex-shrink-0" aria-label="Módulo anterior">
                  <ChevronLeft className="w-6 h-6" />
                </Link>
              ) : (
                <span className="m-button-icon flex-shrink-0 opacity-50" aria-hidden="true">
                  <ChevronLeft className="w-6 h-6" />
                </span>
              )}

              {isLast && progress.completed[moduleKey(entry.id, currentModule.id)] ? (
                <Link to={paths.exam(entry.id)} className="m-button">
                  <GraduationCap className="w-4 h-4 mr-2" /> Hacer examen final
                </Link>
              ) : (
                <button onClick={completeAndContinue} disabled={!allAnswered} className="m-button">
                  {isLast ? 'Finalizar curso' : 'Completar y continuar'}
                  {!isLast && <ChevronRight className="w-4 h-4 ml-2" />}
                </button>
              )}
            </div>
            {!allAnswered && (
              <p className="text-right text-[14px] font-light text-[#7e7e7e] mt-4">
                Responde todas las preguntas para completar el módulo.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
