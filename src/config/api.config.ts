
export const API_CONFIG = {
  // Vakit Vercel API Base URL (Public API)
  baseUrl: 'https://vakit.vercel.app/api',
  
  // Store Links
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mobilexsoft.ezanvakti&utm_source=emea_Med',
  appStoreUrl: 'https://apps.apple.com/cy/app/ezan-vakti-pro/id437447439?l=tr',

  // Fallback defaults if GPS is denied
  defaultCity: 'İstanbul',
  defaultLat: 41.0082,
  defaultLng: 28.9784,
  
  // Default timezone offset (only used as last resort fallback)
  defaultTzOffset: 180 // UTC+3
};
