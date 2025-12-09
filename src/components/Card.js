import React from "react";
import { COLORS } from "../constants/colors";
import { PAYMENT_LOGOS } from "../utils/paymentLogos";
const Card = ({ title, rating, bgImage, onClick, depositBonus, welcomeBonus, visits, minimumDeposit, licences, withdrawalMethods, }) => {

  return (
    <div
      onClick={onClick}
      className="
        relative 
        w-[370px] max-w-full
        rounded-[24px]
        p-5 
        transition-transform duration-300 ease-in-out 
        hover:scale-105
        cursor-pointer
      "
      style={{ background: COLORS.mediumBlack }}
    >

      {/* TOP IMAGE */}
      <div
        className="
          w-full 
          h-[201px]
          rounded-[18px]
          radiant-[12px]
          overflow-hidden
        "
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: `0 20px 30px -10px ${COLORS.primary}60`,
        }}
      ></div>

      {/* RATING + VISITS */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <span className=" text-2xl" style={{ color: COLORS.Red }}>★</span>
          <span className="ml-2 text-md text-white font-semibold">
            {rating}/5
          </span>
        </div>

        <div className="text-right flex flex-col items-center text-center leading-tight">
          <span className="text-pink-400 font-semibold" style={{ fontSize: 12, color: COLORS.Red }}>
            {visits}
          </span>
          <span className="text-gray-400" style={{ fontSize: 9 }}>
            Has Already Visited!
          </span>
        </div>

      </div>

      {/* TITLE */}
      <h2
        className="
    text-white 
    font-[500] 
    mt-3 
    text-left 
    leading-none 
    tracking-[2%]
  "
        style={{
          fontFamily: "Oswald",
          fontSize: "22px"
        }}
      >
        {title}
      </h2>


      {/* PAYMENT ICONS ROW (placeholder) */}
      <div className="flex items-center justify-between mt-3">

        {/* LEFT TITLE */}
        <span
          className="
    leading-none
    text-left
  "
          style={{
            fontFamily: "Oswald",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0%",
            color: COLORS.primary,
          }}
        >
          Payments Methods
        </span>


        {/* RIGHT ICONS */}

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
      <div className="flex items-center justify-between mt-3">

        {/* LEFT TITLE */}
        <span
          className="
    leading-none
    text-left
  "
          style={{
            fontFamily: "Oswald",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0%",
            color: COLORS.primary,
          }}
        >
          License & Regulation
        </span>


        {/* RIGHT ICONS */}
        <p className="text-gray-400 mt-1"
          style={{
            fontSize: 10,
            display: '-webkit-box',
            WebkitLineClamp: '2',
            lineHeight: '1.1',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          {licences}
        </p>

      </div>

      <div className="flex items-center justify-between mt-2">

        {/* LEFT TITLE */}
        <span
          className="
    leading-none
    text-left
  "
          style={{
            fontFamily: "Oswald",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0%",
            color: COLORS.primary,
          }}
        >
          Welcome Bonus
        </span>


        {/* RIGHT ICONS */}
        <p className="text-gray-400 mt-1"
          style={{
            fontSize: 10,
            display: '-webkit-box',
            WebkitLineClamp: '2',
            lineHeight: '1.1',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          {welcomeBonus}
        </p>

      </div>

      <div className="flex items-center justify-between mt-2">

        {/* LEFT TITLE */}
        <span
          className="
    leading-none
    text-left
  "
          style={{
            fontFamily: "Oswald",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0%",
            color: COLORS.primary,
          }}
        >
          Deposit Bonus
        </span>


        {/* RIGHT ICONS */}
        <p className="text-gray-400 mt-1"
          style={{
            fontSize: 10,
            display: '-webkit-box',
            WebkitLineClamp: '2',
            lineHeight: '1.1',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          {depositBonus}
        </p>

      </div>


      {/* BONUS SECTION */}
      <div className="mt-2 text-sm text-white">

        {/* Titles Row */}
        <div className="flex justify-between w-full">

          <p className="flex-1 text-left"
            style={{ fontFamily: "Oswald", fontWeight: 500, fontSize: 12, color: COLORS.primary }}>
            Min Deposit <span style={{ color: COLORS.white, marginLeft: 12, fontSize: 10 }}> {minimumDeposit}</span>
          </p>

          <p className="flex-1 text-center"
            style={{ fontFamily: "Oswald", fontWeight: 500, fontSize: 12, color: COLORS.primary }}>
            Wagering<span style={{ color: COLORS.white, marginLeft: 12, fontSize: 10 }}> 40x</span>
          </p>

        </div>
      </div>


      {/* PLAY NOW BUTTON */}
      <div
        onClick={onClick}
        className="
          text-white 
          w-full 
          py-3 
          text-lg 
          rounded-xl 
          mt-6 
          text-center 
          transition
        "
        style={{ background: COLORS.primary }}
      >

        Play Now
      </div>
    </div>
  );
};

export default Card;
