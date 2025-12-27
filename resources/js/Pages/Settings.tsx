import { useState, useEffect, FormEventHandler } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Tabs from '@/Components/Tabs';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Appearance from '@/Components/Settings/Appearance';
import Notifications from '@/Components/Settings/Notifications';
import DevTools from '@/Components/Settings/DevTools';
import Rules from '@/Components/Settings/Rules';
import Billing from '@/Components/Settings/Billing';
import BigCommerceSettings from '@/Components/Settings/BigCommerce';
import Modal from '@/Components/Modal';

interface Reminder {
    id: string;
    delay: { interval: number; unit: 'hours' | 'days' };
    subject: string;
    body: string;
}

interface ShopSettings {
    // Appearance
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
    imageUrl?: string;
    imagePublicId?: string;
    primaryColor?: string;
    primaryButtonColor?: string;
    buttonTextColor?: string;

    // Notifications
    automaticRemindersEnabled?: boolean;
    automaticRemindersSchedule?: Reminder[];
    contactEmail?: string;
    contactEmails?: string[];

    // DevTools
    webhookEnabled?: boolean;
    webhookUrl?: string;
    webhookSecret?: string;

    // BigCommerce
    bc?: {
        clientId?: string;
        clientSecret?: string;
        accessToken?: string;
        apiPath?: string;
    };

    // Rules
    idCheckType?: string;
    includeBackId?: boolean;
    minimumAgeEnabled?: boolean;
    minimumAge?: number | string;
    crossCheckCustomerLastName?: boolean;
    crossCheckNameThreshold?: number;
    crossCheckBillingAddress?: boolean;
    crossCheckShippingName?: boolean;
    crossCheckShippingAddress?: boolean;
    signatureRequired?: boolean;
    sms2faRequired?: boolean;
    caAb1253Required?: boolean;
    proofOfAddressRequired?: boolean;
}

interface Shop {
    id: number;
    name: string;
    api_key?: string;
    licenseKey?: string;
    subscriptionPlan?: string;
    freeSignatures?: boolean;
    pricePerSms2fa?: number | string;
}

interface ShopData {
    settings?: ShopSettings;
    licenseKey?: string;
}

interface Subscription {
    id: string;
    status: string;
    current_period_end: number;
    cancel_at_period_end: boolean;
    items: {
        data: Array<{
            id: string;
            price: {
                id: string;
                product: string | { name?: string; description?: string };
                unit_amount: number;
                currency: string;
                recurring?: {
                    interval: string;
                    interval_count: number;
                };
            };
        }>;
    };
}

interface PageProps {
    shop: Shop;
    shopData: ShopData;
    subscription?: Subscription | null;
    toast?: {
        message?: string;
        status?: 'success' | 'error';
    };
}

