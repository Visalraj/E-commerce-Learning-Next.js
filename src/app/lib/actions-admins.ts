'use server';
import { z } from 'zod';
import connectDB from '@/library/db';
import Users from '@/models/users';
import Products from '@/models/products';
import { decryptString, generateRandomString, encryptString, formatTime, createUniqueUsername } from '../Helpers/function';
import { revalidatePath } from 'next/cache';
import { Customer } from './definitions';
import mongoose from "mongoose";
import { redirect } from 'next/navigation';


enum Status {
    active = 'Active',
    inactive = 'Inactive',
}

const FormSchema = z.object({
    id: z.string(),
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    username: z.string().min(1),
    email: z.string().email().min(1),
    status: z.enum([Status.active, Status.inactive]),
});

const CreateCustomers = FormSchema.omit({ id: true, status: true, username: true });



export async function createCustomers(formdata: FormData) {
    try {
        const { firstname, lastname, email: rawEmail } = CreateCustomers.parse({
            firstname: formdata.get('firstname'),
            lastname: formdata.get('lastname'),
            email: formdata.get('email'),
        });

        let email;
        if (await connectDB()) {
            email = await encryptString(rawEmail.toLowerCase());

            const username = await createUniqueUsername(firstname + lastname);
            const password = await encryptString(await generateRandomString({ length: 10 }));


            try {
                await Users.create({ firstname, lastname, email, username, password });
                revalidatePath('/admin/customers');
                return { status: 200, redirectUrl: process.env.NEXT_PUBLIC_BASE_URL + '/admin/customers/' }

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

export async function getCustomers(
    query: string,
    currentPage: number
): Promise<{ status: number; customers: Customer[]; totalPages: number } | undefined> {
    try {
        const db = await connectDB();
        if (db) {
            const ITEMS_PER_PAGE = 5;
            const offset = (currentPage - 1) * ITEMS_PER_PAGE;
            const searchQuery = new RegExp(query, 'i');

            const totalCount = await Users.countDocuments({
                $or: [
                    { firstname: { $regex: searchQuery } },
                    { lastname: { $regex: searchQuery } },
                    { email: { $regex: searchQuery } },
                    { username: { $regex: searchQuery } },
                ],
            });

            const customers = await Users.find({
                $or: [
                    { firstname: { $regex: searchQuery } },
                    { lastname: { $regex: searchQuery } },
                    { email: { $regex: searchQuery } },
                    { username: { $regex: searchQuery } },
                ],
            }).sort({ createdAt: -1 })
                .skip(offset)
                .limit(ITEMS_PER_PAGE);

            if (customers.length > 0) {
                const serializedCustomers: Customer[] = await Promise.all(customers.map(async customer => ({
                    _id: customer._id.toString(),
                    firstname: customer.firstname,
                    lastname: customer.lastname,
                    email: await decryptString(customer.email),
                    username: customer.username,
                    password: customer.password,
                    isActive: customer.isActive,
                    createdAt: await formatTime(customer.createdAt.toISOString()),
                    updatedAt: customer.updatedAt.toISOString(),
                })));

                const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
                return { status: 200, customers: serializedCustomers, totalPages };
            } else {
                return { status: 200, customers: [], totalPages: 0 };
            }
        } else {
            return { status: 500, customers: [], totalPages: 0 };
        }
    } catch (error) {
        console.log('Something error occurred', error);
    }
}



const UpdateCustomerSchema = FormSchema.omit({ id: true, firstname: true, email: true, lastname: true });

export async function updateCustomerById(id: string, formData: FormData) {
    const objectId = new mongoose.Types.ObjectId(id);
    const { username, status } = UpdateCustomerSchema.parse({
        username: formData.get('username'),
        status: formData.get('status'),
    })

    if (await connectDB()) {
        const result = await Users.updateOne(
            { _id: objectId },
            {
                $set: {
                    username: username,
                    isActive: (status == 'Active') ? true : false,
                    updatedAt: new Date(),
                }
            }
        );

        if (result.modifiedCount > 0) {
            console.log('User updated successfully');
            revalidatePath('/admin/customers');
            redirect('/admin/customers');
        } else {
            console.log('No user was updated.');
        }
    }

}

export async function getCustomerById({ id }: { id: string }) {
    const objectId = new mongoose.Types.ObjectId(id);
    const customerObject = await Users.find({ _id: objectId });
    if (customerObject.length >= 0) {
        console.log('User Fetched');
        const serializedCustomer: Customer[] = await Promise.all(
            customerObject.map(async customer => ({
                _id: customer._id.toString(),
                firstname: customer.firstname,
                lastname: customer.lastname,
                email: await decryptString(customer.email),
                username: customer.username,
                password: customer.password,
                isActive: customer.isActive,
                createdAt: await formatTime(customer.createdAt.toISOString()),
                updatedAt: customer.updatedAt.toISOString(),
            }))
        );

        return { status: 200, data: serializedCustomer };
    }
}


export async function deleteCustomerById(id: string) {
    const customerId = new mongoose.Types.ObjectId(id);
    try {
        if (await connectDB()) {
            await Users.deleteOne({ _id: customerId });
            revalidatePath('/admin/customers');
        }
    } catch (error) {
        console.log('error on deleting customer: ' + error)
    }
}

/* Products  */

const ProductsFormSchema = z.object({
    id: z.string(),
    product_name: z.string().min(1),
    product_desc: z.string().min(1),
    product_price: z.string().min(1),
});

const CreateProducts = ProductsFormSchema.omit({ id: true });

export async function createProducts(formdata: FormData) {
    try {
        const { product_name, product_desc, product_price } = CreateProducts.parse({
            product_name: formdata.get('product_name'),
            product_desc: formdata.get('product_description'),
            product_price: formdata.get('product_price'),
        });
        const price = parseFloat(product_price);

        if (isNaN(price)) {
            throw new Error('Invalid product price');
        }
        try {
            if (await connectDB()) {
                const product = await Products.create({
                    product_name,
                    product_desc,
                    product_price: price, // Store the price as a number
                });
                console.log("Created Product ID:", product._id);
                // revalidatePath('/admin/products');
                // return { status: 200, redirectUrl: process.env.NEXT_PUBLIC_BASE_URL + '/admin/products/' }
            }
        } catch (error) {
            console.error("Database Error:", error);
            return { status: 500, message: 'Database error during product creation' };
        }

        // Handle uploaded images
        const uploadedImages = formdata.getAll('uploaded_images[]');
        if (uploadedImages.length > 0) {
            console.log("Uploaded images count:", uploadedImages.length);
            // Process the images as needed (e.g., store them in a separate collection or S3)
        } else {
            console.log("No images uploaded.");
        }

    } catch (e) {
        console.error('Validation Error:', e);
        return { status: 400, message: 'Validation Error: ' + e.message };
    }
}
