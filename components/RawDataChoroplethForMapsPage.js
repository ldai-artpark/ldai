import React, { memo, useState, useEffect} from 'react';
import Choropleth from "./Choropleth";
import clsx from "clsx";
import {fieldDicts} from "../src/options";
import { mapTranslations , mapsBreakpoints } from "../src/projectionConfig";
import { theme } from '../tailwind.config';
import useBreakpoint from "../hooks/useBreakpoint"

const RawDataChoroplethForMapsPage = memo(({fields = [],title = "",data,dataLevel,org, ...props}) => {
    
    const [breakpoint] = useBreakpoint();


    const [selectedSpecifier, setSelectedSpecifier] = React.useState(() => {
        const totalField = fields.find((field) => field.id === "total");
        if (totalField) {
            return totalField.id;
        }
        return fields[0].id;
    });

    const selectedField = fields.find((field) => field.id === selectedSpecifier) || {};

    data = data || [];

    return (
        <div>
            <div>
                <Choropleth
                    data={data}
                    dataLevel={dataLevel}
                    noStateName
                    value={selectedField.field}
                    domain={fieldDicts[selectedField.field]?.domain || [0, 10000]}
                    projectionTranslation={mapsBreakpoints.projectionTranslation[breakpoint]}
                    projectionScale={mapsBreakpoints.projectionScale[breakpoint]}
                    legends={mapsBreakpoints.legends[breakpoint]}
                />
            </div>

            <div className={"font-bold text-center"}>
                {
                    title
                }
            </div>
            <div className={"flex justify-center mt-2"}>
                <div className={"btn-group mb-5"}>
                    {
                        // fields.length > 1 &&
                        fields.map((field) => {
                            return <button key={field.id} className={clsx("btn btn-outline btn-xs normal-case select-none", {"btn-active": field.id === selectedSpecifier})} onClick={() => {
                                setSelectedSpecifier(field.id)}
                            }
                                           disabled={field.id === selectedSpecifier}
                            >
                               {field.name}
                            </button>
                        })
                    }
                </div>
            </div>
        </div>
    );
});

RawDataChoroplethForMapsPage.displayName = 'RawDataChoroplethForMapsPage';


RawDataChoroplethForMapsPage.propTypes = {
    
};

export default RawDataChoroplethForMapsPage;