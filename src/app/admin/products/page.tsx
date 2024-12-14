'use server';
import { getProducts } from '@/app/lib/actions-admins';
import Breadcrumbs from '@/app/ui/admin/components/breadcrumbs';
import { CreateButton } from '@/app/ui/admin/components/buttons';
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
    console.log(response);
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

            </main>
        </>
    )
}