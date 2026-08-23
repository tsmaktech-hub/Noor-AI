import React, { useState, useEffect } from 'react';
import { User, AppView, SavedEvidence } from './types';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { DashboardView } from './components/DashboardView';
import { ChatWorkspace } from './components/ChatWorkspace';
import { ExploreView } from './components/ExploreView';
import { SavedView } from './components/SavedView';
import { ThemeMode, SettingsModal } from './components/SettingsModal';

export default function App() {
  // Application View state: default to 'landing' (overview) per requirements
  const [currentView, setCurrentView] = useState<AppView>('landing');

  // Theme preference state: 'dark' | 'light' | 'system'
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('noor_ai_theme');
      return (saved as ThemeMode) || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // User Authentication state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('islamic_ai_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Arabic Font Size preference
  const [arabicFontSize, setArabicFontSize] = useState<'normal' | 'large' | 'xlarge'>(() => {
    try {
      const saved = localStorage.getItem('islamic_ai_font_size');
      return (saved as any) || 'normal';
    } catch {
      return 'normal';
    }
  });

  // Saved Evidences state
  const [savedEvidences, setSavedEvidences] = useState<SavedEvidence[]>(() => {
    try {
      const saved = localStorage.getItem('islamic_ai_saved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active query to forward from Dashboard/Explore into Chat
  const [activeChatQuery, setActiveChatQuery] = useState<string>('');

  // Apply Theme Mode (Dark / Light / System Default)
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark');
        document.body.style.backgroundColor = '#000000';
        document.body.style.color = '#ffffff';
      } else {
        root.classList.remove('dark');
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#09090b';
      }
    };

    if (themeMode === 'dark') {
      applyTheme(true);
    } else if (themeMode === 'light') {
      applyTheme(false);
    } else {
      // System Default Mode
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    try {
      localStorage.setItem('noor_ai_theme', themeMode);
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  }, [themeMode]);

  // Persist Font Size
  useEffect(() => {
    try {
      localStorage.setItem('islamic_ai_font_size', arabicFontSize);
    } catch (e) {
      console.error('Failed to save font size', e);
    }
  }, [arabicFontSize]);

  // Persist Saved Evidences
  useEffect(() => {
    try {
      localStorage.setItem('islamic_ai_saved', JSON.stringify(savedEvidences));
    } catch (e) {
      console.error('Failed to save evidences', e);
    }
  }, [savedEvidences]);

  // Handle Authentication Success
  const handleAuthSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    try {
      localStorage.setItem('islamic_ai_user', JSON.stringify(loggedUser));
    } catch (e) {
      console.error('Failed to save user state', e);
    }
    setCurrentView('dashboard');
  };

  // Handle Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('islamic_ai_user');
    setCurrentView('landing');
  };

  // Save/Bookmark Evidence
  const handleSaveEvidence = (evidence: SavedEvidence) => {
    setSavedEvidences((prev) => {
      if (prev.some((item) => item.id === evidence.id)) {
        return prev.filter((item) => item.id !== evidence.id);
      }
      return [evidence, ...prev];
    });
  };

  // Remove Saved Evidence
  const handleRemoveSaved = (id: string) => {
    setSavedEvidences((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearData = () => {
    localStorage.removeItem('islamic_ai_saved');
    setSavedEvidences([]);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 flex flex-col font-sans antialiased transition-colors duration-200 selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-950">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onLogout={handleLogout}
        arabicFontSize={arabicFontSize}
        setArabicFontSize={setArabicFontSize}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Primary Page Content Router */}
      <main className={`flex-1 ${currentView !== 'landing' ? 'pb-24' : ''}`}>
        {currentView === 'landing' && (
          <LandingPage
            onGetStarted={() => setCurrentView('dashboard')}
            onExploreDirectly={() => setCurrentView('explore')}
          />
        )}

        {currentView === 'auth' && (
          <AuthPage
            onAuthSuccess={handleAuthSuccess}
            onBackToOverview={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            arabicFontSize={arabicFontSize}
            onAskTopic={(question) => {
              setActiveChatQuery(question);
              setCurrentView('chat');
            }}
            onSaveEvidence={handleSaveEvidence}
            savedEvidences={savedEvidences}
          />
        )}

        {currentView === 'chat' && (
          <ChatWorkspace
            arabicFontSize={arabicFontSize}
            onSaveEvidence={handleSaveEvidence}
            savedEvidences={savedEvidences}
            initialQuery={activeChatQuery}
            onClearInitialQuery={() => setActiveChatQuery('')}
          />
        )}

        {currentView === 'explore' && (
          <ExploreView
            arabicFontSize={arabicFontSize}
            onAskTopic={(question) => {
              setActiveChatQuery(question);
              setCurrentView('chat');
            }}
            onSaveEvidence={handleSaveEvidence}
            savedEvidences={savedEvidences}
          />
        )}

        {currentView === 'saved' && (
          <SavedView
            savedEvidences={savedEvidences}
            onRemoveSaved={handleRemoveSaved}
            arabicFontSize={arabicFontSize}
          />
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        arabicFontSize={arabicFontSize}
        setArabicFontSize={setArabicFontSize}
        onClearData={handleClearData}
      />

    </div>
  );
}

