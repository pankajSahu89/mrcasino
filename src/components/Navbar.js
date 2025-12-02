import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { COLORS } from "../constants/colors";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const country = useSelector((state) => state.country?.code || "US"); 
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenuIndex, setMobileSubmenuIndex] = useState(null);

  const menuItems = [
    { name: "Home", path: "/", submenu: [] },
    {
      name: "Casinos",
      submenu: [
        { name: "Crypto Casino", path: "/casinos/crypto" },
        { name: "Newest Casino", path: "/casinos/newest" },
        { name: "Online Casino", path: "/casinos/online" },
        { name: "Certified Casino", path: "/casinos/certified" },
        { name: "Mobile Casino", path: "/casinos/mobile" }
      ],
    },
    {
      name: "Bonuses",
      submenu: [
        { name: "Latest Bonus", path: "/bonuses/latest" },
        { name: "Exclusive Bonus", path: "/bonuses/exclusive" },
        { name: "Welcome Bonus", path: "/bonuses/welcome" },
        { name: "No Deposit", path: "/bonuses/no-deposit" },
        { name: "Free Spins Bonus", path: "/bonuses/free-spins" },
        { name: "Cashback Bonus", path: "/bonuses/cashback" },
        { name: "No Wagering Bonus", path: "/bonuses/no-wagering" },
      ],
    },
    {
      name: "Games",
      submenu: [
        { name: "Casino Games", path: "/games/casino" },
        { name: "Table Games", path: "/games/table" },
        { name: "Card Games", path: "/games/card" },
        { name: "Dice Games", path: "/games/dice" },
        { name: "Online Slots", path: "/games/real-money-slots" },
        { name: "Poker", path: "/games/poker" },
        { name: "Bingo", path: "/games/bingo" },
        { name: "Lottery Games", path: "/games/lottery" }
      ],
    },
    {
      name: "Slots",
      submenu: [
        { name: "Video", path: "/slots/video" },
        { name: "Classic Slots", path: "/slots/classic" },
        { name: "Progressive Slots", path: "/slots/progressive" },
        { name: "New Slots", path: "/slots/new" }
      ],
    },
    {
      name: "Betting",
      submenu: [
        { name: "Sports Betting", path: "/betting/sports" },
        { name: "New Betting Sites", path: "/betting/new-sites" },
        { name: "Bet Types", path: "/betting/types" },
        { name: "Betting Bonuses", path: "/betting/bonuses" },
        { name: "Free Bets", path: "/betting/free-bets" }
      ],
    },
    { name: "About Us", path: "/about-us", submenu: [] },
  ];

  const handleMouseEnter = (index) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setActiveMenuIndex(index);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setActiveMenuIndex(null), 200);
    setHoverTimeout(timeout);
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
    setMobileSubmenuIndex(null);
  };

  const toggleMobileSubmenu = (index) => {
    setMobileSubmenuIndex(mobileSubmenuIndex === index ? null : index);
  };

  return (
    <nav
      style={{
        backgroundColor: COLORS.black,
        borderBottom: `1px solid ${COLORS.primary}`,
      }}
      className="text-white fixed w-full top-0 z-50"
    >
      <div
        className="max-w-[1440px] mx-auto flex justify-between items-center px-4 sm:px-6 md:px-16 py-4"
      >
        {/* Logo */}
        <div
          className="text-4xl text-red-600"
          style={{ fontFamily: "BigNoodleTitling", letterSpacing: "0.1em" }}
        >
          MR GAMBLERS
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-3xl" onClick={toggleMobileMenu}>
          {mobileOpen ? <FiX /> : <FiMenu />}
          
        </div>


        {/* Desktop Menu */}
        <div
          className="hidden md:flex space-x-10 text-xl items-center"
          style={{ fontFamily: "BigNoodleTitling", letterSpacing: "0.08em" }}
        >
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={item.path}
                className="relative px-2 transition text-white"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: "100%",
                }}
              >
                <span className="relative inline-block">
                  {item.name}

                  {/* MAIN UNDERLINE */}
                  {location.pathname === item.path && (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: "-6px",
                        width: "32px",
                        height: "3px",
                        backgroundColor: COLORS.primary,
                        borderRadius: "9999px",
                      }}
                    ></span>
                  )}

                  {/* DOT */}
                  {location.pathname === item.path && (
                    <span
                      style={{
                        position: "absolute",
                        left: "36px",
                        bottom: "-6px",
                        width: "8px",
                        height: "3px",
                        backgroundColor: COLORS.primary,
                        borderRadius: "9999px",
                      }}
                    ></span>
                  )}
                </span>
              </Link>

              {/* Dropdown */}
              {item.submenu.length > 0 && (
                <div
                  className={`absolute left-0 top-full pt-2 transition-all duration-300 ${activeMenuIndex === idx ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                >
                  
                  <div className="bg-black w-64 border border-gray-700 rounded shadow-lg">
                    {item.submenu.map((sub, subIdx) => (
                      <Link
                        key={subIdx}
                        to={sub.path}
                        className="block px-5 py-3 hover:bg-red-600"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                  
                </div>
              )}
            </div>
          ))}

          {/* ⭐ FLAG (only once at the end) */}
          {country && (
            <img
              src={`https://flagsapi.com/${country}/flat/32.png`}
              alt="Country Flag"
              className="w-8 h-6 object-cover rounded-sm border border-gray-700"
            />
          )}
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden bg-black px-6 py-3 space-y-2 text-lg"
          style={{ fontFamily: "BigNoodleTitling" }}
        >
          {menuItems.map((item, idx) => (
            <div key={idx}>
              
              <div
                onClick={() =>
                  item.submenu.length > 0
                    ? toggleMobileSubmenu(idx)
                    : setMobileOpen(false)
                }
                className="flex justify-between py-3 border-b border-gray-700"
              >
                <Link to={item.path}>{item.name}</Link>
                {item.submenu.length > 0 && (
                  <span>{mobileSubmenuIndex === idx ? "▲" : "▼"}</span>
                )}
              </div>

              {mobileSubmenuIndex === idx && (
                <div className="ml-4 border-l border-gray-600 overflow-y-auto max-h-56">
                  {item.submenu.map((sub, subIdx) => (
                    <Link
                      key={subIdx}
                      to={sub.path}
                      className="block py-2 px-3 hover:bg-red-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
              
            </div>
          ))}
          {country && (
            <img
              src={`https://flagsapi.com/${country}/flat/32.png`}
              alt="Country Flag"
              className="w-8 h-6 object-cover rounded-sm border border-gray-700"
            />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
