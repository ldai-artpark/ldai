import React, {memo} from 'react';
import Choropleth from "./Choropleth";
import {fieldDicts} from "../src/options";
import useBreakpoint from "../hooks/useBreakpoint"
import { useState, useEffect } from 'react';
import { mapsBreakpoints } from './../src/projectionConfig'

const AutomatedDataChoroplethForMapsPage = memo(({fields = [],title = "",data,dataLevel, ...props}) => {

    const [breakpoint] = useBreakpoint();

    const [selectedSpecifier] = React.useState(() => {
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
                    valueFormat={"0.2f"}
                    domain={fieldDicts[selectedField.field]?.domain || [0, 10000]}
                    enableLegend={true}
                    projectionScale={mapsBreakpoints.projectionScale[breakpoint]}
                    legends={mapsBreakpoints.legends[breakpoint]}
                />
            </div>

            <div className={"font-bold text-center"}>
                {
                    title
                }
            </div>
        </div>
    );
});

AutomatedDataChoroplethForMapsPage.displayName = 'AutomatedDataChoroplethForMapsPage';


AutomatedDataChoroplethForMapsPage.propTypes = {
    
};

export default AutomatedDataChoroplethForMapsPage;