import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Casinos from "./pages/casinos";
import Bonuses from "./pages/Bonuses";
import Games from "./pages/Games";
import Slots from "./pages/slots";
import Betting from "./pages/betting";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import CasinosAdmin from "./pages/CasinosAdmin";
import BlogsAdmin from "./pages/BlogsAdmin";
import SettingsAdmin from "./pages/SettingsAdmin";
import CreateCasino from "./pages/CreateCasino";
import CreateBlog from "./pages/CreateBlog";
import EditCasino from "./pages/EditCasino";
import Subscriber from "./pages/Subscribers";
import UserLogs from "./pages/UserLogs";
import EditBlog from "./pages/EditBlog";
import CasinoDetail from "./pages/CasinoDetail";
import { useDispatch } from "react-redux";
import { setCountryCode } from "./redux/countrySlice";
import ThemePage from "./pages/ThemePage";
import SeoPage from "./pages/SEOPage";
import Login from "./pages/Login";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndCondition";
import CookiesPolicy from "./pages/CookiesPolicies";
import ResponsibleGambling from "./pages/ResponsibleGambling";

import { trackPageView } from "./utils/analytics";
function App() {
  const location = useLocation();
  const dispatch = useDispatch();

   useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (data?.country) {
          console.log("🌍 Country Code:", data.country);
          dispatch(setCountryCode(data.country)); // Save to Redux
        }
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    fetchUserCountry();
  }, []);

  // 2️⃣ Track page view
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <Routes>
     <Route path="/" element={<Home />} />
      <Route path="/casinos" element={<Casinos />} />
      <Route path="/bonuses" element={<Bonuses />} />
      <Route path="/games" element={<Games />} />
      <Route path="/about-us" element={<AboutUs />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/casinos-admin" element={<CasinosAdmin />} />
      <Route path="/blogs-admin" element={<BlogsAdmin />} />
      <Route path="/ThemePage" element={<ThemePage />} />
      <Route path="/seo-page" element={<SeoPage />} />
      <Route path="/settings-admin" element={<SettingsAdmin />} />
      <Route path="/create-casino" element={<CreateCasino />} />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/edit-casino/:id" element={<EditCasino />} />
      <Route path="/edit-blog/:id" element={<EditBlog />} />
      <Route path="/casino" element={<CasinoDetail />} />
      <Route path="/casinos/:slug" element={<CasinoDetail />} />
      <Route path="/Subscribers" element={<Subscriber />} />
      <Route path="/UserLogs" element={<UserLogs />} />

      {/* Filtered Casinos */}
      <Route path="/casinos/crypto" element={<Casinos type="crypto" />} />
      <Route path="/casinos/online" element={<Casinos type="online" />} />
      <Route path="/casinos/certified" element={<Casinos type="certified" />} />
      <Route path="/casinos/mobile" element={<Casinos type="mobile" />} />
      <Route path="/casinos/newest" element={<Casinos type="newest" />} />

      {/* Bonus Types */}
      <Route path="/bonuses/latest" element={<Bonuses type="latest" />} />
      <Route path="/bonuses/exclusive" element={<Bonuses type="exclusive" />} />
      <Route path="/bonuses/welcome" element={<Bonuses type="welcome" />} />
      <Route
        path="/bonuses/no-deposit"
        element={<Bonuses type="no-deposit" />}
      />
      <Route
        path="/bonuses/free-spins"
        element={<Bonuses type="freespins" />}
      />
      <Route path="/bonuses/cashback" element={<Bonuses type="cashback" />} />
      <Route
        path="/bonuses/no-wagering"
        element={<Bonuses type="no-wagering" />}
      />

      {/* Games Types */}
      <Route path="/games/casino" element={<Games type="casino" />} />
      <Route path="/games/table" element={<Games type="table" />} />
      <Route path="/games/card" element={<Games type="card" />} />
      <Route path="/games/dice" element={<Games type="dice" />} />
      {/* Slots Types */}
      <Route path="/slots/video" element={<Slots type="video" />} />
      <Route path="/slots/classic" element={<Slots type="classic" />} />
      <Route path="/slots/progressive" element={<Slots type="progressive" />} />
      <Route path="/slots/new" element={<Slots type="new" />} />

      // Betting Routes
      <Route path="/betting/sports" element={<Betting type="sports" />} />
      <Route path="/betting/new-sites" element={<Betting type="new-sites" />} />
      <Route path="/betting/types" element={<Betting type="types" />} />
      <Route path="/betting/bonuses" element={<Betting type="bonuses" />} />
      <Route path="/betting/free-bets" element={<Betting type="free-bets" />} />

      <Route
        path="/games/real-money-slots" element={<Games type="Real Money Online Slots" />} />
      <Route path="/games/poker" element={<Games type="poker" />} />
      <Route path="/games/bingo" element={<Games type="bingo" />} />
      <Route path="/games/lottery" element={<Games type="lottery" />} />

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/cookies-policy" element={<CookiesPolicy />} />
      <Route path="/responsible-gambling" element={<ResponsibleGambling />} />
    </Routes>
  );
}

export default App;
