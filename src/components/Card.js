import React from "react";
import { COLORS } from "../constants/colors";

const Card = ({ title, rating, bgImage, onClick, depositBonus, welcomeBonus, visits, minimumDeposit, licences }) => {
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
          boxShadow: `0 20px 30px -10px ${COLORS.primary}60`, // 80 = 50% opacity
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
        <div className="flex gap-1">
          <div className="w-8 h-6 rounded bg-gray-600"></div>
          <div className="w-8 h-6 rounded bg-gray-600"></div>
          <div className="w-8 h-6 rounded bg-gray-600"></div>
          <div className="w-8 h-6 rounded bg-gray-600"></div>
          <div className="w-8 h-6 rounded bg-gray-600"></div>

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


      {/* BONUS SECTION */}
      <div className="mt-4 text-sm text-white">

        <div className="flex justify-between">

          <div className="flex-1 min-w-0">
            <p
              className="leading-none text-left"
              style={{
                fontFamily: "Oswald",
                fontWeight: 500,
                marginBottom: 4,
                fontSize: "12px",
                letterSpacing: "0%",
                color: COLORS.primary,
              }}
            >
              Welcome Bonus
            </p>

            <p
              className="text-gray-300"
              style={{
                fontSize: 9,
                display: '-webkit-box',
                WebkitLineClamp: '2',
                lineHeight: '1.1',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {welcomeBonus}</p>
          </div>


          <div className="flex-1 min-w-0">
            <p
              className="leading-none text-left"
              style={{
                fontFamily: "Oswald",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0%",
                color: COLORS.primary,
              }}
            >
              Min Deposit
            </p>
            <p className="text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: 9 }}>{minimumDeposit}</p>
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="leading-none text-left"
              style={{
                fontFamily: "Oswald",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0%",
                color: COLORS.primary,
              }}
            >
              Wagering
            </p>
            <p className="text-gray-300" style={{ fontSize: 9 }}>40x</p>
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="leading-none text-left"
              style={{
                fontFamily: "Oswald",
                fontWeight: 500,
                fontSize: "12px",
                marginBottom: 4,
                letterSpacing: "0%",
                color: COLORS.primary,
              }}
            >
              Deposit Bonus
            </p>
            <p
              className="text-gray-300"
              style={{
                fontSize: 9,
                display: '-webkit-box',
                WebkitLineClamp: '2',
                lineHeight: '1.1',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {depositBonus}
            </p>
          </div>
        </div>
      </div>

      {/* PLAY NOW BUTTON */}
      <div
        onClick={onClick}
        className="
          text-white 
          w-full 
          py-4 
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
