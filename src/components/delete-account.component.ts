
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  template: `
    <section id="delete-account" class="py-24 relative overflow-hidden bg-slate-50 dark:bg-navy-950/50 transition-colors">
      <div class="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <div class="max-w-3xl mx-auto text-center">
          <h2 appScrollReveal class="text-4xl md:text-5xl font-bold text-primary-500 mb-12 tracking-tight">
            {{ ts.t().delete_account.title }}
          </h2>

          <div appScrollReveal class="bg-white dark:bg-white/5 p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100 dark:border-white/10">
            <form (submit)="onSubmit($event)" class="flex flex-col md:flex-row gap-4 items-stretch">
              <input 
                type="email" 
                [(ngModel)]="email" 
                name="email"
                required
                email
                [placeholder]="ts.t().delete_account.placeholder" 
                class="flex-1 px-6 py-4 rounded-full bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-lg"
              />
              
              <button 
                type="submit"
                [disabled]="loading() || !email()"
                class="px-10 py-4 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary-500/30 disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px]"
              >
                @if (loading()) {
                  <span class="inline-block w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                } @else {
                  {{ ts.t().delete_account.btn }}
                }
              </button>
            </form>
            <p class="mt-6 text-sm text-slate-500 dark:text-slate-400">
              {{ ts.t().delete_account.desc }}
            </p>
          </div>
        </div>

      </div>
    </section>
  `
})
export class DeleteAccountComponent {
  email = signal('');
  loading = signal(false);
  http = inject(HttpClient);
  ts = inject(TranslationService);

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.email()) return;

    this.loading.set(true);

    const url = 'https://formsubmit.co/ajax/support@deen-studios.com';

    this.http.post(url, {
      email: this.email(),
      _subject: 'Hesap Silme Talebi - Ezan Vakti Pro',
      message: `Kullanıcı ${this.email()} hesabının silinmesini talep etti.`,
      _captcha: 'false'
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.email.set('');
        alert(this.ts.t().delete_account.alert_success);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
        alert(this.ts.t().delete_account.alert_error);
        const subject = encodeURIComponent('Hesap Silme Talebi');
        const body = encodeURIComponent(`E-posta: ${this.email()}\n\nHesabımın silinmesini talep ediyorum.`);
        window.location.href = `mailto:support@deen-studios.com?subject=${subject}&body=${body}`;
      }
    });
  }
}
