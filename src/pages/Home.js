import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { COLORS } from "../constants/colors";
import Header from "../components/Header";
import NewOnMrGamblers from "../components/NewOnMrGamblers.js";
import AreYouIn from "../components/AreYouIn.js";
import HotCasinoSection from "../components/HotCasinoSection.js";
import CertifiedCasinosSection from "../components/CertifiedCasino.js";
import RecommendedByExpertSection from "../components/RecommendedByExpert.js";
import RecentlyAddedSection from "../components/RecentlyAddedSection.js";
import Footer from "../components/Footer";
import { getCasinos } from "../api/casinos.js";
import certified from "../assets/images/Certified.png";
import AllOnlineCasinosSection from "../components/AllOnlineCasinosSection.js";
import SubscribeSection from "../components/SubscribeSection.js";


import CookieConsent from "../components/CookieConsent";
const Home = () => {

  const navigate = useNavigate();
  const [casinos, setCasinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("casinos");

  // Filtered casino states
  const [casinoFilteredData, setCasinoFilteredData] = useState([]);
  const [bonusFilteredData, setBonusFilteredData] = useState([]);
  const [gameFilteredData, setGameFilteredData] = useState([]);
  const [slotFilteredData, setSlotFilteredData] = useState([]);
  const [bettingFilteredData, setBettingFilteredData] = useState([]);
  const [certifiedCasinos, setCertifiedCasinos] = useState([]);
  const [recommendCasinos, setRecommendCasinos] = useState([]);

  const [recentCasinos, setRecentCasinos] = useState([]);




  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", "G-J8M10SL43W");
    }
    // Change body background color
    document.body.style.backgroundColor = COLORS.black;
    let scrollTracked = false;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const scrollPercent = (scrollPosition / pageHeight) * 100;

      if (scrollPercent > 90 && !scrollTracked) {
        if (window.gtag) {
          window.gtag("event", "scroll_depth", {
            event_category: "Engagement",
            event_label: window.location.pathname,
            value: scrollPercent.toFixed(2),
            non_interaction: true,
          });
        }
        scrollTracked = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_path: window.location.pathname,
      });
    }
    // Fetch casinos from backend
    const fetchCasinos = async () => {
      try {
        const data = await getCasinos();
        setCasinos(data);

        // Filter casinos based on tags and properties
        filterCasinosData(data);
      } catch (err) {
        setError(err.message || "Failed to load casinos");
      } finally {
        setLoading(false);
      }
    };

    fetchCasinos();

    // Cleanup function
    return () => {
      document.body.style.backgroundColor = null;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to filter casinos based on tags and properties
  const filterCasinosData = (casinosData) => {
    // Casino Tags for NEW ON MR GAMBLERS - Casinos section
    const casinoTags = [
      "Crypto Casino",
      "Online Casino",
      "Mobile Casino",
      "Newest Casino",
    ];

    // Bonus Tags for NEW ON MR GAMBLERS - Bonuses section
    const bonusTags = [
      "Latest Bonus",
      "Exclusive Bonus",
      "Welcome Bonus",
      "No Deposit",
      "Free Spins Bonus",
      "Cashback Bonus",
      "No Wagering Bonus",
    ];

    // Game Tags for NEW ON MR GAMBLERS - Games section
    const gameTags = [
      "Casino Games",
      "Table Games",
      "Card Games",
      "Dice Games",
      "Real Money Online Slots",
      "Poker",
      "Bingo",
      "Lottery Games",
      "Video Slots",
      "Classic Slots",
      "Progressive Slots",
      "New Slots",
    ];

    // Slot Tags for NEW ON MR GAMBLERS - Slots section
    const slotTags = [
      "Video Slots",
      "Classic Slots",
      "Progressive Slots",
      "New Slots",
      "Real Money Online Slots",
    ];

    // Betting Tags for NEW ON MR GAMBLERS - Betting section
    const bettingTags = [
      "Sports Betting",
      "New Betting Sites",
      "Bet Types",
      "Betting Bonuses",
      "Free Bets",
    ];

    // Filter casinos for each section
    const filteredCasinos = casinosData.filter(
      (casino) =>
        casino.tags && casino.tags.some((tag) => casinoTags.includes(tag))
    );

    const filteredBonuses = casinosData.filter(
      (casino) =>
        casino.tags && casino.tags.some((tag) => bonusTags.includes(tag))
    );

    const filteredGames = casinosData.filter(
      (casino) =>
        casino.tags && casino.tags.some((tag) => gameTags.includes(tag))
    );

    // Filter slots casinos
    const filteredSlots = casinosData.filter(
      (casino) =>
        casino.tags && casino.tags.some((tag) => slotTags.includes(tag))
    );

    // Filter betting casinos
    const filteredBetting = casinosData.filter(
      (casino) =>
        casino.tags && casino.tags.some((tag) => bettingTags.includes(tag))
    );

    // Filter certified casinos
    const filteredCertified = casinosData.filter(
      (casino) => casino.certifiedCasino === true
    );

    const filteredRecommend = casinosData.filter(
      (casino) => casino.recommendedByExperts === true
    );

    // Get recent casinos (last 5 added, sorted by creation date)
    const sortedByDate = [...casinosData].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Set filtered data
    setCasinoFilteredData(filteredCasinos.slice(0, 4));
    setBonusFilteredData(filteredBonuses.slice(0, 4));
    setGameFilteredData(filteredGames.slice(0, 4));
    setSlotFilteredData(filteredSlots.slice(0, 4));
    setBettingFilteredData(filteredBetting.slice(0, 4));
    setRecommendCasinos(filteredRecommend.slice(0, 4));

    setCertifiedCasinos(filteredCertified.slice(0, 4));
    setRecentCasinos(sortedByDate.slice(0, 4));
  };

  const handlePlayClick = (name) => {
    navigate(`/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const casinosPerPage = 10;
  const totalPages = Math.ceil(casinos.length / casinosPerPage);
  const indexOfLastCasino = currentPage * casinosPerPage;
  const indexOfFirstCasino = indexOfLastCasino - casinosPerPage;
  const currentCasinos = casinos.slice(indexOfFirstCasino, indexOfLastCasino);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to get current section data
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

  if (loading) {
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
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        setCurrentPage={setCurrentPage}
      />
      <SubscribeSection />

      <Footer />
      <CookieConsent />
    </>
  );
};

export default Home;
