'use server';
import Icon from "../../common/svg-tiles";
import { ActionButtons } from "./buttons";
import DeleteCustomer from "./delete-customer";
import Search from "../../common/search";
import { Customer } from "@/app/lib/definitions";
import Entities from "../../common/entities";
export default async function Customers({
    response
}: {
    response: { status: number; customers: Customer[] } | undefined;
}
) {
    return (
        <>
            {response && response.status === 200 && (
                <>
                    <Entities label={['ID', 'Name', 'Username', 'Email', 'Status', 'Created Date', 'Action', 'Login']} entity={response.customers} type={'customers'} />
                </>
            )}
        </>
    )
}