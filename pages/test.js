import React from 'react';
// import Choropleth from "../components/Choropleth";
import dynamic from "next/dynamic";
import {MAP_AREAS} from "../src/choroplethHelpers";

const Choropleth = dynamic(() => import("../components/Choropleth"), {ssr: false});

const Test = props => {

    const [selectedArea, setSelectedArea] = React.useState(MAP_AREAS[0]);
    const [dataLevel, setDataLevel] = React.useState("districts");

    const toggleDataLevel = () => {
        console.log("toggleDataLevel");
        if(dataLevel === "districts") {
            setDataLevel("states");
        } else {
            setDataLevel("districts");
        }
    }

    return (
        <div>
            <div className={"flex gap-2"}>
                <select onChange={e => setSelectedArea(e.target.value)} value={selectedArea}>
                    {
                        Object.keys(MAP_AREAS).map((area) => {
                            return <option key={MAP_AREAS[area]} value={MAP_AREAS[area]}>{area}</option>
                        })
                    }
                </select>
                <button
                    onClick={toggleDataLevel}
                    className={"p-2 bg-zinc-700 dark:bg-gray-200 text-zinc-100 dark:text-zinc-700 rounded-md"}
                >
                    Toggle Data Level
                </button>
            </div>
            <div>
                <Choropleth region={selectedArea} dataLevel={dataLevel} />
            </div>
        </div>
    );
};

Test.propTypes = {

};

export default Test;