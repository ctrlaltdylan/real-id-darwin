import clsx from 'clsx';

type SkeletonBodyTextProps = {
    lines?: number;
};

export default function SkeletonBodyText({ lines = 3 }: SkeletonBodyTextProps) {
    return (
        <div className="animate-pulse">
            {[...Array(lines)].map((_, i) => (
                <div
                    key={i}
                    className={clsx(
                        'h-4 rounded bg-gray-200',
                        'my-2',
                        i === lines - 1 && 'w-3/4', // Make last line shorter
                    )}
                />
            ))}
        </div>
    );
}
