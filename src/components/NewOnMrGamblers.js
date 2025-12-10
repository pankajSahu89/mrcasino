import React from "react";
import { COLORS } from "../constants/colors";
import Card from "./Card";

const NewOncasinotrees = ({
    activeSection,
    handleSectionChange,
    getCurrentSectionData,
    handlePlayClick,
}) => {
    return (
        <section
            className="py-5 text-center"
            style={{ backgroundColor: COLORS.black }}
        >
            {/* Title */}
            <h2
                className="text-white text-center mb-4 md:mb-8 mt-10 mt-10 text-3xl sm:text-5xl md:text-6xl"
                style={{
                    fontFamily: "Jaini",
                    fontWeight: 400,
                    lineHeight: "100%",
                    letterSpacing: "0%",
                }}
            >
                NEW ON Casino TreeS
            </h2>


            {/* Tabs */}
            <div className="w-full flex justify-center px-5 mb-10">
                <div
                    className="w-full h-20  sm:h-28  md:h-32 max-w-[1200px] rounded-[28px] border flex justify-center"
                    style={{
                        maxWidth: "1119px",
                        width: "100%",
                        padding: "20px 30px",
                        borderColor: COLORS.primary,
                        backgroundColor: COLORS.black,
                    }}
                >

                    <div className="flex items-center justify-between w-full">
                        {["casinos", "bonuses", "games", "betting", "slots"].map((item) => {
                            const label = item.charAt(0).toUpperCase() + item.slice(1);
                            const active = activeSection === item;

                            return (
                                <button
                                    key={item}
                                    onClick={() => handleSectionChange(item)}
                                    className="flex-1 w-10 h-6 sm:w-28 sm:h-28 md:w-48 md:h-16 flex items-center justify-center py-2 sm:py-3 text-xs sm:text-base md:text-2xl transition-all duration-200"
                                    style={{
                                        borderRadius: "50px",
                                        backgroundColor: active ? COLORS.primary : "transparent",
                                        color: "#FFFFFF",
                                        border: active,
                                        fontFamily: "Poppins, sans-serif",
                                        fontWeight: 600,
                                        lineHeight: "100%",
                                        letterSpacing: "0",
                                    }}
                                >
                                    {label}
                                </button>

                            );
                        })}
                    </div>
                </div>
            </div>






            {/* Cards */}
            <div className="flex justify-center px-4 items-center">
                <div className="w-full overflow-x-auto scroll-smooth hide-scrollbar">
                    <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 m-10 mt-5">
                        {getCurrentSectionData().map((casino) => (
                            <div className="flex-shrink-0 w-80 sm:w-auto">
                                <Card
                                    title={casino.name}
                                    name={casino.name}
                                    rating={casino.rating}
                                    bgImage={casino.logo}
                                    depositBonus={casino.depositBonus || "Up to €1000 + 200 Free Spins"}
                                    welcomeBonus={casino.welcomeBonus || "200% Match Bonus"}
                                    minimumDeposit={casino.paymentInfo?.minimumDeposit || "$0"}
                                     withdrawalMethods={casino.paymentInfo?.withdrawalMethods || "Visa, MasterCard, Skrill, Neteller"}
                                    visits={`${casino.visits || 0}`}
                                    licences={casino.generalInfo?.licences || "Curacao"}
                                    onClick={() => handlePlayClick(casino.name)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </section>
    );
};

export default NewOncasinotrees;
