import React from "react";
import { COLORS } from "../constants/colors";

// Import your icons
import GameIcon1 from "../assets/images/poker-icon.png";
import GameIcon2 from "../assets/images/blackJack-icon.png";
import GameIcon3 from "../assets/images/domino-icon.png";
import GameIcon4 from "../assets/images/gowpoker-icon.png";
import GameIcon5 from "../assets/images/poker-full-icon.png";

const AreYouIn = () => {
  const games = [
    { name: "POKER", icon: GameIcon1 },
    { name: "BLACKJACK", icon: GameIcon2 },
    { name: "BACCARAT", icon: GameIcon3 },
    { name: "GOW POKER", icon: GameIcon4 },
    { name: "PAI GOW TILES", icon: GameIcon5 },
  ];

  return (
    <section
      className="py-16 sm:py-20 px-4 sm:px-8 md:px-16"
      style={{ background: COLORS.tableGamingGradient }}
    >
      <div className="flex flex-col items-center">
        {/* Heading */}
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
          ARE YOU IN?
        </h2>

        {/* Subheading */}
        <p
          className="text-white text-center mb-12 text-sm sm:text-base md:text-lg"
          style={{
            fontFamily: "Poppins",
            fontWeight: 400,
            lineHeight: "1.8",
            letterSpacing: "0",
          }}
        >
          TABLE GAMING AT MR GAMBLERS
        </p>

        {/* Game icons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-12 md:gap-15">
          {games.map((game, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-8 h-8 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center mb-4 sm:mb-6">
                <img
                  src={game.icon}
                  alt={game.name}
                  className="w-4 h-4 sm:w-16 sm:h-16 md:w-16 md:h-16 object-contain"
                />
              </div>
              <span
                className="text-white text-center text-xs sm:text-lg md:text-xl"
                style={{
                  fontFamily: "Jaini",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "1",
                  letterSpacing: "0",
                }}
              >
                {game.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreYouIn;
