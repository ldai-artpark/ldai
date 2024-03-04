import React, {memo, useMemo, useRef} from 'react';
import useSwr from "swr";
import {getFetcher} from "../src/fetchers";
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.min.css'; // Optional theme CSS
import clsx from "clsx";
import useCurrentTheme from "@newron/common/hooks/useCurrentTheme";
import LoadingState from "./LoadingState";


const AutomatedDataGrid = memo(props => {

    const {data : inData,error} = useSwr( "/api/v1/get-automated-qc-stats" ,getFetcher);

    const [dataLevel, setDataLevel] = React.useState("districts");
    const stateWiseData = inData?.stateWiseAggregates || {};    

    const toggleDataLevel = () => {
        setDataLevel(dataLevel === "states" ? "districts" : "states");
    }

    const theme = useCurrentTheme();

    const aggregatesData = useMemo(() => {
        if (inData) {
            return inData["aggregates"];
        }
        return null;
    }, [inData]);

    const rowData = useMemo(() => {
        if(!inData) {
            return [];
        }
        const orgs = Object.keys(inData.data);
        const {data} = inData;
        return (orgs.map(org => data[org]).flat(2))
    }, [inData]);

    const stateRowData = useMemo(() => {
        if(!inData) {
            return [];
        }
        const orgs = Object.keys(stateWiseData);

        return (orgs.map(org => stateWiseData[org]).flat(2))
    }, [inData]);

    const gridRef = useRef(); // Optional - for accessing Grid's API

    // Each Column Definition results in one Column.
    // const [columnDefs, setColumnDefs] = useState([
    //     {field: 'make', filter: true},
    //     {field: 'model', filter: true},
    //     {field: 'price'}
    // ]);
    const columnDefs = useMemo(() => {
        if(!inData) {
            return [];
        }
        const tableData = dataLevel === "states"? stateRowData : rowData;
        // return Object.keys(fieldDicts).map((key) => ({headerName: fieldDicts[key].name,field: key}))
        return Object.keys(tableData[0]).map((key, i ) => ({headerName: (key.charAt(0).toUpperCase() + key.slice(1)).split("_").join(" "),field: key, filter: true,pinned: i < 1 ? "left" : null})).filter((columnName) => {
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
            <h2>Key Stats</h2>
            <dl className="mt-5 grid grid-cols-2 w-full lg:w-3/5 gap-5 sm:grid-cols-3 mb-5">
                <div className="overflow-hidden rounded-lg bg-white dark:bg-zinc-900 px-4 py-5 shadow shadow-zinc-300 dark:shadow-zinc-800 sm:p-6">
                    <dt className="truncate text-sm font-medium text-zinc-500 dark:text-zinc-200">Total Speakers</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{aggregatesData.total_no_of_speakers}</dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-white dark:bg-zinc-900 px-4 py-5 shadow shadow-zinc-300 dark:shadow-zinc-800 sm:p-6">
                    <dt className="truncate text-sm font-medium text-zinc-500 dark:text-zinc-200">Total Duration</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{aggregatesData.total_duration_hrs}</dd>
                </div>
            </dl>
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

AutomatedDataGrid.displayName = 'DashboardGrid';

AutomatedDataGrid.propTypes = {

};

export default AutomatedDataGrid;