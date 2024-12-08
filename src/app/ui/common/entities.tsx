'use server';
import Search from "./search";
import { ActionButtons } from "../admin/components/buttons";
import DeleteCustomer from "../admin/components/delete-customer";
import Icon from "./svg-tiles";
import { Customer } from "@/app/lib/definitions";
interface EntityTypes {
    customers: Customer;
}

export default async function Entities<T extends keyof EntityTypes>({
    label,
    entity,
    type,
}: {
    label: string[];
    entity: EntityTypes[T][];
    type: T;
}) {
    return (
        <>
            <div className="search-component mt-5">
                <Search placeholder="Search here..." />
            </div>
            <div className="table-layout-wrap w-full mt-14 m-auto">
                <div className="mt-6 flow-root">
                    <div className="inline-block min-w-full align-middle">
                        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                            <table className="hidden min-w-full text-gray-900 md:table">
                                <thead className="rounded-lg text-left text-sm font-normal">
                                    <tr>
                                        {
                                            label && label.map((item, index) =>
                                                <th key={index} scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                                    {item}
                                                </th>
                                            )
                                        }
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {
                                        entity && entity.map((item) =>
                                            <tr key={item._id} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg " >
                                                <td className="w-fit whitespace-nowrap py-3 pl-6 pr-3">
                                                    {item._id}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3">
                                                    {item.firstname + ' ' + item.lastname}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3">
                                                    {item.username}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3">
                                                    {item.email}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3">
                                                    {(item.isActive) ? <Icon name={"activestatus"} /> : <Icon name={"inactivestatus"} />}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3">
                                                    {item.createdAt}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3 flex ">
                                                    <span className="pl-3">
                                                        <ActionButtons name={'Edit'} isclicked={false} pointto={item._id} />
                                                    </span>
                                                    {
                                                        (type == 'customers') ? <span className="pl-3">
                                                            <DeleteCustomer id={item._id} />
                                                        </span> : ''
                                                    }

                                                </td>
                                                <td className="whitespace-nowrap px-3 py-3">
                                                    <Icon name="loginbyadmin" />
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}