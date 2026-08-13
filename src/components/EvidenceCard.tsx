import React, { useState } from 'react';
import { BookOpen, Copy, Check, Volume2, VolumeX, Sparkles, Share2, Eye, EyeOff } from 'lucide-react';
import { QuranEvidence, HadithEvidence } from '../types';

interface EvidenceCardProps {
  type: 'quran' | 'hadith';
  quranData?: QuranEvidence;
  hadithData?: HadithEvidence;
  arabicFontSize?: 'normal' | 'large' | 'xlarge';
  onSave?: () => void;
  isSaved?: boolean;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  type,
  quranData,
  hadithData,
  arabicFontSize = 'normal',
  onSave,
  isSaved = false,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);

  // Dynamic Arabic Font Size Class
  const getArabicSizeClass = () => {
    switch (arabicFontSize) {
      case 'large':
        return 'text-2xl sm:text-3xl leading-loose';
      case 'xlarge':
        return 'text-3xl sm:text-4xl leading-[2.2]';
      case 'normal':
      default:
        return 'text-xl sm:text-2xl leading-loose';
    }
  };

  // Text-to-Speech for Arabic
  const handleSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85; // Slightly slower for clear Quranic/Arabic pronunciation

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(label);
    setTimeout(() => setCopiedType(null), 2000);
  };

  if (type === 'quran' && quranData) {
    const fullCitation = `[Surah ${quranData.surahName} (${quranData.surahNumber}:${quranData.ayahNumber})]`;
    const fullFormatted = `${quranData.arabicText}\n\nTranslation: ${quranData.englishTranslation}\n\nReference: ${fullCitation}`;

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl hover:border-blue-500/50 transition-all relative overflow-hidden group">
        
        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold text-xs">
              📖
            </span>
            <div>
              <span className="text-sm font-bold text-blue-200">
                Surah {quranData.surahName}
              </span>
              <span className="text-xs text-blue-400 font-mono ml-2">
                [{quranData.surahNumber}:{quranData.ayahNumber}]
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center space-x-1">
            
            {/* Audio Speech */}
            <button
              onClick={() => handleSpeech(quranData.arabicText)}
              className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 ${
                isPlayingAudio
                  ? 'bg-blue-600 text-white font-bold animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:text-blue-300'
              }`}
              title="Listen to Arabic recitation pronunciation"
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline text-[11px]">{isPlayingAudio ? 'Stop' : 'Listen'}</span>
            </button>

            {/* Toggle Transliteration */}
            {quranData.transliteration && (
              <button
                onClick={() => setShowTransliteration(!showTransliteration)}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  showTransliteration ? 'bg-slate-800 text-blue-300' : 'bg-slate-950 text-slate-500'
                }`}
                title="Toggle Transliteration"
              >
                {showTransliteration ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            )}

            {/* Copy Button */}
            <button
              onClick={() => handleCopy(fullFormatted, 'quran')}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
              title="Copy Quran Verse & Translation"
            >
              {copiedType === 'quran' ? <Check className="w-4 h-4 text-blue-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Save Button */}
            {onSave && (
              <button
                onClick={onSave}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSaved
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
            )}
          </div>
        </div>

        {/* Arabic Text Display */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 mb-4 shadow-inner">
          <p
            className={`font-serif text-blue-100 text-right ${getArabicSizeClass()}`}
            dir="rtl"
            style={{ fontFamily: "'Amiri', 'Scheherazade New', 'Traditional Arabic', serif" }}
          >
            {quranData.arabicText}
          </p>
        </div>

        {/* Transliteration */}
        {quranData.transliteration && showTransliteration && (
          <div className="mb-3 px-3 py-2 bg-slate-950/60 rounded-lg border border-slate-800/60">
            <p className="text-xs text-blue-300/90 font-mono italic">
              <span className="text-[10px] uppercase font-bold text-slate-500 not-italic mr-1.5">Transliteration:</span>
              {quranData.transliteration}
            </p>
          </div>
        )}

        {/* English Translation */}
        <div className="mb-3">
          <p className="text-sm text-slate-200 leading-relaxed">
            <span className="text-xs font-bold text-white uppercase tracking-wide mr-2">Translation:</span>
            "{quranData.englishTranslation}"
          </p>
        </div>

        {/* Context / Tafsir Explanation */}
        {quranData.explanation && (
          <div className="mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <strong className="text-blue-300 font-semibold mr-1">Tafsir & Context:</strong>
            {quranData.explanation}
          </div>
        )}

      </div>
    );
  }

  if (type === 'hadith' && hadithData) {
    const fullCitation = `[${hadithData.collection} ${hadithData.hadithNumber} - Grade: ${hadithData.grade || 'Authentic'}]`;
    const fullFormatted = `${hadithData.arabicText}\n\nTranslation: ${hadithData.englishTranslation}\n\nSource: ${fullCitation}`;

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl hover:border-blue-500/50 transition-all relative overflow-hidden group">
        
        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold text-xs">
              📜
            </span>
            <div>
              <span className="text-sm font-bold text-blue-200">
                {hadithData.collection}
              </span>
              <span className="text-xs text-slate-400 font-mono ml-2">
                #{hadithData.hadithNumber}
              </span>
              {hadithData.grade && (
                <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800/60 rounded-full">
                  {hadithData.grade}
                </span>
              )}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center space-x-1">
            {/* Audio Speech */}
            <button
              onClick={() => handleSpeech(hadithData.arabicText)}
              className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 ${
                isPlayingAudio
                  ? 'bg-blue-600 text-white font-bold animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:text-blue-300'
              }`}
              title="Listen to Hadith Arabic pronunciation"
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline text-[11px]">{isPlayingAudio ? 'Stop' : 'Listen'}</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={() => handleCopy(fullFormatted, 'hadith')}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
              title="Copy Hadith & Translation"
            >
              {copiedType === 'hadith' ? <Check className="w-4 h-4 text-blue-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Save Button */}
            {onSave && (
              <button
                onClick={onSave}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSaved
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
            )}
          </div>
        </div>

        {/* Arabic Text Display */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 mb-4 shadow-inner">
          <p
            className={`font-serif text-blue-100 text-right ${getArabicSizeClass()}`}
            dir="rtl"
            style={{ fontFamily: "'Amiri', 'Scheherazade New', 'Traditional Arabic', serif" }}
          >
            {hadithData.arabicText}
          </p>
        </div>

        {/* English Translation */}
        <div className="mb-3">
          <p className="text-sm text-slate-200 leading-relaxed">
            <span className="text-xs font-bold text-white uppercase tracking-wide mr-2">Translation:</span>
            "{hadithData.englishTranslation}"
          </p>
        </div>

        {/* Hadith Lesson / Takeaway */}
        {hadithData.lesson && (
          <div className="mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <strong className="text-blue-300 font-semibold mr-1">Prophetic Wisdom:</strong>
            {hadithData.lesson}
          </div>
        )}

      </div>
    );
  }

  return null;
};
