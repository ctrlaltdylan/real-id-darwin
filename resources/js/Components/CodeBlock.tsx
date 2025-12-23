import CopyButton from './CopyButton';

interface CodeBlockProps {
    code: string;
    showCopy?: boolean;
}

export default function CodeBlock({ code, showCopy = true }: CodeBlockProps) {
    return (
        <div className="relative rounded-lg bg-gray-900 overflow-hidden">
            {showCopy && (
                <div className="absolute right-2 top-2">
                    <CopyButton
                        text={code}
                        className="bg-gray-800 hover:bg-gray-700 text-gray-300"
                    />
                </div>
            )}
            <pre className="p-4 overflow-x-auto text-sm text-gray-100">
                <code>{code}</code>
            </pre>
        </div>
    );
}
