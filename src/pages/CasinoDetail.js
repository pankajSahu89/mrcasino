
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getCasinoById, getCasinoBySlug } from "../api/casinos";
import ColorThief from "colorthief";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bonusesBg from "../assets/images/casino-bg.png";
import crown from "../assets/images/crown.png";
import { COLORS } from "../constants/colors";
import { PAYMENT_LOGOS } from "../utils/paymentLogos";

const CasinoDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [casino, setCasino] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgColor, setBgColor] = useState(COLORS.black);
  const [activeTab, setActiveTab] = useState("general");
  const imgRef = useRef(null);

  useEffect(() => {
    const fetchCasino = async () => {
      try {
        const casinoId = location.state?.casinoId;
        let data;

        if (casinoId) {
          data = await getCasinoById(casinoId);
        } else {
          data = await getCasinoBySlug(slug);
          if (!data) throw new Error("Casino not found");
        }

        setCasino(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCasino();
  }, [slug, location.state]);

  useEffect(() => {
    document.body.style.backgroundColor = COLORS.black;
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  useEffect(() => {
    if (!casino?.logo) return;

    const img = imgRef.current;
    const colorThief = new ColorThief();

    const extractColor = () => {
      try {
        const color = colorThief.getColor(img);
        setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      } catch (e) {
        console.error("ColorThief error:", e);
        setBgColor("#1D1235");
      }
    };

    if (img && img.complete) {
      extractColor();
    } else if (img) {
      img.addEventListener("load", extractColor);
      return () => img.removeEventListener("load", extractColor);
    }
  }, [casino]);

  // SafeJoin utility
  const safeJoin = (value, fallback = "") => {
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "string") return value;
    return fallback;
  };

  const renderTabContent = () => {
    if (!casino) return null;

    const safeJoin = (value, fallback = "") => {
      if (Array.isArray(value)) return value.join(", ");
      if (value) return value;
      return fallback;
    };

    const titleClass = `text-xl font-semibold inline`; // Base title styling

    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6 mt-4 text-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className={`${titleClass}`} style={{ color: COLORS.primary }}>
                  Website:{" "}
                </p>
                <a
                  href={casino.editorView || "#"}
                  className="text-blue-400 underline text-lg ml-1 break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {casino.generalInfo?.website || "Not available"}
                </a>
              </div>

              <div>
                <p className={`${titleClass}`} style={{ color: COLORS.primary }}>
                  Languages:{" "}
                </p>
                <span className="text-lg ml-1">
                  {safeJoin(casino.generalInfo?.languages, "English")}
                </span>
              </div>

              <div>
                <p className={`${titleClass}`} style={{ color: COLORS.primary }}>
                  Company:{" "}
                </p>
                <span className="text-lg ml-1">
                  {casino.generalInfo?.companyName || "Not specified"}
                </span>
              </div>

              <div>
                <p className={`${titleClass}`} style={{ color: COLORS.primary }}>
                  Established:{" "}
                </p>
                <span className="text-lg ml-1">
                  {casino.generalInfo?.established || "Not specified"}
                </span>
              </div>

              <div>
                <p className={`${titleClass}`} style={{ color: COLORS.primary }}>
                  License:{" "}
                </p>
                <span className="text-lg ml-1">
                  {safeJoin(casino.generalInfo?.licences, "Not specified")}
                </span>
              </div>

              <div>
                <p className={`${titleClass}`} style={{ color: COLORS.primary }}>
                  Support:{" "}
                </p>
                <span className="text-lg ml-1">
                  {casino.responsibleGaming?.support || "Not specified"}
                </span>
              </div>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="space-y-6 mt-4 text-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className={`${titleClass}`} style={{ color: COLORS.primary }}>
                  Minimum Deposit:{" "}
                </p>
                <span className="text-lg text-gray-300 ml-1">
                  {casino.paymentInfo?.minimumDeposit || "0"}
                </span>
              </div>

              <div>
                <p className={`${titleClass}`} style={{ color: COLORS.primary }}>
                  Deposit Methods:{" "}
                </p>
                <span className="text-lg text-gray-300 ml-1">
                  {safeJoin(
                    casino.paymentInfo?.withdrawalMethods,
                    "Various methods available"
                  )}
                </span>
              </div>

              <div>
                <p className={`${titleClass}`} style={{ color: COLORS.primary }}>
                  Withdrawal Time:{" "}
                </p>
                <span className="text-lg text-gray-300 ml-1">
                  {casino.paymentInfo?.withdrawalTime || "Not specified"}
                </span>
              </div>

              <div>
                <p className={`${titleClass}`} style={{ color: COLORS.primary }}>
                  Currencies:{" "}
                </p>
                <span className="text-lg text-gray-300 ml-1">
                  {casino.paymentInfo?.fees || "Not specified"}
                </span>
              </div>
            </div>
          </div>
        );

      case "games":
        return (
          <div className="flex flex-col items-center justify-center mt-4">
            <div className="text-gray-100 w-full max-w-md text-center space-y-2">
              {Array.isArray(casino.generalInfo?.casinoType)
                ? casino.generalInfo.casinoType.map((item, index) => (
                  <p
                    key={index}
                    className="text-lg font-medium text-white"
                  >
                    {item}
                  </p>
                ))
                : <p className="text-lg font-medium text-gray-300">No information</p>}
            </div>
          </div>
        );

      case "responsible":
        return (
          <div className="space-y-6 mt-4 text-gray-100">

            <div>
              <p className={`${titleClass}`} style={{ color: COLORS.primary }}>
                Games:{" "}
              </p>
              <span className="text-lg ml-1">
                {safeJoin(casino.responsibleGaming?.tools, "Not specified")}
              </span>
            </div>

          </div>
        );

      default:
        return null;
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen ">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-white text-xl">Loading casino details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen ">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!casino) {
    return (
      <div className="min-h-screen ">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-white text-xl">Casino not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full ">
        <header
          className="relative bg-cover bg-center"
          style={{ background: COLORS.black }}
        >
          {casino && (
            <div className="relative z-10 py-28 pb-8 px-4 sm:px-6 md:px-20">
              <div className="relative w-full max-w-6xl mx-auto flex justify-center">

                {/* Card */}
                <div
                  className="rounded-2xl shadow-xl overflow-hidden flex flex-col border-[3px] md:flex-row w-full border relative z-10"
                  style={{ borderColor: COLORS.primary, backgroundColor: COLORS.mediumBlack }}
                >
                  {/* Logo */}
                  <div
                    className="flex items-center justify-center p-6 md:w-1/3 relative"
                    style={{ backgroundColor: bgColor }}
                  >

                    <div
                      className="absolute top-1 left-1 m-2 text-white px-3 py-0.5 rounded-md text-[14px] font-semibold z-20"
                      style={{ fontFamily: "Poppins", backgroundColor: COLORS.Red }}
                    >
                      # 1
                    </div>

                    <div
                      className="absolute top-1 m-2 right-1 bg-primary text-white px-2 py-0.5 rounded-md text-[14px] font-semibold z-20"
                      style={{ backgroundColor: COLORS.primary, fontFamily: "Poppins" }}
                    >
                      Popular
                    </div>

                    {casino.logo ? (
                      <img
                        ref={imgRef}
                        src={casino.logo}
                        alt={casino.name || "Casino"}
                        className="max-h-24 sm:max-h-48 object-contain relative z-10"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    ) : (
                      <div className="text-white text-lg">No logo available</div>
                    )}
                  </div>


                  {/* Details */}
                  <div className="p-4 sm:p-6 md:p-8 pt-10 text-left md:w-2/3">


                    <div className="flex flex-col gap-1">

                      {/* Desktop: Rating on top */}
                      <div className="hidden sm:flex items-center space-x-2">
                        <p
                          className="text-base sm:text-lg font-medium"
                          style={{ fontFamily: "Oswald", color: COLORS.Red }}
                        >
                          {(casino.rating || 4.6).toFixed(1)}
                        </p>
                        <span className="text-red-500 text-xl">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < Math.floor(casino.rating || 4.6) ? "★" : "☆"}
                            </span>
                          ))}
                        </span>
                      </div>

                      {/* Title + Rating on mobile */}
                      <div className="flex sm:block items-center justify-between">
                        <h2
                          className="
        text-[24px] 
        sm:text-[30px] 
        font-medium 
        text-white 
        tracking-[0.02em]     
        leading-[100%]
      "
                          style={{ fontFamily: "Oswald" }}
                        >
                          {casino.name || "Casino Name"}
                        </h2>

                        {/* Mobile: Rating at the right */}
                        <div className="flex sm:hidden items-center space-x-2">
                          <p
                            className="text-base font-medium"
                            style={{ fontFamily: "Oswald", color: COLORS.Red }}
                          >
                            {(casino.rating || 4.6).toFixed(1)}
                          </p>
                          <span className="text-red-500 text-xl">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>
                                {i < Math.floor(casino.rating || 4.6) ? "★" : "☆"}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>

                      {/* Overview */}
                      <div className="mt-1 text-sm text-white">
                        <p
                          className="
        text-[14px]
        font-medium
        leading-[160%]
        tracking-[0em]
      "
                          style={{ fontFamily: "Poppins" }}
                        >
                          {casino.overview ||
                            "Experience top-tier online gaming with our featured casino of the month!"}
                        </p>
                      </div>

                    </div>


                    <div className="grid grid-cols-2 gap-6 mt-4">

                      {/* ==== LEFT COLUMN: PAYMENTS ==== */}
                      <div className="flex flex-col space-y-1">

                        <span
                          className="leading-none"
                          style={{
                            fontFamily: "Oswald",
                            fontSize: "16px",
                            fontWeight: 500,
                            letterSpacing: "0%",
                            color: COLORS.primary,
                          }}
                        >
                          Payment Methods
                        </span>

                        <div className="flex gap-2 items-center">
                          {(() => {
                            // Get all logos
                            const logos = Object.values(PAYMENT_LOGOS);

                            // Shuffle array (Fisher–Yates)
                            const shuffled = [...logos];
                            for (let i = shuffled.length - 1; i > 0; i--) {
                              const j = Math.floor(Math.random() * (i + 1));
                              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                            }

                            // Take first 5 icons
                            return shuffled.slice(0, 5).map((logo, index) => (
                              <div
                                key={index}
                                className="w-7 h-5 flex items-center justify-center rounded bg-white overflow-hidden"
                              >
                                <img
                                  src={logo}
                                  alt="payment"
                                  className="w-full h-full object-contain"
                                  loading="lazy"
                                />
                              </div>

                            ));
                          })()}
                        </div>

                      </div>

                      {/* ==== RIGHT COLUMN: LICENSE ==== */}
                      <div className="flex flex-col space-y-1">

                        <span
                          className="leading-none"
                          style={{
                            fontFamily: "Oswald",
                            fontSize: "16px",
                            fontWeight: 500,
                            letterSpacing: "0%",
                            color: COLORS.primary,
                          }}
                        >
                          License & Regulation
                        </span>

                        <p
                          className="text-white"
                          style={{
                            fontSize: 12,
                            WebkitLineClamp: "2",

                          }}
                        >
                          {casino.generalInfo?.licences}
                        </p>

                      </div>

                    </div>



                    {/* Bonuses */}
                    <div
                      className="grid grid-cols-2 sm:grid-cols-4 w-full mt-4 rounded-xl overflow-hidden"
                      style={{ background: COLORS.lightBlack }}
                    >
                      {/* Column 1 — Welcome Bonus */}
                      <div className="flex items-center justify-center gap-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-700">
                        <span className="text-xl">🎰</span>
                        <div className="text-center">
                          <p className="text-sm text-white">Welcome Bonus</p>
                          <p className="text-xs text-white font-semibold">
                            {casino.welcomeBonus || "32 Free Spins"}
                          </p>
                        </div>
                      </div>

                      {/* Column 2 — Minimum Deposit */}
                      <div className="flex items-center justify-center gap-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-700">
                        <span className="text-xl">💳</span>
                        <div className="text-center">
                          <p className="text-sm text-white">Minimum Deposit</p>
                          <p className="text-xs text-white font-semibold">
                            {casino.minimumDeposit || "€10"}
                          </p>
                        </div>
                      </div>

                      {/* Column 3 — Wagering */}
                      <div className="flex items-center justify-center gap-1 px-4 py-3 sm:border-r border-gray-700">
                        <span className="text-xl">🎯</span>
                        <div className="text-center">
                          <p className="text-sm text-white">Wagering</p>
                          <p className="text-xs text-white font-semibold">
                            {casino.wagering || "40x"}
                          </p>
                        </div>
                      </div>

                      {/* Column 4 — Deposit Bonus */}
                      <div className="flex items-center justify-center gap-1 px-4 py-3">
                        <span className="text-xl">💰</span>
                        <div className="text-center">
                          <p className="text-sm text-white">Deposit Bonus</p>
                          <p className="text-xs text-white font-semibold">
                            {casino.depositBonus || "Up to €1000 + 25k"}
                          </p>
                        </div>
                      </div>
                    </div>






                    {/* Features & CTA */}
                    <div className="flex flex-col sm:flex-row gap-6 p-4">

                      {/* LEFT COLUMN — Features (70%) */}
                      <div className="sm:w-[70%] flex flex-col gap-4">
                        {casino.generalInfo?.features?.length > 0 && (
                          <div>
                            <h3
                              className="text-[16px] font-semibold mb-2 leading-[188%] tracking-[0em] text-white"
                              style={{ fontFamily: "Poppins" }}
                            >
                              Features
                            </h3>

                            <ul className="text-sm text-white grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                              {casino.generalInfo.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">

                                  {/* Circle Check */}
                                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-xs text-white">
                                    ✓
                                  </span>

                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* RIGHT COLUMN — CTA Section (30%) */}
                      <div className="sm:w-[224px] flex flex-col items-center justify-end ">

                        <p className="text-sm text-white text-center whitespace-nowrap mb-2">
                          {casino.visits || 0} Has Already Visited!
                        </p>

                        <a
                          href={casino.editorView || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-semibold text-xl text-center w-full"
                          style={{
                            width: "224px",
                            height: "53px",
                            borderRadius: "12px",
                            lineHeight: "53px",
                            backgroundColor: COLORS.primary,
                          }}
                        >
                          Play now
                        </a>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}
        </header >
      </div >

      <section className="mt-10 mb-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-6">
          {/* Left Tabs */}
          <div className="flex flex-col w-full  border border-blue-500 lg:w-1/4 rounded-lg  space-y-8">
            {["general", "payment", "games", "responsible"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-4 py-6 rounded-lg text-[16px] font-semibold leading-[100%] tracking-[0%] font-poppins ${activeTab === tab
                  ? "text-white"
                  : "text-white hover:text-blue-500"
                  }`}

                style={
                  activeTab === tab
                    ? {
                      background: "linear-gradient(89.97deg, #267BDC -18.4%, rgba(38, 123, 220, 0) 78.98%)",
                    }
                    : {}
                }
              >
                {tab === "general" && "General Info"}
                {tab === "payment" && "Banking Info"}
                {tab === "games" && "Deposit Bonuses"}
                {tab === "responsible" && "Games"}
              </button>
            ))}
          </div>


          {/* Right Content */}
          <div className="flex-1  rounded-xl p-6 text-white">
            {renderTabContent()}
          </div>
        </div>
      </section>

      {/* New Rich Text Content Section */}
      <h1 className="text-3xl lg:text-6xl font-bold  mt-10 lg:mt-20 text-center" style={{ color: COLORS.primary }}>
        Editor's View
      </h1>
      {
        casino?.content && (
          <section className=" py-6">
            <div className="max-w-6xl mx-auto px-4">

              <div
                className="prose prose-invert max-w-none text-gray-100"
                dangerouslySetInnerHTML={{ __html: casino.content }}
              />
            </div>
          </section>
        )
      }

      <Footer />
    </>
  );
};

export default CasinoDetail;
