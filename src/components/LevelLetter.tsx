import React from 'react';
import { GameConfig } from '../types';
import { soundService } from '../sound';

interface LevelLetterProps {
  config: GameConfig['level4'];
  onContinue: () => void;
  onBack?: () => void;
  showNav?: boolean;
}

export const LevelLetter: React.FC<LevelLetterProps> = ({
  config,
  onContinue,
  onBack,
  showNav = true,
}) => {
  const handleContinue = () => {
    soundService.playPop();
    onContinue();
  };

  return (
    <section className="flex flex-col items-center justify-center text-center py-6 animate-fadeIn">
      <p className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#c56e84] mb-1">
        {config.kicker}
      </p>

      <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--strawberry)] leading-tight">
        {config.title}
      </h2>

      {/* Lined Stationery Paper Article */}
      <article className="w-full max-w-[670px] text-left p-6 sm:p-12 my-7 paper lined-paper -rotate-1 shadow-xl hover:rotate-0 transition-transform duration-300">
        <div className="space-y-6">
          {config.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="font-script text-2xl sm:text-3xl text-[var(--ink)] leading-relaxed tracking-wide"
            >
              {p}
            </p>
          ))}
          <p className="font-script text-2xl sm:text-3xl text-[var(--strawberry)] text-right font-bold pt-2">
            {config.signoff}
          </p>
        </div>
      </article>

      <button
        type="button"
        onClick={handleContinue}
        className="primary-btn text-base px-8 py-3.5 shadow-md mt-2"
      >
        {config.buttonText}
      </button>

      {/* Navigation */}
      {showNav && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={onBack}
            className="secondary-btn"
          >
            BACK
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="secondary-btn"
          >
            NEXT PAGE
          </button>
        </div>
      )}
    </section>
  );
};
