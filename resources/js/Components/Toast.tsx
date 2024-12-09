import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useState } from 'react';

export default function Toast({
    message,
    status,
}: {
    message: string;
    status: 'success' | 'error' | 'info';
}) {
    const [show, setShow] = useState(true);

    const statusStyles = {
        success: {
            bg: 'bg-green-50',
            text: 'text-green-800',
            icon: 'text-green-400',
            buttonBg: 'bg-green-50',
            buttonText: 'text-green-500',
            buttonHover: 'hover:bg-green-100',
            ring: 'focus:ring-green-600',
            ringOffset: 'focus:ring-offset-green-50',
        },
        error: {
            bg: 'bg-red-50',
            text: 'text-red-800',
            icon: 'text-red-400',
            buttonBg: 'bg-red-50',
            buttonText: 'text-red-500',
            buttonHover: 'hover:bg-red-100',
            ring: 'focus:ring-red-600',
            ringOffset: 'focus:ring-offset-red-50',
        },
        info: {
            bg: 'bg-blue-50',
            text: 'text-blue-800',
            icon: 'text-blue-400',
            buttonBg: 'bg-blue-50',
            buttonText: 'text-blue-500',
            buttonHover: 'hover:bg-blue-100',
            ring: 'focus:ring-blue-600',
            ringOffset: 'focus:ring-offset-blue-50',
        },
    };

    const styles = statusStyles[status];

    if (!show) return <></>;

    return (
        <div
            className={clsx(
                'fixed bottom-0 left-0 right-0 z-50 rounded-md p-4',
                styles.bg,
            )}
        >
            <div className="flex">
                <div className="shrink-0">
                    <CheckCircleIcon
                        aria-hidden="true"
                        className={clsx('size-5', styles.icon)}
                    />
                </div>
                <div className="ml-3">
                    <p className={clsx('text-sm font-medium', styles.text)}>
                        {message}
                    </p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            type="button"
                            onClick={() => setShow(false)}
                            className={clsx(
                                'inline-flex rounded-md p-1.5',
                                styles.buttonBg,
                                styles.buttonText,
                                styles.buttonHover,
                                'focus:outline-none focus:ring-2',
                                styles.ring,
                                styles.ringOffset,
                            )}
                        >
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon aria-hidden="true" className="size-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
