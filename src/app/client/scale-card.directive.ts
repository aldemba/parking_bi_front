import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScaleCard]'
})
export class ScaleCardDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.enlargeImage();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.resetImageSize();
  }

  enlargeImage() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.05)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease');
  }

  resetImageSize() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }

}
