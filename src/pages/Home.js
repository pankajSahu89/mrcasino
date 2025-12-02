import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import NewOnMrGamblers from "../components/NewOnMrGamblers.js";
import AreYouIn from "../components/AreYouIn.js";
import HotCasinoSection from "../components/HotCasinoSection.js";
import CertifiedCasinosSection from "../components/CertifiedCasino.js";
import RecommendedByExpertSection from "../components/RecommendedByExpert.js";
import RecentlyAddedSection from "../components/RecentlyAddedSection.js";
import AllOnlineCasinosSection from "../components/AllOnlineCasinosSection.js";
import SubscribeSection from "../components/SubscribeSection.js";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";

import certified from "../assets/images/Certified.png";
import { COLORS } from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeCasinos, fetchAllCasinos } from "../redux/casinosSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const { homeCasinos, allCasinos, loadingHome, loadingAll, error } =
  useSelector((state) => state.casinos || {});

  const [activeSection, setActiveSection] = useState("casinos");

  // Filtered states
  const [casinoFilteredData, setCasinoFilteredData] = useState([]);
  const [bonusFilteredData, setBonusFilteredData] = useState([]);
  const [gameFilteredData, setGameFilteredData] = useState([]);
  const [slotFilteredData, setSlotFilteredData] = useState([]);
  const [bettingFilteredData, setBettingFilteredData] = useState([]);
  const [certifiedCasinos, setCertifiedCasinos] = useState([]);
  const [recommendCasinos, setRecommendCasinos] = useState([]);
  const [recentCasinos, setRecentCasinos] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const casinosPerPage = 10;
  const totalPages = Math.ceil(allCasinos.length / casinosPerPage);
  const indexOfLastCasino = currentPage * casinosPerPage;
  const indexOfFirstCasino = indexOfLastCasino - casinosPerPage;
  const currentCasinos = allCasinos.slice(indexOfFirstCasino, indexOfLastCasino);

  useEffect(() => {
    // Fetch home casinos first for fast render
    dispatch(fetchHomeCasinos());

    // Fetch all casinos in background
    dispatch(fetchAllCasinos());

    // Change body background
    document.body.style.backgroundColor = COLORS.black;

    return () => {
      document.body.style.backgroundColor = null;
    };
  }, [dispatch]);

  // Filter casinos once homeCasinos are loaded
  useEffect(() => {
    if (homeCasinos.length > 0) {
      filterCasinosData(homeCasinos);
    }
  }, [homeCasinos]);

  // Function to filter casinos based on tags and properties
  const filterCasinosData = (casinosData) => {
    const casinoTags = ["Crypto Casino", "Online Casino", "Mobile Casino", "Newest Casino"];
    const bonusTags = ["Latest Bonus", "Exclusive Bonus", "Welcome Bonus", "No Deposit", "Free Spins Bonus", "Cashback Bonus", "No Wagering Bonus"];
    const gameTags = ["Casino Games", "Table Games", "Card Games", "Dice Games", "Real Money Online Slots", "Poker", "Bingo", "Lottery Games", "Video Slots", "Classic Slots", "Progressive Slots", "New Slots"];
    const slotTags = ["Video Slots", "Classic Slots", "Progressive Slots", "New Slots", "Real Money Online Slots"];
    const bettingTags = ["Sports Betting", "New Betting Sites", "Bet Types", "Betting Bonuses", "Free Bets"];

    const filteredCasinos = casinosData.filter(c => c.tags?.some(tag => casinoTags.includes(tag)));
    const filteredBonuses = casinosData.filter(c => c.tags?.some(tag => bonusTags.includes(tag)));
    const filteredGames = casinosData.filter(c => c.tags?.some(tag => gameTags.includes(tag)));
    const filteredSlots = casinosData.filter(c => c.tags?.some(tag => slotTags.includes(tag)));
    const filteredBetting = casinosData.filter(c => c.tags?.some(tag => bettingTags.includes(tag)));
    const filteredCertified = casinosData.filter(c => c.certifiedCasino === true);
    const filteredRecommend = casinosData.filter(c => c.recommendedByExperts === true);

    const sortedByDate = [...casinosData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setCasinoFilteredData(filteredCasinos.slice(0, 4));
    setBonusFilteredData(filteredBonuses.slice(0, 4));
    setGameFilteredData(filteredGames.slice(0, 4));
    setSlotFilteredData(filteredSlots.slice(0, 4));
    setBettingFilteredData(filteredBetting.slice(0, 4));
    setCertifiedCasinos(filteredCertified.slice(0, 4));
    setRecommendCasinos(filteredRecommend.slice(0, 4));
    setRecentCasinos(sortedByDate.slice(0, 4));
  };

  const handlePlayClick = (name) => {
    navigate(`/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const getCurrentSectionData = () => {
    switch (activeSection) {
      case "casinos":
        return casinoFilteredData;
      case "bonuses":
        return bonusFilteredData;
      case "games":
        return gameFilteredData;
      case "Slot":
        return slotFilteredData;
      case "Betting":
        return bettingFilteredData;
      default:
        return casinoFilteredData;
    }
  };

  if (loadingHome) {
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
      <Header />

      <NewOnMrGamblers
        activeSection={activeSection}
        handleSectionChange={handleSectionChange}
        getCurrentSectionData={getCurrentSectionData}
        handlePlayClick={handlePlayClick}
      />

      <AreYouIn />
      <HotCasinoSection />

      <RecommendedByExpertSection
        certifiedCasinos={recommendCasinos}
        handlePlayClick={handlePlayClick}
      />

      <CertifiedCasinosSection
        certifiedCasinos={certifiedCasinos}
        handlePlayClick={handlePlayClick}
        certified={certified}
      />

      <RecentlyAddedSection
        recentCasinos={recentCasinos}
        handlePlayClick={handlePlayClick}
      />

      <AllOnlineCasinosSection
        currentCasinos={currentCasinos}
        currentPage={currentPage}
        totalPages={totalPages}
        casinosPerPage={casinosPerPage}
        handlePrevPage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        handleNextPage={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        setCurrentPage={setCurrentPage}
      />

      <SubscribeSection />
      <Footer />
      <CookieConsent />
    </>
  );
};

export default Home;
