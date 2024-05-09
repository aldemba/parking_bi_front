import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScalecardadmin]'
})
export class ScalecardadminDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.enlargeImage();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.resetImageSize();
  }

  enlargeImage() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.1)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease');
  }

  resetImageSize() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }

}
