import { QueryList } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TabItemComponent } from './tab-item/tab-item.component';

import { TabComponent } from './tab.component';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setInitialState', () => {

    const spysetInitialState = jest.spyOn(component, 'setInitialState');

    component.ngAfterContentInit();

    expect(spysetInitialState).toBeCalled();
  });

  it('should set initialState after view init', () => {

    const spysetInitialState = jest.spyOn(component, 'setInitialState');

    component.ngAfterContentInit();

    expect(spysetInitialState).toHaveBeenCalled();
  });

  it('should select a tab', () => {

    const tabItem = new TabItemComponent();
    tabItem.selectItem = false;

    component.selectTab(tabItem);

    fixture.detectChanges();

    expect(tabItem.selected).toBeTruthy();
  })

  it('should set initial state when there\'s not selected tab', () => {

    const setInitialStateSpy = jest.spyOn(component, 'setInitialState');

    component.setInitialState();

    fixture.detectChanges();

    const thersItemActive = component.tabs.toArray().some(item => item.selected === true);

    expect(thersItemActive).toBeFalsy();
    expect(setInitialStateSpy).toHaveBeenCalled();
  })

});
