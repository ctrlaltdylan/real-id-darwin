interface IdCheckOptionProps {
    onClick: () => void;
    helperText?: string;
    subtitle?: string;
    title: string;
    icons: React.ReactNode;
    selected: boolean;
}

export default function IdCheckOption({
    onClick,
    helperText,
    subtitle,
    title,
    icons,
    selected,
}: IdCheckOptionProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                flex-1 min-h-[150px] p-6 rounded-lg cursor-pointer transition-all duration-200
                flex flex-col items-center justify-around text-center
                ${
                    selected
                        ? 'border-2 border-indigo-500 bg-indigo-50'
                        : 'border border-gray-300 bg-white hover:border-gray-400'
                }
            `}
        >
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

            <div className="text-5xl text-gray-600">{icons}</div>

            {subtitle && (
                <p className="text-sm font-medium text-gray-500">{subtitle}</p>
            )}

            {helperText && (
                <p className="text-sm text-gray-500 mt-2">{helperText}</p>
            )}
        </button>
    );
}
