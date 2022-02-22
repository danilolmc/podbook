import { FormFieldCommon } from "@typing/fieldsValidators/fieldsValidators";

export const validateFields = (fields: FormFieldCommon[]) => {

    const someFieldIsInvalid = fields.filter(field => field.input.invalid);

    if (!!someFieldIsInvalid.length) { 
        someFieldIsInvalid[0].fieldRef.nativeElement.focus();
     };

    return !someFieldIsInvalid.length;
}

export const validateFile = (file: Blob | string) => {
    
    if(file instanceof Blob){
        
        return file.size > 0;
    }
    
    if(file as any instanceof String){

        return file.length > 0;
    }

    return;
}