import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface CollapseProps {
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
}

export default function Collapse({
    title,
    defaultOpen = false,
    children,
}: CollapseProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-lg">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
            >
                <span>{title}</span>
                {isOpen ? (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                ) : (
                    <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                )}
            </button>
            {isOpen && (
                <div className="border-t border-gray-200 px-4 py-3">
                    {children}
                </div>
            )}
        </div>
    );
}
