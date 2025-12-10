import React from "react";
import Card from "./Card"; // adjust path if needed
import { COLORS } from "../constants/colors";

const RecentlyAddedSection = ({ recentCasinos, handlePlayClick }) => {
    return (
        <section className="py-10  text-center" style={{ background: COLORS.black }}>
            <div className="flex flex-col items-center">
                <div className="relative text-white p-0 md:p-5 w-full max-w-full">
                    <div className="flex flex-row sm:flex-row justify-center items-center text-center mb-10">
                        <h2
                            className="text-white text-center mb-3 text-4xl sm:text-5xl md:text-6xl"
                            style={{
                                fontFamily: "Jaini",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "1",
                                letterSpacing: "0",
                            }}
                        >

                            Recently Added on Casino Trees
                        </h2>
                    </div>


                    <div className="flex justify-center items-center">
                        <div className="w-full overflow-x-auto scroll-smooth hide-scrollbar">
                            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 m-10 mt-5">
                                {recentCasinos.map((casino) => (
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
            </div>
        </section>
    );
};

export default RecentlyAddedSection;
