export default function GetStarted() {
    return (
        <div className="my-4">
            <div
                className="flex rounded bg-white px-6 shadow"
                style={{
                    background: `url("/id-render.png") no-repeat`,
                    backgroundPosition: `bottom right -100px`,
                    backgroundSize: `61%`,
                }}
            >
                <div className="max-w-lg">
                    <h2 className="mb-4 max-w-md text-2xl font-semibold text-gray-700">
                        Verify your customers' real life identity with an ID
                        check
                    </h2>
                    <p className="mb-4 text-base text-gray-600">
                        Create an ID check to verify your customers real life
                        identity.
                    </p>
                    <p className="mb-6 text-base text-gray-600">
                        Real ID will verify the authenticity of your customer's
                        government issued IDs with an option headshot to compare
                        them against.
                    </p>

                    <div className="mb-8 flex gap-2">
                        <button
                            type="button"
                            className="rounded-md border-0 bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                            Create an ID check
                        </button>
                        <button
                            type="button"
                            className="rounded-md border-0 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Change ID check settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
