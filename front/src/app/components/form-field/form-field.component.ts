import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { FormFieldIconData, FormFieldProperties, formFieldTypes, IconProperties } from './types/FormField';
import { checkNoWhiteSpaceValidation, getValidations, Validations } from './types/Validators';
import { getIcon } from './utils/IconManager';
import { UniqueId } from './utils/UniqueId';

@Component({
  selector: 'pod-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements FormFieldProperties, OnInit, OnDestroy {

  @Output() change = new EventEmitter<string>();
  @ViewChild('inputRef') fieldRef!: ElementRef<HTMLInputElement>;

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
  value = '';

  @Input()
  validations: Validations[] = [{
    validationName: '',
    validatorRequiredParameter: '',
    validationErrorMessage: '',
  }];


  validationCurrentErrorMessage = '';

  ngOnInit() {

    const validators = getValidations(
      this.validations.map(keyItem =>
      ({
        key: keyItem.validationName,
        parameter: keyItem.validatorRequiredParameter
      })
      ));

    if (!!validators) {

      this.input = new FormControl(this.value, validators);

    } else {

      this.validations.forEach(key => {
        throw new Error(`key ${key} not found in formValidations`);
      })


    }

    this.input
      .valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        takeUntil(this.notifier))
      .subscribe((value: string) => {

        this.validationCurrentErrorMessage = '';

        this.change.emit(value);

        this.value = value;

        this.validations.map(item => {

          if (item.validationName === 'required') checkNoWhiteSpaceValidation(value, this.input)
        });

        const message = this.validations.filter(validation => this.input.errors?.hasOwnProperty(validation.validationName.toLowerCase()))

        if (!message.length) return;

        this.validationCurrentErrorMessage = message[0].validationErrorMessage;

      });
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

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
