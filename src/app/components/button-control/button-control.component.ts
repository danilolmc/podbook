import { Component, Input } from '@angular/core';
import { ControlButtonStyleStrategy } from '@stratergy/Control-button/control-button-strategy';
import { ButtonControl } from './types/ButtonControl';

@Component({
  selector: 'pod-button-control',
  templateUrl: './button-control.component.html',
  styleUrls: ['./button-control.component.scss']
})
export class ButtonControlComponent implements ButtonControl {


  private callbackFn: Function = () => {}

  @Input()
  name = '';

  @Input() isOn = false;

  @Input()
  onOffIcons: [string,string] = ['',''];

  @Input()
  set callback(fun: Function) {

    this.callbackFn = fun;
  }

  get callBackFunction(){
    return this.callbackFn;
  }

  get currentIcon(): string{
    return this.onOffIcons[Number(this.isOn)];
  }
  
  get currentStyleClass(): string{
    return ControlButtonStyleStrategy[Number(this.isOn)];
  }

  get fixedColor(): string{
    return '#8348FF';
  }


  toggleControl(){
    this.isOn = this.isOn ? false : true;
  }

  executeCallback(){
    this.callbackFn();
    this.toggleControl();
  }


}
