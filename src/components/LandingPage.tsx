import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Moon } from 'lucide-react';
import imgMosqueSunset from '../assets/images/mosque_sunset_hero_1784960042297.jpg';
import imgQuranGold from '../assets/images/quran_golden_light_1784960056890.jpg';
import imgIslamicArch from '../assets/images/islamic_architecture_1784960068070.jpg';

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreDirectly: () => void;
}

const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: imgMosqueSunset,
    badge: 'Welcome to Noor AI',
    title: 'Authentic Islamic Knowledge with Evidences',
    subtitle: 'Verified answers backed by the Holy Quran and Sunnah, complete with Arabic text and English translations.',
    verse: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا',
    verseTranslation: '"This day I have perfected for you your religion and completed My favor upon you..." (5:3)'
  },
  {
    id: 2,
    image: imgQuranGold,
    badge: 'Quran & Hadith Engine',
    title: 'Dual-Language Text & Exact Citations',
    subtitle: 'Every answer highlights exact Surah & Ayah numbers and Hadith collection sources.',
    verse: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',
    verseTranslation: '"Indeed, it is We who sent down the Quran and indeed, We will be its guardian." (15:9)'
  },
  {
    id: 3,
    image: imgIslamicArch,
    badge: 'Knowledge Companion',
    title: 'Clarity on Daily Life, Fiqh & Supplications',
    subtitle: 'From Tahajjud rules and Zakat calculations to moral ethics and prophetic supplications.',
    verse: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
    verseTranslation: '"And say: My Lord, increase me in knowledge." (20:114)'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeSlide = CAROUSEL_SLIDES[currentSlide];

  return (
    <div className="relative min-h-screen h-screen w-full overflow-hidden bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Background Slideshow with Smooth Cross-Fade */}
      {CAROUSEL_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.08]"
            referrerPolicy="no-referrer"
          />
          {/* Overlays for Depth and Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-slate-950/30 to-slate-950/90" />
        </div>
      ))}

      {/* Top App Welcome Bar */}
      <header className="relative z-20 px-4 py-4 sm:px-6 sm:py-6 flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="hidden sm:flex items-center space-x-2.5 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white text-zinc-950 flex items-center justify-center shadow-xl border border-zinc-200">
            <Moon className="w-4 h-4 sm:w-5 sm:h-5 fill-zinc-950" />
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-xl tracking-tight text-white">
              Noor AI
            </h1>
            <p className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
              Verified Evidences
            </p>
          </div>
        </div>

        <button
          onClick={onGetStarted}
          id="btn-top-app-login"
          className="hidden sm:inline-flex px-3 py-1.5 sm:px-4 sm:py-2 bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 rounded-xl text-[11px] sm:text-xs font-bold transition-all backdrop-blur-md"
        >
          Sign In
        </button>
      </header>

      {/* Hero Welcome Section (Center Content) */}
      <main className="relative z-20 max-w-2xl mx-auto px-4 sm:px-6 text-center my-auto py-2 sm:py-4">
        
        {/* Slide Badge */}
        <div className="inline-flex items-center space-x-1.5 bg-zinc-900/90 border border-zinc-700 text-zinc-200 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4 shadow-xl backdrop-blur-md">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white animate-pulse" />
          <span>{activeSlide.badge}</span>
        </div>

        {/* Dynamic Title */}
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-2 sm:mb-4">
          {activeSlide.title}
        </h2>

        {/* Subtitle Overview - Shortened & Responsive */}
        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed mb-3 sm:mb-6 font-normal drop-shadow hidden sm:block">
          {activeSlide.subtitle}
        </p>

        {/* Quran Verse Display */}
        <div className="bg-zinc-950/85 border border-zinc-800 rounded-2xl p-3 sm:p-5 max-w-lg mx-auto mb-5 sm:mb-8 shadow-2xl backdrop-blur-md">
          <p className="text-base sm:text-xl text-white font-serif leading-relaxed mb-1.5 text-right" dir="rtl">
            {activeSlide.verse}
          </p>
          <p className="text-[10px] sm:text-xs text-zinc-400 italic">
            {activeSlide.verseTranslation}
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center justify-center max-w-xs sm:max-w-md mx-auto">
          <button
            onClick={onGetStarted}
            id="btn-hero-get-started"
            className="w-full py-3.5 sm:py-4 px-6 sm:px-8 bg-white hover:bg-zinc-200 text-zinc-950 font-black text-sm sm:text-base rounded-2xl shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

      </main>

      {/* Bottom Pagination Dots Only */}
      <footer className="relative z-20 px-6 py-4 sm:py-6 max-w-3xl mx-auto w-full flex items-center justify-center">
        <div className="flex items-center space-x-2">
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-6 sm:w-8 bg-blue-400 shadow-md' : 'w-1.5 sm:w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </footer>

    </div>
  );
};

