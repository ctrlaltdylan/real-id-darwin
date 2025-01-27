import { useEffect, useState } from 'react';
import { stepsToTitlesMapping } from '../../../constants';
import { generateAvailableSteps } from '../../../helpers';

export default function Progress({ check }) {
    const [availableSteps, setAvailableSteps] = useState([]);
    const [activeStepIndex, setActiveStepIndex] = useState(0);

    useEffect(() => {
        if (!check) return;
        const availableSteps = generateAvailableSteps(check);
        console.debug('availableSteps ', availableSteps);
        const titles = availableSteps.map((step) => stepsToTitlesMapping[step]);
        console.debug('titles ', titles);
        setAvailableSteps(titles);
        setActiveStepIndex(availableSteps.indexOf(check.step));
    }, [check]);

    return (
        <div className="my-4 flex items-start justify-evenly">
            {availableSteps.map((step, idx) => (
                <div
                    key={step}
                    className="relative flex flex-1 flex-col items-center justify-center"
                >
                    <span
                        className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full p-3 ${
                            idx > activeStepIndex
                                ? 'bg-slate-300 text-white'
                                : 'bg-blue-400 text-white'
                        }`}
                    >
                        {idx + 1}
                    </span>
                    <div
                        className={`hidden text-center text-base md:block ${
                            idx > activeStepIndex
                                ? 'text-slate-400'
                                : 'text-slate-700'
                        }`}
                    >
                        {step}
                    </div>

                    {idx !== 0 && (
                        <div
                            className={`absolute left-0 right-[50%] top-4 mr-5 h-1 border-b-0 border-l-0 border-r-0 border-t border-solid ${
                                idx > activeStepIndex
                                    ? 'border-t-slate-300'
                                    : 'border-t-slate-500'
                            }`}
                        ></div>
                    )}

                    {idx !== availableSteps.length - 1 && (
                        <div
                            className={`absolute left-[50%] right-0 top-4 ml-5 h-1 border-b-0 border-l-0 border-r-0 border-t border-solid ${
                                idx > activeStepIndex
                                    ? 'border-t-slate-300'
                                    : 'border-t-slate-500'
                            }`}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
}
