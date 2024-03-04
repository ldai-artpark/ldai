import React, {Fragment} from 'react';

import {Dialog, Transition} from '@headlessui/react'
import useSwrImmutable from "swr/immutable";
import {getFetcher, modifyUserFetcher} from "../src/fetchers";
import {useDispatch, useSelector} from "react-redux";
import {setTeamChangeRoleRequest} from "../slices/mainSlice";
import {useSWRConfig} from "swr";


const UserAccessChangeCP = ({afterClose}) => {

    const {data: rolesData, error: rolesError} = useSwrImmutable("/api/v1/get-roles", getFetcher);
    const {data: orgs, error: orgsError} = useSwrImmutable("/api/v1/get-orgs", getFetcher);

    const {mutate} = useSWRConfig();

    const [isMutating, setIsMutating] = React.useState(false);
    const [error, setError] = React.useState(null);

    const changeRoleRequest = useSelector(state => state.main.team.changeRoleRequest);
    const dispatch = useDispatch();

    const open = changeRoleRequest.userEmail !== null;
    const {userEmail:email, userRole : role, userOrg: org} = changeRoleRequest;
    const close = () => {
        dispatch(setTeamChangeRoleRequest({userEmail: null, userRole: null}));
    }


    const handleRoleChange = async (e) => {
        e.preventDefault();
        const newRole = e.target.role.value;
        const organization = e.target.org.value === "NA" ? null : e.target.org.value;

        try {
            setIsMutating(true);
            setError(null);
            await mutate("/api/v1/get-members", modifyUserFetcher(email, newRole, organization));
            setIsMutating(false);
            close();
        } catch (e) {
            setIsMutating(false);
            setError(e.message);
        }
    }

    return (
        <Transition.Root show={open} as={Fragment} afterLeave={afterClose} appear>
            <Dialog as="div" className="relative z-10" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0  bg-opacity-25 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-zinc-500 divide-opacity-10 overflow-hidden rounded-xl bg-white dark:bg-zinc-900 bg-opacity-10 shadow-2xl shadow-zinc-300 dark:shadow-zinc-700 ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
                            <div className=" shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">Update access</h3>
                                    <div className="mt-2 max-w-xl text-sm text-zinc-500">
                                        <p>Change the user permission associated with the following email.</p>
                                    </div>
                                    <form className="mt-5 " onSubmit={handleRoleChange}>
                                        <div className={"flex flex-col gap-3"}>
                                            <div className="w-full sm:max-w-xl">
                                                <label htmlFor="email" className="sr-only">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={email}
                                                    readOnly={true}
                                                    className="text-zinc-800 dark:text-zinc-200 bg-inherit p-2 pl-3 block w-full rounded-md border-zinc-300 focus:border-none focus:ring-none focus:outline-none sm:text-sm"
                                                    placeholder="you@example.com"
                                                />
                                            </div>
                                            <div className={"sm:flex sm:items-center sm:max-w-xl"}>
                                                <label htmlFor="role" className="sr-only">
                                                   Role
                                                </label>
                                                <select
                                                    name="role"
                                                    id="role"
                                                    readOnly={true}
                                                    defaultValue={role}
                                                    className="p-2 shrink text-zinc-800 dark:text-zinc-200 bg-inherit  block w-full rounded-md border-zinc-300 shadow-sm focus:border-none focus:ring-none focus:outline-none sm:text-sm"
                                                >
                                                    {
                                                        rolesData?.map((role) => (
                                                            <option key={role.role} value={role.role}>{role.name} ({role.role})</option>
                                                        ))
                                                    }
                                                </select>
                                                <label htmlFor="org" className="sr-only">
                                                   Organization Detail
                                                </label>
                                                <select
                                                    name="org"
                                                    id="org"
                                                    readOnly={true}
                                                    defaultValue={role}
                                                    className="p-2 shrink text-zinc-800 dark:text-zinc-200 bg-inherit  block w-full rounded-md border-zinc-300 shadow-sm focus:border-none focus:ring-none focus:outline-none sm:text-sm"
                                                >
                                                    <option value={"NA"} >Not Applicable(for higer level members)</option>
                                                    {
                                                        orgs?.map((org) => (
                                                            <option key={org} value={org}>{org}</option>
                                                        ))
                                                    }
                                                </select>
                                                
                                            </div>
                                            <button
                                                    type="submit"
                                                    disabled={isMutating}
                                                    className="w-40 grow mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                >
                                                    {
                                                        isMutating ? <>Modifying</> :
                                                        <>Save </>}
                                                </button>
                                                {
                                                    error && <div className={"text-red-500 text-sm"}>{error}</div>
                                                }
                                        </div>

                                    </form>
                                    <span className={"sr-only"}>ss7 was here!</span>
                                </div>
                            </div>
                        </Dialog.Panel>

                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

UserAccessChangeCP.propTypes = {

};

export default UserAccessChangeCP;