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

  getCardTypeClass(): string {

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

  get callback() {
    return this.callbackFunction;
  }

  get getReplaceMissingImage(){
    return ''
  }

  alerta($event: any){
    $event.preventDefault()
    this.contextMenu = true;
  }

  manageA11yContextMenuFocus(element: HTMLLIElement, alternativeElement: HTMLElement){
    element.blur();
    alternativeElement.focus();
  }
  handleMissingImage(imgElement: HTMLImageElement){
    imgElement.src = this.imgUrlMissingReplace;
    imgElement.classList.add('--image-not-found') 
  }

}
