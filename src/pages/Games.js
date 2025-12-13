import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filterCasinosByCountry } from "../utils/casinoCountry";

import Navbar from '../components/Navbar';
import banner from '../assets/images/banner.png';
import { COLORS } from "../constants/colors";
import SearchBox from '../components/searchbox';
import Footer from "../components/Footer";
import RecentlyAddedSection from "../components/RecentlyAddedSection";
import CertifiedCasinosSection from "../components/CertifiedCasino";
import RecommendedByExpertSection from "../components/RecommendedByExpert";
import TopCasinos from "../components/TopCasinos.js";
import SubscribeSection from "../components/SubscribeSection.js";
import certified from '../assets/images/Certified.png';
import AllOnlineCasinosSection from "../components/AllOnlineCasinosSection.js";
import { fetchAllCasinos } from "../redux/casinosSlice";
import HotNewsSection from "../components/HotNewsSection.js";
import CasinoGuide from "../components/CasinosGuide.js";
import casinosData from "../data/casinosData";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux store
  const { allCasinos, loadingAll, error } = useSelector((state) => state.casinos || {});
  const countryCode = useSelector((state) => state.country?.code);
  const { blogs, loading: loadingBlogs } = useSelector((state) => state.blogs);
  const [filteredData, setFilteredData] = useState([]);
  const [hotCasinos, setHotCasinos] = useState([]);
  const [recommendedByExperts, setRecommendedByExperts] = useState([]);
  const [certifiedCasinos, setCertifiedCasinos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const casinosPerPage = 10;
  const id = type; // Example: 'crypto', 'live', etc.
  console.log("games",id);
  const casino = casinosData.find(item => item.id === id);
  const filteredAllCasinos = useMemo(
    () => filterCasinosByCountry(allCasinos, countryCode),
    [allCasinos, countryCode]
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAllCasinos.length / casinosPerPage)
  );

  const currentCasinos = useMemo(() => {
    const start = (currentPage - 1) * casinosPerPage;
    return filteredAllCasinos.slice(start, start + casinosPerPage);
  }, [filteredAllCasinos, currentPage]);

  // Set body background
  useEffect(() => {
    document.body.style.backgroundColor = "#1e1e1e";
    return () => { document.body.style.backgroundColor = null; };
  }, []);

  // Fetch casinos if Redux store is empty (works on reload)
  useEffect(() => {
    if (!allCasinos || allCasinos.length === 0) {
      dispatch(fetchAllCasinos());
    }
  }, [allCasinos, dispatch]);

  // Filter casinos whenever allCasinos or type changes
  useEffect(() => {
    if (!filteredAllCasinos || filteredAllCasinos.length === 0) return;

    let tagFiltered = [];

    if (!type || typeof type !== "string") {
      tagFiltered = filteredAllCasinos;
    } else {
      const exactTag = TYPE_TO_TAG_MAP[type];

      if (!exactTag) {
        const normalizedType = type.replace(/-/g, '').toLowerCase();
        tagFiltered = filteredAllCasinos.filter(casino =>
          Array.isArray(casino.tags) &&
          casino.tags.some(tag => tag && tag.replace(/-/g, '').toLowerCase().includes(normalizedType))
        );
      } else {
        tagFiltered = filteredAllCasinos.filter(
          casino => Array.isArray(casino.tags) && casino.tags.includes(exactTag)
        );
      }
    }

    setFilteredData(tagFiltered.slice(0, 4));
    setHotCasinos(tagFiltered.filter(casino => casino.hotCasino === true).slice(0, 4));
    setRecommendedByExperts(tagFiltered.filter(casino => casino.recommendedByExperts === true).slice(0, 4));
    setCertifiedCasinos(tagFiltered.filter(casino => casino.certifiedCasino === true).slice(0, 4));
  }, [filteredAllCasinos, type]);

  const handlePlayClick = (name) => {
    navigate(`/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  if (loadingAll) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: COLORS.black }}>
        <div className="flex flex-col items-center space-y-6">



          <div className="text-white text-2xl font-bold tracking-wide animate-pulse">
            Loading casinos...
          </div>


          <div className="w-32 h-1 bg-red-600 rounded-full opacity-50 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black100">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <header
        className="relative bg-cover bg-center h-[60vh] min-h-[400px] md:h-screen"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black100 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="container mx-auto text-center absolute z-10 top-5 h-full flex flex-col justify-center items-center px-2">
            <h1
              className="text-2xl md:text-3xl lg:text-4xl max-w-4xl "
              style={{
                fontFamily: 'Jaini',
                lineHeight: '1.2',
                wordSpacing: '0.1em',
                fontWeight: '800',
                fontStyle: 'regular',
                letterSpacing: '0.05em',
                color: COLORS.primary,
              }}
            >
              {type ? type.toUpperCase() : "CASINOS"}
            </h1>

            <h1
              className="text-3xl md:text-5xl lg:text-6xl max-w-4xl text-white"
              style={{
                fontFamily: 'Jaini',
                lineHeight: '1.2',
                wordSpacing: '0.1em',
                fontWeight: '400',
                letterSpacing: '0.05em',
              }}
            >
              Your Gateway to the Best Online Casinos & Big Wins!
            </h1>
            <p
              className="mt-4 text-md md:text-lg max-w-2xl text-gray-200"
              style={{
                fontFamily: 'BigNoodleTitling',
                lineHeight: '1.4',
                wordSpacing: '0.1em',
                fontWeight: '300',
                letterSpacing: '0.05em',
              }}
            >
              Compare top-rated casino platforms, claim exclusive bonuses, and start playing today!
            </p>
            <div className="mt-10">
              <SearchBox />

            </div>
            <div className="flex items-center justify-center gap-4 md:gap-24 mt-4 ">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-[#797C83]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#ffff"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
                <span style={{ fontFamily: "poppins", fontWeight: 600, fontSize: "14px", lineHeight: "100%", color: COLORS.white }}>
                  45M+ Players
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span style={{ fontFamily: "poppins", fontWeight: 600, fontSize: "14px", lineHeight: "100%", color: COLORS.white }}>
                  23M+ Matches Analyzed
                </span>
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
        certifiedCasinos={recommendedByExperts}
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
      <AllOnlineCasinosSection
        currentCasinos={currentCasinos}
        currentPage={currentPage}
        totalPages={totalPages}
        casinosPerPage={casinosPerPage}
        handlePrevPage={() =>
          setCurrentPage((prev) => Math.max(prev - 1, 1))
        }
        handleNextPage={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
        }
        setCurrentPage={setCurrentPage}
      />
      <HotNewsSection news={blogs} />

      {casino && casino.sections ? ( // Check if casino exists AND has sections
        <CasinoGuide data={casino} />
      ) : (
        // Optionally render a fallback or nothing if data is missing for this type
        <p>Casino guide data not found for this type.</p>
      )}
      <SubscribeSection />
      <Footer />
    </>
  );
};

export default Games;
