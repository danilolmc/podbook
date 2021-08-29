import { Component, Input, OnInit } from '@angular/core';
import { TabItem } from '../types/TabItem';

@Component({
  selector: 'pod-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent {

  @Input()
  title = ''

  selected = false;

}
