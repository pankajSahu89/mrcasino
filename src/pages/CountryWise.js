import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllCasinos } from "../redux/casinosSlice";
import { filterCasinosByCountry } from "../utils/casinoCountry";
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
import banner from '../assets/images/banner.png';
import { COLORS } from "../constants/colors";
import AllOnlineCasinosSection from "../components/AllOnlineCasinosSection.js";

const Casinos = ({ type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [casinos, setCasinos] = useState([]);
    const [loadingAll, setLoadingAll] = useState(false);
    const [error, setError] = useState(null);
    const [allCasinos, setAllCasinos] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("International");


    const [filteredData, setFilteredData] = useState([]);
    const [hotCasinos, setHotCasinos] = useState([]);
    const [recommendedByExperts, setRecommendedByExperts] = useState([]);
    const [certifiedCasinos, setCertifiedCasinos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const casinosPerPage = 10;



    // Corrected filtering logic
    const filteredAllCasinos = casinos || [];


    const totalPages = Math.max(
        1,
        Math.ceil(filteredAllCasinos.length / casinosPerPage)
    );

    const currentCasinos = useMemo(() => {
        const start = (currentPage - 1) * casinosPerPage;
        return filteredAllCasinos.slice(start, start + casinosPerPage);
    }, [filteredAllCasinos, currentPage]);

    useEffect(() => {
        const loadCasinos = async () => {
            try {
                setLoadingAll(true);

                const response = await fetch("http://localhost:4000/api/casinos");
                if (!response.ok) throw new Error("Failed to fetch casinos");

                const data = await response.json();

                setAllCasinos(data);  // SAVE MASTER LIST
                setCasinos(data);     // INITIAL LIST
                setError(null);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingAll(false);
            }
        };

        loadCasinos();
    }, []);

    useEffect(() => {
        if (selectedCountry === "International") {
            setCasinos(allCasinos);
            return;
        }

        const filtered = allCasinos.filter(item =>
            Array.isArray(item.availableCountries) &&
            item.availableCountries.some(c =>
                c.toLowerCase() === selectedCountry.toLowerCase()
            )
        );

        setCasinos(filtered);

    }, [selectedCountry, allCasinos]);


    useEffect(() => {
        document.body.style.backgroundColor = "#1e1e1e";
        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);

    useEffect(() => {
        if (!filteredAllCasinos || filteredAllCasinos.length === 0) {
            setFilteredData([]);
            setHotCasinos([]);
            setRecommendedByExperts([]);
            setCertifiedCasinos([]);
            return;
        }

        const tagFiltered = filteredAllCasinos.filter(casino =>
            Array.isArray(casino.tags) &&
            (!type || casino.tags.some(tag =>
                tag.toLowerCase().includes(type.toLowerCase())
            ))
        );

        const hot = tagFiltered.filter(casino => casino.hotCasino);
        const recExperts = tagFiltered.filter(casino => casino.recommendedByExperts);
        const certified = tagFiltered.filter(casino => casino.certifiedCasino);

        setFilteredData(tagFiltered.slice(0, 4));
        setHotCasinos(hot.slice(0, 4));
        setRecommendedByExperts(recExperts.slice(0, 4));
        setCertifiedCasinos(certified.slice(0, 4));

    }, [casinos, type]);



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
                            Country Wise Casinos
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

                        {/*  Country Dropdown (Replaced SearchBox) */}
                        <div className="mt-10 w-full flex justify-center">
                            <div className="relative w-72 md:w-96">

                                <select
                                    className="
        w-full p-4 pr-12 rounded-xl 
        bg-white/20 backdrop-blur-md 
        text-white font-semibold 
        border border-white/30 
        shadow-lg 
        focus:border-primary focus:ring-2 focus:ring-primary 
        appearance-none 
        cursor-pointer
      "
                                    value={selectedCountry}
                                    onChange={(e) => {
                                        setSelectedCountry(e.target.value);
                                        setCurrentPage(1);
                                    }}

                                >
                                    {[
                                        "International",
                                        "Canada",
                                        "United States",
                                        "Australia",
                                        "New Zealand",
                                        "Austria",
                                        "Finland",
                                        "Germany",
                                        "Ireland",
                                        "Netherlands",
                                        "Norway",
                                        "Sweden",
                                        "Switzerland",
                                        "United Kingdom (UK)",
                                        "European Countries (General)",
                                        "India"
                                    ]
                                        .map((country) => (
                                            <option key={country} value={country} className="text-black">
                                                {country}
                                            </option>
                                        ))}
                                </select>

                                {/* Custom dropdown arrow */}
                                <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-white opacity-80"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                            </div>
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

            <SubscribeSection />

            <Footer />
        </>
    );
};

export default Casinos;
