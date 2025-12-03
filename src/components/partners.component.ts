
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="py-16 relative overflow-hidden bg-white dark:bg-navy-900 border-t border-slate-100 dark:border-white/5">
      <div class="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <div class="text-left mb-10">
          <span appScrollReveal class="text-primary-600 dark:text-primary-500 font-bold tracking-wide text-sm uppercase mb-2 block">
            {{ ts.t().partners.badge }}
          </span>
          <h2 appScrollReveal class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {{ ts.t().partners.title }}
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
          
          <!-- Google -->
          <div appScrollReveal class="flex flex-col items-center gap-4 group cursor-default">
            <div class="w-24 h-24 rounded-full bg-[#fff7ed] dark:bg-white/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
               <!-- Google G Logo -->
               <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 48 48">
                 <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                 <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                 <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                 <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
               </svg>
            </div>
          </div>

          <!-- Huawei -->
          <div appScrollReveal class="flex flex-col items-center gap-4 group cursor-default">
            <div class="w-24 h-24 rounded-full bg-[#f0f9ff] dark:bg-white/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
               <!-- Huawei Icon -->
               <img src="https://upload.wikimedia.org/wikipedia/en/0/04/Huawei_Standard_logo.svg" alt="Huawei" class="w-12 h-12 object-contain" />
            </div>
          </div>

          <!-- Apple -->
          <div appScrollReveal class="flex flex-col items-center gap-4 group cursor-default">
            <div class="w-24 h-24 rounded-full bg-[#f0fdf4] dark:bg-white/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
               <!-- Apple Logo -->
               <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Apple_Logo.svg" alt="Huawei" class="w-12 h-12 object-contain" />
            </div>
          </div>

          <!-- Android TV -->
          <div appScrollReveal class="flex flex-col items-center gap-4 group cursor-default">
            <div class="w-24 h-24 rounded-full bg-[#fefce8] dark:bg-white/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
               <!-- Android Text/Logo -->
               <div class="flex flex-col items-center leading-none">
                 <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-[#3DDC84]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.415.415 0 00-.1529-.5676.416.416 0 00-.5682.1524l-2.0163 3.4932c-1.6496-.7534-3.4916-1.1764-5.4413-1.1764-1.9332 0-3.7612.4173-5.4024 1.1594L4.2759 5.4302a.417.417 0 00-.5676-.1524.417.417 0 00-.1524.5676l2.0027 3.4682C2.4276 10.999 0 14.2866 0 18h24c0-3.7314-2.4503-7.0264-6.1185-8.6786"/></svg>
                 <span class="text-[10px] font-black tracking-tighter text-slate-700 dark:text-slate-200 mt-1">androidtv</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class PartnersComponent {
  ts = inject(TranslationService);
}
