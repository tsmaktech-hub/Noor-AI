import React, { useState } from 'react';
import { Calendar as CalendarIcon, X, MapPin, Navigation, Star, Clock } from 'lucide-react';
import { fetchUserLocation, DetectedLocation, getSavedLocation } from '../utils/reverseGeocode';

interface IslamicCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IslamicEvent {
  title: string;
  arabicTitle: string;
  hijriDate: string;
  gregorianDate: string;
  category: 'Major Festival' | 'Fasting Day' | 'Holy Night' | 'New Year';
}

const ISLAMIC_EVENTS: IslamicEvent[] = [
  { title: 'Islamic New Year (1448 AH)', arabicTitle: 'رأس السنة الهجرية', hijriDate: '1 Muharram 1448', gregorianDate: '16 June 2026', category: 'New Year' },
  { title: 'Day of Ashura', arabicTitle: 'يوم عاشوراء', hijriDate: '10 Muharram 1448', gregorianDate: '25 June 2026', category: 'Fasting Day' },
  { title: 'Mawlid an-Nabi', arabicTitle: 'المولد النبوي', hijriDate: '12 Rabi\' al-Awwal 1448', gregorianDate: '25 August 2026', category: 'Holy Night' },
  { title: 'Isra and Mi\'raj', arabicTitle: 'الإسراء والمعراج', hijriDate: '27 Rajab 1448', gregorianDate: '6 January 2027', category: 'Holy Night' },
  { title: 'First Day of Ramadan', arabicTitle: 'أول أيام شهر رمضان', hijriDate: '1 Ramadan 1448', gregorianDate: '8 February 2027', category: 'Major Festival' },
  { title: 'Laylat al-Qadr', arabicTitle: 'ليلة القدر', hijriDate: '27 Ramadan 1448', gregorianDate: '6 March 2027', category: 'Holy Night' },
  { title: 'Eid al-Fitr', arabicTitle: 'عيد الفطر المبارك', hijriDate: '1 Shawwal 1448', gregorianDate: '10 March 2027', category: 'Major Festival' },
  { title: 'Day of Arafah', arabicTitle: 'يوم عرفة', hijriDate: '9 Dhul-Hijjah 1448', gregorianDate: '16 May 2027', category: 'Fasting Day' },
  { title: 'Eid al-Adha', arabicTitle: 'عيد الأضحى المبارك', hijriDate: '10 Dhul-Hijjah 1448', gregorianDate: '17 May 2027', category: 'Major Festival' },
];

export const IslamicCalendarModal: React.FC<IslamicCalendarModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'whiteDays'>('events');
  const [isLocating, setIsLocating] = useState(false);
  const [detectedLoc, setDetectedLoc] = useState<DetectedLocation | null>(() => getSavedLocation());

  // Auto-fetch location on modal open if not yet loaded
  React.useEffect(() => {
    if (isOpen && !detectedLoc && 'geolocation' in navigator) {
      setIsLocating(true);
      fetchUserLocation()
        .then((loc) => setDetectedLoc(loc))
        .catch(() => {})
        .finally(() => setIsLocating(false));
    }
  }, [isOpen, detectedLoc]);

  if (!isOpen) return null;

  const handleEnableLocation = async () => {
    setIsLocating(true);
    try {
      const loc = await fetchUserLocation();
      setDetectedLoc(loc);
    } catch {
      // Keep fallback
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-950 border border-amber-600/50 flex items-center justify-center text-amber-300 shadow-md">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Islamic Calendar (التقويم الهجري)</h3>
              <p className="text-xs text-amber-400 font-mono">1448 Hijri Era</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-950 rounded-xl border border-slate-800"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Hijri Date Highlight Banner */}
        <div className="bg-gradient-to-r from-amber-950/80 via-slate-950 to-emerald-950 p-4 rounded-2xl border border-amber-500/30 mb-5 text-center relative overflow-hidden shadow-inner">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
          <p className="text-[11px] font-bold text-amber-300 uppercase tracking-widest mb-1">
            Today's Islamic Date ({detectedLoc ? `${detectedLoc.city}, ${detectedLoc.country}` : 'Global Horizon'})
          </p>
          <div className="text-xl sm:text-2xl font-black text-white font-serif">
            29 Safar 1448 AH
          </div>
          <p className="text-xs text-slate-300 mt-1 font-mono">
            Gregorian: Wednesday, 12 August 2026
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-4">
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'events'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Major Events (المناسبات)
          </button>
          <button
            onClick={() => setActiveTab('whiteDays')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'whiteDays'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sunnah Fasting Days
          </button>
        </div>

        {/* Tab 1: Major Events List */}
        {activeTab === 'events' && (
          <div className="space-y-2.5 mb-5">
            {ISLAMIC_EVENTS.map((evt, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center space-x-2 mb-0.5">
                    <span className="text-xs font-bold text-white">{evt.title}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 uppercase font-bold rounded ${
                      evt.category === 'Major Festival'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : evt.category === 'Fasting Day'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-blue-950 text-blue-300 border border-blue-800'
                    }`}>
                      {evt.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {evt.hijriDate} • <span className="text-slate-300">{evt.gregorianDate}</span>
                  </p>
                </div>

                <span className="text-sm font-serif text-amber-200/90" dir="rtl">
                  {evt.arabicTitle}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Sunnah Fasting Days Guidance */}
        {activeTab === 'whiteDays' && (
          <div className="space-y-3 mb-5">
            <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Star className="w-3.5 h-3.5 fill-emerald-400" />
                <span>The White Days (الأيام البيض)</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Prophet Muhammad (ﷺ) advised fasting the 13th, 14th, and 15th days of every lunar month.
              </p>
              <div className="bg-slate-900 p-3 rounded-xl text-xs font-mono text-emerald-300 border border-slate-800">
                Next White Days (Safar 1448):<br />
                • 13 Safar: Sunday, 23 August 2026<br />
                • 14 Safar: Monday, 24 August 2026<br />
                • 15 Safar: Tuesday, 25 August 2026
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Weekly Sunnah Fasting</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fasting every <strong className="text-white">Monday & Thursday</strong> is a recommended Sunnah of the Messenger of Allah (ﷺ), as deeds are presented to Allah on these days.
              </p>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl text-xs transition-colors shadow-lg"
        >
          Close Calendar
        </button>

      </div>
    </div>
  );
};
