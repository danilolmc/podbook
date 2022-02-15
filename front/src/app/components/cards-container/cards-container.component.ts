import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
        ], { optional: true })
      ])
    ])],
})
export class CardsContainerComponent implements OnChanges {

  private itemsCallback!: Function
  private styleList: ListStatesEnum = ListStatesEnum.GRID;

  @Input()
  loading = false;

  @Input()
  title = '';
  
  @Input()
  cardsList: CardProperties[] = [];

  @Input()
  noDataMessage = 'No podbooks';

  get itemsCallbackFunction() {
    return this.itemsCallback;
  }

  @Input()
  set itemsCallbackFunction(fun: Function) {

    this.itemsCallback = fun;
  }

  @Input()
  set listStyle(style: ListStatesEnum) {
    this.styleList = style;
  }

  getlistStyle() {
    return StyleListStratergy[this.styleList];
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(this.loading);
  }

}
