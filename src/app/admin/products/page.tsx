'use server';
import { getProducts } from '@/app/lib/actions-admins';
import Breadcrumbs from '@/app/ui/admin/components/breadcrumbs';
import { CreateButton } from '@/app/ui/admin/components/buttons';
import EntitiesList from '@/app/ui/admin/components/entities-list';
import Pagination from '@/app/ui/common/pagination';
export default async function Page(
    props: {
        searchParams?: Promise<{
            query?: string;
            page?: string;
        }>
    }
) {
    const searchParams = await props.searchParams;
    const query = (searchParams && searchParams.query) ? searchParams.query : '';
    const currentPage = Number(searchParams?.page) || 1;
    const response = await getProducts(query, currentPage);
    const totalPages = response?.totalPages || 0;
    return (
        <>
            <main>
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Products', href: '' },
                        {
                            label: 'Manage Products',
                            href: '/admin/products',
                            active: true,
                        },
                    ]}
                />
                <div className="parentwrapbtns flex">
                    <CreateButton name="Add Products" pointto="/admin/products/create" />
                </div>
                <EntitiesList response={response} type={`products`} />
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </main>
        </>
    )
}