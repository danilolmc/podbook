import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { FormFieldModule } from '@components/form-field/form-field.module';
import { TabModule } from '@components/tab/tab.module';
import { SignupService } from '@services/signup/signup.service';
import { SignUpComponent } from './sign-up.component';

const signUpServiceStub = {
  signup: jest.fn()
}

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
      ],
      providers: [{ provide: SignupService, useValue: signUpServiceStub }]
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

    const validateBeforeGoToNextStep = jest.spyOn(component, 'validateBeforeGoToNextStep');

    const name: FormFieldComponent = fixture.debugElement.query(By.css('.name')).componentInstance;
    name.input.setValue('test')

    const email: FormFieldComponent = fixture.debugElement.query(By.css('.email')).componentInstance;
    email.input.setValue('test@gmail.com');

    component.nextStep(new MouseEvent('click'), [name, email]);

    fixture.detectChanges();

    expect(component.currentStep).toBe(2);
    expect(component.formValues).toMatchObject({ name: 'test', email: 'test@gmail.com' });
    expect(component.steps[1].active).toBeTruthy();
    expect(validateBeforeGoToNextStep).toHaveBeenCalledWith(new MouseEvent('click'), [name, email]);
  })

  it('should not go to next step when namme and email is invalid', () => {
    component.currentStep = 1;

    const name: FormFieldComponent = fixture.debugElement.query(By.css('.name')).componentInstance;
    name.input.setValue('')

    const email: FormFieldComponent = fixture.debugElement.query(By.css('.email')).componentInstance;
    email.input.setValue('test');

    component.nextStep(new MouseEvent('click'), [name, email]);

    expect(component.currentStep).toBe(1);
    expect(component.steps[0].active).toBeTruthy();
  });


  it('should return to first step', () => {
    component.currentStep = 2;

    component.prevStep(new MouseEvent('click'));

    expect(component.currentStep).toBe(1);
    expect(component.steps[0].active).toBeTruthy();
    expect(component.steps[1].active).toBeFalsy();

  })
});
