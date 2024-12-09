import IdScanAnimation from '@/Components/Checks/IdScanAnimation';

export default function EmptyState({ check }) {
    return (
        <div className="rounded-lg border p-4 shadow-sm">
            <div className="sm:py-30 flex flex-col items-center justify-center px-2 py-2 text-center sm:px-20 sm:text-left">
                <h2 className="text-xl font-semibold">
                    Waiting for the customer to submit their ID
                </h2>
                <div className="my-5">
                    <IdScanAnimation />
                </div>
                <p className="text-gray-500">
                    The customer hasn't provided their ID for verification yet.
                </p>
            </div>
        </div>
    );
}
