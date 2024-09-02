import { useState, useMemo, useEffect } from "react";
import _ from "lodash";
import Choropleth from "./Choropleth";
import { fieldDicts } from "../src/options";
import { mapTranslations, mapsBreakpoints } from "../src/projectionConfig";
import useBreakpoint from "../hooks/useBreakpoint";
import { feature } from "topojson-client";
import Model from "../components/Model"
import { ArrowLeftIcon } from "@heroicons/react/solid";

const languageMap = {
    "AndhraPradesh": "Bengali, Bhojpuri, English, Hindi, Kannada, Maithili, Marathi, Santali, Tamil, Telugu, Urdu ", // Replace "state1" and "Language1" with actual state IDs and languages
    "Bihar": "Angika, Bajjika, Bantar, Bengali, Bhojpuri, Chattisgarhi, Hindi, Kannada, Khortha, Konkani, Kortha, Kurumali, Magahi, Maithili, Marathi, Marwari, Nepalese, Sadri, Surjapuri, Tamil, Telugu, Urdu ",
    "Chhattisgarh": "Agariya, Awadhi, Bengali, Bhatri, Chattisgarhi, Dorli, Duruwa, English, Gondi, Halbi, Hindi, Kannada, Kudukh, Kurukh, Maithili, Marathi, Nagpuri, Odia, Sadri, Surgujia ",
    "Goa": "Bengali, Gujarati, Hindi, Kannada, Konkani, Marathi",
    "Jharkhand": "Angika, Bengali, Bhojpuri, Chattisgarhi, English, Hindi, Khortha, Kurumali, Magahi, Maithili, Marathi, Santali ",
    "Karnataka": "Bearybashe, Bengali, Bhojpuri, English, Hindi, Kannada, Lambadi, Malayalam, Marathi, Tamil, Telugu, Tulu, Unknown, Urdu ",
    "Maharashtra": "Bengali, Bhili, Chattisgarhi, Gujarati, Hindi, Kannada, Khandeshi, Maithili, Malvani, Marathi, Telugu, Urdu ",
    "Rajasthan": "Bagri, Bengali, English, Gujarati, Harauti, Hindi, Jaipuri, Marathi, Marwari, Mewari, Rajasthani, Shekhawati, Wagdi ",
    "Telangana": "Bengali, English, Hindi, Lambadi, Malayalam, Telugu, Urdu ",
    "Uttarakhand": "Bengali, Garhwali, Hindi, Kumaoni, Maithili, Marathi ",
    "UttarPradesh": "Assamese, Awadhi, Badayuni, Bengali, Bhojpuri, Bundeli, Chattisgarhi, English, Gujarati, Hindi, Kannada, Khari Boli, Maithili, Marathi, Tamil, Urdu",
    "WestBengal": "Bengali, Bhojpuri, Hindi, Marathi, Rajbangshi, Sadri, Santali ",
    // Add other states and their languages here
};

