import { Component, Input, OnInit } from '@angular/core';
import { CardProperties, CardTypes, CardTypeStyleStratergy } from './types/CardTypes';

@Component({
  selector: 'pod-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements CardProperties {

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
  cardType: CardTypes = 'inline';

  imgUrl = '';

  getCardTypeClass(): string{
    
    return CardTypeStyleStratergy[this.cardType] || CardTypeStyleStratergy.default;
  }



}
