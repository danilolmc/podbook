import { HttpResponse } from '@angular/common/http';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { FormFieldModule } from '@components/form-field/form-field.module';
import { TabModule } from '@components/tab/tab.module';
import { signInServiceStub } from '@mocks/services/signin-service/signin-service.mock';
import { RouterStub } from '@mocks/shared/router.mocks';
import { SigninService } from '@services/signin/signin.service';
import { of, throwError } from 'rxjs';
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let signInService: SigninService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [
        TabModule,
        FormFieldModule,
      ],
      providers: [
        { provide: SigninService, useValue: signInServiceStub },
        { provide: Router, useValue: RouterStub },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    signInService = TestBed.inject(SigninService);
    router = TestBed.inject(Router);
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
      field.input.setErrors({ required: true });
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

  it('should redirect to podbooks user page after signing with success', fakeAsync(() => {

    const spyNavigate = jest.spyOn(router, 'navigate');
    const mockResponse = { body: { authenticated: true } };

    jest.spyOn(signInService, 'signin').mockReturnValueOnce(of(new HttpResponse(mockResponse)));

    const event = new Event('submit');
    const formFields = [new FormFieldComponent(), new FormFieldComponent()];

    component.submit(event, formFields);

    tick();

    expect(spyNavigate).toHaveBeenCalledWith(['/podbooks']);

  }));

  it('should not redirect to podbooks user page if signing not authenticate user', fakeAsync(() => {

    const spyNavigate = jest.spyOn(router, 'navigate');
    const mockResponse = { body: { authenticated: false } };

    jest.spyOn(signInService, 'signin').mockReturnValueOnce(of(new HttpResponse(mockResponse)));

    const event = new Event('submit');
    const formFields = [new FormFieldComponent(), new FormFieldComponent()];

    component.submit(event, formFields);

    tick();

    expect(spyNavigate).not.toHaveBeenCalled();

  }));

  it('should set auth error message when signin operation return with error', fakeAsync(() => {

    const spyNavigate = jest.spyOn(router, 'navigate');
    jest.spyOn(signInService, 'signin').mockReturnValueOnce(throwError({ error: { message: 'error' } }));

    const event = new Event('submit');
    const formFields = [new FormFieldComponent(), new FormFieldComponent()];

    component.submit(event, formFields);

    tick();

    expect(spyNavigate).not.toHaveBeenCalled();
    expect(component.authenticationErrorMessage).toBe('error');

  }));

  it('should unsubscribe on ngOnDestroy hook', () => {

    const spyNext = jest.spyOn(component.unsubscriber, 'next');
    const spyComplete = jest.spyOn(component.unsubscriber, 'complete');

    component.ngOnDestroy()

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  })

});
