import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CardStyleMappingEnum } from '@enums/cardComponent/CardSstyleMappingEnum';
import { CardTypeStyleStratergy } from '@stratergy/CardComponent/cardStratergy';

import { CardProperties, CardTypes } from './types/CardTypes';

@Component({
  selector: 'pod-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements CardProperties {


  @ViewChild('img') imgElement!: ElementRef<HTMLImageElement>;
  @ViewChild('option') optionElement!: ElementRef<HTMLLIElement>;
  @ViewChild('ellipsis') ellipsisElement!: ElementRef<HTMLSpanElement>;

  callbackFunction : Function = {} as Function;

  selector = 'card';

  contextMenu = false;

  @Input()
  title = '';

  @Input()
  description = '';

  @Input()
  badgeText = '';

  @Input()
  width = 'auto';

  @Input()
  cardType: CardTypes = CardStyleMappingEnum.DEFAULT;

  @Input()
  imgUrl = '';

  @Input()
  imgUrlMissingReplace = '';

  get cardTypeClass(): string {

    return CardTypeStyleStratergy[this.cardType] || CardTypeStyleStratergy.default;
  }

  @Input()
  set click(fn: Function | undefined) {

    if(!fn) {
      this.callbackFunction = () => {}
      return;
    }

    this.callbackFunction = fn;
  }

  handleMissingImage(){
    this.imgElement.nativeElement.src = this.imgUrlMissingReplace;
    this.imgElement.nativeElement.classList.add('--image-not-found') 
  }

}
