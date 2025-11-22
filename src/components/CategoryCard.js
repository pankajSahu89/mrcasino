import React from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../constants/colors";

const CategoryCard = ({ icon, label, link }) => {
  return (
    <Link to={link}>
      <div
        className="
          flex flex-col items-center justify-center 
          rounded-xl cursor-pointer 
          transition-transform duration-300 hover:scale-105
          w-28 h-28 sm:w-48 sm:h-48 md:w-54 md:h-54
        "
        style={{ background: COLORS.lightBlack }}
      >
        <img
          src={icon}
          alt={label}
          className="w-12 h-12  sm:w-24 sm:h-24  md:w-24 md:h-24 mb-2 transition-transform duration-300 hover:scale-110"
        />

        <p
          className="text-white text-center text-xs sm:text-xl md:text-2xl"
          style={{
            fontFamily: "Poppins",
            lineHeight: "1",
            letterSpacing: "0.05em",
            fontWeight: "100",

          }}
        >

          {label}
        </p>

        <span
          className="text-white text-xl sm:text-2xl md:text-3xl"
          style={{ fontWeight: "600" }}
        >
          →
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
