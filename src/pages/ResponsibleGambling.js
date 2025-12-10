import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ResponsibleGambling() {
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
        <h1 className="text-3xl font-bold mb-4 text-red-600">Responsible Gambling</h1>
        <p className="mb-4">
          At Casino Trees, we are committed to promoting responsible gambling. Gambling should be a source of entertainment and not a means to earn money. We strive to create a safe and enjoyable environment for our users.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">1. Know Your Limits</h2>
        <p className="mb-4">
          Responsible gambling starts with knowing your limits. Set time and budget constraints before you begin gambling. Never gamble more than you can afford to lose.
        </p>
        <p className="mb-4">
          It's important to take regular breaks and keep track of the time spent playing. Monitoring your emotions is also vital—don’t gamble when you're upset or under the influence.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">2. Self-Assessment Tools</h2>
        <p className="mb-4">
          We offer a self-assessment test to help you understand your gambling behavior. This simple questionnaire can help identify signs of problem gambling.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">3. Deposit and Loss Limits</h2>
        <p className="mb-4">
          Users can set daily, weekly, or monthly deposit limits to help control their spending. Loss limits are also available to restrict the amount of money you can lose within a given timeframe.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">4. Time Limits and Session Reminders</h2>
        <p className="mb-4">
          Set time-based reminders to help manage the duration of your gambling sessions. These reminders help you stay in control and take necessary breaks.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">5. Self-Exclusion Options</h2>
        <p className="mb-4">
          If you feel your gambling is becoming a problem, you can request a temporary or permanent exclusion from our platform. During this time, your account will be inaccessible and you won't receive promotional material.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">6. Support Resources</h2>
        <p className="mb-4">
          If you or someone you know is experiencing gambling-related harm, reach out to professional support services such as:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">BeGambleAware</a></li>
          <li><a href="https://www.gamcare.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">GamCare</a></li>
          <li><a href="https://www.gamblingtherapy.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Gambling Therapy</a></li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">7. Underage Gambling</h2>
        <p className="mb-4">
          We have strict policies in place to prevent underage gambling. Our platform is intended only for users aged 18 and above. We use age verification systems and encourage parents to use parental controls.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">8. Parental Controls</h2>
        <p className="mb-4">
          Parents should install internet filtering tools like Net Nanny or CyberPatrol to prevent minors from accessing gambling websites.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">9. Recognizing Problem Gambling</h2>
        <p className="mb-4">
          Common signs of problem gambling include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Spending more money or time gambling than intended</li>
          <li>Chasing losses or borrowing money to gamble</li>
          <li>Neglecting work, school, or family responsibilities</li>
          <li>Feeling anxious or depressed because of gambling</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-red-600">10. Getting Help</h2>
        <p className="mb-4">
          Don’t hesitate to seek help if you notice any signs of gambling addiction. Talking to a trusted friend, family member, or professional can make a big difference.
        </p>

       

        <p className="mt-10">
          We are here to support your journey toward safe and responsible play. Enjoy the games, but always remember to play responsibly.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default ResponsibleGambling;
