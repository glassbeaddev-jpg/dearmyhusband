import React from 'react';
import { GameConfig } from '../types';
import { soundService } from '../sound';

interface LevelQuizProps {
  config: GameConfig['level3'];
  quizStep: number;
  answers: Record<number, number>;
  quizComplete: boolean;
  onSelectAnswer: (questionId: number, answerIndex: number) => void;
  onNextQuestion: () => void;
  onCompleteQuiz: () => void;
  onBack?: () => void;
  showNav?: boolean;
}

export const LevelQuiz: React.FC<LevelQuizProps> = ({
  config,
  quizStep,
  answers,
  quizComplete,
  onSelectAnswer,
  onNextQuestion,
  onCompleteQuiz,
  onBack,
  showNav = true,
}) => {
  const currentQ = config.questions[quizStep - 1] || config.questions[0];
  const currentAnswer = answers[currentQ.id];
  const isAnswered = currentAnswer !== undefined;
  const isCorrect = isAnswered && currentAnswer === currentQ.correctIndex;

  const handleAnswerClick = (index: number) => {
    if (isAnswered) return;
    soundService.playTone(520, 780, 0.18);
    onSelectAnswer(currentQ.id, index);
  };

  const handleNextClick = () => {
    soundService.playPop();
    if (quizStep < config.questions.length) {
      onNextQuestion();
    } else {
      onCompleteQuiz();
    }
  };

  return (
    <section className="flex flex-col items-center justify-center text-center py-6 animate-fadeIn">
      <p className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#c56e84] mb-1">
        {config.kicker}
      </p>

      <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--strawberry)] leading-tight">
        {config.title}
      </h2>

      <p className="text-sm sm:text-base text-[var(--ink)] mt-2 max-w-md">
        {config.intro}
      </p>

      {/* Quiz Card Paper */}
      <div className="w-full max-w-[600px] paper p-6 sm:p-9 my-6 text-center animate-fadeIn">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#c56e84]">
          QUESTION {quizStep} / {config.questions.length}
        </p>

        <h3 className="font-script text-2xl sm:text-3xl text-[var(--ink)] my-4">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 my-4">
          {currentQ.options.map((option, idx) => {
            const isSelected = currentAnswer === idx;

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswered}
                onClick={() => handleAnswerClick(idx)}
                className={`w-full text-left px-5 py-3.5 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 border-2 ${
                  isSelected
                    ? 'bg-[#f9c9d4] border-[#c45a7c] text-[#812a49] shadow-xs'
                    : isAnswered
                    ? 'bg-[#fff5f0] border-[#f1c9c3] opacity-60 text-[var(--ink)]'
                    : 'bg-[#fff2ed] border-[#f1c9c3] text-[var(--ink)] hover:translate-x-1.5 hover:bg-[#ffe4e8] active:scale-98'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback message */}
        {isAnswered && (
          <div className="my-5 animate-fadeIn">
            <p className="font-script text-2xl sm:text-3xl text-[var(--strawberry)] leading-snug">
              {isCorrect ? currentQ.correctFeedback : currentQ.alternateFeedback}
            </p>

            <button
              type="button"
              onClick={handleNextClick}
              className="primary-btn mt-4 px-7 py-3 text-sm sm:text-base shadow-md"
            >
              {currentQ.nextText}
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      {showNav && (
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            type="button"
            onClick={onBack}
            className="secondary-btn"
          >
            BACK
          </button>
          <button
            type="button"
            disabled={!quizComplete}
            onClick={onCompleteQuiz}
            className="secondary-btn"
          >
            NEXT PAGE
          </button>
        </div>
      )}
    </section>
  );
};
