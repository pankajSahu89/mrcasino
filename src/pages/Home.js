import React, { useEffect, useState, Suspense, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import certified from "../assets/images/Certified.png"; 
import { COLORS } from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeCasinos, fetchAllCasinos } from "../redux/casinosSlice";

const NewOnMrGamblers = React.lazy(() =>
  import("../components/NewOnMrGamblers.js")
);
const AreYouIn = React.lazy(() => import("../components/AreYouIn.js"));
const HotCasinoSection = React.lazy(() =>
  import("../components/HotCasinoSection.js")
);
const RecommendedByExpertSection = React.lazy(() =>
  import("../components/RecommendedByExpert.js")
);
const CertifiedCasinosSection = React.lazy(() =>
  import("../components/CertifiedCasino.js")
);
const RecentlyAddedSection = React.lazy(() =>
  import("../components/RecentlyAddedSection.js")
);
const AllOnlineCasinosSection = React.lazy(() =>
  import("../components/AllOnlineCasinosSection.js")
);
const SubscribeSection = React.lazy(() =>
  import("../components/SubscribeSection.js")
);
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsent = React.lazy(() => import("../components/CookieConsent"));

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { homeCasinos, allCasinos, loadingHome, error } = useSelector(
    (state) => state.casinos || {}
  );

  const [activeSection, setActiveSection] = useState("casinos");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const casinosPerPage = 10;
  const totalPages = Math.ceil(allCasinos.length / casinosPerPage);

  const currentCasinos = useMemo(() => {
    const start = (currentPage - 1) * casinosPerPage;
    return allCasinos.slice(start, start + casinosPerPage);
  }, [allCasinos, currentPage]);

  useEffect(() => {
    dispatch(fetchHomeCasinos());
    dispatch(fetchAllCasinos());

    document.body.style.backgroundColor = COLORS.black;
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, [dispatch]);


  const sections = useMemo(() => {
    if (homeCasinos.length === 0) return {};

    const casinoTags = [
      "Crypto Casino",
      "Online Casino",
      "Online Casino",
      "Newest Casino",
    ];
    const bonusTags = [
      "Latest Bonus",
      "Exclusive Bonus",
      "Welcome Bonus",
      "No Deposit",
      "Free Spins Bonus",
      "Cashback Bonus",
      "No Wagering Bonus",
    ];
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
    const slotTags = [
      "Video Slots",
      "Classic Slots",
      "Progressive Slots",
      "New Slots",
      "Real Money Online Slots",
    ];
    const bettingTags = [
      "Sports Betting",
      "New Betting Sites",
      "Bet Types",
      "Betting Bonuses",
      "Free Bets",
    ];

    const filterByTags = (tags) =>
      homeCasinos.filter((c) => c.tags?.some((t) => tags.includes(t))).slice(0, 4);

    return {
      casinos: filterByTags(casinoTags),
      bonuses: filterByTags(bonusTags),
      games: filterByTags(gameTags),
      slots: filterByTags(slotTags),
      betting: filterByTags(bettingTags),
      certified: homeCasinos.filter((c) => c.certifiedCasino).slice(0, 4),
      recommended: homeCasinos.filter((c) => c.recommendedByExperts).slice(0, 4),
      recent: [...homeCasinos]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4),
    };
  }, [homeCasinos]);

  const getCurrentSectionData = () => {
    switch (activeSection) {
      case "casinos":
        return sections.casinos;
      case "bonuses":
        return sections.bonuses;
      case "games":
        return sections.games;
      case "Slot":
        return sections.slots;
      case "Betting":
        return sections.betting;
      default:
        return sections.casinos;
    }
  };

  const handlePlayClick = (name) => {
    navigate(`/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`);
  };


  if (loadingHome) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
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
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: COLORS.black }}>
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }


  return (
    <>
      <Navbar />
      <Header />

      <Suspense
        fallback={
          <div className="p-10 space-y-6 bg-black text-white">
            <div className="w-full h-40 bg-gray-800 rounded-xl animate-pulse"></div>
            <div className="w-full h-40 bg-gray-800 rounded-xl animate-pulse"></div>
            <div className="w-full h-40 bg-gray-800 rounded-xl animate-pulse"></div>
          </div>
        }
      >
        <NewOnMrGamblers
          activeSection={activeSection}
          handleSectionChange={setActiveSection}
          getCurrentSectionData={getCurrentSectionData}
          handlePlayClick={handlePlayClick}
        />

        <AreYouIn />
        <HotCasinoSection />

        <RecommendedByExpertSection
          certifiedCasinos={sections.recommended}
          handlePlayClick={handlePlayClick}
        />

        <CertifiedCasinosSection
          certifiedCasinos={sections.certified}
          handlePlayClick={handlePlayClick}
          certified={certified} // This prop should ideally be an image URL/path, not an imported object
        />

        <RecentlyAddedSection
          recentCasinos={sections.recent}
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

        <SubscribeSection />
        <Footer />
        <CookieConsent />
      </Suspense>
    </>
  );
};

export default Home;

