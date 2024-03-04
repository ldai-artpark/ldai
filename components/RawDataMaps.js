import React, {Suspense, useMemo} from 'react';
import RawDataChoroplethForMapsPage from "./RawDataChoroplethForMapsPage";
import useSwr from "swr";
import {getFetcher} from "../src/fetchers";
import {ORGS} from "../src/options";
import clsx from "clsx";
import {useSelector} from "react-redux";


const chartTypes = {
    districts:  [
        {
            name: "Duration per district (hrs)",
            fields: [
                {
                    name: "Generic",
                    id: "generic",
                    field: "duration_per_district_hrs_generic"
                },
                {
                    name: "Combined",
                    id: "total",
                    field: "duration_per_district_hrs"
                },
                {
                    name: "Specific",
                    id: "specific",
                    field: "duration_per_district_hrs_specific"
                }
            ],
        },
        {
            name: "Speakers per district",
            fields: [
                {
                    name: "Speakers Count",
                    id: "total",
                    field: "spks_per_district"
                },
            ],
        },
        {
            name: "Files per district",
            fields: [
                {
                    name: "Generic",
                    id: "generic",
                    field: "files_per_district_generic"
                },
                {
                    name: "Combined",
                    id: "total",
                    field: "files_per_district"
                },
                {
                    name: "Specific",
                    id: "specific",
                    field: "files_per_district_specific"
                }
            ],
        },
        {
            name: "Segments per district",
            fields: [
                {
                    name: "Generic",
                    id: "generic",
                    field: "segments_per_district_generic"
                },
                {
                    name: "Combined",
                    id: "total",
                    field: "segments_per_district"
                },
                {
                    name: "Specific",
                    id: "specific",
                    field: "segments_per_district_specific"
                }
            ],
        },
        {
            name: "Images per district",
            fields: [
                {
                    name: "Generic",
                    id: "generic",
                    field: "images_per_district_generic"
                },
                {
                    name: "Combined",
                    id: "total",
                    field: "images_per_district"
                },
                {
                    name: "Specific",
                    id: "specific",
                    field: "images_per_district_specific"
                }
            ],
        }
    ],
    states: [
        {
            name: "Total Duration(hrs)",
            fields: [
                {
                    name: "Generic",
                    id: "generic",
                    field: "total_duration_hrs_generic"
                },
                {
                    name: "Combined",
                    id: "total",
                    field: "total_duration_hrs"
                },
                {
                    name: "Specific",
                    id: "specific",
                    field: "total_duration_hrs_specific"
                }
            ]
        },
        {
            name: "Total Speakers",
            fields: [
                {
                    name: "Speakers Count",
                    id: "total",
                    field: "total_speakers"
                },
            ],
        },
        {
            name: "Total Files",
            fields: [
                {
                    name: "Combined",
                    id: "total",
                    field: "total_files"
                }
            ]
        },
        {
            name: "Total Segments",
            fields: [
                {
                    name: "Generic",
                    id: "generic",
                    field: "total_segments_generic"
                },
                {
                    name: "Combined",
                    id: "total",
                    field: "total_segments"
                },
                {
                    name: "Specific",
                    id: "specific",
                    field: "total_segments_specific"
                }
            ]
        }
    ]
}

const RawDataMaps = props => {

    const [dataLevel, setDataLevel] = React.useState("districts");

    const [selectedOrg, setSelectedOrg] = React.useState(ORGS[0].id);

    const userDetail = useSelector((state) => state.userDetails.user)

    const toggleDataLevel = () => {
        setDataLevel(dataLevel === "states" ? "districts" : "states");
    }

    const {data ,error} = useSwr( "/api/v1/get-raw-data-stats" ,getFetcher);

    const usableData = useMemo(() => {
        if (data) {
            return data[dataLevel === "states" ? "stateWiseAggregates" : "data"][userDetail?.org == null? selectedOrg : userDetail?.org ];
        }
        return null;
    }, [data, dataLevel, selectedOrg]);

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
                    { userDetail?.org == null && ( 
                        <div>
                            <div className='mt-6 sm:mt-0'>
                            Filter:&nbsp;
                            <div className={"btn-group"}>
                                {
                                    ORGS.map(org => {
                                        return (
                                            <button
                                                key={org.id}
                                                className={clsx("btn btn-xs", {"btn-active": selectedOrg === org.id})}
                                                onClick={() => setSelectedOrg(org.id)}
                                            >
                                                {org.name}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            </div>
                        </div>)}
                </div>
                <div className={"flex justify-center mt-16"}>
                    <div className={"grid sm:grid-cols-2 md:gap-10 lg:gap-24 xl:gap-36"}>
                        <Suspense fallback={<div>Loading...</div>}>
                        {
                            chartTypes[dataLevel].map((chartType,index) => {
                                return <RawDataChoroplethForMapsPage
                                    key={chartType.name} title={chartType.name}
                                    fields={chartType.fields}
                                    data={usableData}
                                    dataLevel={dataLevel}
                                    org={userDetail?.org == null? selectedOrg : userDetail.org}
                                    
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

RawDataMaps.propTypes = {

};

export default RawDataMaps;