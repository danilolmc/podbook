import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[podMissingImage]'
})
export class MissingImageDirective {

  constructor(
    private imageElement: ElementRef<HTMLImageElement>,
    private renderer2: Renderer2
  ) { }
  
  @HostListener('error')
  replaceImage() {
    // this.renderer2.setAttribute(this.imageElement.nativeElement, 'src', this.imageUrl);
    this.imageElement.nativeElement.src = "asdasdas"
  }
}
