'use server';
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