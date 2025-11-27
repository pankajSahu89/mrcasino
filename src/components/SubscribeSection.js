import React from "react";
import { COLORS } from "../constants/colors";

const SubscribeSection = () => {
  return (
    <section
      className="pb-20 flex justify-center px-4"
      style={{ background: COLORS.black }}
    >
      <div
        className="w-full md:w-[90%] rounded-2xl p-8 md:p-10 
                   flex flex-col md:flex-row items-center justify-between 
                   border border-transparent hover:border-gray-700 
                   transition text-center md:text-left"
        style={{
          background: "linear-gradient(90deg, #1C0F0F 0%, #1C140F 100%)",
        }}
      >
        {/* LEFT TEXT AREA */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h2
            className="text-3xl md:text-4xl text-white font-bold mb-3"
            style={{
              fontFamily: "BigNoodleTitling",
              lineHeight: "1.2",
              letterSpacing: "0.05em",
              fontWeight: "100",
            }}
          >
            SUBSCRIBE TO OUR NEWSLETTER
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            Subscribe to receive the latest news and updates about MR GAMBLERS.
            We promise not to spam you!
          </p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full md:w-1/2 flex flex-col sm:flex-row items-center md:justify-end gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-4 py-3 rounded-lg 
                       ml-0 sm:ml-10 md:ml-10
                       bg-white border border-gray-500 
                       text-gray-900 placeholder-gray-600 
                       focus:outline-none focus:border-blue-600"
          />

          <button
            className="w-full sm:w-auto px-6 py-3 
                       bg-blue-600 hover:bg-blue-700 
                       text-white rounded-lg font-semibold transition"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
