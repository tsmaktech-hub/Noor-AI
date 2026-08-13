// Utility for reverse geocoding coordinates to City/Country & Qibla math

export interface DetectedLocation {
  city: string;
  country: string;
  lat: number;
  lng: number;
  qiblaBearing: number;
  qiblaDirection: string;
  distanceToMeccaKm: number;
}

// Calculate exact Qibla angle from lat/lng to Mecca (21.4225 N, 39.8262 E)
export function calculateQiblaAngle(latitude: number, longitude: number): number {
  const meccaLat = (21.4225 * Math.PI) / 180;
  const meccaLng = (39.8262 * Math.PI) / 180;
  const userLat = (latitude * Math.PI) / 180;
  const userLng = (longitude * Math.PI) / 180;

  const dLng = meccaLng - userLng;
  const y = Math.sin(dLng);
  const x = Math.cos(userLat) * Math.tan(meccaLat) - Math.sin(userLat) * Math.cos(dLng);

  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  qibla = (qibla + 360) % 360;
  return Math.round(qibla);
}

// Haversine formula for distance in km to Mecca
export function calculateDistanceToMeccaKm(lat: number, lng: number): number {
  const R = 6371; // Earth's radius in kilometers
  const meccaLat = (21.4225 * Math.PI) / 180;
  const meccaLng = (39.8262 * Math.PI) / 180;
  const userLat = (lat * Math.PI) / 180;
  const userLng = (lng * Math.PI) / 180;

  const dLat = meccaLat - userLat;
  const dLng = meccaLng - userLng;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(userLat) * Math.cos(meccaLat) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Human readable direction label (e.g. "Southeast (118° SE)")
export function getDirectionLabel(bearing: number): string {
  if (bearing >= 337.5 || bearing < 22.5) return `North (${bearing}° N)`;
  if (bearing >= 22.5 && bearing < 67.5) return `Northeast (${bearing}° NE)`;
  if (bearing >= 67.5 && bearing < 112.5) return `East (${bearing}° E)`;
  if (bearing >= 112.5 && bearing < 157.5) return `Southeast (${bearing}° SE)`;
  if (bearing >= 157.5 && bearing < 202.5) return `South (${bearing}° S)`;
  if (bearing >= 202.5 && bearing < 247.5) return `Southwest (${bearing}° SW)`;
  if (bearing >= 247.5 && bearing < 292.5) return `West (${bearing}° W)`;
  return `Northwest (${bearing}° NW)`;
}

// Perform Geolocation and Reverse Geocode to detect City & Country
export function fetchUserLocation(): Promise<DetectedLocation> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const qiblaBearing = calculateQiblaAngle(lat, lng);
        const qiblaDirection = getDirectionLabel(qiblaBearing);
        const distanceToMeccaKm = calculateDistanceToMeccaKm(lat, lng);

        let city = 'Your Current City';
        let country = '';

        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
          );
          if (res.ok) {
            const data = await res.json();
            city = data.city || data.locality || data.principalSubdivision || 'Your Current City';
            country = data.countryName || '';
          }
        } catch {
          // Secondary fallback
          try {
            const res2 = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            if (res2.ok) {
              const data2 = await res2.json();
              if (data2.address) {
                city =
                  data2.address.city ||
                  data2.address.town ||
                  data2.address.village ||
                  data2.address.county ||
                  'Your Current City';
                country = data2.address.country || '';
              }
            }
          } catch {
            // keep fallback
          }
        }

        const detected = {
          city,
          country,
          lat,
          lng,
          qiblaBearing,
          qiblaDirection,
          distanceToMeccaKm,
        };

        saveDetectedLocation(detected);
        resolve(detected);
      },
      (error) => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

export function getSavedLocation(): DetectedLocation | null {
  try {
    const saved = localStorage.getItem('islamic_ai_detected_location');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function saveDetectedLocation(loc: DetectedLocation) {
  try {
    localStorage.setItem('islamic_ai_detected_location', JSON.stringify(loc));
  } catch {
    // ignore
  }
}
