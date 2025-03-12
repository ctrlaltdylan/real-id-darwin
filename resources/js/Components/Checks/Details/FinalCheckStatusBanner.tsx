import Banner from '@/Components/Banner';
import { Check } from 'types/Check';

type FinalCheckStatusBannerProps = {
    check: Check;
    shop?: {
        shopName?: string;
    };
};

export default function FinalCheckStatusBanner({
    check,
    shop,
}: FinalCheckStatusBannerProps) {
    return (
        <>
            {check.step === 'completed' &&
                check.job?.result?.success &&
                !check.step_manually_overridden && (
                    <div className="mb-4">
                        <Banner title="ID Check Passed" status="success">
                            <p>This ID has been automatically verified.</p>
                            <p>
                                Review the authenticity scores & photos
                                submitted by this customer in the sections
                                below.
                            </p>
                        </Banner>
                    </div>
                )}
            {check.step === 'completed' &&
                check.job?.result?.success &&
                check.step_manually_overridden && (
                    <div className="mb-4">
                        <Banner
                            title="ID Check Manually Verified"
                            status="success"
                        >
                            <p>This ID has been manually verified.</p>
                            <p>
                                The photos and details below have been manually
                                verified by a member of {shop?.shopName}.
                            </p>
                            {check.plan === 'lite' && (
                                <p>
                                    No automatic ID verification algorithms were
                                    applied to this ID check.
                                </p>
                            )}
                        </Banner>
                    </div>
                )}
            {/* TODO: if check.step.manually_overridden === true, show feedback to the merchant it was overridden */}
            {check.step === 'completed' &&
                check.job?.result?.success === false &&
                !check.step_manually_overridden && (
                    <div className="mb-4">
                        <Banner title="ID Check Failed" status="critical">
                            <p>
                                We could not definitively verify this ID. The
                                warnings for each area are listed in the check
                                details.
                            </p>
                            <p>
                                We have not canceled this order automatically.
                                We leave fulfillment and cancellation up to your
                                judgement.
                            </p>
                        </Banner>
                    </div>
                )}
            {check.step === 'completed' &&
                check.job?.result?.success === false &&
                check.step_manually_overridden && (
                    <div className="mb-4">
                        <Banner
                            title="ID Check Manually Rejected"
                            status="critical"
                        >
                            <p>
                                The photos and details below have been manually
                                rejected by a member of {shop?.shopName}.
                            </p>
                            <p>
                                We have not canceled this order automatically.
                                We leave fulfillment and cancellation up to your
                                judgement.
                            </p>
                            {check.plan === 'lite' && (
                                <p>
                                    No automatic ID verification algorithms were
                                    applied to this ID check.
                                </p>
                            )}
                        </Banner>
                    </div>
                )}
        </>
    );
}
