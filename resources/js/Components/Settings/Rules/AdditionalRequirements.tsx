interface AdditionalRequirementsProps {
    freeSignatures?: boolean;
    pricePerSms2fa?: number | string;
    signatureRequired: boolean;
    sms2faRequired: boolean;
    caAb1253Required: boolean;
    proofOfAddressRequired: boolean;
    onSignatureRequiredChange: (checked: boolean) => void;
    onSms2faRequiredChange: (checked: boolean) => void;
    onCaAb1253RequiredChange: (checked: boolean) => void;
    onProofOfAddressRequiredChange: (checked: boolean) => void;
}

const DEFAULT_PRICE_PER_SMS_2FA = 0.10;

// Signature SVG Icon
function SignatureIcon() {
    return (
        <svg
            height="40px"
            width="40px"
            fill="#6B7280"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 100 66.945"
            className="mb-3"
        >
            <path d="M54.368,24.4c-5.096-0.137-10.105,1.83-15.208,1.597c-0.31-0.014-1.131-0.245-1.546-0.406  c0.418-0.65,0.868-1.138,1.557-1.795c3.542-3.38,7.989-5.691,12.018-8.414c2.863-1.935,4.945-6.442,0.613-8.093  c-2.026-0.771-4.333-0.318-6.405-0.029c-2.885,0.404-5.716,1.152-8.489,2.034c-3.94,1.252-7.918,2.963-11.528,5.003  c-2.514,1.421-6.229,3.652-5.543,7.056c0.343,1.714,2.723,1.455,3.204,0c0.251-0.758,2.113-1.527,2.729-1.879  c1.401-0.802,2.906-1.428,4.379-2.083c3.989-1.77,8.124-3.214,12.366-4.241c1.287-0.312,2.614-0.601,3.949-0.785  c-1.335,0.912-2.676,1.814-3.989,2.757c-3.035,2.181-9.955,6.418-8.729,11.012c0.711,2.668,4.502,2.651,6.625,2.5  c2.147-0.152,4.262-0.74,6.371-1.139c2.682-0.507,5.472-0.665,7.954-1.889C55.3,25.309,54.976,24.416,54.368,24.4z"></path>
            <path d="M99.666,32.585h-0.23V6.773c0-3.496-2.834-6.328-6.329-6.328h-6.666V0.334c0-0.185-0.15-0.334-0.333-0.334h-3.97  c-0.183,0-0.333,0.149-0.333,0.334v0.111h-5.046V0.334c0-0.185-0.15-0.334-0.333-0.334h-2.804c-0.184,0-0.333,0.149-0.333,0.334  v0.111h-4.968V0.334C68.321,0.149,68.17,0,67.986,0H65.24c-0.185,0-0.333,0.149-0.333,0.334v0.111H6.328  C2.833,0.445,0,3.279,0,6.773v33.188c0,3.495,2.833,6.328,6.328,6.328h34.963v-2.493h-27.75V2.938h72.765v37.408v3.45v2.493h6.801  c3.322,0,6.045-2.562,6.306-5.817h0.253c0.184,0,0.334-0.15,0.334-0.334v-7.22C100,32.734,99.852,32.585,99.666,32.585z   M6.456,27.921c-2.496,0.002-4.52-2.022-4.52-4.517c0-2.496,2.024-4.519,4.52-4.519c2.496,0,4.519,2.023,4.519,4.519  C10.975,25.899,8.952,27.921,6.456,27.921z M92.586,28.02c0,0.429-0.348,0.777-0.78,0.777h-0.335c-0.429,0-0.775-0.348-0.775-0.777  v-7.429c0-0.43,0.346-0.777,0.775-0.777h0.335c0.431,0,0.78,0.347,0.78,0.777V28.02z"></path>
            <path d="M56.957,23.895c0-1.829,1.497-3.326,3.326-3.326h0.151c1.829,0,3.326,1.497,3.326,3.326l0.181,12.089  c0-1.829,1.496-3.325,3.325-3.325h0.151c1.829,0,3.326,1.496,3.326,3.325v2.081c0-1.829,1.496-3.325,3.325-3.325h0.151  c1.829,0,3.326,1.496,3.326,3.325v3.327c0-1.829,1.496-3.325,3.325-3.325h0.151c1.829,0,3.325,1.496,3.325,3.325v11.271  c0,6.222-5.969,14.282-15.088,14.282c-9.119,0-12.089-7.574-14.422-10.221S44.444,48.211,44.444,46.02s1.697-2.687,3.182-2.687  c3.958,0,9.323,5.24,9.323,5.24L56.957,23.895z"></path>
        </svg>
    );
}

