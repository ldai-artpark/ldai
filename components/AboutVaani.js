function AboutVaani () {
return (
    <section id="about">
        <div className="text-center p-4 text-3xl font-bold">
            <h1>About Vaani</h1>
        </div>
        <div className="flex justify-center">
            <div className="justify-center w-full text-center max-w-4xl text-base text-zinc-600 dark:text-zinc-400">
                <p className="mb-2">Digital India is marching ahead inexorably. Digital interfaces and communications have become critical for access to information, entertainment, economic opportunities and even essential services such as healthcare.</p>
                <p className="mb-2">Project Vaani, by IISc, Bangalore and ARTPARK, is capturing the true diversity of India’s spoken languages to propel language AI technologies and content for an inclusive Digital India.</p>
                <p className="mb-2">We expect to create data corpora of over 150,000 hours of speech, part of which will be transcribed in local scripts, while ensuring linguistic, educational, urban-rural, age, and gender diversity (among other potential diversity characteristics). These diligently collected and curated datasets of natural speech and text from about 1 million people across all 773 districts of India will be open-sourced. The current version of the data is open-sourced here. Going forward, we hope to open source through platforms like Bhashini (under the National Language Translation Mission, MeiTY).</p>
                <p className="mb-2">This will boost the development of technologies such as automatic speech recognition (ASR), speech to speech translation (SST), and natural language understanding (NLU) that reflect the ground realities of how Indians speak.</p>
                <p className="mb-2">Google is funding the Project Vaani.</p>
            </div>
        </div>
    </section>
  )
}

export default AboutVaani;
