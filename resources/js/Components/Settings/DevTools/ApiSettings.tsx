import Card from '@/Components/Card';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import CodeBlock from '@/Components/CodeBlock';
import CopyButton from '@/Components/CopyButton';
import Collapse from '@/Components/Collapse';

interface ApiSettingsProps {
    shop: {
        api_key?: string;
        licenseKey?: string;
    };
}

export default function ApiSettings({ shop }: ApiSettingsProps) {
    const apiToken = shop.licenseKey || shop.api_key || '';
    const apiHost = 'https://real-id.getverdict.com/api/v1';

    const exampleCode = `fetch('${apiHost}/checks/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${apiToken || 'YOUR_API_TOKEN'}'
  },
  body: JSON.stringify({
    customer: {
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'McTesterson'
    },
    order: {
      id: '#1234'
    }
  })
})`;

    const exampleResponse = `{
  "message": "Delivered ID check instructions to Test McTesterson",
  "live_mode": true,
  "check": {
    "id": "1234-1234-1234-1234",
    "platform": "api",
    "step": "delivered",
    "id_check_type": "idv",
    "signature_required": false,
    "created_at": "2024-01-01T00:00:00.000Z",
    "order": {
      "id": "#1234"
    },
    "customer": {
      "first_name": "Test",
      "last_name": "McTesterson",
      "email": "test@example.com"
    }
  }
}`;

    const requestParameters = [
        {
            parameter: 'customer.first_name',
            dataType: 'string',
            required: 'optional',
            example: 'John',
            description: "The first name of the customer.",
        },
        {
            parameter: 'customer.last_name',
            dataType: 'string',
            required: 'optional',
            example: 'Smith',
            description: "The last name of the customer.",
        },
        {
            parameter: 'customer.email',
            dataType: 'string',
            required: 'optional',
            example: 'test@getverdict.com',
            description:
                'If provided, an email containing the ID check will be sent to this address.',
        },
        {
            parameter: 'customer.phone',
            dataType: 'string',
            required: 'optional',
            example: '+11112223333',
            description:
                'If provided, an SMS containing the ID check will be sent to this phone number.',
        },
        {
            parameter: 'order.id',
            dataType: 'string',
            required: 'optional',
            example: '#1234',
            description: 'The ID of the order as it appears for customers.',
        },
    ];

    return (
        <Card title="API">
            <p className="text-sm text-gray-500 mb-6">
                Programmatically send ID checks with an API call. You can use
                any server side language to trigger an ID check. Keep your API
                secret by only using it on server side running code.
            </p>

            <div className="space-y-6">
                {/* Authentication Section */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Authentication
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        To authenticate with the Real ID API use your API key
                        as a bearer token in the{' '}
                        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                            Authorization
                        </code>{' '}
                        header in your request.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <InputLabel value="API Host URL" />
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <TextInput
                                    value={apiHost}
                                    readOnly
                                    className="flex-1 font-mono text-sm"
                                />
                                <CopyButton
                                    text={apiHost}
                                    className="ml-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                                This is the base URL for all Real ID API
                                requests.
                            </p>
                        </div>

                        <div>
                            <InputLabel value="API Token" />
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <TextInput
                                    value={apiToken}
                                    readOnly
                                    className="flex-1 font-mono text-sm"
                                />
                                <CopyButton
                                    text={apiToken}
                                    className="ml-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                                Authenticate with the Real ID API by ensuring
                                the Authorization header includes this token.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Create ID Check Section */}
                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Create an ID check
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        For the most flexibility, send ID checks to your
                        customers using the Real ID API. Real ID will send an
                        ID check to the customer through email or SMS, and the
                        check will appear in the Real ID dashboard as normal.
                    </p>

                    <CodeBlock code={exampleCode} />

                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-4">
                        <p className="text-sm text-blue-700">
                            <strong>Tip:</strong> To allow Real ID to update
                            customer and order information during ID checks,
                            pass the order ID via{' '}
                            <code className="bg-blue-100 px-1 py-0.5 rounded">
                                order.id
                            </code>
                            .
                        </p>
                    </div>
                </div>

                {/* Request Parameters */}
                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Request Parameters
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Parameter
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Required
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Example
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {requestParameters.map((param) => (
                                    <tr key={param.parameter}>
                                        <td className="px-4 py-3 text-sm font-mono text-gray-900">
                                            {param.parameter}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {param.dataType}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {param.required}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {param.example}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {param.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Example Response */}
                <div className="border-t border-gray-200 pt-6">
                    <Collapse title="Example Response">
                        <CodeBlock code={exampleResponse} />
                    </Collapse>
                </div>
            </div>
        </Card>
    );
}
