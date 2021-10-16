import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[podMenu]'
})
export class MenuDirective {


  @Input() active = false;
  @Input() visible: boolean | undefined | null = false;


  @HostBinding('class.--active') get isActive() {
    return this.active;
  }

  @HostBinding('class.--visible') get isVisible() {

    return this.visible === undefined || this.visible;
  }

  @HostBinding('class.--hidden') get isHidden() {
    return this.visible !== undefined && !this.visible;
  }

}
