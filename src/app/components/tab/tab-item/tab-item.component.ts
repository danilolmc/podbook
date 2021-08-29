import { Component, Input } from '@angular/core';

@Component({
  selector: 'pod-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent {

  @Input()
  title = '';

  @Input()
  urlAnchor = '';

  selected = false;

}
