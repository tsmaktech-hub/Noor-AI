import React, { useState } from 'react';
import { Compass, MapPin, X, Navigation, Navigation2 } from 'lucide-react';
import { fetchUserLocation, DetectedLocation, getSavedLocation } from '../utils/reverseGeocode';

interface QiblaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CityQibla {
  name: string;
  country: string;
  bearing: number;
  direction: string;
  distanceKm: number;
  coordinates: string;
}

const CITIES: CityQibla[] = [
  { name: 'London', country: 'United Kingdom', bearing: 118, direction: 'Southeast (118° SE)', distanceKm: 4790, coordinates: '51.5074° N, 0.1278° W' },
  { name: 'New York', country: 'United States', bearing: 58, direction: 'Northeast (58° NE)', distanceKm: 10280, coordinates: '40.7128° N, 74.0060° W' },
  { name: 'Mecca', country: 'Saudi Arabia', bearing: 0, direction: 'Direct (0°)', distanceKm: 0, coordinates: '21.4225° N, 39.8262° E' },
  { name: 'Medina', country: 'Saudi Arabia', bearing: 172, direction: 'South (172° S)', distanceKm: 340, coordinates: '24.5247° N, 39.5692° E' },
  { name: 'Jakarta', country: 'Indonesia', bearing: 295, direction: 'Northwest (295° NW)', distanceKm: 7920, coordinates: '6.2088° S, 106.8456° E' },
  { name: 'Istanbul', country: 'Turkey', bearing: 153, direction: 'Southeast (153° SE)', distanceKm: 2400, coordinates: '41.0082° N, 28.9784° E' },
  { name: 'Cairo', country: 'Egypt', bearing: 136, direction: 'Southeast (136° SE)', distanceKm: 1280, coordinates: '30.0444° N, 31.2357° E' },
  { name: 'Riyadh', country: 'Saudi Arabia', bearing: 242, direction: 'Southwest (242° SW)', distanceKm: 790, coordinates: '24.7136° N, 46.6753° E' },
  { name: 'Dubai', country: 'United Arab Emirates', bearing: 254, direction: 'West-Southwest (254° WSW)', distanceKm: 1680, coordinates: '25.2048° N, 55.2708° E' },
  { name: 'Kuala Lumpur', country: 'Malaysia', bearing: 292, direction: 'Northwest (292° NW)', distanceKm: 7040, coordinates: '3.1390° N, 101.6869° E' },
];

export const QiblaModal: React.FC<QiblaModalProps> = ({ isOpen, onClose }) => {
  const [selectedCity, setSelectedCity] = useState<CityQibla>(CITIES[0]);
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
      alert('Location access was denied or unavailable. Please select a city manually.');
    } finally {
      setIsLocating(false);
    }
  };

  const currentBearing = detectedLoc ? detectedLoc.qiblaBearing : selectedCity.bearing;
  const currentCityName = detectedLoc ? detectedLoc.city : selectedCity.name;
  const currentCountryName = detectedLoc ? detectedLoc.country : selectedCity.country;
  const currentDistanceKm = detectedLoc ? detectedLoc.distanceToMeccaKm : selectedCity.distanceKm;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-300 shadow-md">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Qibla Direction</h3>
              <p className="text-xs text-slate-400">Direction towards Al-Ka'bah, Mecca</p>
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

        {/* Selected City Bar */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <select
              value={detectedLoc ? 'custom' : selectedCity.name}
              onChange={(e) => {
                if (e.target.value === 'custom') return;
                const city = CITIES.find(c => c.name === e.target.value);
                if (city) {
                  setSelectedCity(city);
                  setDetectedLoc(null);
                }
              }}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer truncate"
            >
              {detectedLoc && (
                <option value="custom">
                  {detectedLoc.city}{detectedLoc.country ? `, ${detectedLoc.country}` : ''} (Current GPS)
                </option>
              )}
              {CITIES.map((c) => (
                <option key={c.name} value={c.name} className="bg-slate-900 text-white">
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleEnableLocation}
            disabled={isLocating}
            className="text-[11px] text-emerald-300 hover:text-white font-bold flex items-center space-x-1 bg-emerald-950/80 hover:bg-emerald-900 px-2.5 py-1.5 rounded-xl border border-emerald-800 transition-colors shrink-0"
            title="Locate GPS Position"
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'GPS Sync'}</span>
          </button>
        </div>

        {/* 360° Compass Display */}
        <div className="relative w-52 h-52 mx-auto my-4 flex items-center justify-center">
          {/* Compass Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-950/50 shadow-inner">
            <span className="absolute top-2 text-xs font-black text-amber-400">N</span>
            <span className="absolute bottom-2 text-xs font-bold text-slate-600">S</span>
            <span className="absolute right-2 text-xs font-bold text-slate-600">E</span>
            <span className="absolute left-2 text-xs font-bold text-slate-600">W</span>
          </div>

          {/* Kaaba Pointer */}
          <div
            className="w-40 h-40 rounded-full border-2 border-dashed border-emerald-500/60 flex items-center justify-center transform transition-transform duration-700"
            style={{ transform: `rotate(${currentBearing}deg)` }}
          >
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 bg-slate-950 border-2 border-amber-400 rounded-lg flex items-center justify-center text-amber-300 font-bold text-xs shadow-lg animate-pulse">
                🕋
              </div>
              <div className="w-1 h-8 bg-gradient-to-t from-emerald-500 to-transparent my-1" />
            </div>
          </div>
        </div>

        {/* Bearing Details Card */}
        <div className="bg-gradient-to-r from-emerald-950/90 via-slate-950 to-teal-950 p-4 rounded-2xl border border-emerald-500/30 text-center space-y-1 mb-4">
          <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
            {currentCityName}{currentCountryName ? `, ${currentCountryName}` : ''}
          </p>
          <p className="text-2xl font-black text-white font-mono">
            {currentBearing}° Qibla Angle
          </p>
          <p className="text-xs text-slate-300 font-medium">
            Distance to Kaaba: <span className="font-bold text-amber-300">{currentDistanceKm.toLocaleString()} km</span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs transition-colors shadow-lg"
        >
          Done
        </button>

      </div>
    </div>
  );
};

