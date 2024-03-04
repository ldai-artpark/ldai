import React from 'react';
import RawDataMaps from "./RawDataMaps";
import DashboardGrid from "./DashboardGrid";
import clsx from "clsx";

const tabs = [
    { name: 'Charts', href: '#',  component: <RawDataMaps /> },
    { name: 'Tables', href: '#', component: <DashboardGrid /> },
]

const RawData = props => {

    const [currentTab, setCurrentTab] = React.useState(0)

    const handleTabChange = (tabIndex) => () => {
        setCurrentTab(tabIndex)
    }

    return (
        <div>
            <div className="hidden sm:block">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.name}
                            onClick={handleTabChange(index)}
                            className={clsx(
                                index === currentTab
                                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-300'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
                            )}
                            aria-current={index === currentTab ? 'page' : undefined}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>
            <div className={"mt-4"}>
                {tabs[currentTab].component}
            </div>
        </div>
    )
}

RawData.propTypes = {

}

export default RawData;