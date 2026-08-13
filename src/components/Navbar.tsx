import React, { useState } from 'react';
import { Menu, SquarePen, X, Sparkles, Bookmark, User as UserIcon, LogOut, Compass, LayoutDashboard, Moon, Calendar, MapPin, Settings } from 'lucide-react';
import { User, AppView } from '../types';
import { QiblaModal } from './QiblaModal';
import { IslamicCalendarModal } from './IslamicCalendarModal';
import { ThemeMode } from './SettingsModal';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  user: User | null;
  onLogout: () => void;
  arabicFontSize: 'normal' | 'large' | 'xlarge';
  setArabicFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  user,
  onLogout,
  arabicFontSize,
  setArabicFontSize,
  themeMode,
  setThemeMode,
  onOpenSettings,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showQiblaModal, setShowQiblaModal] = useState(false);
  const [showIslamicCalendarModal, setShowIslamicCalendarModal] = useState(false);

  // Hide navbar navigation on initial welcome screen ('landing') and auth screen ('auth')
  if (currentView === 'landing' || currentView === 'auth') {
    return null;
  }

  const handleStartNewChat = () => {
    setCurrentView('chat');
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* App Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm px-4 py-3 transition-colors">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Left: Menu & Settings Quick Button */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsDrawerOpen(true)}
              id="btn-open-menu"
              className="p-2 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition-colors flex items-center justify-center"
              title="Open Menu"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenSettings}
              className="p-2 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition-colors flex items-center justify-center"
              title="Settings & Themes"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Center: Brand Title */}
          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-7 h-7 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center shadow-sm">
              <Moon className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-black text-sm sm:text-base tracking-tight text-zinc-900 dark:text-white">
              Noor AI
            </span>
          </button>

          {/* Right: New Chat Icon */}
          <button
            onClick={handleStartNewChat}
            id="btn-new-chat"
            className="p-2 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition-colors flex items-center justify-center"
            title="Create New Chat"
            aria-label="Create New Chat"
          >
            <SquarePen className="w-5 h-5" />
          </button>

        </div>
      </header>

      {/* Slide-over Side Drawer Menu */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Sidebar */}
          <div className="relative w-80 max-w-[80vw] bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between p-5 z-10 text-zinc-900 dark:text-zinc-100 transition-colors">
            
            {/* Top Header inside Drawer */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-5">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center shadow-sm">
                    <Moon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-white">
                      Noor AI
                    </span>
                    <span className="block text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                      Verified Guidance
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"
                  title="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1 mb-6">
                <p className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-3 mb-1.5">
                  Navigation
                </p>

                <button
                  onClick={() => {
                    setCurrentView('dashboard');
                    setIsDrawerOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                    currentView === 'dashboard'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={handleStartNewChat}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                    currentView === 'chat'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <SquarePen className="w-4 h-4" />
                  <span>New Chat</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('explore');
                    setIsDrawerOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                    currentView === 'explore'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Topics</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('saved');
                    setIsDrawerOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                    currentView === 'saved'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Saved Evidences</span>
                </button>

                <p className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-3 pt-3 mb-1">
                  Tools & Settings
                </p>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setShowQiblaModal(true);
                  }}
                  className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Qibla Location</span>
                </button>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setShowIslamicCalendarModal(true);
                  }}
                  className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Islamic Calendar</span>
                </button>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onOpenSettings();
                  }}
                  className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings & Themes</span>
                </button>
              </div>

            </div>

            {/* Bottom Footer inside Drawer */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              {user ? (
                <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center text-xs font-extrabold shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">{user.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onLogout();
                      setIsDrawerOpen(false);
                    }}
                    className="p-2 text-zinc-500 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                    title="Log Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setCurrentView('auth');
                    setIsDrawerOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 py-3 rounded-2xl font-bold text-xs transition-all shadow-md"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Sign In / Sign Up</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Fixed App Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 shadow-xl py-2 px-4 transition-colors">
        <div className="max-w-md mx-auto flex items-center justify-around">
          
          {/* Dashboard Tab */}
          <button
            onClick={() => setCurrentView('dashboard')}
            id="app-tab-dashboard"
            className={`flex flex-col items-center space-y-1 px-3 py-1 rounded-xl transition-all ${
              currentView === 'dashboard'
                ? 'text-zinc-950 dark:text-white font-extrabold scale-105'
                : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Dashboard</span>
          </button>

          {/* Ask AI Tab */}
          <button
            onClick={handleStartNewChat}
            id="app-tab-chat"
            className={`flex flex-col items-center space-y-1 px-3 py-1 rounded-xl transition-all ${
              currentView === 'chat'
                ? 'text-zinc-950 dark:text-white font-extrabold scale-105'
                : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Ask AI</span>
          </button>

          {/* Explore Topics Tab */}
          <button
            onClick={() => setCurrentView('explore')}
            id="app-tab-explore"
            className={`flex flex-col items-center space-y-1 px-3 py-1 rounded-xl transition-all ${
              currentView === 'explore'
                ? 'text-zinc-950 dark:text-white font-extrabold scale-105'
                : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Explore</span>
          </button>

          {/* Saved Evidences Tab */}
          <button
            onClick={() => setCurrentView('saved')}
            id="app-tab-saved"
            className={`flex flex-col items-center space-y-1 px-3 py-1 rounded-xl transition-all ${
              currentView === 'saved'
                ? 'text-zinc-950 dark:text-white font-extrabold scale-105'
                : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Saved</span>
          </button>

        </div>
      </div>

      {/* Qibla Location Finder Modal */}
      <QiblaModal
        isOpen={showQiblaModal}
        onClose={() => setShowQiblaModal(false)}
      />

      {/* Islamic Hijri Calendar Modal */}
      <IslamicCalendarModal
        isOpen={showIslamicCalendarModal}
        onClose={() => setShowIslamicCalendarModal(false)}
      />
    </>
  );
};



