import { ValidationErrors, Validators } from "@angular/forms";
import { UniqueId } from "../utils/UniqueId";

export type formFieldTypes =
    'text' |
    'textarea' |
    'search' |
    'password' |
    'email';

export abstract class FormFieldProperties {

    id = UniqueId.getId();
    labelText = '';
    type: formFieldTypes = 'text';
    placeholder = '';

    abstract getFormFieldIcon(iconName: string): IconProperties | undefined;

}

export interface IconProperties {

    key: string;
    icon: string;
    name: string;

}

export const FormFieldIconData: IconProperties[] = [
    { key: 'search', icon: 'search-icon', name: 'search' },
];