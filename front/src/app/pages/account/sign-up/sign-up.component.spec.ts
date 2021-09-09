import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormFieldModule } from '@components/form-field/form-field.module';
import { TabModule } from '@components/tab/tab.module';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        TabModule,
        FormFieldModule,
        RouterTestingModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to second step', () => {
    component.currentStep = 1;

    component.nextStep(new MouseEvent('click'));

    expect(component.currentStep).toBe(2);
    expect(component.steps[1].active).toBeTruthy();

  })

  
  it('should return to first step', () => {
    component.currentStep = 2;

    component.prevStep(new MouseEvent('click'));

    expect(component.currentStep).toBe(1);
    expect(component.steps[0].active).toBeTruthy();
    expect(component.steps[1].active).toBeFalsy();

  })
});
