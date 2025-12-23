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

export default function BigCommerceSettings({ data, setData }: BigCommerceSettingsProps) {
    const bcSettings = data.bc || {};

    const updateBcField = (field: string, value: string) => {
        setData('bc', {
            ...bcSettings,
            [field]: value,
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900">BigCommerce API Credentials</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Configure your BigCommerce API credentials to enable integration.
                </p>
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
        </div>
    );
}
