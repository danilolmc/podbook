import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { CardProperties } from '@components/card/types/CardTypes';
import { ListStatesEnum } from '@enums/styleListComponent/ListStateEnum';
import { StyleListStratergy } from '@stratergy/StyleList/styleListStratergy';

@Component({
  selector: 'pod-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
  animations: [
    trigger('taskListAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger(50, [
            animate('.7s  ease', style({ opacity: 1, transform: 'translateY(0px)' }))
          ])
        ])
      ])
    ])]
})
export class CardsContainerComponent {

  @Input()
  title = '';

  cards: CardProperties = {} as CardProperties

  @Input()
  cardsList: CardProperties[] = [this.cards, this.cards, this.cards, this.cards, this.cards, this.cards];

  private styleList: ListStatesEnum = ListStatesEnum.GRID;

  @Input()
  set listStyle(style: ListStatesEnum) {
    this.styleList = style;
  }

  getlistStyle() {
    return StyleListStratergy[this.styleList];
  }

}
