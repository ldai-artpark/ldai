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
    "AndhraPradesh": "Telugu(985.09), Hindi(120.58), Urdu(18.75), Tamil(4.15), Bengali(2.91), Marathi(2.31), Kannada(0.59), Bhojpuri(0.20), Santali(0.12), English(0.12), Maithili(0.04) ", // Replace "state1" and "Language1" with actual state IDs and languages
    "Bihar": "Hindi(2848.09), Maithili(369.27), Bhojpuri(159), Magahi(94.97), Angika(81.83), Bajjika(59.77), Urdu(42.95), Surjapuri(25.91), Bengali(6.49), Marathi(5.15), Kurumali(0.86), Bantar(0.60), Telugu(0.43), Kannada(0.35), Sadri(0.28), Tamil(0.25), Khortha(0.23), Chattisgarhi(0.21), Kortha(0.18), Konkani(0.17), Nepalese(0.14), Marwari(0.04) ",
    "Chhattisgarh": "Hindi(1273.13), Chattisgarhi(325.77), Halbi(36.67), Sadri(22.73), Surgujia(11.28), Kurukh(10.99), Awadhi(5.75), Gondi(3.59), Nagpuri(1.99), Bengali(1.76), Odia(1.56), Dorli(1.36), Marathi(0.91), Bhatri(0.90), Duruwa(0.52), Maithili(0.48), Kudukh(0.28), Kannada(0.12), English(0.09), Agariya(0.03)",
    "Goa": "Hindi(79.80), Konkani(59.62), Marathi(22.62), Bengali(0.38), Kannada(0.28), Gujarati(0.21)",
    "Jharkhand": "Hindi(291.39), Bengali(42), Khortha(25.95), Santali(5.38), Bhojpuri(1.13), Marathi(0.92), Angika(0.63), Magahi(0.46), Maithili(0.36), Kurumali(0.13), English(0.05), Chattisgarhi(0.04) ",
    "Karnataka": "Kannada(1392.75), Hindi(94.10), Telugu(89.63), Tulu(39.57), Marathi(27.85), Urdu(26.02), Bearybashe(6.86), Tamil(5.13), Malayalam(2.31), Bengali(1.90), Bhojpuri(0.52), English(0.49), Lambadi(0.21) ",
    "Maharashtra": "Marathi(840.15), Hindi(352.99), Malvani(13.86), Khandeshi(5.62), Bhili(2.76), Maithili(0.57), Kannada(0.25), Bengali(0.24), Chattisgarhi(0.16), Telugu(0.07), Gujarati(0.05), Urdu(0.04)",
    "Rajasthan": "Rajasthani(152), Hindi(100.93), Marwari(91.27), Jaipuri(1.84), Shekhawati(0.77), Bengali(0.62), Mewari(0.56), Bagri(0.50), Harauti(0.27), Wagdi(0.25), Gujarati(0.19), English(0.09), Marathi(0.04) ",
    "Telangana": "Telugu(411.86), Hindi(11.86), Urdu(1.73), Bengali(0.70), English(0.61), Lambadi(0.44), Malayalam(0.15) ",
    "Uttarakhand": "Hindi(217.14), Garhwali(115.25), Kumaoni(23.10), Bengali(0.66), Maithili(0.52), Marathi(0.49) ",
    "UttarPradesh": "Hindi(1576.04), Bhojpuri(238.04), Khari Boli(15.97), Bundeli(8.38), Marathi(5.76), Urdu(3.93), Awadhi(1.91), Bengali(0.74), Badayuni(0.46), Maithili(0.26), Tamil(0.26), Chattisgarhi(0.25), English(0.21), Assamese(0.18), Kannada(0.13), Gujarati(0.09)",
    "WestBengal": "Bengali(1422.67), Hindi(53.71), Marathi(1.87), Sadri(0.59), Bhojpuri(0.24), Santali(0.22), Rajbangshi(0.17) ",
    // Add other states and their languages here
};

