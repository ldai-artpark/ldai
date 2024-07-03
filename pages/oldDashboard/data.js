import withAuthorizedPageAccessRights from "../../src/security/withAuthorizedPageAccessRights";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import mongodbClient from "../../src/node/mongodb-client";

const speechDataCollected = {
    "Megdap": 8400,
    "Shaip": 13711.19,
}

export default function Data({ data }) {

    return (
        <DashboardLayout currentPage={"New Data"}>
            <div className="items-center mt-12">
                <div>
                    <h1 className='font-bold text-2xl'>Data Funnel </h1>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <div className='grid grid-cols-4 gap-4'>
                        <div className="card w-54 bg-green-400 text-black shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Speech data collected</h2>
                                <p>Megdap -  {data.dataFunnel.speechDatacollected.magdap} Hrs </p>
                                <p>Shaip - {data.dataFunnel.speechDatacollected.shaip} Hrs</p>
                            </div>
                        </div>
                        <div className="card w-54 bg-green-400 text-black shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Speech data delivered</h2>
                                <p>Megdap - {data.dataFunnel.speechDataDelivered.magdap}  Hrs </p>
                                <p>Shaip - {data.dataFunnel.speechDataDelivered.shaip} Hrs</p>
                            </div>
                        </div>
                        <div className="card w-54 bg-green-400 text-black shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Speech data passed QC</h2>
                                <p>Megdap -  {data.dataFunnel.speechDataPassedQC.magdap} Hrs</p>
                                <p>Shaip - {data.dataFunnel.speechDataPassedQC.shaip} Hrs</p>
                            </div>
                        </div>
                        <div className="card w-54 bg-green-400 text-black shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Data uploaded</h2>
                                <p>Megdap - {data.dataFunnel.dataUploaded.magdap} Hrs</p>
                                <p>Shaip - {data.dataFunnel.dataUploaded.shaip} Hrs</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='mt-6'>
                        <h1 className='font-bold text-2xl'>Geographical Presence</h1>
                        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className="card w-54 bg-green-400 text-black shadow-xl p-4">
                                <div className="card-body">
                                    <h2 className="card-title">Data collection</h2>
                                    <p>Megdap -  {data.geographicalPresenceData.dataCollection.magdap} Districts</p>
                                    <p>Shaip - {data.geographicalPresenceData.dataCollection.shaip} Districts</p>
                                </div>
                            </div>
                            <div className="card w-54 bg-green-400 text-black shadow-xl p-4">
                                <div className="card-body">
                                    <h2 className="card-title">QC</h2>
                                    <p>QC of {data.geographicalPresenceData.totalQC} Districts</p>
                                    <p>{data.geographicalPresenceData.totalFreelancers} Freelancers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <h1 className='font-bold text-2xl'>Transcription Data</h1>
                        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className="card w-54 bg-green-400 text-black shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">Transcription hours received</h2>
                                    <p>Megdap -  {data.transcriptionData.transcriptionHoursReceived.magdap} Hrs</p>
                                    <p>Shaip - {data.transcriptionData.transcriptionHoursReceived.shaip} Hrs</p>
                                </div>
                            </div>
                            <div className="card w-54 bg-green-400 text-black shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">QC Approved Transcription</h2>
                                    <p>{data.transcriptionData.qcApprovedTranscription.magdap} Hrs</p>
                                    <p>{data.transcriptionData.qcApprovedTranscription.shaip} Hrs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-6'>
                    <h1 className='font-bold text-2xl'>Images Collected</h1>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <div className="grid grid-cols-4">
                        <div className="card bg-green-400 text-black shadow-xl p-4">
                            <div className="card-body">
                                <h2 className="card-title">Total Images Collected</h2>
                                <p>{data.imagesCollected}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-6 pb-32'>
                    <h1 className='font-bold text-2xl'>Summary</h1>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <p>Our data funnel currently shows that we have collected a total of {data.dataFunnel.speechDatacollected.magdap}  hours of speech data for Megdap and {data.dataFunnel.speechDatacollected.shaip} hours for Shaip. Of that, {data.dataFunnel.speechDataDelivered.magdap} hours of Megdap and {data.dataFunnel.speechDataDelivered.shaip} hours of Shaip have been delivered and submitted for Quality Control. Currently, none of the speech data has passed QC and none of the data has been uploaded.</p>
                    <p>In terms of geographical presence, we have a broad reach in terms of data collection. We have data collection efforts ongoing in {data.geographicalPresenceData.dataCollection.magdap} districts for Megdap and {data.geographicalPresenceData.dataCollection.shaip} districts for Shaip. This represents a diverse range of regions and allows us to gather data from a wide range of demographic groups.</p>
                    <p>For Quality Control, we have {data.geographicalPresenceData.totalQC} districts covered and {data.geographicalPresenceData.totalFreelancers} freelancers working on it, ensuring that the data is accurate, and unbiased.</p>
                    <p>In addition to speech data, we have also collected a total of {data.imagesCollected} images. These images will be used in conjunction with the speech data to provide a more comprehensive understanding of the data.</p>
                </div>
            </div>
        </DashboardLayout>
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