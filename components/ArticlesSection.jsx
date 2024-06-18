import Image from 'next/image'
import Link from 'next/link'
import { Button } from './Button'
import { Container } from './Container'

import article1 from '../images/articles/article1.webp'
import article2 from '../images/articles/article2.webp'
import article3 from '../images/articles/article3.webp'
import article4 from '../images/articles/article4.jpg'
import article5 from '../images/articles/article5.jpg'
import article6 from '../images/articles/article6.jpg'
import article7 from "../images/articles/image7.jpg";
import article8 from "../images/articles/image8.jpg";
import article9 from "../images/articles/image9.jpg";


const testimonials = [
  [
    {
      content:"",
      authorName: " ARUN PADMANABHAN",
      href: "https://www.moneycontrol.com/news/technology/indias-ai-uprising-can-a-challenger-emerge-in-the-llm-marathon-11931681.html",
      articleTitle: "IISc/ARTPARK's Project Vaani identified as a key initiative in shaping India's LLM space",
      date:"DECEMBER 21, 2023",
      articleImage: article7
    },
    {
      content :' This is the fourth email I’ve sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important.,',
      authorName: 'Milin Stanly',
      href:"https://indiaai.gov.in/article/india-turns-to-ai-to-capture-its-121-languages-for-digital-services",
      articleTitle: "IISc/ARTPARK’s project Vaani featured as one of the few projects actively involved in enabling speech technologies in India languages",
      date:"Dec 20, 2023",
      articleImage: article8
    },
  ],
  [
    {
      content:
          'TaxPal is so easy to use I can’t help but wonder if it’s really doing the things the government expects me to do.',
      authorName: 'Sohini Bagchi',
      href: "https://www.livemint.com/technology/tech-news/artparkiisc-google-to-bring-innovation-to-india-s-diverse-languages-11671445526332.html",
      articleTitle: "Artpark-IISc, Google to bring innovation to India’s diverse languages",
      date:"19 Dec 2022",
      articleImage: article1
    },
    {
      content:
          'There are so many things I had to do with my old software that I just don’t do at all with TaxPal. Suspicious but I can’t say I don’t love it.',
      authorName: 'Keerthana Kantharaj',
      href: "https://www.ceoinsightsindia.com/business-inside/india-s-first-google-io-connect-the-future-of-user-experience-is-here-nwid-14737.html",
      articleTitle: "India's First Google I/O Connect: The Future of User Experience is Here",
      date:"",
      articleImage: article4
    },
  ],
  [
    {
      content:
          'The best part about TaxPal is every time I pay my employees, my bank balance doesn’t go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined.',
      authorName: 'ISHA RAUTELA',
      href: "https://www.thehindubusinessline.com/news/variety/project-vaani-scales-decibels-as-it-maps-language-landscape-of-india/article66304920.ece",
      articleTitle: "Project Vaani scales decibels as it maps language landscape of India",
      date:" December 25, 2022 ",
      articleImage: article3
    },
    {
      content:
          'I’m trying to get a hold of someone in support, I’m in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away.',
      authorName: 'Abhijit Ahaskar',
      href: "https://www.livemint.com/companies/start-ups/google-taps-ai-to-grasp-india-s-language-diversity-11671466688191.html?utm_source=pocket_mylist",
      articleTitle: "Google taps AI to grasp India’s language diversity",
      date:"19 Dec 2022",
      articleImage: article2
    },

  ],


]

function QuoteIcon(props) {
  return (
      <svg aria-hidden="true" width={105} height={78} {...props}>
        <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
      </svg>
  )
}

export function ArticlesSection() {
  return (
      <section
          id="Media"
          aria-label="Pricing"
          className="bg-blue-500 py-20 sm:py-32"
      >
        <Container>
          <div className="mx-auto max-w-2xl md:text-center">
            <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
              Vaani in the News
            </h2>
            <p className="mt-4 text-lg tracking-tight text-slate-300">
              Stay updated with Project Vaani’s media appearances. Read about our mission, our work, and our impact as covered by the press
            </p>
          </div>
          <ul
              role="list"
              className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
          >
            {testimonials.map((column, columnIndex) => (
                <li key={columnIndex}>
                  <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                    {column.map((testimonial, testimonialIndex) => (
                        <li key={testimonialIndex}>
                          <Link target='_blank' href={testimonial.href}>
                            <figure className="relative rounded-2xl bg-white shadow-xl shadow-slate-900/10">
                              {/* <QuoteIcon className="absolute left-6 top-6 fill-slate-100" /> */}
                              {/* <blockquote className="relative">
                        <p className="text-lg tracking-tight text-slate-900">
                          {testimonial.content}
                        </p>
                      </blockquote> */}
                              <Image className='rounded-t-xl' alt={testimonial.articleTitle} src={testimonial.articleImage} />
                              <figcaption className="relative mt-2 flex items-center justify-between border-slate-100 p-6">
                                <div>
                                  <div className="font-display text-base text-slate-900">
                                    {testimonial.articleTitle}
                                  </div>
                                  <div className="mt-1 text-sm text-slate-500 flex flex-col justify-between">
                                    <span className={"font-thin text-xs text-zinc-800"}>{testimonial.date}</span>
                                    <span>By {testimonial.authorName}</span>
                                  </div>
                                </div>
                                <div className="overflow-hidden rounded-full bg-slate-50">
                                  {/* <Image
                            className="h-14 w-14 object-cover"
                            src={testimonial.author.image}
                            alt=""
                            width={56}
                            height={56}
                          /> */}
                                </div>
                              </figcaption>
                            </figure>
                          </Link>
                        </li>
                    ))}
                  </ul>
                </li>
            ))}
          </ul>
          <div className='flex justify-center'>
            <Button color="white" className="mt-10">
              {/*<Link target='_blank' href="https://sonic-app-prod-6njyx2yrkq-as.a.run.app/vaani" >*/}
              <Link  href="/articles" >
                Explore more articles
              </Link>
            </Button>
          </div>
        </Container>
      </section>
  )
}
