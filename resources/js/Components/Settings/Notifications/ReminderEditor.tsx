import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface Reminder {
    id: string;
    delay: { interval: number; unit: 'hours' | 'days' };
    subject: string;
    body: string;
}

interface ReminderEditorProps {
    reminder: Reminder | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (reminder: Reminder) => void;
}

export default function ReminderEditor({
    reminder,
    isOpen,
    onClose,
    onSave,
}: ReminderEditorProps) {
    const [formData, setFormData] = useState<Reminder>({
        id: '',
        delay: { interval: 2, unit: 'hours' },
        subject: 'ID verification required for your order [orderId]',
        body: `Hi [firstName],

This is a reminder that ID verification is still required for your order to process.

Please complete your ID check as soon as possible for prompt shipment.`,
    });

    useEffect(() => {
        if (reminder) {
            setFormData(reminder);
        } else {
            setFormData({
                id: '',
                delay: { interval: 2, unit: 'hours' },
                subject: 'ID verification required for your order [orderId]',
                body: `Hi [firstName],

This is a reminder that ID verification is still required for your order to process.

Please complete your ID check as soon as possible for prompt shipment.`,
            });
        }
    }, [reminder]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="lg">
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                    {reminder ? 'Edit Reminder' : 'Add Reminder'}
                </h2>

                <div className="space-y-4">
                    {/* Delay Settings */}
                    <div>
                        <InputLabel value="Send reminder after" />
                        <div className="mt-1 flex gap-2">
                            <TextInput
                                type="number"
                                min="1"
                                value={formData.delay.interval}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        delay: {
                                            ...formData.delay,
                                            interval: parseInt(
                                                e.target.value,
                                            ) || 1,
                                        },
                                    })
                                }
                                className="w-24"
                            />
                            <select
                                value={formData.delay.unit}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        delay: {
                                            ...formData.delay,
                                            unit: e.target.value as
                                                | 'hours'
                                                | 'days',
                                        },
                                    })
                                }
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="hours">hours</option>
                                <option value="days">days</option>
                            </select>
                        </div>
                    </div>

                    {/* Subject */}
                    <div>
                        <InputLabel htmlFor="subject" value="Email Subject" />
                        <TextInput
                            id="subject"
                            type="text"
                            className="mt-1 block w-full"
                            value={formData.subject}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    subject: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    {/* Body */}
                    <div>
                        <InputLabel htmlFor="body" value="Email Body" />
                        <textarea
                            id="body"
                            rows={6}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={formData.body}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    body: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    {/* Shortcodes Reference */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Available shortcodes:
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                            <div>
                                <code className="bg-gray-200 px-1 py-0.5 rounded">
                                    [firstName]
                                </code>{' '}
                                - Customer&apos;s first name
                            </div>
                            <div>
                                <code className="bg-gray-200 px-1 py-0.5 rounded">
                                    [lastName]
                                </code>{' '}
                                - Customer&apos;s last name
                            </div>
                            <div>
                                <code className="bg-gray-200 px-1 py-0.5 rounded">
                                    [orderId]
                                </code>{' '}
                                - Order number
                            </div>
                            <div>
                                <code className="bg-gray-200 px-1 py-0.5 rounded">
                                    [shopName]
                                </code>{' '}
                                - Your store name
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <SecondaryButton type="button" onClick={onClose}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton type="submit">
                        {reminder ? 'Save Changes' : 'Add Reminder'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
