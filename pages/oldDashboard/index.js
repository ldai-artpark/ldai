import DashboardLayout from "../../components/layouts/DashboardLayout";
import withAuthorizedPageAccessRights from "../../src/security/withAuthorizedPageAccessRights";
// import RawDataChoropleth from "../../components/RawDataChoropleth";
import dynamic from "next/dynamic";
import DashboardStats from "../../components/DashboardStats";
import {Suspense} from "react";
import LoadingState from "../../components/LoadingState";
import SankeyChart from "../../components/SankeyChart";
import {useSelector} from "react-redux";

const RawDataChoropleth = dynamic(() => import("../../components/RawDataChoropleth"), {ssr: false});

export default function HomePage() {

    const userDetail = useSelector((state) => state.userDetails.user);
    console.log(userDetail)

    return (
        <DashboardLayout currentPage={"Dashboard"}>
            <header>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold leading-6 pl-0">Dashboard</h1>
                </div>
            </header>
            
            <div>
                <div className={"flex flex-col lg:flex-row"}>
                    {/* Top */}
                    <div className={"grow"}>
                        <div className={"px-8 mt-8"}>
                            <div className={""}>
                                <h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">Collected Data Stats</h3>
                                <DashboardStats org={userDetail?.org} />
                            </div>
                        </div>
                    </div>

                    {/* Center  */}
                    <div>
                        <Suspense fallback={<div className={"min-h-[200px] min-w-[200px]"}><LoadingState /></div>}>
                            <RawDataChoropleth organization={userDetail?.org} />
                        </Suspense>
                    </div>
                    
                </div>
                {userDetail?.org == null && (<div>
                    <h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100 px-8">Data flow</h3>
                    <SankeyChart />
                </div>)}
                
            </div>

        </DashboardLayout>
    )
}


export const getServerSideProps = withAuthorizedPageAccessRights({}, 100);
