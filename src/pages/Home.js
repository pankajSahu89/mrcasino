import React, { useEffect, useState, Suspense, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// 🌟 IMPORT HELMET HERE 🌟
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import certified from "../assets/images/Certified.png";
import { COLORS } from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeCasinos, fetchAllCasinos } from "../redux/casinosSlice";
import { fetchBlogs } from "../redux/blogsSlice";
import { setCountryCode } from "../redux/countrySlice";
import { filterCasinosByCountry } from "../utils/casinoCountry";
import { createVisitorLog } from "../api/visitorLog";
import CasinoAdPopup from "../components/CasinoAdPopup.js";
import API from "../api/axios";

const NewOncasinotrees = React.lazy(() => import("../components/NewOnMrGamblers.js"));
const AreYouIn = React.lazy(() => import("../components/AreYouIn.js"));
const HotCasinoSection = React.lazy(() => import("../components/HotCasinoSection.js"));
const RecommendedByExpertSection = React.lazy(() => import("../components/RecommendedByExpert.js"));
const CertifiedCasinosSection = React.lazy(() => import("../components/CertifiedCasino.js"));
const RecentlyAddedSection = React.lazy(() => import("../components/RecentlyAddedSection.js"));
const AllOnlineCasinosSection = React.lazy(() => import("../components/AllOnlineCasinosSection.js"));
const SubscribeSection = React.lazy(() => import("../components/SubscribeSection.js"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsent = React.lazy(() => import("../components/CookieConsent"));
const HotNewsSection = React.lazy(() => import("../components/HotNewsSection.js"));


// --- Default/Fallback SEO State for Robustness ---
const defaultSeoState = {
    seo: {
        title: "MR. Gambler - Top Online Casino Reviews & Bonuses",
        description: "Your trusted source for unbiased casino reviews, exclusive bonuses, and expert gambling guides. Play safe and smart with MR. Gambler.",
        keywords: "online casino, casino reviews, casino bonuses, free spins, no deposit bonus",
        canonical: "https://casinotree.com",
        author: "MR. Gambler Team",
        robotsIndex: "index",
        robotsFollow: "follow",
        ogTitle: "MR. Gambler | Trusted Casino Reviews",
        ogDescription: "The best online casino reviews and bonuses.",
        ogImage: "",
        twitterCard: "summary_large_image",
        twitterTitle: "MR. Gambler",
        twitterDescription: "Best Casino Reviews & Bonuses",
        selectedSchema: "WebSite",
        focusKeyword: "online casino reviews",
    },
    faqs: [],
    hreflangs: [],
};

// 🌟 HELPER TO GENERATE JSON-LD SCHEMA 🌟
const generateSchema = (seo, faqs) => {
    const schemaType = seo?.selectedSchema;
    if (!schemaType || schemaType === 'None') return null;

    const baseSchema = { "@context": "https://schema.org" };

    if (schemaType === "FAQPage") {
        return {
            ...baseSchema,
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
        };
    }

    if (schemaType === "WebSite") {
        return {
            ...baseSchema,
            "@type": "WebSite",
            name: seo.title,
            url: seo.canonical,
            description: seo.description,
        };
    }
    // Add other relevant schemas (e.g., Review) as needed
    return null;
};


const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const countryCode = useSelector((state) => state.country?.code);
    const countryName = useSelector((state) => state.country?.name);
    const { blogs, loading: loadingBlogs } = useSelector((state) => state.blogs);

    const { homeCasinos, allCasinos, loadingHome, error } = useSelector(
        (state) => state.casinos || {}
    );
    const [showAd, setShowAd] = useState(true);

    // 🌟 SEO STATE 🌟
    const [seoData, setSeoData] = useState(defaultSeoState);
    const [loadingSeo, setLoadingSeo] = useState(true);

    const [activeSection, setActiveSection] = useState("casinos");

    // Country based filtering for all/home casinos
    const filteredHomeCasinos = useMemo(
        () => filterCasinosByCountry(homeCasinos, countryCode),
        [homeCasinos, countryCode]
    );
    const filteredAllCasinos = useMemo(
        () => filterCasinosByCountry(allCasinos, countryCode),
        [allCasinos, countryCode]
    );

    // Pagination (UNCHANGED)
    const [currentPage, setCurrentPage] = useState(1);
    const casinosPerPage = 10;
    const totalPages = Math.max(
        1,
        Math.ceil(filteredAllCasinos.length / casinosPerPage)
    );

    const currentCasinos = useMemo(() => {
        const start = (currentPage - 1) * casinosPerPage;
        return filteredAllCasinos.slice(start, start + casinosPerPage);
    }, [filteredAllCasinos, currentPage]);

    useEffect(() => {
        if (countryCode) return;

        const controller = new AbortController();

        requestIdleCallback(async () => {
            try {
                const res = await fetch("https://ipwho.is/", {
                    signal: controller.signal,
                });
                const data = await res.json();


                if (data?.country_code) {
                    dispatch(setCountryCode(data.country_code));
                    dispatch(setCountryCode(data.country_name));
                }

                if (data?.success) {
                    createVisitorLog({
                        ip: data.ip,
                        type: data.type,
                        country: data.country,
                        country_code: data.country_code,
                        city: data.city,
                        region: data.region,
                        isp: data.connection?.isp,
                    });
                }
            } catch (err) {
                console.error("Visitor log error:", err);
            }
        });

        return () => controller.abort();
    }, [countryCode, dispatch]);




    useEffect(() => {
        // 1. Fetch Casino Data
        dispatch(fetchHomeCasinos());
        dispatch(fetchAllCasinos());
        dispatch(fetchBlogs());

        // 2. Fetch SEO Data
        const fetchSeoData = async () => {
            try {
                // Adjust the fetch call if your backend is not on the same origin/port
                const response = await fetch('/api/seo/config');
                if (response.ok) {
                    const data = await response.json();
                    // Merge fetched data with defaults to ensure all fields are present
                    setSeoData({
                        seo: { ...defaultSeoState.seo, ...data.data.seo },
                        faqs: data.data.faqs,
                        hreflangs: data.data.hreflangs,
                    });
                } else {
                    console.error("Failed to fetch SEO configuration. Using defaults.");
                }
            } catch (err) {
                console.error("Network error fetching SEO data. Using defaults:", err);
            } finally {
                setLoadingSeo(false);
            }
        };

        fetchSeoData();

        // 3. Body style change
        document.body.style.backgroundColor = COLORS.black;
        return () => {
            document.body.style.backgroundColor = null;
        };
    }, [dispatch]);


    // Sections logic (UNCHANGED)
    const sections = useMemo(() => {
        if (!Array.isArray(filteredHomeCasinos) || filteredHomeCasinos.length === 0) {
            return {
                casinos: [],
                bonuses: [],
                games: [],
                slots: [],
                betting: [],
                certified: [],
                recommended: [],
                recent: [],
            };
        }
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
            filteredHomeCasinos
                .filter((c) => c.tags?.some((t) => tags.includes(t)))
                .slice(0, 4);

        return {
            casinos: filterByTags(casinoTags),
            bonuses: filterByTags(bonusTags),
            games: filterByTags(gameTags),
            slots: filterByTags(slotTags),
            betting: filterByTags(bettingTags),
            certified: filteredHomeCasinos
                .filter((c) => c.certifiedCasino)
                .slice(0, 4),
            recommended: filteredHomeCasinos
                .filter((c) => c.recommendedByExperts)
                .slice(0, 4),
            recent: [...filteredHomeCasinos]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 4),
        };
    }, [filteredHomeCasinos]);

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


    // Combined loading check
    if (loadingHome || loadingSeo) {
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
            <div className="flex items-center justify-center h-screen" style={{ backgroundColor: COLORS.black }}>
                <div className="text-red-500 text-2xl">{error}</div>
            </div>
        );
    }

    const currentSchema = generateSchema(seoData.seo, seoData.faqs);

    return (
        <>

            <Helmet>
                <title>{seoData.seo.title}</title>
                <meta name="description" content={seoData.seo.description} />
                <meta name="keywords" content={seoData.seo.keywords} />
                <link rel="canonical" href={seoData.seo.canonical} />
                <meta name="author" content={seoData.seo.author} />

                {/* Robots Tag Control */}
                <meta name="robots" content={`${seoData.seo.robotsIndex}, ${seoData.seo.robotsFollow}`} />

                {/* Hreflang Tags (International SEO) */}
                {seoData.hreflangs.map((h, index) => (
                    <link
                        key={index}
                        rel="alternate"
                        href={h.url}
                        hreflang={h.lang}
                    />
                ))}

                {/* Open Graph Tags for Social Sharing */}
                <meta property="og:title" content={seoData.seo.ogTitle} />
                <meta property="og:description" content={seoData.seo.ogDescription} />
                <meta property="og:image" content={seoData.seo.ogImage} />
                <meta property="og:url" content={seoData.seo.canonical} />

                {/* Twitter Tags */}
                <meta name="twitter:card" content={seoData.seo.twitterCard} />
                <meta name="twitter:title" content={seoData.seo.twitterTitle} />
                <meta name="twitter:description" content={seoData.seo.twitterDescription} />
                <meta name="twitter:image" content={seoData.seo.ogImage} />

                {/* JSON-LD Schema */}
                {currentSchema && (
                    <script type="application/ld+json">
                        {JSON.stringify(currentSchema)}
                    </script>
                )}
            </Helmet>
            {/* ------------------------------- */}

            <Navbar />
            <CasinoAdPopup />
            <Header
                recentCasinos={sections.recommended}
                countryName={countryName}
                handlePlayClick={handlePlayClick}
            />

            <Suspense
                fallback={
                    <div className="p-10 space-y-6 bg-black text-white">
                        <div className="w-full h-40 bg-gray-800 rounded-xl animate-pulse"></div>
                        <div className="w-full h-40 bg-gray-800 rounded-xl animate-pulse"></div>
                        <div className="w-full h-40 bg-gray-800 rounded-xl animate-pulse"></div>
                    </div>
                }
            >
                <NewOncasinotrees
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
                    certified={certified}
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
                <HotNewsSection news={blogs} />


                <SubscribeSection />
                <Footer />
                <CookieConsent />
            </Suspense>
        </>
    );
};

export default Home;