// SMS Icon
function SmsIcon() {
    return (
        <svg
            height="40px"
            width="40px"
            fill="#6B7280"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            className="mb-3"
        >
            <path d="M80,10H20c-5.5,0-10,4.5-10,10v60c0,5.5,4.5,10,10,10h60c5.5,0,10-4.5,10-10V20C90,14.5,85.5,10,80,10z M85,80c0,2.75-2.25,5-5,5H20c-2.75,0-5-2.25-5-5V20c0-2.75,2.25-5,5-5h60c2.75,0,5,2.25,5,5V80z" />
            <circle cx="30" cy="30" r="2.5" />
            <circle cx="50" cy="30" r="2.5" />
            <circle cx="70" cy="30" r="2.5" />
            <rect x="20" y="45" width="60" height="2" />
            <rect x="20" y="55" width="60" height="2" />
            <rect x="20" y="65" width="35" height="2" />
            <rect x="60" y="65" width="8" height="2" />
            <rect x="72" y="65" width="8" height="2" />
        </svg>
    );
}

export default function AdditionalRequirements({
    freeSignatures,
    pricePerSms2fa,
    signatureRequired,
    sms2faRequired,
    caAb1253Required,
    proofOfAddressRequired,
    onSignatureRequiredChange,
    onSms2faRequiredChange,
    onCaAb1253RequiredChange,
    onProofOfAddressRequiredChange,
}: AdditionalRequirementsProps) {
    const sms2faPrice = pricePerSms2fa || DEFAULT_PRICE_PER_SMS_2FA;
    const isSms2faFree = sms2faPrice === 0 || sms2faPrice === '0';

    return (
        <div className="space-y-8">
            {/* E-Signature Requirement */}
            <div className="p-6 bg-gray-50 rounded-lg">
                <SignatureIcon />

                <h3 className="text-base font-medium text-gray-900 mb-2">
                    E-Signature Requirement
                </h3>

                <p className="text-sm text-gray-500 mb-4 max-w-lg">
                    Require a signature from the customer as part of their ID
                    verification check. The captured signature will be available
                    for viewing in the check details.
                </p>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={signatureRequired}
                        onChange={(e) =>
                            onSignatureRequiredChange(e.target.checked)
                        }
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                        Require the customer signature to complete an ID check
                    </span>
                </label>

                <p className="text-sm text-gray-500 mt-2 ml-6">
                    <span
                        className={freeSignatures ? 'line-through' : undefined}
                    >
                        +$0.25
                    </span>
                    {freeSignatures && (
                        <span className="ml-2">
                            Free. Complimentary inclusion.
                        </span>
                    )}
                </p>
            </div>

            {/* SMS Verification Requirement */}
            <div className="p-6 bg-gray-50 rounded-lg">
                <SmsIcon />

                <h3 className="text-base font-medium text-gray-900 mb-2">
                    SMS Verification Requirement
                </h3>

                <p className="text-sm text-gray-500 mb-4 max-w-lg">
                    Require customers to verify their phone number with a
                    6-digit code sent via SMS. This adds an extra layer of
                    security to the ID verification process.
                </p>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={sms2faRequired}
                        onChange={(e) =>
                            onSms2faRequiredChange(e.target.checked)
                        }
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                        Require SMS verification to complete an ID check
                    </span>
                </label>

                <p className="text-sm text-gray-500 mt-2 ml-6">
                    <span className={isSms2faFree ? 'line-through' : undefined}>
                        +${sms2faPrice}
                    </span>
                    {isSms2faFree && (
                        <span className="ml-2">
                            Free. Complimentary inclusion.
                        </span>
                    )}
                </p>
            </div>

            {/* California AB 1253 */}
            <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                    California AB 1253 Acknowledgment
                </h3>

                <p className="text-sm text-gray-500 mb-4 max-w-lg">
                    California law AB 1253 requires cannabis delivery services
                    to verify the age and identity of customers. Enable this to
                    require customers to acknowledge this requirement during
                    verification.
                </p>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={caAb1253Required}
                        onChange={(e) =>
                            onCaAb1253RequiredChange(e.target.checked)
                        }
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                        Require California AB 1253 acknowledgment
                    </span>
                </label>
            </div>

            {/* Proof of Address */}
            <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                    Proof of Address
                </h3>

                <p className="text-sm text-gray-500 mb-4 max-w-lg">
                    Require the customer to capture an additional document (such
                    as a utility bill or bank statement) to verify their address
                    during the ID check process.
                </p>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={proofOfAddressRequired}
                        onChange={(e) =>
                            onProofOfAddressRequiredChange(e.target.checked)
                        }
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                        Require the customer to capture an additional document
                        to complete an ID check
                    </span>
                </label>
            </div>
        </div>
    );
}
