import React from "react";
import Card from "./Card"; // adjust path if needed
import { COLORS } from "../constants/colors";

const RecentlyAddedSection = ({ recentCasinos, handlePlayClick }) => {
    return (
        <section className="py-10  text-center" style={{ background: COLORS.black }}>
            <div className="flex flex-col items-center">
                <div className="relative text-white  p-10 w-full max-w-full">
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
    );
};

export default RecentlyAddedSection;
