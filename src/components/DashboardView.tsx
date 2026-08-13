import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  Send,
  Flame
} from 'lucide-react';
import { SavedEvidence } from '../types';
import { fetchUserLocation, DetectedLocation, getSavedLocation } from '../utils/reverseGeocode';

interface DashboardViewProps {
  arabicFontSize?: 'normal' | 'large' | 'xlarge';
  onAskTopic: (question: string) => void;
  onSaveEvidence?: (evidence: SavedEvidence) => void;
  savedEvidences?: SavedEvidence[];
}

interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  isNext?: boolean;
  isPassed?: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onAskTopic
}) => {
  // Location state initialized from saved location
  const [detectedLoc, setDetectedLoc] = useState<DetectedLocation | null>(() => getSavedLocation());
  const [_isLocating, setIsLocating] = useState(false);

  // Manual Location selector state fallback
  const [locationName] = useState('Mecca, Saudi Arabia');

  // Quick prompt input
  const [quickQuery, setQuickQuery] = useState('');

  // Qibla Modal state
  const [showQiblaModal, setShowQiblaModal] = useState(false);

  // Silently request and update location on mount
  React.useEffect(() => {
    if (!detectedLoc && 'geolocation' in navigator) {
      setIsLocating(true);
      fetchUserLocation()
        .then((loc) => {
          setDetectedLoc(loc);
        })
        .catch(() => {
          // Keep default fallback
        })
        .finally(() => {
          setIsLocating(false);
        });
    }
  }, [detectedLoc]);

  // Sample static calculated prayer times
  const prayerTimes: PrayerTime[] = [
    { name: 'Fajr', arabicName: 'الفجر', time: '04:22 AM', isPassed: true },
    { name: 'Sunrise', arabicName: 'الشروق', time: '05:50 AM', isPassed: true },
    { name: 'Dhuhr', arabicName: 'الظهر', time: '12:15 PM', isPassed: true },
    { name: 'Asr', arabicName: 'العصر', time: '03:45 PM', isNext: true },
    { name: 'Maghrib', arabicName: 'المغرب', time: '06:40 PM', isPassed: false },
    { name: 'Isha', arabicName: 'العشاء', time: '08:05 PM', isPassed: false }
  ];

  const currentDisplayLocation = detectedLoc
    ? `${detectedLoc.city}${detectedLoc.country ? `, ${detectedLoc.country}` : ''}`
    : locationName;

  const currentQiblaBearing = detectedLoc ? detectedLoc.qiblaBearing : 118;

  return (
    <div className="relative min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-zinc-900 dark:text-zinc-100 transition-colors">
      
      {/* Subtle Geometric Star Pattern Background SVG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-10 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0 L50 30 L80 40 L50 50 L40 80 L30 50 L0 40 L30 30 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <path d="M0 0 L15 15 M80 0 L65 15 M80 80 L65 65 M0 80 L15 65" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 space-y-6">

        {/* Prayer Schedule Card */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-sm relative overflow-hidden transition-colors">
          
          <div>
            {/* Card Title */}
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200 dark:border-zinc-800 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 shadow-sm shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider leading-tight">
                    Prayer Schedule
                  </h2>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono leading-tight mt-0.5">
                    Calculated for {currentDisplayLocation}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-full shrink-0 shadow-sm">
                Asr Next
              </span>
            </div>

            {/* Next Prayer Highlight Countdown Banner */}
            <div className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 p-5 rounded-2xl border border-zinc-900 dark:border-zinc-100 mb-5 shadow-sm text-center relative overflow-hidden">
              <p className="text-xs font-extrabold uppercase tracking-widest mb-1 text-zinc-400 dark:text-zinc-600">
                Next Prayer: Asr (العصر)
              </p>
              <div className="text-3xl sm:text-4xl font-black tracking-tight font-mono">
                03:45 PM
              </div>
              <p className="text-xs sm:text-sm mt-1 font-medium text-zinc-300 dark:text-zinc-700">
                Starts in <span className="font-extrabold underline decoration-2">1 hr 24 mins</span>
              </p>
            </div>

            {/* Prayer Times List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {prayerTimes.map((pt) => (
                <div
                  key={pt.name}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${
                    pt.isNext
                      ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100 font-bold shadow-sm'
                      : pt.isPassed
                      ? 'bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/80 text-zinc-400 dark:text-zinc-500'
                      : 'bg-zinc-50 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${pt.isNext ? 'bg-emerald-500 animate-ping' : pt.isPassed ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-zinc-900 dark:bg-zinc-100'}`} />
                    <span className="text-xs sm:text-sm font-bold">{pt.name}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs sm:text-sm font-serif opacity-70" dir="rtl">{pt.arabicName}</span>
                    <span className="text-xs sm:text-sm font-mono font-extrabold">{pt.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Sunnah Fast Note */}
          <div className="mt-5 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center space-x-1.5 font-bold text-zinc-900 dark:text-zinc-100">
              <Flame className="w-4 h-4" />
              <span>Sunnah Fasting:</span>
            </span>
            <span>Next: Thursday (Tomorrow)</span>
          </div>

        </div>

        {/* Quick Ask AI Prompt Bar */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-zinc-900 dark:text-white">
                Have a specific Islamic question?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Get instant verified answers with Quranic verses and Hadith references.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0">
            <input
              type="text"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && quickQuery.trim()) {
                  onAskTopic(quickQuery);
                }
              }}
              placeholder="e.g. Virtues of Tahajjud, Zakat..."
              className="w-full sm:w-64 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 text-xs sm:text-sm text-zinc-900 dark:text-white px-3.5 py-3 rounded-xl focus:outline-none"
            />
            <button
              onClick={() => {
                if (quickQuery.trim()) {
                  onAskTopic(quickQuery);
                } else {
                  onAskTopic('What are the spiritual virtues of Tahajjud prayer?');
                }
              }}
              className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center space-x-1.5 shrink-0"
            >
              <span>Ask AI</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Qibla Direction Compass Modal */}
      {showQiblaModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl relative">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
              Qibla Direction
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              Facing Mecca (Al-Ka'bah) from {currentDisplayLocation}
            </p>

            <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center">
              {/* Compass Outer Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                <span className="absolute top-2 text-xs font-bold text-zinc-900 dark:text-zinc-100">N</span>
                <span className="absolute bottom-2 text-xs font-bold text-zinc-400">S</span>
                <span className="absolute right-2 text-xs font-bold text-zinc-400">E</span>
                <span className="absolute left-2 text-xs font-bold text-zinc-400">W</span>
              </div>

              {/* Kaaba Direction Indicator */}
              <div
                className="w-36 h-36 rounded-full border-2 border-dashed border-zinc-400 dark:border-zinc-600 flex items-center justify-center transform transition-transform duration-700"
                style={{ transform: `rotate(${currentQiblaBearing}deg)` }}
              >
                <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 rounded-sm flex items-center justify-center font-bold text-[10px] shadow-lg">
                  🕋
                </div>
              </div>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-bold mb-4">
              Bearing: {currentQiblaBearing}°
            </div>

            <button
              onClick={() => setShowQiblaModal(false)}
              className="w-full py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold rounded-xl text-xs transition-colors"
            >
              Close Compass
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

