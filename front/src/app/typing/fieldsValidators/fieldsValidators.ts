import { ElementRef, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";

export interface FieldsValidators {
    [key: string]: {
        validationName: string,
        validatorRequiredParameter?: string | number,
        validationErrorMessage: string
    }[]
}

export interface FormFieldCommon {

    fieldRef: ElementRef;
    change: typeof EventEmitter;
    input: FormControl;
    labelText: string;
    id: string;
    placeholder: string;
    value: string;
}