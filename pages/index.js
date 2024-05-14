import { CallToAction } from '../components/CallToAction'
import { Faqs } from '../components/Faqs'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Pricing } from '../components/Pricing'
import { PrimaryFeatures } from '../components/PrimaryFeatures'
import { SecondaryFeatures } from '../components/SecondaryFeatures'
import { Testimonials } from '../components/Testimonials'
import {useState,useEffect} from "react";
import {districtwisedata, statewisedata} from "../src/data/info";
import LowResource from "../components/LowResourse";


export default function Home({ data }) {
    const [isClient , setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <div className={'bg-slate-50'}>
            {isClient && <Header />}
            <main>
                <Hero />
                <PrimaryFeatures stats={data.stats} />
                <SecondaryFeatures data={data} />
                <CallToAction />
                <Testimonials />
                {/*<LowResource />*/}
                <Pricing />
                <Faqs />
            </main>
            <Footer />
        </div>
    )
}

export async function getStaticProps() {

    let url = null;
    try {
        url = new URL(`http://127.0.0.1:3001/api/stats?data_source=${"VAANI"}`);
    }
    catch (e) {
        url = new URL(`http://127.0.0.1:3001/api/stats?data_source=${"VAANI"}`);
    }

    let stats = null;

    try {
        let res = await fetch(url.toString());
        stats = await res.json();
    }
    catch (error) {
        console.log(error)
    }

    console.log(stats);

    const district_data = stats?.map_data.districtwisedata.map((item) => {
        return {
            id: item.district,
            district: item.district,
            state: item.state,
            duration_per_district_hrs: item.duration_hours,
            spks_per_district: item.speaker_count,
            transcription_duration:item.transcription_duration
        }
    })

    const state_data = stats?.map_data.statewisedata.map((item) => {
        console.log(item)
        return {
            id: item.state,
            total_duration_hrs: Number(item.duration_hours),
            total_speakers: item.speaker_count,
            transcription_duration_state:item.transcription_duration
        }
    })

    const data = {
        stats: {
            total_Files: stats?.total_files,
            total_duration: stats?.total_duration,
            total_speakers: stats?.total_speakers,
            male_Speakers: stats?.male_audio,
            female_Speakers: stats?.female_audio,
            total_districts: stats?.total_districts,
            total_states: stats?.total_states
        },
        data: {
            all: district_data
        },
        stateWiseAggregates: {
            all: state_data
        }
    }

    return {
        props: {
            data,
        },
        revalidate: 600,
    }
}
