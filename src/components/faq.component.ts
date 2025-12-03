
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="faq" class="py-24 relative">
      <div class="max-w-3xl mx-auto px-6">
        <h2 appScrollReveal class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center tracking-tight">{{ ts.t().faq.title }}</h2>

        <div class="space-y-4">
          @for (item of ts.t().faq.items; track $index) {
            <div appScrollReveal class="bg-white/40 dark:bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 overflow-hidden transition-all hover:bg-white/60 dark:hover:bg-white/[0.06]">
              <button 
                (click)="toggle($index)" 
                class="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span class="text-slate-900 dark:text-white font-semibold text-lg pr-4">{{ item.q }}</span>
                <span 
                  class="transform transition-transform duration-300 text-primary-600 dark:text-primary-500 flex-shrink-0"
                  [class.rotate-180]="isOpen($index)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </span>
              </button>
              <div 
                class="transition-all duration-300 ease-in-out overflow-hidden"
                [style.max-height]="isOpen($index) ? '200px' : '0px'"
                [style.opacity]="isOpen($index) ? '1' : '0'"
              >
                <p class="px-6 pb-6 text-slate-600 dark:text-slate-300 leading-relaxed">{{ item.a }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class FaqComponent {
  ts = inject(TranslationService);
  openIndex = signal<number | null>(0);

  toggle(index: number) {
    this.openIndex.update(current => current === index ? null : index);
  }

  isOpen(index: number): boolean {
    return this.openIndex() === index;
  }
}
