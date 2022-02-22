import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pod-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input()
  icon = ''

  @Input()
  callback = function () { }

  @Input()
  name = '';

  @Input()
  contentText = '';

  @Input()
  width = '';

  @Input()
  height = '';

  @Input()
  borderRadius = '0px';

  executeCallback() {
    this.callback();
  }

}
