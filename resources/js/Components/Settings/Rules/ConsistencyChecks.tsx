import { useState } from 'react';
import Collapse from '@/Components/Collapse';
import NameSimilaritySlider from './NameSimilaritySlider';

interface ConsistencyChecksProps {
    subscriptionPlan?: string;
    crossCheckCustomerLastName: boolean;
    crossCheckNameThreshold: number;
    crossCheckBillingAddress: boolean;
    crossCheckShippingName: boolean;
    crossCheckShippingAddress: boolean;
    onCrossCheckCustomerLastNameChange: (checked: boolean) => void;
    onCrossCheckNameThresholdChange: (value: number) => void;
    onCrossCheckBillingAddressChange: (checked: boolean) => void;
    onCrossCheckShippingNameChange: (checked: boolean) => void;
    onCrossCheckShippingAddressChange: (checked: boolean) => void;
}

export default function ConsistencyChecks({
    subscriptionPlan,
    crossCheckCustomerLastName,
    crossCheckNameThreshold,
    crossCheckBillingAddress,
    crossCheckShippingName,
    crossCheckShippingAddress,
    onCrossCheckCustomerLastNameChange,
    onCrossCheckNameThresholdChange,
    onCrossCheckBillingAddressChange,
    onCrossCheckShippingNameChange,
    onCrossCheckShippingAddressChange,
}: ConsistencyChecksProps) {
    const [activeTab, setActiveTab] = useState<'billing' | 'shipping'>(
        'billing'
    );
    const isLitePlan = subscriptionPlan === 'lite';

    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-500">
                Automatically reject IDs for orders that have mismatching
                details. This will help reduce fraud by ensuring the customer's
                supplied ID matches the order's details.
            </p>

            <Collapse title="Which data points are compared?">
                <div className="p-4 text-sm text-gray-600 space-y-2">
                    <p>
                        The order's <strong>Billing Address</strong>,{' '}
                        <strong>Credit Card</strong>,{' '}
                        <strong>Shipping Address</strong>, and the customer's{' '}
                        <strong>Address</strong> are included respectfully in
                        each of these checks below.
                    </p>
                    <p>
                        For example, if the Billing Address does not match the
                        address on the ID, but the customer's profiles address
                        does, then the ID will pass.
                    </p>
                    <p>
                        If none of the details match across the order or
                        customer, then the ID check will fail.
                    </p>
                </div>
            </Collapse>

            {isLitePlan && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <p className="text-sm text-yellow-800">
                        Automatic ID to order consistency checks are only
                        available with the A.I. plan.
                    </p>
                </div>
            )}

            {/* Tab navigation */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        type="button"
                        onClick={() => setActiveTab('billing')}
                        className={`
                            whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium
                            ${
                                activeTab === 'billing'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            }
                        `}
                    >
                        Billing Details
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('shipping')}
                        className={`
                            whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium
                            ${
                                activeTab === 'shipping'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            }
                        `}
                    >
                        Shipping Details
                    </button>
                </nav>
            </div>

            <div className="mt-4 space-y-4">
                {activeTab === 'billing' && (
                    <>
                        <label
                            className={`flex items-start ${isLitePlan ? 'opacity-50' : ''}`}
                        >
                            <input
                                type="checkbox"
                                disabled={isLitePlan}
                                checked={
                                    isLitePlan
                                        ? false
                                        : crossCheckCustomerLastName
                                }
                                onChange={(e) =>
                                    onCrossCheckCustomerLastNameChange(
                                        e.target.checked
                                    )
                                }
                                className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                Require the name on the ID match the customer's
                                name on the billing address
                            </span>
                        </label>

                        {crossCheckCustomerLastName && !isLitePlan && (
                            <NameSimilaritySlider
                                value={crossCheckNameThreshold * 100}
                                onChange={(value) =>
                                    onCrossCheckNameThresholdChange(value / 100)
                                }
                            />
                        )}

                        <label
                            className={`flex items-start ${isLitePlan ? 'opacity-50' : ''}`}
                        >
                            <input
                                type="checkbox"
                                disabled={isLitePlan}
                                checked={
                                    isLitePlan ? false : crossCheckBillingAddress
                                }
                                onChange={(e) =>
                                    onCrossCheckBillingAddressChange(
                                        e.target.checked
                                    )
                                }
                                className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <div className="ml-2">
                                <span className="text-sm text-gray-700">
                                    Require the address on the ID match the
                                    order's billing address
                                </span>
                                <p className="text-xs text-gray-500 mt-1">
                                    Only accept ID documents that match the
                                    order's billing address. Some documents such
                                    as passports only include the state &
                                    country fields. We'll use the most specific
                                    details available on the ID document &
                                    shipping address to make a match.
                                </p>
                            </div>
                        </label>
                    </>
                )}

                {activeTab === 'shipping' && (
                    <>
                        <label
                            className={`flex items-start ${isLitePlan ? 'opacity-50' : ''}`}
                        >
                            <input
                                type="checkbox"
                                disabled={isLitePlan}
                                checked={
                                    isLitePlan ? false : crossCheckShippingName
                                }
                                onChange={(e) =>
                                    onCrossCheckShippingNameChange(
                                        e.target.checked
                                    )
                                }
                                className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                Require the name on the ID match the customer's
                                name on the shipping address
                            </span>
                        </label>

                        {crossCheckShippingName && !isLitePlan && (
                            <NameSimilaritySlider
                                value={crossCheckNameThreshold * 100}
                                onChange={(value) =>
                                    onCrossCheckNameThresholdChange(value / 100)
                                }
                            />
                        )}

                        <label
                            className={`flex items-start ${isLitePlan ? 'opacity-50' : ''}`}
                        >
                            <input
                                type="checkbox"
                                disabled={isLitePlan}
                                checked={
                                    isLitePlan
                                        ? false
                                        : crossCheckShippingAddress
                                }
                                onChange={(e) =>
                                    onCrossCheckShippingAddressChange(
                                        e.target.checked
                                    )
                                }
                                className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <div className="ml-2">
                                <span className="text-sm text-gray-700">
                                    Require the address on the ID match the
                                    order's shipping address
                                </span>
                                <p className="text-xs text-gray-500 mt-1">
                                    Only accept ID documents that match the
                                    order's shipping address. Some documents
                                    such as passports only include the state &
                                    country fields. We'll use the most specific
                                    details available on the ID document &
                                    shipping address to make a match.
                                </p>
                            </div>
                        </label>
                    </>
                )}
            </div>
        </div>
    );
}
