import { type } from "os";
import { validateBlobFile, validateStringFile } from "./validation.utils";

describe('ValidationUtils', () => {

    it('should audio string length greather than zero to be valid', () => {

        const file = 'fileName.jpg';

        const fileIsValid = validateStringFile(file);
        
        expect(fileIsValid).toBeTruthy();
    });

    it('should audio string length equal zero to be invalid', () => {

        const file = '';

        const fileIsValid = validateStringFile(file);
        
        expect(fileIsValid).toBeFalsy();
    });

    it('should audio blob with size greather than zero to be valid', () => {

        const file = new Blob(['myfileblob'], {type: 'audio/webm'});
        
        const fileIsValid = validateBlobFile(file);
        
        expect(fileIsValid).toBeTruthy();
    });

    it('should audio blob with size equals zero to be invalid', () => {

        const file = new Blob([], {type: 'audio/webm'});
        
        const fileIsValid = validateBlobFile(file);
        
        expect(fileIsValid).toBeFalsy();
    });
});
