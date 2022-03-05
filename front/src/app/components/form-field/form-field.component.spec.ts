import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from './form-field.component';
import * as Validators from './types/Validators';


describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup validators and valueChanges callback o NgOnInit', () => {
    const spySetValidators = jest.spyOn(component, 'setValidators');
    const spySetValueChanges = jest.spyOn(component, 'setValueChanges');

    component.ngOnInit()

    expect(spySetValidators).toHaveBeenCalled();
    expect(spySetValueChanges).toHaveBeenCalled();
  })

  it('should get Form Field Icon', () => {

    component.type = 'search';

    const formFieldIcon = component.getFormFieldIcon();

    expect(formFieldIcon).toStrictEqual({ key: 'search', icon: 'search-icon', name: 'search' })

  })

  it('should show and hide password', () => {
    component.passowrdIsVisible = false;

    const mouseEvent = new MouseEvent("click");

    component.showHidePassword(mouseEvent);

    expect(component.passowrdIsVisible).toBeTruthy()

    component.passowrdIsVisible = true;

    component.showHidePassword(mouseEvent);

    expect(component.passowrdIsVisible).toBeFalsy()

  })

  it('should get password visibility icon when is visible', () => {

    component.passowrdIsVisible = true;

    let passwordVisibilityIcon = component.passwordVisibilityIcon;

    const expectedPasswordHiddenIconObject = {
      active_icon: 'password-show-icon',
      type: 'text'
    }

    expect(passwordVisibilityIcon).toStrictEqual(expectedPasswordHiddenIconObject);

  })
  it('should get password visibility icon when is hidden', () => {

    component.passowrdIsVisible = false;

    let passwordVisibilityIcon = component.passwordVisibilityIcon;

    const expectedPasswordShownIconObject = {
      active_icon: 'password-hide-icon',
      type: 'password'
    }

    expect(passwordVisibilityIcon).toStrictEqual(expectedPasswordShownIconObject);

  })

  it('should set input validations when theres no validations', () => {

    component.validations = [{
      validationName: '',
      validationErrorMessage: '',
      validatorRequiredParameter: true
    }];

    component.value = 'test';

    component.setValidators();

    expect(component.input).toBeDefined();
    expect(component.value).toBe('test');

  })

  it('should throw when not find validator', () => {

    const spyTetValidators = jest.spyOn(component, 'setValidators');
    jest.spyOn(Validators, 'getValidations').mockImplementation(() => []);

    component.setValidators();

    expect(spyTetValidators).toThrowError();
  })

  it('should ngOnDestroy call subject', () => {
    const spyNext = jest.spyOn(component.notifier, 'next');
    const spyComplete = jest.spyOn(component.notifier, 'complete');

    component.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  })

  it('should emit new value when input value changes', async () => {

    const spyEmmiter = jest.spyOn(component.change, 'emit');

    const inputComponent = component.fieldRef.nativeElement;

    inputComponent.value = 'value';
    inputComponent.dispatchEvent(new Event('input'));

    await fixture.whenStable();

    expect(spyEmmiter).toHaveBeenCalled();
    expect(component.input.value).toBe('value');

  });

  it('should update formfield properties when input value changes', async () => {

    component.validationCurrentErrorMessage = 'oldMessage';

    const spySetValidationMessage = jest.spyOn(component, 'setValidationMessage').mockImplementation(() => { });
    const inputComponent = component.fieldRef.nativeElement;

    inputComponent.value = 'value';
    inputComponent.dispatchEvent(new Event('input'));

    await fixture.whenStable();

    expect(component.input.value).toBe('value');
    expect(component.validationCurrentErrorMessage).toBe('');
    expect(spySetValidationMessage).toHaveBeenCalled();

  });


  it('should define current error message when field are invalid', () => {
    const validations: Validators.Validations[] = [{
      validationName: 'required',
      validatorRequiredParameter: '',
      validationErrorMessage: 'Campo obrigatório',
    }];

    component.validations = validations;

    component.input.setValue(' ');

    component.setValidationMessage();

    expect(component.validationCurrentErrorMessage).toBe(validations[0].validationErrorMessage)
  })

  it('should current error message to be empty when field are valid', () => {
    const validations: Validators.Validations[] = [{
      validationName: 'required',
      validatorRequiredParameter: '',
      validationErrorMessage: 'Campo obrigatório',
    }];

    component.validations = validations;

    component.input.setValue(' value');

    component.setValidationMessage();

    expect(component.validationCurrentErrorMessage).toBe('')
  })
});
