import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pod-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent{


  private callbackFn: Function = () => {}

  @Input()
  title = '';

  private selected = false;

  @Input()
  set callback(fun: Function) {

    this.callbackFn = fun;
  }

  get callBackFunction(){
    return this.callbackFn;
  }

  get selectedItem(){
    return this.selected;
  }

  @Input()
  set selectItem(status: boolean){
    this.selected = status;
  }


}
