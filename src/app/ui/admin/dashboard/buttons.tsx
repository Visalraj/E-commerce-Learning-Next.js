import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import clsx from 'clsx';

export function CreateButton({ name, pointto }: { name: string, pointto: string }) {
    return (

        <Link
            href={pointto}
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 w-fit ml-3"
        >
            <span className="hidden md:block">{name}</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>

    );
}

export function ActionButtons({ name, isclicked = false }: { name: string, isclicked: boolean }) {
    return (
        <>
            <div className="flex items-center">
                <input
                    type="submit"
                    className={clsx(
                        "hover:cursor-pointer flex h-10 items-center rounded-lg bg-blue-600 text-white px-4 text-sm font-medium transition-colors",
                        {
                            'pr-8 bg-blue-300 cursor-not-allowed': isclicked,

                        }
                    )}
                    value={name}
                    disabled={isclicked}
                />
                {isclicked && (
                    <div className="spinner-border spinner-border-sm -ml-6 text-white" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
            </div>
        </>
    )
}