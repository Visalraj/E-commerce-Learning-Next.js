'use client';

import { CldUploadWidget } from 'next-cloudinary';

export default function UploadWidget({ label }: { label: string }) {
    const handleUpload = (result: any) => {
        if (result.event === 'success') {
            console.log('Uploaded file info:', result.info);
            console.log('File URL:', result.info.secure_url);
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor="product-price" className="mb-2 block text-sm font-medium">
                {label}
            </label>
            <div className="relative">
                <CldUploadWidget
                    uploadPreset="products_bucket"
                    options={{
                        multiple: true,
                        clientAllowedFormats: ['image', 'video'],
                    }}
                    onSuccess={(result) => {
                        if (result.event === 'success') {
                            handleUpload(result);
                        }
                    }}
                >
                    {({ open }) => (
                        <button
                            className="bg-indigo-500 rounded py-2 px-4 text-white"
                            onClick={() => open()}
                        >
                            Upload
                        </button>
                    )}
                </CldUploadWidget>
            </div>
        </div>
    );
}
