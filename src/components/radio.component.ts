
import { Component, inject, signal, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../services/translation.service';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="relative py-12">
      <!-- Hidden Audio Element for Better Control & Event Handling -->
      <!-- 'crossorigin' removed to prevent CORS issues on simple playback -->
      <audio 
        #audioPlayer 
        preload="none"
        (ended)="onEnded()" 
        (error)="onError($event)" 
        (waiting)="loading.set(true)" 
        (playing)="onPlaying()" 
        (pause)="onPause()">
      </audio>

      <div class="max-w-4xl mx-auto px-6 relative z-10">
        
        <div appScrollReveal class="relative overflow-hidden rounded-3xl bg-[#0B1020] border border-white/10 shadow-2xl group">
          
          <!-- Background Glow -->
          <div class="absolute top-0 right-0 w-[300px] h-[300px] bg-primary-500/20 blur-[100px] rounded-full -z-10 opacity-60"></div>
          
          <div class="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            
            <!-- Left: Info & Visualizer -->
            <div class="flex items-center gap-5 w-full md:w-auto">
              <div class="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 shrink-0 shadow-inner">
                 <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 md:w-10 md:h-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                 
                 <!-- Live Indicator -->
                 <div class="absolute -top-2 -right-2 flex items-center gap-1 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg ring-2 ring-[#0B1020]">
                   <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                   LIVE
                 </div>
              </div>

              <div class="flex-1 min-w-0 overflow-hidden">
                <h3 class="text-xl md:text-2xl font-bold text-white mb-1 truncate">{{ ts.t().radio.title }}</h3>
                <div class="flex items-center gap-4 h-12">
                    <p class="text-slate-400 text-xs md:text-sm font-medium flex items-center gap-2 shrink-0 max-w-full">
                      <span class="w-2 h-2 rounded-full transition-colors duration-300 shrink-0" [class.bg-green-500]="isPlaying()" [class.shadow-[0_0_10px_rgba(34,197,94,0.6)]]="isPlaying()" [class.bg-slate-600]="!isPlaying()"></span>
                      
                      <span class="truncate block">
                        @if (currentTrack()) {
                           <span class="text-primary-400 font-bold animate-pulse">{{ currentTrack() }}</span>
                        } @else {
                           {{ isPlaying() ? ts.t().radio.playing : ts.t().radio.subtitle }}
                        }
                      </span>
                    </p>
                    
                    <!-- Dynamic Visualizer Bars -->
                    @if (isPlaying()) {
                      <div class="flex items-end gap-1.5 h-full animate-fade-in ml-2 md:ml-4 shrink-0 pb-1">
                        @for (height of visualizerBars(); track $index) {
                            <div 
                                class="w-1.5 md:w-2 rounded-full transition-[height] duration-75 ease-linear"
                                [style.height.%]="height"
                                [style.backgroundColor]="getBarColor($index)"
                                [style.boxShadow]="'0 0 12px ' + getBarColor($index)">
                            </div>
                        }
                      </div>
                    }
                </div>
              </div>
            </div>

            <!-- Right: Controls -->
            <div class="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end bg-white/5 md:bg-transparent p-3 md:p-0 rounded-2xl">
               
               <!-- Volume Slider -->
               <div class="group/vol flex items-center gap-2">
                  <button (click)="toggleMute()" class="text-slate-400 hover:text-white transition-colors">
                    @if (volume() === 0) {
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                    } @else {
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                    }
                  </button>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    [value]="volume()" 
                    (input)="onVolumeChange($event)"
                    class="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  >
               </div>

               <!-- Play/Pause Button -->
               <button 
                 (click)="togglePlay()" 
                 [disabled]="loading()"
                 class="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 @if (loading()) {
                    <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 } @else if (isPlaying()) {
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                 } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 }
               </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .animate-fade-in {
       animation: fadeIn 0.5s ease-out forwards;
    }
    @keyframes fadeIn {
       from { opacity: 0; transform: translateY(5px); }
       to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class RadioComponent implements AfterViewInit, OnDestroy {
  ts = inject(TranslationService);
  private http = inject(HttpClient);
  
  @ViewChild('audioPlayer') audioRef!: ElementRef<HTMLAudioElement>;
  
  // HTTPS Stream URL
  private streamUrl = 'https://stream.ezanvaktipro.com/stream1';
  // HTTPS Metadata URL (Placeholder - adjust if needed)
  private statusUrl = 'https://stream.ezanvaktipro.com/stats.json'; 
  
  isPlaying = signal(false);
  volume = signal(1);
  loading = signal(false);
  currentTrack = signal<string | null>(null);
  
  // Visualizer State
  visualizerBars = signal<number[]>([15, 25, 40, 25, 15]);
  private animationFrameId: number | null = null;
  
  private metadataTimer: any;

  ngAfterViewInit() {
    if (this.audioRef && this.audioRef.nativeElement) {
      this.audioRef.nativeElement.volume = this.volume();
    }
    // Attempt to fetch metadata periodically if configured
    this.metadataTimer = setInterval(() => {
        // Metadata fetching logic placeholder
    }, 15000);
  }

  ngOnDestroy() {
    this.stopVisualizer();
    if (this.metadataTimer) {
        clearInterval(this.metadataTimer);
    }
    // Clean up audio
    if (this.audioRef && this.audioRef.nativeElement) {
        this.audioRef.nativeElement.pause();
        this.audioRef.nativeElement.src = '';
    }
  }

  togglePlay() {
    const audio = this.audioRef.nativeElement;
    if (!audio) return;

    if (this.isPlaying()) {
      audio.pause();
    } else {
      // Append random param to bypass cache and potentially help with codec detection
      const playUrl = `${this.streamUrl}?t=${Date.now()}&type=.mp3`;
      if (!audio.src || !audio.src.includes(this.streamUrl)) {
         audio.src = playUrl;
      }
      this.loading.set(true);
      audio.load();
      audio.play().catch(e => {
        console.error('Playback error', e);
        this.loading.set(false);
      });
    }
  }

  onPlaying() {
    this.loading.set(false);
    this.isPlaying.set(true);
    this.startVisualizer();
  }

  onPause() {
    this.isPlaying.set(false);
    this.loading.set(false);
    this.stopVisualizer();
  }

  onEnded() {
    this.isPlaying.set(false);
    this.stopVisualizer();
  }

  onError(e: any) {
    const audio = this.audioRef.nativeElement;
    let errorMsg = 'Unknown Audio Error';
    if (audio.error) {
        switch (audio.error.code) {
            case 1: errorMsg = 'Aborted'; break;
            case 2: errorMsg = 'Network Error'; break;
            case 3: errorMsg = 'Decoding Error'; break;
            case 4: errorMsg = 'Source Not Supported'; break;
        }
    }
    console.error(`Audio Error: ${errorMsg}`, e);
    this.loading.set(false);
    this.isPlaying.set(false);
    this.stopVisualizer();
  }

  onVolumeChange(event: any) {
    const vol = parseFloat(event.target.value);
    this.volume.set(vol);
    if (this.audioRef) {
        this.audioRef.nativeElement.volume = vol;
    }
  }

  toggleMute() {
    if (this.volume() > 0) {
        this.volume.set(0);
        if (this.audioRef) this.audioRef.nativeElement.volume = 0;
    } else {
        this.volume.set(1);
        if (this.audioRef) this.audioRef.nativeElement.volume = 1;
    }
  }

  getBarColor(index: number): string {
    // "Glow Green" palette: Shades of Green and Emerald
    const colors = ['#4ade80', '#22c55e', '#10b981', '#22c55e', '#4ade80'];
    return colors[index % colors.length];
  }

  private startVisualizer() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    
    const animate = () => {
        if (!this.isPlaying()) return;
        
        // Randomize bars for effect
        const bars = this.visualizerBars().map(() => Math.floor(Math.random() * 60) + 20);
        this.visualizerBars.set(bars);
        
        // Update at a slower rate than 60fps for visual style
        setTimeout(() => {
            this.animationFrameId = requestAnimationFrame(animate);
        }, 100);
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }

  private stopVisualizer() {
    if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
    }
    this.visualizerBars.set([15, 25, 40, 25, 15]);
  }
}
