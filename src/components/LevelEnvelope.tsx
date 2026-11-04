import React from 'react';
import { GameConfig } from '../types';
import { soundService } from '../sound';

interface LevelEnvelopeProps {
  config: GameConfig['level1'];
  envelopeOpened: boolean;
  onOpenEnvelope: () => void;
  onStartMission: () => void;
  onNext?: () => void;
  onBack?: () => void;
  canNext: boolean;
  canBack: boolean;
  showNav?: boolean;
}

export const LevelEnvelope: React.FC<LevelEnvelopeProps> = ({
  config,
  envelopeOpened,
  onOpenEnvelope,
  onStartMission,
  onNext,
  onBack,
  canNext,
  canBack,
  showNav = true,
}) => {
  const handleEnvelopeClick = () => {
    if (!envelopeOpened) {
      soundService.playTone(523, 784, 0.25);
      onOpenEnvelope();
    }
  };

  const handleStart = () => {
    soundService.playPop();
    onStartMission();
  };

  return (
    <section className="flex flex-col items-center justify-center text-center py-6 animate-fadeIn">
      <p className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#c56e84] mb-2">
        {config.kicker}
      </p>

      <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[var(--strawberry)] leading-tight max-w-2xl">
        {config.title}
      </h1>

      <p className="text-base sm:text-lg text-[var(--ink)] mt-4 max-w-md">
        {config.prompt}
      </p>

      {/* Interactive Envelope with flap animation */}
      <div className="my-8">
        <button
          type="button"
          onClick={handleEnvelopeClick}
          className={`envelope-box mx-auto ${
            envelopeOpened ? 'is-open cursor-default' : 'animate-bob hover:scale-105 active:scale-95'
          }`}
          aria-label={envelopeOpened ? 'Envelope is open' : 'Open the mystery envelope'}
        >
          <span className="envelope-seal font-serif select-none">♥</span>
        </button>
      </div>

      {/* Welcome content revealed upon opening */}
      {envelopeOpened ? (
        <div className="flex flex-col items-center animate-fadeIn space-y-4">
          <p className="font-script text-2xl sm:text-4xl text-[var(--ink)] max-w-lg leading-snug">
            {config.welcomeMessage}
          </p>
          <button
            type="button"
            onClick={handleStart}
            className="primary-btn text-base sm:text-lg px-8 py-4 shadow-lg hover:shadow-xl"
          >
            {config.buttonText}
          </button>
        </div>
      ) : (
        <p className="font-script text-xl text-[#a45b74] opacity-80 animate-pulse">
          ♡ Tap the envelope to unseal it ♡
        </p>
      )}

      {/* Level Navigation */}
      {showNav && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            type="button"
            disabled={!canBack}
            onClick={onBack}
            className="secondary-btn"
          >
            BACK
          </button>
          <button
            type="button"
            disabled={!canNext}
            onClick={onNext}
            className="secondary-btn"
          >
            NEXT PAGE
          </button>
        </div>
      )}
    </section>
  );
};
