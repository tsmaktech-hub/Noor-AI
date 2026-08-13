import React from 'react';
import { X, Moon, Sun, Laptop, Settings, Trash2, ShieldCheck } from 'lucide-react';

export type ThemeMode = 'dark' | 'light' | 'system';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  arabicFontSize: 'normal' | 'large' | 'xlarge';
  setArabicFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  onClearData?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  themeMode,
  setThemeMode,
  arabicFontSize,
  setArabicFontSize,
  onClearData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-5 sm:p-6 z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 shadow-sm">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight">Settings</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Customize theme and preferences</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            title="Close Settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Theme Mode */}
        <div className="space-y-3 mb-6">
          <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Appearance / Theme
          </label>

          <div className="grid grid-cols-3 gap-2">
            {/* Dark Mode */}
            <button
              onClick={() => setThemeMode('dark')}
              className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                themeMode === 'dark'
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100 shadow-md scale-[1.02]'
                  : 'bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700'
              }`}
            >
              <Moon className="w-5 h-5 mb-1.5" />
              <span>Dark</span>
              {themeMode === 'dark' && (
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-600" />
              )}
            </button>

            {/* Light Mode */}
            <button
              onClick={() => setThemeMode('light')}
              className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                themeMode === 'light'
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100 shadow-md scale-[1.02]'
                  : 'bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700'
              }`}
            >
              <Sun className="w-5 h-5 mb-1.5" />
              <span>Light</span>
              {themeMode === 'light' && (
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-600" />
              )}
            </button>

            {/* System Mode */}
            <button
              onClick={() => setThemeMode('system')}
              className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                themeMode === 'system'
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100 shadow-md scale-[1.02]'
                  : 'bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700'
              }`}
            >
              <Laptop className="w-5 h-5 mb-1.5" />
              <span>System</span>
              {themeMode === 'system' && (
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-600" />
              )}
            </button>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
            {themeMode === 'dark' && 'Dark mode uses a sleek high-contrast black canvas.'}
            {themeMode === 'light' && 'Light mode uses a crisp high-contrast white canvas.'}
            {themeMode === 'system' && 'System mode matches your device light/dark appearance.'}
          </p>
        </div>

        {/* Section 2: Arabic Font Size */}
        <div className="space-y-3 mb-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Arabic Text Size
          </label>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setArabicFontSize('normal')}
              className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                arabicFontSize === 'normal'
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100'
                  : 'bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
              }`}
            >
              Standard (1x)
            </button>
            <button
              onClick={() => setArabicFontSize('large')}
              className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                arabicFontSize === 'large'
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100'
                  : 'bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
              }`}
            >
              Large (1.2x)
            </button>
            <button
              onClick={() => setArabicFontSize('xlarge')}
              className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                arabicFontSize === 'xlarge'
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100'
                  : 'bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
              }`}
            >
              Extra (1.5x)
            </button>
          </div>

          {/* Sample Arabic Preview */}
          <div className="bg-zinc-50 dark:bg-zinc-900/80 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Live Preview</p>
            <p className={`font-serif text-zinc-900 dark:text-zinc-100 ${
              arabicFontSize === 'normal' ? 'text-lg' : arabicFontSize === 'large' ? 'text-xl' : 'text-2xl'
            }`}>
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
          </div>
        </div>

        {/* Section 3: App Info & Reset */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center space-x-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Noor AI Verified Guidance</span>
            </span>
            <span className="font-mono">v2.1</span>
          </div>

          {onClearData && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear saved history and cached preferences?')) {
                  onClearData();
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900/50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Saved App Data</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
