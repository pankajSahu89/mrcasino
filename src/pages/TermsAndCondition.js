import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { COLORS } from "../constants/colors";

function TermsAndConditions() {
  useEffect(() => {
    document.body.style.backgroundColor = COLORS.black;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-20 mb-10 p-6" style={{ backgroundColor: COLORS.black, color: "white" }}>
        <h1 className="text-3xl font-bold mb-4 t"style={{color:COLORS.primary}}>Terms and Conditions</h1>
        <p className="mb-4">
          By using our website, you agree to these terms and conditions. Please read them carefully. These terms govern your access to and use of the Mr Gamblers platform, including all content, functionality, and services offered.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>1. User Responsibilities</h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your account information, including your username and password. You agree to notify us immediately of any unauthorized use of your account or breach of security.
        </p>
        <p className="mb-4">
          You also agree to provide accurate, current, and complete information as prompted by our registration forms and to update such information to maintain its accuracy.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>2. Prohibited Use</h2>
        <p className="mb-4">
          You may not use our services:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>For any unlawful purpose.</li>
          <li>To solicit others to perform or participate in any unlawful acts.</li>
          <li>To violate any international, federal, provincial, or state regulations or laws.</li>
          <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others.</li>
          <li>To submit false or misleading information.</li>
          <li>To upload or transmit viruses or any other type of malicious code.</li>
          <li>To collect or track the personal information of others.</li>
          <li>To spam, phish, pharm, pretext, spider, crawl, or scrape.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>3. Liability</h2>
        <p className="mb-4">
          We are not liable for any direct, indirect, incidental, punitive, or consequential damages arising from your use of our services. This includes, but is not limited to, loss of data, profits, or business interruption.
        </p>
        <p className="mb-4">
          Our services are provided on an “as-is” and “as-available” basis without warranties of any kind, either express or implied.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>4. Account Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users or us.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>5. Intellectual Property</h2>
        <p className="mb-4">
          All content on this site, including text, graphics, logos, images, audio clips, video, and software, is the property of Mr Gamblers or its content suppliers and is protected by copyright and trademark laws.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>6. Privacy</h2>
        <p className="mb-4">
          We value your privacy. Please review our Privacy Policy to understand our practices regarding your personal data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>7. Third-Party Services</h2>
        <p className="mb-4">
          Our platform may link to third-party services or display content that belongs to third parties. We do not control and are not responsible for these services or their content.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2"style={{color:COLORS.primary}}>8. Dispute Resolution</h2>
        <p className="mb-4">
          Any disputes arising out of these terms will be resolved through binding arbitration in accordance with the laws of the applicable jurisdiction. You waive the right to a trial by jury or to participate in a class action.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>9. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify or update these Terms at any time. Changes will be posted on this page, and your continued use of the site after changes are posted constitutes your acceptance of the updated Terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>10. Governing Law</h2>
        <p className="mb-4">
          These Terms are governed by and construed in accordance with the laws of [Insert Applicable Jurisdiction], without regard to its conflict of law provisions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 "style={{color:COLORS.primary}}>11. Contact Information</h2>
        <p className="mb-4">
          For any questions regarding these Terms, please contact us at: <a href="mailto:support@mrgambler.com" className="text-blue-400 underline">support@mrgambler.com</a>
        </p>

       
      </div>
      <Footer />
    </>
  );
}

export default TermsAndConditions;
