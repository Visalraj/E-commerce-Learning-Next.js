'use server';
import { z } from 'zod';
import connectDB from '@/library/db';

const FormSchema = z.object({
    id: z.string(),
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    email: z.string().email().min(1)
});

const CreateCustomers = FormSchema.omit({ id: true });

export async function createCustomers(formdata: FormData) {
    const data = {
        firstname: formdata.get('firstname'),
        lastname: formdata.get('lastname'),
        email: formdata.get('email'),
    };

    try {
        if (await connectDB()) {
            const validatedData = CreateCustomers.parse(data);
            console.log(validatedData);
        }
    } catch (e) {
        console.error('Validation Error:', e);
    }
}