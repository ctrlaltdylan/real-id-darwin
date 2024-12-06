import clsx from 'clsx';
import React from 'react';

export type BadgeProps = {
    children: React.ReactNode;
    status: 'default' | 'success' | 'warning' | 'error';
    progress: 'completed' | 'incomplete';
};

const statusClasses = {
    default: 'bg-gray-50 text-gray-700 ring-gray-600/20',
    success: 'bg-green-50 text-green-700 ring-green-600/20',
    warning: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    error: 'bg-red-50 text-red-700 ring-red-600/20',
};

export default function Badge({ children, status, progress }: BadgeProps) {
    const classes = clsx(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
        statusClasses[status],
    );

    return <span className={classes}>{children}</span>;
}
