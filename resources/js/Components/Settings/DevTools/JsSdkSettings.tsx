import Card from '@/Components/Card';
import CodeBlock from '@/Components/CodeBlock';
import CopyButton from '@/Components/CopyButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

interface JsSdkSettingsProps {
    shop: {
        api_key?: string;
        licenseKey?: string;
    };
}

export default function JsSdkSettings({ shop }: JsSdkSettingsProps) {
    const apiToken = shop.licenseKey || shop.api_key || '';

    const installSnippet = `<script type="text/javascript" src="https://www.idv.link/assets/index.js"></script>
<div id="real-id-mount"></div>
<script>
  RealID.createFlow({
    target: "#real-id-mount",
    mode: "full",
    apiKey: "${apiToken || 'YOUR_API_TOKEN'}"
  });
</script>`;

    return (
        <Card title="JavaScript SDK">
            <p className="text-sm text-gray-500 mb-6">
                Embed an ID check flow directly into your own site or app
                with the Real ID JavaScript SDK. Drop the script tag in your
                page, mount the flow to any element, and Real ID handles the
                rest.
            </p>

            <div className="space-y-6">
                <div>
                    <InputLabel value="Public Key" />
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
                        Pass this as the <code className="bg-gray-100 px-1 py-0.5 rounded">apiKey</code> when initializing the SDK. Safe to embed in client-side code.
                    </p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Install
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Copy and paste this snippet into the page where you
                        want the ID check flow to appear.
                    </p>
                    <CodeBlock code={installSnippet} />
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Resources
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a
                                href="https://getverdict.com/help/docs/js"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                JS SDK reference docs
                            </a>
                            <span className="text-gray-500">
                                {' '}
                                — full configuration options and event hooks.
                            </span>
                        </li>
                        <li>
                            <a
                                href="https://getverdict.com/help/sdk-playground"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                SDK playground
                            </a>
                            <span className="text-gray-500">
                                {' '}
                                — try the SDK live before wiring it up.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </Card>
    );
}
