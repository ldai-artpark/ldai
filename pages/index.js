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
                <PrimaryFeatures />
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
    //
    // let url = null;
    // try {
    //     url = new URL(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/v1/get-raw-data-stats");
    // }
    // catch (e) {
    //     url = new URL(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/v1/get-raw-data-stats`);
    // }
    //
    // let data = null;
    //
    // try {
    //     let res = await fetch(url.toString());
    //     data = await res.json();
    // }
    // catch (error) {
    //     console.log(error)
    // }
 
    const district_data = districtwisedata.map((item) => {
        return {
            id: item.District,
            district: item.District,
            state: item.state,
            duration_per_district_hrs: item.Duration,
            spks_per_district: item.SpeakerCount,
            transcription_duration:item.transcription_duration
        }
    })

    const state_data = statewisedata.map((item) => {
        return {
            id: item.State,
            total_duration_hrs: Number(item.Duration),
            total_speakers: item.SpeakerCount,
            duration_percentage: item.DurationPercentage,
            transcription_duration_state:item.transcription_duration_state
        }
    })

    const data = {
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
