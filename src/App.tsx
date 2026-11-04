import React, { useState, useEffect } from 'react';
import { GameConfig, PlayState } from './types';
import { DEFAULT_CONFIG } from './defaultConfig';
import { soundService } from './sound';
import { Masthead } from './components/Masthead';
import { ProgressBar } from './components/ProgressBar';
import { LevelEnvelope } from './components/LevelEnvelope';
import { LevelHeartHunt } from './components/LevelHeartHunt';
import { LevelQuiz } from './components/LevelQuiz';
import { LevelLetter } from './components/LevelLetter';
import { LevelGifts } from './components/LevelGifts';
import { LevelFinale } from './components/LevelFinale';
import { LetterModal } from './components/LetterModal';
import { EditorDrawer } from './components/EditorDrawer';

const CONFIG_STORAGE_KEY = 'operation-make-smile-config-v1';
const PLAY_STORAGE_KEY = 'operation-make-smile-playstate-v1';

const INITIAL_PLAY_STATE: PlayState = {
  level: 1,
  envelopeOpened: false,
  hearts: [],
  answers: {},
  quizStep: 1,
  quizComplete: false,
  letterRead: false,
  giftReads: [],
  giftLocks: [],
};

export default function App() {
  // Load configuration from URL hash or localStorage or default
  const [config, setConfig] = useState<GameConfig>(() => {
    try {
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash.slice(1);
        const match = hash.match(/^config=(.+)$/);
        if (match && match[1]) {
          const decoded = decodeURIComponent(atob(match[1]));
          const parsed = JSON.parse(decoded);
          if (parsed && parsed.level1 && parsed.level2) {
            return { ...DEFAULT_CONFIG, ...parsed };
          }
        }
      }
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback to default
    }
    return DEFAULT_CONFIG;
  });

  // Load play progress state
  const [playState, setPlayState] = useState<PlayState>(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('reset') === '1') {
          return INITIAL_PLAY_STATE;
        }
        const saved = localStorage.getItem(PLAY_STORAGE_KEY);
        if (saved) {
          return { ...INITIAL_PLAY_STATE, ...JSON.parse(saved) };
        }
      }
    } catch {}
    return INITIAL_PLAY_STATE;
  });

  // Mode: 'play' | 'edit' | 'all'
  const [mode, setMode] = useState<'play' | 'edit' | 'all'>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('all') === '1') return 'all';
    }
    return 'play';
  });

  const [soundOn, setSoundOn] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedLetterIdx, setSelectedLetterIdx] = useState<number | null>(null);

  // Sync sound toggle to service
  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundService.enabled = next;
    if (next) {
      soundService.playTone(660, 880, 0.2);
    }
  };

  // Save config changes to localStorage
  const handleUpdateConfig = (newConfig: GameConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
    } catch {}
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all customized text back to the original game template?')) {
      setConfig(DEFAULT_CONFIG);
      try {
        localStorage.removeItem(CONFIG_STORAGE_KEY);
      } catch {}
    }
  };

  // Save play state changes
  const updatePlayState = (updater: Partial<PlayState> | ((prev: PlayState) => PlayState)) => {
    setPlayState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      try {
        localStorage.setItem(PLAY_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleResetProgress = () => {
    updatePlayState(INITIAL_PLAY_STATE);
    soundService.playTone(440, 660, 0.15);
  };

  // Generate shareable URL
  const handleShare = () => {
    try {
      const encoded = btoa(encodeURIComponent(JSON.stringify(config)));
      const shareUrl = `${window.location.origin}${window.location.pathname}#config=${encoded}`;
      navigator.clipboard.writeText(shareUrl);
    } catch {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Check if current config differs from default
  const isCustomized = JSON.stringify(config) !== JSON.stringify(DEFAULT_CONFIG);

  // Navigation handlers
  const goToLevel = (lvl: number) => {
    updatePlayState({ level: Math.max(1, Math.min(6, lvl)) });
    soundService.playTone(587, 784, 0.18);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Level 1: Envelope
  const handleOpenEnvelope = () => {
    updatePlayState({ envelopeOpened: true });
  };

  // Level 2: Heart Hunt
  const handleFindHeart = (id: number) => {
    updatePlayState((prev) => {
      if (prev.hearts.includes(id)) return prev;
      return { ...prev, hearts: [...prev.hearts, id] };
    });
  };

  // Level 3: Quiz
  const handleSelectQuizAnswer = (questionId: number, answerIdx: number) => {
    updatePlayState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answerIdx },
    }));
  };

  const handleNextQuizQuestion = () => {
    updatePlayState((prev) => ({
      ...prev,
      quizStep: Math.min(prev.quizStep + 1, config.level3.questions.length),
    }));
  };

  const handleCompleteQuiz = () => {
    updatePlayState({ quizComplete: true, level: 4 });
    soundService.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Level 4: Letter
  const handleContinueFromLetter = () => {
    updatePlayState({ letterRead: true, level: 5 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Level 5: Gift Letters & Modal
  const handleOpenLetterModal = (index: number) => {
    const gift = config.level5.gifts[index];
    if (gift) {
      setSelectedLetterIdx(index);
      updatePlayState((prev) => {
        if (prev.giftReads.includes(gift.id)) return prev;
        return { ...prev, giftReads: [...prev.giftReads, gift.id] };
      });
    }
  };

  const handleCloseLetterModal = () => {
    setSelectedLetterIdx(null);
  };

  const handleLockGift = (giftId: number) => {
    updatePlayState((prev) => {
      if (prev.giftLocks.includes(giftId)) return prev;
      return { ...prev, giftLocks: [...prev.giftLocks, giftId] };
    });
  };

  return (
    <div
      data-theme={config.theme}
      className="game-shell min-h-screen text-[var(--ink)] transition-colors duration-300"
    >
      {/* Decorative stickers in corners */}
      <span aria-hidden="true" className="sticker s1 select-none animate-bob">
        ✿
      </span>
      <span
        aria-hidden="true"
        className="sticker s2 select-none animate-bob"
        style={{ animationDelay: '-2s' }}
      >
        ✧
      </span>
      <span
        aria-hidden="true"
        className="sticker s3 select-none animate-bob"
        style={{ animationDelay: '-1s' }}
      >
        ♡
      </span>
      <span
        aria-hidden="true"
        className="sticker s4 select-none animate-bob"
        style={{ animationDelay: '-3s' }}
      >
        ✿
      </span>

      <div className="game-content w-full max-w-[850px] mx-auto px-4 sm:px-6 py-6 pb-20 relative z-10">
        {/* Masthead */}
        <Masthead
          brand={config.brand}
          soundOn={soundOn}
          onToggleSound={handleToggleSound}
          mode={mode}
          onChangeMode={setMode}
          onOpenEditor={() => setIsEditorOpen(true)}
          onResetProgress={handleResetProgress}
          onShare={handleShare}
          isCustomized={isCustomized}
        />

        {/* Step Progress Bar */}
        <ProgressBar currentLevel={playState.level} mode={mode} />

        {/* Main Stage Content */}
        <main className="min-h-[520px]">
          {mode === 'all' ? (
            /* ALL STAGES VERTICAL OVERVIEW MODE */
            <div className="space-y-12">
              <div className="p-6 rounded-3xl border-2 border-dashed border-[#e6b1bf] bg-[#fffaf4]/70">
                <LevelEnvelope
                  config={config.level1}
                  envelopeOpened={true}
                  onOpenEnvelope={() => {}}
                  onStartMission={() => {}}
                  canNext={true}
                  canBack={false}
                  showNav={false}
                />
              </div>

              <div className="p-6 rounded-3xl border-2 border-dashed border-[#e6b1bf] bg-[#fffaf4]/70">
                <LevelHeartHunt
                  config={config.level2}
                  foundHearts={config.level2.hearts.map((h) => h.id)}
                  onFindHeart={() => {}}
                  onNextLevel={() => {}}
                  showNav={false}
                />
              </div>

              <div className="p-6 rounded-3xl border-2 border-dashed border-[#e6b1bf] bg-[#fffaf4]/70">
                <LevelQuiz
                  config={config.level3}
                  quizStep={1}
                  answers={{ 1: config.level3.questions[0]?.correctIndex ?? 0 }}
                  quizComplete={true}
                  onSelectAnswer={() => {}}
                  onNextQuestion={() => {}}
                  onCompleteQuiz={() => {}}
                  showNav={false}
                />
              </div>

              <div className="p-6 rounded-3xl border-2 border-dashed border-[#e6b1bf] bg-[#fffaf4]/70">
                <LevelLetter
                  config={config.level4}
                  onContinue={() => {}}
                  showNav={false}
                />
              </div>

              <div className="p-6 rounded-3xl border-2 border-dashed border-[#e6b1bf] bg-[#fffaf4]/70">
                <LevelGifts
                  config={config.level5}
                  giftReads={config.level5.gifts.map((g) => g.id)}
                  giftLocks={[]}
                  onOpenLetter={(idx) => setSelectedLetterIdx(idx)}
                  onOpenFinale={() => {}}
                  showNav={false}
                />
              </div>

              <div className="p-6 rounded-3xl border-2 border-dashed border-[#e6b1bf] bg-[#fffaf4]/70">
                <LevelFinale
                  config={config.finale}
                  onRestart={handleResetProgress}
                  showNav={false}
                />
              </div>
            </div>
          ) : (
            /* STANDARD INTERACTIVE PLAY MODE */
            <>
              {playState.level === 1 && (
                <LevelEnvelope
                  config={config.level1}
                  envelopeOpened={playState.envelopeOpened}
                  onOpenEnvelope={handleOpenEnvelope}
                  onStartMission={() => goToLevel(2)}
                  onNext={() => goToLevel(2)}
                  onBack={() => {}}
                  canNext={playState.envelopeOpened}
                  canBack={false}
                />
              )}

              {playState.level === 2 && (
                <LevelHeartHunt
                  config={config.level2}
                  foundHearts={playState.hearts}
                  onFindHeart={handleFindHeart}
                  onNextLevel={() => goToLevel(3)}
                  onBack={() => goToLevel(1)}
                />
              )}

              {playState.level === 3 && (
                <LevelQuiz
                  config={config.level3}
                  quizStep={playState.quizStep}
                  answers={playState.answers}
                  quizComplete={playState.quizComplete}
                  onSelectAnswer={handleSelectQuizAnswer}
                  onNextQuestion={handleNextQuizQuestion}
                  onCompleteQuiz={handleCompleteQuiz}
                  onBack={() => goToLevel(2)}
                />
              )}

              {playState.level === 4 && (
                <LevelLetter
                  config={config.level4}
                  onContinue={handleContinueFromLetter}
                  onBack={() => goToLevel(3)}
                />
              )}

              {playState.level === 5 && (
                <LevelGifts
                  config={config.level5}
                  giftReads={playState.giftReads}
                  giftLocks={playState.giftLocks}
                  onOpenLetter={handleOpenLetterModal}
                  onOpenFinale={() => goToLevel(6)}
                  onBack={() => goToLevel(4)}
                />
              )}

              {playState.level === 6 && (
                <LevelFinale
                  config={config.finale}
                  onRestart={handleResetProgress}
                  onBack={() => goToLevel(5)}
                />
              )}
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="pt-10 text-center font-script text-2xl text-[#bd7283]">
          {config.footerText}
        </footer>
      </div>

      {/* Level 5 Gift Letter Reader Modal */}
      {selectedLetterIdx !== null && (
        <LetterModal
          gift={config.level5.gifts[selectedLetterIdx] || null}
          currentIndex={selectedLetterIdx}
          totalGifts={config.level5.gifts.length}
          isLocked={
            config.level5.gifts[selectedLetterIdx]
              ? playState.giftLocks.includes(config.level5.gifts[selectedLetterIdx].id)
              : false
          }
          onClose={handleCloseLetterModal}
          onPrev={() => {
            if (selectedLetterIdx > 0) {
              setSelectedLetterIdx(selectedLetterIdx - 1);
            } else {
              handleCloseLetterModal();
            }
          }}
          onNext={() => {
            if (selectedLetterIdx < config.level5.gifts.length - 1) {
              setSelectedLetterIdx(selectedLetterIdx + 1);
            } else {
              handleCloseLetterModal();
            }
          }}
          onLock={handleLockGift}
        />
      )}

      {/* Visual Customizer Studio Drawer */}
      <EditorDrawer
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onResetToDefault={handleResetToDefault}
        onShare={handleShare}
      />
    </div>
  );
}
