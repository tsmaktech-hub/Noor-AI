import React, { useState } from 'react';
import { Menu, SquarePen, X, Sparkles, Bookmark, User as UserIcon, LogOut, Compass, LayoutDashboard, Moon, Calendar, MapPin } from 'lucide-react';
import { User, AppView } from '../types';
import { QiblaModal } from './QiblaModal';
import { IslamicCalendarModal } from './IslamicCalendarModal';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  user: User | null;
  onLogout: () => void;
  arabicFontSize: 'normal' | 'large' | 'xlarge';
  setArabicFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  user,
  onLogout,
  arabicFontSize,
  setArabicFontSize,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showQiblaModal, setShowQiblaModal] = useState(false);
  const [showIslamicCalendarModal, setShowIslamicCalendarModal] = useState(false);

  // Hide all navbar navigation on the initial welcome screen ('landing') and auth screen ('auth')
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
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Left: Menu Icon */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            id="btn-open-menu"
            className="p-2 -ml-2 text-slate-200 hover:text-white hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center"
            title="Open Menu"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6 text-slate-200" />
          </button>

          {/* Center: Brand Title */}
          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-300">
              <Moon className="w-3.5 h-3.5 fill-emerald-300/20" />
            </div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
              Noor AI
            </span>
          </button>

          {/* Right: New Chat Icon */}
          <button
            onClick={handleStartNewChat}
            id="btn-new-chat"
            className="p-2 -mr-2 text-slate-200 hover:text-white hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center"
            title="Create New Chat"
            aria-label="Create New Chat"
          >
            <SquarePen className="w-6 h-6 text-emerald-400" />
          </button>

        </div>
      </header>

      {/* Slide-over Side Drawer Menu */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Sidebar */}
          <div className="relative w-80 max-w-[80vw] bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col justify-between p-5 z-10">
            
            {/* Top Header inside Drawer */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-300 shadow-md">
                    <Moon className="w-4 h-4 fill-emerald-300/30" />
                  </div>
                  <div>
                    <span className="font-extrabold text-base text-white tracking-tight">
                      Noor AI
                    </span>
                    <span className="block text-[10px] text-emerald-400 font-mono">
                      Verified Guidance
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white bg-slate-950 rounded-xl border border-slate-800"
                  title="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1.5 mb-8">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
                  Navigation
                </p>

                <button
                  onClick={() => {
                    setCurrentView('dashboard');
                    setIsDrawerOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                    currentView === 'dashboard'
                      ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5 text-amber-400" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={handleStartNewChat}
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                    currentView === 'chat'
                      ? 'bg-blue-600/20 border border-blue-500/40 text-blue-300'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <SquarePen className="w-5 h-5 text-emerald-400" />
                  <span>New Chat</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('explore');
                    setIsDrawerOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                    currentView === 'explore'
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Compass className="w-5 h-5 text-emerald-400" />
                  <span>Explore Topics</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('saved');
                    setIsDrawerOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                    currentView === 'saved'
                      ? 'bg-blue-500/15 border border-blue-500/40 text-blue-300'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Bookmark className="w-5 h-5 text-blue-400" />
                  <span>Saved Evidences</span>
                </button>

                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 pt-3 mb-1">
                  Islamic Tools
                </p>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setShowQiblaModal(true);
                  }}
                  className="w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm text-slate-300 hover:bg-slate-800/80 hover:text-white transition-all"
                >
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>Qibla Location</span>
                </button>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setShowIslamicCalendarModal(true);
                  }}
                  className="w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm text-slate-300 hover:bg-slate-800/80 hover:text-white transition-all"
                >
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span>Islamic Calendar</span>
                </button>
              </div>

              {/* Preferences Section */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Arabic Text Size
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setArabicFontSize('normal')}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                      arabicFontSize === 'normal'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    1x
                  </button>
                  <button
                    onClick={() => setArabicFontSize('large')}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                      arabicFontSize === 'large'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    1.2x
                  </button>
                  <button
                    onClick={() => setArabicFontSize('xlarge')}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                      arabicFontSize === 'xlarge'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    1.5x
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Footer inside Drawer */}
            <div className="pt-4 border-t border-slate-800">
              {user ? (
                <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border border-emerald-500/50 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs text-white font-bold shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onLogout();
                      setIsDrawerOpen(false);
                    }}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-xl transition-colors"
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
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-2xl font-bold text-xs transition-all shadow-md"
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
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 shadow-2xl py-2 px-4">
        <div className="max-w-md mx-auto flex items-center justify-around">
          
          {/* Dashboard Tab */}
          <button
            onClick={() => setCurrentView('dashboard')}
            id="app-tab-dashboard"
            className={`flex flex-col items-center space-y-1 px-3 py-1.5 rounded-xl transition-all ${
              currentView === 'dashboard'
                ? 'text-amber-300 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className={`w-5 h-5 ${currentView === 'dashboard' ? 'text-amber-400' : 'text-slate-400'}`} />
            <span className="text-[10px] font-medium tracking-tight">Dashboard</span>
          </button>

          {/* Ask AI Tab */}
          <button
            onClick={handleStartNewChat}
            id="app-tab-chat"
            className={`flex flex-col items-center space-y-1 px-3 py-1.5 rounded-xl transition-all ${
              currentView === 'chat'
                ? 'text-blue-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className={`w-5 h-5 ${currentView === 'chat' ? 'text-blue-400' : 'text-slate-400'}`} />
            <span className="text-[10px] font-medium tracking-tight">Ask AI</span>
          </button>

          {/* Explore Topics Tab */}
          <button
            onClick={() => setCurrentView('explore')}
            id="app-tab-explore"
            className={`flex flex-col items-center space-y-1 px-3 py-1.5 rounded-xl transition-all ${
              currentView === 'explore'
                ? 'text-emerald-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className={`w-5 h-5 ${currentView === 'explore' ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="text-[10px] font-medium tracking-tight">Explore</span>
          </button>

          {/* Saved Evidences Tab */}
          <button
            onClick={() => setCurrentView('saved')}
            id="app-tab-saved"
            className={`flex flex-col items-center space-y-1 px-3 py-1.5 rounded-xl transition-all ${
              currentView === 'saved'
                ? 'text-blue-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${currentView === 'saved' ? 'text-blue-400' : 'text-slate-400'}`} />
            <span className="text-[10px] font-medium tracking-tight">Saved</span>
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


