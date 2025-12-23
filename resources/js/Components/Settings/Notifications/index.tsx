import { useState } from 'react';
import Tabs from '@/Components/Tabs';
import CustomerNotifications from './CustomerNotifications';
import TeamNotifications from './TeamNotifications';

interface Reminder {
    id: string;
    delay: { interval: number; unit: 'hours' | 'days' };
    subject: string;
    body: string;
}

interface NotificationsProps {
    data: {
        automaticRemindersEnabled?: boolean;
        automaticRemindersSchedule?: Reminder[];
        contactEmail?: string;
        contactEmails?: string[];
    };
    setData: (key: string, value: any) => void;
    errors?: Record<string, string>;
}

export default function Notifications({
    data,
    setData,
    errors = {},
}: NotificationsProps) {
    const [activeTab, setActiveTab] = useState('customers');

    const tabs = [
        { id: 'customers', label: 'For Customers' },
        { id: 'team', label: 'For Your Team' },
    ];

    return (
        <div className="space-y-6">
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="mt-6">
                {activeTab === 'customers' && (
                    <CustomerNotifications
                        data={data}
                        setData={setData}
                        errors={errors}
                    />
                )}

                {activeTab === 'team' && (
                    <TeamNotifications
                        data={data}
                        setData={setData}
                        errors={errors}
                    />
                )}
            </div>
        </div>
    );
}
