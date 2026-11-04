import React, { useState } from 'react';
import { GiftItem } from '../types';
import { soundService } from '../sound';

interface LetterModalProps {
  gift: GiftItem | null;
  currentIndex: number;
  totalGifts: number;
  isLocked: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onLock: (id: number) => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({
  gift,
  currentIndex,
  totalGifts,
  isLocked,
  onClose,
  onPrev,
  onNext,
  onLock,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!gift) return null;

  const handleStartLock = () => {
    if (isLocked) return;
    setShowConfirm(true);
  };

  const handleConfirmLock = () => {
    soundService.playLock();
    onLock(gift.id);
    setShowConfirm(false);
  };

  const pageLabel = `${String(currentIndex + 1).padStart(2, '0')} / ${String(totalGifts).padStart(2, '0')}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#492f3e]/65 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <article className="relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto my-auto p-6 sm:p-12 bg-[#fffdf5] border-[3px] border-[#efb8c1] rounded-3xl shadow-[0_20px_60px_rgba(103,75,73,0.35)] animate-slideUp text-left">
        {/* Ribbon decoration */}
        <div className="text-center text-[#d56f8e] text-lg sm:text-xl tracking-widest select-none mb-3">
          🎀 ♡ ✿ ♡ 🎀
        </div>

        {/* Modal Top bar */}
        <div className="sticky top-0 bg-[#fffdf5]/95 backdrop-blur-xs py-2 flex items-center justify-between border-b border-[#f2ccd3] z-10">
          <span className="font-bold tracking-widest text-xs sm:text-sm text-[var(--strawberry)]">
            {pageLabel}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="primary-btn text-xs sm:text-sm py-1.5 px-4 shadow-sm"
          >
            Close Letter ♡
          </button>
        </div>

        {/* Note header */}
        <p className="text-center font-script text-xl text-[#d56f8e] mt-4 mb-1">
          ♡ a little note ♡
        </p>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-center text-[var(--strawberry)] mb-6">
          {gift.title}
        </h3>

        {/* Letter Text */}
        <div
          style={{ fontFamily: "'Delicious Handrawn', cursive" }}
          className="text-[var(--ink)] text-lg sm:text-2xl leading-relaxed whitespace-pre-line my-6"
        >
          {gift.letterText}
        </div>

        {/* Gift Locking Section */}
        <div className="border-t border-dashed border-[#e8b7c2] pt-6 pb-4 flex flex-col items-center gap-3">
          <button
            type="button"
            disabled={isLocked}
            onClick={handleStartLock}
            className={`px-6 py-3 rounded-full font-bold text-sm sm:text-base tracking-wide transition-all ${
              isLocked
                ? 'bg-[#d4c4d9] text-[#6d596f] cursor-default'
                : 'primary-btn shadow-md hover:scale-105 active:scale-95'
            }`}
          >
            {isLocked ? '🔒 THIS GIFT IS LOCKED' : '🔒 LOCK THIS GIFT ♡'}
          </button>

          <p className="font-script text-xl sm:text-2xl text-[#a45b74]">
            {isLocked ? 'Saved and locked on this device ♡' : 'A little promise you can save ♡'}
          </p>

          {/* Confirm Dialog */}
          {showConfirm && (
            <div className="w-full bg-[#fff0f4] border border-[#edb8c7] rounded-2xl p-4 sm:p-5 text-center mt-2 animate-fadeIn">
              <p className="text-[#a33d63] font-bold text-sm sm:text-base mb-3">
                Are you sure you want to lock this little gift? 🎀
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="secondary-btn text-xs sm:text-sm py-2 px-4"
                >
                  NOT YET
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLock}
                  className="primary-btn text-xs sm:text-sm py-2 px-5 shadow-sm"
                >
                  YES, LOCK IT ♡
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Navigation */}
        <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#f2ccd3]">
          <button
            type="button"
            onClick={onPrev}
            className="secondary-btn text-xs sm:text-sm py-2 px-4"
          >
            {currentIndex === 0 ? 'ALL LETTERS' : 'PREVIOUS LETTER'}
          </button>
          <button
            type="button"
            onClick={onNext}
            className="primary-btn text-xs sm:text-sm py-2 px-5"
          >
            {currentIndex === totalGifts - 1 ? 'ALL LETTERS ♡' : 'NEXT LETTER ♡'}
          </button>
        </div>
      </article>
    </div>
  );
};
