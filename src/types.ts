export interface User {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  authProvider: 'google' | 'email' | 'phone' | 'guest';
  avatar?: string;
}

export interface QuranEvidence {
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  transliteration?: string;
  englishTranslation: string;
  explanation?: string;
}

export interface HadithEvidence {
  collection: string;
  hadithNumber: string;
  grade?: string;
  arabicText: string;
  englishTranslation: string;
  lesson?: string;
  explanation?: string;
}

export interface IslamicAIResponse {
  directAnswer: string;
  quranEvidences: QuranEvidence[];
  hadithEvidences: HadithEvidence[];
  scholarlySummary: string;
  keyTakeaways: string[];
  closingReflection?: string;
}

export interface QAMessage {
  id: string;
  sender: 'user' | 'ai';
  text?: string;
  response?: IslamicAIResponse;
  timestamp: string;
  category?: string;
  isLoading?: boolean;
}

export interface SavedEvidence {
  id: string;
  question: string;
  response: IslamicAIResponse;
  savedAt: string;
  category?: string;
}

export type AppView = 'landing' | 'auth' | 'dashboard' | 'chat' | 'saved' | 'explore' | 'about';
export type AuthTab = 'login' | 'signup';
export type AuthMethod = 'all' | 'google' | 'email' | 'phone';
