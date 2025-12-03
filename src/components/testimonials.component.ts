
import { Component, signal, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';
import { TranslationService } from '../services/translation.service';

interface Review {
  name: string;
  rating?: number;
  text: string;
  date: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="testimonials" class="py-24 relative overflow-hidden">
      
      <div class="max-w-[1200px] mx-auto px-6 relative z-10">
        <div class="flex flex-col items-center mb-20">
          <div appScrollReveal class="px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 backdrop-blur-sm text-slate-600 dark:text-slate-300 text-xs font-bold mb-6">
            {{ ts.t().testimonials.badge }}
          </div>
          <h2 appScrollReveal class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white text-center tracking-tight">{{ ts.t().testimonials.title }}</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          @for (review of currentReviews(); track $index) {
            <div appScrollReveal class="bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl p-8 rounded-3xl border border-white/40 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/[0.06] transition-all hover:-translate-y-1 flex flex-col h-full">
              <div class="flex text-primary-500 mb-4 text-sm gap-0.5">
                  @for (star of [1,2,3,4,5]; track star) { ★ }
              </div>
              <p class="text-slate-700 dark:text-slate-300 mb-6 italic leading-relaxed font-medium flex-1">
                "{{ review.text }}"
              </p>
              <div class="flex items-center gap-4 mt-auto">
                <div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-500 uppercase">
                  {{ getInitials(review.name) }}
                </div>
                <div>
                  <div class="text-slate-900 dark:text-white font-bold text-sm">{{ review.name }}</div>
                  <div class="text-slate-500 dark:text-slate-400 text-xs">{{ formatDate(review.date) }}</div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent implements OnInit {
  ts = inject(TranslationService);
  
  // Store random indices to keep the "same" reviews visible even when language changes
  private selectedIndices = signal<number[]>([]);

  // Compute the reviews based on the current language and the selected indices
  currentReviews = computed(() => {
    const allReviews = this.ts.t().testimonials.reviews;
    if (!allReviews || allReviews.length === 0) return [];
    
    // If indices are not set or out of bounds (fallback), just return first 3
    if (this.selectedIndices().length === 0) {
        return allReviews.slice(0, 3);
    }

    return this.selectedIndices().map(index => {
        // Safe access in case array lengths differ slightly in future
        return allReviews[index] || allReviews[0];
    });
  });

  ngOnInit() {
    // Determine how many reviews we have (based on TR as source of truth for length)
    // We assume all languages have the same number of reviews for now.
    // However, to be safe, we'll pick indices based on the length of the current list.
    const count = this.ts.t().testimonials.reviews.length;
    
    if (count > 0) {
        const indices = Array.from({ length: count }, (_, i) => i);
        const shuffled = this.shuffleArray(indices);
        this.selectedIndices.set(shuffled.slice(0, 3));
    }
  }

  private shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getInitials(name: string): string {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      // Use current language for date formatting
      const lang = this.ts.currentLang();
      let locale = 'tr-TR';
      if (lang === 'en') locale = 'en-US';
      if (lang === 'de') locale = 'de-DE';
      if (lang === 'ar') locale = 'ar-SA';
      
      return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateStr;
    }
  }
}
