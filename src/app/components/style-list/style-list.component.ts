import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListStatesEnum } from '@enums/styleListComponent/ListStateEnum';


@Component({
  selector: 'pod-style-list',
  templateUrl: './style-list.component.html',
  styleUrls: ['./style-list.component.scss']
})
export class StyleListComponent implements OnInit{

  private state: ListStatesEnum = ListStatesEnum.GRID;

  @Output() stateListChanges = new EventEmitter<ListStatesEnum>();

  setListState() { 
    this.state = ListStatesEnum.LIST; 
    this.emitChange();
  }

  ngOnInit(){
    this.state = ListStatesEnum.GRID;
  }
  
  setGridState() { 
    this.state = ListStatesEnum.GRID; 
    this.emitChange();
  }
  
  emitChange(){
    this.stateListChanges.emit(this.state);
  }

  get isListState() { return this.state === ListStatesEnum.LIST; }

  get isGridState() { return this.state === ListStatesEnum.GRID; }

}
