'use server';
import * as NodeCrypto from 'crypto';
import { auth } from "../auth"

export async function generateRandomString({ length }: { length: number }) {
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

export async function encryptString(text: string) {
    const cipher = NodeCrypto.createCipheriv(algorithm, Buffer.from(key), constantIV);
    let encrypted = cipher.update(text, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

export async function decryptString(encryptedData: string) {
    const encryptedBuffer = Buffer.from(encryptedData, 'hex');
    const decipher = NodeCrypto.createDecipheriv(algorithm, Buffer.from(key), constantIV);
    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export async function formatTime(time: string) {
    const mongoDate = new Date(time);

    const day = mongoDate.getDate();
    const month = mongoDate.getMonth() + 1;
    const year = mongoDate.getFullYear();
    const hours = mongoDate.getUTCHours();
    const minutes = mongoDate.getUTCMinutes();
    const seconds = mongoDate.getUTCSeconds();


    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;


    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    return formattedDateTime;
}
export async function isUserLoggedIn() {
    const session = await auth();
    if (!session?.user) return null;
    return session.user;
}


