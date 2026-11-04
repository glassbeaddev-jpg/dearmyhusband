import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GameConfig } from '../types';
import { soundService } from '../sound';
import { RotateCcw, Sparkles } from 'lucide-react';

interface LevelFinaleProps {
  config: GameConfig['finale'];
  onRestart: () => void;
  onBack?: () => void;
  showNav?: boolean;
}

export const LevelFinale: React.FC<LevelFinaleProps> = ({
  config,
  onRestart,
  onBack,
  showNav = true,
}) => {
  const triggerConfetti = () => {
    soundService.playSuccessFanfare();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#d95b83', '#b93966', '#ffdfca', '#ffd9df', '#ffd166', '#ef476f'],
    });
  };

  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-10 animate-fadeIn min-h-[500px]">
      {/* Floating Sparkle Symbols */}
      <span aria-hidden="true" className="absolute left-[8%] top-[25%] text-2xl sm:text-3xl text-[var(--strawberry)] opacity-70 animate-float">
        ♡
      </span>
      <span aria-hidden="true" className="absolute right-[10%] top-[15%] text-2xl sm:text-3xl text-[var(--pink)] opacity-70 animate-float" style={{ animationDelay: '1s' }}>
        ✦
      </span>
      <span aria-hidden="true" className="absolute left-[15%] bottom-[15%] text-2xl sm:text-3xl text-[#d56f8e] opacity-70 animate-float" style={{ animationDelay: '2s' }}>
        ♥
      </span>
      <span aria-hidden="true" className="absolute right-[18%] bottom-[20%] text-2xl sm:text-3xl text-[var(--strawberry)] opacity-70 animate-float" style={{ animationDelay: '1.5s' }}>
        ✧
      </span>

      <p className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#c56e84] mb-3">
        {config.kicker}
      </p>

      {/* Hug Illustration or Image */}
      <div className="text-7xl sm:text-9xl my-4 select-none animate-bob filter drop-shadow-[0_12px_12px_rgba(223,154,163,0.4)]">
        {config.illustration}
      </div>

      <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--strawberry)] leading-tight max-w-xl">
        {config.title}
      </h2>

      <p className="font-script text-2xl sm:text-4xl text-[var(--ink)] mt-4 max-w-lg leading-relaxed">
        {config.message}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <button
          type="button"
          onClick={triggerConfetti}
          className="secondary-btn text-sm px-5 py-2.5 shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-[var(--strawberry)]" />
          <span>More Confetti! ✨</span>
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="primary-btn text-sm px-6 py-2.5 shadow-md"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Play Again ♡</span>
        </button>
      </div>

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
        </div>
      )}
    </section>
  );
};
