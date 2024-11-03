'use server';
import { updateCustomerById } from "@/app/lib/actions-admins";
import { ActionButtons } from "./buttons";
import { Customer } from "@/app/lib/definitions";

export default async function EditCustomerForm({ uuid, customer }: { uuid: string; customer: Customer[] }) {
    const updateCustomerWithId = updateCustomerById.bind(null, uuid);

    return (
        <>
            {customer ? (
                <>
                    <form autoComplete="off" action={updateCustomerWithId} className="bg-gray-300 p-5 rounded">
                        <div className="input-form mb-4">
                            <label htmlFor="CustomerName" className="flex mb-1">Name</label>
                            <input
                                type="text"
                                name="firstname"
                                className="w-full p-2 rounded cursor-not-allowed"
                                defaultValue={`${customer[0].firstname} ${customer[0].lastname}`}
                                readOnly
                            />
                        </div>
                        <div className="input-form mb-4">
                            <label htmlFor="CustomerUserName" className="flex mb-1">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="w-full p-2 rounded"
                                defaultValue={customer[0].username}
                            />
                        </div>
                        <div className="input-form mb-4">
                            <label htmlFor="CustomerEmail" className="flex mb-1">Email</label>
                            <input
                                type="text"
                                name="email"
                                className="w-full p-2 rounded cursor-not-allowed"
                                defaultValue={customer[0].email}
                                readOnly
                            />
                        </div>
                        <div className="input-form mb-6">
                            <label htmlFor="CustomerStatus" className="flex mb-1">Status</label>
                            <select
                                className="w-full p-2 rounded"
                                name="status"
                                defaultValue={customer[0].isActive ? 'Active' : 'Inactive'}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="input-form mb-4">
                            <ActionButtons name="Update" isclicked={false} pointto="" />
                        </div>
                    </form>
                </>
            ) : ''}
        </>
    );
}
