import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  label: string;
  selected: number | undefined;
  onSelect: (option: number) => void;
  // In exam mode the correct answer is hidden until the exam ends
  revealAnswer?: boolean;
}

export function QuestionCard({ question, label, selected, onSelect, revealAnswer = true }: QuestionCardProps) {
  const isAnswered = selected !== undefined;
  const showResult = isAnswered && revealAnswer;
  const isCorrect = selected === question.answerIndex;

  return (
    <div className="m-card p-6 md:p-10 border border-[#3c3c3c]">
      <h3 className="text-[14px] font-bold tracking-[1.5px] uppercase text-[#7e7e7e] mb-6 md:mb-8 border-b border-[#3c3c3c] pb-4">{label}</h3>

      <p className="text-[18px] md:text-[24px] font-bold leading-[1.3] text-white mb-8 md:mb-10">{question.question}</p>

      <div className="space-y-4">
        {question.options.map((option, idx) => {
          const isSelected = selected === idx;
          const isAnswer = idx === question.answerIndex;

          let btnClass = 'w-full text-left p-4 md:p-6 transition-colors text-[16px] font-light border ';
          if (!isAnswered) {
            btnClass += 'bg-black border-[#3c3c3c] hover:border-white text-[#bbbbbb] hover:text-white';
          } else if (!revealAnswer) {
            btnClass += isSelected ? 'bg-white border-white text-black font-bold' : 'bg-black border-[#262626] text-[#7e7e7e]';
          } else if (isSelected && isAnswer) {
            btnClass += 'bg-[#1c69d4] border-[#1c69d4] text-white font-bold';
          } else if (isSelected) {
            btnClass += 'bg-[#e22718] border-[#e22718] text-white';
          } else if (isAnswer) {
            btnClass += 'border-[#1c69d4] text-[#1c69d4]';
          } else {
            btnClass += 'bg-black border-[#262626] text-[#7e7e7e] opacity-50';
          }

          return (
            <button key={idx} disabled={isAnswered} onClick={() => onSelect(idx)} className={btnClass}>
              <div className="flex items-start">
                <span className="font-bold mr-4 md:mr-6 mt-0.5">{String.fromCharCode(65 + idx)}.</span>
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`mt-8 md:mt-10 p-6 md:p-8 border bg-black ${isCorrect ? 'border-[#1c69d4]' : 'border-[#e22718]'}`}>
          <h4 className={`text-[14px] font-bold tracking-[1.5px] uppercase mb-4 ${isCorrect ? 'text-[#1c69d4]' : 'text-[#e22718]'}`}>
            {isCorrect ? 'Correcto' : 'Incorrecto'}
          </h4>
          <p className="text-[16px] font-light leading-relaxed text-[#bbbbbb]">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
