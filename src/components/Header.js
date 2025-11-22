import React from "react";
import homeBg from "../assets/images/home-bg.png";
import { COLORS } from "../constants/colors";
import homeCard from "../assets/images/home-card.gif";
import stage from "../assets/images/redstag.png";

const Header = () => {
    return (
        <header
            className="relative bg-cover bg-center h-[60vh] min-h-[500px] md:h-screen"
            style={{ backgroundImage: `url(${homeBg})` }}
        >
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-t"
                style={{
                    background: `linear-gradient(to top, ${COLORS.black} 50%, transparent)`,
                    opacity: 0.5, // adjust opacity if needed
                }}
            />

           <div className="container mx-auto px-6 h-full flex items-center justify-center lg:justify-between relative z-10">

                <div className="flex flex-col lg:flex-row gap-10 w-full">

                    {/* LEFT SECTION */}
                    <div className="flex flex-col items-center  mt-20 justify-center text-center w-full">
                        <h1
                            className="text-2xl md:text-4xl  lg:text-4xl text-center text-white max-w-xl"
                            style={{
                                fontFamily: "Jaini",
                                lineHeight: "1",
                                fontWeight: "500",
                                color: COLORS.primary,
                            }}
                        >
                            Play. Win. Repeat.
                        </h1>

                        <p
                            className="mt-2 text-sm md:text-xl text-gray-200 max-w-md"
                            style={{
                                fontFamily: "Jaini",
                                lineHeight: "1",
                            }}
                        >
                            Your Gateway to the Best Online Casinos & Big Wins!
                        </p>

                        {/* SEARCH BOX */}
                        <div className="mt-8 w-full max-w-lg">
                            <div
                                className="sm:w-[200px] lg:w-[800px]  text-md md:text-md lg:text-2xl text-black max-w-full mx-auto flex items-center bg-white rounded-full shadow-md"
                                style={{
                                    fontFamily: "BigNoodleTitling",
                                    lineHeight: "1.2",
                                    wordSpacing: "0.1em",
                                    fontWeight: "100",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                <div className="flex items-center py-4  px-4">
                                    {/* Search Icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 text-[#797C83] mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-4.35-4.35m1.85-5.4A7.5 7.5 0 1110.5 3a7.5 7.5 0 018.5 8.5z"
                                        />
                                    </svg>

                                    {/* Input */}
                                    <input
                                        type="text"
                                        placeholder="Find over 1000 casinos"
                                        className="flex-1 bg-transparent border-none outline-none rounded-full"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            lineHeight: "100%",
                                            letterSpacing: "0%",
                                            color: "#797C83",
                                        }}
                                    />
                                </div>


                            </div>
                        </div>
                        {/* STATS ROW BELOW SEARCH BAR */}
                        <div
                            className="flex items-center justify-center gap-6 mt-4"
                            style={{
                                width: "334px",
                                height: "21px",
                            }}
                        >
                            {/* ITEM 1 */}
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
                                <span
                                    style={{
                                        fontFamily: "poppins",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        lineHeight: "100%",
                                        color: COLORS.white,
                                    }}
                                >
                                    45M+ Players
                                </span>
                            </div>


                            <div className="flex items-center gap-2">


                                <span
                                    style={{
                                        fontFamily: "poppins",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        lineHeight: "100%",
                                        color: COLORS.white,
                                    }}
                                >
                                    23M+ Matches Analyzed
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center mt-4">
                            <img
                                src={homeCard}
                                alt="Home animation"
                                className="w-24 h-24 sm:w-30 sm:h-30 md:w-40 md:h-40 object-contain"
                            />
                        </div>


                    </div>

                    {/* RIGHT SECTION – CARDS */}
                    <div className="hidden lg:flex justify-center items-center space-x-6  lg:mt-0">


                        {/* CARD 1 */}
                        <div className="bg-[#1C171D] rounded-xl w-[168px] text-center text-white shadow-xl relative">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-lg px-3 py-1 rounded-md">
                                #1
                            </span>

                            <div className="pt-8 text-lg">India</div>

                            <div className="flex justify-center mt-4">
                                <img src={stage} className="w-20 h-20" alt="" />
                            </div>

                            <p className="mt-4 text-xl">Red Stag Casino</p>
                            <p className="text-blue-400 mt-1 text-lg">5.0 ★★★★★</p>

                            <button className="w-full mt-4 text-lg py-3 bg-blue-600 hover:bg-blue-700 rounded-b-xl"style={{backgroundColor: COLORS.primary}}>
                                Play Now
                            </button>
                        </div>

                        {/* CARD 2 */}
                        <div className="bg-[#1C171D] rounded-xl w-[168px] text-center text-white shadow-xl relative hidden md:block">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md">
                                #1
                            </span>

                            <div className="pt-8 text-sm">India</div>

                            <div className="flex justify-center mt-4">
                                <img src={stage} className="w-16 h-16" alt="" />
                            </div>

                            <p className="mt-4 text-md">888 Casino</p>
                            <p className="text-blue-400 mt-1 text-sm">5.0 ★★★★★</p>

                            <button className="w-full mt-4 py-3 text-md bg-blue-600 hover:bg-blue-700 rounded-b-xl"style={{backgroundColor: COLORS.primary}}>
                                Play Now
                            </button>
                        </div>

                        {/* CARD 3 */}
                        <div className="bg-[#1C171D] rounded-xl w-[168px] text-center text-white shadow-xl relative hidden lg:block">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md">
                                #1
                            </span>

                            <div className="pt-8 text-xs">India</div>

                            <div className="flex justify-center mt-4">
                                <img src={stage} className="w-12 h-12" alt="" />
                            </div>

                            <p className="mt-4 text-sm">Ninlay Casino</p>
                            <p className="text-blue-400 mt-1 text-xs">5.0 ★★★★★</p>

                            <button className="w-full mt-4 py-3 text-xs  hover:bg-blue-700 rounded-b-xl" style={{backgroundColor: COLORS.primary}}>
                                Play Now
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
