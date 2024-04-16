import Image from 'next/image'

import { Button } from './Button'
import { Container } from './Container'
import IIScLogo from '../assets/IIScLogo.png';
import MeityLogo from '../assets/Meity.png';
import ShaipLogo from '../assets/ShaipLogo.png';
import MagdapLogo from '../assets/Magdaplogo.png';
import GoogleLogo from '../assets/GoogleLogo.png';
import ArtparkLogo from "../assets/ARTPARK.png";
import NewronLogo from '../assets/newron-logo2x.png';
import BhasniLogo from '../assets/bhashini.png';
import Link from "next/link";

const GoogleComponent = () => {
    return (
        <>
            <span className={'md:-mt-5 text-xs font-thin text-slate-900 ml-16 md:ml-32'}>Supported by</span>
            <Image
                style={{width:"200px"}}
                src={GoogleLogo} alt="Google Logo" />
        </>
    );
};

const Logo =[
    {name:"",logo:IIScLogo, props: " w-24"},
    {name:"",logo:ArtparkLogo , props: "h-auto w-64"},
    {name:"Supported by",logo:GoogleLogo, props: "w-auto h-12 "},
    {name:" Support of",logo:BhasniLogo, props: "h-20 w-auto "}
]


const IiscComponent = () => {
    return <Link href={'https://www.iisc.ac.in/'}> <Image className="w-20 h-20 md:w-20 md:h-20-mt-2" src={IIScLogo} alt="IISc Logo" /></Link>;
};

const ArtparkComponent = () => {
    return <Link target='_blank' href={'https://www.artpark.in/language-data-ai'}><Image
        className={"h-auto w-64"} src={ArtparkLogo} alt="Artpark Logo" /></Link>
};
// const ArtparkComponent = () => {
//     return (
//         <a href="https://www.artpark.in/" target="_blank" rel="noreferrer">
//             <Image
//                 style={{width:"200px"}} className={"-mt-2"} src={ArtparkLogo} alt="Artpark Logo" />
//         </a>
//     );
// };

const BhasniComponent = () => {
    return (
        <>
            <span className={'-mt-5 text-xs font-thin text-slate-900'}>support of </span>
            <div className={"flex justify-end"}>
                <Image className="w-16 h-16 md:w-18 md:h-24 md:w-auto " src={BhasniLogo} alt="Bhasni Logo" />
            </div>
        </>
    )
};

export function Hero() {
    return (
        <Container
            id="Home"
            className="pb-16 pt-20 text-center lg:pt-32 bg-slate-50">
            <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                Capturing the language landscape for an inclusive{' '}
                <span className="relative whitespace-nowrap text-blue-600">
          <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
              preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative">digital India</span>
        </span>{' '}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                Project Vaani is one of the largest datasets of Indian dialects ever to exist. Upon completion, it will contain more than 150,000 hours of audio across all districts in India.
            </p>
            <div className="mt-36 lg:mt-44 sm:block hidden">
                <ul
                    role="list"
                    className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
                >
                    {[
                        [
                            { name: 'IISC', logo: <IiscComponent />, width: 100, className: "dark:invert" ,text:"" },
                            { name: 'Artpark', logo: <ArtparkComponent/>, width: 200 ,text:"",className: 'invert brightness-150 bg-slate-50'},

                        ],
                        [
                            { name: 'Google', logo: <GoogleComponent/>, width: 200, className: "dark:invert" ,text:"Supported by" },
                            { name: 'Bhashini', logo: <BhasniComponent />, width: 200, className: "dark:invert" ,text:"Proudly in support of " },
                        ],

                    ].map((group, groupIndex) => (
                        <li key={groupIndex}>
                            <ul
                                role="list"
                                className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
                            >
                                {group.map((company) => (
                                    <li key={company.name} className=" flex flex-col gap-3">
                                        {company.logo}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>

            {/*--------- for Mobile Screen--------------*/}

            <div className="mt-36  sm:hidden  mr-8">
                <div className="grid grid-cols-2 gap-4 justify-between items-center bg-slate-50">
                    {Logo.map((company) => (
                        <div className="relative flex flex-col gap-2 items-center justify-center" key={company.name}>
                            <span className="text-xs font-semibold text-zinc-900 ml-16 " style={{ fontSize: "0.5rem" }}>{company.name}</span>
                            <Image className={` ${company.props} invert-[.12]`} src={company.logo} alt={company.name}  />
                        </div>
                    ))}
                </div>
            </div>

        </Container>
    )
}
