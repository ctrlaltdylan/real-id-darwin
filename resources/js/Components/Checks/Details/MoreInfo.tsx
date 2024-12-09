import Tippy from '@tippyjs/react';
import * as React from 'react';
import 'tippy.js/dist/tippy.css';

import clsx from 'clsx';

type Props = {
    children: React.ReactNode;
    type?: 'info' | 'warning' | 'danger';
};

const MoreInfo = ({ children, type = 'info' }: Props) => (
    <Tippy content={<span>{children}</span>}>
        <span
            className={clsx({
                'ri-p-2 ri-rounded-full ri-text-white ri-cursor-pointer ri-text-xs ri-ml-4 ri-font-bold ri-inline-flex ri-items-cente ri-justify-center':
                    true,
                'ri-bg-blue-500': type === 'info',
                'ri-bg-red-500': type === 'danger',
                'ri-bg-orange-500': type === 'warning',
            })}
        >
            {type === 'info' && '?'}
            {type === 'warning' && (
                <svg
                    className="ri-w-6 ri-h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                    />
                </svg>
            )}
            {type === 'danger' && (
                <svg
                    className="ri-w-5 ri-h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            )}
        </span>
    </Tippy>
);

export default MoreInfo;
