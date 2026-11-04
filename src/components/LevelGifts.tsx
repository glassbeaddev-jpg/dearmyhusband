import React from 'react';
import { GameConfig } from '../types';
import { soundService } from '../sound';

interface LevelGiftsProps {
  config: GameConfig['level5'];
  giftReads: number[];
  giftLocks: number[];
  onOpenLetter: (index: number) => void;
  onOpenFinale: () => void;
  onBack?: () => void;
  showNav?: boolean;
}

export const LevelGifts: React.FC<LevelGiftsProps> = ({
  config,
  giftReads,
  giftLocks,
  onOpenLetter,
  onOpenFinale,
  onBack,
  showNav = true,
}) => {
  const allRead = config.gifts.every((g) => giftReads.includes(g.id));

  const handleCardClick = (index: number) => {
    soundService.playTone(587, 880, 0.2);
    onOpenLetter(index);
  };

  const handleFinaleClick = () => {
    soundService.playSuccessFanfare();
    onOpenFinale();
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

      {/* 4 Cards Collection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[670px] my-6">
        {config.gifts.map((gift, idx) => {
          const isRead = giftReads.includes(gift.id);
          const isLocked = giftLocks.includes(gift.id);

          return (
            <button
              key={gift.id}
              type="button"
              onClick={() => handleCardClick(idx)}
              className={`p-6 rounded-3xl paper text-center flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[-0.5deg] active:scale-98 shadow-md hover:shadow-lg ${
                isLocked
                  ? 'bg-[#f3eff8] border-[#c9b7d4] shadow-[0_14px_0_#e8dce8]'
                  : isRead
                  ? 'bg-[#fffaf6] border-[#eab8bc]'
                  : 'bg-[#fffdf8] border-[#efc7c2]'
              }`}
            >
              <span className="text-2xl text-[#df7896]">
                {gift.icons}
              </span>

              <h4 className="font-serif font-bold text-base sm:text-lg text-[var(--strawberry)]">
                {gift.title}
              </h4>

              <span className="font-script text-xl text-[#b55d78]">
                {isLocked ? '♡ tap to read again ♡' : '♡ tap to read ♡'}
              </span>

              <span
                className={`text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full ${
                  isLocked
                    ? 'bg-[#e8deef] text-[#6a5579]'
                    : isRead
                    ? 'bg-[#f4ebff] text-[#80638d]'
                    : 'bg-[#fce9ec] text-[#9b4e6b]'
                }`}
              >
                {isLocked ? '🔒 LOCKED ♡' : isRead ? '♡ READ · READY TO LOCK' : '♡ AVAILABLE'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Completion Banner when all 4 are read */}
      {allRead && (
        <div className="w-full max-w-[670px] paper p-6 sm:p-8 my-4 text-center animate-fadeIn bg-[#fffcf9]">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--strawberry)] mb-3">
            {config.completionTitle}
          </h3>
          <p className="text-sm sm:text-base text-[var(--ink)] leading-relaxed max-w-md mx-auto mb-5">
            {config.completionText}
          </p>
          <button
            type="button"
            onClick={handleFinaleClick}
            className="primary-btn text-base px-8 py-3.5 shadow-lg"
          >
            {config.buttonText}
          </button>
        </div>
      )}

      {/* Navigation */}
      {showNav && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="secondary-btn"
          >
            BACK
          </button>
          <button
            type="button"
            disabled={!allRead}
            onClick={handleFinaleClick}
            className="secondary-btn"
          >
            NEXT PAGE
          </button>
        </div>
      )}
    </section>
  );
};
