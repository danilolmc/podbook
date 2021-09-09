import { Component, Input, OnInit } from '@angular/core';
import { CardStyleMappingEnum } from '@enums/cardComponent/CardSstyleMappingEnum';
import { CardTypeStyleStratergy } from '@stratergy/CardComponent/cardStratergy';

import { CardProperties, CardTypes } from './types/CardTypes';

@Component({
  selector: 'pod-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements CardProperties {

  private callbackFunction : Function = () => { };

  selector = 'card';

  @Input()
  title = 'Creating reading habit';

  @Input()
  description = 'Learn how to create an reading habit...';

  @Input()
  badgeText = 'habits';

  @Input()
  width = 'auto';

  @Input()
  cardType: CardTypes = CardStyleMappingEnum.DEFAULT;

  imgUrl = '';

  getCardTypeClass(): string {

    return CardTypeStyleStratergy[this.cardType] || CardTypeStyleStratergy.default;
  }

  @Input()
  set callback(fn: Function) {
    this.callbackFunction = fn;
  }

  get callback() {
    return this.callbackFunction;
  }



}
