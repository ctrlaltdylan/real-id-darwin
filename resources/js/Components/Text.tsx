import clsx from 'clsx';
import React from 'react';

type TextProps = {
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    variant?: 'bodyMd' | 'bodyLg' | 'bodySm' | 'bodyXs';
    fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold';
    color?: 'default' | 'subdued' | 'success' | 'critical' | 'warning';
    children: React.ReactNode;
};

export default function Text({
    as: Component = 'p',
    variant = 'bodyMd',
    fontWeight = 'regular',
    color = 'default',
    children,
}: TextProps) {
    const variantClasses = {
        bodyXs: 'text-xs',
        bodySm: 'text-sm',
        bodyMd: 'text-base',
        bodyLg: 'text-lg',
    };

    const fontWeightClasses = {
        regular: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    const colorClasses = {
        default: 'text-gray-900',
        subdued: 'text-gray-500',
        success: 'text-green-600',
        critical: 'text-red-600',
        warning: 'text-yellow-600',
    };

    return (
        <Component
            className={clsx(
                variantClasses[variant],
                fontWeightClasses[fontWeight],
                colorClasses[color],
            )}
        >
            {children}
        </Component>
    );
}
