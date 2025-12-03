import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { COLORS } from "../constants/colors";

function PrivacyPolicy() {
  useEffect(() => {
    document.body.style.backgroundColor = COLORS.black;
    return () => {
      document.body.style.backgroundColor = ""; // Reset on unmount
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-20 mb-10 p-6" style={{ color: "white",backgroundColor: COLORS.black}}>
        <h1 className="text-3xl font-bold mb-4" style={{color:COLORS.primary}}>Privacy Policy</h1>
        <p className="mb-4">
          At Mr Gamblers, we are committed to respecting your privacy and protecting your personal information. This Privacy Policy explains how we collect, store, use, and disclose your personal data when you interact with our website and services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>1. Information We Collect</h2>
        <p className="mb-4">We may collect personal information such as:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Name, email, phone number</li>
          <li>Age, gender, location</li>
          <li>Usage and browsing behavior</li>
          <li>Device and browser information</li>
        </ul>

        <p className="mb-4">
          We may also collect data from third-party tools and services like Google Analytics or affiliate programs.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>2. How We Use Your Information</h2>
        <p className="mb-4">We use your data to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Improve your user experience</li>
          <li>Send newsletters and promotional messages</li>
          <li>Track website analytics and behavior</li>
          <li>Ensure legal and security compliance</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>3. Cookies and Tracking Technologies</h2>
        <p className="mb-4">
          Cookies and tracking scripts help us understand user interactions and preferences. You may disable cookies through your browser settings.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>4. Third-Party Links</h2>
        <p className="mb-4">
          Our website may contain links to third-party services or casinos. We are not responsible for their privacy practices.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2"style={{color:COLORS.primary}}>5. Data Sharing and Disclosure</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>With service providers under strict contracts</li>
          <li>With authorities if required by law</li>
          <li>With partners, only with your consent</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>6. Data Security</h2>
        <p className="mb-4">
          We implement reasonable security measures to protect your personal information from unauthorized access and misuse.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>7. Your Rights</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Right to access and update your data</li>
          <li>Right to delete or restrict your data</li>
          <li>Right to object to marketing communications</li>
          <li>Right to withdraw consent at any time</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>8. Children’s Privacy</h2>
        <p className="mb-4">
          Our services are not intended for users under 18. We do not knowingly collect data from minors.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>9. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          This policy may be updated occasionally. Users will be notified via our website or email when changes occur.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>10. Contact Us</h2>
        <p className="mb-4">
          For any questions, please contact us:
        </p>
        <p>Email: <a href="mailto:support@mrgambler.com" className="text-blue-400 underline">support@mrgambler.com</a></p>

        
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
