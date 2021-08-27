import { Component, Input } from '@angular/core';
import { CardProperties } from '@components/card/types/CardTypes';
import { ListStatesEnum } from '@enums/styleListComponent/ListStateEnum';
import { StyleListStratergy } from '@stratergy/StyleList/styleListStratergy';

@Component({
  selector: 'pod-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent {

  @Input()
  title = '';

  @Input()
  cardsList: CardProperties[] = [];

  private styleList: ListStatesEnum = ListStatesEnum.GRID;

  @Input()
  set listStyle(style: ListStatesEnum) {
    this.styleList = style;
  }

  getlistStyle() {
    return StyleListStratergy[this.styleList];
  }

}
