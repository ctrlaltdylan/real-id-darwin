import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Reminder {
    id: string;
    delay: { interval: number; unit: 'hours' | 'days' };
    subject: string;
    body: string;
}

interface ReminderListProps {
    reminders: Reminder[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function ReminderList({
    reminders,
    onEdit,
    onDelete,
}: ReminderListProps) {
    if (reminders.length === 0) {
        return (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">
                    No reminders configured. Add a reminder to automatically
                    follow up with customers.
                </p>
            </div>
        );
    }

    const formatDelay = (delay: Reminder['delay']) => {
        const { interval, unit } = delay;
        if (interval === 1) {
            return `1 ${unit.slice(0, -1)}`;
        }
        return `${interval} ${unit}`;
    };

    return (
        <div className="space-y-3">
            {reminders.map((reminder, index) => (
                <div
                    key={reminder.id}
                    className="flex items-start justify-between p-4 bg-white border border-gray-200 rounded-lg"
                >
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                                Reminder {index + 1}
                            </span>
                            <span className="text-sm text-gray-500">
                                After {formatDelay(reminder.delay)}
                            </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {reminder.subject}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                            {reminder.body}
                        </p>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                        <button
                            type="button"
                            onClick={() => onEdit(reminder.id)}
                            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                            title="Edit reminder"
                        >
                            <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onDelete(reminder.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete reminder"
                        >
                            <TrashIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
