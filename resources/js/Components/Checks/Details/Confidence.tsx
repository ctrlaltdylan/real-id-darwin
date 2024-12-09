import ConfidenceDetails from '@/Components/Checks/Details/ConfidenceDetails';
import ConfidenceGauge from '@/Components/Checks/Details/ConfidenceGauge';
// import type { Check } from 'types/Check';

type Props = {
    check: Check;
};

const Confidence = ({ check }: Props) => {
    const idConfidence =
        typeof check.job?.result?.confidences.id === 'number'
            ? check.job.result.confidences.id
            : null;
    const selfieConfidence =
        typeof check.job?.result?.confidences.selfie === 'number' &&
        check.idCheckType === 'idv'
            ? check.job.result.confidences.selfie
            : null;
    const faceMatchConfidence =
        typeof check.job?.result?.confidences.faceMatch === 'number' &&
        check.idCheckType === 'idv'
            ? check.job.result.confidences.faceMatch
            : null;
    const arr = [idConfidence, selfieConfidence, faceMatchConfidence].filter(
        (n) => n !== null,
    );

    const min = Math.min(...arr);
    if (arr.length === 0) return <></>;

    return (
        <div className="mb-6 px-4">
            <div className="items-top mb-0 mt-3 flex justify-between">
                <div className="mt-4">
                    <div className="text-3xl font-semibold text-slate-700">
                        {(min * 100).toFixed(2)}%
                    </div>
                    <div className="text-lg text-slate-600">
                        Authenticity Confidence Score™
                    </div>
                    <ConfidenceDetails check={check} />
                </div>
                <ConfidenceGauge value={parseInt((min * 100).toFixed(2))} />
            </div>
        </div>
    );
};

export default Confidence;
