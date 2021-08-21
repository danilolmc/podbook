import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListStatesEnum } from './enums/ListStateEnum';

import { StyleListComponent } from './style-list.component';

describe('StyleListComponent', () => {
  let component: StyleListComponent;
  let fixture: ComponentFixture<StyleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should active list style', () => {
    component.ngOnInit();

    const spyemitChange = jest.spyOn(component, 'emitChange');
    const spystateListChanges = jest.spyOn(component.stateListChanges, 'emit');
    
    component.setListState();
    
    expect(component.isListState).toBeTruthy();
    expect(spyemitChange).toHaveBeenCalled();
    expect(spystateListChanges).toHaveBeenCalledWith(ListStatesEnum.LIST);
    
  });
  
  it('should active grid style', () => {
    
    component.ngOnInit();
    
    const spyemitChange = jest.spyOn(component, 'emitChange');
    const spystateGridChanges = jest.spyOn(component.stateListChanges, 'emit');
    
    component.setGridState();

    expect(component.isGridState).toBeTruthy();
    expect(spyemitChange).toHaveBeenCalled();
    expect(spystateGridChanges).toHaveBeenCalledWith(ListStatesEnum.GRID);

  });

  it('should active list style reflects in template', () => {
    component.ngOnInit();

    component.setListState();
    
    const componentActive : DebugElement[] = fixture.debugElement.queryAll(By.css('.--active'));

    expect(componentActive).toHaveLength(1);
  });
  
});
