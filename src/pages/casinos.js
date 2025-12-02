import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllCasinos } from "../redux/casinosSlice";
import Navbar from '../components/Navbar';
import casinoBg from '../assets/images/casino-bg.png';
import SearchBox from '../components/searchbox';
import RecentlyAddedSection from "../components/RecentlyAddedSection";
import CertifiedCasinosSection from "../components/CertifiedCasino";
import RecommendedByExpertSection from "../components/RecommendedByExpert";
import TopCasinos from "../components/TopCasinos.js";
import SubscribeSection from "../components/SubscribeSection.js";
import Footer from "../components/Footer";
import certified from '../assets/images/Certified.png';

const Casinos = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allCasinos, loadingAll, error } = useSelector((state) => state.casinos || {});


  const [filteredData, setFilteredData] = useState([]);
  const [hotCasinos, setHotCasinos] = useState([]);
  const [recommendedByExperts, setRecommendedByExperts] = useState([]);
  const [certifiedCasinos, setCertifiedCasinos] = useState([]);
  useEffect(() => {
    // If Redux store is empty, fetch all casinos
    if (!allCasinos || allCasinos.length === 0) {
      dispatch(fetchAllCasinos());
    }
  }, [allCasinos, dispatch]);
  useEffect(() => {
    document.body.style.backgroundColor = "#1e1e1e";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  useEffect(() => {
    if (!allCasinos || allCasinos.length === 0) return;

    // Filter casinos based on type and flags
    const tagFiltered = allCasinos.filter(
      casino =>
        Array.isArray(casino.tags) &&
        (!type || casino.tags.some(tag => tag.toLowerCase().includes(type.toLowerCase())))
    );

    const hot = tagFiltered.filter(casino => casino.hotCasino === true);
    const recExperts = tagFiltered.filter(casino => casino.recommendedByExperts === true);
    const certified = tagFiltered.filter(casino => casino.certifiedCasino === true);

    setFilteredData(tagFiltered.slice(0, 4));
    setHotCasinos(hot.slice(0, 4));
    setRecommendedByExperts(recExperts.slice(0, 4));
    setCertifiedCasinos(certified.slice(0, 4));

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
            <h1
              className="text-3xl md:text-5xl lg:text-6xl max-w-4xl text-white"
              style={{
                fontFamily: 'BigNoodleTitling',
                lineHeight: '1.2',
                wordSpacing: '0.1em',
                fontWeight: '100',
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
            <div className="m-10">
              <SearchBox />
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

export default Casinos;
