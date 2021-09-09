import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[podButtonControl]'
})
export class ButtonControlDirective {

  
  @Input() animation = true;

  @HostBinding('class.--withAnimation')
  get withAnimation(){
    return this.animation;
  }


}
