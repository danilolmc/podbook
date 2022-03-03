import { validateFile } from "./validation.utils";

describe('ValidationUtils', () => {

    it('should validate audio string', () => {

        const file = 'fileName.jpg';

        const fileIsValid = validateFile(file);
        
        expect(fileIsValid).toBeTruthy();
    });

    it('should return invalid audio string status', () => {

        const file = '';

        const fileIsValid = validateFile(file);
        
        expect(fileIsValid).toBeFalsy();
    });
});
