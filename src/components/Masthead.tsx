import React, { useState } from 'react';
import { Volume2, VolumeX, Edit3, Play, Eye, Share2, RotateCcw, Check, Sparkles } from 'lucide-react';
import { soundService } from '../sound';

interface MastheadProps {
  brand: string;
  soundOn: boolean;
  onToggleSound: () => void;
  mode: 'play' | 'edit' | 'all';
  onChangeMode: (mode: 'play' | 'edit' | 'all') => void;
  onOpenEditor: () => void;
  onResetProgress: () => void;
  onShare: () => void;
  isCustomized: boolean;
}

export const Masthead: React.FC<MastheadProps> = ({
  brand,
  soundOn,
  onToggleSound,
  mode,
  onChangeMode,
  onOpenEditor,
  onResetProgress,
  onShare,
  isCustomized,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    onShare();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-[#efc7c2]/40">
      <div className="flex items-center gap-3">
        <span className="font-script font-bold text-2xl sm:text-3xl text-[var(--strawberry)] tracking-wide">
          {brand}
        </span>
        {isCustomized && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#fce9ec] text-[var(--strawberry)]">
            <Sparkles className="w-3 h-3" /> Customized
          </span>
        )}
      </div>

      <div className="flex items-center flex-wrap justify-center gap-2">
        {/* Sound toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#eab8bc] bg-[#fffaf6] text-[#674b49] shadow-xs hover:bg-[#ffeef2] transition-colors"
          aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
        >
          {soundOn ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[var(--strawberry)] animate-pulse" />
              <span>♪ Sound: on</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 opacity-60" />
              <span>♪ Sound: off</span>
            </>
          )}
        </button>

        {/* View Mode Pill Switcher */}
        <div className="inline-flex items-center p-1 rounded-full bg-[#fff5f0] border border-[#f0c8cd] text-xs">
          <button
            type="button"
            onClick={() => onChangeMode('play')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold transition-all ${
              mode === 'play'
                ? 'bg-[var(--strawberry)] text-white shadow-xs'
                : 'text-[#8b4f62] hover:text-[#5e2b3c]'
            }`}
            title="Player Mode (step-by-step game experience)"
          >
            <Play className="w-3 h-3" /> Play
          </button>
          <button
            type="button"
            onClick={() => onChangeMode('all')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold transition-all ${
              mode === 'all'
                ? 'bg-[var(--strawberry)] text-white shadow-xs'
                : 'text-[#8b4f62] hover:text-[#5e2b3c]'
            }`}
            title="Review all 6 stages vertically"
          >
            <Eye className="w-3 h-3" /> Overview
          </button>
        </div>

        {/* Edit Button */}
        <button
          type="button"
          onClick={onOpenEditor}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#fff0f4] border border-[#e8a3b5] text-[var(--strawberry)] shadow-xs hover:bg-[var(--strawberry)] hover:text-white transition-all transform active:scale-95"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit & Customize</span>
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShareClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#fffdf8] border border-[#eab8bc] text-[#8b4f62] shadow-xs hover:bg-[#ffebee] transition-colors"
          title="Share custom game link with your partner"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>

        {/* Restart / Reset test button */}
        <button
          type="button"
          onClick={onResetProgress}
          className="p-1.5 rounded-full border border-transparent text-[#97536b] hover:border-[#f0c8cd] hover:bg-[#fff0f4] transition-colors"
          title="Reset game progress back to Level 1"
          aria-label="Reset game progress"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
