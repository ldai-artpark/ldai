#!/bin/bash

# This script is used to ingest the data stats into the database
echo "********************************************"

orgs=('shaip' 'megdap')
files=('/data1/Database/raw/summary_shaip_s3data.csv' '/data1/Database/raw/summary_megdap.csv')
#separator=("\t" "\t")

d=$(date)

echo "Start: ${d}"
echo "*********** Ingesting Raw data *************"

length=${#orgs[@]}
for (( i=0; i<${length}; i++ ));
do
    echo "..."
    echo "Ingesting Raw data for ${orgs[$i]}"

    checksum=$(shasum ${files[$i]} | awk '{print $1}')
    checksum="${checksum}-revalidate2"
    echo "Checksum: $checksum"

    hasExists=1
    curl -fs "https://ldai.vercel.app/api/v1/get-raw-hash-existence?hash=${checksum}" || hasExists=0

    if [ $hasExists -eq 1 ]
    then
        echo "Data already exists. Ignoring..."
    else
        echo "Data does not exists"
        echo "Uploading files"

        curl -fs --location --request POST 'https://ldai.vercel.app/api/v1/upload-raw-data-stats/' \
        --form "file=@${files[$i]}" \
        --form "org=${orgs[$i]}" \
        --form "hash=${checksum}" || echo "Uploading failed for ${files[$i]}"
    fi

done

echo "***********Raw data ingestion completed************"

# Automated qc hash ingestion

echo "***********Ingesting Automated QC data*************"

automatedQcFile='/data/Database/data_after_auto_check/data_stats.csv'
automatedQcChecksum=$(shasum $automatedQcFile | awk '{print $1}')
automatedQcChecksum="${automatedQcChecksum}-revalidate1"
echo "Automated QC Checksum: $automatedQcChecksum"

automatedQcHasExists=1
curl -fs "https://ldai.vercel.app/api/v1/get-automated-qc-hash-existence?hash=${automatedQcChecksum}" || automatedQcHasExists=0

if [ $automatedQcHasExists -eq 1 ]
then
    echo "Automated QC data already exists. Ignoring..."
else
    echo "Automated QC data does not exists"
    echo "Uploading files"

    curl -fs --location --request POST 'https://ldai.vercel.app/api/v1/upload-automated-qc-stats/' \
    --form "file=@${automatedQcFile}" \
    --form "hash=${automatedQcChecksum}" || echo "Uploading failed for ${automatedQcFile}"
fi

echo "Automated QC data ingestion completed"


echo "***********Ingestion script completed*************"
echo