import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faTelegram,

} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { COLORS } from "../constants/colors";
import Logo from "../assets/images/logo.png"
import LogoName from "../assets/images/logo_name.png"
const Footer = () => {
  return (
    <footer
      className="w-full text-white"
      style={{
        backgroundColor: COLORS.black,
        borderTop: `1px solid ${COLORS.primary}`,
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 py-14">

        {/* ---------- MAIN 2-COLUMN LAYOUT ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_3fr] gap-12">

          {/* ---------- LEFT COLUMN ---------- */}
          <div className="flex flex-col ">
            <div className="flex flex-ROW gap-4 mb-2">
              <img
                className="flex items-center justify-center w-fit"
                src={Logo}
                alt="Casino Trees"
                style={{
                  height: "100%",
                  maxHeight: "72px",
                  objectFit: "contain",
                }}
              />
              <img
                className="flex items-center justify-center mt-2 w-fit"
                src={LogoName}
                alt="Casino Trees"
                style={{
                  height: "100%",
                  maxHeight: "48px",
                  objectFit: "contain",
                }}
              />
            </div>
            <p className="text-gray-300 leading-6 max-w-[360px]">
              Your Gateway to the Best Online Casinos & Big Wins!
              <br />
              Compare top-rated casino platforms, claim exclusive bonuses, and
              start playing today!
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex space-x-4 mt-2">
              {[faFacebook, faInstagram, faYoutube].map((icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-[34px] h-[34px] rounded-full bg-white flex items-center justify-center"
                >
                  <FontAwesomeIcon
                    icon={icon}
                    style={{ color: COLORS.primary, fontSize: "18px" }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ---------- RIGHT SECTION WITH 3 COLUMNS ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            {/* About Us */}
            <div>
              <h3 className="font-semibold text-lg mb-5">About Us</h3>
              <ul className="space-y-3 text-gray-300">
                {["Casino", "Bonus", "Games", "Betting", "Slots", "Sitemap"].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0.04em",
                      verticalAlign: "middle",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-lg mb-5">Support</h3>
              <ul className="space-y-3 text-gray-300">
                {[
                  "Contact Us",
                  "Responsible Gambling",
                  "Whistleblowing Policy",
                  "Conflicts of Interest",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0.04em",
                      verticalAlign: "middle",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-5">Contact Us</h3>

              <p
                className="flex items-center gap-3 text-gray-300"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0.04em",
                  verticalAlign: "middle",
                }}
              >
                <FontAwesomeIcon icon={faEnvelope} />
                support@casinotrees.com
              </p>
              <p
                className="flex items-center gap-3 text-gray-300 mt-3"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0.04em",
                  verticalAlign: "middle",
                }}
              >
                <FontAwesomeIcon icon={faTelegram} />
                @casinotrees_support
              </p>
              <p
                className="flex items-center gap-3 text-gray-300 mt-3"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0.04em",
                  verticalAlign: "middle",
                }}
              >
                <FontAwesomeIcon icon={faUsers} />
                casinotrees@teams.com
              </p>

              <p
                className="flex items-center gap-3 text-gray-300 mt-3"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0.04em",
                  verticalAlign: "middle",
                }}
              >
                <FontAwesomeIcon icon={faPhone} />
                +44 7537 105417
              </p>
            </div>

          </div>

        </div>

        {/* ---------- BOTTOM SECTION ---------- */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between text-gray-400 text-sm">
          <p className="font-poppins font-normal text-[14px] leading-none">
            © 2025 Casino Trees. All rights reserved. Gambling can be addictive
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              to="/terms-and-conditions"
              className=" font-normal text-[14px] leading-none hover:text-white"
            >
              Terms of Service
            </Link>

            <Link
              to="/privacy-policy"
              className="font-poppins font-normal text-[14px] leading-none hover:text-white"
            >
              Privacy Policy
            </Link>

          </div>
        </div>

      </div>
    </footer>

  );
};

export default Footer;
