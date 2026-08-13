import React, { useState, useEffect } from 'react';
import { User, AppView, SavedEvidence } from './types';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { DashboardView } from './components/DashboardView';
import { ChatWorkspace } from './components/ChatWorkspace';
import { ExploreView } from './components/ExploreView';
import { SavedView } from './components/SavedView';

export default function App() {
  // Application View state: default to 'landing' (overview) per requirements
  const [currentView, setCurrentView] = useState<AppView>('landing');

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
    // Automatically transition to the Islamic AI main dashboard after sign in / sign up
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
        return prev.filter((item) => item.id !== evidence.id); // Toggle off if already saved
      }
      return [evidence, ...prev];
    });
  };

  // Remove Saved Evidence
  const handleRemoveSaved = (id: string) => {
    setSavedEvidences((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onLogout={handleLogout}
        arabicFontSize={arabicFontSize}
        setArabicFontSize={setArabicFontSize}
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
            onAskTopic={(_question) => {
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
          />
        )}

        {currentView === 'explore' && (
          <ExploreView
            arabicFontSize={arabicFontSize}
            onAskTopic={(_question) => {
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

    </div>
  );
}
