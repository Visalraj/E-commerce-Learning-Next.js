
'use client';
import { ActionButtons } from "./buttons";
import Link from "next/link";
import { createProducts } from "@/app/lib/actions-admins";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Image from "next/image";

export default function ProductsCreateForm() {
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);
    const [imgsSrc, setImgsSrc] = useState<Array<string | ArrayBuffer | null>>([]);
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

    const productImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileReaders = Array.from(files).map((file) => {
                return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = () => reject(reader.error);
                });
            });

            try {
                const imgsSrc = await Promise.all(fileReaders);
                setImgsSrc((prevImgs) => [...prevImgs, ...imgsSrc.filter(Boolean)]);
            } catch (error) {
                console.error("Error reading files:", error);
            }
        }
    };

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
                    <div className="mb-4">
                        <label htmlFor="product price" className="mb-2 block text-sm font-medium">
                            Product Images
                        </label>
                        <div className="relative">
                            <input onChange={productImages} type="file" accept="image/*" name="product_file" multiple />
                            <div className="uploaded-images grid grid-cols-2 gap-2">
                                {imgsSrc &&
                                    imgsSrc
                                        .filter((link): link is string => typeof link === 'string')
                                        .map((link, index) => (
                                            <Image
                                                key={index}
                                                width={200}
                                                height={450}
                                                src={link}
                                                alt={`Uploaded image ${index + 1}`}
                                            />
                                        ))}
                            </div>
                            <input type="hidden" name="product_images" value={imgsSrc
                                ?.filter((link): link is string => typeof link === 'string')
                                .join(',')} />
                        </div>

                        <div id="product-error" aria-live="polite" aria-atomic="true">
                        </div>
                    </div>
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