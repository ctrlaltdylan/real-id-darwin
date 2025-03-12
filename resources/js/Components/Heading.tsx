import clsx from 'clsx';
import React from 'react';

type HeadingProps = {
    element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: React.ReactNode;
    id?: string;
};

export default function Heading({
    element: Element = 'h2',
    children,
    id,
}: HeadingProps) {
    const classes = clsx(
        'text-gray-900',
        Element === 'h1' && 'text-4xl font-bold',
        Element === 'h2' && 'text-2xl font-semibold',
        Element === 'h3' && 'text-xl font-semibold',
        Element === 'h4' && 'text-lg font-semibold',
        Element === 'h5' && 'text-base font-semibold',
        Element === 'h6' && 'text-sm font-semibold',
    );

    return (
        <Element id={id} className={classes}>
            {children}
        </Element>
    );
}
