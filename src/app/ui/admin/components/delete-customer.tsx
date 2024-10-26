import Icon from "../../common/svg-tiles";
import { deleteCustomerById } from "@/app/lib/actions-admins";
export default function DeleteCustomer({ id }: { id: string }) {
    const deleteCustomerId = deleteCustomerById.bind(null, id);
    return (
        <form action={deleteCustomerId}>
            <button type="submit"><Icon name={"delete"} /></button>
        </form>
    )
}