import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { FormFieldComponent } from './form-field.component';
import { IconProperties } from './types/FormField';

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

  it('should get password visibility icon', () => {
    
    component.passowrdIsVisible = false;

    let passwordVisibilityIcon = component.passwordVisibilityIcon;

    const expectedPasswordShownIconObject = {
      active_icon: 'password-show-icon',
      type: 'password'
    }

    expect(passwordVisibilityIcon).toStrictEqual(expectedPasswordShownIconObject);

    component.passowrdIsVisible = true;

    passwordVisibilityIcon = component.passwordVisibilityIcon;

    const expectedPasswordHiddenIconObject = {
      active_icon: 'password-hide-icon',
      type: 'text'
    }

    expect(passwordVisibilityIcon).toStrictEqual(expectedPasswordHiddenIconObject);

  })
});
