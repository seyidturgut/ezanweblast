
import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { API_CONFIG } from '../config/api.config';

@Component({
  selector: 'app-mobile-app-prompt',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible()) {
      <div class="fixed bottom-4 left-4 right-4 z-[100] animate-slide-up">
        <div class="bg-white dark:bg-navy-900 rounded-2xl p-4 shadow-2xl border border-slate-200 dark:border-white/10 relative flex items-center gap-4">
          
          <!-- Close Button -->
          <button (click)="dismiss()" class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <!-- App Icon -->
          <div class="shrink-0 relative">
             <div class="w-14 h-14 rounded-xl overflow-hidden shadow-lg">
                <img src="https://ezanvaktipro.com/img/Logo.webp" alt="App Icon" class="w-full h-full object-cover">
             </div>
             @if (platform() === 'android') {
                 <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full p-0.5 shadow-sm">
                   <svg viewBox="0 0 24 24" class="w-full h-full text-[#3DDC84]" fill="currentColor"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.415.415 0 00-.1529-.5676.416.416 0 00-.5682.1524l-2.0163 3.4932c-1.6496-.7534-3.4916-1.1764-5.4413-1.1764-1.9332 0-3.7612.4173-5.4024 1.1594L4.2759 5.4302a.417.417 0 00-.5676-.1524.417.417 0 00-.1524.5676l2.0027 3.4682C2.4276 10.999 0 14.2866 0 18h24c0-3.7314-2.4503-7.0264-6.1185-8.6786"/></svg>
                 </div>
             } @else {
                 <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full p-0.5 shadow-sm">
                   <svg viewBox="0 0 384 512" class="w-full h-full text-black" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 66.2 23.9 122.2 70.7 184.3 14.8 19.7 36.3 52.6 65.4 50.2 27.4-2.3 33.9-18.8 68.2-18.8 33.1 0 39.4 17.4 67.2 18.8 30.2 1.4 51.5-29.5 72.8-59.5 21.6-30.5 29.8-59.5 30-61-.1-1.3-59.1-23-59.6-118.8zM198.6 46.1c27.4-40.4 22.6-88.1 22.6-88.1-25.2 2.3-55.6 15.6-73.4 46.1-16.6 28-19.4 72-3.4 92.5 4.3 5.4 27.2 11.1 54.2-10.5z"/></svg>
                 </div>
             }
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
             <h3 class="font-bold text-slate-900 dark:text-white leading-tight">{{ ts.t().app_prompt.title }}</h3>
             <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
               {{ platform() === 'android' ? ts.t().app_prompt.desc_android : ts.t().app_prompt.desc_ios }}
             </p>
             <div class="flex items-center gap-1 mt-1">
                <span class="text-[10px] text-primary-500 font-bold">★ 4.8</span>
                <span class="text-[10px] text-slate-400">| 10M+</span>
             </div>
          </div>

          <!-- Button -->
          <a [href]="getLink()" target="_blank" class="shrink-0 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold py-2.5 px-4 rounded-full shadow-lg shadow-primary-500/30 transition-colors">
            {{ ts.t().app_prompt.btn }}
          </a>

        </div>
      </div>
    }
  `,
  styles: [`
    .animate-slide-up { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class MobileAppPromptComponent implements OnInit {
  ts = inject(TranslationService);
  isVisible = signal(false);
  platform = signal<'android' | 'ios' | null>(null);

  ngOnInit() {
    this.checkPlatform();
  }

  checkPlatform() {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(ua);
    const isIOS = /iphone|ipad|ipod/.test(ua);

    // Only show on mobile devices
    if (!isAndroid && !isIOS) return;

    // Check if dismissed previously (Session storage or Local storage)
    if (localStorage.getItem('app_prompt_dismissed')) {
      const dismissedAt = parseInt(localStorage.getItem('app_prompt_dismissed') || '0');
      const now = Date.now();
      // Show again after 24 hours
      if (now - dismissedAt < 24 * 60 * 60 * 1000) {
        return;
      }
    }

    if (isAndroid) {
      this.platform.set('android');
      this.isVisible.set(true);
    } else if (isIOS) {
      this.platform.set('ios');
      this.isVisible.set(true);
    }
  }

  getLink() {
    return this.platform() === 'android' ? API_CONFIG.playStoreUrl : API_CONFIG.appStoreUrl;
  }

  dismiss() {
    this.isVisible.set(false);
    localStorage.setItem('app_prompt_dismissed', Date.now().toString());
  }
}
