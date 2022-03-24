import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CardsContainerModule } from '@components/cards-container/cards-container.module';
import { PodbookCommonService } from '@services/common/common.service';
import { SignupService } from '@services/signup/signup.service';
import { AbstractStudioService, StudioService } from '@services/studio/studio.service';
import { PaginationMetadata } from '@typing/pagination/pagination';
import { of, throwError } from 'rxjs';
import { PaginatedPodbookResponse, PodbookResponse } from '../types/studioPage';
import { MyPodbooksComponent } from './my-podbooks.component';


describe('MyPodbooksComponent', () => {
  let component: MyPodbooksComponent;
  let fixture: ComponentFixture<MyPodbooksComponent>;
  let signUpService: StudioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyPodbooksComponent],
      imports: [
        CardsContainerModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        PodbookCommonService,
        { provide: AbstractStudioService, useExisting: StudioService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPodbooksComponent);
    signUpService = TestBed.inject(StudioService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve podbooks list with requestParams settings', () => {

    const { limit, page } = component.requestParams;

    const paginatedPodbookList: PaginatedPodbookResponse = {
      data: [{} as PodbookResponse],
      paginationMetadata: { limit, page } as PaginationMetadata
    };

    const spyGetMyPodbooks = jest.spyOn(signUpService, 'getMyPodbooks')
      .mockReturnValueOnce(of(paginatedPodbookList));

    component.ngOnInit();

    expect(component.my_cards.length).toBeGreaterThan(0);
    expect(spyGetMyPodbooks).toHaveBeenCalledWith(component.requestParams);
    expect(component.paginationMetadata.page).toBeDefined();

  });

  it('should retrieve empty podbooks list with requestParams settings', () => {

    const { limit, page } = component.requestParams;

    const paginatedPodbookList: PaginatedPodbookResponse = {
      data: [],
      paginationMetadata: { limit, page } as PaginationMetadata
    };

    const spyGetMyPodbooks = jest.spyOn(signUpService, 'getMyPodbooks')
      .mockReturnValueOnce(of(paginatedPodbookList));

    component.ngOnInit();

    expect(component.my_cards.length).toBe(0);
    expect(spyGetMyPodbooks).toHaveBeenCalledWith(component.requestParams);
    expect(component.paginationMetadata.page).not.toBeDefined();

  });

  it('should define cards list as empty array when request return with error', () => {

    const spyGetMyPodbooks = jest.spyOn(signUpService, 'getMyPodbooks')
      .mockReturnValueOnce(throwError({}));

    component.ngOnInit();

    expect(component.my_cards.length).toBe(0);
    expect(spyGetMyPodbooks).toHaveBeenCalledWith(component.requestParams);
  });
});
