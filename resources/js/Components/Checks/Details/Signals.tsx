// @ts-nocheck

import type { Check, Signal } from 'types/Check';

import { AiOutlineBarcode } from 'react-icons/ai';
import { BiGlasses } from 'react-icons/bi';
import { GrDocumentMissing } from 'react-icons/gr';
import {
    HiBan,
    HiOutlineCamera,
    HiOutlineExclamationCircle,
    HiOutlineLightBulb,
    HiOutlineSparkles,
    HiOutlineSun,
    HiQuestionMarkCircle,
} from 'react-icons/hi';
import { MdDevices, MdFace } from 'react-icons/md';

type Props = {
    check: Check;
};

const icons = {
    barcode: AiOutlineBarcode,
    fraud: HiOutlineExclamationCircle,
    brightness: HiOutlineLightBulb,
    deviceInfo: MdDevices,
    capture: HiOutlineCamera,
    quality: HiOutlineSparkles,
    fieldConfidence: HiQuestionMarkCircle,
    face: MdFace,
    glasses: BiGlasses,
    missingName: GrDocumentMissing,
    nonglare: HiOutlineSun,
    sticker: HiBan,
};

const phrases = {
    'Capture Type: manual': 'Automatically captured from the device camera',
    'Capture Type: automatic': 'Manually captured from the device camera',
    'Device Info: Macintosh': 'IDv performed on MacOS',
    'Device Info: iPhone': 'IDv performed on iPhone',
    'Device Info: Android': 'IDv performed on Android',
    'Device Info: Unknown Device': 'IDv performed on unknown device',
    'Barcode process was skipped': "ID barcode wasn't scanned",
};

const signalTypes = {
    nonglare: 'glare',
};

const SignalCard = ({ signal }: { signal: Signal }) => {
    const Icon = icons[signal.type];
    const message = phrases[signal.message] || signal.message;
    const type = signalTypes[signal.type] || signal.type;

    return (
        <div className="ri-flex ri-items-center ri-shadow ri-rounded-lg ri-border ri-border-solid ri-border-slate-100">
            <div className="ri-px-5">
                {Icon && <Icon className="ri-w-6 ri-h-6" />}
            </div>
            <div className="ri-py-2 ri-pr-2">
                <h3 className="ri-text-sm ri-text-slate-800 ri-font-semibold ri-capitalize">
                    {type.replace(/([a-z])([A-Z])/g, '$1 $2')}
                </h3>
                <p className="ri-text-sm ri-text-slate-600">{message}</p>
            </div>
        </div>
    );
};

const Signals = ({ check }: Props) => {
    if (!check.job?.signals || check.job.signals?.length === 0) return <></>;

    const idSignals =
        check.job.signals?.filter((s) => s.category === 'id') || [];
    const backIdSignals =
        check.job.signals?.filter((s) => s.category === 'backId') || [];
    const faceMatchSignals =
        check.job.signals?.filter((s) => s.category === 'faceMatch') || [];
    const selfieSignals =
        check.job.signals?.filter((s) => s.category === 'selfie') || [];

    return (
        <div className="ri-p-4 ri-mt-4 print:hidden">
            <h2 className="ri-text-lg ri-mb-4 ri-font-semibold">Signals</h2>

            {idSignals.length > 0 && (
                <div>
                    <h3 className="ri-text-sm ri-text-slate-600 ri-font-semibold ri-mb-3">
                        Front of ID document
                    </h3>
                    <div className="ri-grid ri-gap-4 ri-grid-cols-2 ri-mb-10">
                        {idSignals.map((signal) => (
                            <SignalCard
                                key={`${signal.type}-${signal.category}`}
                                signal={signal}
                            />
                        ))}
                    </div>
                </div>
            )}

            {backIdSignals.length > 0 && (
                <div>
                    <h3 className="ri-text-sm ri-text-slate-600 ri-font-semibold ri-mb-3">
                        Back of ID document
                    </h3>
                    <div className="ri-grid ri-gap-4 ri-grid-cols-2 ri-mb-10">
                        {backIdSignals.map((signal) => (
                            <SignalCard
                                key={`${signal.type}-${signal.category}`}
                                signal={signal}
                            />
                        ))}
                    </div>
                </div>
            )}

            {faceMatchSignals.length > 0 && (
                <div>
                    <h3 className="ri-text-sm ri-text-slate-600 ri-font-semibold ri-mb-3">
                        Facial match
                    </h3>
                    <div className="ri-grid ri-gap-4 ri-grid-cols-2 ri-mb-10">
                        {faceMatchSignals.map((signal) => (
                            <SignalCard
                                key={`${signal.type}-${signal.category}`}
                                signal={signal}
                            />
                        ))}
                    </div>
                </div>
            )}

            {selfieSignals.length > 0 && (
                <div>
                    <h3 className="ri-text-sm ri-text-slate-600 ri-font-semibold ri-mb-3">
                        Headshot
                    </h3>
                    <div className="ri-grid ri-gap-4 ri-grid-cols-2 ri-mb-10">
                        {selfieSignals.map((signal) => (
                            <SignalCard
                                key={`${signal.type}-${signal.category}`}
                                signal={signal}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signals;
