import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { COLORS } from "../constants/colors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCountryCode } from "../redux/countrySlice";

const Navbar = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();


        if (data?.country_code) {
          dispatch(setCountryCode(data.country_code));

        }
      } catch (error) {
        console.log("Country fetch error:", error);
      }
    };

    fetchCountry();
  }, []);
  const location = useLocation();
  const country = useSelector((state) => state.country?.code);
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
        { name: "Mobile Casino", path: "/casinos/mobile" },
        { name: "Country Wise", path: "/countryWise" },
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
         <h2
                      className="flex items-center justify-center w-fit"
                      style={{
                        height: "38px",
                        background: COLORS.white,
                        borderTopLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                        padding: "8px 20px",
                        fontFamily: "BigNoodleTitling",
                        fontSize: "28px",
                        fontWeight: "300",
                        letterSpacing: "0.1em",
                        color: COLORS.primary,
                      }}
                    >
                      Casino TreeS
                    </h2>

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
                  {(
                    item.path === location.pathname ||
                    item.submenu.some(sub => sub.path === location.pathname)
                  ) && (
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
                  {(
                    item.path === location.pathname ||
                    item.submenu.some(sub => sub.path === location.pathname)
                  ) && (
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
                  className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-300 
      ${activeMenuIndex === idx ? "opacity-100 visible" : "opacity-0 invisible"}
    `}
                >
                  {/* Arrow Pointer */}
                  <div className="relative flex justify-center">
                    <div className="w-4 h-4  rotate-45  absolute -top-2" style={{ background: COLORS.white }}></div>
                  </div>

                  {/* Dropdown Container */}
                  <div className="bg-white text-black w-[380px] grid grid-cols-2 gap-2
      border border-gray-200 rounded-2xl shadow-xl p-6"
                  >
                    {item.submenu.map((sub, subIdx) => (
                      <Link
                        key={subIdx}
                        to={sub.path}
                        className="flex justify-between items-center px-3 py-3 rounded-xl
                     hover:bg-gray-100 transition font-medium" style={{ fontWeight: 500, fontSize: 18, }}
                      >
                        {sub.name}
                        <span className="text-xl" style={{ color: COLORS.primary, fontWeight: 500, fontSize: 18, }}>➜</span>
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
          className="md:hidden px-6 py-4 space-y-1"
          style={{ fontFamily: "Poppins", backgroundColor: "#ffffff" }}
        >
          {menuItems.map((item, idx) => {
            const isOpen = mobileSubmenuIndex === idx;

            return (
              <div key={idx}>
                {/* MAIN ITEM */}
                <div
                  onClick={() =>
                    item.submenu.length > 0
                      ? toggleMobileSubmenu(idx)
                      : setMobileOpen(false)
                  }
                  className="flex justify-between items-center py-3"
                >
                  <Link
                    to={item.path}
                    className="text-[16px] font-medium"
                    style={{
                      color: isOpen ? COLORS.primary : "#000",
                    }}
                  >
                    {item.name}
                  </Link>

                  {/* Blue Arrow */}
                  {item.submenu.length > 0 && (
                    <span
                      style={{
                        color: COLORS.primary,
                        fontSize: "20px",
                        fontWeight: 700,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "0.2s ease",
                      }}
                    >
                      ↓
                    </span>
                  )}
                </div>

                {/* SUBMENU */}
                {isOpen && (
                  <div className="ml-4 pl-4 border-l border-gray-300 space-y-2">
                    {item.submenu.map((sub, subIdx) => (
                      <Link
                        key={subIdx}
                        to={sub.path}
                        className="block py-1 text-[15px] font-medium"
                        style={{ color: "#000" }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* COUNTRY FLAG */}
          {country && (
            <img
              src={`https://flagsapi.com/${country}/flat/32.png`}
              alt="Country Flag"
              className="w-8 h-6 object-cover rounded-sm border border-gray-700 mt-4"
            />
          )}
        </div>
      )}

    </nav>
  );
};

export default Navbar;
