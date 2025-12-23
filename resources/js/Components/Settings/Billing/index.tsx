import { useState } from 'react';
import Card from '@/Components/Card';
import StripePricingTable from './StripePricingTable';

interface SubscriptionItem {
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
}

interface Subscription {
    id: string;
    status: string;
    current_period_end: number;
    cancel_at_period_end: boolean;
    items: {
        data: SubscriptionItem[];
    };
}

interface Usage {
    currentPeriodStart: string;
    currentPeriodEnd: string;
    totalUsage: number;
}

interface BillingProps {
    shop: {
        email?: string;
        name?: string;
        contactEmail?: string;
    };
    subscription?: Subscription | null;
    usage?: Usage | null;
}

function StatusBadge({ status }: { status: string }) {
    const statusStyles: Record<string, string> = {
        active: 'bg-green-100 text-green-800',
        trialing: 'bg-blue-100 text-blue-800',
        past_due: 'bg-yellow-100 text-yellow-800',
        canceled: 'bg-red-100 text-red-800',
        unpaid: 'bg-red-100 text-red-800',
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
        >
            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
        </span>
    );
}

function ProgressBar({ percent }: { percent: number }) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(percent, 100)}%` }}
            />
        </div>
    );
}

export default function Billing({ shop, subscription, usage }: BillingProps) {
    const [openingPortal, setOpeningPortal] = useState(false);
    const [error, setError] = useState('');

    const openBillingPortal = async () => {
        setOpeningPortal(true);
        setError('');
        try {
            const response = await fetch('/settings/billing-portal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        document.querySelector<HTMLMetaElement>(
                            'meta[name="csrf-token"]'
                        )?.content || '',
                },
            });

            const data = await response.json();
            if (data.url) {
                window.open(data.url, '_blank');
            } else {
                setError('Failed to open billing portal. Please try again.');
            }
        } catch (err) {
            console.error('Error opening billing portal:', err);
            setError('Failed to open billing portal. Please try again.');
        } finally {
            setOpeningPortal(false);
        }
    };

    // No subscription - show pricing table
    if (!subscription) {
        return (
            <Card title="Billing">
                <div className="text-center py-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No Active Subscription
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                        You don't have an active subscription. Choose a plan
                        below to begin verifying IDs.
                    </p>
                </div>

                <StripePricingTable
                    shopEmail={shop.email || shop.contactEmail}
                    shopName={shop.name}
                />
            </Card>
        );
    }

    // Get plan details from subscription
    const plan = subscription.items?.data?.[0];
    const planProduct = plan?.price?.product;
    const planName =
        typeof planProduct === 'object'
            ? planProduct?.name || 'Subscription'
            : 'Subscription';
    const planDescription =
        typeof planProduct === 'object' ? planProduct?.description : undefined;
    const unitAmount = plan?.price?.unit_amount || 0;
    const currency = plan?.price?.currency?.toUpperCase() || 'USD';
    const interval = plan?.price?.recurring?.interval || 'month';

    // Format dates
    const periodEnd = new Date(subscription.current_period_end * 1000);
    const formattedPeriodEnd = periodEnd.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    // Calculate usage percentage
    const usageLimit = 1000; // Default limit
    const usagePercentage = usage
        ? Math.min((usage.totalUsage / usageLimit) * 100, 100)
        : 0;

    return (
        <div className="space-y-6">
            <Card title="Current Plan">
                {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                    <div className="space-y-4">
                        {/* Plan Name and Status */}
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {planName}
                            </h3>
                            <StatusBadge status={subscription.status} />
                        </div>

                        {planDescription && (
                            <p className="text-sm text-gray-500">
                                {planDescription}
                            </p>
                        )}

                        {/* Billing Details */}
                        <div className="space-y-1 text-sm">
                            <p>
                                <span className="font-medium">
                                    Billing Cycle:
                                </span>{' '}
                                {interval}ly
                            </p>
                            <p>
                                <span className="font-medium">
                                    Next Billing Date:
                                </span>{' '}
                                {formattedPeriodEnd}
                            </p>
                        </div>

                        {subscription.cancel_at_period_end && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                                <p className="text-sm text-yellow-800">
                                    Your subscription will be canceled on{' '}
                                    {formattedPeriodEnd}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Manage Button */}
                    <div className="text-center lg:text-right">
                        <button
                            type="button"
                            onClick={openBillingPortal}
                            disabled={openingPortal}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {openingPortal
                                ? 'Opening...'
                                : 'Manage Subscription'}
                        </button>
                        <p className="mt-2 text-xs text-gray-500">
                            Update payment, change plan, or cancel
                        </p>
                    </div>
                </div>
            </Card>

            {/* Usage Information */}
            {usage && (
                <Card title="Usage This Period">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                                ID Checks Used
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                                {usage.totalUsage} / {usageLimit}
                            </span>
                        </div>
                        <ProgressBar percent={usagePercentage} />
                        <p className="text-xs text-gray-500">
                            Resets on {formattedPeriodEnd}
                        </p>
                    </div>
                </Card>
            )}

            {/* Pricing Details */}
            <Card title="Pricing Details">
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm">
                        <span className="font-medium">Base Fee:</span> $
                        {(unitAmount / 100).toFixed(2)} {currency} / {interval}
                    </p>
                    <p className="text-sm">
                        <span className="font-medium">Usage Fee:</span> $0.08
                        per additional ID check
                    </p>
                </div>
            </Card>

            {/* Quick Actions */}
            <Card title="Quick Actions">
                <div className="flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={openBillingPortal}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        View Invoices
                    </button>
                    <button
                        type="button"
                        onClick={openBillingPortal}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update Payment Method
                    </button>
                    <button
                        type="button"
                        onClick={openBillingPortal}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Change Plan
                    </button>
                </div>
            </Card>
        </div>
    );
}
