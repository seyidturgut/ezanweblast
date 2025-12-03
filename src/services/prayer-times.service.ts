
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of, switchMap, tap, Observable, from, firstValueFrom } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

export interface PrayerTime {
  saat: string;
  vakit: string;
}

export type PrayerSource = 'gps' | 'city' | 'cache';

export interface PrayerState {
  city: string;
  country?: string;
  date: string;
  times: PrayerTime[];
  loading: boolean;
  error: string | null;
  source: PrayerSource;
}

@Injectable({
  providedIn: 'root'
})
export class PrayerTimesService {
  private http = inject(HttpClient);
  
  // State signals
  private state = signal<PrayerState>({
    city: API_CONFIG.defaultCity,
    date: '',
    times: [],
    loading: true,
    error: null,
    source: 'city'
  });

  // Public signals for UI
  times = computed(() => this.state().times);
  city = computed(() => this.state().city);
  isLoading = computed(() => this.state().loading);
  source = computed(() => this.state().source);

  // Derived state: Find next prayer
  nextPrayer = computed(() => {
    const times = this.state().times;
    if (!times.length) return null;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    // API returns: İmsak, Güneş, Öğle, İkindi, Akşam, Yatsı
    for (const t of times) {
      const [h, m] = t.saat.split(':').map(Number);
      const timeMinutes = h * 60 + m;
      
      if (timeMinutes > currentMinutes) {
        return {
          name: t.vakit,
          time: t.saat,
          diffMinutes: timeMinutes - currentMinutes
        };
      }
    }

    // If passed all, next is Imsak (tomorrow). 
    return {
      name: times[0].vakit,
      time: times[0].saat,
      diffMinutes: (24 * 60 + parseInt(times[0].saat.split(':')[0]) * 60 + parseInt(times[0].saat.split(':')[1])) - currentMinutes
    };
  });

  constructor() {
    this.init();
  }

  /**
   * Initialization Logic:
   * 1. Check LocalStorage Cache (valid for 1 hour)
   * 2. If no cache, Try GPS
   * 3. If GPS denied/fails, Fallback to Default City
   */
  private async init() {
    // 1. Try Cache
    if (this.loadFromCache()) {
      return;
    }

    // 2. Try Geolocation
    if ('geolocation' in navigator) {
      try {
        const position = await this.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const tzOffset = this.getClientTimezoneOffset();
        
        await this.getTimesByGPS(latitude, longitude, tzOffset);
      } catch (error) {
        console.warn('GPS denied or failed, falling back to city.', error);
        // 3. Fallback to City
        this.getTimesByCity(API_CONFIG.defaultCity);
      }
    } else {
      // No Geolocation support
      this.getTimesByCity(API_CONFIG.defaultCity);
    }
  }

  /**
   * Manually trigger location request (user action)
   */
  async requestLocationAccess(): Promise<void> {
    if (!('geolocation' in navigator)) {
      throw new Error('Geolocation not supported');
    }

    try {
      this.state.update(s => ({ ...s, loading: true }));
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const tzOffset = this.getClientTimezoneOffset();
      await this.getTimesByGPS(latitude, longitude, tzOffset);
    } catch (error) {
      this.state.update(s => ({ ...s, loading: false }));
      throw error; // Propagate error to component for UI handling
    }
  }

  // --- API Methods ---

  /**
   * Fetch times based on GPS Coordinates
   */
  async getTimesByGPS(lat: number, lng: number, tzOffset: number) {
    this.state.update(s => ({ ...s, loading: true, error: null }));
    
    const url = `${API_CONFIG.baseUrl}/timesForGPS?lat=${lat}&lng=${lng}&timezoneOffset=${tzOffset}&lang=tr`;

    this.http.get<any>(url).pipe(
      map(response => {
        const normalized = this.normalizeData(response);
        // API usually returns the city name inside the response, or we use "Konum"
        const cityName = response.place?.city || response.place?.name || 'Konum'; 
        return { times: normalized, city: cityName };
      }),
      tap(data => {
        this.updateState(data.city, data.times, 'gps');
        this.saveToCache(data.city, data.times, 'gps');
      }),
      catchError(err => {
        this.handleError(err);
        return of(null);
      })
    ).subscribe();
  }

