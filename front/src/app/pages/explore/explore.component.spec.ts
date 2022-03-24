import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ListStatesEnum } from '@enums/styleListComponent/ListStateEnum';
import { ExploreServiceStub } from '@mocks/services/explore-service/explore-service.mock';
import { PaginatedPodbookResponse, Podbook, PodbookResponse } from '@pages/studio/types/studioPage';
import { PodbookCommonService } from '@services/common/common.service';
import { ExploreService } from '@services/explore/explore.service';
import { PaginationMetadata } from '@typing/pagination/pagination';
import { of } from 'rxjs';

import { ExploreComponent } from './explore.component';

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;
  let exploreService: ExploreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ExploreService,
          useClass: ExploreServiceStub
        },
        PodbookCommonService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreComponent);
    exploreService = TestBed.inject(ExploreService);
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

  it('should define initial requestParams to page 1 and limit 8', () => {

    const requestParams = {
      page: 1,
      limit: 8
    }

    expect(component.requestParams).toEqual(requestParams)
  })

  it('should retrieve podbooks list with request params settings', () => {

    const podbookResponseExample: PaginatedPodbookResponse = {
      data: [{} as PodbookResponse],
      paginationMetadata: {} as PaginationMetadata
    }

    const spyGetPodbooks = jest
      .spyOn(exploreService, 'getPodbooks')
      .mockReturnValue(of(podbookResponseExample));

    component.ngOnInit();

    expect(spyGetPodbooks).toHaveBeenCalledWith(component.requestParams);
    expect(component.exploreCards.length).toBeGreaterThan(0);
  });

  it('should retrieve empty podbooks list with request params settings', () => {

    const podbookResponseEmpyExample: PaginatedPodbookResponse = {
      data: [],
      paginationMetadata: {} as PaginationMetadata
    }

    const spyGetPodbooks = jest
      .spyOn(exploreService, 'getPodbooks')
      .mockReturnValue(of(podbookResponseEmpyExample));

    component.ngOnInit();

    expect(spyGetPodbooks).toHaveBeenCalledWith(component.requestParams);
    expect(component.exploreCards.length).toBe(0);
  });

});
