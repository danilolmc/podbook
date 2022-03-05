import { FormFieldCommon } from "@typing/fieldsValidators/fieldsValidators";

export const validateFields = (fields: FormFieldCommon[]) => {

    const someFieldIsInvalid = fields.filter(field => field.input.invalid);

    if (!!someFieldIsInvalid.length) {
        someFieldIsInvalid[0].fieldRef.nativeElement.focus();
    };

    return !someFieldIsInvalid.length;
}



export const validateBlobFile = (file: Blob) =>  file.size > 0;


export const validateStringFile = (file: string) =>  file.length > 0;