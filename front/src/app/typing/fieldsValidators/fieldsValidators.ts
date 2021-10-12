
export interface FieldsValidators{
    [key: string]: {
        validationName: string,
        validatorRequiredParameter?: string | number,
        validationErrorMessage: string
    }[]
}