import { HttpResponseResolver } from 'msw';
import { badRequest, ok } from '../utils/http-utils';
import CryptoTS from 'crypto-ts';

// Define the type for data and secretKey as `string`
export const encryptData = (data: object, secretKey: string): string => {
    const jsonString = JSON.stringify(data); // Convert JSON to string
    const encrypted = CryptoTS.AES.encrypt(jsonString, secretKey).toString();
    return encrypted;
};

// Define the type for cipherText and secretKey as `string`, and the return type as `object`
export const decryptData = (cipherText: string, secretKey: string): object => {
    const bytes = CryptoTS.AES.decrypt(cipherText, secretKey);
    const decryptedString = bytes.toString(CryptoTS.enc.Utf8);
    return JSON.parse(decryptedString); // Convert string back to JSON
};

// Uncommented and typed function for handling HTTP decryption
export const dcryptDataHttp : HttpResponseResolver = async ({ request }) => {
    try {
        console.log("dcryptDataHttp:", request);
        
        // Use REACT_APP_CIPHER_KEY from environment variables
      //  const decryptedData = decryptData(request.body, );
        
        return ok({ value: 'decryptedData' });
    } catch (e) {
        return badRequest({ error: 'Invalid request', trace: e });
    }
};
