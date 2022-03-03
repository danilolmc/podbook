import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pod-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent{

  @Input()
  callback: Function = () => {}

  @Input()
  title = '';

  selected = false;

  @Input()
  set selectItem(status: boolean){
    this.selected = status;
  }


}
