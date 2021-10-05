import { ValidatorFn, Validators } from "@angular/forms";

const formValidations: {
    [key: string]: ValidatorFn,
} = {
    email: Validators.email,
    required: Validators.required
}

export const getValidations = (keys?: string[]) => {

    let validators: ValidatorFn[] = [];

    if (!keys) return null;

    keys.forEach(key => {

        if(formValidations.hasOwnProperty(key)) validators = [...validators, formValidations[key]];
    })

    return validators;
}

export interface Validations {
    validationName: string,
    validationErrorMessage: string
}