import React, { useState } from 'react';
import { Bookmark, Search, Trash2, BookOpen, Share2, Copy, Check } from 'lucide-react';
import { SavedEvidence } from '../types';
import { EvidenceCard } from './EvidenceCard';

interface SavedViewProps {
  savedEvidences: SavedEvidence[];
  onRemoveSaved: (id: string) => void;
  arabicFontSize: 'normal' | 'large' | 'xlarge';
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedEvidences,
  onRemoveSaved,
  arabicFontSize,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = savedEvidences.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(q) ||
      item.response.directAnswer.toLowerCase().includes(q) ||
      item.response.quranEvidences.some((v) => v.englishTranslation.toLowerCase().includes(q) || v.surahName.toLowerCase().includes(q)) ||
      item.response.hadithEvidences.some((h) => h.englishTranslation.toLowerCase().includes(q) || h.collection.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Saved Islamic Evidences
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            {savedEvidences.length} saved report{savedEvidences.length === 1 ? '' : 's'} in your digital library.
          </p>
        </div>

        {/* Search Filter */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved evidences..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Empty State */}
      {savedEvidences.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/60 border border-slate-800 rounded-2xl p-8">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-300">No Saved Evidences Yet</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            When you ask questions in Islamic AI or explore topics, click "Save Answer" or "Save" to bookmark them here for quick offline reference.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <p className="text-sm font-semibold text-slate-400">
            No saved reports match "{searchQuery}".
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative"
            >
              {/* Header Ribbon */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block">
                    Question:
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    {item.question}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[10px] text-slate-500 font-mono">
                    Saved {item.savedAt}
                  </span>
                  <button
                    onClick={() => onRemoveSaved(item.id)}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/60 rounded-lg transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Direct Answer */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {item.response.directAnswer}
                </p>
              </div>

              {/* Quran Evidences */}
              {item.response.quranEvidences?.map((quran, qIdx) => (
                <div key={qIdx} className="mb-4">
                  <EvidenceCard
                    type="quran"
                    quranData={quran}
                    arabicFontSize={arabicFontSize}
                  />
                </div>
              ))}

              {/* Hadith Evidences */}
              {item.response.hadithEvidences?.map((hadith, hIdx) => (
                <div key={hIdx} className="mb-4">
                  <EvidenceCard
                    type="hadith"
                    hadithData={hadith}
                    arabicFontSize={arabicFontSize}
                  />
                </div>
              ))}

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
