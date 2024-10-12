
import Breadcrumbs from '@/app/ui/admin/invoices/breadcrumbs';
import { CreateButton } from '@/app/ui/admin/dashboard/buttons';
export default function Page() {

    return (
        <>
            <main>
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Customers', href: '/admin/customers' },
                        {
                            label: 'Manage Customers',
                            href: '/admin/customers',
                            active: true,
                        },
                    ]}
                />
                <div className='parentwrapbtns flex'>
                    <CreateButton name={'Create Customers'} />
                    {/*<CreateButton name={'Manage Customers'} />*/}
                </div>
            </main >
        </>
    )
}




