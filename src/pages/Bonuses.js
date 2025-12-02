import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Navbar from '../components/Navbar';
import casinoBg from '../assets/images/bonuses-bg.png';
import SearchBox from '../components/searchbox';
import Footer from "../components/Footer";
import RecentlyAddedSection from "../components/RecentlyAddedSection";
import CertifiedCasinosSection from "../components/CertifiedCasino";
import RecommendedByExpertSection from "../components/RecommendedByExpert";
import TopCasinos from "../components/TopCasinos.js";
import SubscribeSection from "../components/SubscribeSection.js";
import certified from '../assets/images/Certified.png';

import { fetchAllCasinos } from "../redux/casinosSlice";

const TYPE_TO_TAG_MAP = {
  'latest': 'Latest Bonus',
  'exclusive': 'Exclusive Bonus',
  'welcome': 'Welcome Bonus',
  'no-deposit': 'No Deposit',
  'freespins': 'Free Spins Bonus',
  'cashback': 'Cashback Bonus',
  'no-wagering': 'No Wagering Bonus',
};

const Bonuses = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux store
  const { allCasinos, loadingAll, error } = useSelector((state) => state.casinos || {});

  const [filteredData, setFilteredData] = useState([]);
  const [hotCasinos, setHotCasinos] = useState([]);
  const [recommendedByExperts, setRecommendedByExperts] = useState([]);
  const [certifiedCasinos, setCertifiedCasinos] = useState([]);

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
    if (!allCasinos || allCasinos.length === 0) return;

    let tagFiltered = [];

    if (!type || typeof type !== "string") {
      tagFiltered = allCasinos;
    } else {
      const exactTag = TYPE_TO_TAG_MAP[type];

      if (!exactTag) {
        // Flexible matching if exact tag not found
        const normalizedType = type.replace(/-/g, '').toLowerCase();
        tagFiltered = allCasinos.filter(casino => 
          Array.isArray(casino.tags) && 
          casino.tags.some(tag => tag && tag.replace(/-/g, '').toLowerCase().includes(normalizedType))
        );
      } else {
        // Exact tag match
        tagFiltered = allCasinos.filter(
          casino => Array.isArray(casino.tags) && casino.tags.includes(exactTag)
        );
      }
    }

    setFilteredData(tagFiltered.slice(0, 4));
    setHotCasinos(tagFiltered.filter(casino => casino.hotCasino === true).slice(0, 4));
    setRecommendedByExperts(tagFiltered.filter(casino => casino.recommendedByExperts === true).slice(0, 4));
    setCertifiedCasinos(tagFiltered.filter(casino => casino.certifiedCasino === true).slice(0, 4));
  }, [allCasinos, type]);

  const handlePlayClick = (name) => {
    navigate(`/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  if (loadingAll) {
    return (
      <div className="flex items-center justify-center h-screen bg-black100">
        <div className="text-white text-2xl">Loading casinos...</div>
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

      <SubscribeSection />
      <Footer />
    </>
  );
};

export default Bonuses;
