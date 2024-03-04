import React, {Suspense, useMemo} from 'react';
import AutomatedDataChoroplethForMapsPage from "./AutomatedDataChoroplethForMapsPage";
import useSwr from "swr";
import {getFetcher} from "../src/fetchers";

const chartTypes = {
    districts:  [
        {
            name: "Duration per district (hrs)",
            fields: [
                {
                    name: "Duration District",
                    id: "duration",
                    field: "duration_hrs"
                }
            ],
        },
        {
            name: "Speakers per district",
            fields: [
                {
                    name: "Speakers Count",
                    id: "total",
                    field: "no_of_speakers"
                },
            ],
        }
    ],
    states: [
        {
            name: "Duration per State (hrs)",
            fields: [
                {
                    name: "Duration State",
                    id: "duration",
                    field: "duration_hrs"
                }
            ]
        },
        {
            name: "Total Speakers",
            fields: [
                {
                    name: "Speakers Count",
                    id: "total",
                    field: "no_of_speakers"
                },
            ],
        }
    ]
}

const AutomatedDataMaps = props => {

    const [dataLevel, setDataLevel] = React.useState("districts");

    /*const [selectedOrg, setSelectedOrg] = React.useState(ORGS[0].id);*/

    const toggleDataLevel = () => {
        setDataLevel(dataLevel === "states" ? "districts" : "states");
    }

    const {data ,error} = useSwr( "/api/v1/get-automated-qc-stats" ,getFetcher);

    const usableData = useMemo(() => {
        if (data) {
            return data[dataLevel === "states" ? "stateWiseAggregates" : "data"];
        }
        return null;
    }, [data, dataLevel]);

    return (
        <div>
            <div className={""}>
                <div className={"flex justify-between"}>
                    <div>
                        <div>
                            <div className={"btn-group"} >
                                <button className={`btn btn-xs ${dataLevel === "districts" ? "btn-active" : "btn-outline"}`}
                                        disabled={dataLevel==="districts"}
                                        onClick={toggleDataLevel}
                                >
                                    District view
                                </button>
                                <button className={`btn btn-xs ${dataLevel === "states" ? "btn-active" : "btn-outline"}`}
                                        disabled={dataLevel === "states"}
                                        onClick={toggleDataLevel}
                                >
                                    State View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex justify-center mt-16"}>
                    <div className={"grid lg:grid-cols-2 gap-10 lg:gap-24 xl:gap-36"}>
                        <Suspense fallback={<div>Loading...</div>}>
                        {
                            chartTypes[dataLevel].map((chartType,index) => {
                                return <AutomatedDataChoroplethForMapsPage
                                    key={chartType.name} 
                                    title={chartType.name}
                                    fields={chartType.fields}
                                    data={usableData}
                                    dataLevel={dataLevel}
                                />
                            })
                        }
                        </Suspense>
                    </div>
                </div>
            </div>

        </div>
    );
};

AutomatedDataMaps.propTypes = {

};

export default AutomatedDataMaps;
