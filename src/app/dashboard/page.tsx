'use server'
import { isUserLoggedIn } from "../Helpers/function"
import CustomerSideBar from "../ui/customer/components/sidebar";
export default async function Page() {
    const user = await isUserLoggedIn();

    return (
        <div className="flex">
            <CustomerSideBar />
            <main className="ml-64 p-8">
                <h2 className="text-2xl font-semibold mt-16">Welcome {user?.name}</h2>
                {/* Remaining content goes here */}
            </main>
        </div>

    )
}