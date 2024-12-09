import Badge from '@/Components/Badge';
import Modal from '@/Components/Modal';
import { router } from '@inertiajs/react';

export default function ManualRejectionModal({
    open,
    onClose,
    check,
}: {
    open: boolean;
    onClose: () => void;
    check: any;
}) {
    return (
        <Modal
            show={open}
            onClose={onClose}
            primaryAction={{
                label: 'Reject ID Check',
                onClick: () => {
                    router.post(route('checks.manually_reject', check.id));
                },
                status: 'error',
            }}
            title="Reject ID check"
        >
            <div className="my-2">
                <div className="space-y-4">
                    <p>
                        This will update the ID check's status in the Real ID
                        app to failed.
                    </p>
                    {check.customerGraphId && (
                        <p>
                            In addition the{' '}
                            <Badge status="warning" progress="completed">
                                ID check manually rejected
                            </Badge>{' '}
                            tags will be added to the customer & order on
                            Shopify.
                        </p>
                    )}
                </div>
            </div>
        </Modal>
    );
}
