import React, {memo, useEffect, useMemo} from 'react';

import {ResponsiveChoropleth} from '@nivo/geo';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import PropTypes from "prop-types";
import {MAP_AREAS} from "../src/choroplethHelpers";
import useCurrentTheme from "../common/hooks/useCurrentTheme";

const jsonPath = (region) => `/maps/${region}.json`;
const Choropleth = memo(({
                            region = "india",
                            dataLevel = "districts",
                            data = [],
                            domain = [0, 50000],
                            unknownColor,
                            valueFormat = ".2s",
                            colors = "nivo",
                            graticuleColor = "#f68c8c",
                            enableLegend = true,
                            noStateName = false,
                            projectionTranslation= [0.5, 1.12],
                            projectionRotation=[-83, 0, 0],
                            projectionScale=800,
                            legend = [
                                {
                                    anchor: 'bottom-left',
                                    direction: 'column',
                                    justify: true,
                                    translateX: 20,
                                    translateY: -100,
                                    itemsSpacing: 0,
                                    itemWidth: 70,
                                    itemHeight: 18,
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 0.85,
                                }
                            ], ...rest
                         },) =>
{

    const [mapLoadingError, setMapLoadingError] = React.useState(null);
    const [features, setFeatures] = React.useState(null);

    const theme = useCurrentTheme();

    const unknownColorDerived = useMemo(() => {
        return theme === "dark" ? "#e5e5e5" : "#e5e5e5";
    }, [theme]);

    const legendTextColor = useMemo(() => {
        return theme === "dark" ? "#e5e5e5" : "#e5e5e5";
    }, [theme]);

    const processedLegends = useMemo(() => {
        return legend.map((legend) => {
            return {
                itemTextColor: legendTextColor,
                ...legend,
            }
        });
    }, [legend, legendTextColor]);



    useEffect(() => {
        if(!region) {
            return;
        }
        d3.json(jsonPath(region)).then((topology) => {
            const features = topojson.feature(topology, topology.objects?.[dataLevel]).features;

            if(dataLevel === "districts") {
                features.forEach((feature) => {
                    feature.id = noStateName ? feature.properties.district :`${feature.properties.st_nm}-${feature.properties.district}`;
                })
            }

            setFeatures(features);
        }).catch((error) => {
            setMapLoadingError(error);
        });
    }, [region, dataLevel]);


    if(!features) {
        return null;
    }

    console.log("features", features);

    return (
        <div className={"h-[240px] w-full md:h-[500px] md:w-[340px] lg:h-[500px] lg:w-[500px] text-zinc-800 choropleth"}>
            <ResponsiveChoropleth
                features={features}
                domain={domain}
                unknownColor={unknownColor || unknownColorDerived}
                label={dataLevel === "districts" ? "properties.district" : "id"}
                data={data}
                match={"id"}
                valueFormat={valueFormat}
                projectionTranslation={projectionTranslation}
                projectionRotation={projectionRotation}
                projectionScale={projectionScale}
                graticuleLineColor={graticuleColor}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                colors={colors}
                legends={enableLegend ? processedLegends : undefined}
                {...rest}
            />
        </div>
    );
});

Choropleth.displayName = 'Choropleth';
Choropleth.propTypes = {
    ...ResponsiveChoropleth.propTypes,
    area: PropTypes.oneOf(Object.values(MAP_AREAS)),
    dataLevel: PropTypes.oneOf(["districts", "states"]),
    data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, value: PropTypes.number })),
    colors: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    enableLegend: PropTypes.bool,
    domain: PropTypes.arrayOf(PropTypes.number).isRequired,
    legend: PropTypes.arrayOf(PropTypes.shape({
        anchor: PropTypes.oneOf(["top", "bottom", "left", "right"]),
        direction: PropTypes.oneOf(["column", "row"]),
        justify: PropTypes.bool,
        translateX: PropTypes.number,
        translateY: PropTypes.number,
        itemsSpacing: PropTypes.number,
        itemWidth: PropTypes.number,
        itemHeight: PropTypes.number,
        itemDirection: PropTypes.oneOf(["left-to-right", "right-to-left", "top-to-bottom", "bottom-to-top"]),
        itemTextColor: PropTypes.string,
        itemOpacity: PropTypes.number,
    })),

}
export default Choropleth;