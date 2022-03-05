import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { FormFieldModule } from '@components/form-field/form-field.module';
import { TabModule } from '@components/tab/tab.module';
import * as Validators from '@core/validation/validation.utils';
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

  it('should disable valid step', () => {
    component.currentStep = 1;

    component.steps[component.currentStep].active = true;

    component.disableStep(component.currentStep);

    expect(component.steps[0].active).toBeFalsy();
  })

  it('should return message when try disabled missing step', () => {
    component.currentStep = 3;

    const message = component.disableStep(component.currentStep);

    expect(message).toBe(component.stepMissingMessage);

  })

  it('should active valid step', () => {
    component.currentStep = 1;

    component.steps[component.currentStep].active = false;

    component.activeStep(component.currentStep);

    expect(component.steps[0].active).toBeTruthy();
  })

  it('should return message when try active missing step', () => {
    component.currentStep = 3

    const message = component.activeStep(component.currentStep);

    expect(message).toBe(component.stepMissingMessage);

  })

  it('should finish current step', () => {
    component.currentStep = 1

    component.finishCurrentStep(component.currentStep);

    expect(component.steps[0].finished).toBeTruthy();
  })

  it('should return message finish when try finish missing step', () => {
    component.currentStep = 3

    const message = component.finishCurrentStep(component.currentStep);

    expect(message).toBe(component.stepMissingMessage);

  })

  it('should unsubscribe on ngOnDestroy hook', () => {

    const spyNext = jest.spyOn(component.unsubscriber, 'next');
    const spyComplete = jest.spyOn(component.unsubscriber, 'complete');

    component.ngOnDestroy()

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  })

  it('should validate before go to next step', () => {
    const spyValidateFields = jest.spyOn(Validators, 'validateFields');

    const name: FormFieldComponent = fixture.debugElement.query(By.css('.name')).componentInstance;
    name.input.setValue('test')

    const email: FormFieldComponent = fixture.debugElement.query(By.css('.email')).componentInstance;
    email.input.setValue('test@gmail.com');

    component.validateBeforeGoToNextStep(new MouseEvent('click'), [name, email]);

    expect(spyValidateFields).toHaveBeenCalledWith([name, email])
  });


  it('should store mismatch message when passwords do not match', () => {
    component.checkPasswordMatch('12345678','12346777');

    expect(component.formErrorMessage).toBe('As senhas estão diferentes');
  })

  it('should store empty value message when passwords matches', () => {
    component.checkPasswordMatch('12345678','12345678');

    expect(component.formErrorMessage).toBe('');
  })

  it('should store empty value message when passwords matches but its length is lower than 8', () => {
    component.checkPasswordMatch('1234567','1234567');

    expect(component.formErrorMessage).toBe('');
  })

  it('should active step on ngOnInit when current step is already defined', () => {


    const spyActivetep = jest.spyOn(component, 'activeStep');

    component.currentStep = 1;

    component.ngOnInit();

    expect(spyActivetep).toHaveBeenCalledWith(component.currentStep);
  })

  it('should active and finish all previous steps when already exists a current step defined', () => {

    component.currentStep = 2;

    component.ngOnInit();

    const previousSteps = component.steps.filter(step => step.active && step.finished);

    expect(previousSteps.length).toBe(component.steps.length - 1);
  })
});
