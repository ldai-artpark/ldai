import withAuthorizedPageAccessRights from "../../src/security/withAuthorizedPageAccessRights";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InputText from "../../components/InputText";
import { useState } from 'react';
import axios from "axios";
import mongodbClient from "../../src/node/mongodb-client";

export default function InjestData({ data }) {

    function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = axios.put('/api/v1/injest-data', {
                dataFunnel,
                geographicalPresenceData,
                transcriptionData,
                imagesCollected
            })
        } catch (err) {
            console.log(err);
        }
    }

    const [dataFunnel, setDatafunnel] = useState({
        speechDatacollected: { magdap: data.dataFunnel.speechDatacollected.magdap, shaip: data.dataFunnel.speechDatacollected.shaip },
        speechDataDelivered: { magdap: data.dataFunnel.speechDataDelivered.magdap, shaip: data.dataFunnel.speechDataDelivered.shaip },
        speechDataPassedQC: { magdap: data.dataFunnel.speechDataPassedQC.magdap, shaip: data.dataFunnel.speechDataPassedQC.shaip },
        dataUploaded: { magdap: data.dataFunnel.dataUploaded.magdap, shaip: data.dataFunnel.dataUploaded.shaip },
    })

    const [geographicalPresenceData, setGeographicalPresenceData] = useState({
        dataCollection: { magdap: data.geographicalPresenceData.dataCollection.magdap, shaip: data.geographicalPresenceData.dataCollection.shaip },
        totalQC: data.geographicalPresenceData.totalQC,
        totalFreelancers: data.geographicalPresenceData.totalFreelancers
    })

    const [transcriptionData, setTranscriptionData] = useState({
        transcriptionHoursReceived: { magdap: data.transcriptionData.transcriptionHoursReceived.magdap, shaip: data.transcriptionData.transcriptionHoursReceived.shaip },
        qcApprovedTranscription: { magdap: data.transcriptionData.qcApprovedTranscription.magdap, shaip: data.transcriptionData.qcApprovedTranscription.shaip }
    })

    const [imagesCollected, setImagesCollected] = useState(data.imagesCollected)

    console.log(dataFunnel, geographicalPresenceData, imagesCollected)

    return (
        <DashboardLayout currentPage={"None"}>
            <div className="items-center mt-12">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="border-b-4">
                            <h1 className="text-2xl font-semibold py-2">Data Funnel</h1>
                        </div>
                        <div className="mt-4 grid grid-cols-4 gap-8">
                            <div className="mt-2">
                                <label className="flex">
                                    Speech data collected:
                                </label>
                                <InputText type="number" heading="Magdap" value={dataFunnel.speechDatacollected?.magdap} name="name" placeholder="Magdap" unit="Hrs" onChange={(e) => {
                                    const newDataFunnel = {
                                        ...dataFunnel,
                                        speechDatacollected: {
                                            ...dataFunnel.speechDatacollected,
                                            magdap: e.target.value,
                                        },
                                    };
                                    setDatafunnel(newDataFunnel);
                                }} />
                                <InputText type="number" heading="Shaip" value={dataFunnel.speechDatacollected?.shaip} name="name" placeholder="Shaip" unit="Hrs" onChange={(e) => {
                                    const newDataFunnel = {
                                        ...dataFunnel,
                                        speechDatacollected: {
                                            ...dataFunnel.speechDatacollected,
                                            shaip: e.target.value,
                                        },
                                    };
                                    setDatafunnel(newDataFunnel);
                                }} />
                            </div>
                            <div className="mt-2">
                                <label className="flex">
                                    Speech data delivered:
                                </label>
                                <InputText type="number" heading="Magdap" value={dataFunnel.speechDataDelivered?.magdap} name="name" placeholder="Magdap" unit="Hrs" onChange={(e) => {
                                    const newDataFunnel = {
                                        ...dataFunnel,
                                        speechDataDelivered: {
                                            ...dataFunnel.speechDataDelivered,
                                            magdap: e.target.value,
                                        },
                                    };
                                    setDatafunnel(newDataFunnel);
                                }} />
                                <InputText type="number" heading="Shaip" value={dataFunnel.speechDataDelivered?.shaip} name="name" placeholder="Shaip" unit="Hrs" onChange={(e) => {
                                    const newDataFunnel = {
                                        ...dataFunnel,
                                        speechDataDelivered: {
                                            ...dataFunnel.speechDataDelivered,
                                            shaip: e.target.value,
                                        },
                                    };
                                    setDatafunnel(newDataFunnel);
                                }} />
                            </div>
                            <div className="mt-2">
                                <label className="flex">
                                    Speech data passed QC:
                                </label>
                                <InputText type="number" heading="Magdap" value={dataFunnel.speechDataPassedQC?.magdap} name="name" placeholder="Magdap" unit="Hrs" onChange={(e) => {
                                    const newDataFunnel = {
                                        ...dataFunnel,
                                        speechDataPassedQC: {
                                            ...dataFunnel.speechDataPassedQC,
                                            magdap: e.target.value,
                                        },
                                    };
                                    setDatafunnel(newDataFunnel);
                                }} />
                                <InputText type="number" heading="Shaip" value={dataFunnel.speechDataPassedQC?.shaip} name="name" placeholder="Shaip" unit="Hrs" onChange={(e) => {
                                    const newDataFunnel = {
                                        ...dataFunnel,
                                        speechDataPassedQC: {
                                            ...dataFunnel.speechDataPassedQC,
                                            shaip: e.target.value,
                                        },
                                    };
                                    setDatafunnel(newDataFunnel);
                                }} />
                            </div>
                            <div className="mt-2">
                                <label className="flex">
                                    Data uploaded:
                                </label>
                                <InputText type="number" heading="Magdap" value={dataFunnel.dataUploaded?.magdap} name="name" placeholder="Magdap" unit="Hrs" onChange={(e) => {
                                    const newDataFunnel = {
                                        ...dataFunnel,
                                        dataUploaded: {
                                            ...dataFunnel.dataUploaded,
                                            magdap: e.target.value,
                                        },
                                    };
                                    setDatafunnel(newDataFunnel);
                                }} />
                                <InputText type="number" heading="Shaip" value={dataFunnel.dataUploaded?.shaip} name="name" placeholder="Shaip" unit="Hrs" onChange={(e) => {
                                    const newDataFunnel = {
                                        ...dataFunnel,
                                        dataUploaded: {
                                            ...dataFunnel.dataUploaded,
                                            shaip: e.target.value,
                                        },
                                    };
                                    setDatafunnel(newDataFunnel);
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-8">
                        <div>
                            <h1 className="text-2xl font-semibold py-2 border-b-2">Geographical Presence</h1>
                            <div className="mt-4 grid grid-cols-2 gap-8">
                                <div className="mt-2">
                                    <label className="flex">
                                        Data collection:
                                    </label>
                                    <InputText type="number" heading="Magdap" value={geographicalPresenceData.dataCollection?.magdap} name="name" placeholder="Magdap" unit="Hrs" onChange={(e) => {
                                        const newGeographicalPresenceData = {
                                            ...geographicalPresenceData,
                                            dataCollection: {
                                                ...geographicalPresenceData.dataCollection,
                                                magdap: e.target.value,
                                            },
                                        };
                                        setGeographicalPresenceData(newGeographicalPresenceData);
                                    }} />
                                    <InputText type="number" heading="Shaip" value={geographicalPresenceData.dataCollection?.shaip} name="name" placeholder="shaip" unit="Hrs" onChange={(e) => {
                                        const newGeographicalPresenceData = {
                                            ...geographicalPresenceData,
                                            dataCollection: {
                                                ...geographicalPresenceData.dataCollection,
                                                shaip: e.target.value,
                                            },
                                        };
                                        setGeographicalPresenceData(newGeographicalPresenceData);
                                    }} />
                                </div>
                                <div className="mt-2">
                                    <label className="flex">
                                        QC:
                                    </label>
                                    <InputText type="number" value={geographicalPresenceData.totalQC} name="name" placeholder="shaip" unit="Districts" heading="OC of" onChange={(e) => {
                                        const newGeographicalPresenceData = {
                                            ...geographicalPresenceData,
                                            totalQC: e.target.value,
                                        };
                                        setGeographicalPresenceData(newGeographicalPresenceData);
                                    }} />
                                    <InputText type="number" value={geographicalPresenceData.totalFreelancers} name={"name"} placeholder={""} unit={"Freelancers"} heading={"Total"} onChange={(e) => {
                                        const newGeographicalPresenceData = {
                                            ...geographicalPresenceData,
                                            totalFreelancers: e.target.value,
                                        };
                                        setGeographicalPresenceData(newGeographicalPresenceData);
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="border-b-2 flex">
                                <h1 className="text-2xl font-semibold py-2">Transcription Data</h1>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="mt-2">
                                    <label className="flex">
                                        Transcription Hours Received:
                                    </label>
                                    <InputText type="number" heading="Magdap" value={transcriptionData.transcriptionHoursReceived?.magdap} name="name" placeholder="Magdap" unit="Hrs" onChange={(e) => {
                                        const newTranscriptionHoursReceived = {
                                            ...transcriptionData,
                                            transcriptionHoursReceived: {
                                                ...transcriptionData.transcriptionHoursReceived,
                                                magdap: e.target.value,
                                            },
                                        };
                                        setTranscriptionData(newTranscriptionHoursReceived);
                                    }} />
                                    <InputText type="number" heading="Shaip" value={transcriptionData.transcriptionHoursReceived?.shaip} name="name" placeholder="Shaip" unit="Hrs" onChange={(e) => {
                                        const newTranscriptionHoursReceived = {
                                            ...transcriptionData,
                                            transcriptionHoursReceived: {
                                                ...transcriptionData.transcriptionHoursReceived,
                                                shaip: e.target.value,
                                            },
                                        };
                                        setTranscriptionData(newTranscriptionHoursReceived);
                                    }} />
                                </div>
                                <div className="mt-2">
                                    <label className="flex">
                                        Speech data delivered:
                                    </label>
                                    <InputText type="number" heading="Magdap" value={transcriptionData.qcApprovedTranscription?.magdap} name="name" placeholder="Magdap" unit="Hrs" onChange={(e) => {
                                        const newTranscriptionHoursReceived = {
                                            ...transcriptionData,
                                            qcApprovedTranscription: {
                                                ...transcriptionData.qcApprovedTranscription,
                                                magdap: e.target.value,
                                            },
                                        };
                                        setTranscriptionData(newTranscriptionHoursReceived);
                                    }} />
                                    <InputText type="number" heading="Shaip" value={transcriptionData.qcApprovedTranscription?.shaip} name="name" placeholder="Shaip" unit="Hrs" onChange={(e) => {
                                        const newTranscriptionHoursReceived = {
                                            ...transcriptionData,
                                            qcApprovedTranscription: {
                                                ...transcriptionData.qcApprovedTranscription,
                                                shaip: e.target.value,
                                            },
                                        };
                                        setTranscriptionData(newTranscriptionHoursReceived);
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-2xl font-semibold py-2 border-b-2">Images Collected</h1>
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            <div className="mt-2">
                                <label className="flex">
                                    Data collection:
                                </label>
                                <InputText type="number" value={imagesCollected} name="name" placeholder="Total Images Collected" unit="Images" onChange={(e) => { setImagesCollected(e.target.value) }} />
                            </div>
                        </div>
                        <div className="flex justify-end">
                        <input className="btn mt-4 mr-0 flex justify-end" type="submit" value="Submit" />
                    </div>
                    </div>
                </form>
            </div>
        </DashboardLayout >
    )
}

export const getServerSideProps = withAuthorizedPageAccessRights({
    getServerSideProps: async () => {
        await mongodbClient.connect();
        const db = mongodbClient.db("vaani");
        const injestedData = db.collection("datastatic");

        const data = await injestedData.findOne({ name: "staticData" });
        delete data._id;
        return { props: { data } };
    }
}, 100);