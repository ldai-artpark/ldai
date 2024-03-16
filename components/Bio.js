import Image from 'next/image'
import PrashantaImage from '../assets/Prasanta_Kumar_Ghosh.jpg'
import RaghuramdImage from '../assets/raghuramd.png'
import clsx from 'clsx'

const bioData = [
    {
        id: "1",
        reverse: true,
        name: "Dr. Prasanta Kumar Ghosh",
        image: PrashantaImage,
        subBio: "Assistant professor, Dept of Electrical Engineering (EE) at Indian Institute of Science (IISc), Bangalore.",
        bio: "Prasanta Kumar Ghosh received his Ph.D. in Electrical Engineering from University of Southern California (USC), Los Angeles, USA in 2011. During 2011-2012 he was with IBM India Research Lab (IRL) as a researcher. He was awarded the INSPIRE faculty fellowship from Department of Science and Technology (DST), Govt. of India in 2012. He was awarded Center of Excellence in Teaching’s award for excellence in teaching in the category of EE for the year 2010-11 in USC. His research interests are in human centered signal processing with applications to education and health care.",
    },
    {
      id: "2",
      reverse: false,
      name: "Raghu Dharmaraju",
      image: RaghuramdImage,
      subBio: "President ARTPARK",
      bio: "He is a highly experienced innovator with over two decades of experience conceiving and scaling pioneering institutions and innovations. He has launched a portfolio of eight AI innovations, including TRACE-TB, a major national initiative. He has raised $19 million from the Gates Foundation, USAID, and Google.org and has established. Raghu has also launched and scaled award-winning med-tech innovations, including Embrace infant warmers, which have reached approximately 1,000,000 babies via WHO and non-profits, governments, and 300+ private hospitals in 100+ small towns. He has led strategy, product management, and startup operations for a new global business at Corning Environmental Technologies, and has experience in a range of industries including digital health, med-tech, agriculture, financial inclusion, circular economy, and more. Raghu holds a B.Tech. from IIT Madras, an M.S. from the University of Massachusetts, Amherst, and an M.B.A. from Cornell.",
    }
]

function Bio() {
    return (
        <section
        id="team"
        aria-labelledby="author-title"
        className="relative scroll-mt-14 mt-10 pb-3 pt-8 sm:scroll-mt-32 sm:pb-16 sm:pt-10 lg:pt-16">

        {
          bioData.map((item) => {
            return (
              <div key={item.id} className="relative mx-auto max-w-5xl pt-16 sm:px-6 mb-10">
                <div className="bg-slate-100  pt-px rounded-3xl sm:rounded-6xl">
                  <div className={clsx("relative mx-auto -mt-16 h-44 w-44 overflow-hidden rounded-full bg-slate-200 md:h-64 md:w-64 md:[shape-outside:circle(60%)] lg:h-60 lg:w-60",{"lg:mr-10  md:float-right": item.reverse, "lg:ml-10  md:float-left": !item.reverse})}>
                    <Image
                      className="absolute inset-0 h-full w-full object-cover"
                      src={item.image}
                      alt=""
                      sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 11rem"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="px-4 py-6 sm:px-10 sm:py-6 md:py-2 lg:px-20 lg:py-6">
                      <p className={clsx("font-display text-2xl md:text-4xl font-extrabold tracking-tight text-blue-900/90 sm:text-3xl text-left md:text-left", {"md:text-left": item.reverse, "md:text-right": !item.reverse})}>
                          <span className="block ">{item.name}</span>
                      </p>
                      <p className={clsx("font-display text-lg font-extrabold tracking-tight text-zinc-700  sm:text-lg",{"md:text-left md:pr-64": item.reverse, "md:text-right": !item.reverse, })}>
                       {item.subBio}
                      </p>
                      <p className="mt-4 tracking-tight text-base text-zinc-600 ">
                        {item.bio}
                      </p>
                  </div>
               </div>
             </div>
            )
          })
        }
      </section>
    )
  }

  export default Bio;
