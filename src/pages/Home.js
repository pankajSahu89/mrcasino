import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { COLORS } from "../constants/colors";
import Header from "../components/Header";
import NewOnMrGamblers from "../components/NewOnMrGamblers.js";
import AreYouIn from "../components/AreYouIn.js";
import HotCasinoSection from "../components/HotCasinoSection.js";


import Footer from "../components/Footer";

import SearchBox from "../components/searchbox";
import Card from "../components/Card";
import CasinoCard from "../components/CasinoCard";
import CategoryCard from "../components/CategoryCard";

import ExpertCard from "../components/ExpertCard";
import { getCasinos } from "../api/casinos.js";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import certified from "../assets/images/Certified.png";


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
    document.body.style.backgroundColor = "#1e1e1e";
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

    // Get recent casinos (last 5 added, sorted by creation date)
    const sortedByDate = [...casinosData].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Set filtered data
    setCasinoFilteredData(filteredCasinos.slice(0, 5));
    setBonusFilteredData(filteredBonuses.slice(0, 5));
    setGameFilteredData(filteredGames.slice(0, 5));
    setSlotFilteredData(filteredSlots.slice(0, 5));
    setBettingFilteredData(filteredBetting.slice(0, 5));
   
    setCertifiedCasinos(filteredCertified.slice(0, 4));
    setRecentCasinos(sortedByDate.slice(0, 5));
  };

  const handlePlayClick = (name) => {
    navigate(`/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const casinosPerPage = 25;
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
     <Navbar  />


      <Header />

      <NewOnMrGamblers
        activeSection={activeSection}
        handleSectionChange={handleSectionChange}
        getCurrentSectionData={getCurrentSectionData}
        handlePlayClick={handlePlayClick}
      />

      <AreYouIn />

     <HotCasinoSection/>

      <section className="py-10 bg-black100 text-center">
        <div className="flex mt-10 flex-col items-center">
          <div
            className="relative text-white p-10 w-full max-w-full"
            style={{
              background: "linear-gradient(to right, #1A008E, #070028)",
            }}
          >
            <div className="flex flex-row sm:flex-row justify-center items-center text-center mb-10">
              <img
                src={certified}
                alt="Certified"
                className="w-12 h-12 sm:w-24 sm:h-24 sm:mr-4 mb-4 sm:mb-4"
              />
              <h2
                className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-5xl text-white"
                style={{
                  fontFamily: "BigNoodleTitling",
                  lineHeight: "1.2",
                  wordSpacing: "0.1em",
                  fontWeight: "100",
                  letterSpacing: "0.05em",
                }}
              >
                Certified Casinos
              </h2>
            </div>

            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 m-10 mt-5">
                {certifiedCasinos.map((casino) => (
                  <Card
                    key={casino._id}
                    name={casino.name}
                    rating={casino.rating}
                    bgImage={casino.logo}
                    onClick={() => handlePlayClick(casino.name)}
                  />
                ))}
                {certifiedCasinos.length === 0 && (
                  <div className="col-span-full text-white text-lg">
                    No certified casinos found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-black100 text-center">
        <div className="flex flex-col items-center">
          <div className="relative text-white bg-black100 p-10 w-full max-w-full">
            <div className="flex flex-row sm:flex-row justify-center items-center text-center mb-10">
              <h2
                className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-5xl text-white"
                style={{
                  fontFamily: "BigNoodleTitling",
                  lineHeight: "1.2",
                  wordSpacing: "0.1em",
                  fontWeight: "100",
                  letterSpacing: "0.05em",
                }}
              >
                Recently Added on MR Gamblers
              </h2>
            </div>

            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 m-10 mt-5">
                {recentCasinos.map((casino) => (
                  <Card
                    key={casino._id}
                    name={casino.name}
                    rating={casino.rating}
                    bgImage={casino.logo}
                    onClick={() => handlePlayClick(casino.name)}
                  />
                ))}
                {recentCasinos.length === 0 && (
                  <div className="col-span-full text-white text-lg">
                    No recent casinos found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    

      <section className="py-12 md:py-16 bg-black100">
        <div className="container mx-auto px-4">
          <div className="flex flex-row sm:flex-row justify-center items-center text-center ">
            <h2
              className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-5xl text-white"
              style={{
                fontFamily: "BigNoodleTitling",
                lineHeight: "1.2",
                wordSpacing: "0.1em",
                fontWeight: "100",
                letterSpacing: "0.05em",
              }}
            >
              ALL ONLINE CASINOS
            </h2>
          </div>
          <div className="space-y-6">
            {currentCasinos.map((casino, index) => (
              <CasinoCard
                key={casino._id}
                number={(currentPage - 1) * casinosPerPage + index + 1} // ✅ Continuous numbering
                image={casino.logo}
                title={casino.name}
                depositBonus={
                  casino.depositBonus || "Up to €1000 + 200 Free Spins"
                }
                welcomeBonus={casino.welcomeBonus || "200% Match Bonus"}
                rating={casino.rating}
                visits={`${casino.visits || 0}`}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              <FaChevronLeft className="w-5 h-5 text-white" />
            </button>

            <span className="text-white text-lg">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              <FaChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <CookieConsent />
    </>
  );
};

export default Home;
