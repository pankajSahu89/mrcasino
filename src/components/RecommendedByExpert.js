import React from "react";
import Card from "./Card"; // adjust import path as needed

const RecommendedByExpertSection = ({ certifiedCasinos, handlePlayClick }) => {
    return (
        <section className=" bg-black100 text-center">
            <div className="flex flex-col items-center">
                <div
                    className="relative text-white p-0 md:p-5 w-full max-w-full"
                    style={{
                        background: "linear-gradient(180deg, rgba(38, 123, 220, 0.41) 0%, #132841 60.1%, #0E1015 99.54%)",
                    }}
                >
                    <div className="flex flex-row sm:flex-row justify-center items-center text-center mb-10">

                        <h2
                            className="text-white text-center mb-3 mt-10 text-4xl sm:text-5xl md:text-6xl"
                            style={{
                                fontFamily: "Jaini",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "1",
                                letterSpacing: "0",
                            }}
                        >
                            RECOMMENDED BY OUR EXPERTS
                        </h2>
                    </div>


                     <div className="flex justify-center items-center">
                        <div className="w-full overflow-x-auto scroll-smooth hide-scrollbar">
                            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 m-10 mt-5">
                                {certifiedCasinos.map((casino) => (
                               <Card
                            title ={casino.name}
                            name={casino.name}
                            rating={casino.rating}
                            bgImage={casino.logo}
                            depositBonus={casino.depositBonus || "Up to €1000 + 200 Free Spins"}
                            welcomeBonus={casino.welcomeBonus || "200% Match Bonus"}
                            minimumDeposit={casino.paymentInfo?.minimumDeposit || "$0"}
                            visits={`${casino.visits || 0}`}
                            licences={casino.generalInfo?.licences || "Curacao"}
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
            </div>
        </section>
    );
};

export default RecommendedByExpertSection;