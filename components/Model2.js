import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {CheckIcon, XIcon} from "@heroicons/react/solid";
import {useMyContext} from "../contexts/MyContext";

export default function Example() {
    const [open, setOpen] = useState(true)
    const {popup, setPopUp} = useMyContext();

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50 " initialFocus={cancelButtonRef}
                    onClose={()=>{}}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0  w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl ">
                               <div>
                                   <div className="flex justify-end bg-blue-900/90  p-4">
                                       <XIcon className="h-6 w-6 text-slate-50 cursor-pointer"
                                                  onClick={() => {
                                                        setPopUp(false)
                                                      setOpen(false)
                                                    }
                                       }
                                       />
                                   </div>

                                   <div className="border border-gray-300 rounded-lg p-8 m-8 text-center">

                                       <h2 className="text-2xl font-bold mb-4 text-zinc-600">Project Vaani Data Access</h2>

                                       <p className="text-base text-gray-600 mb-4">The data from Project Vaani is available under license: <strong>CC-BY-4.0</strong></p>

                                       <p className="text-base text-gray-600 mb-4">Date: <strong>09 Jan, 2024</strong></p>

                                       <p className="text-base text-gray-600 mb-4">To access the data, click the button below:</p>

                                       <a href="https://vaani.iisc.ac.in/data_09jan.tar.gz" className="inline-block bg-blue-900/90 text-white py-2 px-4 rounded-full no-underline hover:bg-blue-800/90">Download JSON File</a>

                                       <p className="text-base text-gray-600 mt-4">For audio data download,download the following parts and then extract them:</p>

                                       <div className="flex flex-wrap gap-2 justify-around">
                                           <a href="https://vaani.iisc.ac.in/Audios.tar.gz.aa" className="text-blue-500 no-underline hover:underline">Part 1</a>
                                           <a href="https://vaani.iisc.ac.in/Audios.tar.gz.ab" className="text-blue-500 no-underline hover:underline">Part 2</a>
                                           <a href="https://vaani.iisc.ac.in/Audios.tar.gz.ac" className="text-blue-500 no-underline hover:underline">Part 3</a>
                                           <a href="https://vaani.iisc.ac.in/Audios.tar.gz.ad" className="text-blue-500 no-underline hover:underline">Part 4</a>
                                           <a href="https://vaani.iisc.ac.in/Audios.tar.gz.ae" className="text-blue-500 no-underline hover:underline">Part 5</a>
                                       </div>

                                       <p className="text-base text-gray-600 my-4">To download the Image Dataset, click the button below:</p>

                                       <a href="https://vaani.iisc.ac.in/Images.tar.gz" className="inline-block bg-blue-900/90 text-white py-2 px-4 rounded-full no-underline hover:bg-blue-800/90">Download Image Dataset</a>

                                       <p className="text-base text-gray-600 mt-4">(By clicking the links, you agree to download the data under license:)
                                           <a href={"https://creativecommons.org/licenses/by/4.0/legalcode"} className="text-blue-500 no-underline hover:underline">
                                               <strong className={'ml-2 underline'}>CC-BY-4.0</strong>
                                           </a>
                                       </p>


                                       {/*<p className="text-base text-gray-600 mt-4">Number of Downloads: <strong>1016</strong></p>*/}

                                   </div>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
