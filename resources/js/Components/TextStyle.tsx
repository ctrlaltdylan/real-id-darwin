import clsx from 'clsx';
import React from 'react';

type TextStyleProps = {
    variation?: 'positive' | 'negative' | 'strong' | 'subdued' | 'code';
    children: React.ReactNode;
};

export default function TextStyle({
    variation = 'subdued',
    children,
}: TextStyleProps) {
    const variationClasses = {
        positive: 'text-green-600',
        negative: 'text-red-600',
        strong: 'font-semibold',
        subdued: 'text-gray-500',
        code: 'font-mono bg-gray-100 px-1 rounded',
    };

    return (
        <span className={clsx(variationClasses[variation])}>{children}</span>
    );
}
