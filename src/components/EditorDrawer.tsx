import React, { useState } from 'react';
import {
  X,
  Palette,
  Mail,
  Heart,
  HelpCircle,
  FileText,
  Gift,
  Smile,
  Share2,
  RotateCcw,
  Sparkles,
  Download,
  Upload,
  Check,
  Copy,
} from 'lucide-react';
import { GameConfig, ThemeName } from '../types';
import { PRESETS } from '../defaultConfig';

interface EditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: GameConfig;
  onUpdateConfig: (newConfig: GameConfig) => void;
  onResetToDefault: () => void;
  onShare: () => void;
}

type TabKey = 'basics' | 'envelope' | 'hearts' | 'quiz' | 'letter' | 'gifts' | 'finale' | 'export';

const THEMES: { id: ThemeName; name: string; bg: string; accent: string }[] = [
  { id: 'strawberry', name: 'Strawberry & Cream', bg: '#fff3e9', accent: '#b93966' },
  { id: 'lavender', name: 'Lavender Love', bg: '#f5eeff', accent: '#76418d' },
  { id: 'peach', name: 'Peachy Honey', bg: '#fff4ec', accent: '#c35a3b' },
  { id: 'ocean', name: 'Ocean Breeze', bg: '#eaf5fc', accent: '#206d9d' },
  { id: 'sage', name: 'Sage & Matcha', bg: '#edf4ed', accent: '#4a754b' },
  { id: 'midnight', name: 'Midnight Velvet', bg: '#1f151c', accent: '#d84576' },
];

