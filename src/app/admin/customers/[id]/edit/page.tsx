import Breadcrumbs from "@/app/ui/admin/components/breadcrumbs"
export default function editCustomer() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Manage Customers', href: '/admin/customers' },
                    {
                        label: 'Edit',
                        href: '',
                        active: true,
                    },
                ]}
            />

        </main>
    )
}