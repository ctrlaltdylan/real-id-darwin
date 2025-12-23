import { useState } from 'react';
import Card from '@/Components/Card';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Switch from '@/Components/Switch';
import SecondaryButton from '@/Components/SecondaryButton';
import ReminderList from './ReminderList';
import ReminderEditor from './ReminderEditor';
import { PlusIcon } from '@heroicons/react/24/outline';
import { nanoid } from 'nanoid';

interface Reminder {
    id: string;
    delay: { interval: number; unit: 'hours' | 'days' };
    subject: string;
    body: string;
}

interface CustomerNotificationsProps {
    data: {
        automaticRemindersEnabled?: boolean;
        automaticRemindersSchedule?: Reminder[];
        contactEmail?: string;
    };
    setData: (key: string, value: any) => void;
    errors?: Record<string, string>;
}

const defaultReminders: Reminder[] = [
    {
        id: nanoid(5),
        delay: { interval: 2, unit: 'hours' },
        subject: 'ID verification required for your order [orderId]',
        body: `Hi [firstName],

This is a reminder that ID verification is still required for your order to process.

Please complete your ID check as soon as possible for prompt shipment.`,
    },
    {
        id: nanoid(5),
        delay: { interval: 24, unit: 'hours' },
        subject: 'Reminder: Complete your ID verification for order [orderId]',
        body: `Hi [firstName],

We noticed you haven't completed ID verification for your order yet.

Your order is on hold until verification is complete. Please complete your ID check to avoid any delays.`,
    },
];

export default function CustomerNotifications({
    data,
    setData,
    errors = {},
}: CustomerNotificationsProps) {
    const [editingReminder, setEditingReminder] = useState<Reminder | null>(
        null,
    );
    const [showReminderEditor, setShowReminderEditor] = useState(false);

    const reminders = data.automaticRemindersSchedule || defaultReminders;

    const handleAddReminder = () => {
        setEditingReminder(null);
        setShowReminderEditor(true);
    };

    const handleEditReminder = (id: string) => {
        const reminder = reminders.find((r) => r.id === id);
        if (reminder) {
            setEditingReminder(reminder);
            setShowReminderEditor(true);
        }
    };

    const handleSaveReminder = (reminder: Reminder) => {
        let newReminders: Reminder[];

        if (reminder.id && reminders.some((r) => r.id === reminder.id)) {
            // Update existing
            newReminders = reminders.map((r) =>
                r.id === reminder.id ? reminder : r,
            );
        } else {
            // Add new
            newReminders = [...reminders, { ...reminder, id: nanoid(5) }];
        }

        setData('automaticRemindersSchedule', newReminders);
        setShowReminderEditor(false);
        setEditingReminder(null);
    };

    const handleDeleteReminder = (id: string) => {
        const newReminders = reminders.filter((r) => r.id !== id);
        setData('automaticRemindersSchedule', newReminders);
    };

    return (
        <>
            <Card title="Automatic Reminder Emails">
                <div className="space-y-6">
                    <Switch
                        checked={data.automaticRemindersEnabled || false}
                        onChange={(checked) =>
                            setData('automaticRemindersEnabled', checked)
                        }
                        label="Enable Automatic Reminders"
                        description="Automatically send reminder emails to customers who haven't completed their ID verification. Reminders are sent based on the schedule you configure below."
                    />

                    {data.automaticRemindersEnabled && (
                        <>
                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-medium text-gray-900">
                                        Reminder Schedule
                                    </h3>
                                    <SecondaryButton
                                        type="button"
                                        onClick={handleAddReminder}
                                    >
                                        <PlusIcon className="h-4 w-4 mr-2" />
                                        Add Reminder
                                    </SecondaryButton>
                                </div>

                                <ReminderList
                                    reminders={reminders}
                                    onEdit={handleEditReminder}
                                    onDelete={handleDeleteReminder}
                                />
                            </div>
                        </>
                    )}
                </div>
            </Card>

            <Card title="Customer Support Email" className="mt-6">
                <p className="text-sm text-gray-500 mb-4">
                    Each ID check email to your customers contains a link to
                    your support email address. Choose your main support email
                    inbox, or set up a dedicated inbox for verification support.
                </p>

                <div>
                    <InputLabel
                        htmlFor="contactEmail"
                        value="Support Email Address"
                    />
                    <TextInput
                        id="contactEmail"
                        type="email"
                        className="mt-1 block w-full max-w-md"
                        value={data.contactEmail || ''}
                        onChange={(e) =>
                            setData('contactEmail', e.target.value)
                        }
                        placeholder="support@example.com"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        {data.contactEmail
                            ? `Customers will be shown a link to ${data.contactEmail} for support.`
                            : "By default, your store's contact email address will be used."}
                    </p>
                    <InputError
                        message={errors.contactEmail}
                        className="mt-2"
                    />
                </div>
            </Card>

            <ReminderEditor
                reminder={editingReminder}
                isOpen={showReminderEditor}
                onClose={() => {
                    setShowReminderEditor(false);
                    setEditingReminder(null);
                }}
                onSave={handleSaveReminder}
            />
        </>
    );
}
