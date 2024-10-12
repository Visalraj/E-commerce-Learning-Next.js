
import { ActionButtons } from "../dashboard/buttons";
import Link from "next/link";

export default function CustomerCreateForm() {

    return (
        <form >
            <div className="rounded-md bg-gray-300 p-4 md:p-6 ">
                <div className="completeformwrapper p-5 ">

                    <div className="mb-4">
                        <label htmlFor="customer firstname" className="mb-2 block text-sm font-medium">
                            First Name
                        </label>
                        <div className="relative ">
                            <input type="text" className="w-8/12 h-9 rounded-md focus:outline-none p-2" />
                        </div>
                        <div id="customer-error" aria-live="polite" aria-atomic="true">
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customer lastname" className="mb-2 block text-sm font-medium">
                            Lastname
                        </label>
                        <div className="relative ">
                            <input type="text" className="w-8/12 h-9 rounded-md focus:outline-none p-2" />
                        </div>
                        <div id="customer-error" aria-live="polite" aria-atomic="true">
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customer email" className="mb-2 block text-sm font-medium">
                            Email
                        </label>
                        <div className="relative ">
                            <input type="email" className="w-8/12 h-9 rounded-md focus:outline-none p-2" />
                        </div>
                        <div id="customer-error" aria-live="polite" aria-atomic="true">
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        href="/admin/customers"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancel
                    </Link>
                    <ActionButtons name={'Create'} />
                </div>
            </div>
        </form>
    )
}