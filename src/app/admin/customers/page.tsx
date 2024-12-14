'use server';
import Breadcrumbs from '@/app/ui/admin/components/breadcrumbs';
import { CreateButton } from '@/app/ui/admin/components/buttons';
import EntitiesList from '@/app/ui/admin/components/entities-list';
import Pagination from '@/app/ui/common/pagination';
import { getCustomers } from "@/app/lib/actions-admins";
export default async function Page(
    props: {
        searchParams?: Promise<{
            query?: string;
            page?: string;
        }>;
    }
) {
    const searchParams = await props.searchParams;
    const query = (searchParams && searchParams.query) ? searchParams.query : '';
    const currentPage = Number(searchParams?.page) || 1;
    const response = await getCustomers(query, currentPage);
    const totalPages = response?.totalPages || 0;
    return (
        <>
            <main>
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Customers', href: '' },
                        {
                            label: 'Manage Customers',
                            href: '/admin/customers',
                            active: true,
                        },
                    ]}
                />
                <div className="parentwrapbtns flex">
                    <CreateButton name="Create Customers" pointto="/admin/customers/create" />
                </div>
                <EntitiesList response={response} type={`customers`} />
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </main>
        </>
    );
}

