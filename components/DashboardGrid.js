import React, {memo, useMemo, useRef} from 'react';
import useSwr from "swr";
import {getFetcher} from "../src/fetchers";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.min.css'; // Optional theme CSS
import clsx from "clsx";
import useCurrentTheme from "@common/hooks/useCurrentTheme";
import LoadingState from "./LoadingState";
import {useSelector} from "react-redux";

const DashboardGrid = memo(props => {

    const {data : inData,error} = useSwr( "/api/v1/get-raw-data-stats" ,getFetcher);
    const userDetail = useSelector((state) => state.userDetails.user);

    const [dataLevel, setDataLevel] = React.useState("districts");
    const stateWiseData = inData?.stateWiseAggregates || {};

    const toggleDataLevel = () => {
        setDataLevel(dataLevel === "states" ? "districts" : "states");
    }

    const theme = useCurrentTheme();

    const stateRowData = useMemo(() => {
        if(!inData) {
            return [];
        }
        const orgs = Object.keys(stateWiseData);

        return (orgs.map(org => stateWiseData[userDetail.org == null? org : userDetail.org]).flat(2))
    }, [inData]);

    const rowData = useMemo(() => {
        if(!inData) {
            return [];
        }
        const orgs = Object.keys(inData.data);
        const {data} = inData;
        return (orgs.map(org => data[userDetail.org == null? org : userDetail.org]).flat(2))
    }, [inData]);

    const gridRef = useRef();

    const columnDefs = useMemo(() => {
        if(!inData) {
            return [];
        }
        const tableData = dataLevel === "states"? stateRowData : rowData;
        // return Object.keys(fieldDicts).map((key) => ({headerName: fieldDicts[key].name,field: key}))
        return Object.keys(tableData[0]).map((key, i ) => ({headerName: (key.charAt(0).toUpperCase() + key.slice(1)).split("_").join(" "),field: key, filter: true,pinned: key === "id" ? "left" : null})).filter((columnName) => {
            columnName.headerName === "Id" ? (dataLevel === "states"? columnName.headerName = "States" : columnName.headerName = "Districts") : null;
            
            if(dataLevel === "districts" && columnName.headerName !== 'District') {
                return columnName;
            }
            else if(dataLevel === "states" && columnName.headerName !== 'State') {
                return columnName;
            }
        });
    }, [dataLevel, inData]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo( ()=> ({
        sortable: true
    }),[]);

    if(!inData && !error) {
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
        <div>
            <div className={"flex justify-between pb-4"}>
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
            <div className={clsx({"ag-theme-alpine-dark" : theme === "dark", "ag-theme-alpine": theme !== "dark"},"w-full h-[600px] rounded")}>
                        <AgGridReact
                            ref={gridRef} // Ref for accessing Grid's API

                            rowData={dataLevel === "states"? stateRowData : rowData} // Row Data for Rows

                            columnDefs={columnDefs} // Column Defs for Columns
                            defaultColDef={defaultColDef} // Default Column Properties

                            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                            // rowSelection='multiple' // Options - allows click selection of rows

                            // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                />
            </div>
        </div>
        
    );
});

DashboardGrid.displayName = 'DashboardGrid';

DashboardGrid.propTypes = {

};

export default DashboardGrid;