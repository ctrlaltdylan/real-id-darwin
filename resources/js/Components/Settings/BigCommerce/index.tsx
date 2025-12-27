import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

interface BigCommerceSettingsProps {
    data: {
        bc?: {
            clientId?: string;
            clientSecret?: string;
            accessToken?: string;
            apiPath?: string;
        };
    };
    setData: (key: string, value: any) => void;
}

const requiredScopes = [
    { name: 'Customers', permission: 'Modify' },
    { name: 'Orders', permission: 'Modify' },
    { name: 'Products', permission: 'Read-only' },
    { name: 'Storefront API Tokens', permission: 'Manage' },
    { name: 'Carts', permission: 'Modify' },
    { name: 'Information & settings', permission: 'Read-only' },
];

export default function BigCommerceSettings({ data, setData }: BigCommerceSettingsProps) {
    const [scopesExpanded, setScopesExpanded] = useState(false);
    const bcSettings = data.bc || {};

    const updateBcField = (field: string, value: string) => {
        setData('bc', {
            ...bcSettings,
            [field]: value,
        });
    };

    const hasCredentials = bcSettings.clientId && bcSettings.accessToken && bcSettings.apiPath;

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900">BigCommerce API Credentials</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Configure your BigCommerce API credentials to enable integration.
                </p>
            </div>

            {/* Required Scopes - Collapsible */}
            <div className="border border-gray-200 rounded-lg">
                <button
                    type="button"
                    onClick={() => setScopesExpanded(!scopesExpanded)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <span className="text-sm font-medium text-gray-900">
                        Required API Scopes
                    </span>
                    <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${scopesExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {scopesExpanded && (
                    <div className="px-4 py-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-3">
                            When creating your BigCommerce API account, ensure the following scopes are enabled:
                        </p>
                        <ul className="space-y-2">
                            {requiredScopes.map((scope) => (
                                <li key={scope.name} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-700">{scope.name}</span>
                                    <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-xs">
                                        {scope.permission}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <InputLabel htmlFor="bc-client-id" value="Client ID" />
                    <TextInput
                        id="bc-client-id"
                        type="text"
                        className="mt-1 block w-full"
                        value={bcSettings.clientId || ''}
                        onChange={(e) => updateBcField('clientId', e.target.value)}
                        placeholder="Enter your BigCommerce Client ID"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="bc-client-secret" value="Client Secret" />
                    <TextInput
                        id="bc-client-secret"
                        type="password"
                        className="mt-1 block w-full"
                        value={bcSettings.clientSecret || ''}
                        onChange={(e) => updateBcField('clientSecret', e.target.value)}
                        placeholder="Enter your BigCommerce Client Secret"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="bc-access-token" value="Access Token" />
                    <TextInput
                        id="bc-access-token"
                        type="password"
                        className="mt-1 block w-full"
                        value={bcSettings.accessToken || ''}
                        onChange={(e) => updateBcField('accessToken', e.target.value)}
                        placeholder="Enter your BigCommerce Access Token"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="bc-api-path" value="API Path" />
                    <TextInput
                        id="bc-api-path"
                        type="text"
                        className="mt-1 block w-full"
                        value={bcSettings.apiPath || ''}
                        onChange={(e) => updateBcField('apiPath', e.target.value)}
                        placeholder="e.g., https://api.bigcommerce.com/stores/xxxxx/v3"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        The base URL for BigCommerce API requests
                    </p>
                </div>
            </div>

            {/* Integration Documentation - Shows after credentials are set */}
            {hasCredentials && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Integration Guides</h4>
                    <p className="text-sm text-gray-600 mb-4">
                        Now that your API credentials are configured, follow one of these guides to integrate ID verification into your store:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a
                            href="https://getverdict.com/help/docs/bigcommerce/after-checkout"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                        >
                            <div className="flex-1">
                                <h5 className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                                    After Checkout
                                </h5>
                                <p className="text-xs text-gray-500 mt-1">
                                    Verify customers after they complete checkout
                                </p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                        <a
                            href="https://getverdict.com/help/docs/bigcommerce/before-checkout"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                        >
                            <div className="flex-1">
                                <h5 className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                                    Before Checkout
                                </h5>
                                <p className="text-xs text-gray-500 mt-1">
                                    Require ID verification before checkout
                                </p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
