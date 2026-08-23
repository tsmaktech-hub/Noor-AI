import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Send, BookOpen, Bookmark, ShieldAlert, RefreshCw, HelpCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { IslamicAIResponse, QAMessage, SavedEvidence } from '../types';
import { EvidenceCard } from './EvidenceCard';
import { getIslamicKnowledge } from '../services/islamicEngine';

interface ChatWorkspaceProps {
  arabicFontSize: 'normal' | 'large' | 'xlarge';
  onSaveEvidence: (evidence: SavedEvidence) => void;
  savedEvidences: SavedEvidence[];
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

const QUICK_PROMPTS = [
  { label: '5 Pillars of Islam', query: 'What are the 5 Pillars of Islam with Quranic and Hadith evidences?' },
  { label: 'Tahajjud Prayer', query: 'What is the virtue, timing, and method of praying Tahajjud night prayer?' },
  { label: 'Patience (Sabr)', query: 'What does the Quran and Hadith say about Sabr during times of hardship?' },
  { label: 'Rights of Parents', query: 'What are the Quranic commands and Hadiths regarding kindness to parents?' },
  { label: 'Rules of Zakat', query: 'What are the key rules and calculation principles of Zakat in Islam?' },
  { label: 'Morning & Evening Adhkar', query: 'What are the most recommended daily morning and evening supplications (Adhkar)?' },
];

export const ChatWorkspace: React.FC<ChatWorkspaceProps> = ({
  arabicFontSize,
  onSaveEvidence,
  savedEvidences,
  initialQuery,
  onClearInitialQuery,
}) => {
  const [messages, setMessages] = useState<QAMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [selectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Asking Question
  const handleSend = useCallback(async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    const userMsgId = 'msg_user_' + Date.now();
    const aiMsgId = 'msg_ai_' + Date.now();

    const newMessages: QAMessage[] = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: aiMsgId,
        sender: 'ai',
        isLoading: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];

    setMessages(newMessages);
    setInputQuery('');
    setIsLoading(true);
    setErrorText(null);

    try {
      let data: IslamicAIResponse | null = null;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: textToSend,
            category: selectedCategory !== 'All' ? selectedCategory : undefined,
          }),
        });

        if (res.ok) {
          data = await res.json();
        } else {
          console.warn('API returned non-200 status (' + res.status + '), utilizing verified authentic knowledge engine.');
          data = getIslamicKnowledge(textToSend, selectedCategory);
        }
      } catch (fetchErr) {
        console.warn('Fetch error, falling back to local Islamic knowledge engine:', fetchErr);
        data = getIslamicKnowledge(textToSend, selectedCategory);
      }

      if (!data) {
        data = getIslamicKnowledge(textToSend, selectedCategory);
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsgId
            ? {
                ...m,
                isLoading: false,
                response: data!,
              }
            : m
        )
      );
    } catch (err: any) {
      console.error('Error resolving Islamic AI answer:', err);
      // Final resilience fallback
      const fallbackData = getIslamicKnowledge(textToSend, selectedCategory);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsgId
            ? {
                ...m,
                isLoading: false,
                response: fallbackData,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [inputQuery, isLoading, messages, selectedCategory]);

  // Trigger initial query if passed from other views
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery.trim());
      if (onClearInitialQuery) {
        onClearInitialQuery();
      }
    }
  }, [initialQuery, handleSend, onClearInitialQuery]);

  const isSaved = (msgId: string) => {
    return savedEvidences.some((s) => s.id === msgId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-zinc-900 dark:text-zinc-100 transition-colors">
      
      {/* Top Banner & Disclaimer */}
      <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-8 transition-colors">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 flex items-center justify-center shrink-0 border border-zinc-300 dark:border-zinc-800 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                Noor AI Evidence Assistant
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Type any question to receive authentic answers with Arabic Uthmani Quran verses and Hadith citations.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Educational AI Companion • For fatwas consult a scholar</span>
          </div>
        </div>
      </div>

      {/* Suggested Quick Prompts (if chat is empty) */}
      {messages.length === 0 && (
        <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-8 transition-colors">
          <h2 className="text-xs font-extrabold text-zinc-950 dark:text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
            <HelpCircle className="w-4 h-4" />
            <span>Popular Islamic Questions to Ask</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt.query)}
                className="text-left bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all group"
                id={`btn-prompt-${idx}`}
              >
                <p className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 group-hover:underline">
                  {prompt.label}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1">
                  "{prompt.query}"
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Conversation Thread */}
      <div className="space-y-6 mb-8">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.sender === 'user' ? (
              <div className="flex justify-end mb-4">
                <div className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 max-w-2xl px-5 py-3.5 rounded-2xl rounded-tr-none shadow-sm border border-zinc-900 dark:border-zinc-100">
                  <p className="text-[10px] opacity-70 font-bold mb-1 uppercase tracking-wider">
                    Your Question:
                  </p>
                  <p className="text-sm sm:text-base font-semibold">{msg.text}</p>
                  <span className="text-[10px] opacity-60 block text-right mt-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6 relative transition-colors">
                
                {msg.isLoading ? (
                  <div className="flex items-center space-x-3 py-8 justify-center text-zinc-700 dark:text-zinc-300">
                    <RefreshCw className="w-6 h-6 animate-spin text-zinc-900 dark:text-zinc-100" />
                    <span className="text-sm font-bold animate-pulse">
                      Searching authentic Quran and Hadith sources...
                    </span>
                  </div>
                ) : msg.response ? (
                  <>
                    {/* Header bar of response */}
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 flex items-center justify-center font-extrabold text-xs">
                          ☪
                        </div>
                        <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100">
                          Noor AI Evidence Report
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          onSaveEvidence({
                            id: msg.id,
                            question: messages.find((m) => m.id < msg.id)?.text || 'Islamic Inquiry',
                            response: msg.response!,
                            savedAt: new Date().toLocaleDateString(),
                          })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                          isSaved(msg.id)
                            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
                            : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800'
                        }`}
                        id={`btn-save-response-${msg.id}`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{isSaved(msg.id) ? 'Saved' : 'Save Answer'}</span>
                      </button>
                    </div>

                    {/* Direct Answer Summary */}
                    <div className="bg-zinc-50 dark:bg-zinc-900/90 p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <h3 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                        Summary Answer
                      </h3>
                      <p className="text-sm sm:text-base text-zinc-900 dark:text-zinc-100 leading-relaxed font-normal">
                        {msg.response.directAnswer}
                      </p>
                    </div>

                    {/* Quran Evidences */}
                    {msg.response.quranEvidences && msg.response.quranEvidences.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-wider text-zinc-950 dark:text-white flex items-center space-x-2">
                          <BookOpen className="w-4 h-4" />
                          <span>Quranic Evidences ({msg.response.quranEvidences.length})</span>
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          {msg.response.quranEvidences.map((quran, qIdx) => (
                            <EvidenceCard
                              key={qIdx}
                              type="quran"
                              quranData={quran}
                              arabicFontSize={arabicFontSize}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Hadith Evidences */}
                    {msg.response.hadithEvidences && msg.response.hadithEvidences.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-wider text-zinc-950 dark:text-white flex items-center space-x-2">
                          <span>📜</span>
                          <span>Hadith Evidences ({msg.response.hadithEvidences.length})</span>
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          {msg.response.hadithEvidences.map((hadith, hIdx) => (
                            <EvidenceCard
                              key={hIdx}
                              type="hadith"
                              hadithData={hadith}
                              arabicFontSize={arabicFontSize}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Scholarly Summary & Key Takeaways */}
                    {msg.response.scholarlySummary && (
                      <div className="bg-zinc-50 dark:bg-zinc-900/90 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <h4 className="text-xs font-black uppercase tracking-wider text-zinc-950 dark:text-white mb-2">
                          Scholarly Guidance & Key Takeaways
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3">
                          {msg.response.scholarlySummary}
                        </p>

                        {msg.response.keyTakeaways && msg.response.keyTakeaways.length > 0 && (
                          <ul className="space-y-1.5 pl-3 border-l-2 border-zinc-900 dark:border-zinc-100 text-xs text-zinc-800 dark:text-zinc-200">
                            {msg.response.keyTakeaways.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start space-x-2">
                                <span className="font-bold">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {msg.response.closingReflection && (
                          <p className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-right text-sm text-zinc-800 dark:text-zinc-200 font-serif" dir="rtl">
                            {msg.response.closingReflection}
                          </p>
                        )}
                      </div>
                    )}

                  </>
                ) : (
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900/90 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-300 mb-3">
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      <span className="text-sm font-semibold">{msg.text || 'Unable to retrieve answer.'}</span>
                    </div>
                    <button
                      onClick={() => {
                        const previousUserMsg = messages.slice(0, messages.indexOf(msg)).reverse().find(m => m.sender === 'user');
                        if (previousUserMsg?.text) {
                          handleSend(previousUserMsg.text);
                        }
                      }}
                      className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold rounded-xl flex items-center space-x-1.5 hover:opacity-90 transition-opacity"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Question</span>
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Alert if any */}
      {errorText && (
        <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 rounded-xl text-xs flex items-center justify-between font-bold">
          <span>{errorText}</span>
          <button onClick={() => setErrorText(null)} className="underline text-xs">
            Dismiss
          </button>
        </div>
      )}

      {/* Bottom Sticky Query Input Box */}
      <div className="sticky bottom-4 z-30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-2 sm:p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center space-x-2 transition-colors"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask any Islamic question (e.g., Virtues of Tahajjud, Sabr, Zakat, Rights of Parents)..."
            disabled={isLoading}
            className="flex-1 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-xs sm:text-sm px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 focus:outline-none"
            id="input-islamic-ai-query"
          />

          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            id="btn-send-query"
            className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center space-x-2 disabled:opacity-50 shrink-0"
          >
            <span>Ask AI</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};

