
import { Injectable, inject, effect } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService: Title = inject(Title);
  private metaService: Meta = inject(Meta);
  private ts = inject(TranslationService);

  constructor() {
    // Automatically update SEO tags when language changes
    effect(() => {
      const t = this.ts.t().seo;
      const lang = this.ts.currentLang();

      // 1. Update Title
      this.titleService.setTitle(t.title);

      // 2. Update Standard Meta Tags
      this.metaService.updateTag({ name: 'description', content: t.desc });
      this.metaService.updateTag({ name: 'keywords', content: t.keywords });
      this.metaService.updateTag({ name: 'lang', content: lang });

      // 3. Update Open Graph (Facebook/LinkedIn/WhatsApp)
      this.metaService.updateTag({ property: 'og:title', content: t.title });
      this.metaService.updateTag({ property: 'og:description', content: t.desc });
      this.metaService.updateTag({ property: 'og:locale', content: this.getLocale(lang) });
      this.metaService.updateTag({ property: 'og:site_name', content: 'Ezan Vakti Pro' });
      
      // 4. Update Twitter Card
      this.metaService.updateTag({ name: 'twitter:title', content: t.title });
      this.metaService.updateTag({ name: 'twitter:description', content: t.desc });

      // 5. Update HTML lang and dir attribute
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  private getLocale(lang: string): string {
    switch (lang) {
        case 'tr': return 'tr_TR';
        case 'en': return 'en_US';
        case 'ar': return 'ar_SA';
        case 'de': return 'de_DE';
        case 'fr': return 'fr_FR';
        default: return 'tr_TR';
    }
  }
}
