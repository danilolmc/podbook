import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[podMenu]'
})
export class MenuDirective {


  @Input() active = false;


  @HostBinding('class.--active') get isActive(){
    return this.active;
  }

}
