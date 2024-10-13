'use server';
import { z } from 'zod';
import connectDB from '@/library/db';
import Users from '@/models/users';
import { generateRandomString } from '../Helpers/function';
import { encryptString, decryptString } from '../Helpers/function';

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

        const validatedData = CreateCustomers.parse(data);
        if (await connectDB()) {
            var firstname = validatedData.firstname;
            var lastname = validatedData.lastname;
            var email = (encryptString(validatedData.email));
            var username = validatedData.firstname + validatedData.lastname;
            var password = generateRandomString({ length: 10 });

            try {
                await Users.create({ firstname, lastname, email, username, password });
                console.log('User created');
            } catch (error) {
                console.log('Unable to create user' + error);
            }

        }

    } catch (e) {
        console.error('Validation Error:', e);
    }
}