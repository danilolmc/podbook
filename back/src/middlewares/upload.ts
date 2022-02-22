import { Response } from "express";
import multer from "multer";
import { multerConfig } from "../config/multer";
import { PodbookModel } from "../model/PodbookModel";


export const fileUpload = multer(multerConfig).fields([
    { name: 'bannerImage' },
    { name: 'audio' }
]);

const lookFormMissingField = (targetObj: any, fields: string[]) => {

    let missingField = ''
    
    const obj = Object.assign({}, targetObj);

    fields.map((lookedFile: string) => {

        if (!obj.hasOwnProperty(lookedFile) || !obj[lookedFile]) {
            missingField = lookedFile;
        }
    });

    return missingField;
}


export const afterUpload = (req: any, res: Response, next: Function) => {

    const filesRequired = ['bannerImage', 'audio'];
    const fieldsRequired = ['bannerTitle', 'description', 'category', 'user_id'];

    const files = Object.fromEntries(
        Object.entries(req.files)
            .map(([key, value]: any[]) => [key, value[0]]));


    let fileMissing = lookFormMissingField(<Object>files, filesRequired);
    let fieldMissing = lookFormMissingField(<Object>req.body, fieldsRequired);

    if (!!fileMissing) {

        res.status(400).send({ message: `Missing ${fileMissing} file` })
        return;
    }

    if (!!fieldMissing) {
        res.status(400).send({ message: `Missing ${fieldMissing} field` });
        return;
    }

    const podbook: PodbookModel = {
        bannerImage: files.bannerImage.filename,
        bannerTitle: req.body.bannerTitle,
        category: req.body.category,
        audio: files.audio.filename,
        description: req.body.description
    }

    req.body = podbook

    next();

}