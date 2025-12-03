import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Disclaimer from '../assets/images/disclaimer.png';
import { COLORS } from "../constants/colors";

const AboutUs = () => {
   document.body.style.backgroundColor = COLORS.black;
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 py-24  text-white min-h-screen" style={{color:COLORS.primary,background:COLORS.black}}>
        <h1 className="text-4xl font-bold text-center mb-8 ">
          About MR Gamblers
        </h1>

        {/* About Section */}
        <section className="mb-12">
          <div className=" rounded-lg p-6 ">
            <h2 className="text-2xl font-semibold mb-4 ">
              Welcome to MR Gamblers
            </h2>
            <p className="mb-4 text-gray-300">
              At MR Gamblers, we're redefining online casino entertainment with
              cutting-edge gaming experiences. Established in 2020, we've become
              a trusted name in online gambling, offering premium casino games
              with fairness and transparency.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className=" p-4 rounded-lg"style={{background:COLORS.lightBlack}}>
                <h3 className="text-xl font-semibold mb-3 ">
                   Our Features
                </h3>
                <ul className="list-disc pl-5 text-gray-300">
                  <li>2000+ casino games including slots, poker, and live dealers</li>
                  <li>24/7 customer support</li>
                  <li>SSL encrypted transactions</li>
                  <li>Provably fair gaming system</li>
                  <li>Mobile-optimized platform</li>
                </ul>
              </div>

              <div className=" p-4 rounded-lg"style={{background:COLORS.lightBlack}}>
                <h3 className="text-xl font-semibold mb-3 ">
                   Our Commitment
                </h3>
                <p className="text-gray-300">
                  We prioritize responsible gaming through:
                </p>
                <ul className="list-disc pl-5 text-gray-300">
                  <li>Self-exclusion options</li>
                  <li>Deposit limits</li>
                  <li>Reality check reminders</li>
                  <li>Collaboration with gambling support organizations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="mb-12  pt-12">
          <h2 className="text-3xl font-bold mb-6 ">
            Privacy Policy
          </h2>
          <div className=" rounded-lg p-6 ">
            <p className="mb-4 text-gray-300">
              Your privacy is crucial to us. This policy outlines how we handle your information:
            </p>
            <div className="space-y-4">
              <div className=" p-4 rounded-lg"style={{background:COLORS.lightBlack}}>
                <h3 className="text-lg font-semibold mb-2 ">
                   Data Collection
                </h3>
                <p className="text-gray-300">
                  We collect necessary information for account creation, transactions,
                  and personalization. This includes contact details, payment information,
                  and gameplay history.
                </p>
              </div>

              <div className=" p-4 rounded-lg"style={{background:COLORS.lightBlack}}>
                <h3 className="text-lg font-semibold mb-2 ">
                   Data Usage
                </h3>
                <p className="text-gray-300">
                  Information is used to improve services, process transactions,
                  and ensure regulatory compliance. We never sell personal data
                  to third parties.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section className="mb-12  pt-12">
          <h2 className="text-3xl font-bold mb-6 ">
            Terms & Conditions
          </h2>
          <div className=" rounded-lg p-6 ">
            <div className="space-y-6">
              <div className=" p-4 rounded-lg" style={{background:COLORS.lightBlack}}>
                <h3 className="text-lg font-semibold mb-2 ">
                  1. Eligibility
                </h3>
                <p className="text-gray-300">
                  Users must be 18+ and comply with local gambling laws.
                  We reserve the right to verify age and location.
                </p>
              </div>

              <div className=" p-4 rounded-lg"style={{background:COLORS.lightBlack}}>
                <h3 className="text-lg font-semibold mb-2 ">
                  2. Account Responsibility
                </h3>
                <p className="text-gray-300">
                  Users are responsible for maintaining account security.
                  Immediately report unauthorized access.
                </p>
              </div>

              <div className=" p-4 rounded-lg"style={{background:COLORS.lightBlack}}>
                <h3 className="text-lg font-semibold mb-2 ">
                  3. Bonus Terms
                </h3>
                <p className="text-gray-300">
                  Bonuses subject to wagering requirements. See individual
                  promotion terms for details.
                </p>
              </div>
            </div>



          </div>
        </section>

        <section className="w-full  py-8 px-4" style={{background:COLORS.lightBlack}}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* Left side with background image */}
            <div
              className="w-full md:w-1/2 h-48 md:h-80 bg-no-repeat bg-contain bg-center"
              style={{ backgroundImage: `url(${Disclaimer})` }}
            ></div>

            {/* Right side text */}
            <div className="w-full md:w-1/2 text-white">
              <h2 className="text-xl sm:text-xl md:text-2xl font-bold mb-4">Disclaimer</h2>
              <p className="text-sm sm:text-base md:text-sm leading-relaxed">
                Online gambling involves financial risk and can be addictive. Mr. Gambler provides information for entertainment and educational purposes only and does not offer or facilitate real-money gambling. We strongly encourage all users to gamble responsibly and be aware of the laws and regulations in their respective jurisdictions before participating in any online gambling activities.
                <br /><br />
                If you feel that gambling is negatively impacting your life or the lives of those around you, we recommend seeking help from a professional organization. Gambling should be viewed as a form of entertainment—not a way to make money.
                <br /><br />
                Users must be 18 years of age or older, or the legal gambling age in their country, to access and use services related to online gambling.
              </p>
            </div>
          </div>
        </section>




      </div>
      <Footer />
    </>
  );
};

export default AboutUs;