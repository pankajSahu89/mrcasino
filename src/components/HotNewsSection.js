import React from "react";
import { COLORS } from "../constants/colors";

const HotNewsSection = ({ news = [] }) => {
  // Prevent crash if blogs not loaded
  if (!news || news.length === 0) return null;

  return (
    <section
      className="py-12 sm:py-12 px-4 sm:px-8 md:px-20"
      style={{ backgroundColor: COLORS.black }}
    >
      {/* Title */}
      <h2
          className="text-white text-center mb-6 text-4xl sm:text-5xl md:text-6xl"
          style={{
            fontFamily: "Jaini",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "1",
            letterSpacing: "0",
          }}
        >
        Hottest News from CasinoTrees
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 mb-6 lg:grid-cols-3 gap-6">
        
        {/* LEFT FEATURED BLOG */}
        <div className="col-span-2 relative rounded-2xl overflow-hidden h-[330px] sm:h-[420px] md:h-[480px]">
          <img
            src={news[0].thumbnail}         // <-- FIXED
            alt={news[0].title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

          {/* Text */}
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <p className="uppercase text-sm opacity-80 tracking-wider">
              {news[0].tags?.[0] || "NEWS"}   {/* <-- FIXED CATEGORY */}
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold mt-1">
              {news[0].title}
            </h3>

            <button
              className="mt-4 px-4 py-2 bg-white text-black rounded-md font-medium"
            >
              Jump in
            </button>
          </div>
        </div>

        {/* RIGHT SIDE SMALL BLOG CARDS */}
        <div className="grid grid-cols-1  sm:grid-cols-2 gap-6">
          {news.slice(1).map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden h-[180px] sm:h-[200px] md:h-[220px]"
            >
              <img
                src={item.thumbnail}       // <-- FIXED
                alt={item.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="uppercase text-xs opacity-70">
                  {item.tags?.[0] || "NEWS"}  {/* <-- FIXED */}
                </p>
                <h4 className="text-base sm:text-lg font-semibold leading-tight">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HotNewsSection;
