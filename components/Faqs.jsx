import Image from 'next/image'

import { Container } from './Container'
import backgroundImage from '../images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'Why capturing the language landscape of India is important?',
      answer:
        `Capturing India's diverse language landscape is vital for an inclusive Digital India, as only 10% of the population speaks English. Existing language AI models may not meet the linguistic diversity of India, where languages blend continuously. Initiatives like the National Language Translation Mission and Project Vaani aim to collect authentic language data, addressing the limitations of biased language models.`,
    },
    {
      question:'Why is this data shown per district and not per language? ',
      answer:
      "We believe that language in India is more like a fabric, with the color changing gradually as we move over a fabric. Similarly, language changes as we move every few kilometers. With this school of thought, we are collecting dataset that is representative of each district, which may contain multiple languages. Click on State>District to see which languages we have recorded till date"
    },
    {
      question:'Who can use this data? ',
      answer:'This dataset is open source and can be used by any individual or organization. Any startup is welcome to use this dataset. Feedback on the dataset is always welcome Comment end '
    }
    ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, Email us, We will get back to you.
          </p>
        </div>

        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 mt-12'}>
          {faqs[0].map((faq, index) => (
              <div key={index} className="md:col-span-1 lg:col-span-1">
                <h3 className="font-display text-lg leading-7 text-slate-900 mt-4">
                  {faq.question}
                </h3>
                <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
              </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
