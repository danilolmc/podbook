import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, last, switchMap, take, takeLast, takeUntil } from 'rxjs/operators';
import { FormFieldIconData, FormFieldProperties, formFieldTypes, IconProperties } from './types/FormField';
import { getValidations, Validations } from './types/Validators';
import { getIcon } from './utils/IconManager';
import { UniqueId } from './utils/UniqueId';

@Component({
  selector: 'pod-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements FormFieldProperties, OnInit, OnDestroy {

  passowrdIsVisible = false;

  input: FormControl = {} as FormControl;

  notifier = new Subject();

  @Input()
  id = UniqueId.getId();

  @Input()
  labelText = '';

  @Input()
  type: formFieldTypes = 'text';

  @Input()
  placeholder = '';

  @Input()
  validations: Validations[] = [{
    validationName: '',
    validationErrorMessage: ''
  }];


  validationCurrentErrorMessage = '';

  ngOnInit() {

    const validators = getValidations(this.validations.map(key => key.validationName));

    if (!!validators) {

      this.input = new FormControl(null, validators);
    }

    this.input
      .valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(value => [value]),
        takeUntil(this.notifier))
      .subscribe(() => {

        const message = this.validations.filter(validation => this.input.errors?.hasOwnProperty(validation.validationName))

        if (!message.length) return;

        this.validationCurrentErrorMessage = message[0].validationErrorMessage;
      })



  }


  getFormFieldIcon(): IconProperties | undefined {
    const iconData = getIcon(this.type, FormFieldIconData);

    return iconData;
  }

  showHidePassword(event: Event) {
    event.preventDefault();
    this.passowrdIsVisible = this.passowrdIsVisible ? false : true;
  }

  get passwordVisibilityIcon() {

    const passowrdObject = {
      active_icon: this.passowrdIsVisible ? 'password-hide-icon' : 'password-show-icon',
      type: this.passowrdIsVisible ? 'text' : 'password'
    }

    return passowrdObject;
  }

  inputChanges() {
    console.log(this.input.value)
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
