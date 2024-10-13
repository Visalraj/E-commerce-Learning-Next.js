import * as NodeCrypto from 'crypto';

export function generateRandomString({ length }: { length: number }) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const algorithm = 'aes-256-cbc';
const key = '0123456789abcdef0123456789abcdef';
const constantIV = Buffer.from('1234567890abcdef');

export function encryptString(text: string) {
    const cipher = NodeCrypto.createCipheriv(algorithm, Buffer.from(key), constantIV);
    let encrypted = cipher.update(text, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

export function decryptString(encryptedData: string) {
    const encryptedBuffer = Buffer.from(encryptedData, 'hex');
    const decipher = NodeCrypto.createDecipheriv(algorithm, Buffer.from(key), constantIV);
    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}