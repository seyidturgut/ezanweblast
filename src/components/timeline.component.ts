
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="timeline" class="py-24 bg-slate-100 dark:bg-navy-800/50 transition-colors duration-300">
      <div class="max-w-[1200px] mx-auto px-6">
        <h2 appScrollReveal class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center transition-colors">{{ ts.t().timeline.title }}</h2>

        <div class="relative">
          <!-- Horizontal Line for Desktop -->
          <div class="hidden md:block absolute top-[60px] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

          <!-- Vertical Line for Mobile -->
          <div class="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary-500/30 to-transparent"></div>

          <div class="grid md:grid-cols-5 gap-12 md:gap-4 relative">
            
            @for (step of ts.t().timeline.steps; track $index) {
              <div appScrollReveal class="relative flex md:flex-col items-start md:items-center gap-6 md:gap-0 group">
                <div class="md:mb-8 flex-shrink-0 w-16 h-16 md:w-32 md:h-12 flex items-center justify-center md:bg-transparent z-10">
                  <div class="w-4 h-4 rounded-full bg-white dark:bg-navy-900 border-2 border-slate-300 dark:border-slate-600 group-hover:border-primary-500 group-hover:scale-125 transition-all shadow-[0_0_15px_rgba(254,123,0,0.5)]"></div>
                </div>
                <div class="bg-white dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/5 w-full md:text-center shadow-sm dark:shadow-none group-hover:shadow-md dark:group-hover:bg-white/10 transition-all">
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-1 transition-colors">{{ step.title }}</h3>
                  <p class="text-xs text-primary-600 dark:text-primary-500 mb-2 font-medium uppercase tracking-wider transition-colors">{{ step.sub }}</p>
                  <p class="text-slate-600 dark:text-slate-400 text-sm transition-colors">{{ step.desc }}</p>
                </div>
              </div>
            }

          </div>
        </div>
      </div>
    </section>
  `
})
export class TimelineComponent {
  ts = inject(TranslationService);
}
