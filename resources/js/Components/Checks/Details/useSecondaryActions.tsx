import { Action } from '@/Components/PageHeading';
import {
    ArchiveBoxIcon,
    ArrowPathIcon,
    CheckIcon,
    EnvelopeIcon,
    PlusIcon,
    TrashIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

import { useEffect, useState } from 'react';
export default function useSecondaryActions({
    check,
    onApprove,
    onReject,
    onDeletePhotos,
    onSendReminder,
    onSendNewCheck,
    onArchive,
    onUnarchive,
}: {
    check: any;
    onApprove: () => void;
    onReject: () => void;
    onDeletePhotos: () => void;
    onSendReminder: () => void;
    onSendNewCheck: () => void;
    onArchive: () => void;
    onUnarchive: () => void;
}) {
    const defaultPageActions: Action[] = [];
    const [pageSecondaryActions, setPageSecondaryActions] =
        useState<Action[]>(defaultPageActions);

    const approveCheckButton: Action = {
        label: 'Approve Check',
        Icon: CheckIcon,
        accessibilityLabel: 'Manually approve check',
        onAction: onApprove,
        status: 'success',
    };
    const rejectCheckButton: Action = {
        label: 'Reject Check',
        Icon: XMarkIcon,
        accessibilityLabel: 'Manually reject check',
        onAction: onReject,
        status: 'error',
    };

    const deletePhotosButton: Action = {
        label: 'Delete Customer Photos',
        Icon: TrashIcon,
        accessibilityLabel: 'Delete Customer ID & Headshot photos permanently',
        onAction: onDeletePhotos,
        status: 'error',
    };

    const sendReminderButton: Action = {
        label: 'Send Reminder',
        Icon: EnvelopeIcon,
        accessibilityLabel: 'Open the form to resend the ID check link',
        onAction: onSendReminder,
        status: 'info',
    };

    const sendNewCheckButton: Action = {
        label: 'Send New ID Check',
        Icon: PlusIcon,
        accessibilityLabel: 'Resend a new ID check to this customers',
        onAction: onSendNewCheck,
        status: 'info',
    };

    const archiveCheckButton: Action = {
        label: 'Archive Check',
        Icon: ArchiveBoxIcon,
        accessibilityLabel: 'Archive Check',
        onAction: onArchive,
        status: 'info',
    };

    const unarchiveCheckButton: Action = {
        label: 'Unarchive Check',
        Icon: ArrowPathIcon,
        accessibilityLabel: 'Unarchive Check',
        onAction: onUnarchive,
        status: 'info',
    };

    useEffect(() => {
        if (!check) return;

        let toBeAdded: Action[] = [];

        // if (hasPermission('manage_checks')) {
        toBeAdded = [
            ...toBeAdded,
            ...(!check?.job?.result?.success ? [approveCheckButton] : []),
            ...(check?.job?.result?.success !== false
                ? [rejectCheckButton]
                : []),
        ];
        // }

        if (
            check.userPhoto ||
            check.idPhoto ||
            check.backIdPhoto ||
            check.signature ||
            check.proofOfAddress
        ) {
            toBeAdded = [...toBeAdded, deletePhotosButton];
        }

        // if (!['completed', 'in_review'].includes(check.step)) {
        //     toBeAdded = [...toBeAdded, sendReminderButton];
        // }

        // if (['completed', 'in_review'].includes(check.step)) {
        //     toBeAdded = [...toBeAdded, sendNewCheckButton];
        // }

        // if (check.isArchived) {
        //     toBeAdded = [...toBeAdded, unarchiveCheckButton];
        // } else {
        //     toBeAdded = [...toBeAdded, archiveCheckButton];
        // }

        setPageSecondaryActions([...defaultPageActions, ...toBeAdded]);
    }, [check]);

    return pageSecondaryActions;
}
