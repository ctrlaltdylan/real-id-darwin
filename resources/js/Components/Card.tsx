import clsx from 'clsx';
import React from 'react';

export type Action = {
    label: string;
    onAction?: () => void;
    status?: 'success' | 'error' | 'warning' | 'info' | 'default';
    url?: string;
};

type PaddingSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const paddingClasses = {
    none: {
        header: '',
        body: '',
        footer: '',
    },
    xs: {
        header: 'px-2 py-2',
        body: 'px-2 py-2',
        footer: 'px-2 py-2',
    },
    sm: {
        header: 'px-3 py-3 sm:px-4',
        body: 'px-3 py-3 sm:px-4',
        footer: 'px-3 py-3 sm:px-4',
    },
    md: {
        header: 'px-4 py-5 sm:px-6',
        body: 'px-4 py-5 sm:p-6',
        footer: 'px-4 py-4 sm:px-6',
    },
    lg: {
        header: 'px-6 py-6 sm:px-8',
        body: 'px-6 py-6 sm:p-8',
        footer: 'px-6 py-5 sm:px-8',
    },
    xl: {
        header: 'px-8 py-7 sm:px-10',
        body: 'px-8 py-7 sm:p-10',
        footer: 'px-8 py-6 sm:px-10',
    },
};

export default function Card({
    children,
    primaryAction,
    secondaryActions,
    title,
    className,
    padding = 'md',
}: {
    children: React.ReactNode;
    primaryAction?: Action;
    secondaryActions?: Action[];
    title?: string | React.ReactNode;
    className?: string;
    padding?: PaddingSize;
}) {
    return (
        <div
            className={clsx(
                'divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow',
                className,
            )}
        >
            {title && (
                <div className={paddingClasses[padding].header}>
                    {typeof title === 'string' ? (
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            {title}
                        </h3>
                    ) : (
                        title
                    )}
                </div>
            )}
            <div className={paddingClasses[padding].body}>{children}</div>
            {(primaryAction || secondaryActions) && (
                <div className={paddingClasses[padding].footer}>
                    {/* Footer content */}
                </div>
            )}
        </div>
    );
}

export function Section({
    children,
    title,
    padding = 'md',
}: {
    children: React.ReactNode;
    title?: string | React.ReactNode;
    padding?: PaddingSize;
}) {
    return (
        <div className={paddingClasses[padding].body}>
            <>
                {title &&
                    (typeof title === 'string' ? (
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            {title}
                        </h3>
                    ) : (
                        title
                    ))}
                {children}
            </>
        </div>
    );
}
