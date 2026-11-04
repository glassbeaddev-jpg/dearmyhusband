import React from 'react';

interface ProgressBarProps {
  currentLevel: number;
  mode: 'play' | 'edit' | 'all';
}

const LEVEL_NAMES = [
  'THE MYSTERY ENVELOPE',
  'A LITTLE HEART HUNT',
  'A QUICK LITTLE QUIZ',
  'THE LITTLE APOLOGY LETTER',
  'THE FINAL SURPRISE',
];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentLevel, mode }) => {
  const displayLevel = Math.min(currentLevel, 5);

  return (
    <nav aria-label="Mission progress" className="my-5">
      <div className="flex gap-2 mb-2.5">
        {[1, 2, 3, 4, 5].map((lvl) => {
          const isActive = lvl === displayLevel && currentLevel <= 5;
          const isDone = lvl < currentLevel || currentLevel === 6;

          return (
            <div
              key={lvl}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-[var(--pink)] scale-y-125 shadow-xs'
                  : isDone
                  ? 'bg-[var(--strawberry)] opacity-75'
                  : 'bg-[#f0d8d4]'
              }`}
            />
          );
        })}
      </div>
      <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-[#a95d6b]">
        {mode === 'all'
          ? 'ALL STAGES OVERVIEW MODE'
          : currentLevel === 6
          ? 'MISSION COMPLETE · BIG HUG UNLOCKED 🫂'
          : `LEVEL ${currentLevel} / 5 · ${LEVEL_NAMES[currentLevel - 1] || ''}`}
      </p>
    </nav>
  );
};
