
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of, Observable, firstValueFrom } from 'rxjs';
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

interface AladhanApiResponse {
  code: number;
  status: string;
  data?: {
    timings?: Record<string, string>;
  };
}

interface OpenMeteoSearchResponse {
  results?: Array<{
    name: string;
    country?: string;
    country_code?: string;
    latitude: number;
    longitude: number;
  }>;
}

interface GeoPlace {
  name: string;
  country?: string;
  countryCode?: string;
  lat: number;
  lng: number;
}

interface ReverseGeocodeResponse {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  countryCode?: string;
}

interface CalculationConfig {
  methodId: number;
  school: 0 | 1;
  applyTurkeyTakvimAdjustments: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PrayerTimesService {
  private http = inject(HttpClient);
  private readonly cacheKey = 'prayer_cache_v3';
  private readonly diyanetMethodId = 13;
  private readonly muslimWorldLeagueMethodId = 3;
  private readonly turkeyTakvimAdjustments = {
    sunrise: -1,
    dhuhr: 6,
    asr: 8,
    maghrib: 1,
    isha: 11
  } as const;
  
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
   * 1. Check LocalStorage Cache (valid for 2 hours)
   * 2. If no cache, Try GPS
   * 3. If GPS denied/fails, Fallback to Default City
   */
  private async init() {
    // Load cache for fast first paint, but still try fresh location on startup.
    const hasCache = this.loadFromCache();

    // 1. Try Geolocation
    if ('geolocation' in navigator) {
      try {
        const position = await this.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        await this.getTimesByGPS(latitude, longitude);
        return;
      } catch (error) {
        console.warn('GPS denied or failed, falling back to city.', error);
        // 2. Fallback to default city
        await this.getTimesByDefaultCity();
        return;
      }
    }

    // No geolocation support: keep cache if present, otherwise fallback to default city.
    if (!hasCache) {
      await this.getTimesByDefaultCity();
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
      await this.getTimesByGPS(latitude, longitude);
    } catch (error) {
      this.state.update(s => ({ ...s, loading: false }));
      throw error; // Propagate error to component for UI handling
    }
  }

  // --- API Methods ---

  /**
   * Fetch times based on GPS Coordinates
   */
  async getTimesByGPS(lat: number, lng: number): Promise<void> {
    this.state.update(s => ({ ...s, loading: true, error: null }));

    try {
      const geoInfo = await this.resolveGeoInfoByCoords(lat, lng);
      const config = this.getCalculationConfig(geoInfo.countryCode, lat, lng);
      const times = await this.fetchTimesByCoords(lat, lng, config);

      if (!times.length) {
        throw new Error('Prayer times could not be parsed for GPS location');
      }

      this.updateState(geoInfo.cityName, times, 'gps');
      this.saveToCache(geoInfo.cityName, times, 'gps');
    } catch (err) {
      this.handleError(err);
      throw err;
    }
  }

  /**
   * Fetch times based on City Name (Search -> ID -> Times)
   */
  async getTimesByCity(city: string): Promise<void> {
    this.state.update(s => ({ ...s, loading: true, city: city, error: null }));

    try {
      const place = await firstValueFrom(this.searchCity(city));
      if (!place) {
        throw new Error('City not found');
      }

      const config = this.getCalculationConfig(place.countryCode, place.lat, place.lng);
      const normalizedData = await this.fetchTimesByCoords(place.lat, place.lng, config);

      if (!normalizedData.length) {
        throw new Error('Prayer times could not be parsed for city');
      }

      this.updateState(place.name, normalizedData, 'city');
      this.saveToCache(place.name, normalizedData, 'city');
    } catch (err) {
      this.handleError(err);
      if (city !== API_CONFIG.defaultCity) {
        await this.getTimesByDefaultCity();
        return;
      }
      // Last-resort fallback to mock
      this.updateState(API_CONFIG.defaultCity, this.getMockData(), 'city');
    }
  }

  private async getTimesByDefaultCity(): Promise<void> {
    this.state.update(s => ({ ...s, loading: true, city: API_CONFIG.defaultCity, error: null }));

    try {
      const times = await this.fetchTimesByCoords(
        API_CONFIG.defaultLat,
        API_CONFIG.defaultLng,
        {
          methodId: this.diyanetMethodId,
          school: 0,
          applyTurkeyTakvimAdjustments: true
        }
      );
      if (!times.length) {
        throw new Error('Prayer times could not be parsed for default city');
      }

      this.updateState(API_CONFIG.defaultCity, times, 'city');
      this.saveToCache(API_CONFIG.defaultCity, times, 'city');
    } catch (err) {
      this.handleError(err);
      this.updateState(API_CONFIG.defaultCity, this.getMockData(), 'city');
    }
  }

  private searchCity(city: string): Observable<GeoPlace | null> {
    const url = `${API_CONFIG.geoBaseUrl}/search?name=${encodeURIComponent(city)}&count=1&language=tr&format=json`;
    return this.http.get<OpenMeteoSearchResponse>(url).pipe(
      map(response => {
        const first = response.results?.[0];
        if (!first) return null;
        return {
          name: first.name,
          country: first.country,
          countryCode: first.country_code,
          lat: first.latitude,
          lng: first.longitude
        };
      }),
      catchError(() => of(null))
    );
  }

  // --- Helpers ---

  private buildTimingsUrl(lat: number, lng: number, config: CalculationConfig): string {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    return `${API_CONFIG.baseUrl}/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=${config.methodId}&school=${config.school}`;
  }

  private async fetchTimesByCoords(lat: number, lng: number, config: CalculationConfig): Promise<PrayerTime[]> {
    const url = this.buildTimingsUrl(lat, lng, config);
    const response = await firstValueFrom(this.http.get<AladhanApiResponse>(url));
    return this.normalizeData(response, config);
  }

  private async resolveGeoInfoByCoords(
    lat: number,
    lng: number
  ): Promise<{ cityName: string; countryCode?: string }> {
    const url = `${API_CONFIG.reverseGeoBaseUrl}?latitude=${lat}&longitude=${lng}&localityLanguage=tr`;
    try {
      const response = await firstValueFrom(this.http.get<ReverseGeocodeResponse>(url));
      return {
        cityName: response.city || response.locality || response.principalSubdivision || 'Konum',
        countryCode: response.countryCode
      };
    } catch {
      return { cityName: 'Konum' };
    }
  }

  private getCalculationConfig(countryCode?: string, lat?: number, lng?: number): CalculationConfig {
    if (countryCode?.toUpperCase() === 'TR') {
      return {
        methodId: this.diyanetMethodId,
        school: 0,
        applyTurkeyTakvimAdjustments: true
      };
    }

    // Fallback when country code is missing from reverse-geocoding response.
    if (typeof lat === 'number' && typeof lng === 'number' && this.isLikelyTurkey(lat, lng)) {
      return {
        methodId: this.diyanetMethodId,
        school: 0,
        applyTurkeyTakvimAdjustments: true
      };
    }

    return {
      methodId: this.muslimWorldLeagueMethodId,
      school: 1,
      applyTurkeyTakvimAdjustments: false
    };
  }

  private isLikelyTurkey(lat: number, lng: number): boolean {
    return lat >= 35 && lat <= 43 && lng >= 25 && lng <= 45;
  }

  private async getCurrentPosition(): Promise<GeolocationPosition> {
    const requestPosition = (options: PositionOptions) =>
      new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });

