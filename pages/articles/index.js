import article1 from "../../images/articles/article1.webp"
import article2 from "../../images/articles/article2.webp";
import article3 from "../../images/articles/article3.webp";
import article4 from "../../images/articles/article4.jpg";
import article5 from "../../images/articles/article5.jpg";
import article6 from "../../images/articles/article6.jpg";
import article7 from "../../images/articles/image7.jpg";
import article8 from "../../images/articles/image8.jpg";
import article9 from "../../images/articles/image9.jpg";
import Link from "next/link";
import Image from "next/image";
import {ArticleNav} from "../../components/ArticleNav"
import {useEffect, useState} from "react";



const testimonials = [

    
    {
        content:
            '',
        authorName: 'Sohini Bagchi',
        href: "https://www.livemint.com/technology/tech-news/artparkiisc-google-to-bring-innovation-to-india-s-diverse-languages-11671445526332.html",
        articleTitle: "Artpark-IISc, Google to bring innovation to India’s diverse languages",
        date:"19 Dec 2022",
        articleImage: article1
    },
    {
        content:
            '',
        authorName: 'Abhijit Ahaskar',
        href: "https://www.livemint.com/companies/start-ups/google-taps-ai-to-grasp-india-s-language-diversity-11671466688191.html?utm_source=pocket_mylist",
        articleTitle: "Google taps AI to grasp India’s language diversity",
        date:"19 Dec 2022",
        articleImage: article2
    },
    {
        content:'',
        authorName: ' FE Education',
        href:"https://www.financialexpress.com/jobs-career/education-google-vaani-google-for-india-iisc-iit-iitm-ai-ml-education-2919264/",
        articleTitle: "Google for India 2022: Google grants $1M to IITM, launches Project Vaani in partnership with IISC",
        date:"December 19, 2022 ",
        articleImage: article9
    },
    {
        content: "",
        authorName: "Shilpa Phadnis",
        href: "https://timesofindia.indiatimes.com/business/india-business/google-announces-ai-projects-in-indian-languages-agri/articleshow/96359903.cms",
        articleTitle: "Google announces AI projects in Indian languages, agri",
        date: " Dec 20, 2022",
        articleImage: article1
    },

    {
        content:
            '',
        authorName: 'ISHA RAUTELA',
        href: "https://www.thehindubusinessline.com/news/variety/project-vaani-scales-decibels-as-it-maps-language-landscape-of-india/article66304920.ece",
        articleTitle: "Project Vaani scales decibels as it maps language landscape of India",
        date:"December 25, 2022 ",
        articleImage: article3
    },
    {
        content:
            '',
        authorName: 'Shreya Bose',
        href: "https://trak.in/stories/google-indias-big-ai-ml-push-language-samples-from-700-districts-will-be-collected-grants-rs-8-crore-to-iisc",
        articleTitle: "Google India's Big AI/ML Push: Language Samples From 700+ Districts Will Be Collected, Grants Rs 8 Crore To IISc",
        date:"Dec 26, 2022",
        articleImage: article6
    },
   
    {
        content:
            '',
        authorName: 'Keerthana Kantharaj',
        href: "https://www.ceoinsightsindia.com/business-inside/india-s-first-google-io-connect-the-future-of-user-experience-is-here-nwid-14737.html",
        articleTitle: "India's First Google I/O Connect: The Future of User Experience is Here",
        date:"",
        articleImage: article4
    },


    {
        content:'',
        authorName: 'ARUN PADMANABHAN',
        href:"https://www.moneycontrol.com/news/technology/indias-ai-uprising-can-a-challenger-emerge-in-the-llm-marathon-11931681.html",
        articleTitle: "India's AI Uprising: Can A Challenger Emerge In The LLM Marathon?",
        date:"DECEMBER 21, 2023 ",
        articleImage: article7
    },
    {
        content :'',
        authorName: 'Milin Stanly',
        href:"https://indiaai.gov.in/article/india-turns-to-ai-to-capture-its-121-languages-for-digital-services",
        articleTitle: "India turns to AI to capture its 121 languages for digital services",
        date:"Dec 20, 2023",
        articleImage: article8
    },
    {
        content: '',
        authorName: 'Peter Renolds',
        href: "https://dig.watch/updates/googles-efforts-to-enhance-indian-language-data-and-combat-ai-bias",
        articleTitle: "Google’s efforts to enhance Indian language data and combat AI bias",
        date:"28 Jun 2023",
        articleImage: article5
    },
    {
        content: '',
        authorName: 'ETtech',
        href: "https://economictimes.indiatimes.com/tech/technology/google-deepminds-morni-ai-to-cover-125-indic-languages/articleshow/112904640.cms?from=mdr",
        articleTitle: "Google DeepMind's Morni AI to cover 125 Indic Languages",
        date:"30 Aug 2024",
        articleImage: article1
    },


]
const Index = () => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
            setIsClient(true)
        }
        , [])
    return (
        <div className={'bg-slate-50'}>
            <div className={'container mx-auto'}>
                {isClient && <ArticleNav/>}
                <h1 className={'text-3xl font-bold text-gray-800 mb-8 text-center'}> Media Coverage</h1>
                <p className={'text-gray-600 text-xl text-center mb-8'}>Vaani  media coverage and articles , click on read more to read the full article and know more about vaani</p>
                <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 sm:p-8 '}>
                    {/*{testimonials.map((article, index) => (*/}
                    {/*    <div*/}
                    {/*        key={index}*/}
                    {/*        className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105"*/}
                    {/*    >*/}
                    {/*        <div className="h-40 overflow-hidden p-2">*/}
                    {/*            <Image className='rounded-t-xl'*/}
                    {/*                   src={article.articleImage}*/}
                    {/*                   alt={article.articleTitle}*/}
                    {/*                   width={500}*/}
                    {/*                   height={500}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*        <div className="p-4">*/}
                    {/*            <h2 className="font-bold text-lg mb-2 text-gray-800">*/}
                    {/*                {article.articleTitle}*/}
                    {/*            </h2>*/}
                    {/*            <p className="text-gray-700 text-sm">{article.content}</p>*/}
                    {/*            <p className="text-gray-600 mt-2 text-sm">  {article.date}</p>*/}
                    {/*            <p className="text-gray-600 mt-2 text-sm"> Author: {article.authorName}</p>*/}
                    {/*        </div>*/}
                    {/*        <div className={'p-2'}>*/}
                    {/*            <Link className={''} href={article.href}>*/}
                    {/*            <span className="text-indigo-600 hover:underline text-sm">*/}
                    {/*                Read More ..*/}
                    {/*            </span>*/}
                    {/*            </Link>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*))}*/}


                    {testimonials.slice().reverse().map((article, index) => (
                        <div
                            key={index}
                            className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105"
                        >
                            <div className="h-40 overflow-hidden p-2">
                                <Image className='rounded-t-xl'
                                       src={article.articleImage}
                                       alt={article.articleTitle}
                                       width={500}
                                       height={500}
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="font-bold text-lg mb-2 text-gray-800">
                                    {article.articleTitle}
                                </h2>
                                <p className="text-gray-700 text-sm">{article.content}</p>
                                <p className="text-gray-600 mt-2 text-sm">{article.date}</p>
                                <p className="text-gray-600 mt-2 text-sm">Author: {article.authorName}</p>
                            </div>
                            <div className={'p-2'}>
                                <Link className={''} href={article.href}>
                <span className="text-indigo-600 hover:underline text-sm">
                    Read More ..
                </span>
                                </Link>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
}

export default Index;



