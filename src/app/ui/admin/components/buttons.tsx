
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '../../common/svg-tiles';

export function CreateButton({ name, pointto }: { name: string, pointto: string }) {
    return (
        <Link href={pointto} className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 w-fit ml-3">
            <span className="hidden md:block">{name}</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function ActionButtons({ name, isclicked = false, pointto = '' }: { name: string, isclicked: boolean, pointto: string }) {
    const buttonNames = ['Create', 'Edit', 'Update'];
    type ButtonName = typeof buttonNames[number];

    const button: Record<ButtonName, JSX.Element> = {
        Create: (
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
        ),
        Edit: (
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/customers/${pointto}/edit`}>
                <Icon name="edit" />
            </Link>
        ),
        Update: (
            <div className="flex items-center">
                <input
                    type="submit"
                    className={clsx(
                        "hover:cursor-pointer flex h-10 items-center rounded-lg bg-blue-600 text-white px-4 text-sm font-medium transition-colors",

                    )}
                    value={name}
                />
            </div>
        ),
    };
    return button[name];
}