import { useState } from 'react';
import Tabs from '@/Components/Tabs';
import InputLabel from '@/Components/InputLabel';
import Collapse from '@/Components/Collapse';
import get from 'lodash/get';

interface ContentEditorProps {
    data: {
        defaultContent?: string;
        emailContent?: {
            customer?: {
                check?: {
                    in_review?: string;
                    failed?: string;
                    completed?: string;
                };
            };
        };
    };
    setData: (key: string, value: any) => void;
    activeTab?: string;
    onTabChange?: (tab: string) => void;
}

interface ContentTab {
    id: string;
    title: string;
    fieldName: string;
    helpText: string;
    defaultContent: string;
}

const contentTabs: ContentTab[] = [
    {
        id: 'intro',
        title: 'Introduction',
        fieldName: 'defaultContent',
        helpText:
            'This content appears in both the email and ID check sent to the customer.',
        defaultContent: `Hello [firstName],

Thank you for your order!

To ensure the security of your purchase and protect against fraud, we require ID verification. This quick process helps us verify your identity.

Please click the button below to complete your ID verification. It only takes a few minutes.`,
    },
    {
        id: 'in_review',
        title: 'In Review',
        fieldName: 'emailContent.customer.check.in_review',
        helpText:
            "This email is sent when a customer's ID isn't automatically able to be verified and requires manual review.",
        defaultContent: `Hello [firstName],

We have received your ID for verification, but we were unable to automatically verify it.

A team member will be manually reviewing your case shortly.

If you have any questions, please email our customer service team.

Thank you for your patience.`,
    },
    {
        id: 'failed',
        title: 'Failed',
        fieldName: 'emailContent.customer.check.failed',
        helpText:
            'This email is sent to the customer when their ID photos have been rejected.',
        defaultContent: `Hello [firstName],

Unfortunately, after review, we were not able to verify your ID.

Please contact customer support for the status of your order and refund information if applicable.

If you have any questions or believe this is a mistake, please contact our customer support team.`,
    },
    {
        id: 'completed',
        title: 'Verified',
        fieldName: 'emailContent.customer.check.completed',
        helpText:
            'This email is sent to the customer when their ID photos have been successfully verified.',
        defaultContent: `Hello [firstName],

Thanks for completing ID verification!

Your order has been confirmed and will be processed shortly.

Thank you for helping keep our shop secure and protect against fraud.

If you have any questions, please contact our customer support.`,
    },
];

export default function ContentEditor({
    data,
    setData,
    activeTab: controlledActiveTab,
    onTabChange,
}: ContentEditorProps) {
    const [localActiveTab, setLocalActiveTab] = useState('intro');

    const activeTab = controlledActiveTab || localActiveTab;
    const setActiveTab = onTabChange || setLocalActiveTab;

    const currentTab =
        contentTabs.find((tab) => tab.id === activeTab) || contentTabs[0];

    const getFieldValue = (fieldName: string): string => {
        const value = get(data, fieldName);
        return value || currentTab.defaultContent;
    };

    const handleContentChange = (value: string) => {
        if (currentTab.fieldName === 'defaultContent') {
            setData('defaultContent', value);
        } else {
            // Handle nested emailContent fields
            const parts = currentTab.fieldName.split('.');
            if (parts.length > 1) {
                const currentEmailContent = data.emailContent || {
                    customer: { check: {} },
                };
                const newEmailContent = {
                    ...currentEmailContent,
                    customer: {
                        ...currentEmailContent.customer,
                        check: {
                            ...currentEmailContent.customer?.check,
                            [parts[parts.length - 1]]: value,
                        },
                    },
                };
                setData('emailContent', newEmailContent);
            }
        }
    };

    const tabs = contentTabs.map((tab) => ({
        id: tab.id,
        label: tab.title,
    }));

    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
                ID Check Content
            </h3>

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="mt-4">
                <p className="text-sm text-gray-500 mb-4">
                    {currentTab.helpText}
                </p>

                <Collapse title="Available Shortcodes" defaultOpen={false}>
                    <p className="text-sm text-gray-500 mb-3">
                        Use these shortcodes in your content and they will be
                        automatically replaced with actual values:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                                [firstName]
                            </code>{' '}
                            - Customer&apos;s first name
                        </div>
                        <div>
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                                [lastName]
                            </code>{' '}
                            - Customer&apos;s last name
                        </div>
                        <div>
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                                [orderId]
                            </code>{' '}
                            - Order number
                        </div>
                        <div>
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                                [shopName]
                            </code>{' '}
                            - Your store name
                        </div>
                        <div>
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                                [customerEmail]
                            </code>{' '}
                            - Customer&apos;s email
                        </div>
                        <div>
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                                [phone]
                            </code>{' '}
                            - Customer&apos;s phone
                        </div>
                    </div>
                </Collapse>

                <div className="mt-4">
                    <InputLabel htmlFor="content" value="Email Content" />
                    <textarea
                        id="content"
                        rows={7}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={getFieldValue(currentTab.fieldName)}
                        onChange={(e) => handleContentChange(e.target.value)}
                    />
                    {activeTab === 'intro' && (
                        <p className="mt-1 text-sm text-gray-500">
                            The call to action button to start ID verification
                            is automatically added to the email.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
