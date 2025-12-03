
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HikmetService, HikmetPost } from '../services/hikmet.service';
import { TranslationService } from '../services/translation.service';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

@Component({
  selector: 'app-hikmet',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    @if (ts.currentLang() === 'tr') {
      <section id="hikmet" class="py-16 relative overflow-hidden bg-slate-50/50 dark:bg-navy-900/50 transition-colors">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div class="max-w-4xl mx-auto px-6 relative z-10">
          <!-- Compact Header -->
          <div class="text-center mb-10">
            <h2 appScrollReveal class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              {{ ts.t().hikmet.title }}
            </h2>
            <p appScrollReveal class="text-slate-500 dark:text-slate-400 text-sm md:text-base">
              {{ ts.t().hikmet.subtitle }}
            </p>
          </div>

          @if (loading()) {
            <div class="flex justify-center py-12">
              <div class="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
            </div>
          } @else {
            <div class="grid md:grid-cols-2 gap-6">
                
                <!-- Günün Ayeti Card -->
                <div appScrollReveal class="bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                    <!-- Card Header -->
                    <div class="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                        <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <h3 class="font-bold text-slate-800 dark:text-white text-sm md:text-base truncate">{{ ts.t().hikmet.verse_title }}</h3>
                    </div>
                    
                    <!-- Image Container (Increased Height for Mobile) -->
                    <div class="relative h-96 md:h-96 bg-slate-100 dark:bg-navy-950 flex items-center justify-center p-2 group-hover:bg-slate-200/50 dark:group-hover:bg-navy-900 transition-colors">
                        @if (dailyAyet()) {
                           <img [src]="dailyAyet()?.image_url" [alt]="dailyAyet()?.title" class="max-h-full max-w-full object-contain drop-shadow-sm rounded-lg" />
                        }
                        
                        <!-- Floating Share Button -->
                        <button (click)="sharePost(dailyAyet())" class="absolute bottom-3 right-3 p-2.5 rounded-full bg-white dark:bg-navy-700 text-slate-700 dark:text-white shadow-lg border border-slate-100 dark:border-white/10 hover:scale-110 active:scale-95 transition-all group/btn" [title]="ts.t().hikmet.share">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover/btn:text-primary-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                        </button>
                    </div>
                </div>

                <!-- Günün Hadisi Card -->
                <div appScrollReveal class="bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                    <!-- Card Header -->
                    <div class="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                        <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                        </div>
                        <h3 class="font-bold text-slate-800 dark:text-white text-sm md:text-base truncate">{{ ts.t().hikmet.hadith_title }}</h3>
                    </div>
                    
                    <!-- Image Container (Increased Height for Mobile) -->
                    <div class="relative h-96 md:h-96 bg-slate-100 dark:bg-navy-950 flex items-center justify-center p-2 group-hover:bg-slate-200/50 dark:group-hover:bg-navy-900 transition-colors">
                        @if (dailyHadis()) {
                           <img [src]="dailyHadis()?.image_url" [alt]="dailyHadis()?.title" class="max-h-full max-w-full object-contain drop-shadow-sm rounded-lg" />
                        }
                        
                        <!-- Floating Share Button -->
                        <button (click)="sharePost(dailyHadis())" class="absolute bottom-3 right-3 p-2.5 rounded-full bg-white dark:bg-navy-700 text-slate-700 dark:text-white shadow-lg border border-slate-100 dark:border-white/10 hover:scale-110 active:scale-95 transition-all group/btn" [title]="ts.t().hikmet.share">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover/btn:text-blue-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                        </button>
                    </div>
                </div>

            </div>
          }
        </div>
      </section>
    }
  `,
  styles: []
})
export class HikmetComponent implements OnInit {
  private hikmetService = inject(HikmetService);
  ts = inject(TranslationService);
  
  loading = signal(true);
  dailyAyet = signal<HikmetPost | null>(null);
  dailyHadis = signal<HikmetPost | null>(null);

  ngOnInit() {
    this.hikmetService.getPosts().subscribe({
      next: (posts) => {
        this.selectRandomContent(posts);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Hikmet API error', err);
        this.loading.set(false);
      }
    });
  }

  private selectRandomContent(allPosts: HikmetPost[]) {
     if (!allPosts || allPosts.length === 0) return;

     // Shuffle array first to ensure randomness on every load
     const shuffledPosts = this.shuffleArray([...allPosts]);

     // Enhanced filtering keywords
     const ayetList = shuffledPosts.filter(p => {
         const t = p.title.toLowerCase();
         return t.includes('ayet') || t.includes('sure') || t.includes('meal') || t.includes('bakara') || t.includes('fatiha') || t.includes('ali imran');
     });

     const hadisList = shuffledPosts.filter(p => {
         const t = p.title.toLowerCase();
         return t.includes('hadis') || t.includes('peygamber') || t.includes('resul') || t.includes('sav') || t.includes('efendimiz');
     });

     // Select Random Ayet
     if (ayetList.length > 0) {
        this.dailyAyet.set(ayetList[Math.floor(Math.random() * ayetList.length)]);
     } else {
        // Fallback: Pick random from all
        this.dailyAyet.set(shuffledPosts[0]);
     }

     // Select Random Hadis
     if (hadisList.length > 0) {
        this.dailyHadis.set(hadisList[Math.floor(Math.random() * hadisList.length)]);
     } else {
        // Fallback: Pick a different random one from all
        const fallback = shuffledPosts.length > 1 ? shuffledPosts[1] : shuffledPosts[0];
        // Ensure we don't show the exact same image twice if possible
        if (fallback.id === this.dailyAyet()?.id && shuffledPosts.length > 2) {
             this.dailyHadis.set(shuffledPosts[2]);
        } else {
             this.dailyHadis.set(fallback);
        }
     }
  }

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async sharePost(post: HikmetPost | null) {
    if (!post) return;

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Ezan Vakti Pro - ' + this.ts.t().hikmet.title,
                text: post.title,
                url: post.image_url
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    } else {
        // Fallback: Copy Image URL
        navigator.clipboard.writeText(post.image_url).then(() => {
            alert(this.ts.t().hikmet.share_success);
        });
    }
  }
}
