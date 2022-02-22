import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from '@components/card/card.module';
import { FormFieldModule } from '@components/form-field/form-field.module';
import { StyleListModule } from '@components/style-list/style-list.module';
import { ListStatesEnum } from '@enums/styleListComponent/ListStateEnum';
import { StyleListStratergy } from '@stratergy/StyleList/styleListStratergy';

import { CardsContainerComponent } from './cards-container.component';

describe('CardsContainerComponent', () => {
  let component: CardsContainerComponent;
  let fixture: ComponentFixture<CardsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsContainerComponent],
      imports: [StyleListModule, FormFieldModule, CardModule, BrowserAnimationsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.getlistStyle()).toBe(StyleListStratergy.grid);
    expect(component).toBeTruthy();
  });

  it('should get current list style as GRID', () => {
    component.listStyle = ListStatesEnum.GRID;

    const listStyle = component.getlistStyle();

    expect(listStyle).toBe(StyleListStratergy.grid);
  })
  
  it('should get current list style as LIST', () => {
    component.listStyle = ListStatesEnum.LIST;
    
    const listStyle = component.getlistStyle();
    
    expect(listStyle).toBe(StyleListStratergy.list);
  })
});
