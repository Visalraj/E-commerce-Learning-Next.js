'use server'
import { isUserLoggedIn } from "../Helpers/function"
import CustomerSideBar from "../ui/customer/components/sidebar";
export default async function Page() {
    const user = await isUserLoggedIn();
    console.log(user)
    return (
        <>
            <CustomerSideBar />
        </>
    )
}