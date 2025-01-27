import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';

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
                                API Key
                            </h3>
                            <div className="mt-2 max-w-xl text-sm text-gray-500">
                                <p>
                                    Use your API key to authenticate your API
                                    requests.
                                </p>
                            </div>
                            <div className="mt-5">
                                <input
                                    type="password"
                                    value={shop.licenseKey}
                                    readOnly
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    id="api-key"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const apiKeyField =
                                            document.getElementById('api-key');
                                        if (
                                            apiKeyField &&
                                            apiKeyField instanceof
                                                HTMLInputElement
                                        ) {
                                            if (
                                                apiKeyField.type === 'password'
                                            ) {
                                                apiKeyField.type = 'text';
                                            } else {
                                                apiKeyField.type = 'password';
                                            }
                                        }
                                    }}
                                    className="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Show/Hide API Key
                                </button>
                            </div>
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
