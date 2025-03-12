import { XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { ReactNode } from 'react';

type Status = 'success' | 'warning' | 'critical' | 'info';

type BannerProps = {
    title?: string;
    children?: ReactNode;
    status?: Status;
    onDismiss?: () => void;
};

const statusStyles = {
    success: {
        background: 'bg-green-50',
        border: 'border-green-400',
        text: 'text-green-800',
        title: 'text-green-900',
        icon: 'text-green-400',
    },
    warning: {
        background: 'bg-yellow-50',
        border: 'border-yellow-400',
        text: 'text-yellow-800',
        title: 'text-yellow-900',
        icon: 'text-yellow-400',
    },
    critical: {
        background: 'bg-red-50',
        border: 'border-red-400',
        text: 'text-red-800',
        title: 'text-red-900',
        icon: 'text-red-400',
    },
    info: {
        background: 'bg-blue-50',
        border: 'border-blue-400',
        text: 'text-blue-800',
        title: 'text-blue-900',
        icon: 'text-blue-400',
    },
};

export default function Banner({
    title,
    children,
    status = 'info',
    onDismiss,
}: BannerProps) {
    const styles = statusStyles[status];

    return (
        <div
            className={clsx(
                'rounded-lg border p-4',
                styles.background,
                styles.border,
            )}
        >
            <div className="flex items-start">
                <div className="flex-1">
                    {title && (
                        <h3
                            className={clsx(
                                'text-md mb-2 font-semibold',
                                styles.title,
                            )}
                        >
                            {title}
                        </h3>
                    )}
                    <div className={clsx('text-sm', styles.text)}>
                        {children}
                    </div>
                </div>
                {onDismiss && (
                    <button
                        type="button"
                        className={clsx(
                            'ml-3 inline-flex rounded-md p-1.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2',
                            styles.text,
                            `focus:ring-${status}-500`,
                        )}
                        onClick={onDismiss}
                    >
                        <span className="sr-only">Dismiss</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                )}
            </div>
        </div>
    );
}
