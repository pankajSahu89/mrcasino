import React from "react";
import Card from "./Card"; // adjust import path as needed

const CertifiedCasinosSection = ({ certifiedCasinos, handlePlayClick, certified }) => {
  return (
    <section className=" bg-black100 text-center">
      <div className="flex  flex-col items-center">
        <div
          className="relative text-white p-0 md:p-5 w-full max-w-full"
          style={{
            background:
              "linear-gradient(270deg, rgba(38, 62, 220, 0.41) 0.46%, rgba(220, 38, 84, 0.41) 100%)",
          }}
        >
          <div className="flex flex-row  mt-10 sm:flex-row justify-center items-center text-center mb-10">
            <img
              src={certified}
              alt="Certified"
              className="w-12 h-12 sm:w-24 sm:h-24 sm:mr-4 mb-4 sm:mb-4"
            />
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
              Certified Casinos
            </h2>
          </div>

          <div className="flex justify-center items-center">
            <div className="w-full overflow-x-auto scroll-smooth  hide-scrollbar">
              <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 m-10 mt-5">
                {certifiedCasinos.map((casino) => (
                  <Card
                    title={casino.name}
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

export default CertifiedCasinosSection;