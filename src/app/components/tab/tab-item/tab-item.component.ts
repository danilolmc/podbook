import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pod-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent implements OnInit{


  private callbackFn: Function = () => {}

  @Input()
  title = '';

  private selected = false;

  @Input()
  set callback(fun: Function) {

    this.callbackFn = fun;
  }

  get selectedItem(){
    return this.selected;
  }

  ngOnInit(){}

  @Input()
  set selectItem(status: boolean){
    this.selected = status;
  }

  get callBackFunction(){
    return this.callbackFn;
  }

}
