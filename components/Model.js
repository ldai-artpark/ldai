import React, {useEffect} from "react";
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import output from "../src/data/output.json"
import {useRef} from "react";
import VideoJS from '../components/VideoJS';
import {XIcon} from "@heroicons/react/solid";
import ReactPlayer from 'react-player'

function getRandomNumber(max) {
    if (typeof max !== 'number' || max <= 0) {
        throw new Error('Input must be a positive number greater than 0');
    }
    const randomNumber = Math.random() * max;
    return Math.floor(randomNumber);
}

export default function Model({districtName,setPopup}) {
    const data = output[districtName];
    const [open, setOpen] = useState(true)
    const playerRef = useRef(null);
    // const [link,setLink]=useState(data[0]["male"].length > 0 ? data[0]["male"][0].link : data[0]["female"][0].link)
    const [isVisible, setIsVisible] = useState(true);



    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);


    const languages = Object.keys(data ?? {})
    const [link,setLink]=useState(data ? data[languages[0]]["male"].length > 0 ? data[languages[0]]["male"][0].link : data[0]["female"][0].link : "")
    const onPlayerReady = (player) => {
    };

    const options = {
        controls: true,
        autoplay: true,
        preload: 'auto',
    };

    if(!data){
        return (
            <>
                {isVisible && (<span className={"text-red-500 font-bold"}>data not available for this district {districtName}</span>)}
            </>
        )
    }


    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40"
                // onClose={setOpen}
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

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                            <Dialog.Panel className="relative rounded  transform overflow-hidden bg-white   text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-7xl ">
                                <div className={'flex bg-blue-900/90 py-2'}>
                                    <Dialog.Title as="h3" className="text-xl  font-semibold leading-6 font-sans  my-2 px-4">
                                        Language Distribution in India
                                    </Dialog.Title>
                                    <XIcon className={"h-6 w-6 font-sans absolute text-white top-4 right-4 cursor-pointer"}
                                           onClick={() =>
                                             {
                                                  setOpen(false)
                                                  setPopup(false)
                                                }
                                           }/>
                                </div>
                                <div className={'p-8'}>
                                    <p className={'text-xl text-zinc-600 font-thin '}>
                                        Language distribution in <span className={"font-semibold"}>{districtName}</span>
                                    </p>
                                    <div className={'flex flex-col-reverse md:flex md:flex-row gap-4 my-4'}>
                                        <div className=" overflow-y-auto h-auto">
                                            <table className="min-w-full bg-white border-collapse shadow-md rounded">
                                                <thead>
                                                <tr>
                                                    <th className="border px-2 md:px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-sm">Speaker Reported Language</th>
                                                    <th className="border px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-sm">Male Speaker</th>
                                                    <th className="border px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-sm">Female Speaker</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {languages?.map((language) => (
                                                    <tr key={language}>
                                                        <td className="border px-1 md:px-4 py-1 text-xs text-zinc-600 md:text-sm ">{language}</td>
                                                        <td className="border px-2 py-1" >
                                                            {
                                                                data[language]["male"].length > 0 ? (
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            setLink(data[language]["male"][getRandomNumber(data[language]["male"].length)]?.link)
                                                                        }}
                                                                        className="rounded  bg-indigo-600 px-2 py-1 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                                        Play Video
                                                                    </button>
                                                                ) : (
                                                                    <span className={"text-sm text-zinc-600"}>-</span>
                                                                )
                                                            }

                                                        </td>
                                                        <td className="border px-2 py-2">
                                                            {
                                                                data[language]["female"].length > 0 ? (
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            setLink(data[language]["female"][getRandomNumber(data[language]["female"].length)].link)
                                                                        }}
                                                                        className="flex justify-center rounded bg-indigo-600 px-2 py-1 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                                        Play Video
                                                                    </button>
                                                                ) : (
                                                                    <span className={"text-xs text-zinc-600 sm:text-sm"}>-</span>
                                                                )
                                                            }
                                                        </td>   
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={'flex-1'}>
                                            <div className="">
                                                <VideoJS
                                                    className="video-js w-64"
                                                    videoUrl={link}
                                                    options={options}
                                                    onReady={onPlayerReady}
                                                    fluid={true}
                                                />
                                            </div>
                                        </div>
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
