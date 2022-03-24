import { HttpResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { FormFieldModule } from '@components/form-field/form-field.module';
import { TabModule } from '@components/tab/tab.module';
import * as Validators from '@core/validation/validation.utils';
import { signUpServiceStub } from '@mocks/services/signup-service/signup-service.mock';
import { RouterStub } from '@mocks/shared/router.mocks';
import { SignupService } from '@services/signup/signup.service';
import { SignupResponseData } from '@services/signup/types/signup.service.types';
import { of, throwError } from 'rxjs';
import { SignUpComponent } from './sign-up.component';


describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let router: Router;
  let signupService: SignupService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        TabModule,
        FormFieldModule,
      ],
      providers: [
        { provide: SignupService, useValue: signUpServiceStub },
        { provide: Router, useValue: RouterStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    router = TestBed.inject(Router);
    signupService = TestBed.inject(SignupService);

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

    component.nextStep([name, email]);

    fixture.detectChanges();

    expect(component.currentStep).toBe(2);
    expect(component.formValues).toMatchObject({ name: 'test', email: 'test@gmail.com' });
    expect(component.steps[1].active).toBeTruthy();
    expect(validateBeforeGoToNextStep).toHaveBeenCalledWith([name, email]);
  })


  it('should not go to next step when namme and email is invalid', () => {
    component.currentStep = 1;

    const name: FormFieldComponent = fixture.debugElement.query(By.css('.name')).componentInstance;
    name.input.setValue('')

    const email: FormFieldComponent = fixture.debugElement.query(By.css('.email')).componentInstance;
    email.input.setValue('test');

    component.nextStep([name, email]);

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

    component.validateBeforeGoToNextStep([name, email]);

    expect(spyValidateFields).toHaveBeenCalledWith([name, email])
  });


  it('should store mismatch message when passwords do not match', () => {
    component.checkPasswordMatch('12345678', '12346777');

    expect(component.formErrorMessage).toBe('As senhas estão diferentes');
  })

  it('should store empty value message when passwords matches', () => {
    component.checkPasswordMatch('12345678', '12345678');

    expect(component.formErrorMessage).toBe('');
  })

  it('should store empty value message when passwords matches but its length is lower than 8', () => {
    component.checkPasswordMatch('1234567', '1234567');

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

  it('should redirect to user podbooks page after user signup with success', fakeAsync(() => {

    const spyNavigate = jest.spyOn(router, 'navigate');
    const response = of(new HttpResponse<SignupResponseData>(
      {
        body: {
          auth: true,
          content: {},
          headers: {},
          token: '',
          user: { email: '', id: 0, name: '' }
        }
      }));

    jest.spyOn(signupService, 'signup').mockReturnValueOnce(response);

    component.formValues = {
      name: 'test',
      email: 'test@test.com',
      password: '',
      repeatedPassword: ''
    };

    const event = new Event('submit');

    const passwordFields = [new FormFieldComponent(), new FormFieldComponent()];

    passwordFields.map(field => field.value = 'test1234567');

    component.submit(event, passwordFields);

    tick();

    expect(spyNavigate).toHaveBeenCalledWith(['/podbooks'])
  }))

  it('should not redirect to user podbooks page when signup not authenticate user', fakeAsync(() => {

    const spyNavigate = jest.spyOn(router, 'navigate');
    const response = of(new HttpResponse<SignupResponseData>(
      {
        body: {
          auth: false,
          content: {},
          headers: {},
          token: '',
          user: { email: '', id: 0, name: '' }
        }
      }));

    jest.spyOn(signupService, 'signup').mockReturnValueOnce(response);

    component.formValues = {
      name: 'test',
      email: 'test@test.com',
      password: '',
      repeatedPassword: ''
    };

    const event = new Event('submit');

    const passwordFields = [new FormFieldComponent(), new FormFieldComponent()];

    passwordFields.map(field => field.value = 'test1234567');

    component.submit(event, passwordFields);

    fixture.detectChanges();

    tick();

    expect(spyNavigate).not.toHaveBeenCalledWith(['/podbooks'])
  }));


  it('should set form error message when signup operation return with error', fakeAsync(() => {

    const spyNavigate = jest.spyOn(router, 'navigate');

    jest.spyOn(signupService, 'signup').mockReturnValueOnce(throwError({ error: { message: 'form error' } }));

    component.formValues = {
      name: 'test',
      email: 'test@test.com',
      password: '',
      repeatedPassword: ''
    };

    const event = new Event('submit');

    const passwordFields = [new FormFieldComponent(), new FormFieldComponent()]

    passwordFields.map(field => field.value = 'test12345678');

    component.submit(event, passwordFields);

    fixture.detectChanges();

    tick();

    expect(spyNavigate).not.toHaveBeenCalledWith(['/podbooks'])
    expect(component.formErrorMessage).toBe('form error');
  }));

  it('should unsubscribe on ngOnDestroy hook', () => {

    const spyNext = jest.spyOn(component.unsubscriber, 'next');
    const spyComplete = jest.spyOn(component.unsubscriber, 'complete');

    component.ngOnDestroy()

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  })


});
