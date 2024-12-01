
'use client';
import { ActionButtons } from "./buttons";
import Link from "next/link";
import { createProducts } from "@/app/lib/actions-admins";
import { useState } from "react";
import UploadWiget from "../../common/upload-images";

export default function ProductsCreateForm() {
    const [isClicked, setIsClicked] = useState(false);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsClicked(true);
        const formData = new FormData(event.currentTarget);

        try {
            const result = await createProducts(formData);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={handleSubmit} method="POST" autoComplete="off" className="w-7/12 m-auto mt-5">
            <div className="rounded-md bg-gray-300 p-4 md:p-6 ">
                <div className="completeformwrapper p-5 " style={{ width: "130%" }}>

                    <div className="mb-4">
                        <label htmlFor="product name" className="mb-2 block text-sm font-medium">
                            Product Name
                        </label>
                        <div className="relative ">
                            <input type="text" name="product_name" className="w-8/12 h-9 rounded-md focus:outline-none p-2" />
                            <div id="product-error" aria-live="polite" aria-atomic="true"></div>
                        </div>
                        <div id="product-error" aria-live="polite" aria-atomic="true">
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="product description" className="mb-2 block text-sm font-medium">
                            Product Description
                        </label>
                        <div className="relative ">
                            <textarea name="product_description" className="w-8/12 h-9 rounded-md focus:outline-none p-2" />
                        </div>
                        <div id="product-error" aria-live="polite" aria-atomic="true">
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="product price" className="mb-2 block text-sm font-medium">
                            Product Price
                        </label>
                        <div className="relative ">
                            <input type="text" name="product_price" className="w-8/12 h-9 rounded-md focus:outline-none p-2" />
                        </div>
                        <div id="product-error" aria-live="polite" aria-atomic="true">
                        </div>
                    </div>
                    <UploadWiget label={"Upload Product Images"} />
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        href="/admin/customers"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancel
                    </Link>
                    <ActionButtons name={'Create'} isclicked={isClicked} pointto="" />
                </div>
            </div>
        </form>
    )
}