const districtLanguageMap = {
    "Anantpur": "Bengali, Hindi, Kannada, Marathi, Tamil, Telugu, Urdu",
    "Araria": "Angika, Bengali, Bhojpuri, Hindi, Maithili, Telugu, Urdu",
    "Aurangabad": "Bengali, Hindi, Marathi, Telugu",
    "Balrampur": "Awadhi, Chhattisgarhi, Hindi",
    "Bastar": "Bengali, Bhatri, Chhattisgarhi, Gond, Halbi, Hindi, Odia",
    "Begusarai": "Angika, Bhojpuri, Hindi, Magahi, Maithili, Telugu, Urdu",
    "Belgaum": "Hindi, Kannada, Malayalam, Marathi, Telugu, Urdu",
    "Bellary": "Bearybashe, English, Hindi, Kannada, Malayalam, Tamil, Telugu, Urdu",
    "Bhagalpur": "Angika, Bengali, Bhojpuri, Hindi, Magahi, Maithili, Marathi, Telugu, Urdu",
    "Bijapur": "Bengali, English, Hindi, Kannada, Malayalam, Telugu, Urdu",
    "Bilaspur": "Bengali, Chhattisgarhi, Hindi, Maithili, Marathi",
    "Budaun": "Awadhi, Badayuni, Bengali, Bundeli, Hindi, Khari Boli, Marathi, Urdu",
    "Chamrajnagar": "Hindi, Kannada, Malayalam, Tamil, Telugu",
    "Chandrapur": "Hindi, Malvani, Marathi",
    "Chittoor": "Bengali, Hindi, Santali, Tamil, Telugu",
    "Churu": "Bagri, Bengali, English, Gujarati, Harauti, Hindi, Jaipuri, Marwari, Mewari, Rajasthani, Shekhawati, Wagdi",
    "DakshinDinajpur": "Bengali, Hindi",
    "DakshinKannada": "Bearybashe, Hindi, Kannada, Malayalam, Telugu, Tulu, Unknown, Urdu",
    "Darbhanga": "Hindi, Kannada, Maithili, Marathi, Urdu",
    "Deoria": "Awadhi, Bhojpuri, Hindi, Khari Boli, Maithili, Marathi",
    "Dharwad": "Bhojpuri, Hindi, Kannada, Malayalam, Telugu, Urdu",
    "Dhule": "Bhili, Hindi, Khandeshi, Marathi",
    "EastChamparan": "Bengali, Bhojpuri, Hindi, Maithili, Marathi, Urdu",
    "Etah": "English, Hindi, Khari Boli, Marathi",
    "Gaya": "Bengali, Bhojpuri, Hindi, Magahi, Maithili, Marathi, Marwari",
    "Ghazipur": "Awadhi, Bengali, Bhojpuri, Chhattisgarhi, Hindi, Khari Boli, Marathi, Tamil, Urdu",
    "Gopalganj": "Bengali, Bhojpuri, Hindi, Maithili, Marathi",
    "Gorakhpur": "Bhojpuri, Hindi, Khari Boli, Marathi",
    "Gulbarga": "Hindi, Kannada, Malayalam, Marathi, Urdu",
    "Guntur": "Bengali, English, Hindi, Marathi, Tamil, Telugu, Urdu",
    "Hamirpur": "Awadhi, Bengali, Bundeli, Hindi, Khari Boli, Marathi, Urdu",
    "Jahanabad": "Bengali, Hindi, Magahi, Maithili, Marathi, Urdu",
    "Jalaun": "Assamese, Awadhi, Bundeli, Gujarati, Hindi, Khari Boli, Marathi",
    "Jalpaiguri": "Bengali, Hindi, Marathi, Sadri",
    "Jamtara": "Bengali, Bhojpuri, Hindi, Khortha, Maithili, Marathi",
    "Jamui": "Angika, Bengali, Hindi, Magahi, Maithili, Tamil",
    "Jashpur": "Agariya, Bengali, Chhattisgarhi, Hindi, Kudukh, Kurukh, Nagpuri, Odia, Sadri",
    "Jhargram": "Bengali, Bhojpuri, Hindi, Marathi",
    "JyotibaPhuleNagar": "English, Hindi, Khari Boli, Marathi, Urdu",
    "Kabirdham": "Chhattisgarhi, Hindi, Maithili, Marathi",
    "Karimnagar": "Bengali, English, Hindi, Telugu, Urdu",
    "Kishanganj": "Bengali, Hindi, Magahi, Maithili, Marathi, Surjapuri, Urdu",
    "Kolkata": "Bengali, Hindi",
    "Korba": "Chhattisgarhi, Hindi",
    "Krishna": "Bengali, English, Hindi, Marathi, Tamil, Telugu",
    "Lakhisarai": "Bhojpuri, Hindi, Konkani, Magahi, Maithili, Marathi, Telugu",
    "Madhepura": "Angika, Bengali, Hindi, Khortha, Magahi, Maithili, Marathi, Telugu",
    "Malda": "Bengali, Hindi, Marathi",
    "Muzaffarpur": "Angika, Bajjika, Bengali, Bhojpuri, Hindi, Kurumali, Maithili",
    "Muzzaffarnagar": "Awadhi, Hindi, Kannada, Khari Boli, Marathi, Urdu",
    "Mysore": "Bengali, Hindi, Kannada, Lambadi, Malayalam, Tamil, Telugu, Urdu",
    "Nagaur": "Bengali, Hindi, Jaipuri, Marathi, Marwari, Mewari, Rajasthani",
    "Nagpur": "Chhattisgarhi, Gujarati, Hindi, Malvani, Marathi",
    "Nalgonda": "Bengali, Hindi, Lambadi, Malayalam, Telugu",
    "North24Parganas": "Bengali, Hindi, Marathi",
    "NorthSouthGoa": "Bengali, Gujarati, Hindi, Kannada, Konkani, Marathi",
    "PaschimMedinipur": "Bengali, Hindi",
    "Pune": "Hindi, Maithili, Marathi, Urdu",
    "Purnia": "Angika, Chhattisgarhi, Hindi, Maithili, Urdu",
    "Purulia": "Bengali, Hindi, Rajbangshi, Santali",
    "Raichur": "Bhojpuri, Hindi, Kannada, Malayalam, Telugu, Urdu",
    "Raigarh": "Chhattisgarhi, Hindi, Odia",
    "Rajnandgaon": "Bengali, Chhattisgarhi, English, Hindi, Kannada, Marathi",
    "Saharsa": "Angika, Bengali, Chhattisgarhi, Hindi, Kannada, Magahi, Maithili, Urdu",
    "Sahebganj": "Angika, Bengali, Bhojpuri, Chhattisgarhi, English, Hindi, Khorth, Kurumali, Magahi, Marathi, Santali",
    "Samastipur": "Angika, Bajjika, Bhojpuri, Hindi, Magahi, Maithili, Urdu",
    "Saran": "Bhojpuri, Hindi, Maithili, Marathi",
    "Sarguja": "Bengali, Chhattisgarhi, Hindi, Kurukh, Surgujia",
    "Shimoga": "Bengali, Hindi, Kannada, Malayalam, Tamil, Telugu, Urdu",
    "Sindhudurga": "Hindi, Malvani, Marathi",
    "Sitamarhi": "Angika, Bajjika, Bantar, Bhojpuri, Hindi, Khorth, Korth, Maithili, Sadri, Tamil, Urdu",
    "Solapur": "Bengali, Hindi, Kannada, Maithili, Malvani, Marathi",
    "Srikakulam": "Bhojpuri, Hindi, Kannada, Marathi, Telugu",
    "Sukma": "Bengali, Chhattisgarhi, Dorli, Duruwa, Gond, Hindi, Odia",
    "Supaul": "Angika, Bhojpuri, Hindi, Maithili, Urdu",
    "TehriGarhwal": "Bengali, Garhwali, Hindi, Kumaoni, Marathi",
    "Uttarkashi": "Bengali, Garhwali, Hindi, Kumaoni, Maithili, Marathi",
    "Vaishali": "Bajjika, Bengali, Bhojpuri, Hindi, Maithili, Marathi, Nepalese",
    "Varanasi": "Awadhi, Bengali, Bhojpuri, Hindi, Khari Boli, Marathi",
    "Vishakapattanam": "Bengali, Hindi, Kannada, Maithili, Marathi, Tamil, Telugu"
};  