    try {
      // First try: precise but can timeout on desktop/Wi-Fi only environments.
      return await requestPosition({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      });
    } catch (error) {
      const geoCode = this.getGeoErrorCode(error);
      if (geoCode === 2 || geoCode === 3) {
        // Retry with relaxed settings for better compatibility.
        return requestPosition({
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 600000
        });
      }
      throw error;
    }
  }

  private getGeoErrorCode(error: unknown): number | null {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const maybeCode = Number((error as { code: unknown }).code);
      return Number.isFinite(maybeCode) ? maybeCode : null;
    }
    return null;
  }

  private normalizeData(apiResponse: AladhanApiResponse, config: CalculationConfig): PrayerTime[] {
    const timings = apiResponse?.data?.timings;
    if (!timings) return [];

    const toHourMinute = (value?: string): string => {
      if (!value) return '--:--';
      const match = value.match(/\d{1,2}:\d{2}/);
      return match ? match[0] : value;
    };

    const applyOffset = (value: string, offsetMinutes: number): string => {
      if (value === '--:--' || offsetMinutes === 0) return value;
      const [h, m] = value.split(':').map(Number);
      if (!Number.isFinite(h) || !Number.isFinite(m)) return value;
      let total = h * 60 + m + offsetMinutes;
      total = ((total % 1440) + 1440) % 1440;
      const hh = String(Math.floor(total / 60)).padStart(2, '0');
      const mm = String(total % 60).padStart(2, '0');
      return `${hh}:${mm}`;
    };

    const fajr = toHourMinute(timings['Fajr'] || timings['Imsak']);
    const sunriseBase = toHourMinute(timings['Sunrise']);
    const dhuhrBase = toHourMinute(timings['Dhuhr']);
    const asrBase = toHourMinute(timings['Asr']);
    const maghribBase = toHourMinute(timings['Maghrib']);
    const ishaBase = toHourMinute(timings['Isha']);

    const sunrise = config.applyTurkeyTakvimAdjustments
      ? applyOffset(sunriseBase, this.turkeyTakvimAdjustments.sunrise)
      : sunriseBase;
    const dhuhr = config.applyTurkeyTakvimAdjustments
      ? applyOffset(dhuhrBase, this.turkeyTakvimAdjustments.dhuhr)
      : dhuhrBase;
    const asr = config.applyTurkeyTakvimAdjustments
      ? applyOffset(asrBase, this.turkeyTakvimAdjustments.asr)
      : asrBase;
    const maghrib = config.applyTurkeyTakvimAdjustments
      ? applyOffset(maghribBase, this.turkeyTakvimAdjustments.maghrib)
      : maghribBase;
    const isha = config.applyTurkeyTakvimAdjustments
      ? applyOffset(ishaBase, this.turkeyTakvimAdjustments.isha)
      : ishaBase;

    const mapped: PrayerTime[] = [
      { vakit: 'İmsak', saat: fajr },
      { vakit: 'Güneş', saat: sunrise },
      { vakit: 'Öğle', saat: dhuhr },
      { vakit: 'İkindi', saat: asr },
      { vakit: 'Akşam', saat: maghrib },
      { vakit: 'Yatsı', saat: isha }
    ];

    const hasMissing = mapped.some(item => item.saat === '--:--');
    return hasMissing ? [] : mapped;
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
    localStorage.setItem(this.cacheKey, JSON.stringify(data));
  }

  private loadFromCache(): boolean {
    if (typeof localStorage === 'undefined') return false;

    const cached = localStorage.getItem(this.cacheKey);
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
