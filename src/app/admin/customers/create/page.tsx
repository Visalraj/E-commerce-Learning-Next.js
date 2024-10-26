'use server';
import Breadcrumbs from '@/app/ui/admin/components/breadcrumbs';
import CustomerCreateForm from '@/app/ui/admin/components/create-customer-form';
export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Manage Customers', href: '/admin/customers' },
                    {
                        label: 'Create',
                        href: '/admin/customers/create',
                        active: true,
                    },
                ]}
            />
            <CustomerCreateForm />
        </main>
    )
}