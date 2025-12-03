
import { Directive, ElementRef, inject, afterNextRender } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective {
  private el = inject(ElementRef);

  constructor() {
    afterNextRender(() => {
      this.initObserver();
    });
  }

  private initObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Set initial state
    this.el.nativeElement.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-8');
    observer.observe(this.el.nativeElement);
  }
}
