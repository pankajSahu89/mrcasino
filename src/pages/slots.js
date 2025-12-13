import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filterCasinosByCountry } from "../utils/casinoCountry";

import Navbar from '../components/Navbar';
import SearchBox from '../components/searchbox';
import Footer from "../components/Footer";
import RecentlyAddedSection from "../components/RecentlyAddedSection";
import CertifiedCasinosSection from "../components/CertifiedCasino";
import RecommendedByExpertSection from "../components/RecommendedByExpert";
import TopCasinos from "../components/TopCasinos.js";
import SubscribeSection from "../components/SubscribeSection.js";
import banner from "../assets/images/banner.png";
import { COLORS } from "../constants/colors";
import certified from '../assets/images/Certified.png';
import { fetchAllCasinos } from "../redux/casinosSlice";
import AllOnlineCasinosSection from "../components/AllOnlineCasinosSection.js";
import HotNewsSection from "../components/HotNewsSection.js";
import CasinoGuide from "../components/CasinosGuide.js";
import casinosData from "../data/casinosData";
const SLOT_TYPE_TAGS = {
  video: "Video Slots",
  classic: "Classic Slots",
  progressive: "Progressive Slots",
  new: "New Slots",
};

const Slots = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allCasinos, loadingAll, error } = useSelector((state) => state.casinos || {});
  const countryCode = useSelector((state) => state.country?.code);
  const { blogs, loading: loadingBlogs } = useSelector((state) => state.blogs);
  const [filteredData, setFilteredData] = useState([]);
  const [hotSlots, setHotSlots] = useState([]);
  const [expertSlots, setExpertSlots] = useState([]);
  const [certifiedSlots, setCertifiedSlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const casinosPerPage = 10;
  const id = type; // Example: 'crypto', 'live', etc.

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

  // Fetch all casinos if Redux store is empty
  useEffect(() => {
    if (!allCasinos || allCasinos.length === 0) {
      dispatch(fetchAllCasinos());
    }
  }, [allCasinos, dispatch]);

  // Filter slots whenever allCasinos or type changes
  useEffect(() => {
    if (!filteredAllCasinos || filteredAllCasinos.length === 0) return;

    let tagFiltered = [];

    if (!type || typeof type !== "string") {
      tagFiltered = filteredAllCasinos;
    } else {
      const tag = SLOT_TYPE_TAGS[type];

      if (!tag) {
        const normalizedType = type.replace(/-/g, '').toLowerCase();
        tagFiltered = filteredAllCasinos.filter(slot =>
          Array.isArray(slot.tags) &&
          slot.tags.some(tag => tag?.replace(/-/g, '').toLowerCase().includes(normalizedType))
        );
      } else {
        tagFiltered = filteredAllCasinos.filter(
          slot => Array.isArray(slot.tags) && slot.tags.includes(tag)
        );
      }
    }

    setFilteredData(tagFiltered.slice(0, 4));
    setHotSlots(tagFiltered.filter(slot => slot.hotCasino === true).slice(0, 4));
    setExpertSlots(tagFiltered.filter(slot => slot.recommendedByExperts === true).slice(0, 4));
    setCertifiedSlots(tagFiltered.filter(slot => slot.certifiedCasino === true).slice(0, 4));
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
        certifiedCasinos={expertSlots}
        handlePlayClick={handlePlayClick}
      />

      <CertifiedCasinosSection
        certifiedCasinos={certifiedSlots}
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
export default Slots;
