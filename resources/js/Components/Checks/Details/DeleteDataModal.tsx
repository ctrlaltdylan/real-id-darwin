import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import { router } from '@inertiajs/react';
import { Check } from 'types/Check';

export default function DeleteDataModal({
    open,
    onClose,
    check,
}: {
    open: boolean;
    onClose: () => void;
    check: Check;
}) {
    return (
        <Modal show={open} onClose={onClose} title="Delete Customer Photos">
            <div className="my-2">
                <p>Delete photos uploaded by the customer for this ID check?</p>
                <p>
                    This action cannot be undone. The photos are deleted
                    permanently.
                </p>
            </div>
            <Button
                status="error"
                onAction={() => {
                    router.post(route('checks.delete_data', check.id));
                }}
            >
                Delete Photos
            </Button>
        </Modal>
    );
}
