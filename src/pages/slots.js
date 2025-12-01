import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import SearchBox from "../components/searchbox";
import Footer from "../components/Footer";
import RecentlyAddedSection from "../components/RecentlyAddedSection";
import CertifiedCasinosSection from "../components/CertifiedCasino";
import RecommendedByExpertSection from "../components/RecommendedByExpert";
import TopCasinos from "../components/TopCasinos.js";
import SubscribeSection from "../components/SubscribeSection.js";
import slotBg from "../assets/images/slots-bg.png";
import certified from "../assets/images/Certified.png";


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

  setFilteredData(tagFiltered.slice(0, 4));
  setHotSlots(tagFiltered.filter(slot => slot.hotCasino === true).slice(0, 4));
  setExpertSlots(tagFiltered.filter(slot => slot.recommendedByExperts === true).slice(0, 4));
  setCertifiedSlots(tagFiltered.filter(slot => slot.certifiedCasino === true).slice(0, 4));
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

     

     
      <TopCasinos
        recentCasinos={filteredData}
        handlePlayClick={handlePlayClick}
      />

      <RecommendedByExpertSection
        certifiedCasinos={expertSlots}
        handlePlayClick={handlePlayClick}

      />

      <CertifiedCasinosSection
        certifiedCasinos={certifiedSlots}
        handlePlayClick={handlePlayClick}
        certified={certified}
      />

      <RecentlyAddedSection
        recentCasinos={filteredData}
        handlePlayClick={handlePlayClick}
      />


      <SubscribeSection />

      <Footer />
    </>
  );
};

export default Slots;
