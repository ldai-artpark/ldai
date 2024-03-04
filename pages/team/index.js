import DashboardLayout from "../../components/layouts/DashboardLayout";
import TripleLayout from "../../components/layouts/TripleLayout";
import Gravatar from "react-gravatar";

import useSwr, {useSWRConfig} from "swr";
import useSwrImmutable from "swr/immutable";
import {useUser} from "@auth0/nextjs-auth0";
import UserAccessChangeCP from "../../components/UserAccessChangeCP";
import {addUserFetcher, getFetcher} from "../../src/fetchers";
import {useDispatch} from "react-redux";
import {setTeamChangeRoleRequest} from "../../slices/mainSlice";
import withAuthorizedPageAccessRights from "../../src/security/withAuthorizedPageAccessRights";
import {useState} from "react";

export default function HomePage() {

    const {data : userData, error} = useSwr("/api/v1/get-members", getFetcher);

    const {data: rolesData, error: rolesError} = useSwrImmutable("/api/v1/get-roles", getFetcher);

    const {data: orgs, error: orgError} = useSwrImmutable("/api/v1/get-orgs", getFetcher);

    const dispatch = useDispatch();

    const {mutate} = useSWRConfig();
    const {user} = useUser();

    const [formSubmitError, setFormSubmitError] = useState(null);

    const handleModifyUser =  (email, role, org) => () => {
        dispatch(setTeamChangeRoleRequest({userEmail: email, userRole: role, userOrg: org}));
    }

    const handleAddUser = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const role = e.target.role.value;
        const org = e.target.org.value === "NA" ? null : e.target.org.value;

        try {
            setFormSubmitError(null);
            await mutate("/api/v1/get-members", addUserFetcher(email, role, org));
            e.target.reset();
        } catch (e) {
            console.log(e);
            setFormSubmitError(e.message);
        }
    }

    return (
        <DashboardLayout currentPage={"Team"}>
            <TripleLayout
                center={<div className="pr-2">
                    <h2 className={"text-xl font-bold text-zinc-800 dark:text-zinc-100"}>Manage Team</h2>
                    <p className="text-sm font-medium text-zinc-500">Members with access to view, edit or manage. You can add or modify existing user&apos;s access. </p>
                    <ul role="list" className="mt-4 py-6 divide-y divide-zinc-200 dark:divide-zinc-800 border-t border-b border-zinc-200 dark:border-zinc-800">
                        {
                            !userData && !error  && <div className={"text-center"}>Loading users...</div>
                        }
                        {userData?.map?.((person, personIdx) => (
                            <li key={personIdx} className="flex items-center justify-between space-x-3 py-4">
                                <div className="flex min-w-0 flex-1 items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <Gravatar email={person.email} size={40} className="h-10 w-10 rounded-full" rating={""} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{person.email}</p>
                                        <div className="flex">
                                            <p className="truncate text-sm font-medium text-zinc-500">{person.role}</p>
                                            {person.org !=null && (<p className="truncate text-sm font-medium text-zinc-500">&nbsp;-&nbsp;{person.org}</p>)}
                                        </div>
                                    </div>
                                </div>
                                {
                                    person.email !== user?.email &&
                                    <div className="flex-shrink-0">
                                        <button
                                            onClick={handleModifyUser(person.email, person.role, person.org)}
                                            type="button"
                                            className="inline-flex items-center rounded-full border border-transparent bg-zinc-100 py-2 px-3 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                                              <span className="text-sm font-medium text-zinc-900">
                                  {' '}
                                                                  Change role <span
                                                                  className="sr-only">{person.name}</span>{' '}
                                </span>
                                        </button>
                                    </div>}
                            </li>
                        ))}

                        {
                            userData?.length === 0 && <div className={"text-center"}>
                                <p className={"text-zinc-500 dark:text-zinc-400"}>No members added yet.</p>
                            </div>
                        }
                    </ul>
                    {
                        !userData || userData.length === 0 && error && <div className={"text-center text-red-500"}>Error loading users...</div>
                    }
                </div>
                }
                right={<div className="max-w-lg flex justify-center">
                    <div>
                        <div className="text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-zinc-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                            <h2 className="mt-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">Add team members</h2>
                            <p className="mt-1 text-sm text-zinc-500">
                                Add team members to Vaani, to manage, create, and edit content.
                            </p>
                        </div>
                        <form onSubmit={handleAddUser} className="mt-6 flex">
                            <div className={"flex flex-col gap-3 w-full"}>
                                <div className={"text-zinc-700"}>
                                    <label htmlFor="email" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        className="block pl-2 py-2 w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Enter an email"
                                    />
                                </div> 
                                <div className={"flex-none md:flex"}>
                                    <label htmlFor="role" className="sr-only">
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        className={"text-zinc-700 block pl-2 w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-4 md:mb-0 md:mr-4 "}
                                    >
                                        {
                                            rolesData?.map((role) => (
                                                <option key={role.role} value={role.role}>{role.name}</option>
                                            ))
                                        }
                                    </select>
                                    <select
                                        id="org"
                                        name="org"
                                        className={"text-zinc-700 block pl-2 w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"}
                                    >
                                        <option value={"NA"} >Not Applicable(for higher level members)</option>
                                        {
                                            orgs && orgs?.map((org) => (
                                                <option key={org} value={org}>{org}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                
                                <button
                                        type="submit"
                                        className="ml-4 flex-shrink-0 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        disabled={rolesError || !rolesData}
                                    >
                                        Add
                                    </button>
                                    {
                                        rolesError && <div className={"text-red-500 text-sm ml-2"}>Error loading roles. Retrying. . .</div>
                                    }
                                    {
                                        formSubmitError && <div className={"text-red-500 text-sm ml-2"}>Error adding user. {formSubmitError}</div>
                                    }
                            </div>


                        </form>
                    </div>

                </div>}
            />
            <UserAccessChangeCP />

        </DashboardLayout>
    )
}

export const getServerSideProps = withAuthorizedPageAccessRights(undefined, 1);
