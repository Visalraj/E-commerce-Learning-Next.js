'use server'
import Navbar from "../ui/Home/navbar";
import Loginform from "../ui/Home/login-form";
export default async function Page() {
    return (
        <>
            <Navbar />
            <div className="w-1/3 rounded-md m-auto p-4 top-12 relative shadow-none shadow-current bg-slate-100	 bg-blend-normal ">
                <Loginform />
            </div>
        </>
    )
}