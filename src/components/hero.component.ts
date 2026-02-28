
import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';
import { PrayerTimesService } from '../services/prayer-times.service';
import { API_CONFIG } from '../config/api.config';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="relative pt-24 pb-0 lg:py-32 overflow-hidden min-h-[90vh] flex items-center">
      
      <!-- Liquid Background Elements -->
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/4"></div>
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>
      
      <div class="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          <!-- Left Content (Text) - First on Mobile -->
          <div class="text-center lg:text-left flex flex-col items-center lg:items-start pt-4 lg:pt-0">
            
            <!-- Badge -->
            <div appScrollReveal class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-md shadow-sm mb-6 hover:scale-105 transition-transform duration-300">
              <span class="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
              <span class="text-xs font-bold text-slate-800 dark:text-white tracking-wide uppercase">{{ ts.t().hero.badge }}</span>
            </div>
            
            <!-- Headline -->
            <h1 appScrollReveal class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
              {{ ts.t().hero.title_start }} <br class="hidden lg:block">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-200">{{ ts.t().hero.title_end }}</span>
            </h1>
            
            <!-- Description -->
            <div appScrollReveal class="max-w-lg mb-8">
              <p class="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {{ ts.t().hero.desc }}
              </p>
            </div>

            <!-- Buttons -->
            <div appScrollReveal class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8 lg:mb-12">
              <button (click)="smartDownload($event)" class="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-navy-900 px-8 py-3.5 rounded-full font-bold text-base transition-all hover:scale-105 shadow-xl shadow-slate-900/10 dark:shadow-white/10 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16l-5-5h3V4h4v7h3l-5 5zm0 2h-9v2h18v-2h-9z"/></svg>
                <span>{{ ts.t().hero.btn_download }}</span>
              </button>
              
              <button (click)="openVideo()" class="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-slate-800 dark:text-white bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-md hover:bg-white/40 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
                <span class="w-7 h-7 rounded-full bg-white dark:bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-0.5 text-slate-900 dark:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </span>
                <span>{{ ts.t().hero.btn_watch }}</span>
              </button>
            </div>
          </div>

          <!-- Right Content (Phone Mockup) - Bottom on Mobile -->
          <div class="flex justify-center lg:justify-end relative mt-2 lg:mt-0 pb-10 lg:pb-0">
             
             <!-- Glow Effect behind phone -->
             <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-indigo-500/20 blur-[60px] rounded-full -z-10"></div>

             <div class="relative w-[280px] md:w-[320px] aspect-[9/18.5] rounded-[40px] border-[6px] border-slate-900/90 dark:border-white/10 shadow-2xl bg-[#0B1020] overflow-hidden animate-float ring-1 ring-white/10">
                <!-- Screen Content -->
                <div class="absolute inset-0 flex flex-col relative text-white">
                    
                    <!-- Top Bar -->
                    <div class="flex justify-between items-center px-6 pt-5 pb-2">
                        <span class="text-xs font-medium text-slate-400">{{ currentTime() }}</span>
                        <div class="flex gap-1">
                           <div class="w-2 h-2 rounded-full bg-slate-600"></div>
                           <div class="w-2 h-2 rounded-full bg-slate-600"></div>
                        </div>
                    </div>

                    <!-- Location & Next Prayer -->
                    <div class="px-6 flex justify-between items-center mb-6">
                        <!-- Clickable Location Chip to Request Permission -->
                        <div (click)="refreshLocation()" class="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 cursor-pointer hover:bg-white/10 transition-colors group/loc" title="Konumu Güncelle">
                            @if (prayerService.isLoading()) {
                                <div class="w-3 h-3 border-2 border-white/30 border-t-primary-500 rounded-full animate-spin"></div>
                            } @else {
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-primary-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                            }
                            <span class="text-xs font-medium tracking-wide">{{ prayerService.city() }}</span>
                        </div>
                        <div class="w-6 h-6 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                            <div class="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_#fe7b00]"></div>
                        </div>
                    </div>

                    <!-- Main Counter -->
                    <div class="flex-1 flex flex-col items-center justify-start pt-2">
                        <div class="text-primary-500 text-[10px] tracking-[0.2em] uppercase mb-1 font-bold">{{ ts.t().hero.next_prayer }}</div>
                        
                        <!-- Show loading only if no data exists, otherwise show old data while refreshing -->
                        @if (prayerService.isLoading() && !prayerService.times().length) {
                             <div class="h-20 flex items-center"><div class="w-6 h-6 border-2 border-white/20 border-t-primary-500 rounded-full animate-spin"></div></div>
                        } @else {
                            <div class="text-4xl font-light mb-0 tracking-tight">{{ ts.translatePrayerName(prayerService.nextPrayer()?.name || '...') }}</div>
                            <div class="text-[5rem] leading-none font-bold tracking-tighter mb-4">{{ prayerService.nextPrayer()?.time || '--:--' }}</div>
                            
                            <div class="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono flex items-center gap-2 mb-8">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                {{ ts.t().hero.remaining }}: {{ formatRemaining(prayerService.nextPrayer()?.diffMinutes || 0) }}
                            </div>
                        }

                        <!-- Grid Times -->
                        <div class="w-full px-4 grid grid-cols-3 gap-2 mb-4">
                             @for (time of prayerService.times(); track time.vakit) {
                                <div class="relative flex flex-col items-center justify-center py-2.5 rounded-xl bg-white/5 border border-white/5"
                                     [ngClass]="{'!bg-white/10 !border-white/20': time.vakit === prayerService.nextPrayer()?.name}">
                                    <span class="text-[9px] text-slate-400 mb-0.5">{{ ts.translatePrayerName(time.vakit) }}</span>
                                    <span class="text-sm font-bold tracking-tight">{{ time.saat }}</span>
                                </div>
                             }
                        </div>
                    </div>

                    <!-- Bottom Nav Mockup -->
                    <div class="h-16 mt-auto bg-black/20 backdrop-blur-md border-t border-white/5 flex justify-around items-center px-4">
                        <!-- Home (Inactive) -->
                        <div class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-600/20 cursor-default">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        
                        <!-- Book (Active Link) -->
                        <a href="https://kuran.ezanvaktipro.com/" target="_blank" class="text-white/30 hover:text-white transition-colors cursor-pointer" title="Kuran-ı Kerim">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </a>

                        <!-- Menu (Scroll to Download) -->
                        <button (click)="scrollToDownload()" class="text-white/30 hover:text-white transition-colors cursor-pointer" title="Uygulamayı İndir">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                    </div>
                </div>
             </div>
             
          </div>

        </div>
      </div>
    </section>

    <!-- Video Modal -->
    @if (isVideoOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center px-4 animate-scale-up">
        <!-- Backdrop -->
        <div (click)="closeVideo()" class="absolute inset-0 bg-navy-900/80 backdrop-blur-xl transition-opacity"></div>
        
        <!-- Modal Content -->
        <div class="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10">
          <button (click)="closeVideo()" class="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <iframe 
            class="w-full h-full"
            [src]="videoUrl"
            title="Ezan Vakti Pro Tanıtım"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
    }
  `
})
export class HeroComponent {
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  prayerService = inject(PrayerTimesService);
  ts = inject(TranslationService);

  videoUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/Xap4_8AZAjs?autoplay=1');
  isVideoOpen = signal(false);
  currentTime = signal('12:00');

  constructor() {
    setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      this.currentTime.set(`${hours}:${minutes}`);
    }, 1000);
  }

  openVideo() {
    this.isVideoOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeVideo() {
    this.isVideoOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  refreshLocation() {
    if (confirm(this.ts.t().hero.location_request_msg)) {
      this.prayerService.requestLocationAccess().then(() => {
        alert(this.ts.t().hero.location_updated);
      }).catch((error) => {
        const geoCode = this.getGeoErrorCode(error);
        if (geoCode === 1) {
          alert(this.ts.t().hero.location_denied);
        } else if (geoCode === 2 || geoCode === 3) {
          alert('Konum şu an alınamadı. Lütfen GPS/Wi-Fi açıkken tekrar deneyin.');
        } else {
          console.error(error);
        }
      });
    }
  }

  private getGeoErrorCode(error: unknown): number | null {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const maybeCode = Number((error as { code: unknown }).code);
      return Number.isFinite(maybeCode) ? maybeCode : null;
    }
    return null;
  }

  formatRemaining(minutes: number): string {
    if (minutes <= 0) return '00:00';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  smartDownload(e: Event) {
    e.preventDefault();
    const ua = navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);

    if (isIos) {
      window.location.href = API_CONFIG.appStoreUrl;
    } else if (isAndroid) {
      window.location.href = API_CONFIG.playStoreUrl;
    } else {
      document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToDownload() {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  }
}
