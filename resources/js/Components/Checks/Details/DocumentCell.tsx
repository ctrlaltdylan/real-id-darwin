type Props = {
    label: string;
    value: string;
};
const DocumentCell = ({ label, value }: Props) => {
    return (
        <div className="bg-white px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-600">{label}</h2>
            <div className="font-mono text-lg text-slate-700">{value}</div>
        </div>
    );
};

export default DocumentCell;
