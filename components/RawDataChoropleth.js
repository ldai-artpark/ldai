import React, {useEffect, useState, useMemo} from 'react';
import useSwr from "swr";
import {getFetcher} from "../src/fetchers";
import {fieldDicts} from "../src/options";
import Choropleth from "./Choropleth";
import {useDispatch, useSelector} from "react-redux";
import {setDashPageSelectedFilter} from "../slices/mainSlice";
import useBreakpoint from "../hooks/useBreakpoint"
import { mapsBreakpoints } from './../src/projectionConfig';
// const Choropleth = dynamic(() => import("./Choropleth"), {ssr: false});

const allOrgKey = "All";
const RawDataChoropleth = ({organization}) => {

    const {data : inData,error} = useSwr( "/api/v1/get-raw-data-stats" ,getFetcher);
 
    const [breakpoint] = useBreakpoint();

    const selectedOrg = useSelector(state => state.main.dashPage.selectedFilter);
    const dispatch = useDispatch();

    const setSelectedOrg = (org) => {
        dispatch(setDashPageSelectedFilter(org));
    }

    const data = useMemo(() => {
        if(!inData) {
            return null;
        }
        const {data} = inData;
        return data;
    }, [inData]);

    const [orgs, setOrgs] = React.useState([]);

    const fields = useMemo(() => {
        return Object.keys(fieldDicts).map((key) => ({name: fieldDicts[key].name,value: key}))
        },[]);

    const [selectedField, setSelectedField] = React.useState(fields[0].value);

    const usableData = useMemo(() => {
        if(!data || !selectedOrg || !selectedField) {
            return [];
        }
        if( organization == null && selectedOrg === "all") {
            const allData = orgs.slice(1).map(org => data[org.value]).flat(2);
            return allData;
        }
        return data?.[organization == null ? selectedOrg : organization ] || [];
    }, [data, selectedOrg, orgs]);

    useEffect(() => {
        if(data) {
            setOrgs([{ name: allOrgKey, value: "all"},...Object.keys(data).map((key) => ({name: key, value: key}))]);
        }
    }, [data]);


    return (
        <div>
            <div className={"flex md:justify-center gap-4 w-96 md:w-full"}>
                { organization == null && <div className={"w-30"}>
                    <select className={"w-full mt-1 block rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white dark:bg-black text-zinc-700 dark:text-zinc-100"}
                            value={selectedOrg}
                            onChange={(e) => setSelectedOrg(e.target.value)}>
                        {orgs.map((org) => <option key={org.value} value={org.value}>{org.name}</option>)}
                    </select>
                </div>}

                <div className={"w-44"}>
                    <select className={"w-full mt-1 block rounded-md border-gray-300 py-2 pl-3 pr-1 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm  bg-white dark:bg-black text-zinc-700 dark:text-zinc-100"} value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
                        {fields.map((field) => <option key={field.value} value={field.value}>{field.name}</option>)}
                    </select>
                </div>

            </div>
            <div className="flex justify-center">
                <Choropleth region={"india"}
                            data={ usableData }
                            dataLevel={"districts"}
                            noStateName
                            value={[selectedField]}
                            domain={fieldDicts[selectedField].domain}
                            projectionScale={mapsBreakpoints.projectionScale[breakpoint]}
                            legends={mapsBreakpoints.legends[breakpoint]}
                />
            </div>
        </div>
    );
};

RawDataChoropleth.propTypes = {

};

export default RawDataChoropleth;
