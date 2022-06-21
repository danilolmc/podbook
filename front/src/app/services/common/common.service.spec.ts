import { TestBed } from '@angular/core/testing';
import { PodbookCommonService } from './common.service';


describe('PodbookCommonService', () => {
  let service: PodbookCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PodbookCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return podbook on given pattern', () => {
    
  })
});


