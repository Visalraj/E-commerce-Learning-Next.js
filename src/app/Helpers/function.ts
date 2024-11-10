'use server';
import * as NodeCrypto from 'crypto';
import { auth } from "../auth"
import connectDB from '@/library/db';
import Users from '@/models/users';

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

export async function createUniqueUsername(name: string) {
    try {
        if (await connectDB()) {
            if (name.trim() !== '') {
                const Usernames = await Users.find({}, { "username": 1, "_id": 0 });
                const usernameList = Usernames.map(user => (user.username).toLowerCase());
                let uniqueUsername = name.toLowerCase();
                let i = 1;
                while (usernameList.includes(uniqueUsername)) {
                    uniqueUsername = name + i;
                    i++;
                }
                return uniqueUsername;
            }
        }
    } catch (error) {
        console.error('Error generating unique username:', error);
    }
}

export const generatePagination = async (currentPage: number, totalPages: number): Promise<(number | string)[]> => {
    return new Promise((resolve, reject) => {
        try {
            // If the total number of pages is 7 or less,
            // display all pages without any ellipsis.
            if (totalPages <= 7) {
                resolve(Array.from({ length: totalPages }, (_, i) => i + 1));
                return;
            }

            // If the current page is among the first 3 pages,
            // show the first 3, an ellipsis, and the last 2 pages.
            if (currentPage <= 3) {
                resolve([1, 2, 3, '...', totalPages - 1, totalPages]);
                return;
            }

            // If the current page is among the last 3 pages,
            // show the first 2, an ellipsis, and the last 3 pages.
            if (currentPage >= totalPages - 2) {
                resolve([1, 2, '...', totalPages - 2, totalPages - 1, totalPages]);
                return;
            }

            // If the current page is somewhere in the middle,
            // show the first page, an ellipsis, the current page and its neighbors,
            // another ellipsis, and the last page.
            resolve([
                1,
                '...',
                currentPage - 1,
                currentPage,
                currentPage + 1,
                '...',
                totalPages,
            ]);
        } catch (error) {
            reject(error);
        }
    });
};