const languageCountMap = {
    "AndhraPradesh": 11,
    "Bihar": 22,
    "Chhattisgarh": 20,
    "Goa": 6,
    "Jharkhand": 12,
    "Karnataka": 14,
    "Maharashtra": 12,
    "Rajasthan": 13,
    "Telangana": 7,
    "Uttarakhand": 6,
    "UttarPradesh": 14,
    "WestBengal":7,
    // Continue for all relevant states and districts
};
const HomepageDataAndMaps = ({ data }) => {

    const [breakpoint] = useBreakpoint();

    // console.log({ data });

    const selectField = {
        "state": "total_duration_hrs",
        "districts": "duration_per_district_hrs"
    };

    const [dataLevel, setDataLevel] = useState("states");
    const [state, setState] = useState("india");
    const [popup, setPopup] = useState(false);
    const [districtName, setDistrictName] = useState("")

    const aggregateData = data?.aggregates?.["all"] || {};

    const stateWiseData = data?.stateWiseAggregates?.["all"] || {};

    const districtWiseData = useMemo(() => {
        if (!data) {
            return [];
        }
        return (data?.data?.["all"] || []).filter(elements => {
            return elements.state === state;
        });
    }, [state, data]);

    const handleOnClickState = (stateName) => {
        if (dataLevel === "districts") {
            return;
        }
        setDataLevel("districts");
        setState(stateName);
    };

    const handleBacktoState = () => {
        setDataLevel("states");
        setState("india");
    };

    const hadleClickDistrict = (district) => {
        setDistrictName(district)
        setPopup(true)
    }

    return (
        <>

            <section className="w-full ">
                {popup && (<Model districtName={districtName} setPopup={setPopup} />)}
                <div className="pt-5 flex flex-col gap-4 justify-center md:grid md:grid-cols-2 md:gap-4 md:p-10 text-zinc-900">
                    <div className="overflow-x-auto  pb-5 w-full">
                        <span className={'text-xs text-indigo-700 block sm:hidden my-2 '}> Want to hear the voices out? Click on the {dataLevel === "states" ? "states" : "district"} .</span>
                        <table className="table table-compact md:w-full">
                            <thead>
                                <tr>
                                    {dataLevel === "states" && (<th className=" pl-4 sticky left-0 z-20">States </th>)}
                                    {dataLevel === "districts" && (
                                        <th className=" pl-4 flex items-center sticky left-0 z-20">
                                            <button onClick={() => handleBacktoState()} className="mr-2">
                                                <ArrowLeftIcon className="h-5 w-5 text-indigo-700 text-bold" />
                                            </button>
                                            <span className=" hover:font-semibold py-3 ">{state}</span>
                                        </th>
                                    )}
                                    <th className="">Record <br />  Duration(hrs)</th>
                                    <th className="">Speaker <br />  Count</th>
                                    {dataLevel === "states" && (<th>Transcription <br /> Duration (Hrs)</th>)}
                                    {dataLevel === "districts" && (<th>Transcription <br />   Duration (Hrs)</th>)}
                                    {dataLevel === "states" && (<th>Languages</th>)}  {/* Languages header rendered only for states */}
                                    {dataLevel === "states" && (<th>Language Count</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {dataLevel === "states" && stateWiseData?.map((elements) => {
                                    return (
                                        <tr key={elements} className="light:hover text-semibold">
                                            <td className="bg-slate-50 pl-4 sticky left-0 z-10"><button onClick={() => handleOnClickState(elements.id)}><span className="hover:font-semibold">{elements.id}</span></button></td>
                                            <td className="bg-slate-50">{elements.total_duration_hrs.toFixed(2)}</td>
                                            <td className="bg-slate-50">{elements.total_speakers}</td>
                                            <td className={"bg-slate-50"}>{elements.transcription_duration_state ? parseFloat(elements.transcription_duration_state).toFixed(2) : "0.00"}</td>
                                            <td className="bg-slate-50">{languageMap[elements.id] || "N/A"}</td>
                                            <td className="bg-slate-50 text-center">{languageCountMap[elements.id] || 0}</td> 
                                        </tr>
                                    );
                                })}
                                {dataLevel === "districts" && districtWiseData.filter(elements => {
                                    return elements.state === state;
                                }).map((elements) => {
                                    return (
                                        <tr key={elements} className="light:hover">
                                            <td className="bg-slate-50 hover:link pl-4 hover:font-semibold" onClick={() => { hadleClickDistrict(elements.id) }}>{elements.id}</td>
                                            <td className="bg-slate-50">{elements.duration_per_district_hrs.toFixed(2)}</td>
                                            <td className="bg-slate-50" >{elements.spks_per_district}</td>
                                            <td className="bg-slate-50">{parseFloat(elements.transcription_duration).toFixed(2)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="h-auto md:grid md:grid-cols-7 relative">
                        {/*** Added Button Start ***/}
                        {dataLevel === "districts" && (
                            <div className="absolute top-0 left-0 z-10 p-2">
                                <button onClick={() => handleBacktoState()} className="mr-2 bg-white rounded-full p-1 shadow-md">
                                    <ArrowLeftIcon className="h-5 w-5 text-indigo-700 text-bold" />
                                </button>
                            </div>
                        )}
                        {/*** Added Button End ***/}
                        <div className="md:col-start-2 md:col-span-6 ">
                            {breakpoint === 'sm' ? (
                                <Choropleth
                                    className="w-44 h-48"
                                    margin={{ top: 20, right: 0, bottom: 0, left: 10 }}
                                    region={state.toLowerCase().split(" ").join("")}
                                    data={stateWiseData}
                                    dataLevel={"states"}
                                    noStateName
                                    projectionScale={mapsBreakpoints.projectionScale[breakpoint]}
                                    legends={mapsBreakpoints.legends[breakpoint]}
                                    value={"total_duration_hrs"}
                                    valueFormat={"0.2s"}
                                    // domain={fieldDicts[selectField["state"]].domain || [0, 1500]}
                                    domain={[0, 1500]}
                                    breakPoints={
                                        {
                                            "sm": {
                                                "projectionTranslation": mapTranslations[state.toLowerCase().split(" ").join("")].projectionTranslation,
                                                "projectionRotation": mapTranslations[state.toLowerCase().split(" ").join("")].projectionRotation
                                            }
                                        }
                                    }
                                    tooltip={e => (
                                        <>
                                            <div className="bg-slate-50 shadow-md rounded-md p-1 sm:p-2">
                                                <div className={'text-xs font-semibold'}>State: {e.feature.id}</div>
                                                <div className={'text-xs font-semibold'}>Record Duration: {e.feature.value}</div>
                                                <div className={'text-xs font-semibold'}>Speaker Count: {e.feature.data?.total_speakers}</div>
                                            </div>
                                        </>
                                    )}
                                />
                            ) : (
                                <div className="w-full h-full">
                                    <Choropleth
                                        className="w-full h-full "
                                        region={state.toLowerCase().split(" ").join("")}
                                        data={dataLevel === "states" ? stateWiseData : districtWiseData}
                                        dataLevel={dataLevel}
                                        noStateName
                                        value={dataLevel === "states" ? "total_duration_hrs" : "duration_per_district_hrs"}
                                        valueFormat={"0.2s"}
                                        domain={fieldDicts[selectField[dataLevel]]?.domain || [0, 1500]}
                                        enableLegend={true}
                                        projectionTranslation={dataLevel === "districts" ? mapTranslations[state.toLowerCase().split(" ").join("")].projectionTranslation : mapsBreakpoints.projectionTranslation[breakpoint]}
                                        projectionRotation={mapTranslations[state.toLowerCase().split(" ").join("")].projectionRotation}
                                        projectionScale={dataLevel === "districts" ? mapTranslations[state.toLowerCase().split(" ").join("")].projectionScale : mapsBreakpoints.projectionScale[breakpoint]}
                                        legends={mapsBreakpoints.legends[breakpoint]}
                                        onClick={(e) => {
                                            if (e.data) {
                                                dataLevel === "states" ? handleOnClickState(e.id) : hadleClickDistrict(e.id)
                                            }
                                        }}

                                        tooltip={e => {
                                            if (e.feature.data) {

                                                return (
                                                    <>
                                                        <div className="bg-slate-50 shadow-md rounded-md p-1 sm:p-2">
                                                            <span className={"text-indigo-700 text-xs"}>Want to hear the voices out? Click here.</span>
                                                            <div className={'text-xs font-semibold'}>State : {e.feature.id}</div>
                                                            <div className={'text-xs font-semibold'}>Record Duration : {e.feature.value}</div>
                                                            <div className={'text-xs font-semibold'}>Speaker Count : {
                                                                dataLevel === "states" ? e.feature.data?.total_speakers : e.feature.data?.spks_per_district
                                                            }</div>
                                                        </div>
                                                    </>
                                                );
                                            } else {
                                                return null;
                                            }
                                        }}
                                    />
                                        <p className="flex justify-center font-medium text-sm text-gray-700">The colors on the map indicate the recorded duration in hours for each {dataLevel === 'states' ? "state." : "district."} Click on the map to go deeper</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomepageDataAndMaps;

