'use client';
import { useState } from 'react';
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';


export default function UploadWidget({ label, fn }: { label: string; fn: () => boolean }) {
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const handleUpload = (result: CloudinaryUploadWidgetResults) => {
        if (result.event === 'success' && typeof result.info !== 'string' && result.info?.secure_url) {
            const imageUrlFromBucket = result.info.secure_url.trim().split('/');
            const dbUrl = `${imageUrlFromBucket[6]}/${imageUrlFromBucket[7]}`;
            setUploadedImages((prev) => [...prev, dbUrl]);
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor="upload-widget" className="mb-2 block text-sm font-medium">
                {label}
            </label>
            <div className="relative">
                <CldUploadWidget
                    uploadPreset="products_bucket"
                    options={{
                        multiple: true,
                        clientAllowedFormats: ['image', 'video'],
                    }}
                    onSuccess={(result: CloudinaryUploadWidgetResults) => {
                        if (result.event) handleUpload(result);
                        else console.warn('Upload event is undefined.');
                    }}
                >
                    {({ open }) => (
                        <button
                            type="button"
                            className="bg-indigo-500 rounded py-2 px-4 text-white"
                            onClick={() => {
                                if (fn()) open();
                            }}
                        >
                            Upload
                        </button>
                    )}
                </CldUploadWidget>
            </div>

            {/* Render hidden fields for each uploaded image */}
            {
                uploadedImages.map((imageUrl, index) => (
                    <input
                        key={index}
                        type="hidden"
                        name={`uploaded_images[]`}
                        value={imageUrl}
                    />
                ))
            }
        </div >
    );
}
