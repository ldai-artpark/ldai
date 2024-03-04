import React from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import withAuthorizedPageAccessRights from "../../src/security/withAuthorizedPageAccessRights";
import RawData from "../../components/RawData";
import StatsSecondaryNav from "../../components/StatsSecondaryNav";


const MapsPage = () => {

    return (
        <DashboardLayout currentPage={"Stats"}
                         secondaryNav={<StatsSecondaryNav />}
       >
            <div className={"px-8"}>

                <div>
                    <h1 className="text-xl font-bold leading-6 pl-0">Raw Data Stats</h1>
                    <p className={"text-sm text-zinc-500 dark:text-zinc-400"}>
                        Stats regarding the data acquired by the different teams at the field in different regions.
                    </p>
                </div>


                <div className={"mt-4"}>
                    <RawData />
                </div>
            </div>
        </DashboardLayout>
    );
};


export const getServerSideProps = withAuthorizedPageAccessRights({}, 100);
export default MapsPage;