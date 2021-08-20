import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pod-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.scss']
})
export class FloatButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  callback : Function = (fun: Function) => fun();
}
