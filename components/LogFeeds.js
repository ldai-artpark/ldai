import React from 'react';

import {CheckIcon, ThumbUpIcon as HandThumbUpIcon, UserIcon} from '@heroicons/react/solid'
import clsx from "clsx";

const timeline = [
    {
        id: 1,
        content: 'Ram was added as a member by',
        target: 'Ghanashyam',
        href: '#',
        date: 'Sep 20',
        datetime: '2020-09-20',
        icon: UserIcon,
        iconBackground: 'bg-zinc-400',
    },
    {
        id: 2,
        content: 'Sita was added as a member by',
        target: 'Ram',
        href: '#',
        date: 'Sep 22',
        datetime: '2020-09-22',
        icon: HandThumbUpIcon,
        iconBackground: 'bg-blue-500',
    },
    {
        id: 3,
        content: 'Ravana was removed from project by',
        target: 'Ram',
        href: '#',
        date: 'Sep 28',
        datetime: '2020-09-28',
        icon: CheckIcon,
        iconBackground: 'bg-green-500',
    },
    {
        id: 4,
        content: 'Logs data reconciled for',
        target: 'Workflow 1',
        href: '#',
        date: 'Sep 30',
        datetime: '2020-09-30',
        icon: HandThumbUpIcon,
        iconBackground: 'bg-blue-500',
    },
]
const LogFeeds = props => {
    return (
        <div>
            <h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100 mb-5">User logs</h3>
            <div className="flow-root">
                <ul role="list" className="-mb-8">
                    {timeline.map((event, eventIdx) => (
                        <li key={event.id}>
                            <div className="relative pb-8">
                                {eventIdx !== timeline.length - 1 ? (
                                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-zinc-200" aria-hidden="true" />
                                ) : null}
                                <div className="relative flex space-x-3">
                                    <div>
                  <span
                      className={clsx(
                          event.iconBackground,
                          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                      )}
                  >
                    <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                                    </div>
                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p className="text-sm text-zinc-500">
                                                {event.content}{' '}
                                                <a href={event.href} className="font-medium text-zinc-900 dark:text-zinc-100">
                                                    {event.target}
                                                </a>
                                            </p>
                                        </div>
                                        <div className="whitespace-nowrap text-right text-sm text-zinc-500">
                                            <time dateTime={event.datetime}>{event.date}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

LogFeeds.propTypes = {

};

export default LogFeeds;