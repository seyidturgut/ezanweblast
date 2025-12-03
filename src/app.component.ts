
import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar.component';
import { HeroComponent } from './components/hero.component';
import { FeaturesComponent } from './components/features.component';
import { ScreenshotsComponent } from './components/screenshots.component';
import { TestimonialsComponent } from './components/testimonials.component';
import { DeleteAccountComponent } from './components/delete-account.component';
import { FooterComponent } from './components/footer.component';
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';
import { HikmetComponent } from './components/hikmet.component';
import { PartnersComponent } from './components/partners.component';
import { MobileAppPromptComponent } from './components/mobile-app-prompt.component';
import { SeoService } from './services/seo.service';
import { RadioComponent } from './components/radio.component';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent,
    HeroComponent,
    RadioComponent,
    HikmetComponent,
    FeaturesComponent,
    ScreenshotsComponent,
    TestimonialsComponent,
    DeleteAccountComponent,
    PartnersComponent,
    FooterComponent,
    ScrollRevealDirective,
    MobileAppPromptComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  // Inject SEO Service to activate it
  private seoService = inject(SeoService);
  protected ts = inject(TranslationService);
  
  showScrollTop = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop.set(window.scrollY > 400);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
