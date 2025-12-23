import { Switch as HeadlessSwitch } from '@headlessui/react';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    description?: string;
    disabled?: boolean;
}

export default function Switch({
    checked,
    onChange,
    label,
    description,
    disabled = false,
}: SwitchProps) {
    return (
        <HeadlessSwitch.Group as="div" className="flex items-center justify-between">
            {(label || description) && (
                <span className="flex flex-grow flex-col">
                    {label && (
                        <HeadlessSwitch.Label
                            as="span"
                            className="text-sm font-medium text-gray-900"
                            passive
                        >
                            {label}
                        </HeadlessSwitch.Label>
                    )}
                    {description && (
                        <HeadlessSwitch.Description
                            as="span"
                            className="text-sm text-gray-500"
                        >
                            {description}
                        </HeadlessSwitch.Description>
                    )}
                </span>
            )}
            <HeadlessSwitch
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={classNames(
                    checked ? 'bg-indigo-600' : 'bg-gray-200',
                    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                    'relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        checked ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    )}
                />
            </HeadlessSwitch>
        </HeadlessSwitch.Group>
    );
}