export default function Settings() {
    const { shop, shopData, subscription, toast } = usePage<{ props: PageProps }>().props as unknown as PageProps;

    // Check URL params for initial tab (e.g., from billing redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const initialTab = urlParams.get('tab') || 'appearance';
    const [activeTab, setActiveTab] = useState(initialTab);

    const settings = shopData?.settings || {};

    const { data, setData, patch, errors, processing, recentlySuccessful, isDirty, reset, setDefaults } =
        useForm<ShopSettings>({
            // Appearance
            defaultContent: settings.defaultContent || '',
            emailContent: settings.emailContent || {
                customer: { check: {} },
            },
            // Construct imageUrl from imagePublicId if not directly available
            imageUrl: settings.imageUrl || (settings.imagePublicId
                ? `https://res.cloudinary.com/tinyhouse/image/upload/${settings.imagePublicId}`
                : ''),
            imagePublicId: settings.imagePublicId || '',
            primaryColor: settings.primaryColor || '#007DCC',
            primaryButtonColor: settings.primaryButtonColor || '',
            buttonTextColor: settings.buttonTextColor || '#ffffff',

            // Notifications
            automaticRemindersEnabled:
                settings.automaticRemindersEnabled || false,
            automaticRemindersSchedule:
                settings.automaticRemindersSchedule || [],
            contactEmail: settings.contactEmail || '',
            contactEmails: settings.contactEmails || [''],

            // DevTools
            webhookEnabled: settings.webhookEnabled || false,
            webhookUrl: settings.webhookUrl || '',
            webhookSecret: settings.webhookSecret || '',

            // BigCommerce
            bc: settings.bc || {
                clientId: '',
                clientSecret: '',
                accessToken: '',
                apiPath: '',
            },

            // Rules
            idCheckType: settings.idCheckType || 'id',
            includeBackId: settings.includeBackId || false,
            minimumAgeEnabled: settings.minimumAgeEnabled || false,
            minimumAge: settings.minimumAge || 21,
            crossCheckCustomerLastName: settings.crossCheckCustomerLastName || false,
            crossCheckNameThreshold: settings.crossCheckNameThreshold || 0.7,
            crossCheckBillingAddress: settings.crossCheckBillingAddress || false,
            crossCheckShippingName: settings.crossCheckShippingName || false,
            crossCheckShippingAddress: settings.crossCheckShippingAddress || false,
            signatureRequired: settings.signatureRequired || false,
            sms2faRequired: settings.sms2faRequired || false,
            caAb1253Required: settings.caAb1253Required || false,
            proofOfAddressRequired: settings.proofOfAddressRequired || false,
        });

    const tabs = [
        { id: 'appearance', label: 'Appearance' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'rules', label: 'Rules' },
        { id: 'bigcommerce', label: 'BigCommerce' },
        { id: 'billing', label: 'Billing' },
        { id: 'devtools', label: 'Dev Tools' },
    ];

    // Unsaved changes modal state
    const [showUnsavedModal, setShowUnsavedModal] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

    // Warn before browser close/refresh if there are unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);

    // Intercept Inertia navigation if there are unsaved changes
    // But allow form submissions (PATCH/POST/PUT/DELETE) to proceed
    useEffect(() => {
        const removeListener = router.on('before', (event) => {
            const method = event.detail.visit.method.toLowerCase();
            const isFormSubmission = ['patch', 'post', 'put', 'delete'].includes(method);

            if (isDirty && !showUnsavedModal && !isFormSubmission) {
                event.preventDefault();
                setPendingNavigation(event.detail.visit.url.toString());
                setShowUnsavedModal(true);
                return false;
            }
        });
        return () => removeListener();
    }, [isDirty, showUnsavedModal]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('settings.update'), {
            preserveScroll: true,
            onSuccess: () => {
                // Update initial values to current data
                // This makes isDirty = false since current === initial
                setDefaults(data);
            },
        });
    };

    // Modal action handlers
    const handleSaveAndLeave = () => {
        patch(route('settings.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setDefaults(data);
                setShowUnsavedModal(false);
                if (pendingNavigation) {
                    router.visit(pendingNavigation);
                }
            },
        });
    };

    const handleDiscardAndLeave = () => {
        reset();
        setShowUnsavedModal(false);
        if (pendingNavigation) {
            router.visit(pendingNavigation);
        }
    };

    const handleCancelNavigation = () => {
        setShowUnsavedModal(false);
        setPendingNavigation(null);
    };

    const shopWithLicenseKey = {
        ...shop,
        licenseKey: shopData?.licenseKey || shop.api_key,
        subscriptionPlan: (shopData as any)?.subscriptionPlan,
        freeSignatures: (shopData as any)?.freeSignatures,
        pricePerSms2fa: (shopData as any)?.pricePerSms2fa,
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Settings
                    </h2>
                </div>
            }
        >
            <form onSubmit={submit}>
                {/* Sticky Action Bar when form is dirty */}
                {isDirty && (
                    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    You have unsaved changes
                                </p>
                                <div className="flex items-center gap-3">
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => reset()}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? 'Saving...'
                                            : 'Save Settings'}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="bg-green-50 border border-green-200 rounded-md p-4">
                            <p className="text-sm text-green-700">
                                Settings saved successfully!
                            </p>
                        </div>
                    </div>
                </Transition>

                {/* Error Message from Server */}
                {toast?.status === 'error' && toast?.message && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <p className="text-sm text-red-700">
                                {toast.message}
                            </p>
                        </div>
                    </div>
                )}

                <div className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Tabs
                            tabs={tabs}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />

                        <div className="mt-6">
                            {activeTab === 'appearance' && (
                                <Appearance
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            )}

                            {activeTab === 'notifications' && (
                                <Notifications
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            )}

                            {activeTab === 'rules' && (
                                <Rules
                                    shop={shopWithLicenseKey}
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            )}

                            {activeTab === 'bigcommerce' && (
                                <BigCommerceSettings
                                    data={data}
                                    setData={setData}
                                />
                            )}

                            {activeTab === 'billing' && (
                                <Billing
                                    shop={{
                                        email: (shopData as any)?.email,
                                        name: shop.name,
                                        contactEmail: (shopData as any)?.contactEmail,
                                    }}
                                    subscription={subscription}
                                />
                            )}

                            {activeTab === 'devtools' && (
                                <DevTools
                                    shop={shopWithLicenseKey}
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </form>

            {/* Unsaved Changes Modal */}
            <Modal
                show={showUnsavedModal}
                onClose={handleCancelNavigation}
                title="Unsaved Changes"
                primaryAction={{
                    label: 'Save Changes',
                    onClick: handleSaveAndLeave,
                    status: 'primary',
                }}
            >
                <p>You have unsaved changes. Would you like to save them before leaving?</p>
                <div className="mt-4 flex gap-3">
                    <button
                        type="button"
                        onClick={handleDiscardAndLeave}
                        className="text-sm text-red-600 hover:text-red-800"
                    >
                        Discard Changes
                    </button>
                    <button
                        type="button"
                        onClick={handleCancelNavigation}
                        className="text-sm text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
