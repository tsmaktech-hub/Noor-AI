import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, BookOpen, Bookmark, ShieldAlert, RefreshCw, Copy, Check, MessageSquare, Compass, HelpCircle } from 'lucide-react';
import { IslamicAIResponse, QAMessage, SavedEvidence } from '../types';
import { EvidenceCard } from './EvidenceCard';

interface ChatWorkspaceProps {
  arabicFontSize: 'normal' | 'large' | 'xlarge';
  onSaveEvidence: (evidence: SavedEvidence) => void;
  savedEvidences: SavedEvidence[];
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
}) => {
  const [messages, setMessages] = useState<QAMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
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
  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

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
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Server returned an error status: ' + res.status);
      }

      const data: IslamicAIResponse = await res.json();

      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsgId
            ? {
                ...m,
                isLoading: false,
                response: data,
              }
            : m
        )
      );
    } catch (err: any) {
      console.error('Error fetching Islamic AI answer:', err);
      setErrorText('Could not complete query. Please check your network and try again.');
      setMessages((prev) => prev.filter((m) => m.id !== aiMsgId));
    } finally {
      setIsLoading(false);
    }
  };

  const isSaved = (msgId: string) => {
    return savedEvidences.some((s) => s.id === msgId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Top Banner & Disclaimer */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-blue-400 flex items-center justify-center shrink-0 border border-slate-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Noor AI Evidence Assistant
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Type any question to receive authentic answers with Arabic Uthmani Quran verses and Hadith citations.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-blue-300">
            <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Educational AI Companion • For fatwas consult a scholar</span>
          </div>
        </div>
      </div>

      {/* Suggested Quick Prompts (if chat is empty) */}
      {messages.length === 0 && (
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl mb-8">
          <h2 className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span>Popular Islamic Questions to Ask</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt.query)}
                className="text-left bg-slate-950 hover:bg-slate-800 p-3.5 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all group"
                id={`btn-prompt-${idx}`}
              >
                <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                  {prompt.label}
                </p>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
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
                <div className="bg-blue-600 text-white max-w-2xl px-5 py-3.5 rounded-2xl rounded-tr-none shadow-lg border border-blue-500/40">
                  <p className="text-xs text-blue-200 font-semibold mb-1 uppercase tracking-wider">
                    Your Question:
                  </p>
                  <p className="text-sm sm:text-base font-medium">{msg.text}</p>
                  <span className="text-[10px] text-blue-200/80 block text-right mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 relative">
                
                {msg.isLoading ? (
                  <div className="flex items-center space-x-3 py-8 justify-center text-blue-300">
                    <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
                    <span className="text-sm font-medium animate-pulse">
                      Searching authentic Quran and Hadith sources...
                    </span>
                  </div>
                ) : msg.response ? (
                  <>
                    {/* Header bar of response */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                          ☪
                        </div>
                        <span className="text-sm font-bold text-blue-300">
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
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                          isSaved(msg.id)
                            ? 'bg-blue-600 text-white font-bold'
                            : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                        }`}
                        id={`btn-save-response-${msg.id}`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{isSaved(msg.id) ? 'Saved' : 'Save Answer'}</span>
                      </button>
                    </div>

                    {/* Direct Answer Summary */}
                    <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 shadow-inner">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
                        Summary Answer
                      </h3>
                      <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                        {msg.response.directAnswer}
                      </p>
                    </div>

                    {/* Quran Evidences */}
                    {msg.response.quranEvidences && msg.response.quranEvidences.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center space-x-2">
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
                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center space-x-2">
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
                      <div className="bg-slate-950 p-5 rounded-xl border border-blue-500/20 shadow-inner">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">
                          Scholarly Guidance & Key Takeaways
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                          {msg.response.scholarlySummary}
                        </p>

                        {msg.response.keyTakeaways && msg.response.keyTakeaways.length > 0 && (
                          <ul className="space-y-1.5 pl-2 border-l-2 border-blue-500 text-xs text-slate-300">
                            {msg.response.keyTakeaways.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start space-x-2">
                                <span className="text-blue-400 font-bold">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {msg.response.closingReflection && (
                          <p className="mt-4 pt-3 border-t border-slate-800 text-right text-sm text-blue-200 font-serif" dir="rtl">
                            {msg.response.closingReflection}
                          </p>
                        )}
                      </div>
                    )}

                  </>
                ) : null}

              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Alert if any */}
      {errorText && (
        <div className="mb-4 p-3 bg-rose-950/90 border border-rose-800 text-rose-300 rounded-xl text-xs flex items-center justify-between">
          <span>{errorText}</span>
          <button onClick={() => setErrorText(null)} className="font-bold underline text-xs">
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
          className="bg-slate-900/95 backdrop-blur-md p-2 sm:p-3 rounded-2xl border border-slate-800 shadow-2xl flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask any Islamic question (e.g., Virtues of Tahajjud, Sabr, Zakat, Rights of Parents)..."
            disabled={isLoading}
            className="flex-1 bg-slate-950 text-white placeholder-slate-500 text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none"
            id="input-islamic-ai-query"
          />

          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            id="btn-send-query"
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center space-x-2 disabled:opacity-50 shrink-0"
          >
            <span>Ask AI</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
