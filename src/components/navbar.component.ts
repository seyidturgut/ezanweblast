
import { Component, signal, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { API_CONFIG } from '../config/api.config';
import { TranslationService, Language } from '../services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav 
      class="fixed left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
      [class.top-0]="!isScrolled()"
      [class.top-4]="isScrolled()"
      [class.px-0]="!isScrolled()"
      [class.px-4]="isScrolled()"
    >
      <div 
        class="mx-auto flex items-center justify-between transition-all duration-500 relative"
        [ngClass]="{
          'max-w-[1200px] w-full rounded-none bg-transparent border-transparent shadow-none py-5': !isScrolled(),
          'max-w-6xl w-auto rounded-2xl md:rounded-full backdrop-blur-xl backdrop-saturate-150 border shadow-2xl shadow-black/5 py-3': isScrolled(),
          'bg-white/70 border-white/20': isScrolled() && !isDark(),
          'bg-navy-900/60 border-white/10': isScrolled() && isDark(),
          'px-6': true
        }"
      >
        
        <!-- Background Glass Layer for Non-Scrolled -->
        <div class="absolute inset-0 bg-white/50 dark:bg-navy-900/50 backdrop-blur-lg -z-10 transition-opacity duration-300 md:hidden" 
             [class.opacity-0]="isScrolled()"
             [class.opacity-100]="!isScrolled()"></div>

        <!-- Logo Area -->
        <a href="#" class="flex items-center gap-3 group relative z-10">
          <div class="relative">
             <div class="absolute inset-0 bg-primary-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <img src="https://ezanvaktipro.com/img/Logo.webp" alt="Ezan Vakti Pro Logo" class="w-10 h-10 object-contain relative transform transition-transform duration-500 group-hover:rotate-12" />
          </div>
          <span class="text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Ezan Vakti <span class="text-primary-600 dark:text-primary-500 font-light">Pro</span>
          </span>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-2 bg-white/5 dark:bg-black/20 p-1.5 rounded-full border border-white/10 backdrop-blur-sm">
          <a href="#features" class="px-5 py-2 rounded-full text-[15px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300">{{ ts.t().nav.features }}</a>
          
          <!-- Library Mega Menu Trigger -->
          <div class="relative group">
            <button class="flex items-center gap-1.5 px-5 py-2 rounded-full text-[15px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300 focus:outline-none">
              {{ ts.t().nav.library }}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Mega Menu Dropdown -->
            <div class="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[640px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
               <div class="bg-white/80 dark:bg-navy-900/80 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/40 dark:border-white/10 overflow-hidden relative p-6 ring-1 ring-black/5 dark:ring-white/5">
                  <!-- Decorative Shine -->
                  <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                  
                  <div class="relative z-10 grid grid-cols-2 gap-x-4 gap-y-2">
                    @for (link of getLibraryLinks(); track link.url) {
                      <a [href]="link.url" target="_blank" class="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/60 dark:hover:bg-white/5 transition-all group/link border border-transparent hover:border-white/20">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-500/10 dark:to-primary-500/5 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover/link:scale-110 transition-transform shadow-sm shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                          </svg>
                        </div>
                        <div>
                          <div class="text-[14px] font-semibold text-slate-700 dark:text-slate-200 group-hover/link:text-primary-600 dark:group-hover/link:text-primary-400 transition-colors">{{ link.title }}</div>
                          <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium tracking-wide uppercase">{{ ts.t().library.subtitle }}</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ms-auto text-primary-400 opacity-0 -translate-x-2 rtl:translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 rtl:group-hover/link:translate-x-0 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </a>
                    }
                  </div>
               </div>
            </div>
          </div>

          <a href="#testimonials" class="px-5 py-2 rounded-full text-[15px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300">{{ ts.t().nav.reviews }}</a>
        </div>

        <!-- Right Actions (Desktop) -->
        <div class="hidden md:flex items-center gap-3">
            
            <!-- Language Dropdown -->
            <div class="relative">
                <button 
                    (click)="toggleLangMenu()"
                    class="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-all duration-300 border border-transparent hover:border-slate-200 dark:hover:border-white/5 font-medium text-sm min-w-[80px] justify-center"
                >
                    <span class="text-lg">{{ getCurrentLangFlag() }}</span>
                    <span>{{ getCurrentLangCode() }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 opacity-60 transition-transform duration-300" [class.rotate-180]="isLangMenuOpen()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>

                <!-- Dropdown Menu -->
                 @if (isLangMenuOpen()) {
                    <div class="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-navy-900 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 overflow-hidden animate-fade-in z-50">
                        <button (click)="changeLang('tr')" class="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-200">
                            <span class="text-xl">🇹🇷</span>
                            <span class="font-medium">Türkçe</span>
                            @if(ts.currentLang() === 'tr') { <svg class="w-4 h-4 ml-auto text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> }
                        </button>
                        <button (click)="changeLang('en')" class="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-200">
                            <span class="text-xl">🇬🇧</span>
                            <span class="font-medium">English</span>
                            @if(ts.currentLang() === 'en') { <svg class="w-4 h-4 ml-auto text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> }
                        </button>
                        <button (click)="changeLang('de')" class="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-200">
                            <span class="text-xl">🇩🇪</span>
                            <span class="font-medium">Deutsch</span>
                            @if(ts.currentLang() === 'de') { <svg class="w-4 h-4 ml-auto text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> }
                        </button>
                        <button (click)="changeLang('fr')" class="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-200">
                            <span class="text-xl">🇫🇷</span>
                            <span class="font-medium">Français</span>
                            @if(ts.currentLang() === 'fr') { <svg class="w-4 h-4 ml-auto text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> }
                        </button>
                        <button (click)="changeLang('ar')" class="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-200">
                            <span class="text-xl">🇸🇦</span>
                            <span class="font-medium">العربية</span>
                            @if(ts.currentLang() === 'ar') { <svg class="w-4 h-4 ml-auto text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> }
                        </button>
                    </div>
                    
                    <!-- Backdrop to close -->
                    <div (click)="isLangMenuOpen.set(false)" class="fixed inset-0 z-40 bg-transparent"></div>
                 }
            </div>

            <!-- Theme Toggle -->
            <button (click)="toggleTheme()" class="p-2.5 rounded-full bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-all duration-300 border border-transparent hover:border-slate-200 dark:hover:border-white/5" aria-label="Tema Değiştir">
                @if (isDark()) {
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                }
            </button>

            <!-- Store Buttons (Android & iOS) -->
            <div class="flex items-center gap-2">
              <!-- Android -->
              <a [href]="API.playStoreUrl" target="_blank" class="w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-navy-900 flex items-center justify-center hover:bg-slate-800 dark:hover:bg-slate-200 transition-all hover:scale-110 shadow-lg shadow-green-500/20" aria-label="Google Play">
                <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.415.415 0 00-.1529-.5676.416.416 0 00-.5682.1524l-2.0163 3.4932c-1.6496-.7534-3.4916-1.1764-5.4413-1.1764-1.9332 0-3.7612.4173-5.4024 1.1594L4.2759 5.4302a.417.417 0 00-.5676-.1524.417.417 0 00-.1524.5676l2.0027 3.4682C2.4276 10.999 0 14.2866 0 18h24c0-3.7314-2.4503-7.0264-6.1185-8.6786"/></svg>
              </a>
              <!-- iOS -->
              <a [href]="API.appStoreUrl" target="_blank" class="w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-navy-900 flex items-center justify-center hover:bg-slate-800 dark:hover:bg-slate-200 transition-all hover:scale-110 shadow-lg shadow-blue-500/20" aria-label="App Store">
                <svg viewBox="0 0 384 512" class="w-5 h-5 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 66.2 23.9 122.2 70.7 184.3 14.8 19.7 36.3 52.6 65.4 50.2 27.4-2.3 33.9-18.8 68.2-18.8 33.1 0 39.4 17.4 67.2 18.8 30.2 1.4 51.5-29.5 72.8-59.5 21.6-30.5 29.8-59.5 30-61-.1-1.3-59.1-23-59.6-118.8zM198.6 46.1c27.4-40.4 22.6-88.1 22.6-88.1-25.2 2.3-55.6 15.6-73.4 46.1-16.6 28-19.4 72-3.4 92.5 4.3 5.4 27.2 11.1 54.2-10.5z"/></svg>
              </a>
            </div>
        </div>

        <!-- Right Side Mobile -->
        <div class="flex items-center gap-3 md:hidden">
            
             <!-- Mobile Language Dropdown -->
             <div class="relative">
                <button 
                    (click)="toggleLangMenu()"
                    class="p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md text-slate-800 dark:text-white transition-colors text-xs font-bold w-9 h-9 flex items-center justify-center"
                >
                    {{ getCurrentLangCode() }}
                </button>
                 @if (isLangMenuOpen()) {
                    <div class="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-navy-900 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 overflow-hidden animate-fade-in z-50">
                        <button (click)="changeLang('tr')" class="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-200">
                            <span class="text-xl">🇹🇷</span>
                            <span class="font-medium">TR</span>
                             @if(ts.currentLang() === 'tr') { <svg class="w-4 h-4 ml-auto text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> }
                        </button>
                        <button (click)="changeLang('en')" class="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-200">
                            <span class="text-xl">🇬🇧</span>
                            <span class="font-medium">EN</span>
                             @if(ts.currentLang() === 'en') { <svg class="w-4 h-4 ml-auto text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> }
                        </button>
                        <button (click)="changeLang('de')" class="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-200">
                            <span class="text-xl">🇩🇪</span>
                            <span class="font-medium">DE</span>
                             @if(ts.currentLang() === 'de') { <svg class="w-4 h-4 ml-auto text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> }
                        </button>
                        <button (click)="changeLang('fr')" class="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-200">
                            <span class="text-xl">🇫🇷</span>
                            <span class="font-medium">FR</span>
                             @if(ts.currentLang() === 'fr') { <svg class="w-4 h-4 ml-auto text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> }
                        </button>
                        <button (click)="changeLang('ar')" class="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-200">
                            <span class="text-xl">🇸🇦</span>
                            <span class="font-medium">AR</span>
                             @if(ts.currentLang() === 'ar') { <svg class="w-4 h-4 ml-auto text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> }
                        </button>
                    </div>
                    <div (click)="isLangMenuOpen.set(false)" class="fixed inset-0 z-40 bg-transparent"></div>
                 }
            </div>

            <button (click)="toggleTheme()" class="p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md text-slate-800 dark:text-white transition-colors">
             @if (isDark()) {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
             } @else {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
             }
            </button>

            <button class="text-slate-900 dark:text-white p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md" (click)="toggleMobileMenu()">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
       @if (isMobileMenuOpen()) {
        <div class="fixed inset-0 z-[60] bg-white/95 dark:bg-navy-900/95 backdrop-blur-2xl flex flex-col md:hidden animate-fade-in">
            <!-- Mobile Header -->
            <div class="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/10">
                <span class="text-xl font-bold text-slate-900 dark:text-white">{{ ts.t().nav.menu }}</span>
                <button (click)="closeMobileMenu()" class="p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            
            <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                <a href="#features" (click)="closeMobileMenu()" class="text-2xl font-bold text-slate-800 dark:text-white">{{ ts.t().nav.features }}</a>
                
                <!-- Mobile Library Accordion -->
                <div>
                    <button (click)="toggleMobileLibrary()" class="w-full flex items-center justify-between text-2xl font-bold text-slate-800 dark:text-white py-2">
                    <span>{{ ts.t().nav.library }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-transform text-slate-400" [class.rotate-180]="isMobileLibraryOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    </button>
                    @if (isMobileLibraryOpen()) {
                    <div class="mt-4 grid grid-cols-1 gap-3 pl-2">
                        @for (link of getLibraryLinks(); track link.url) {
                        <a [href]="link.url" target="_blank" (click)="closeMobileMenu()" class="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-white/5 active:scale-95 transition-transform">
                            <div class="w-10 h-10 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center text-primary-500 shadow-sm shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            </div>
                            <span class="text-lg font-medium text-slate-700 dark:text-slate-200">{{ link.title }}</span>
                        </a>
                        }
                    </div>
                    }
                </div>

                <a href="#testimonials" (click)="closeMobileMenu()" class="text-2xl font-bold text-slate-800 dark:text-white">{{ ts.t().nav.reviews }}</a>
            </div>

            <div class="p-6 border-t border-slate-200 dark:border-white/10">
                <button (click)="smartDownload($event); closeMobileMenu()" class="flex items-center justify-center gap-2 w-full bg-primary-600 text-white py-4 rounded-2xl text-xl font-bold shadow-lg shadow-primary-500/30">
                    {{ ts.t().nav.mobile_download }}
                </button>
            </div>
        </div>
      }
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
    .animate-fade-in { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  `]
})
export class NavbarComponent implements OnInit {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isMobileLibraryOpen = signal(false);
  isLangMenuOpen = signal(false);
  isDark = signal(false);
  
  protected readonly API = API_CONFIG;
  ts = inject(TranslationService);

  getLibraryLinks() {
    const t = this.ts.t().library;
    return [
      { title: t.kuran, url: 'https://kuran.ezanvaktipro.com/' },
      { title: t.hikmet, url: 'https://hikmetname.com/' },
      { title: t.ruya, url: 'https://books.ezanvaktipro.com/ruya-tabirleri' },
      { title: t.ilmihal, url: 'https://books.ezanvaktipro.com/ilmihal' },
      { title: t.terimler, url: 'https://books.ezanvaktipro.com/dini-terimler' },
      { title: t.delail, url: 'https://books.ezanvaktipro.com/delaili-hayrat/' },
      { title: t.tasbeeh_ar, url: 'https://books.ezanvaktipro.com/arabic-salah-tasbeeh/' },
      { title: t.tasbeeh_tr, url: 'https://books.ezanvaktipro.com/arapca-namaz-tesbihati-tr/' }
    ];
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.setDarkTheme(true);
        } else {
            this.setDarkTheme(false);
        }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    this.isScrolled.set(scrollY > 10);
    // Close dropdown on scroll
    if (Math.abs(scrollY) > 50) this.isLangMenuOpen.set(false);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
    if (this.isMobileMenuOpen()) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
  }

  toggleMobileLibrary() {
    this.isMobileLibraryOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    this.isMobileLibraryOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  toggleTheme() {
    this.setDarkTheme(!this.isDark());
  }

  private setDarkTheme(isDark: boolean) {
    this.isDark.set(isDark);
    if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
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

  // --- Language Dropdown Logic ---

  toggleLangMenu() {
    this.isLangMenuOpen.update(v => !v);
  }

  changeLang(lang: Language) {
    this.ts.setLang(lang);
    this.isLangMenuOpen.set(false);
  }

  getCurrentLangCode(): string {
    return this.ts.currentLang().toUpperCase();
  }

  getCurrentLangFlag(): string {
      const lang = this.ts.currentLang();
      if (lang === 'tr') return '🇹🇷';
      if (lang === 'en') return '🇬🇧';
      if (lang === 'de') return '🇩🇪';
      if (lang === 'fr') return '🇫🇷';
      if (lang === 'ar') return '🇸🇦';
      return '🇹🇷';
  }
}
