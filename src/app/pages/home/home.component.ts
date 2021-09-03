import { Component, OnInit } from '@angular/core';
import { CardProperties, CardPropertiesDTO } from '@components/card/types/CardTypes';
import { ListStatesEnum } from '@enums/styleListComponent/ListStateEnum';

@Component({
  selector: 'pod-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  card: CardPropertiesDTO = {} as CardPropertiesDTO;
  
  listStyle = ListStatesEnum.GRID;

  cardCustom : CardPropertiesDTO = {
    badgeText: '',
    description: '',
    imgUrl: '',
    title: '',
    width: '',
    callback: () => alert("callback customizado")
  }

  homeCards : CardPropertiesDTO[] = [this.card,this.card,this.card,this.card];

  call(){
    console.log('asdasd')
  }


  changeStyleList(style: ListStatesEnum){
      this.listStyle = style;
  }

  callbackTest(){
    alert("funciona")
  }


}
