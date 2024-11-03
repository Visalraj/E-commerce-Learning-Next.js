'use server';
import connectDB from '@/library/db';
import { signIn } from '../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';

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

    console.log(customer_fname + ' ' + customer_lname + ' ' + customer_age + ' ' + rawEmail + ' ' + customer_addr);
    try {
        if (await connectDB()) {
            try {

            } catch (error) {
                console.log('User is not created ' + error);
            }
        }
    } catch (error) {
        console.log('Db connection error ' + error);
    }

}