import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabItemComponent } from './tab-item/tab-item.component';

import { TabComponent } from './tab.component';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabComponent ]
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

  it('should select a tab', () => {

    const myTab = new TabItemComponent()

    component.selectTab(myTab);

    expect(myTab.selected).toBeTruthy();
  });
});
