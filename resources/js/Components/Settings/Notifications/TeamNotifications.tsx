import Card from '@/Components/Card';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface TeamNotificationsProps {
    data: {
        contactEmails?: string[];
    };
    setData: (key: string, value: any) => void;
    errors?: Record<string, string>;
}

export default function TeamNotifications({
    data,
    setData,
    errors = {},
}: TeamNotificationsProps) {
    const emails = data.contactEmails || [''];

    const handleAddEmail = () => {
        setData('contactEmails', [...emails, '']);
    };

    const handleRemoveEmail = (index: number) => {
        const newEmails = emails.filter((_, i) => i !== index);
        setData('contactEmails', newEmails.length > 0 ? newEmails : ['']);
    };

    const handleEmailChange = (index: number, value: string) => {
        const newEmails = [...emails];
        newEmails[index] = value;
        setData('contactEmails', newEmails);
    };

    return (
        <Card title="Team Email Notifications">
            <div className="space-y-6">
                <div>
                    <h3 className="text-base font-medium text-gray-900 mb-2">
                        Email Notifications for Your Team
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                        When an ID check is completed, notification emails will
                        be sent to these email addresses. Add your team
                        members&apos; emails to keep them updated when customers
                        complete ID checks.
                    </p>

                    <div className="space-y-3">
                        {emails.map((email, index) => (
                            <div key={index} className="flex items-end gap-2">
                                <div className="flex-1">
                                    <InputLabel
                                        htmlFor={`email-${index}`}
                                        value={
                                            index === 0
                                                ? 'Primary notification email'
                                                : `Email ${index + 1}`
                                        }
                                    />
                                    <TextInput
                                        id={`email-${index}`}
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={email}
                                        onChange={(e) =>
                                            handleEmailChange(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                        placeholder="team@example.com"
                                        required={index === 0}
                                    />
                                    <InputError
                                        message={
                                            errors[`contactEmails.${index}`]
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveEmail(index)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <SecondaryButton type="button" onClick={handleAddEmail}>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Email
                        </SecondaryButton>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                        What notifications will be sent?
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                        Your team will receive email notifications when:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 ml-2">
                        <li>
                            A customer successfully completes ID verification
                        </li>
                        <li>
                            An ID check fails automatic verification and needs
                            manual review
                        </li>
                        <li>An ID check is manually approved or rejected</li>
                        <li>
                            A customer is flagged as underage based on your age
                            requirements
                        </li>
                    </ul>
                </div>
            </div>
        </Card>
    );
}
