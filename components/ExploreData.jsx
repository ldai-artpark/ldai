'use client';

import { Container } from './Container';
import HomepageDataAndMaps from './HomepageDataAndMaps'; // Assuming this is another component
import LanguageSection from './LanguageSection'; // Importing the new LanguageSection component

export function ExploreData({ data }) {
  return (
    <section
      id="Data"
      aria-label="Features for simplifying everyday business tasks"
      className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
    >
      <Container>
        <div className="mx-auto max-w-6xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Explore India’s Vernacular Vista with Vaani
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700 md:text-left">
            Explore the linguistic diversity of India in a click. Our dataset is intended to be a treasure trove of speech data from across India’s districts. It offers a comprehensive overview of speech data from all districts, emphasizing the language variety in each district, providing a unique glimpse into India’s rich cultural tapestry. Discover the richness of India’s linguistic landscape and delve into the statistics that bring our nation’s linguistic diversity to life.
          </p>
        </div>

        {/* Maps and Data Section */}
        <HomepageDataAndMaps data={data} />  {/* Assuming data is passed here */}

        <div className="mt-10 text-center">
          <h3 className="font-bold text-2xl text-slate-900">Discovering the Linguistic Gems</h3>
          <p className="mt-4 text-lg text-slate-700">
            As we go from district to district, collecting the language of choice by speakers, we have come across some not-so-common languages, some may not even specifically be a part of the latest census of India.
          </p>
        </div>  

        {/* Language Section */}
        <LanguageSection />  {/* Rendering the LanguageSection component */}
      </Container>
    </section>
  );
}
