import Badge from '@/Components/Badge';
import DocumentCell from '@/Components/Checks/Details/DocumentCell';
import MoreInfo from '@/Components/Checks/Details/MoreInfo';
import useShop from '@/Components/Hooks/useShop';
import countries from '@/Components/Misc/countries_fields';
import { formatVouchedDate } from '@/helpers';
export default function DocumentDetails({ check }: { check: any }) {
    const { shop } = useShop();
    if (
        check.plan == 'lite' ||
        !['in_review', 'completed'].includes(check.step)
    ) {
        return <></>;
    }

    return (
        <>
            <div className="mt-3 px-4 print:hidden">
                <h2 className="mb-2 text-lg font-semibold text-slate-700">
                    Document details
                </h2>

                <div className="rounded-lg border border-solid border-slate-200">
                    <div
                        className="grid grid-cols-2 py-6"
                        style={{
                            background:
                                'linear-gradient(45deg, #f8f2e4, transparent)',
                        }}
                    >
                        <div className="">
                            {check.job?.result?.firstName && (
                                <div className="px-5 py-4">
                                    <h2 className="text-sm font-semibold text-slate-600">
                                        Name
                                    </h2>
                                    <div className="text-lg text-slate-700">
                                        <span className="font-mono capitalize">{`${(
                                            check.job.result.firstName || ''
                                        )?.toLowerCase()}${
                                            check.job.result.middleName
                                                ? ` ${check.job.result.middleName?.toLowerCase()}`
                                                : ''
                                        } ${(
                                            check.job.result.lastName || ''
                                        )?.toLowerCase()}`}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="">
                            {check.job?.result?.idAddress && (
                                <div className="px-5 py-4">
                                    <div className="font-mono">
                                        {/* Vouched format */}
                                        {check.job.result.idAddress.street &&
                                            `${check.job.result.idAddress.streetNumber} ${check.job.result.idAddress.street}`}
                                        {check.job.result.idAddress.unit && (
                                            <>
                                                <br />
                                                {
                                                    check.job.result.idAddress
                                                        .unit
                                                }
                                            </>
                                        )}
                                        {check.job.result.idAddress.address &&
                                            `${check.job.result.idAddress.address}`}
                                        {check.job.result.idAddress.city && (
                                            <>
                                                <br />
                                                {`${check.job.result.idAddress.city}, ${check.job.result.idAddress.state} ${check.job.result.idAddress.postalCode}`}
                                            </>
                                        )}
                                        {check.job.result.idAddress.country &&
                                            countries.find(
                                                (c) =>
                                                    c.value ===
                                                    check?.job?.result
                                                        ?.idAddress?.country,
                                            ) && (
                                                <>
                                                    <br />
                                                    <div className="flex items-center">
                                                        {/* <img
                                                src={`https://res.cloudinary.com/tinyhouse/image/upload/c_scale,w_25/v1591141085/Country%20Flags/${countries
                                                  .find(
                                                    (c) =>
                                                      c.value ===
                                                      check?.job?.result
                                                        ?.idAddress?.country
                                                  )
                                                  .title.toLowerCase()
                                                  .replace(/ /g, "-")}.png`}
                                              /> */}
                                                        {
                                                            check.job.result
                                                                .idAddress
                                                                .country
                                                        }
                                                    </div>
                                                </>
                                            )}
                                    </div>
                                </div>
                            )}

                            {check.job?.result?.unverifiedIdAddress?.length >
                                0 &&
                                !check.job?.result?.idAddress &&
                                shop?.settings?.addressValidationEnabled && (
                                    <div className="flex items-center px-5 py-4">
                                        <div>
                                            <h2 className="text-sm font-semibold text-slate-600">
                                                Address
                                            </h2>
                                            {check.job?.result.unverifiedIdAddress.map(
                                                (line: string) => (
                                                    <div className="font-mono">
                                                        {line}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                        <MoreInfo type="danger">
                                            The detected address couldn't be
                                            validated by our system. Please
                                            review manually to ensure
                                            authenticity.
                                        </MoreInfo>
                                    </div>
                                )}

                            {check.job?.result?.unverifiedIdAddress?.length >
                                0 &&
                                !shop?.settings?.addressValidationEnabled && (
                                    <div className="flex items-center px-5 py-4">
                                        <div>
                                            <h2 className="text-sm font-semibold text-slate-600">
                                                Address
                                            </h2>
                                            {check.job?.result.unverifiedIdAddress.map(
                                                (line: string) => (
                                                    <div className="font-mono">
                                                        {line}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}

                            {!check.job?.result?.idAddress &&
                                !check.job?.result?.unverifiedIdAddress && (
                                    <div className="px-5 py-4">
                                        <p>
                                            The address could not be determined
                                            from this photo.
                                        </p>
                                    </div>
                                )}

                            {check.job?.result?.type && (
                                <div className="px-5 py-4">
                                    <h2 className="text-sm font-semibold text-slate-600">
                                        Document type
                                    </h2>
                                    <p className="font-mono capitalize text-slate-700">
                                        {check.job.result.type
                                            .toLowerCase()
                                            .replace(/-/g, ' ')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-[1px] border-b-0 border-l-0 border-r-0 border-t border-solid border-slate-300 bg-slate-300">
                        {check.job?.result?.birthDate && (
                            <DocumentCell
                                label="Birth Date"
                                value={formatVouchedDate(
                                    check.job.result.birthDate,
                                    shop?.settings?.dateFormat || 'MM/dd/yyyy',
                                )}
                            />
                        )}
                        {check.isUnderageCustomer && (
                            <Badge size="medium" status="critical">
                                UNDERAGE
                            </Badge>
                        )}
                        {check.job?.result?.expireDate && (
                            <DocumentCell
                                label="Expiration Date"
                                value={formatVouchedDate(
                                    check.job.result.expireDate,
                                    shop?.settings?.dateFormat || 'MM/dd/yyyy',
                                )}
                            />
                        )}

                        {check.job?.result?.issueDate && (
                            <DocumentCell
                                label="Issue Date"
                                value={formatVouchedDate(
                                    check.job.result.issueDate,
                                    shop?.settings?.dateFormat || 'MM/dd/yyyy',
                                )}
                            />
                        )}

                        <DocumentCell
                            label="Class"
                            value={check.job?.result?.class || 'N/A'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
