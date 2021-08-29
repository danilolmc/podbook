import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPodbooksComponent } from './my-podbooks.component';

describe('MyPodbooksComponent', () => {
  let component: MyPodbooksComponent;
  let fixture: ComponentFixture<MyPodbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPodbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPodbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
