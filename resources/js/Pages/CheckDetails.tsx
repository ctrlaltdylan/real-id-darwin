import Card from '@/Components/Card';
import Confidence from '@/Components/Checks/Details/Confidence';
import DocumentDetails from '@/Components/Checks/Details/DocumentDetails';
import EmptyState from '@/Components/Checks/Details/EmptyState';
import EventsTimeline from '@/Components/Checks/Details/EventsTimeline';
import ImageViewer from '@/Components/Checks/Details/ImageViewer';
import Signals from '@/Components/Checks/Details/Signals';
import Layout from '@/Components/Layout';
import PageHeading from '@/Components/PageHeading';
import { ShopProvider } from '@/Components/Providers/ShopProvider';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';

import ManualApprovalModal from '@/Components/Checks/Details/ManualApprovalModal';
import useSecondaryActions from '@/Components/Checks/Details/useSecondaryActions';
import ManualRejectionModal from '@/Components/Checks/ManualRejectionModal';
import Toast from '@/Components/Toast';
import { EnvelopeIcon, FingerPrintIcon } from '@heroicons/react/20/solid';
import { Head } from '@inertiajs/react';
export default function CheckDetails({
    check,
    shop,
    toast,
}: {
    check: any;
    shop: any;
    toast: any;
}) {
    const [showManualApprovalModal, setShowManualApprovalModal] =
        useState(false);
    const [showManualRejectionModal, setShowManualRejectionModal] =
        useState(false);

    const secondaryActions = useSecondaryActions({
        check,
        onApprove: () => setShowManualApprovalModal(true),
        onReject: () => setShowManualRejectionModal(true),
        onDeletePhotos: () => {},
        onSendReminder: () => {},
        onSendNewCheck: () => {},
        onArchive: () => {},
        onUnarchive: () => {},
    });

    useEffect(() => {
        if (toast) {
            console.log({ toast });
        }
    }, [toast]);

    return (
        <ShopProvider value={{ shop }}>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Checks
                    </h2>
                }
            >
                <Head title="Dashboard" />

                <Layout>
                    <PageHeading
                        title={`${check?.firstName || 'Unnamed'} ${check?.lastName || 'Customer'}`}
                        secondaryActions={secondaryActions}
                        details={[
                            {
                                label: `Check ID: ${check.id}`,
                                Icon: FingerPrintIcon,
                            },
                            {
                                label: check.email,
                                Icon: EnvelopeIcon,
                            },
                        ]}
                    />

                    <Card>
                        {check.job?.result || check.idPhoto ? (
                            <div>
                                <Confidence check={check} />
                                <DocumentDetails check={check} />
                                <ImageViewer check={check} />
                                <Signals check={check} />
                            </div>
                        ) : (
                            <EmptyState check={check} />
                        )}
                    </Card>
                    <EventsTimeline events={check.events} />
                </Layout>
                <ManualRejectionModal
                    open={showManualRejectionModal}
                    onClose={() => setShowManualRejectionModal(false)}
                    check={check}
                />
                <ManualApprovalModal
                    open={showManualApprovalModal}
                    onClose={() => setShowManualApprovalModal(false)}
                    check={check}
                />
                {toast?.message && (
                    <Toast
                        message={toast.message}
                        status={toast.status || 'info'}
                    />
                )}
            </AuthenticatedLayout>
        </ShopProvider>
    );
}
