import ApiSettings from './ApiSettings';
import WebhookSettings from './WebhookSettings';

interface DevToolsProps {
    shop: {
        api_key?: string;
        licenseKey?: string;
    };
    data: {
        webhookEnabled?: boolean;
        webhookUrl?: string;
        webhookSecret?: string;
    };
    setData: (key: string, value: any) => void;
    errors?: Record<string, string>;
}

export default function DevTools({
    shop,
    data,
    setData,
    errors = {},
}: DevToolsProps) {
    return (
        <div className="space-y-6">
            <ApiSettings shop={shop} />
            <WebhookSettings data={data} setData={setData} errors={errors} />
        </div>
    );
}
