import { Component } from '@angular/core';
import { CardPropertiesDTO } from '@components/card/types/CardTypes';
import { ListStatesEnum } from '@enums/styleListComponent/ListStateEnum';
import { AudioControlService } from '@services/audio-control/audio-control.service';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'pod-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  card: CardPropertiesDTO = {} as CardPropertiesDTO;

  listStyle = ListStatesEnum.GRID;

  cardCustom: CardPropertiesDTO = {
    badgeText: '',
    description: '',
    imgUrl: '',
    title: '',
    width: '',
    callback: () => this.audioControlService.openAudioBar()
  }

  constructor(private audioControlService: AudioControlService) { }

  homeCards: CardPropertiesDTO[] = [
    this.cardCustom,
    this.cardCustom,
    this.cardCustom,
    this.cardCustom,
    this.cardCustom,
    this.cardCustom,
    this.cardCustom,
    this.cardCustom
  ];

  call() {
    console.log('asdasd')
  }

  changeStyleList(style: ListStatesEnum) {
    this.listStyle = style;
  }

  callbackTest() {
    alert("funciona")
  }


}
