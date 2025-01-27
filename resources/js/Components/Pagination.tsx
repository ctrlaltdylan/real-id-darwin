import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({
    handleNext,
    handlePrevious,
    page,
    size = 25,
    totalPages,
    totalResults,
    handleSelectPage,
}: {
    page: number;
    size: number;
    totalPages: number;
    totalResults: number;
    handleNext: () => void;
    handlePrevious: () => void;
    handleSelectPage: (page: number) => void;
}) {
    console.log({ page });
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={handlePrevious}
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={handleNext}
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">{page * size + 1}</span>{' '}
                        to{' '}
                        <span className="font-medium">
                            {totalResults < page * size + size
                                ? totalResults
                                : page * size + size}
                        </span>{' '}
                        of <span className="font-medium">{totalResults}</span>{' '}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        aria-label="Pagination"
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    >
                        <a
                            href="#"
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={handlePrevious}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                aria-hidden="true"
                                className="size-5"
                            />
                        </a>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        {totalPages > 1 && (
                            <>
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => (
                                        <a
                                            key={index + 1}
                                            href="#"
                                            aria-current={
                                                page === index + 1
                                                    ? 'page'
                                                    : undefined
                                            }
                                            data-index={index + 1}
                                            data-active={page == index + 1}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                page === index + 1
                                                    ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                            } ${index + 1 > 3 && index + 1 < totalPages - 2 ? 'hidden md:inline-flex' : ''}`}
                                            onClick={() =>
                                                handleSelectPage(index + 1)
                                            }
                                        >
                                            {index + 1}
                                        </a>
                                    ),
                                )}
                                {totalPages > 5 && (
                                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                        ...
                                    </span>
                                )}
                            </>
                        )}
                        <a
                            href="#"
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={handleNext}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                aria-hidden="true"
                                className="size-5"
                            />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
}
