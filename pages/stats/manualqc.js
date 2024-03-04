import React from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import withAuthorizedPageAccessRights from "../../src/security/withAuthorizedPageAccessRights";
import StatsSecondaryNav from "../../components/StatsSecondaryNav";
import UnderConstruction from "../../components/UnderConstruction";


const MapsPage = () => {

    return (
        <DashboardLayout currentPage={"Stats"}
                         secondaryNav={<StatsSecondaryNav />}
       >
            <div className={"px-8"}>

                <div>
                    <h1 className="text-xl font-bold leading-6 pl-0">Manual QC Stats</h1>
                    <p className={"text-sm text-zinc-500 dark:text-zinc-400"}>

                    </p>
                </div>


                <div className={"mt-4"}>
                    <UnderConstruction />
                </div>
            </div>
        </DashboardLayout>
    );
};


export const getServerSideProps = withAuthorizedPageAccessRights({}, 100);
export default MapsPage;