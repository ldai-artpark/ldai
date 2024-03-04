import React, {useMemo} from 'react';
import useSwr from "swr";
import {getFetcher} from "../src/fetchers";
import LoadingState from './LoadingState';
import MyResponsiveSankey from './MyResponsiveSankey'
import {useSelector} from "react-redux";

const sankeyData = {
    "nodes": [
      {
        "id": "Raw Data",
        "nodeColor": "hsl(245, 70%, 50%)"
      },
      {
        "id": "Automated QC",
        "nodeColor": "hsl(322, 70%, 50%)"
      },
      {
        "id": "Automated Passed",
        "nodeColor": "hsl(359, 70%, 50%)"
      }

    ],
    "links": [
      {
        "source": "Raw Data",
        "target": "Automated QC",
        "value": null
      },
      {
        "source": "Automated QC",
        "target": "Automated Passed",
        "value": null
      }
    ]
  }

const SankeyChart = () => {
  const {data ,error} = useSwr( "/api/v1/get-data-by-stages" ,getFetcher);

  const userDetail = useSelector((state) => state.userDetails.user);

  console.log(data);
  
  const transferedData = useMemo(() => {
    if (data) {
          return {RawDataToAutomatedQC : data["raw"].total_duration_hrs, 
                  AutomatedQCtoPassed : data["autoqc_passed"].total_duration_hrs
                }
          }
}, [data]);

if(!data && !error) {
  return <div>
      <LoadingState />
  </div>
}

if(error) {
  return <div>
      <p>Error loading data</p>
  </div>
}

if(transferedData) {

    sankeyData["links"][0].value = transferedData.RawDataToAutomatedQC;
    sankeyData["links"][1].value = transferedData.AutomatedQCtoPassed;
}

    return (
      <div className={'h-96 mt-4 w-full lg:w-3/4 sankey'}>
          <MyResponsiveSankey data={sankeyData}/>
      </div>
    )
} 

export default SankeyChart;