const languageCountMap = {
    "AndhraPradesh": 11,
    "Bihar": 22,
    "Chhattisgarh": 20,
    "Goa": 6,
    "Jharkhand": 12,
    "Karnataka": 13,
    "Maharashtra": 12,
    "Rajasthan": 13,
    "Telangana": 7,
    "Uttarakhand": 6,
    "UttarPradesh": 16,
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
        }).map(district => ({
            ...district,
            language:districtLanguageMap[district.id] || "N/A",
        }));
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
                                    {dataLevel === "states" && (<th>Languages(HRS)</th>)}  {/* Languages header rendered only for states */}
                                    {dataLevel === "states" && (<th>Language Count</th>)}
                                    {dataLevel == "districts" && (<th>Languages</th>)}
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
                                            <td className="bg-slate-50 hover:link pl-4 hover:font-semibold sticky left-0 z-10" onClick={() => { hadleClickDistrict(elements.id) }}>{elements.id}</td>
                                            <td className="bg-slate-50">{elements.duration_per_district_hrs.toFixed(2)}</td>
                                            <td className="bg-slate-50" >{elements.spks_per_district}</td>
                                            <td className="bg-slate-50">{parseFloat(elements.transcription_duration).toFixed(2)}</td>
                                            <td className="bg-slate-50">{elements.language}</td>
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

