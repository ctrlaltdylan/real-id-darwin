import { FormEventHandler } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Card from '@/Components/Card';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    orderId: string;
    content: string;
}

interface NewCheckProps {
    defaultContent?: string;
}

export default function NewCheck({ defaultContent = '' }: NewCheckProps) {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        orderId: '',
        content: defaultContent,
    });

    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        if (!phone) return true; // Optional field
        // At least 7 digits
        return /\d{7,}/.test(phone.replace(/\D/g, ''));
    };

    const isFormValid = (): boolean => {
        return (
            data.firstName.trim().length > 0 &&
            data.lastName.trim().length > 0 &&
            validateEmail(data.email) &&
            validatePhone(data.phone)
        );
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Infer delivery methods based on available contact info
        const deliveryMethods: string[] = [];
        if (data.email) deliveryMethods.push('email');
        if (data.phone) deliveryMethods.push('sms');

        post(route('checks.create'), {
            data: {
                ...data,
                deliveryMethods,
                idCheckType: 'id', // Default to ID verification only
            },
            preserveScroll: true,
        });
    };

    const handleCancel = () => {
        router.visit(route('dashboard'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Create New ID Check
                    </h2>
                </div>
            }
        >
            <div className="py-6">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Error Message */}
                    {errors && Object.keys(errors).length > 0 && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                            <p className="text-sm text-red-700">
                                {Object.values(errors)[0]}
                            </p>
                        </div>
                    )}

                    <form onSubmit={submit}>
                        {/* Customer Information */}
                        <Card title="Customer Information">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            First Name{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={data.firstName}
                                            onChange={(e) =>
                                                setData(
                                                    'firstName',
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Last Name{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={data.lastName}
                                            onChange={(e) =>
                                                setData(
                                                    'lastName',
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email Address{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            required
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Customer will receive ID check
                                            instructions at this email
                                        </p>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Include country code (e.g., +1 for
                                            US)
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="orderId"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Order ID (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="orderId"
                                        value={data.orderId}
                                        onChange={(e) =>
                                            setData('orderId', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Associate this ID check with a specific
                                        order
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* ID Check Settings */}
                        <div className="mt-6">
                            <Card title="ID Check Settings">
                                <div>
                                    <label
                                        htmlFor="content"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Custom Message (Optional)
                                    </label>
                                    <textarea
                                        id="content"
                                        rows={4}
                                        value={data.content}
                                        onChange={(e) =>
                                            setData('content', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Add a custom message to the ID check
                                        request
                                    </p>
                                </div>
                            </Card>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex items-center justify-end gap-3">
                            <SecondaryButton
                                type="button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton
                                type="submit"
                                disabled={processing || !isFormValid()}
                            >
                                {processing ? 'Sending...' : 'Send ID Check'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
