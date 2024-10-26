
import NextAuth, { User as NextAuthUser } from "next-auth";
import { authConfig } from '../../auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import connectDB from '@/library/db';
import Users from '@/models/users';
import { encryptString } from '@/app/Helpers/function';

export type User = NextAuthUser & {
    _id: string;
    username: string;
    password: string;
}

async function getUser(email: string, password: string): Promise<User | undefined> {
    try {
        if (await connectDB()) {
            const User = await Users.findOne({ email: await encryptString(email), password: await encryptString(password) });
            console.log("User found:", User);
            return User;
        }
    } catch (error) {
        console.log(error)
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials): Promise<User | null> {
            try {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email, password);
                    if (user) {
                        return { ...user, name: user.username, email: await encryptString(email) };
                    } else {
                        console.log('Failed to find user');
                        return null;
                    }
                }
            } catch (error) {
                console.log(error)
            }
            return null;
        },

    })],

});