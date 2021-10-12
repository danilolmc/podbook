import { FormControl, ValidatorFn, Validators } from "@angular/forms";

const validationFunctions = ['minLength'];

const formValidations: {
    [key: string]: ValidatorFn | Function,
} = {
    email: Validators.email,
    required: Validators.required,
    minLength: (length: number) => Validators.minLength(length)
}

export const checkNoWhiteSpaceValidation = (value: string, input: FormControl) => {

    const validationWithNoSpace = value.replace(/^\s*|\s*$/g, '').length === 0 || input.getError('required');

    if (validationWithNoSpace) {
      input.setErrors({ required: true })};
}

export const getValidations = (keys?: { key: string, parameter: any }[]) => {

    let validators: ValidatorFn[] = [];

    if (!keys) return null;

    keys.forEach(({ key, parameter }) => {

        const isValidationFuncion = validationFunctions.includes(key);

        let validationItem;

        if (isValidationFuncion) {
            validationItem = formValidations[key](parameter)
        } else {
            validationItem = formValidations[key]
        }

        if (formValidations.hasOwnProperty(key)) validators = [...validators, validationItem];
    })

    return validators;
}

export interface Validations {
    validationName: string,
    validatorRequiredParameter?: any,
    validationErrorMessage: string
}