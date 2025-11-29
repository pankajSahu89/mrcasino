import React from "react";
import crown from "../assets/images/crown.png";

const Card = ({ rating, bgImage, flagCode, onClick }) => {
  return (
    <div
      className="relative bg-white rounded-3xl shadow-lg w-48 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      {/* Flag or fallback crown inside circle */}
       

      {/* Background image */}
      <div
        className="mt-10 h-32 flex items-center justify-center bg-white rounded-t-3xl"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {!bgImage && <span className="text-gray-500 text-sm">No image</span>}
      </div>

      <div className="flex justify-between mt-0 items-center px-4 py-4">
        <div className="flex items-center">
          <span className="text-orange-500 text-2xl">★</span>
          <span className="ml-2 text-xl text-gray-600">{rating}</span>
        </div>
        <span className="text-gray-500 text-sm underline cursor-pointer">
          Read Review
        </span>
      </div>

      <div
        className="bg-red-600 mx-5 mb-3 text-white py-2 text-lg rounded-lg hover:bg-red-700 transition-colors duration-300 text-center cursor-pointer"
        onClick={onClick}
      >
        Play Now
      </div>
    </div>
  );
};

export default Card;
