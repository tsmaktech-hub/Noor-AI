import React, { useState } from 'react';
import {
  Moon,
  Clock,
  Compass,
  MapPin,
  Sparkles,
  Send,
  Flame,
  Navigation
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
  const [isLocating, setIsLocating] = useState(false);

  // Manual Location selector state fallback
  const [locationName, setLocationName] = useState('Mecca, Saudi Arabia');
  const [showLocationPicker, setShowLocationPicker] = useState(false);

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

  const handleEnableLocation = async () => {
    setIsLocating(true);
    try {
      const loc = await fetchUserLocation();
      setDetectedLoc(loc);
    } catch {
      alert('Location access was denied or unavailable. You can manually pick a city.');
    } finally {
      setIsLocating(false);
    }
  };

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
    <div className="relative min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-slate-100">
      
      {/* Subtle Soft Gold Geometric Star Pattern Background SVG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0 L50 30 L80 40 L50 50 L40 80 L30 50 L0 40 L30 30 Z" fill="none" stroke="#F59E0B" strokeWidth="1" />
              <circle cx="40" cy="40" r="12" fill="none" stroke="#10B981" strokeWidth="0.8" />
              <path d="M0 0 L15 15 M80 0 L65 15 M80 80 L65 65 M0 80 L15 65" stroke="#F59E0B" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 space-y-6">



        {/* 2. Prayer Schedule Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
          
          <div>
            {/* Card Title */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shadow-sm shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider leading-tight">
                    Prayer Schedule
                  </h2>
                  <p className="text-[10px] text-emerald-400 font-mono leading-tight mt-0.5">
                    Calculated for {currentDisplayLocation}
                  </p>
                </div>
              </div>

              <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full shrink-0">
                Asr Next
              </span>
            </div>

            {/* Next Prayer Highlight Countdown Banner */}
            <div className="bg-gradient-to-r from-emerald-950/90 via-teal-900/80 to-slate-950 p-5 rounded-2xl border border-emerald-500/40 mb-5 shadow-inner text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <p className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">
                Next Prayer: Asr (العصر)
              </p>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
                03:45 PM
              </div>
              <p className="text-xs sm:text-sm text-emerald-200 mt-1 font-medium">
                Starts in <span className="font-bold text-amber-300">1 hr 24 mins</span>
              </p>
            </div>

            {/* Prayer Times List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {prayerTimes.map((pt) => (
                <div
                  key={pt.name}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${
                    pt.isNext
                      ? 'bg-amber-500/15 border-amber-500/50 text-white font-bold shadow-md'
                      : pt.isPassed
                      ? 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                      : 'bg-slate-950/80 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${pt.isNext ? 'bg-amber-400 animate-ping' : pt.isPassed ? 'bg-slate-600' : 'bg-emerald-400'}`} />
                    <span className="text-xs sm:text-sm font-semibold">{pt.name}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs sm:text-sm font-serif text-slate-400" dir="rtl">{pt.arabicName}</span>
                    <span className={`text-xs sm:text-sm font-mono font-bold ${pt.isNext ? 'text-amber-300' : 'text-slate-200'}`}>{pt.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Sunnah Fast Note */}
          <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
              <Flame className="w-4 h-4" />
              <span>Sunnah Fasting:</span>
            </span>
            <span>Next: Thursday (Tomorrow)</span>
          </div>

        </div>

        {/* 3. Glassmorphism Quick Ask AI Prompt Bar */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Have a specific Islamic question?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
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
              className="w-full sm:w-64 bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs sm:text-sm text-white px-3.5 py-3 rounded-xl focus:outline-none"
            />
            <button
              onClick={() => {
                if (quickQuery.trim()) {
                  onAskTopic(quickQuery);
                } else {
                  onAskTopic('What are the spiritual virtues of Tahajjud prayer?');
                }
              }}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center space-x-1.5 shrink-0"
            >
              <span>Ask AI</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Qibla Direction Compass Modal */}
      {showQiblaModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1">
              Qibla Direction
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Facing Mecca (Al-Ka'bah) from {currentDisplayLocation}
            </p>

            <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center">
              {/* Compass Outer Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-slate-800 flex items-center justify-center">
                <span className="absolute top-2 text-xs font-bold text-amber-400">N</span>
                <span className="absolute bottom-2 text-xs font-bold text-slate-500">S</span>
                <span className="absolute right-2 text-xs font-bold text-slate-500">E</span>
                <span className="absolute left-2 text-xs font-bold text-slate-500">W</span>
              </div>

              {/* Kaaba Direction Indicator */}
              <div
                className="w-36 h-36 rounded-full border-2 border-dashed border-emerald-500/60 flex items-center justify-center transform transition-transform duration-700"
                style={{ transform: `rotate(${currentQiblaBearing}deg)` }}
              >
                <div className="w-8 h-8 bg-slate-950 border-2 border-amber-400 rounded-sm flex items-center justify-center text-amber-300 font-bold text-[10px] shadow-lg">
                  🕋
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs text-emerald-300 font-mono mb-4">
              Bearing: {currentQiblaBearing}°
            </div>

            <button
              onClick={() => setShowQiblaModal(false)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Close Compass
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
