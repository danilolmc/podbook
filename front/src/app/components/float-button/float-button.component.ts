import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pod-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.scss']
})
export class FloatButtonComponent {

  @Input()
  callback: Function = {} as Function;

  @Input()
  src = '';

  executeCallback() {
    this.callback();
  }
}
