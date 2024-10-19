import { getCustomers } from "@/app/lib/actions-admins";
export default async function Customers() {
    const response = await getCustomers();
    return (
        <div className="table-layout-wrap w-full mt-14 m-auto">
            <div className="mt-6 flow-root">
                <div className="inline-block min-w-full align-middle">
                    <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                        <table className="hidden min-w-full text-gray-900 md:table">
                            <thead className="rounded-lg text-left text-sm font-normal">
                                <tr>
                                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                        ID
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Username
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Created Date
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Edit
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Delete
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Login
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {
                                    response && response.customers && response.customers.map((user) =>
                                        <>
                                            <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg " >
                                                <td className="w-fit whitespace-nowrap py-3 pl-6 pr-3">
                                                    {user._id}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3">
                                                    {user.firstname + ' ' + user.lastname}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3">
                                                    {user.username}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3">
                                                    {user.isActive}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3">
                                                    {user.createdAt}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3">
                                                    edit
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3">
                                                    delete
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3">
                                                    login
                                                </td>
                                            </tr>
                                        </>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}