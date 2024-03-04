import React, {useMemo} from 'react';
import clsx from "clsx";
import {useRouter} from "next/router";
import Link from "next/link";

const tabs = [
    { name: 'Raw Data', href: '/stats/raw', },
    { name: 'Automated QC', href: '/stats/automatedqc' },
    { name: 'Manual QC', href: '/stats/manualqc', },
]

const StatsSecondaryNav = () => {
    const [currentTab, setCurrentTab] = React.useState(0)
    const handleTabChange = (tabIndex) => () => {
        setCurrentTab(tabIndex)
    }

    const router = useRouter()

    const currentPage = useMemo(() => {
        return tabs.filter(tab => {
            return router.pathname.includes(tab.href)
        })?.href
    }, [router]);

    return (
        <div className="border-b border-gray-200 pb-5 sm:pb-0">
            <div className="mt-3 sm:mt-4">
                <div className="sm:hidden">
                    <label htmlFor="current-tab" className="sr-only">
                        Select a tab
                    </label>
                    <select
                        id="current-tab"
                        name="current-tab"
                        className="block w-full rounded-md border-zinc-300 dark:border-zinc-800 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        defaultValue={currentPage}
                        onChange={(e) => router.push(e.target.value)}
                    >
                        {tabs.map((tab, index) => (
                            <option value={tabs.href} key={tab.name}>{tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab, index) => (
                            <Link href={tab.href} key={tab.name}>
                                <button
                                    className={clsx(
                                            router.pathname === tab.href
                                            ? 'border-indigo-500 text-indigo-600 dark:text-indigo-300'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                        'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
                                    )}
                                    aria-current={index === currentTab ? 'page' : undefined}
                                >
                                    {tab.name}
                                </button>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
};

StatsSecondaryNav.propTypes = {

};

export default StatsSecondaryNav;