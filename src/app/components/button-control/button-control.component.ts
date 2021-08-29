import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ControlButtonStyleStrategy } from '@stratergy/Control-button/control-button-strategy';

@Component({
  selector: 'pod-button-control',
  templateUrl: './button-control.component.html',
  styleUrls: ['./button-control.component.scss']
})
export class ButtonControlComponent implements OnInit {


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

  toggleControl(){
    this.isOn = this.isOn ? false : true;
  }

  get currentIcon(): string{
    return this.onOffIcons[Number(this.isOn)];
  }
  
  get currentStyleClass(): string{
    console.log(Number(this.isOn))
    return ControlButtonStyleStrategy[Number(this.isOn)];

  }

  executeCallback(){
    this.callbackFn();
    this.toggleControl();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
