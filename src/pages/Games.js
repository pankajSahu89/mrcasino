import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import casinoBg from '../assets/images/games-bg.png';
import SearchBox from '../components/searchbox';
import API from "../api/axios";
import certified from '../assets/images/Certified.png';
import Footer from "../components/Footer";
import RecentlyAddedSection from "../components/RecentlyAddedSection";
import CertifiedCasinosSection from "../components/CertifiedCasino";
import RecommendedByExpertSection from "../components/RecommendedByExpert";
import TopCasinos from "../components/TopCasinos.js";
import SubscribeSection from "../components/SubscribeSection.js";
const TYPE_TO_TAG_MAP = {

  'casino': 'Casino Games',
  'table': 'Table Games',
  'card': 'Card Games',
  'dice': 'Dice Games',
  'real-money-slots': 'Real Money Online Slots',
  'poker': 'Poker',
  'bingo': 'Bingo',
  'lottery': 'Lottery Games',


};
const Games = ({ type }) => {
  const [casinosData, setCasinosData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    document.body.style.backgroundColor = "#1e1e1e";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  useEffect(() => {
    const fetchCasinos = async () => {
      setLoading(true);
      try {
        const response = await API.get("/casinos");
        setCasinosData(response.data);
        filterCasinos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCasinos();
  }, [type]);

   const handlePlayClick = (name) => {
    navigate(`/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`);
  };
const [hotCasinos, setHotCasinos] = useState([]);
const [recommendedByExpertss, setrecommendedByExperts] = useState([]);
const [certifiedCasinos, setcertifiedCasinos] = useState([]);

const filterCasinos = (data) => {
  // If no type is provided, use full data
  if (!type || typeof type !== "string") {
    setFilteredData(data);
    setHotCasinos(data.filter(casino => casino.hotCasino === true));
    setrecommendedByExperts(data.filter(casino => casino.recommendedByExperts === true));
    setcertifiedCasinos(data.filter(casino => casino.certifiedCasino === true));
    return;
  }

  // Determine tag filtering logic
  const exactTag = TYPE_TO_TAG_MAP[type];
  let tagFiltered = [];

  if (!exactTag) {
    const normalizedType = type.replace(/-/g, '').toLowerCase();

    tagFiltered = data.filter(casino => {
      if (!Array.isArray(casino.tags)) return false;

      return casino.tags.some(tag => {
        if (!tag) return false;
        const normalizedTag = tag.replace(/-/g, '').toLowerCase();

        return (
          normalizedTag.includes(normalizedType) ||
          normalizedType.includes(normalizedTag) ||
          normalizedTag === normalizedType
        );
      });
    });

    console.log(`Filtered for flexible type "${type}":`, tagFiltered);
  } else {
    tagFiltered = data.filter(
      casino => Array.isArray(casino.tags) && casino.tags.includes(exactTag)
    );

    console.log(`Filtered for exact type "${type}":`, tagFiltered);
  }

  // Set all filtered results based on tag-matched data
  setFilteredData(tagFiltered.slice(0, 4));
  setHotCasinos(tagFiltered.filter(casino => casino.hotCasino === true).slice(0, 4));
  setrecommendedByExperts(tagFiltered.filter(casino => casino.recommendedByExperts === true).slice(0, 4));
  setcertifiedCasinos(tagFiltered.filter(casino => casino.certifiedCasino === true).slice(0, 4));
};




  return (
    <>
      <Navbar />

      <header
        className="relative bg-cover bg-center h-[60vh] min-h-[400px] md:h-screen"
        style={{ backgroundImage: `url(${casinoBg})` }}
      >
          <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black100 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">

        <div className="container mx-auto text-center absolute z-10 top-5 h-full flex flex-col justify-center items-center px-2">
         
          <div className="mt-32 px-4 w-full flex justify-center">
            <div className="w-full max-w-2xl">
              <SearchBox />
            </div>
          </div>
        </div>
           </div>
        
      </header>

     

<TopCasinos
        recentCasinos={filteredData}
        handlePlayClick={handlePlayClick}
      />

      <RecommendedByExpertSection
        certifiedCasinos={recommendedByExpertss}
        handlePlayClick={handlePlayClick}

      />

      <CertifiedCasinosSection
        certifiedCasinos={certifiedCasinos}
        handlePlayClick={handlePlayClick}
        certified={certified}
      />

      <RecentlyAddedSection
        recentCasinos={filteredData}
        handlePlayClick={handlePlayClick}
      />


      <SubscribeSection />

   

      <Footer />
    </>
  );
};

export default Games;