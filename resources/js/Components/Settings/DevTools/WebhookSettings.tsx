import { useState } from 'react';
import Card from '@/Components/Card';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Switch from '@/Components/Switch';
import CodeBlock from '@/Components/CodeBlock';
import Collapse from '@/Components/Collapse';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';

interface WebhookSettingsProps {
    data: {
        webhookEnabled?: boolean;
        webhookUrl?: string;
        webhookSecret?: string;
    };
    setData: (key: string, value: any) => void;
    errors?: Record<string, string>;
}

export default function WebhookSettings({
    data,
    setData,
    errors = {},
}: WebhookSettingsProps) {
    const [testLoading, setTestLoading] = useState(false);
    const [testMessage, setTestMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    const examplePayload = `{
  "event": "check.completed",
  "check": {
    "id": "abcedf",
    "step": "completed",
    "testing": false,
    "order": {
      "name": "#1234"
    },
    "customer": {
      "email": "customer@example.com"
    }
  }
}`;

    const handleSendTestWebhook = async () => {
        if (!data.webhookUrl) {
            setTestMessage({
                type: 'error',
                text: 'Please enter a webhook URL first',
            });
            return;
        }

        setTestLoading(true);
        setTestMessage(null);

        try {
            const response = await axios.post(route('settings.testWebhook'), {
                webhookUrl: data.webhookUrl,
                webhookSecret: data.webhookSecret,
            });

            setTestMessage({
                type: 'success',
                text: response.data.message || 'Test webhook sent successfully!',
            });
        } catch (err: any) {
            setTestMessage({
                type: 'error',
                text:
                    err.response?.data?.message ||
                    'Failed to send test webhook',
            });
        } finally {
            setTestLoading(false);
        }
    };

    return (
        <Card title="Webhooks">
            <p className="text-sm text-gray-500 mb-6">
                Real ID can notify your application or workflow when ID checks
                are completed, in real time. The URL should return a 200 status
                code in the response, otherwise Real ID will attempt to resend
                the request with exponential back off, for a maximum of 6
                retries.
            </p>

            <div className="space-y-6">
                {/* ID Check Events Section */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        ID check events
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Real ID will send a webhook to this URL on ID check
                        events. You can automate actions from this event such as
                        notifying your fulfillment system or releasing held
                        orders.
                    </p>

                    <Collapse title="Example event payload">
                        <CodeBlock code={examplePayload} />
                        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-4">
                            <p className="text-sm text-blue-700">
                                For more information about available statuses
                                and retrieving the check details, please visit
                                our API documentation at{' '}
                                <a
                                    href="https://docs.getverdict.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    docs.getverdict.com
                                </a>
                            </p>
                        </div>
                    </Collapse>
                </div>

                {/* Enable/Disable Toggle */}
                <div className="border-t border-gray-200 pt-6">
                    <Switch
                        checked={data.webhookEnabled || false}
                        onChange={(checked) =>
                            setData('webhookEnabled', checked)
                        }
                        label="Enable Webhooks"
                        description={`Webhooks on ID check events are currently ${data.webhookEnabled ? 'enabled' : 'disabled'}`}
                    />
                </div>

                {/* Webhook Configuration */}
                <div className="space-y-4">
                    <div>
                        <InputLabel htmlFor="webhookUrl" value="Webhook URL" />
                        <TextInput
                            id="webhookUrl"
                            type="url"
                            className="mt-1 block w-full"
                            value={data.webhookUrl || ''}
                            onChange={(e) =>
                                setData('webhookUrl', e.target.value)
                            }
                            placeholder="https://example.com/api/checks/completed"
                        />
                        <InputError
                            message={errors.webhookUrl}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="webhookSecret"
                            value="Signing secret"
                        />
                        <TextInput
                            id="webhookSecret"
                            className="mt-1 block w-full font-mono text-sm"
                            value={data.webhookSecret || ''}
                            readOnly
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Validate the webhook by ensuring the header
                            X-Real-ID-Signature in the request matches the body
                            of the request signed with this key.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton
                            type="button"
                            onClick={handleSendTestWebhook}
                            disabled={!data.webhookUrl || testLoading}
                        >
                            {testLoading
                                ? 'Sending...'
                                : 'Send test webhook'}
                        </PrimaryButton>

                        {testMessage && (
                            <p
                                className={`text-sm ${testMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
                            >
                                {testMessage.text}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
