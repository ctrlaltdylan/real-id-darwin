import { format, parseISO } from 'date-fns';
import React from 'react';
import {
    GrCheckmark,
    GrClose,
    GrDocumentUser,
    GrDownload,
    GrEdit,
    GrFormRefresh,
    GrSend,
    GrUser,
    GrView,
} from 'react-icons/gr';
import type { Event, EventType } from 'types/Check';
export type Icon = {
    icon: React.FunctionComponent;
    color?: string;
};
export type EventIcon = Record<Partial<EventType>, Icon>;

const EVENT_ICONS: EventIcon = {
    completed: {
        icon: GrCheckmark,
        color: 'bg-green-500',
    },
    delivered: {
        icon: GrSend,
        color: 'bg-blue-500',
    },
    failed: {
        icon: GrClose,
        color: 'bg-red-500',
    },
    'failed-to-send-sms': {
        icon: GrClose,
        color: 'bg-red-500',
    },
    'inactive-email': {
        icon: GrClose,
        color: 'bg-red-500',
    },
    opened: {
        icon: GrView,
        color: 'bg-gray-400',
    },
    'submitted-photo': {
        icon: GrUser,
        color: 'bg-gray-400',
    },
    'submitted-id': {
        icon: GrDocumentUser,
        color: 'bg-gray-400',
    },
    'submitted-signature': {
        icon: GrEdit,
        color: 'bg-gray-400',
    },
    'manually-rejected': {
        icon: GrClose,
        color: 'bg-red-500',
    },
    'manually-approved': {
        icon: GrCheckmark,
        color: 'bg-green-500',
    },
    'data-deleted': {
        icon: GrClose,
        color: 'bg-red-500',
    },
    'brightpearl-order-sync-failed': {
        icon: GrClose,
        color: 'bg-red-500',
    },
    'brightpearl-order-status-updated-passed': {
        icon: GrCheckmark,
        color: 'bg-green-500',
    },
    'brightpearl-order-status-updated-required': {
        icon: GrClose,
        color: 'bg-red-500',
    },
    'brightpearl-order-sync-canceled': {
        icon: GrClose,
        color: 'bg-red-500',
    },
    'camera-error': {
        icon: GrClose,
        color: 'bg-red-500',
    },
    'camera-initialized': {
        icon: GrCheckmark,
        color: 'bg-green-500',
    },
    'document-on-blacklist': {
        icon: GrClose,
        color: 'bg-red-500',
    },
    'resent-check': {
        icon: GrFormRefresh,
        color: 'bg-gray-400',
    },
    'confirmation-code-delivered': {
        icon: GrSend,
        color: 'bg-blue-500',
    },
    'confirmation-code-validated': {
        icon: GrCheckmark,
        color: 'bg-green-500',
    },
    'downloaded-image': {
        icon: GrDownload,
        color: 'bg-gray-400',
    },
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

// export function ActionBlame({ event }: { event: Event }) {
//     const { shop } = useShop();
//     // @ts-ignore
//     const { openPricingModal } = usePricingModal();

//     if (!shop || !event || !event?.actor) {
//         return <></>;
//     }

//     if ((shop.permissions || [])?.includes('staff_permissions')) {
//         return (
//             <p className="ri-italic ri-font-light ri-mt-3 ri-text-xs ri-text-slate-600">
//                 - By {event.actor?.first_name} {event.actor?.last_name} (
//                 {event.actor?.email})
//             </p>
//         );
//     } else {
//         return (
//             <p className="ri-italic ri-font-light ri-mt-3 ri-text-xs ri-text-slate-600">
//                 - By a staff member.{' '}
//                 <span className="ri-underline" onClick={openPricingModal}>
//                     Need to know who?
//                 </span>
//             </p>
//         );
//     }
// }

export function RenderHtml({ html }: { html: string }) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function EventsTimeline({ events = [] }: { events: Event[] }) {
    return (
        <div className="events-timeline">
            <ul role="list" className="-mb-8">
                {events
                    .slice(0)
                    .reverse()
                    .map((event, eventIdx) => {
                        const Icon = EVENT_ICONS[event.event]?.icon;
                        const iconBackground =
                            EVENT_ICONS[event.event]?.color || 'bg-gray-400';

                        return (
                            <li key={`${event.at}`}>
                                <div className="relative pb-8">
                                    {eventIdx !== events.length - 1 ? (
                                        <span
                                            aria-hidden="true"
                                            className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                                        />
                                    ) : null}
                                    <div className="relative flex space-x-3">
                                        <div>
                                            <span
                                                className={classNames(
                                                    iconBackground,
                                                    'flex size-8 items-center justify-center rounded-full ring-8 ring-white',
                                                )}
                                            >
                                                {Icon && (
                                                    <Icon
                                                        aria-hidden="true"
                                                        className="size-5 text-white"
                                                    />
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    {event.message}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                                <time dateTime={event.at}>
                                                    {format(
                                                        parseISO(`${event.at}`),
                                                        "MMM do, y 'at' K:mmaaa",
                                                    )}
                                                </time>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <ActionBlame event={event} /> */}
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}