  /**
   * Fetch times based on City Name (Search -> ID -> Times)
   */
  getTimesByCity(city: string) {
    this.state.update(s => ({ ...s, loading: true, city: city, error: null }));
    const tzOffset = this.getClientTimezoneOffset();

    // 1. Search for Place ID
    this.searchCity(city).pipe(
      switchMap(placeId => {
        if (!placeId) throw new Error('City not found');
        // 2. Get Times for Place
        const url = `${API_CONFIG.baseUrl}/timesForPlace?id=${placeId}&timezoneOffset=${tzOffset}&lang=tr&type=json`;
        return this.http.get<any>(url);
      }),
      map(apiResponse => this.normalizeData(apiResponse)),
      tap(normalizedData => {
        this.updateState(city, normalizedData, 'city');
        this.saveToCache(city, normalizedData, 'city');
      }),
      catchError(err => {
        this.handleError(err);
        // Fallback to Mock
        this.updateState(city, this.getMockData(), 'city');
        return of(null);
      })
    ).subscribe();
  }

  private searchCity(city: string): Observable<string | null> {
    // Default search lat/lng to Turkey center to help the search algorithm
    const url = `${API_CONFIG.baseUrl}/searchPlaces?q=${city}&lat=${API_CONFIG.defaultLat}&lng=${API_CONFIG.defaultLng}&lang=tr`;
    return this.http.get<any[]>(url).pipe(
      map(results => {
        if (results && results.length > 0) {
          return results[0].id;
        }
        return null;
      }),
      catchError(() => of(null))
    );
  }

  // --- Helpers ---

  private getClientTimezoneOffset(): number {
    // Javascript getTimezoneOffset returns minutes BEHIND UTC.
    // e.g., UTC+3 returns -180.
    // The API expects positive for East. So we multiply by -1.
    return -1 * new Date().getTimezoneOffset();
  }

  private getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      });
    });
  }

  private normalizeData(apiResponse: any): PrayerTime[] {
    if (!apiResponse || !apiResponse.times) return [];

    // The API keys are dates in YYYY-MM-DD format.
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateKey = `${yyyy}-${mm}-${dd}`;

    const timesArray = apiResponse.times[dateKey];

    if (!timesArray || !Array.isArray(timesArray)) {
       // Try to find any key if exact date match fails (timezone edge cases)
       const keys = Object.keys(apiResponse.times);
       if(keys.length > 0) {
         return this.mapTimes(apiResponse.times[keys[0]]);
       }
       return [];
    }
    
    return this.mapTimes(timesArray);
  }

  private mapTimes(timesArray: string[]): PrayerTime[] {
    const names = ['İmsak', 'Güneş', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'];
    return timesArray.map((timeStr: string, index: number) => ({
      vakit: names[index] || 'Bilinmiyor',
      saat: timeStr
    }));
  }

  private updateState(city: string, times: PrayerTime[], source: PrayerSource) {
    // Capitalize city
    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
    this.state.set({
      city: formattedCity,
      date: new Date().toLocaleDateString('tr-TR'),
      times: times,
      loading: false,
      error: null,
      source: source
    });
  }

  private handleError(err: any) {
    console.warn('Prayer API Error:', err);
    this.state.update(s => ({ ...s, loading: false, error: 'Veri alınamadı' }));
  }

  private getMockData(): PrayerTime[] {
    return [
      { vakit: 'İmsak', saat: '05:45' },
      { vakit: 'Güneş', saat: '07:10' },
      { vakit: 'Öğle', saat: '13:15' },
      { vakit: 'İkindi', saat: '16:05' },
      { vakit: 'Akşam', saat: '18:10' },
      { vakit: 'Yatsı', saat: '19:30' }
    ];
  }

  // --- LocalStorage Caching ---

  private saveToCache(city: string, times: PrayerTime[], source: PrayerSource) {
    if (typeof localStorage === 'undefined') return;
    
    const data = {
      city,
      times,
      source,
      timestamp: Date.now()
    };
    localStorage.setItem('prayer_cache', JSON.stringify(data));
  }

  private loadFromCache(): boolean {
    if (typeof localStorage === 'undefined') return false;

    const cached = localStorage.getItem('prayer_cache');
    if (!cached) return false;

    try {
      const data = JSON.parse(cached);
      const now = Date.now();
      const age = now - data.timestamp;
      
      // Cache valid for 2 hours (2 * 60 * 60 * 1000)
      if (age < 7200000) {
        this.updateState(data.city, data.times, data.source);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }
}
