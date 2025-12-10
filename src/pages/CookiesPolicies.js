import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CookiesPolicy() {
  useEffect(() => {
    document.body.style.backgroundColor = "#1e1e1e";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 mt-20 mb-10 text-white" style={{ backgroundColor: "#1d1d1d" }}>
        <h1 className="text-3xl font-bold mb-4 text-red-600">Cookies Policy</h1>
        <p className="mb-4">
          This Cookies Policy explains how Casino Trees uses cookies and similar technologies to recognize you when you visit our websites. It explains what these technologies are, why we use them, and your rights to control our use of them.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">1. What Are Cookies?</h2>
        <p className="mb-4">
          Cookies are small data files placed on your device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </p>
        <p className="mb-4">
          Cookies set by the website owner (in this case, Casino Trees) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies".
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">2. Why We Use Cookies</h2>
        <p className="mb-4">
          We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies.
        </p>
        <p className="mb-4">
          Other cookies enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our websites for advertising, analytics, and other purposes.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">3. Types of Cookies We Use</h2>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off.</li>
          <li><strong>Performance Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve site performance.</li>
          <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website.</li>
          <li><strong>Targeting Cookies:</strong> These cookies record your visit to our website, the pages you have visited, and the links you have followed.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">4. Third-Party Cookies</h2>
        <p className="mb-4">
          In some special cases we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Google Analytics to help us understand how you use the site and ways we can improve your experience.</li>
          <li>Social media buttons and/or plugins that allow you to connect with your social network in various ways.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">5. Managing Cookies</h2>
        <p className="mb-4">
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting or amending your web browser controls to accept or refuse cookies.
        </p>
        <p className="mb-4">
          Please note that if you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">6. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Cookies Policy from time to time to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons.
        </p>
        <p className="mb-4">
          Please therefore re-visit this Cookies Policy regularly to stay informed about our use of cookies and related technologies.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">7. Where You Can Get More Information</h2>
        <p className="mb-4">
          If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:support@casinotree.com" className="text-blue-400 underline">support@casinotree.com</a>.
        </p>

        
      </div>
      <Footer />
    </>
  );
}

export default CookiesPolicy;
