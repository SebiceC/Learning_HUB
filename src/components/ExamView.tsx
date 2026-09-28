import { use, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import type { Question } from '../types';
import type { CatalogEntry, LoadedCourse } from '../catalog';
import { getQuestions, loadCourse } from '../lib/courses';
import type { Progress } from '../lib/progress';
import { paths } from '../lib/router';
import { MStripe } from './MStripe';
import { QuestionCard } from './QuestionCard';
import { Link } from './Link';

const EXAM_SIZE = 10;
const PASS_MARK = 70;

interface ExamQuestion extends Question {
  moduleTitle: string;
}

function drawQuestions({ course, extraQuestions }: LoadedCourse): ExamQuestion[] {
  const pool = course.modules.flatMap(mod =>
    getQuestions(mod, extraQuestions).map(q => ({ ...q, moduleTitle: mod.title }))
  );
  // Fisher-Yates shuffle, then take the first EXAM_SIZE
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, EXAM_SIZE);
}

interface ExamViewProps {
  entry: CatalogEntry;
  progress: Progress;
}

export default function ExamView({ entry, progress }: ExamViewProps) {
  const loaded = use(loadCourse(entry.id));
  const [questions, setQuestions] = useState(() => drawQuestions(loaded));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<(number | undefined)[]>([]);
  const [finished, setFinished] = useState(false);

  const score = Math.round((questions.filter((q, i) => selected[i] === q.answerIndex).length / questions.length) * 100);
  const passed = score >= PASS_MARK;
  const previous = progress.exams[entry.id];

  const select = (option: number) => {
    const next = [...selected];
    next[current] = option;
    setSelected(next);
  };

  const goNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      window.scrollTo(0, 0);
      return;
    }
    progress.recordExam(entry.id, score);
    setFinished(true);
    window.scrollTo(0, 0);
  };

  const restart = () => {
    setQuestions(drawQuestions(loaded));
    setCurrent(0);
    setSelected([]);
    setFinished(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="bg-black border-b border-[#3c3c3c]">
        <div className="px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <Link
            to={paths.course(entry.id)}
            className="text-white hover:text-[#bbbbbb] transition-colors flex items-center text-[14px] font-bold uppercase tracking-[1.5px]"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Volver al curso
          </Link>
          <span className="text-[14px] font-bold text-white uppercase tracking-[1.5px] truncate">Examen · {entry.shortName}</span>
        </div>
        <MStripe />
      </header>

      <main className="max-w-4xl mx-auto w-full px-4 py-10 md:p-16 flex-1">
        {!finished ? (
          <>
            <div className="mb-8">
              <p className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#7e7e7e] mb-4">
                Examen final · {entry.name}
              </p>
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 ${i < current ? 'bg-white' : i === current ? 'bg-[#1c69d4]' : 'bg-[#262626]'}`}></div>
                ))}
              </div>
              <p className="text-[14px] font-light text-[#7e7e7e] mt-4">Tema: {questions[current].moduleTitle}</p>
            </div>

            <QuestionCard
              key={current}
              question={questions[current]}
              label={`Pregunta ${current + 1} de ${questions.length}`}
              selected={selected[current]}
              onSelect={select}
              revealAnswer={false}
            />

            <div className="flex justify-end mt-10">
              <button onClick={goNext} disabled={selected[current] === undefined} className="m-button">
                {current === questions.length - 1 ? 'Ver resultado' : 'Siguiente'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={`p-8 md:p-12 border mb-12 ${passed ? 'border-[#1c69d4]' : 'border-[#e22718]'}`}>
              <p className={`text-[14px] font-bold uppercase tracking-[1.5px] mb-4 ${passed ? 'text-[#1c69d4]' : 'text-[#e22718]'}`}>
                {passed ? 'Aprobado' : 'No aprobado'} · mínimo {PASS_MARK}%
              </p>
              <p className="text-[64px] md:text-[80px] font-bold text-white leading-none mb-6">{score}%</p>
              <p className="text-[16px] font-light text-[#bbbbbb]">
                {questions.filter((q, i) => selected[i] === q.answerIndex).length} de {questions.length} correctas
                {previous && ` · Mejor resultado: ${previous.best}% · Intentos: ${previous.attempts}`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button onClick={restart} className="m-button">
                  <RotateCcw className="w-4 h-4 mr-2" /> Nuevo examen
                </button>
                <Link to={paths.course(entry.id)} className="m-button">Volver al curso</Link>
              </div>
            </div>

            <h2 className="text-[20px] md:text-[24px] font-bold text-white uppercase border-b border-[#3c3c3c] pb-4 mb-8">Revisión</h2>
            <div className="space-y-8">
              {questions.map((question, i) => (
                <QuestionCard
                  key={i}
                  question={question}
                  label={`Pregunta ${i + 1} · ${question.moduleTitle}`}
                  selected={selected[i]}
                  onSelect={() => {}}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
