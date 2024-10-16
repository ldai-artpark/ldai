import { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

// Language data (can be passed as a prop or stored locally)
const languageData = [
    {
      name: 'Malvani',
      description: 'It is often classified as a dialect of Konkani, which is the official language of Goa. However, many speakers identify it as a distinct language due to its unique characteristics and cultural significance.. Malvani exhibits distinct vocabulary and pronunciation that set it apart from standard Marathi and Konkani',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/MH_Sindhudu_Nami27477_0216390000_MRSDUN_101446_1671_20433.wav'
    },
    {
      name: 'Shekhawati',
      description: 'Shekhawati is classified as a dialect of the Rajasthani language, primarily spoken in the Shekhawati region of Rajasthan, which includes the districts of Jhunjhunu, Sikar, and Churu. It has approximately three million speakers and shares many similarities with the Marwari dialect of Rajasthani. It is frequently broadly categorized as broad Rajasthani languages.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/Rajasthan_Churu_101140_11076005_RJCHCO_194808_0_8221.wav'
    },
    {
      name: 'Duruwa',
      description: 'It is a Central Dravidian language spoken by the Duruwa people, primarily found in the districts of Koraput in Odisha and Bastar in Chhattisgarh. The census data indicates that there were approximately 18,151 speakers of Duruwa in Odisha at that time.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/IISc_VaaniProject_M_CG_Sukma_para54196_1148560000_APATKUM_156504_6538_9946.wav'
    },
    {
      name: 'Badayuni',
      description: 'Badayuni is a dialect of the Hindi language, primarily spoken in the Badayun district of Uttar Pradesh, India. It exhibits unique linguistic features and vocabulary that distinguish it from standard Hindi, reflecting the local culture and traditions of the region.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/Uttarpradesh_Budaun_99889_11035024_CGKDOTHER_100301_0_6237.wav'
    },
    {
      name: 'Jaipuri',
      description: 'Jaipuri is a dialect of the Rajasthani language, spoken mainly in Jaipur and surrounding areas. It shares similarities with other Rajasthani dialects but has distinct phonetic and lexical characteristics that highlight its cultural identity within the region.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/Rajasthan_Nagaur_109842_11529038_RJNGFR_10824_0_9329.wav'
    },
    {
      name: 'Bearybashe',
      description: 'Bearybashe, also known as Beary or Biryani, is a language spoken by the Beary community in coastal Karnataka. It incorporates elements from Kannada, Tulu, and Urdu, making it a unique linguistic blend that reflects the diverse cultural influences in the area.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/Karnataka_DakshinKannada_66681_9678928_BHJHMEC_115766_10940_17963.wav'
    },
    {
      name: 'Kurumuli',
      description: 'Kurumali is a Dravidian language spoken by the Kuruma community in parts of Karnataka and Kerala. It has distinct phonological and grammatical features that set it apart from other Dravidian languages, showcasing the community\'s unique cultural heritage.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/Jharkhand_Sahebganj_125396_12090619_TGKSK_217933_7903_14835.wav'
    },
    {
      name: 'Kudukh',
      description: 'Kudukh is a language belonging to the Munda language family, primarily spoken by the Oraon tribe in Jharkhand and surrounding states. It has its own unique vocabulary and grammatical structure, contributing to the linguistic diversity of the region.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/Chhattisgarh_Jashpur_125069_12115477_CGJPWAF_1653_2332_7762.wav'
    },
    {
      name: 'Bantar',
      description: 'Bantar is a dialect of the Dravidian language family, predominantly spoken by the Bantar community in parts of Odisha. It features distinct linguistic traits that reflect the community\'s cultural practices and local traditions.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/Bihar_Sitamarhi_91297_10712729_APATKUM_156499_0_6497.wav'
    },
    {
      name: 'Bajjika',
      description: 'Bajjika is a dialect of Bhojpuri, spoken mainly in Bihar\'s Vaishali and Muzaffarpur districts. It has distinct phonetic characteristics and vocabulary that differentiate it from standard Bhojpuri, reflecting local cultural nuances.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/BR_Vaishali_Navn80834_0506000000_KTCMICC_300336_690_7982.wav'
    },
    {
      name: 'Agariya',
      description: 'Agariya is a dialect of Hindi spoken by the Agariya community in parts of Madhya Pradesh. It possesses unique lexical items and phonetic features that highlight its regional identity within the broader Hindi-speaking population.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/Chhattisgarh_Jashpur_118802_12092597_CGJPRI_1571_0_10682.wav'
    },
    {
      name: 'Halbi',
      description: 'Halbi is a language belonging to the Indo-Aryan family, primarily spoken in parts of Chhattisgarh and Maharashtra. It exhibits characteristics that distinguish it from standard Hindi and showcases influences from neighboring languages.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/CG_Bastar_74925_0731090000_TGKTHP_160391_15210_18496.wav'
    },
    {
      name: 'Rajbangshi',
      description: 'Rajbangshi is an Indo-Aryan language spoken by the Rajbangshi community in parts of West Bengal and Assam. It has distinct phonological and lexical features that reflect the community\'s cultural heritage and historical background.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/WestBengal_Purulia_64518_9582602_BHGJSTF_3118_6057_13097.wav'
    },
    {
      name: 'Angika',
      description: 'Angika is an Eastern Indo-Aryan language spoken primarily in Bihar and Jharkhand. It shares similarities with Maithili but has its own unique vocabulary and grammatical structures that reflect local traditions.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/BR_Purnia_07132010_0415100000_KTDKAFM_54217_14049_21760.wav'
    },
    {
      name: 'Kortha',
      description: 'Kortha is a dialect of Hindi spoken by the Korku tribe in Madhya Pradesh. It features unique linguistic elements that reflect the tribe\'s cultural identity and historical context within the region.',
      audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/IISc_VaaniProject_S_Bihar_Sitamarhi_91957_10856361_BHJHBR_310302_102_8521.wav'
    },
  ];
  

  export default function LanguageSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(2); // Default to 2 for larger screens
    const [isPlaying, setIsPlaying] = useState(null);
    const audioRef = useRef(null);
  
    useEffect(() => {
      const updateItemsPerSlide = () => {
        if (window.innerWidth < 640) {
          setItemsPerSlide(1); // 1 item per slide for mobile
        } else {
          setItemsPerSlide(2); // 2 items per slide for larger screens
        }
      };
  
      // Initial check
      updateItemsPerSlide();
      // Listen for resize events
      window.addEventListener('resize', updateItemsPerSlide);
  
      // Cleanup listener on component unmount
      return () => {
        window.removeEventListener('resize', updateItemsPerSlide);
      };
    }, []);
  
    // Divide languages into chunks for the slides
    const slides = [];
    for (let i = 0; i < languageData.length; i += itemsPerSlide) {
      slides.push(languageData.slice(i, i + itemsPerSlide));
    }
  
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };
  
    const toggleAudio = (audioUrl, index) => {
      if (audioRef.current && isPlaying === index) {
        audioRef.current.pause();
        setIsPlaying(null);
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
  
        const newAudio = new Audio(audioUrl);
        audioRef.current = newAudio;
        setIsPlaying(index);
  
        newAudio.play();
        newAudio.onended = () => {
          setIsPlaying(null);
        };
      }
    };
  
    return (
      <div className="mt-10 flex items-center justify-center">
        {/* Chevron Left Icon for Previous */}
        <ChevronLeftIcon 
          className="h-8 w-8 cursor-pointer text-gray-700 sm:block"  // Show on all screens
          onClick={prevSlide} 
        />
  
        {/* Displaying languages */}
        <div className="flex justify-around w-full">
          {slides[currentSlide].map((language, index) => (
            <div 
              key={index} 
              className="mx-4 p-4 bg-white rounded shadow text-center w-full sm:w-1/2 mt-4 sm:mt-0"
            >
              <h3 className="font-bold text-lg sm:text-xl text-black">{language.name}</h3>
              <p className="mt-4 text-sm sm:text-base text-black">{language.description}</p>
              <button
                className={`mt-4 px-4 py-2 rounded text-sm sm:text-base ${
                  isPlaying === index ? 'bg-red-600' : 'bg-blue-600'
                } text-white hover:bg-blue-700`}
                onClick={() => toggleAudio(language.audioUrl, index)}
              >
                {isPlaying === index ? 'Pause Audio' : 'Play Audio'}
              </button>
            </div>
          ))}
        </div>
  
        {/* Chevron Right Icon for Next */}
        <ChevronRightIcon 
          className="h-8 w-8 cursor-pointer text-gray-700 sm:block"  // Show on all screens
          onClick={nextSlide} 
        />
      </div>
    );
  }