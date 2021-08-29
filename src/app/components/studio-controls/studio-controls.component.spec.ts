import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioControlsComponent } from './studio-controls.component';

describe('StudioControlsComponent', () => {
  let component: StudioControlsComponent;
  let fixture: ComponentFixture<StudioControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudioControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
