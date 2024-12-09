import clsx from 'clsx';
import React from 'react';
type ButtonProps = {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    status?: 'success' | 'error' | 'warning' | 'info' | 'default';
    onAction?: () => void;
    children: React.ReactNode;
    className?: string;
};

export default function Button({
    size = 'md',
    status = 'default',
    onAction,
    children,
    className,
}: ButtonProps) {
    const sizeClasses = {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-2 py-1 text-sm',
        md: 'px-2.5 py-1.5 text-sm',
        lg: 'px-3 py-2 text-sm',
        xl: 'px-3.5 py-2.5 text-sm',
    };

    const statusClasses = {
        success: 'bg-green-600 hover:bg-green-500',
        error: 'bg-red-600 hover:bg-red-500',
        warning: 'bg-yellow-600 hover:bg-yellow-500',
        info: 'bg-blue-600 hover:bg-blue-500',
        default: 'bg-gray-600 hover:bg-gray-500',
    };

    return (
        <button
            type="button"
            className={clsx(
                'rounded-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                sizeClasses[size],
                statusClasses[status],
                className,
            )}
            onClick={onAction}
        >
            {children}
        </button>
    );
}
