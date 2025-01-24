import StatusBadge from '@/Components/Checks/StatusBadge';
import Filters from '@/Components/Home/Filters';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';

function Checks({
    checks,
    totalChecks,
    totalPages,
    page,
    size,
    searchTerm,
    checkStatuses,
    archived,
}: {
    checks: any;
    totalChecks: number;
    totalPages: number;
    page: number;
    size: number;
    searchTerm: string;
    checkStatuses: string[];
    archived: boolean;
}) {
    console.log({
        checks,
        checkStatuses,
        archived,
        searchTerm,
        totalChecks,
        totalPages,
        page,
        size,
    });
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="px-4 sm:px-6 lg:px-8">
                {/* <div>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="you@example.com"
                        />
                    </div>
                </div> */}
                <Filters
                    checkStatuses={checkStatuses}
                    archived={archived}
                    searchTerm={searchTerm}
                />
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Order
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Sent At
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {checks.map((check: any) => (
                                        <tr
                                            key={check.id}
                                            className="hover:bg-gray-100"
                                            onClick={() =>
                                                router.visit(
                                                    `/checks/${check.id}`,
                                                )
                                            }
                                        >
                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">
                                                            {check.firstName &&
                                                            check.lastName
                                                                ? `${check.firstName} ${check.lastName}`
                                                                : 'Unnamed Customer'}
                                                        </div>
                                                        <div className="mt-1 text-gray-500">
                                                            {check.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="text-gray-900">
                                                    {check.orderId}
                                                </div>
                                                <div className="mt-1 text-gray-500">
                                                    {/* {person.department} */}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <StatusBadge
                                                    step={check.step}
                                                    success={
                                                        check?.job?.result
                                                            ?.success
                                                    }
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                {/* {person.role} */}
                                                {format(
                                                    parseISO(check.createdAt),
                                                    'EEE. MMMM do yyyy',
                                                )}
                                            </td>{' '}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                handleSelectPage={(page) => {
                                    router.visit(`/dashboard?page=${page}`, {
                                        preserveScroll: true,
                                    });
                                }}
                                handleNext={() => {
                                    router.visit(
                                        `/dashboard?page=${page + 1}`,
                                        {
                                            preserveScroll: true,
                                        },
                                    );
                                }}
                                handlePrevious={() => {
                                    router.visit(
                                        `/dashboard?page=${page - 1}`,
                                        {
                                            preserveScroll: true,
                                        },
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Checks
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Checks {...props} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
