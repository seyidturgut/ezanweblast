
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-screenshots',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="screenshots" class="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-navy-950/30">
      <!-- Background Ambience -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1200px] bg-primary-500/5 blur-3xl rounded-full -z-10 opacity-50"></div>

      <div class="max-w-[1400px] mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16 px-6">
          <h2 appScrollReveal class="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">{{ ts.t().screenshots.title }}</h2>
          <p appScrollReveal class="text-slate-600 dark:text-slate-300 text-lg">{{ ts.t().screenshots.desc }}</p>
        </div>

        <!-- Carousel Container -->
        <div appScrollReveal class="relative group w-full overflow-hidden">
          
          <!-- Fade Gradients for Edges -->
          <div class="absolute left-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-r from-slate-50 dark:from-navy-900 to-transparent pointer-events-none md:w-48"></div>
          <div class="absolute right-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-l from-slate-50 dark:from-navy-900 to-transparent pointer-events-none md:w-48"></div>

          <!-- Carousel Track -->
          <div class="flex gap-8 w-max animate-scroll hover:pause-animation">
            
            <!-- First Loop -->
            <div class="flex gap-8">
              @for (img of ts.t().screenshots.images; track $index) {
                <div class="w-[260px] md:w-[300px] transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02]">
                  <div class="relative rounded-[40px] overflow-hidden border-8 border-slate-900/5 dark:border-white/10 shadow-2xl shadow-slate-900/20 dark:shadow-black/50 bg-slate-900 dark:bg-navy-950 aspect-[9/19]">
                    <div class="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent z-20 pointer-events-none"></div>
                    <img [src]="img" [alt]="'Ezan Vakti Pro Ekran ' + ($index + 1)" class="w-full h-full object-cover relative z-10">
                  </div>
                </div>
              }
            </div>

            <!-- Second Loop (Duplicate for Infinite Effect) -->
            <div class="flex gap-8" aria-hidden="true">
              @for (img of ts.t().screenshots.images; track $index + '_dup') {
                 <div class="w-[260px] md:w-[300px] transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02]">
                  <div class="relative rounded-[40px] overflow-hidden border-8 border-slate-900/5 dark:border-white/10 shadow-2xl shadow-slate-900/20 dark:shadow-black/50 bg-slate-900 dark:bg-navy-950 aspect-[9/19]">
                    <div class="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent z-20 pointer-events-none"></div>
                    <img [src]="img" [alt]="'Ezan Vakti Pro Ekran ' + ($index + 1)" class="w-full h-full object-cover relative z-10">
                  </div>
                </div>
              }
            </div>

          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-scroll {
      animation: scroll 40s linear infinite;
    }
    
    .hover\\:pause-animation:hover {
      animation-play-state: paused;
    }

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    /* Reduce speed on mobile */
    @media (max-width: 768px) {
      .animate-scroll {
        animation-duration: 30s;
      }
    }
  `]
})
export class ScreenshotsComponent {
  ts = inject(TranslationService);
}
