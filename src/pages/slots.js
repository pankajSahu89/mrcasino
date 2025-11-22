import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import SearchBox from "../components/searchbox";
import Card from "../components/Card";
import ExpertCard from "../components/ExpertCard";
import Footer from "../components/Footer";

import slotBg from "../assets/images/slots-bg.png";
import certified from "../assets/images/Certified.png";
import leftCircle from "../assets/images/lefteclipse.png";
import rightCircle from "../assets/images/righteclipse.png";


const SLOT_TYPE_TAGS = {
  video: "Video Slots",
  classic: "Classic Slots",
  progressive: "Progressive Slots",
  new: "New Slots",
};

const Slots = ({ type }) => {
  const [casinosData, setCasinosData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hotSlots, setHotSlots] = useState([]);
  const [expertSlots, setExpertSlots] = useState([]);
  const [certifiedSlots, setCertifiedSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    document.body.style.backgroundColor = "#1e1e1e";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const response = await API.get("/casinos");
        setCasinosData(response.data);
        filterSlots(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [type]);

   const handlePlayClick = (name) => {
    navigate(`/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`);
  };
 const filterSlots = (data) => {
  if (!type || typeof type !== "string") {
    setFilteredData(data);
    setHotSlots(data.filter(slot => slot.hotCasino === true));
    setExpertSlots(data.filter(slot => slot.recommendedByExperts === true));
    setCertifiedSlots(data.filter(slot => slot.certifiedCasino === true));
    return;
  }

  const tag = SLOT_TYPE_TAGS[type];
  let tagFiltered = [];

  if (!tag) {
    const normalizedType = type.replace(/-/g, '').toLowerCase();
    tagFiltered = data.filter(slot =>
      Array.isArray(slot.tags) &&
      slot.tags.some(tag =>
        tag?.replace(/-/g, '').toLowerCase().includes(normalizedType)
      )
    );
  } else {
    tagFiltered = data.filter(slot =>
      Array.isArray(slot.tags) && slot.tags.includes(tag)
    );
  }

  setFilteredData(tagFiltered);
  setHotSlots(tagFiltered.filter(slot => slot.hotCasino === true));
  setExpertSlots(tagFiltered.filter(slot => slot.recommendedByExperts === true));
  setCertifiedSlots(tagFiltered.filter(slot => slot.certifiedCasino === true));
};


  return (
    <>
      <Navbar />

      <header
        className="relative bg-cover bg-center h-[60vh] min-h-[400px] md:h-screen"
        style={{ backgroundImage: `url(${slotBg})` }}
      >
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black100 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="container mx-auto text-center absolute z-10 top-5 h-full flex flex-col justify-center items-center px-2">
            <div className="mt-32 px-4 w-full flex justify-center">
              <div className="w-full max-w-2xl">
                <SearchBox />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-10 bg-black100 text-center">
        <h2 className="text-3xl text-white font-semibold mb-6">Top Slots</h2>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 m-10 mt-0">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              filteredData.slice(0, 5).map((casino, index) => (
                <Card key={index} name={casino.name} rating={casino.rating} bgImage={casino.logo} onClick={() => handlePlayClick(casino.name)}/>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="relative bg-black100 text-center py-12 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${leftCircle}), url(${rightCircle})`,
            backgroundPosition: "0 100%, 100% 0",
            backgroundRepeat: "no-repeat",
            backgroundSize: "800px 600px, 800px 600px",
          }}
        ></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-6xl">HOT SLOT CATEGORIES</h2>

          <div className="flex justify-center mb-10 rounded-2xl mx-auto max-w-[900px] p-10 bg-green-800 sm:mx-6 mx-8 lg:mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
              {hotSlots.slice(0, 4).map((casino, index) => (
                <ExpertCard key={index} logo={casino.logo} name={casino.name} onClick={() => handlePlayClick(casino.name)}/>
              ))}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-10 mt-40 text-2xl md:text-3xl lg:text-4xl">RECOMMENDED BY OUR EXPERTS</h2>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {expertSlots.slice(0, 6).map((casino, index) => (
               <Card key={index} name={casino.name} rating={casino.rating} bgImage={casino.logo} onClick={() => handlePlayClick(casino.name)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-black100 text-center">
        <div className="flex flex-col items-center">
          <div className="relative text-white p-10 w-full max-w-full" style={{ background: "linear-gradient(to right, #1A008E, #070028)" }}>
            <div className="flex flex-row justify-center items-center text-center mb-10">
              <img src={certified} alt="Certified" className="w-12 h-12 sm:w-24 sm:h-24 sm:mr-4 mb-4 sm:mb-4" />
              <h2 className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-5xl">Certified Slots</h2>
            </div>
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {certifiedSlots.slice(0, 6).map((casino, index) => (
                  <Card key={index} name={casino.name} rating={casino.rating} bgImage={casino.logo} onClick={() => handlePlayClick(casino.name)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-black100 text-center">
        <div className="flex flex-col items-center">
          <div className="relative text-white bg-black100 p-10 w-full max-w-full">
            <h2 className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-5xl">Recently Added Slots</h2>
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                {filteredData.slice(0, 6).map((casino, index) => (
                  <Card key={index} name={casino.name} rating={casino.rating} bgImage={casino.logo} onClick={() => handlePlayClick(casino.name)}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Slots;
