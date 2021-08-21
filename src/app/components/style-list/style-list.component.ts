import { EventEmitter, OnInit } from '@angular/core';
import { Component, Output } from '@angular/core';
import { ListStatesEnum } from './enums/ListStateEnum';
import { defaultState, States } from './types/StyleListTypes';


@Component({
  selector: 'pod-style-list',
  templateUrl: './style-list.component.html',
  styleUrls: ['./style-list.component.scss']
})
export class StyleListComponent implements OnInit{

  private state: States = defaultState;

  @Output() stateListChanges = new EventEmitter<States>();

  setListState() { 
    this.state = 'list'; 
    this.emitChange();
  }

  ngOnInit(){
    this.state = defaultState
  }
  
  setGridState() { 
    this.state = 'grid'; 
    this.emitChange();
  }
  
  emitChange(){
    this.stateListChanges.emit(this.state);
  }

  get isListState() { return this.state === ListStatesEnum.LIST; }

  get isGridState() { return this.state === ListStatesEnum.GRID; }

}
