export type Action = {
    label: string;
    onAction?: () => void;
    status?: 'success' | 'error' | 'warning' | 'info' | 'default';
    url?: string;
};

export default function Card({
    children,
    primaryAction,
    secondaryActions,
    title,
}: {
    children: React.ReactNode;
    primaryAction?: Action;
    secondaryActions?: Action[];
    title?: string;
}) {
    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            {title && (
                <div className="px-4 py-5 sm:px-6">
                    {/* Content goes here */}
                    {/* We use less vertical padding on card headers on desktop than on body sections */}
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                        {title}
                    </h3>
                </div>
            )}
            <div className="px-4 py-5 sm:p-6">{children}</div>
            {(primaryAction || secondaryActions) && (
                <div className="px-4 py-4 sm:px-6">
                    {/* Content goes here */}
                    {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
                </div>
            )}
        </div>
    );
}

export function Section({ children }: { children: React.ReactNode }) {
    return <div className="border-t border-gray-200">{children}</div>;
}
