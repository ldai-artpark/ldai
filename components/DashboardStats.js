import React, {memo} from 'react';
import useSwr from "swr";
import {getFetcher} from "../src/fetchers";
import _ from "lodash";
import LoadingState from "./LoadingState";
import {useSelector} from "react-redux";

const DashboardStats = memo(({org}) => {
    
    const {data ,error} = useSwr( "/api/v1/get-raw-data-stats" ,getFetcher);

    const selectedOrg = useSelector(state => state.main.dashPage.selectedFilter);

    const aggregateData = data?.aggregates?.[org == null? selectedOrg : org] || {};

    if(!data && !error) {
        return <div>
            <LoadingState />
        </div>
    }

    if(error) {
        return <div>
            <p>Error loading data</p>
        </div>
    }


    return (
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 mb-5">
            {Object.keys(aggregateData).map((item) => (
                <div key={item} className="overflow-hidden rounded-lg bg-white dark:bg-zinc-900 px-4 py-5 shadow shadow-zinc-300 dark:shadow-zinc-800 sm:p-6">
                    <dt className="truncate text-sm font-medium text-zinc-500 dark:text-zinc-200">{_.capitalize(item.replace(/_/g," "))}</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{typeof aggregateData[item] === "number" ? new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 5 }).format(aggregateData[item]) : aggregateData[item] }</dd>
                </div>
            ))}
        </dl>
    );
});

DashboardStats.displayName = 'DashboardStats';

export default DashboardStats;