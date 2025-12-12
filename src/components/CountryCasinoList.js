import React, { useState, useEffect } from "react";
import Card from "./Card"; // adjust the import path as needed
import { getCasinos } from "../api/casinos.js"; // Make sure to import your API function

const countries = [
   { name: "India", code: "in" },
  { name: "Canada", code: "ca" },
  { name: "United States", code: "us" },
  { name: "Australia", code: "au" },
  { name: "New Zealand", code: "nz" },
  { name: "Austria", code: "at" },
  { name: "Finland", code: "fi" },
  { name: "Germany", code: "de" },
  { name: "Ireland", code: "ie" },
  { name: "Netherlands", code: "nl" },
  { name: "Norway", code: "no" },
  { name: "Sweden", code: "se" },
  { name: "Switzerland", code: "ch" },
  { name: "United Kingdom (UK)", code: "gb" },
  { name: "European Countries (General)", code: "eu" },
 

];

const CountryCasinoList = () => {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedCode, setSelectedCode] = useState("in");
  const [allCasinos, setAllCasinos] = useState([]);
  const [filteredCasinos, setFilteredCasinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all casinos on component mount
  useEffect(() => {
    const fetchCasinos = async () => {
      try {
        setLoading(true);
        const data = await getCasinos();
        setAllCasinos(data);
        // Initially filter for the default country
        filterCasinosByCountry(data, selectedCountry);
      } catch (err) {
        setError(err.message || "Failed to load casinos");
      } finally {
        setLoading(false);
      }
    };

    fetchCasinos();
  }, []);

  // Filter casinos by selected country
  const filterCasinosByCountry = (casinos, country) => {
    // If "International" is selected, show all casinos
    if (country === "International") {
      setFilteredCasinos(casinos);
      return;
    }

    // Otherwise filter by available countries
    const filtered = casinos.filter(
      (casino) =>
        casino.availableCountries && casino.availableCountries.includes(country)
    );

    setFilteredCasinos(filtered);
  };

  const handleCountryChange = (e) => {
    const selectedCountryName = e.target.value;
    const selected = countries.find((c) => c.name === selectedCountryName);

    setSelectedCountry(selected.name);
    setSelectedCode(selected.code);

    // Filter casinos based on newly selected country
    filterCasinosByCountry(allCasinos, selected.name);
  };

  // Show a loading message while fetching data
  if (loading) {
    return (
      <div className="text-white text-center py-10">
        <p>Loading casinos...</p>
      </div>
    );
  }

  // Show an error message if fetching fails
  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="text-white px-4 py-10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold uppercase mb-2">
          Find Casinos by Country
        </h1>
        <p className="italic mb-8 text-lg text-gray-300">
          Browse top-rated casinos available in your region for the best
          experience and localized offers.
        </p>

        {/* Country Dropdown */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <div className="flex items-center bg-white text-black px-4 py-2 rounded-md w-full sm:w-80">
            <img
              src={`https://flagcdn.com/w40/${selectedCode}.png`}
              alt="flag"
              className="w-6 h-4 mr-2"
            />
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="bg-transparent outline-none w-full text-black"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Casino Grid using Card Component */}
        {filteredCasinos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center place-items-center">

            {filteredCasinos.map((casino) => (
              <Card
                key={casino._id}
                name={casino.name}
                rating={casino.rating}
                bgImage={casino.logo}
                flagCode={selectedCode}
                onClick={() =>
                  (window.location.href = `/casinos/${casino.slug}`)
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl text-gray-300">
              No casinos available for {selectedCountry}.
            </p>
            <p className="mt-2">Try selecting a different country.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryCasinoList;
