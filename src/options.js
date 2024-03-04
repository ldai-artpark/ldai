export const fieldDicts = {
    duration_per_district_hrs : {
        name : "Duration per district (hrs)",
        format : ".2s",
        domain : [0,200]
    },
    duration_per_district_hrs_generic : {
        name : "Duration per district (hrs) (generic)",
        format : ".2s",
        domain : [0,60]
    },
    duration_per_district_hrs_specific : {
        name : "Duration per district (hrs) (specific)",
        format : ".2s",
        domain : [0,60]
    },
    spks_per_district : {
        name : "Speakers per district",
        format : ".2s",
        domain : [0,200]
    },
    files_per_district : {
        name : "Files per district",
        format : ".2s",
        domain : [0,6000]
    },
    files_per_district_generic : {
        name : "Files per district (generic)",
        format : ".2s",
        domain : [0,4000]
    },
    files_per_district_specific : {
        name : "Files per district (specific)",
        format : ".2s",
        domain : [0,2500]
    },
    segments_per_district : {
        name : "Segments per district",
        format : ".2s",
        domain : [0,15000]
    },
    segments_per_district_generic : {
        name : "Segments per district (generic)",
        format : ".2s",
        domain : [0,10000]
    },
    segments_per_district_specific : {
        name : "Segments per district (specific)",
        format : ".2s",
        domain : [0,8000]
    },
    images_per_district : {
        name : "Images per district",
        format : ".2s",
        domain : [0,2000]
    },
    images_per_district_generic : {
        name : "Images per district (generic)",
        format : ".2s",
        domain : [0,2000]
    },
    images_per_district_specific : {
        name : "Images per district (specific)",
        format : ".2s",
        domain : [0,1500]
    },
    total_duration_hrs_generic : {
        name : "Total duration (hrs) (generic)",
        format : ".2s",
        domain : [0,200]
    },
    total_duration_hrs_specific : {
        name : "Total duration (hrs) (specific)",
        format : ".2s",
        domain : [0,200]
    },
    total_duration_hrs : {
        name : "Total duration (hrs) ",
        format : ".2s",
        domain : [0,200]
    },
    total_speakers: {
        name : "Total speakers",
        format : ".2s",
        domain : [0,1800]
    },
    duration_hrs: {
        name : "Duration (hrs)",
        format : ".2f",
        domain : [0,0.25]
    },
    no_of_speakers: {
        name : "Speakers Count",
        format : ".2f",
        domain : [0,30]
    }

}

export const ORGS = [
    {
        name : "All",
        id : "all",
    },
    {
        name : "Megdap",
        id : "megdap",
    },
    {
        name : "Shaip",
        id : "shaip",
    }
];