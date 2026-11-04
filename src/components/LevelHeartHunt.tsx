import React from 'react';
import confetti from 'canvas-confetti';
import { GameConfig } from '../types';
import { soundService } from '../sound';

interface LevelHeartHuntProps {
  config: GameConfig['level2'];
  foundHearts: number[];
  onFindHeart: (id: number) => void;
  onNextLevel: () => void;
  onBack?: () => void;
  showNav?: boolean;
}

export const LevelHeartHunt: React.FC<LevelHeartHuntProps> = ({
  config,
  foundHearts,
  onNextLevel,
  onFindHeart,
  onBack,
  showNav = true,
}) => {
  const isComplete = foundHearts.length === config.hearts.length;

  const handleHeartClick = (id: number) => {
    if (foundHearts.includes(id)) return;
    soundService.playTone(660, 990, 0.2);
    onFindHeart(id);

    if (foundHearts.length + 1 === config.hearts.length) {
      setTimeout(() => {
        soundService.playSuccessFanfare();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d95b83', '#b93966', '#ffdfca', '#ffd9df'],
        });
      }, 200);
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
        {config.instructions}
      </p>

      {/* Progress counter */}
      <div className="mt-3 font-bold text-sm tracking-wider uppercase text-[var(--strawberry)] bg-[#fff0f4] px-4 py-1.5 rounded-full border border-[#f5ccd5]">
        {foundHearts.length} / {config.hearts.length} hearts found
      </div>

      {/* Scrapbook play area */}
      <div className="relative w-full max-w-[670px] min-h-[360px] sm:min-h-[400px] my-6 mx-auto bg-[#fffdf8] border-2 border-dashed border-[#e8aeb4] rounded-3xl shadow-[12px_12px_0_#f7d9d6] overflow-hidden select-none">
        {/* Background decorative doodles */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 opacity-40 text-2xl text-[#f3d6be]">
          <div className="flex justify-around tracking-widest">
            <span>✿</span>
            <span>☆</span>
            <span>♡</span>
            <span>✿</span>
            <span>☆</span>
          </div>
          <div className="flex justify-around tracking-widest">
            <span>♡</span>
            <span>✿</span>
            <span>☆</span>
            <span>♡</span>
          </div>
        </div>

        {/* Floating Hearts */}
        {config.hearts.map((heart) => {
          const isFound = foundHearts.includes(heart.id);

          return (
            <button
              key={heart.id}
              type="button"
              onClick={() => handleHeartClick(heart.id)}
              disabled={isFound}
              style={{
                left: `${heart.xPercent}%`,
                top: `${heart.yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl transition-all duration-300 ${
                isFound
                  ? 'bg-[#f3ece5] text-[#caa8b3] opacity-60 cursor-default scale-90'
                  : 'bg-[#f9c8d1] text-[#9b3a5b] border-2 border-[#dd8ca4] shadow-[0_5px_0_#e5a0af] hover:scale-115 hover:-rotate-12 active:scale-95 cursor-pointer animate-bob'
              }`}
              title={isFound ? 'Found!' : 'Find this heart!'}
              aria-label={`Find heart number ${heart.id}`}
            >
              {heart.emoji || '♥'}
            </button>
          );
        })}
      </div>

      {/* Revealed heart notes */}
      <div className="flex flex-wrap justify-center gap-2.5 max-w-[650px] mx-auto min-h-[44px]">
        {config.hearts.map((heart) => {
          const isFound = foundHearts.includes(heart.id);
          if (!isFound) return null;

          return (
            <span
              key={heart.id}
              className="px-3.5 py-2 bg-[#ffe7d8] border border-[#f3cfc2] rounded-xl font-script text-xl sm:text-2xl text-[#99536a] shadow-xs animate-stamp"
            >
              {heart.note}
            </span>
          );
        })}
      </div>

      {/* Celebration when all found */}
      {isComplete && (
        <div className="mt-8 flex flex-col items-center animate-fadeIn space-y-4">
          <p className="font-script text-2xl sm:text-3xl text-[var(--strawberry)] whitespace-pre-line leading-relaxed">
            {config.celebrationText}
          </p>
          <button
            type="button"
            onClick={onNextLevel}
            className="primary-btn text-base px-8 py-3.5"
          >
            {config.buttonText}
          </button>
        </div>
      )}

      {/* Level Navigation */}
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
            disabled={!isComplete}
            onClick={onNextLevel}
            className="secondary-btn"
          >
            NEXT PAGE
          </button>
        </div>
      )}
    </section>
  );
};
