import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.log('Login request comes');
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

    if (token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    console.log('User is not logged in');
    return NextResponse.next();
}

export const config = {
    matcher: ['/login']
}