import Card from '@/Components/Card';
import IdCheckOption from './IdCheckOption';
import AgeRequirements from './AgeRequirements';
import ConsistencyChecks from './ConsistencyChecks';
import AdditionalRequirements from './AdditionalRequirements';

// Icons for ID Check Options
function IdCardIcon() {
    return (
        <svg
            className="w-12 h-12"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm2 2h3v3H6V8zm0 5h8v2H6v-2zm10-3h2v5h-2v-5z" />
        </svg>
    );
}

function IdAndHeadshotIcon() {
    return (
        <div className="flex items-center gap-2">
            <svg
                className="w-10 h-10"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm2 2h3v3H6V8zm0 5h8v2H6v-2zm10-3h2v5h-2v-5z" />
            </svg>
            <span className="text-gray-400">+</span>
            <svg
                className="w-10 h-10"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="12" cy="8" r="4" />
                <path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
            </svg>
        </div>
    );
}

interface Shop {
    id: number;
    subscriptionPlan?: string;
    freeSignatures?: boolean;
    pricePerSms2fa?: number | string;
}

interface RulesProps {
    shop: Shop;
    data: {
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
    };
    setData: (key: string, value: any) => void;
    errors?: Record<string, string>;
}

export default function Rules({ shop, data, setData, errors = {} }: RulesProps) {
    return (
        <div className="space-y-6">
            {/* ID Photo Requirements */}
            <Card title="ID Photo Requirements">
                <div className="flex flex-col sm:flex-row gap-4">
                    <IdCheckOption
                        selected={data.idCheckType === 'id'}
                        onClick={() => setData('idCheckType', 'id')}
                        title="ID Only"
                        icons={<IdCardIcon />}
                        subtitle="More convenient"
                        helperText="Only require a photo of the customer's valid ID. The ID will be scanned for authenticity."
                    />
                    <IdCheckOption
                        selected={data.idCheckType === 'idv'}
                        onClick={() => setData('idCheckType', 'idv')}
                        title="ID and Headshot"
                        icons={<IdAndHeadshotIcon />}
                        subtitle="More secure"
                        helperText="The face in the headshot will be cross referenced with the face photo on the ID document. Also includes the ID authenticity scan."
                    />
                </div>

                <div className="mt-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={data.includeBackId || false}
                            onChange={(e) =>
                                setData('includeBackId', e.target.checked)
                            }
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                            Capture the back of the customer's ID
                        </span>
                    </label>
                </div>
            </Card>

            {/* Age Requirements */}
            <Card title="Age Requirements">
                <AgeRequirements
                    minimumAgeEnabled={data.minimumAgeEnabled || false}
                    minimumAge={data.minimumAge || 21}
                    onMinimumAgeEnabledChange={(enabled) =>
                        setData('minimumAgeEnabled', enabled)
                    }
                    onMinimumAgeChange={(age) => setData('minimumAge', age)}
                />
            </Card>

            {/* ID to Order Consistency Checks */}
            <Card title="ID to Order Consistency Checks">
                <ConsistencyChecks
                    subscriptionPlan={shop?.subscriptionPlan}
                    crossCheckCustomerLastName={
                        data.crossCheckCustomerLastName || false
                    }
                    crossCheckNameThreshold={data.crossCheckNameThreshold || 0.7}
                    crossCheckBillingAddress={
                        data.crossCheckBillingAddress || false
                    }
                    crossCheckShippingName={data.crossCheckShippingName || false}
                    crossCheckShippingAddress={
                        data.crossCheckShippingAddress || false
                    }
                    onCrossCheckCustomerLastNameChange={(checked) =>
                        setData('crossCheckCustomerLastName', checked)
                    }
                    onCrossCheckNameThresholdChange={(value) =>
                        setData('crossCheckNameThreshold', value)
                    }
                    onCrossCheckBillingAddressChange={(checked) =>
                        setData('crossCheckBillingAddress', checked)
                    }
                    onCrossCheckShippingNameChange={(checked) =>
                        setData('crossCheckShippingName', checked)
                    }
                    onCrossCheckShippingAddressChange={(checked) =>
                        setData('crossCheckShippingAddress', checked)
                    }
                />
            </Card>

            {/* Additional Verification Requirements */}
            <Card title="Additional Verification Requirements">
                <AdditionalRequirements
                    freeSignatures={shop?.freeSignatures}
                    pricePerSms2fa={shop?.pricePerSms2fa}
                    signatureRequired={data.signatureRequired || false}
                    sms2faRequired={data.sms2faRequired || false}
                    caAb1253Required={data.caAb1253Required || false}
                    proofOfAddressRequired={data.proofOfAddressRequired || false}
                    onSignatureRequiredChange={(checked) =>
                        setData('signatureRequired', checked)
                    }
                    onSms2faRequiredChange={(checked) =>
                        setData('sms2faRequired', checked)
                    }
                    onCaAb1253RequiredChange={(checked) =>
                        setData('caAb1253Required', checked)
                    }
                    onProofOfAddressRequiredChange={(checked) =>
                        setData('proofOfAddressRequired', checked)
                    }
                />
            </Card>
        </div>
    );
}
