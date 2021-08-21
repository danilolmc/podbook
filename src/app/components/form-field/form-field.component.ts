import { Component, Input } from '@angular/core';
import { FormFieldIconData, FormFieldProperties, formFieldTypes, IconProperties } from './types/FormField';
import { getIcon } from './utils/IconManager';
import { UniqueId } from './utils/UniqueId';

@Component({
  selector: 'pod-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements FormFieldProperties {

  @Input()
  id = UniqueId.getId();

  @Input()
  labelText = '';

  @Input()
  type: formFieldTypes = 'text';
  
  @Input()
  placeholder = '';

  getFormFieldIcon(): IconProperties | undefined {
    const iconData = getIcon(this.type, FormFieldIconData);

    return iconData;
  }

}
