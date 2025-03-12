import clsx from 'clsx';
import {
    forwardRef,
    InputHTMLAttributes,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
    connectedLeft?: ReactNode;
    connectedRight?: ReactNode;
    label?: string;
    readOnly?: boolean;
};

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        connectedLeft,
        connectedRight,
        label,
        readOnly,
        ...props
    }: TextInputProps,
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div
                className={clsx(
                    'flex w-full overflow-hidden rounded-md border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500',
                    readOnly && 'bg-gray-50',
                )}
            >
                {connectedLeft && (
                    <div className="flex border-r border-gray-300 bg-gray-50">
                        <div className="flex h-full items-center px-3">
                            {connectedLeft}
                        </div>
                    </div>
                )}
                <input
                    {...props}
                    readOnly={readOnly}
                    type={type}
                    className={clsx(
                        'flex-1 border-none focus:ring-0',
                        readOnly && 'bg-gray-50 text-gray-500',
                        className,
                    )}
                    ref={localRef}
                />
                {connectedRight && (
                    <div className="flex border-l border-gray-300 bg-gray-50">
                        <div className="flex h-full">{connectedRight}</div>
                    </div>
                )}
            </div>
        </div>
    );
});
