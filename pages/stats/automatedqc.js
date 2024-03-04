import React from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import withAuthorizedPageAccessRights from "../../src/security/withAuthorizedPageAccessRights";
import StatsSecondaryNav from "../../components/StatsSecondaryNav";
import AutomatedData from '../../components/AutomatedData';


const MapsPage = () => {

    return (
        <DashboardLayout currentPage={"Stats"}
                         secondaryNav={<StatsSecondaryNav />}
       >
            <div className={"px-8"}>

                <div>
                    <h1 className="text-xl font-bold leading-6 pl-0">Automated QC Stats</h1>
                    <p className={"text-sm text-zinc-500 dark:text-zinc-400"}>
                      This is an overview of the automated QC statistics. 
                    </p>
                </div>
                

                <div className={"mt-4"}>
                    <AutomatedData />
                </div>
            </div>
        </DashboardLayout>
    );
};


export const getServerSideProps = withAuthorizedPageAccessRights({}, 100);
export default MapsPage;