import { FormFieldCommon } from "@typing/fieldsValidators/fieldsValidators";

export const validateFields = (fields: FormFieldCommon[]) => {

    const someFieldIsInvalid = fields.filter(field => field.input.invalid);

    if (!!someFieldIsInvalid.length) {
        someFieldIsInvalid[0].fieldRef.nativeElement.focus();
    };

    return !someFieldIsInvalid.length;
}

export const validateFile = (file: Blob | string) => {

    let isValid = false;

    if (file instanceof Blob) {

        isValid = file.size > 0;
    }

    if (file instanceof String) {

        isValid = file.length > 0;
    }

    return isValid;
}