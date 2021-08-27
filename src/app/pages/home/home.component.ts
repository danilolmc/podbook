import { Component, OnInit } from '@angular/core';
import { ListStatesEnum } from '@enums/styleListComponent/ListStateEnum';

@Component({
  selector: 'pod-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  listStyle = ListStatesEnum.GRID;

  call(){
    console.log('asdasd')
  }

  changeStyleList(style: ListStatesEnum){
      this.listStyle = style;
  }


}
