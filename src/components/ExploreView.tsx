import React, { useState } from 'react';
import { SAMPLE_TOPICS } from '../data/sampleTopics';
import { EvidenceCard } from './EvidenceCard';
import { Compass, ArrowRight } from 'lucide-react';
import { SavedEvidence } from '../types';

interface ExploreViewProps {
  arabicFontSize: 'normal' | 'large' | 'xlarge';
  onAskTopic: (question: string) => void;
  onSaveEvidence: (evidence: SavedEvidence) => void;
  savedEvidences: SavedEvidence[];
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  arabicFontSize,
  onAskTopic,
  onSaveEvidence,
  savedEvidences,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(SAMPLE_TOPICS[0].id);

  const categories = ['All', 'Worship', 'Ethics', 'Pillars', 'Dua', 'History'];

  const filteredTopics = selectedCategory === 'All'
    ? SAMPLE_TOPICS
    : SAMPLE_TOPICS.filter((t) => t.category === selectedCategory);

  const isSaved = (topicId: string) => {
    return savedEvidences.some((s) => s.id === `topic_${topicId}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-zinc-900 dark:text-zinc-100 transition-colors">
      
      {/* Header */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-sm mb-8 transition-colors">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            Explore Essential Islamic Topics
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-3xl">
          Browse foundational Islamic knowledge topics complete with Arabic Quranic verses, Hadith citations, and English translations.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
              }`}
              id={`cat-btn-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-6">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;

          return (
            <div
              key={topic.id}
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-all"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-md">
                      {topic.category}
                    </span>
                    <h2 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">
                      {topic.title}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    {topic.description}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => onAskTopic(topic.question)}
                    id={`btn-ask-topic-${topic.id}`}
                    className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
                  >
                    <span>Ask AI About This</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                    className="px-3 py-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-xl transition-colors border border-zinc-200 dark:border-zinc-800"
                  >
                    {isExpanded ? 'Hide Evidences' : 'View Evidences'}
                  </button>
                </div>
              </div>

              {/* Preview Arabic verse if collapsed */}
              {!isExpanded && topic.previewArabic && (
                <div className="bg-zinc-50 dark:bg-zinc-900/90 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-right mt-2">
                  <p className="text-base text-zinc-800 dark:text-zinc-200 font-serif" dir="rtl">
                    {topic.previewArabic}
                  </p>
                </div>
              )}

              {/* Expanded Evidences Display */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
                  
                  {/* Direct Answer */}
                  <div className="bg-zinc-50 dark:bg-zinc-900/90 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                      Overview Explanation
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                      {topic.presetData.directAnswer}
                    </p>
                  </div>

                  {/* Quran Evidences */}
                  {topic.presetData.quranEvidences.map((quran, qIdx) => (
                    <EvidenceCard
                      key={qIdx}
                      type="quran"
                      quranData={quran}
                      arabicFontSize={arabicFontSize}
                      onSave={() =>
                        onSaveEvidence({
                          id: `topic_${topic.id}_q_${qIdx}`,
                          question: topic.question,
                          response: topic.presetData,
                          savedAt: new Date().toLocaleDateString(),
                          category: topic.category,
                        })
                      }
                      isSaved={isSaved(topic.id)}
                    />
                  ))}

                  {/* Hadith Evidences */}
                  {topic.presetData.hadithEvidences.map((hadith, hIdx) => (
                    <EvidenceCard
                      key={hIdx}
                      type="hadith"
                      hadithData={hadith}
                      arabicFontSize={arabicFontSize}
                      onSave={() =>
                        onSaveEvidence({
                          id: `topic_${topic.id}_h_${hIdx}`,
                          question: topic.question,
                          response: topic.presetData,
                          savedAt: new Date().toLocaleDateString(),
                          category: topic.category,
                        })
                      }
                      isSaved={isSaved(topic.id)}
                    />
                  ))}

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};

