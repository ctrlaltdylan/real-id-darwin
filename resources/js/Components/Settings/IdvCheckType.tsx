import { useSettings } from '@/Components/Providers/SettingsProvider';
import { AiOutlineIdcard } from 'react-icons/ai';
import { BiFace } from 'react-icons/bi';

const IdvCheckType = () => {
    const { data: values, errors, setData: setFieldValue } = useSettings();

    return (
        <div className="flex">
            <IdCheckOption
                selected={values.idCheckType === 'id'}
                onClick={() => {
                    setFieldValue('idCheckType', 'id');
                }}
                title="ID Only"
                icons={<AiOutlineIdcard />}
                subtitle="More convenient"
                helperText="Only require a photo of the customer's valid ID. The ID will be scanned for authenticity."
            />
            <IdCheckOption
                selected={values.idCheckType === 'idv'}
                onClick={() => {
                    setFieldValue('idCheckType', 'idv');
                }}
                icons={
                    <div className="flex w-1/2 items-center justify-center">
                        <AiOutlineIdcard />
                        <p className="text-gray-500">+</p>
                        <BiFace />
                    </div>
                }
                title="ID and Headshot"
                subtitle="More secure"
                helperText="The face in the headshot will be cross referenced with the face photo on the ID document. Also includes the ID authenticity scan."
            />
        </div>
    );
};

export function IdCheckOption({
    onClick,
    helperText,
    subtitle,
    title,
    icons,
    selected,
}: {
    onClick: (event: string) => void;
    helperText?: string;
    subtitle?: string;
    title?: string;
    icons: React.ReactNode;
    selected: boolean;
}) {
    return (
        <div
            className={`flex min-h-[150px] w-1/2 flex-col justify-around rounded-md border-4 p-4 ${
                selected ? 'border-green-500' : 'border-gray-300'
            }`}
            onClick={onClick}
        >
            <h2 className="text-center font-normal uppercase tracking-wide">
                {title}
            </h2>
            <div className="flex items-center justify-center">{icons}</div>
            <h3 className="text-center">{subtitle}</h3>
            <p className="text-center text-gray-500">{helperText}</p>
        </div>
    );
}

export default IdvCheckType;
