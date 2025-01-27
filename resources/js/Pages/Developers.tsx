import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Developers({ shop }: { shop: any }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Developers
                </h2>
            }
        >
            <Head title="Developers" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                API Keys
                            </h3>
                            <div className="mt-2 max-w-xl text-sm text-gray-500">
                                <p>
                                    Use your API key to authenticate your API
                                    requests.
                                </p>
                                <div className="mt-5">
                                    <a
                                        href="https://getverdict.com/help/docs/api/authentication"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 underline hover:text-indigo-900"
                                    >
                                        <InformationCircleIcon className="inline-block h-5 w-5 text-gray-500" />
                                        API Docs
                                    </a>
                                </div>
                            </div>
                            <div className="mt-5">
                                <label
                                    htmlFor="api-key"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Live API Key
                                </label>
                                <ApiKeyComponent apiKey={shop.licenseKey} />
                            </div>
                            <div className="mt-5">
                                <label
                                    htmlFor="test-key"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Test API Key
                                </label>
                                <TestKeyComponent
                                    testKey={shop.sandboxLicenseKey}
                                />
                            </div>
                            <div className="mt-5 max-w-xl text-sm text-gray-500">
                                <p>
                                    Test ID checks are free. Learn more about
                                    test mode{' '}
                                    <a
                                        href="https://getverdict.com/help/docs/getting-started/test-mode"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 underline hover:text-indigo-900"
                                    >
                                        here
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function ApiKeyComponent({ apiKey }: { apiKey: string }) {
    const [showApiKey, setShowApiKey] = useState(false);

    return (
        <div className="mt-5">
            <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                readOnly
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                id="api-key"
            />
            <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                {showApiKey ? 'Hide API Key' : 'Show API Key'}
            </button>
        </div>
    );
}

function TestKeyComponent({ testKey }: { testKey: string }) {
    const [showTestKey, setShowTestKey] = useState(false);

    return (
        <div className="mt-5">
            <input
                type={showTestKey ? 'text' : 'password'}
                value={testKey}
                readOnly
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                id="test-key"
            />
            <button
                type="button"
                onClick={() => setShowTestKey(!showTestKey)}
                className="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                {showTestKey ? 'Hide Test Key' : 'Show Test Key'}
            </button>
        </div>
    );
}
