import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListStatesEnum } from '@enums/styleListComponent/ListStateEnum';
import { PodbookCommonService } from '@services/common/common.service';
import { HomeService } from '@services/home/home.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [HomeService, PodbookCommonService],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should change style list to grid', () => {
    component.changeStyleList(ListStatesEnum.GRID);
    expect(component.listStyle).toBe(ListStatesEnum.GRID)
  })

  it('should change style list to list', () => {
    component.changeStyleList(ListStatesEnum.LIST);
    expect(component.listStyle).toBe(ListStatesEnum.LIST)
  })
});
