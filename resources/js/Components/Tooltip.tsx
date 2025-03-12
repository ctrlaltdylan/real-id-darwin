import React, { useState } from 'react';

type TooltipProps = {
    content: React.ReactNode;
    children: React.ReactNode;
};

export default function Tooltip({ content, children }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative inline-block">
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </div>
            {isVisible && (
                <div className="absolute -top-full left-1/2 z-10 -translate-x-1/2 -translate-y-2 transform rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-sm">
                    {content}
                    <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-gray-900" />
                </div>
            )}
        </div>
    );
}
