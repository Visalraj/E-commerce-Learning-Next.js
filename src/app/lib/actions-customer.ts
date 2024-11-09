'use server';
import connectDB from '@/library/db';
import { signIn } from '../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import Users from '@/models/users';
import { encryptString } from '../Helpers/function';
import { generateRandomString } from '../Helpers/function';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        formData.append('redirectTo', '/dashboard');
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

const FormSchema = z.object({
    id: z.string(),
    customer_fname: z.string().min(1),
    customer_lname: z.string().min(1),
    customer_age: z.coerce.number().int(),
    customer_email: z.string().email().min(1),
    customer_addr: z.string().min(10),
});

const CreateCustomer = FormSchema.omit({ id: true });

export async function createCustomer(formData: FormData) {
    const { customer_fname, customer_lname, customer_age, customer_email: rawEmail, customer_addr } = CreateCustomer.parse({
        customer_fname: formData.get('customer_fname'),
        customer_lname: formData.get('customer_lname'),
        customer_age: formData.get('customer_age'),
        customer_email: formData.get('customer_email'),
        customer_addr: formData.get('customer_addr'),
    });

    let email = await encryptString(rawEmail);
    let password = await encryptString(await generateRandomString({ length: 10 }));
    let username = customer_fname + customer_lname;

    try {
        if (await connectDB()) {
            try {
                Users.create({
                    firstname: customer_fname, lastname: customer_lname, age: customer_age,
                    email: email, password: password, address: customer_addr, isActive: false, username: username
                });
                console.log('User created successfully')
            } catch (error) {
                console.log('User is not created ' + error);
            }
        }
    } catch (error) {
        console.log('Db connection error ' + error);
    }

}