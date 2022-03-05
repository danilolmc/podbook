import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { FormFieldModule } from '@components/form-field/form-field.module';
import { TabModule } from '@components/tab/tab.module';
import { signInServiceStub } from '@mocks/services/signin-service/signin-service.mock';
import { SigninService } from '@services/signin/signin.service';
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let signInService: SigninService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [
        TabModule,
        FormFieldModule,
        RouterModule,
        RouterTestingModule
      ],
      providers: [
        { provide: SigninService, useValue: signInServiceStub },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    signInService = TestBed.inject(SigninService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prevent call signin service if credentials are invalid', () => {
    const spySignIn = jest.spyOn(signInService, 'signin');

    const event = new Event('submit');

    const HTMLInputElement = document.createElement('input');

    const formFields = [new FormFieldComponent(), new FormFieldComponent()];

    formFields.forEach(field => {
      field.fieldRef = new ElementRef<HTMLInputElement>(HTMLInputElement);
      field.input.setErrors({required: true});
    })

    component.submit(event, formFields);

    expect(spySignIn).not.toHaveBeenCalled();
  })

  it('should call signin service if credentials are valid', () => {
    const spySignIn = jest.spyOn(signInService, 'signin');

    const event = new Event('submit');
    const formFields = [new FormFieldComponent(), new FormFieldComponent()];

    component.submit(event, formFields);

    expect(spySignIn).toHaveBeenCalled();
  })

  it('should unsubscribe on ngOnDestroy hook', () => {

    const spyNext = jest.spyOn(component.unsubscriber, 'next');
    const spyComplete = jest.spyOn(component.unsubscriber, 'complete');

    component.ngOnDestroy()

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  })

});
