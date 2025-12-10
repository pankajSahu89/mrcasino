import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { COLORS } from "../constants/colors";

import categoriesImg1 from "../assets/images/image1.png";
import categoriesImg2 from "../assets/images/image2.png";
import categoriesImg3 from "../assets/images/image3.png";
import categoriesImg4 from "../assets/images/image4.png";
import categoriesImg5 from "../assets/images/image5.png";
import categoriesImg6 from "../assets/images/image6.png";
import categoriesImg7 from "../assets/images/casino.png";
import categoriesImg8 from "../assets/images/country.png";

const HotCasinoSection = ({ filteredCertified = [] }) => {
    const [hotCasinos, setHotCasinos] = useState([]);

    const categories = [
        { icon: categoriesImg1, label: "Casino Review", link: "/casinos/certified" },
        { icon: categoriesImg2, label: "Newest Casino", link: "/casinos/newest" },
        { icon: categoriesImg3, label: "Video Reviews", link: "/slots/video" },
        { icon: categoriesImg4, label: "Bonuses", link: "/betting/bonuses" },
        { icon: categoriesImg5, label: "Mobile Casinos", link: "/casinos/mobile" },
        { icon: categoriesImg6, label: "Instant Play", link: "/games/lottery" },
        { icon: categoriesImg7, label: "Crypto Casino", link: "/casinos/crypto" },
        { icon: categoriesImg8, label: "Country Wise", link: "/countryWise" },
    ];

    useEffect(() => {
        if (filteredCertified.length > 0) {
            setHotCasinos(filteredCertified.slice(0, 6));
        }
    }, [filteredCertified]);

    return (
        <section
            className="relative text-center py-4 sm:py-12 md:py-12 overflow-hidden"
            style={{ background: COLORS.hotCasinoGradient }}
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundPosition: "0 100%, 100% 0",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "800px 600px, 800px 600px",
                }}
            />

            <div className="relative z-10 max-w-[900px] mx-auto">
                <h2
                    className="text-white text-center mb-12 text-4xl sm:text-5xl md:text-6xl"
                    style={{
                        fontFamily: "Jaini",
                        fontWeight: 400,
                        lineHeight: "1",
                    }}
                >
                    HOT CASINO CATEGORIES
                </h2>

                <div className="flex justify-center">
                    <div className="grid grid-cols-2 grid-rows-2 gap-8 sm:grid-cols-4 sm:gap-12 md:gap-12">
                        {categories.map((category, index) => (
                            <CategoryCard
                                key={index}
                                icon={category.icon}
                                label={category.label}
                                link={category.link}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HotCasinoSection;