export const EditorDrawer: React.FC<EditorDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetToDefault,
  onShare,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('basics');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleShareClick = () => {
    onShare();
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `operation-love-${config.partnerTitle.toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.level1 && parsed.level2 && parsed.level3) {
          onUpdateConfig(parsed);
          setImportError(null);
        } else {
          setImportError('Invalid config structure.');
        }
      } catch {
        setImportError('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const applyPreset = (presetIndex: number) => {
    const preset = PRESETS[presetIndex];
    if (!preset) return;
    onUpdateConfig({
      ...config,
      ...preset.data,
      level1: { ...config.level1, ...(preset.data.level1 || {}) },
      level2: { ...config.level2, ...(preset.data.level2 || {}) },
      level3: { ...config.level3, ...(preset.data.level3 || {}) },
      level4: { ...config.level4, ...(preset.data.level4 || {}) },
      level5: { ...config.level5, ...(preset.data.level5 || {}) },
      finale: { ...config.finale, ...(preset.data.finale || {}) },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-4xl h-[92vh] flex flex-col bg-[#fffdfa] border-2 border-[#eab8bc] rounded-3xl shadow-2xl overflow-hidden text-[var(--ink)]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#fff5f0] border-b border-[#f0cbd1]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-[#ffe4e8] text-[var(--strawberry)]">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[var(--strawberry)]">
                Customization Studio
              </h2>
              <p className="text-xs text-[#8f5a6b]">
                Personalize every word, secret letter, and theme for your partner
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShareClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#fff0f4] border border-[#e8a3b5] text-[var(--strawberry)] hover:bg-[var(--strawberry)] hover:text-white transition-all shadow-xs"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied Link!' : 'Get Share Link'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-[#8f5a6b] hover:bg-[#ffebee] transition-colors"
              aria-label="Close customizer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preset Bar */}
        <div className="px-6 py-2.5 bg-[#fffaf5] border-b border-[#f3d6db] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#91465e]">Quick Presets:</span>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p, idx) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => applyPreset(idx)}
                  className="px-2.5 py-1 rounded-full bg-white border border-[#eab8bc] text-[#81354d] hover:bg-[#ffe7ed] font-medium transition-colors"
                >
                  {p.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onResetToDefault}
            className="flex items-center gap-1 text-[#a4526b] hover:text-[#74233a] font-medium"
          >
            <RotateCcw className="w-3 h-3" /> Reset Defaults
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#f0c8cf] bg-[#fffbf8] overflow-x-auto text-xs sm:text-sm font-semibold select-none scrollbar-none">
          {[
            { key: 'basics', label: 'Basics & Theme', icon: Palette },
            { key: 'envelope', label: '1. Envelope', icon: Mail },
            { key: 'hearts', label: '2. Hearts', icon: Heart },
            { key: 'quiz', label: '3. Quiz', icon: HelpCircle },
            { key: 'letter', label: '4. Love Letter', icon: FileText },
            { key: 'gifts', label: '5. Gift Cards', icon: Gift },
            { key: 'finale', label: '6. Finale', icon: Smile },
            { key: 'export', label: 'Share & Export', icon: Share2 },
          ].map(({ key, label, icon: Icon }) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key as TabKey)}
                className={`flex items-center gap-1.5 px-4 py-3 whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-[var(--strawberry)] text-[var(--strawberry)] bg-[#fff0f4] font-bold'
                    : 'border-transparent text-[#7d515f] hover:text-[#963753] hover:bg-[#fff5f7]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: BASICS & THEME */}
          {activeTab === 'basics' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#9c4c64] mb-3">
                  Color Atmosphere / Theme
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {THEMES.map((theme) => {
                    const isSelected = config.theme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => onUpdateConfig({ ...config, theme: theme.id })}
                        className={`flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-[var(--strawberry)] shadow-sm scale-102 bg-white'
                            : 'border-[#ebd1d5] hover:border-[#dab0b8] bg-[#fffbf9]'
                        }`}
                      >
                        <span
                          className="w-7 h-7 rounded-full shadow-inner border border-white flex-shrink-0"
                          style={{ backgroundColor: theme.accent }}
                        />
                        <div>
                          <div className="font-bold text-xs text-[#6e3747]">{theme.name}</div>
                          <div className="text-[10px] text-gray-400 capitalize">{theme.id}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                    Partner Title / Name
                  </label>
                  <input
                    type="text"
                    value={config.partnerTitle}
                    onChange={(e) => onUpdateConfig({ ...config, partnerTitle: e.target.value })}
                    placeholder="e.g. Husband, Boyfriend, Liam, Alex"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--strawberry)]"
                  />
                  <span className="text-[11px] text-gray-500 mt-0.5 block">
                    Shown throughout headers and notes.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                    Your Name / Nickname
                  </label>
                  <input
                    type="text"
                    value={config.senderTitle}
                    onChange={(e) => onUpdateConfig({ ...config, senderTitle: e.target.value })}
                    placeholder="e.g. your girl, wifey, me"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--strawberry)]"
                  />
                  <span className="text-[11px] text-gray-500 mt-0.5 block">
                    Used in letter sign-offs.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Top Brand Text
                </label>
                <input
                  type="text"
                  value={config.brand}
                  onChange={(e) => onUpdateConfig({ ...config, brand: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--strawberry)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Footer Note
                </label>
                <input
                  type="text"
                  value={config.footerText}
                  onChange={(e) => onUpdateConfig({ ...config, footerText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--strawberry)]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: LEVEL 1 ENVELOPE */}
          {activeTab === 'envelope' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Top Kicker / Eyebrow
                </label>
                <input
                  type="text"
                  value={config.level1.kicker}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      level1: { ...config.level1, kicker: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={config.level1.title}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      level1: { ...config.level1, title: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm font-serif font-bold text-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Envelope Prompt
                </label>
                <input
                  type="text"
                  value={config.level1.prompt}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      level1: { ...config.level1, prompt: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Welcome Message (Revealed after envelope unseals)
                </label>
                <input
                  type="text"
                  value={config.level1.welcomeMessage}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      level1: { ...config.level1, welcomeMessage: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm font-script text-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Start Button Label
                </label>
                <input
                  type="text"
                  value={config.level1.buttonText}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      level1: { ...config.level1, buttonText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm font-bold"
                />
              </div>
            </div>
          )}

          {/* TAB 3: LEVEL 2 HEARTS */}
          {activeTab === 'hearts' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={config.level2.title}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        level2: { ...config.level2, title: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm font-serif font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                    Instructions
                  </label>
                  <input
                    type="text"
                    value={config.level2.instructions}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        level2: { ...config.level2, instructions: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#9c4c64] mb-2">
                  5 Heart Clues (Revealed when clicked)
                </h4>
                <div className="space-y-3">
                  {config.level2.hearts.map((h, idx) => (
                    <div key={h.id} className="flex items-center gap-3 p-3 bg-white border border-[#ebd0d5] rounded-2xl">
                      <span className="w-8 h-8 rounded-full bg-[#fce9ec] text-[var(--strawberry)] flex items-center justify-center font-bold text-xs flex-shrink-0">
                        #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={h.note}
                        onChange={(e) => {
                          const updated = [...config.level2.hearts];
                          updated[idx] = { ...h, note: e.target.value };
                          onUpdateConfig({
                            ...config,
                            level2: { ...config.level2, hearts: updated },
                          });
                        }}
                        className="flex-1 px-3 py-2 rounded-xl border border-[#ecd2d7] text-sm font-script text-base"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Celebration Text (When all 5 found)
                </label>
                <textarea
                  rows={2}
                  value={config.level2.celebrationText}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      level2: { ...config.level2, celebrationText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm font-script text-lg"
                />
              </div>
            </div>
          )}

          {/* TAB 4: LEVEL 3 QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    value={config.level3.title}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        level3: { ...config.level3, title: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm font-serif font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                    Subtext / Intro
                  </label>
                  <input
                    type="text"
                    value={config.level3.intro}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        level3: { ...config.level3, intro: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm"
                  />
                </div>
              </div>

              {config.level3.questions.map((q, qIdx) => (
                <div key={q.id} className="p-4 sm:p-5 bg-white border-2 border-[#ebd3d8] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-[var(--strawberry)]">
                      Question {qIdx + 1} of {config.level3.questions.length}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Question Prompt</label>
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => {
                        const updated = [...config.level3.questions];
                        updated[qIdx] = { ...q, question: e.target.value };
                        onUpdateConfig({ ...config, level3: { ...config.level3, questions: updated } });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-[#ebd3d8] text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-600">3 Options (Check the "ideal/correct" one):</label>
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${q.id}`}
                          checked={q.correctIndex === optIdx}
                          onChange={() => {
                            const updated = [...config.level3.questions];
                            updated[qIdx] = { ...q, correctIndex: optIdx };
                            onUpdateConfig({ ...config, level3: { ...config.level3, questions: updated } });
                          }}
                          className="w-4 h-4 text-[var(--strawberry)] focus:ring-[var(--strawberry)]"
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...q.options] as [string, string, string];
                            newOpts[optIdx] = e.target.value;
                            const updated = [...config.level3.questions];
                            updated[qIdx] = { ...q, options: newOpts };
                            onUpdateConfig({ ...config, level3: { ...config.level3, questions: updated } });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-[#ebd3d8] text-sm"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-700 mb-1">
                        Correct Answer Feedback ♡
                      </label>
                      <input
                        type="text"
                        value={q.correctFeedback}
                        onChange={(e) => {
                          const updated = [...config.level3.questions];
                          updated[qIdx] = { ...q, correctFeedback: e.target.value };
                          onUpdateConfig({ ...config, level3: { ...config.level3, questions: updated } });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50/40 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#b45b77] mb-1">
                        Alternate Answer Feedback ♡
                      </label>
                      <input
                        type="text"
                        value={q.alternateFeedback}
                        onChange={(e) => {
                          const updated = [...config.level3.questions];
                          updated[qIdx] = { ...q, alternateFeedback: e.target.value };
                          onUpdateConfig({ ...config, level3: { ...config.level3, questions: updated } });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-[#f3cad3] bg-[#fff5f7] text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: LEVEL 4 LOVE LETTER */}
          {activeTab === 'letter' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Letter Title
                </label>
                <input
                  type="text"
                  value={config.level4.title}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      level4: { ...config.level4, title: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm font-serif font-bold text-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Letter Paragraphs (Each line will become a handwritten paragraph)
                </label>
                <textarea
                  rows={8}
                  value={config.level4.paragraphs.join('\n\n')}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      level4: {
                        ...config.level4,
                        paragraphs: e.target.value.split('\n\n').filter((p) => p.trim()),
                      },
                    })
                  }
                  placeholder="Type your sincere message here..."
                  className="w-full px-4 py-3 rounded-2xl border border-[#eab8bc] bg-white text-base font-script leading-relaxed"
                />
                <span className="text-[11px] text-gray-500 mt-1 block">
                  Tip: Separate paragraphs with a blank line.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                    Sign-off
                  </label>
                  <input
                    type="text"
                    value={config.level4.signoff}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        level4: { ...config.level4, signoff: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm font-script text-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                    Continue Button Text
                  </label>
                  <input
                    type="text"
                    value={config.level4.buttonText}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        level4: { ...config.level4, buttonText: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: LEVEL 5 GIFT LETTERS */}
          {activeTab === 'gifts' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={config.level5.title}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      level5: { ...config.level5, title: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm font-serif font-bold"
                />
              </div>

              {config.level5.gifts.map((gift, gIdx) => (
                <div key={gift.id} className="p-4 sm:p-5 bg-white border-2 border-[#ebd3d8] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-[var(--strawberry)]">
                      Letter #{gIdx + 1}
                    </span>
                    <input
                      type="text"
                      value={gift.icons}
                      onChange={(e) => {
                        const updated = [...config.level5.gifts];
                        updated[gIdx] = { ...gift, icons: e.target.value };
                        onUpdateConfig({ ...config, level5: { ...config.level5, gifts: updated } });
                      }}
                      className="w-20 px-2 py-1 rounded-lg border border-[#ebd3d8] text-center text-sm"
                      placeholder="Icons"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Card Title</label>
                    <input
                      type="text"
                      value={gift.title}
                      onChange={(e) => {
                        const updated = [...config.level5.gifts];
                        updated[gIdx] = { ...gift, title: e.target.value };
                        onUpdateConfig({ ...config, level5: { ...config.level5, gifts: updated } });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-[#ebd3d8] text-sm font-serif font-bold text-[var(--strawberry)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                      Full Letter Message
                    </label>
                    <textarea
                      rows={6}
                      value={gift.letterText}
                      onChange={(e) => {
                        const updated = [...config.level5.gifts];
                        updated[gIdx] = { ...gift, letterText: e.target.value };
                        onUpdateConfig({ ...config, level5: { ...config.level5, gifts: updated } });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#ebd3d8] text-sm leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: FINALE */}
          {activeTab === 'finale' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Finale Eyebrow
                </label>
                <input
                  type="text"
                  value={config.finale.kicker}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      finale: { ...config.finale, kicker: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Hug Illustration / Emoji
                </label>
                <input
                  type="text"
                  value={config.finale.illustration}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      finale: { ...config.finale, illustration: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-2xl text-center"
                  placeholder="e.g. 🫂💕, 💖🥰, 🐱❤️"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Finale Title
                </label>
                <input
                  type="text"
                  value={config.finale.title}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      finale: { ...config.finale, title: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-sm font-serif font-bold text-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3f56] uppercase mb-1">
                  Finale Message
                </label>
                <textarea
                  rows={3}
                  value={config.finale.message}
                  onChange={(e) =>
                    onUpdateConfig({
                      ...config,
                      finale: { ...config.finale, message: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eab8bc] bg-white text-base font-script"
                />
              </div>
            </div>
          )}

          {/* TAB 8: SHARE & EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="p-5 bg-white border border-[#ebd0d6] rounded-2xl space-y-3">
                <h4 className="font-bold text-sm text-[var(--strawberry)] flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" /> Share With Your Partner
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your customized text, questions, and letters are saved in your browser and can also be shared directly via a custom URL link!
                </p>
                <button
                  type="button"
                  onClick={handleShareClick}
                  className="primary-btn w-full py-3 text-sm shadow-md"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Shareable Partner Link'}</span>
                </button>
              </div>

              <div className="p-5 bg-white border border-[#ebd0d6] rounded-2xl space-y-3">
                <h4 className="font-bold text-sm text-[#7d3b50] flex items-center gap-1.5">
                  <Download className="w-4 h-4" /> Backup & Import Data
                </h4>
                <p className="text-xs text-gray-600">
                  Save your customized game as a JSON file or restore from a previously saved backup.
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadJson}
                    className="secondary-btn text-xs py-2 px-3 flex-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Download JSON
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="secondary-btn text-xs py-2 px-3 flex-1"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'JSON Copied!' : 'Copy JSON'}</span>
                  </button>
                </div>

                <div className="pt-2">
                  <label className="secondary-btn w-full text-xs py-2 px-3 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" /> Import JSON Backup
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                  </label>
                  {importError && (
                    <p className="text-xs text-rose-600 mt-1">{importError}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#fff5f0] border-t border-[#f0cbd1] flex items-center justify-between">
          <span className="text-xs text-[#9c4c64] font-medium">
            Changes apply in real-time to the game preview ♡
          </span>
          <button
            type="button"
            onClick={onClose}
            className="primary-btn text-xs sm:text-sm py-2 px-6 shadow-sm"
          >
            Done Editing ♡
          </button>
        </div>
      </div>
    </div>
  );
};
