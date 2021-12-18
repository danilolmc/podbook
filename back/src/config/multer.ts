import multer, { Options } from "multer";
import path from "path";
import crypto from 'crypto';

export const multerConfig: Options = {
    dest: path.resolve(__dirname, '..', '..', 'files', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, callback: Function) => {
            callback(null, path.resolve(__dirname, '..', '..', 'files', 'uploads'))
        },
        filename: (req, file, callback: Function) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) callback(err);

                const fileNameStart = !!req.body.user_id ? req.body.user_id + '-' : '';

                const fileName = `${fileNameStart + hash.toString('hex') + '-' + file.originalname}`

                callback(null, fileName);
            })
        }
    }),
    fileFilter: (req, file, callback: Function) => {

        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'audio/mp3'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Invalid file type'));
        }
    }
}
