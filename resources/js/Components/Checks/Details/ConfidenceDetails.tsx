import useShop from '@/Components/Hooks/useShop';
import clsx from 'clsx';
import * as React from 'react';

type Props = {
    check: any; // Removed specific Check type
};

const THRESHHOLD = 0.9;

type Descriptions = {
    faceMatch: string;
    idMatch: string;
    idQuality: string;
    nameMatch: string;
    selfie: string;
    idGlareQuality: string;
    id: string;
    idExpired: string;
    birthDateMatch: string;
    selfieSunglasses: string;
    selfieEyeglasses: string;
};

type DescriptionType = keyof Descriptions;

const DESCRIPTIONS: Descriptions = {
    faceMatch: 'confident submitted ID matches the submitted headshot',
    idMatch: 'confidence score for matching data on the id',
    idQuality: 'rating for ID image quality',
    nameMatch: 'confidence score for matching names',
    selfie: 'rating for a high-quality headshot',
    idGlareQuality: 'rating for a glare-free ID photo',
    id: 'confident of ID authenticity',
    idExpired: 'confident of ID expiration date.',
    birthDateMatch: 'confidence score for matching birth dates',
    selfieSunglasses: 'confidence score for selfie with sunglasses',
    selfieEyeglasses: 'confidence score for selfie with eyeglasses',
};

const ConfidenceDetails = ({ check }: Props) => {
    console.log(check);
    const scores = Object.keys(check.job.result.confidences)
        .filter(
            (type: DescriptionType) =>
                !['idQuality', 'idOcr', 'idProof'].includes(type),
        ) // disabling idQuality for now, it's showing under .90 confidence, yet jobs pass
        .map((type: string) => ({
            type,
            // @ts-ignore
            description: DESCRIPTIONS[type],
            // @ts-ignore
            score: check.job.result.confidences[type],
        }))
        .filter((score) => score.score !== null)
        .sort((a, b) => b.score - a.score);

    const [detailsVisible, setDetailsVisible] = React.useState(false);

    const { shop } = useShop();

    return (
        <>
            <button
                className="cursor-pointer border-0 bg-transparent p-0 text-blue-400 underline"
                onClick={() => setDetailsVisible(!detailsVisible)}
            >
                {detailsVisible ? 'Hide' : 'Show'} breakdown
            </button>

            {detailsVisible && (
                <ul className="mb-8 mt-2 pl-5">
                    {scores.map(({ type, description, score }) => (
                        <li
                            key={type}
                            className={clsx({
                                'mb-1 text-base': true,
                                'text-slate-700':
                                    score >
                                        shop?.settings
                                            ?.customConfidenceThreshold ||
                                    THRESHHOLD,
                                'text-red-700':
                                    score <=
                                        shop?.settings
                                            ?.customConfidenceThreshold ||
                                    THRESHHOLD,
                            })}
                        >
                            <strong>{(score * 100).toFixed(2)}%</strong>{' '}
                            {description}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default ConfidenceDetails;
