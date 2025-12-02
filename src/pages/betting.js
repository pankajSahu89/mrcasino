import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Navbar from '../components/Navbar';
import SearchBox from '../components/searchbox';
import Footer from "../components/Footer";
import RecentlyAddedSection from "../components/RecentlyAddedSection";
import CertifiedCasinosSection from "../components/CertifiedCasino";
import RecommendedByExpertSection from "../components/RecommendedByExpert";
import TopCasinos from "../components/TopCasinos.js";
import SubscribeSection from "../components/SubscribeSection.js";
import bettingBg from "../assets/images/betting-bg.png";
import certified from "../assets/images/Certified.png";
import { fetchAllCasinos } from "../redux/casinosSlice";

const BETTING_TYPE_TAGS = {
    sports: "Sports Betting",
    "new-sites": "New Betting Sites",
    types: "Bet Types",
    bonuses: "Betting Bonuses",
    "free-bets": "Free Bets",
};

const Betting = ({ type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { allCasinos, loadingAll, error } = useSelector((state) => state.casinos || {});

    const [filteredData, setFilteredData] = useState([]);
    const [hot, setHot] = useState([]);
    const [expert, setExpert] = useState([]);
    const [certifiedData, setCertifiedData] = useState([]);

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

    // Filter betting data whenever allCasinos or type changes
    useEffect(() => {
        if (!allCasinos || allCasinos.length === 0) return;

        const tag = BETTING_TYPE_TAGS[type];
        let tagFiltered = [];

        if (!type || !tag) {
            tagFiltered = allCasinos;
        } else {
            tagFiltered = allCasinos.filter(
                item => Array.isArray(item.tags) && item.tags.includes(tag)
            );
        }

        setFilteredData(tagFiltered.slice(0, 4));
        setHot(tagFiltered.filter(item => item.hotCasino).slice(0, 4));
        setExpert(tagFiltered.filter(item => item.recommendedByExperts).slice(0, 4));
        setCertifiedData(tagFiltered.filter(item => item.certifiedCasino).slice(0, 4));
    }, [allCasinos, type]);

    const handlePlayClick = (name) => {
        navigate(`/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`);
    };

    if (loadingAll) {
        return (
            <div className="flex items-center justify-center h-screen bg-black100">
                <div className="text-white text-2xl">Loading betting sites...</div>
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
                style={{ backgroundImage: `url(${bettingBg})` }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
                    <div className="text-center mt-32 w-full max-w-2xl">
                        <SearchBox />
                    </div>
                </div>
            </header>

            <TopCasinos
                recentCasinos={filteredData}
                handlePlayClick={handlePlayClick}
            />

            <RecommendedByExpertSection
                certifiedCasinos={expert}
                handlePlayClick={handlePlayClick}
            />

            <CertifiedCasinosSection
                certifiedCasinos={certifiedData}
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

export default Betting;
