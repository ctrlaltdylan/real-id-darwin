import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export type Action = {
    label: string;
    onAction?: () => void;
    status?: 'success' | 'error' | 'warning' | 'info' | 'default';
    url?: string;
    Icon: ElementType;
};

import { ElementType } from 'react';

export type Detail = {
    Icon: ElementType;
    label: string;
};

export function Detail({ Icon, label }: Detail) {
    return (
        <div className="mt-2 flex items-center text-sm text-gray-500">
            {Icon && (
                <Icon
                    aria-hidden="true"
                    className="mr-1.5 size-5 shrink-0 text-gray-400"
                />
            )}
            {label}
        </div>
    );
}

export function Action({ label, onAction, status, url, Icon }: Action) {
    const statusClasses = {
        success:
            'bg-green-600 hover:bg-green-500 focus-visible:outline-green-600',
        error: 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600',
        warning:
            'bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600',
        info: 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600',
        default:
            'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600',
    };

    return (
        <button
            type="button"
            className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${statusClasses[status || 'default']}`}
            onClick={onAction}
        >
            {Icon && (
                <Icon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5" />
            )}
            {label}
        </button>
    );
}

export default function PageHeading({
    title,
    secondaryActions,
    primaryAction,
    details,
    subtitle,
}: {
    title: string;
    secondaryActions?: Action[];
    primaryAction?: Action;
    details?: Detail[];
    subtitle?: string;
}) {
    return (
        <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {title}
                    {subtitle && (
                        <span className="ml-2 text-base font-normal text-gray-500">
                            {subtitle}
                        </span>
                    )}
                </h2>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    {details?.map((detail, index) => (
                        <Detail {...detail} key={index} />
                    ))}
                </div>
            </div>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
                {secondaryActions?.map((action, index) => (
                    <span
                        className={`ml-3 ${index === 0 ? 'hidden sm:block' : ''}`}
                        key={index}
                    >
                        <Action {...action} />
                    </span>
                ))}

                {primaryAction && (
                    <span className="sm:ml-3">
                        <Action {...primaryAction} />
                    </span>
                )}

                {/* Dropdown */}
                <Menu as="div" className="relative ml-3 sm:hidden">
                    <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                        More
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="-mr-1 ml-1.5 size-5 text-gray-400"
                        />
                    </MenuButton>

                    <MenuItems
                        transition
                        className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        {secondaryActions?.map((action, index) => (
                            <MenuItem key={index}>
                                <a
                                    href={action.url || '#'}
                                    onClick={action.onAction}
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                >
                                    {action.label}
                                </a>
                            </MenuItem>
                        ))}
                    </MenuItems>
                </Menu>
            </div>
        </div>
    );
}
