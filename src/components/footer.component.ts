
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="pt-16 pb-8 bg-white dark:bg-navy-900 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div class="max-w-[1200px] mx-auto px-6">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
           <!-- Brand & Legal -->
           <div class="flex flex-col gap-6">
             <div class="flex items-center gap-2">
               <div class="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-600 dark:text-primary-500 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
               </div>
               <span class="text-xl font-bold text-slate-900 dark:text-white transition-colors">Ezan Vakti Pro</span>
             </div>
             
             <div class="flex flex-col gap-2 text-sm">
              @if (ts.currentLang() === 'tr') {
                 <a href="https://ezanvaktipro.com/uygulama-gizlilik-politikasi/" target="_blank" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">Gizlilik Politikası</a>
                 <a href="https://ezanvaktipro.com/kullanim-sartlari/" target="_blank" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">Kullanım Şartları</a>
               }
               @if (ts.currentLang() !== 'tr') {
                 <a href="https://ezanvaktipro.com/en/privacy-policy/index.html" target="_blank" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">Privacy Policy</a>
               }
             </div>
             
             <p class="text-xs text-slate-400">&copy; 2026 Ezan Vakti Pro. {{ ts.t().footer.rights }}</p>

             <!-- Social Media Links -->
             <div class="flex gap-4 mt-2">
                <!-- Facebook -->
                <a href="https://www.facebook.com/ezanvaktipro" target="_blank" aria-label="Facebook" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300 group">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.971.956-2.971 3.594v.376h3.428l-.532 3.667h-2.896v7.981A12.012 12.012 0 0 0 24 11.758C24 5.265 18.627 0 12 0S0 5.265 0 11.758a12.016 12.016 0 0 0 9.101 11.933z"/></svg>
                </a>
                <!-- YouTube -->
                <a href="https://www.youtube.com/ezanvaktipro" target="_blank" aria-label="YouTube" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-[#FF0000] hover:text-white transition-all duration-300">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <!-- Instagram -->
                <a href="https://instagram.com/ezanvaktiproapp" target="_blank" aria-label="Instagram" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-[#E4405F] hover:text-white transition-all duration-300">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                <!-- LinkedIn -->
                <a href="https://www.linkedin.com/company/maviay-software/?viewAsMember=true" target="_blank" aria-label="LinkedIn" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-[#0A66C2] hover:text-white transition-all duration-300">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
             </div>

           </div>

           <!-- Address -->
           <div>
             <h3 class="font-bold text-slate-900 dark:text-white mb-6 text-lg transition-colors">{{ ts.t().footer.address_title }}</h3>
             <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors" [innerHTML]="ts.t().footer.address_text">
             </p>
           </div>

           <!-- Contact -->
           <div>
             <h3 class="font-bold text-slate-900 dark:text-white mb-6 text-lg transition-colors">{{ ts.t().footer.contact_title }}</h3>
             <p class="text-sm text-slate-600 dark:text-slate-400 mb-4 transition-colors">{{ ts.t().footer.contact_text }}</p>
             <a href="mailto:hello@deen-studios.com" class="inline-flex items-center gap-2 text-lg font-semibold text-primary-600 dark:text-primary-500 hover:underline transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
               hello&#64;deen-studios.com
             </a>
           </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  ts = inject(TranslationService);
}
