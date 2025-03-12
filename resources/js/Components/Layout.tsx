import classNames from 'classnames';

export default function Layout({
    children,
    cols = 1,
    id,
}: {
    children: React.ReactNode;
    cols?: number;
    id?: string;
}) {
    const gridColsClass = `grid-cols-${cols}`;

    return (
        <div id={id} className="py-12">
            <div
                className={classNames(
                    'mx-auto grid max-w-7xl gap-4 sm:px-6 lg:px-8',
                    'grid-cols-12',
                    gridColsClass,
                )}
            >
                {children}
            </div>
        </div>
    );
}

export function Section({
    children,
    variant = 'fullWidth',
    className,
}: {
    children: React.ReactNode;
    variant?:
        | 'fullWidth'
        | 'oneHalf'
        | 'oneThird'
        | 'oneFourth'
        | 'oneSixth'
        | 'twoThirds'
        | 'threeQuarters'
        | 'twoFifths'
        | 'threeFifths'
        | 'fourFifths'
        | 'fiveSixths';
    className?: string;
}) {
    const variantClasses = {
        fullWidth: 'col-span-12',
        oneHalf: 'col-span-6',
        oneThird: 'col-span-4',
        oneFourth: 'col-span-3',
        oneSixth: 'col-span-2',
        twoThirds: 'col-span-8',
        threeQuarters: 'col-span-9',
        twoFifths: 'col-span-4',
        threeFifths: 'col-span-6',
        fourFifths: 'col-span-8',
        fiveSixths: 'col-span-10',
    };

    const colSpanClass = variantClasses[variant];

    return (
        <div className={classNames('space-y-10', colSpanClass, className)}>
            {children}
        </div>
    );
}
