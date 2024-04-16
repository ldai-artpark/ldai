import Image from "next/image";
import backgroundImage from "../images/background-faqs.jpg";
import {Container} from "./Container";
import Choropleth from "./Choropleth";
import {mapsBreakpoints, mapTranslations} from "../src/projectionConfig";
import {fieldDicts} from "../src/options";
import Fuse from 'fuse.js';
import {useState} from "react";
import useBreakpoint from "../hooks/useBreakpoint";
import {statewisedata} from "../src/data/info";
import {XIcon} from "@heroicons/react/solid";
import Resource from "../src/data/lowresource.json";


const LowResource = () => {
    const [searchLanguage, setSearchLanguage] = useState('');
    const [searchState, setSearchState] = useState('');
    const [searchDistrict, setSearchDistrict] = useState('');
    const [filteredResource, setFilteredResource] = useState([]);
    const [breakpoint] = useBreakpoint();


    const fuseOptions = {
        keys: ['language', 'state', 'district'],
        includeScore: true,
        threshold: 0.3,
    };
    const fuse = new Fuse(Resource, fuseOptions);

    if(filteredResource.length === 0) {
        setFilteredResource(Resource);
    }

    const handleSearch = (event) => {
        const { value } = event.target;
        const results = fuse.search(value);
        const matches = results.map((result) => result.item);
        setFilteredResource(matches);
        setFilteredResource(matches);
        if(event.target.placeholder === 'Search Language') {
            setSearchLanguage(value);
        } else if(event.target.placeholder === 'Search state') {
            setSearchState(value);
        }else if(event.target.placeholder === 'Search district') {
            setSearchDistrict(value);
        }
    };

    const handleClearValue = ()=>{
        setSearchLanguage('');
        setSearchState('');
        setSearchDistrict('');
        setFilteredResource(Resource);
    }



    return (
        <section id="faq" aria-labelledby="faq-title" className="relative overflow-hidden bg-slate-50 py-20 sm:py-32">
            <Image
                className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
                src={backgroundImage}
                alt=""
                width={1558}
                height={946}
                unoptimized
            />
            <Container className="relative">
                <h2 id="faq-title" className="text-3xl sm:text-4xl font-bold text-center text-slate-900 mb-8 sm:mb-12">
                    Low Resource Languages
                </h2>
                <div className={'flex'}>
                    <section className={"flex flex-col gap-2  p-2 w-1/4"}>
                        <div className={'border p-1'}>
                            <h3 className={'bg-indigo-500 text-white p-2'}>Languages
                                <span><XIcon className={'h-4 w-4 float-right cursor-pointer'} onClick={handleClearValue}/></span>
                            </h3>
                            <span>
                                <input
                                    type="text"
                                    placeholder="Search Language"
                                    className="w-full p-1 border-indigo-500 text-sm text-zinc-900"
                                    value={searchLanguage}
                                    onChange={handleSearch}
                                />
                            </span>
                            <div className={'h-64 overflow-y-scroll overflow-x-hidden px-1 py-0.5'}>
                                {filteredResource.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded"
                                            onClick={() => {
                                                const districts = Resource
                                                    .filter(lang => lang.assertLanguage === item.assertLanguage)
                                                    .map(lang => lang.district);
                                                // setSearchDistrict(districts.join(', '));
                                                setFilteredResource(districts);
                                            }}
                                        />

                                        <p className="text-zinc-900 text-sm">{item.assertLanguage}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={'border p-1'}>
                            <h3 className={'bg-yellow-500 text-white p-2'}>District
                                <span><XIcon className={'h-4 w-4 float-right cursor-pointer'} onClick={handleClearValue}/></span>
                            </h3>
                            <span>
                                <input
                                    type="text"
                                    placeholder={'Search district'}
                                    className={'w-full p-1 border-yellow-500 text-sm text-zinc-900'}
                                    value={searchDistrict}
                                    onChange={handleSearch}

                                />
                            </span>
                            <div className={'h-64 overflow-y-scroll overflow-x-hidden px-1 py-0.5'}>
                                {Resource.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4 rounded" onClick={() => {
                                           const languages = Resource.filter((lang) => lang.district === item.district);
                                           setFilteredResource(languages);
                                        }} />
                                        <p className="text-zinc-900 text-sm">{item.district}</p>
                                        <span className="text-zinc-900 text-sm ml-auto">{item.duration?.toFixed(3)}</span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </section>

                    <section className={"flex gap-2 w-3/4 justify-center mt-24"}>
                        <Choropleth
                            className="w-44 h-48"
                            margin={{ top: 20, right: 0, bottom: 0, left: 10 }}
                            region={"india"}
                            data={filteredResource}
                            dataLevel={"districts"}
                            noStateName
                            projectionScale={mapsBreakpoints.projectionScale[breakpoint]}
                            legends={mapsBreakpoints.legends[breakpoint]}
                            value={"duration"} // Use duration for coloring
                            valueFormat={"0.2s"}
                            domain={[0, 2000]} // Adjust domain based on your data
                            projectionRotation={mapTranslations.india.projectionRotation}
                            projectionTranslation={mapTranslations.india.projectionTranslation}
                            onClick={e => {

                            }}
                            tooltip={e => (
                                <>
                                    <div className="bg-slate-50 shadow-md rounded-md p-1 sm:p-2">
                                        <div className="text-xs font-semibold">
                                            State: {e.feature.id}
                                        </div>
                                    </div>
                                </>
                            )}
                        />
                    </section>
                </div>
            </Container>
        </section>
    )
}
export default LowResource;




