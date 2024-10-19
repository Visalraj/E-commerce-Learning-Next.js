'use server';
import { z } from 'zod';
import connectDB from '@/library/db';
import Users from '@/models/users';
import { generateRandomString } from '../Helpers/function';
import { encryptString, decryptString } from '../Helpers/function';
import { revalidatePath } from 'next/cache';
import { Customer } from './definitions';


const FormSchema = z.object({
    id: z.string(),
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    email: z.string().email().min(1)
});

const CreateCustomers = FormSchema.omit({ id: true });


export type State = {
    errors?: {

    };
    message?: string | null;
};

export async function createCustomers(formdata: FormData) {

    try {
        let { firstname, lastname, email } = CreateCustomers.parse({
            firstname: formdata.get('firstname'),
            lastname: formdata.get('lastname'),
            email: formdata.get('email'),
        });


        if (await connectDB()) {
            email = encryptString(email.toLowerCase());
            let username = firstname + lastname;
            let password = encryptString(generateRandomString({ length: 10 }));

            try {
                await Users.create({ firstname, lastname, email, username, password });
                revalidatePath('/admin/customers');
                return { status: 200, redirectUrl: process.env.dynamiclink + 'admin/customers/' }

            } catch (error) {
                console.log('Unable to create user:', error);
                return { status: 500, message: 'Unable to create user' };
            }


        } else {
            return { status: 500, message: 'Database Connection Failed' };
        }
    } catch (e) {
        console.error('Validation Error:', e);
        return { status: 400, message: 'Validation Error' };
    }
}

export async function getCustomers() {
    try {
        const db = await connectDB();
        if (db) {
            const customers = await Users.find({});
            if (customers.length >= 0) {
                const serializedCustomers: Customer[] = customers.map(customer => ({
                    _id: customer._id.toString(),
                    firstname: customer.firstname,
                    lastname: customer.lastname,
                    email: customer.email,
                    username: customer.username,
                    password: customer.password,
                    isActive: customer.isActive,
                    createdAt: customer.createdAt.toISOString(),
                    updatedAt: customer.updatedAt.toISOString(),
                }));
                return { status: '200', customers: serializedCustomers };
            }
        }
    } catch (error) {

    }
}
