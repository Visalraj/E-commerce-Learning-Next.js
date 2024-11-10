
'use server';
import Breadcrumbs from '@/app/ui/admin/components/breadcrumbs';
import { CreateButton } from '@/app/ui/admin/components/buttons';
import Customers from '@/app/ui/admin/components/customers-list';
export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
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
                <div className='parentwrapbtns flex'>

                    <CreateButton name={'Create Customers'} pointto={'/admin/customers/create'} />
                    {/*<CreateButton name={'Manage Customers'} />*/}

                </div>
                <Customers query={query} />
            </main >
        </>
    )
}




