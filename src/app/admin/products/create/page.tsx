'use server';
import Breadcrumbs from "@/app/ui/admin/components/breadcrumbs";
import ProductsCreateForm from "@/app/ui/admin/components/create-product-form";
export default async function createProducts() {
    return (
        <>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Manage Products', href: '/admin/products' },
                    {
                        label: 'Create',
                        href: '/admin/products/create',
                        active: true,
                    },
                ]}
            />
            <ProductsCreateForm />
        </>
    )
}