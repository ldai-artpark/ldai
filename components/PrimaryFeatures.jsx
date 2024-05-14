'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import axios from 'axios'
import useSwr from "swr";

import { Container } from './Container'
import backgroundImage from '../images/background-features.jpg'
import screenshotExpenses from '../images/screenshots/expenses.png'
import screenshotPayroll from '../images/screenshots/payroll.png'
import { getFetcher } from "../src/fetchers";
import { Oval } from 'react-loader-spinner'
import { set } from 'lodash'

// const data = {
//   "total_Files": 4778787,
//   "total_duration": "9194.55hr",
//   "male_Speakers": 2242675,
//   "female_Speakers": 2537813,
//   "average_Duration": "6.93s",
//   "max_Duration": "21.449s",
//   "min_Duration": "0.5s"
// }

export function PrimaryFeatures({stats}) {
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  // const [stats, setStats] = useState()
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   (async function fetch() {
  //     // const response = await axios.get(`http://localhost:3001/api/ldai/getStats`)
  //     const response = await axios.get(`/data/api/ldai/getStats`)
  //     setStats(response.data);
  //     setLoading(false)
  //   })()
  // })

  const totalFiles = stats?.total_Files ?? ""
  const totalDuration = stats?.total_duration ?? ""
  const totalSpeakers = stats?.total_speakers ?? ""
  const maleSpeakers = stats?.male_Speakers ?? ""
  const femaleSpeakers = stats?.female_Speakers ?? ""
  const totalDistricts = stats?.total_districts ?? ""
  const totalStates = stats?.total_states ?? ""

  // Create an array of features with proper data handling
  let features = [
    {
      title: 'Total Files',
      value: totalFiles,
      description: "Keep track of everyone's salaries and whether or not they've been paid. Direct deposit not supported.",
      logo: screenshotPayroll,
    },
    {
      title: 'Total Duration',
      value: totalDuration,
      description: "All of your receipts organized into one place, as long as you don't mind typing in the data by hand.",
      logo: screenshotExpenses,
    },
    {
      title: 'Total Speakers',
      value: totalSpeakers,
      description: "Keep track of everyone's salaries and whether or not they've been paid. Direct deposit not supported.",
      logo: screenshotPayroll,
    },
    {
      title: 'Male Audio',
      value: maleSpeakers,
      description: "All of your receipts organized into one place, as long as you don't mind typing in the data by hand.",
      logo: screenshotExpenses,
    },
    {
      title: 'Female Audio',
      value: femaleSpeakers,
      description: "All of your receipts organized into one place, as long as you don't mind typing in the data by hand.",
      logo: screenshotExpenses,
    },
    {
      title: 'Transcription Duration',
      value: "92.82 hrs",
      description: "All of your receipts organized into one place, as long as you don't mind typing in the data by hand.",
      logo: screenshotExpenses,
    },
    {
      title: 'Districts Covered',
      value: totalDistricts,
      description: "All of your receipts organized into one place, as long as you don't mind typing in the data by hand.",
      logo: screenshotExpenses,
    },
    {
      title: 'States Covered',
      value: totalStates,
      description: "All of your receipts organized into one place, as long as you don't mind typing in the data by hand.",
      logo: screenshotExpenses,
    }
  ]

  return (
    <section
      id="About"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-blue-600 pb-28 pt-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            About Project VAANI
          </h2>
          {/* <p className="mt-6 text-lg tracking-tight text-blue-100">
            Well everything you need if you aren’t that picky about minor
            details like tax compliance.
          </p> */}
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  <div className='grid grid-cols-2 gap-1'>
                    {features.map((feature, featureIndex) => (
                      <div
                        key={feature.title}
                        className={clsx(
                          'group relative rounded-xl px-4 py-1 lg:p-8',
                          selectedIndex === featureIndex
                            ? ' lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                            : 'hover:bg-white/10 lg:hover:bg-white/5',
                        )}
                      >
                        <h3>
                          <Tab
                            className={'font-display text-sm sm:text-lg text-blue-100 hover:text-white lg:text-white'}
                          >
                            <span className="absolute  inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                            {feature.title}
                          </Tab>
                        </h3>
                        <p
                          className={'mt-2  font-medium text-sm md:text-xl lg:text-2xl lg:block text-blue-50 group-hover:text-white'}
                        >
                          {feature.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7 " >
                {features.map((feature) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="mt-10 w-full 2xl:ml-20 overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20  2xl:w-[60.8125rem]">
                      <div className="w-full flex justify-center bg-slate-50  py-16 2xl:px-36 px-8 lg:ml-0 2xl:-ml-16  xl:10">
                        <div className="text-zinc-700 text-lg max-w-screen-lg ">
                          <p className="mb-5">Digital India is marching ahead inexorably. Digital interfaces and communications have become critical for access to information, entertainment, economic opportunities and even essential services such as healthcare.</p>
                          <p className="mb-5">Project Vaani, by IISc, Bangalore and ARTPARK, is capturing the true diversity of India’s spoken languages to propel language AI technologies and content for an inclusive Digital India.</p>
                          <p className="mb-5">We expect to create data corpora of over 150,000 hours of speech, part of which will be transcribed in local scripts, while ensuring linguistic, educational, urban-rural, age, and gender diversity (among other potential diversity characteristics). These diligently collected and curated datasets of natural speech and text from about 1 million people across all 773 districts of India will be open-sourced. The current version of the data is open-sourced here. Going forward, we hope to open source through platforms like Bhashini (under the National Language Translation Mission, MeiTY).</p>
                          <p className="mb-5">This will boost the development of technologies such as automatic speech recognition (ASR), speech to speech translation (SST), and natural language understanding (NLU) that reflect the ground realities of how Indians speak.</p>
                          <p className="mb-5">Google is funding the Project Vaani.</p>
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  )
}
