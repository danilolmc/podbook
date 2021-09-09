import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormFieldIconData, FormFieldProperties, formFieldTypes, IconProperties } from './types/FormField';
import { getIcon } from './utils/IconManager';
import { UniqueId } from './utils/UniqueId';

@Component({
  selector: 'pod-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements FormFieldProperties, OnInit {

  passowrdIsVisible = false;

  input : FormControl = {} as FormControl;

  @Input()
  id = UniqueId.getId();

  @Input()
  labelText = '';

  @Input()
  type: formFieldTypes = 'text';

  @Input()
  placeholder = '';

  @Input()
  required = false;

  ngOnInit(){ 

    const validators = [this.required ? Validators.required: ''];

    this.input = new FormControl(validators);
  }

  getFormFieldIcon(): IconProperties | undefined {
    const iconData = getIcon(this.type, FormFieldIconData);

    return iconData;
  }

  showHidePassword(event: Event){
    event.preventDefault();
    this.passowrdIsVisible = this.passowrdIsVisible ? false : true;
  }

  get passwordVisibilityIcon(){

    const passowrdObject = {
      active_icon: this.passowrdIsVisible ? 'password-hide-icon' : 'password-show-icon',
      type: this.passowrdIsVisible ? 'text' : 'password'
    }

    return passowrdObject;
  }

  inputChanges(){
    console.log(this.input.value)
  }
}
