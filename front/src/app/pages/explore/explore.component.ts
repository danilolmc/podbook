import { Component } from '@angular/core';
import { ListStatesEnum } from '@enums/styleListComponent/ListStateEnum';


@Component({
  selector: 'pod-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {

  listStyle = ListStatesEnum.GRID;

  call(){}

  changeStyleList(style: ListStatesEnum){
      this.listStyle = style;
  }

}
