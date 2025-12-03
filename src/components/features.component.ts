
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="features" class="py-20 relative overflow-hidden bg-white dark:bg-navy-900 transition-colors">
      <!-- Subtle Background Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-[100px] -z-10"></div>

      <div class="max-w-5xl mx-auto px-6">
        
        <!-- Compact Header -->
        <div class="text-center mb-12">
          <h2 appScrollReveal class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{{ ts.t().features.title }}</h2>
          <p appScrollReveal class="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">{{ ts.t().features.subtitle }}</p>
        </div>

        <!-- Modern Compact Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <!-- Stat 1: Features -->
          <div appScrollReveal class="col-span-1 bg-slate-50 dark:bg-navy-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-slate-100 dark:border-white/5 hover:border-primary-500/30 transition-colors group">
            <div class="text-3xl md:text-4xl font-black text-primary-500 mb-1 group-hover:scale-110 transition-transform">{{ ts.t().features.bento.stats_features }}</div>
            <div class="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-300 leading-tight">{{ ts.t().features.bento.stats_features_desc }}</div>
          </div>

          <!-- Stat 2: Hafiz -->
          <div appScrollReveal class="col-span-1 bg-slate-50 dark:bg-navy-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-slate-100 dark:border-white/5 hover:border-primary-500/30 transition-colors group">
            <div class="text-3xl md:text-4xl font-black text-blue-500 mb-1 group-hover:scale-110 transition-transform">{{ ts.t().features.bento.stats_hafiz }}</div>
            <div class="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-300 leading-tight">{{ ts.t().features.bento.stats_hafiz_desc }}</div>
          </div>

          <!-- Themes (Spans 2 cols on mobile if needed, but lets keep it compact) -->
          <div appScrollReveal class="col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 rounded-3xl p-6 flex items-center justify-between relative overflow-hidden group">
             <div class="relative z-10">
               <h3 class="text-lg font-bold text-white dark:text-navy-900 mb-1">{{ ts.t().features.bento.themes_title }}</h3>
               <p class="text-slate-400 dark:text-navy-600 text-xs">{{ ts.t().features.bento.themes_desc }}</p>
             </div>
             <div class="flex -space-x-3 relative z-10">
                <div class="w-8 h-8 rounded-full border-2 border-slate-800 dark:border-white bg-purple-500 shadow-lg group-hover:translate-x-1 transition-transform"></div>
                <div class="w-8 h-8 rounded-full border-2 border-slate-800 dark:border-white bg-primary-500 shadow-lg group-hover:-translate-y-1 transition-transform delay-75"></div>
                <div class="w-8 h-8 rounded-full border-2 border-slate-800 dark:border-white bg-emerald-500 shadow-lg group-hover:-translate-x-1 transition-transform delay-100"></div>
             </div>
             <!-- Decor -->
             <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <!-- Main Feature 1: UI -->
          <div appScrollReveal class="col-span-2 md:col-span-2 h-48 md:h-56 bg-white dark:bg-navy-800 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden relative">
             <div class="relative z-10">
               <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
               </div>
               <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{{ ts.t().features.bento.ui_title }}</h3>
               <p class="text-slate-600 dark:text-slate-400 text-sm max-w-[80%]">{{ ts.t().features.bento.ui_desc }}</p>
             </div>
             <!-- Abstract Decoration -->
             <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
             <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-4 bottom-4 w-16 h-16 text-slate-100 dark:text-white/5 opacity-50 -rotate-12 group-hover:rotate-0 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
          </div>

          <!-- Main Feature 2: Quran -->
          <div appScrollReveal class="col-span-2 md:col-span-2 h-48 md:h-56 bg-white dark:bg-navy-800 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden relative">
             <div class="relative z-10">
               <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
               </div>
               <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{{ ts.t().features.bento.quran_title }}</h3>
               <p class="text-slate-600 dark:text-slate-400 text-sm max-w-[80%]">{{ ts.t().features.bento.quran_desc }}</p>
             </div>
             <!-- Abstract Decoration -->
             <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
             <div class="absolute right-4 bottom-2 text-6xl opacity-[0.05] dark:opacity-[0.1] font-serif group-hover:scale-110 transition-transform duration-500">ﷺ</div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class FeaturesComponent {
  ts = inject(TranslationService);
}
