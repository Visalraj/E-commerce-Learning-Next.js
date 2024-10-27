import { signOut } from "@/app/auth";
import { getToken } from "next-auth/jwt"; // Import the necessary JWT function
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
    try {
        if (!token) {
            return NextResponse.json({ status: 401, error: "Unauthorized" });
        } else {
            await signOut({ redirect: false });
            return NextResponse.json({ status: 200, message: "Logged out successfully" });
        }
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ status: 500, error: "Logout failed" });
    }
}
