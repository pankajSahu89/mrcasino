import { useState } from "react";
import Sidebar from "../components/Sidebar";

const SettingsAdmin = () => {
  // State for Admin Account Settings
  const [adminEmail, setAdminEmail] = useState("admin@mrcasino.com");
  const [adminPassword, setAdminPassword] = useState(""); // Never pre-fill passwords
  const [mfaEnabled, setMfaEnabled] = useState(true);

  // State for Site Configuration
  const [siteName, setSiteName] = useState("Mr Casino Platform");
  const [logoUrl, setLogoUrl] = useState("https://mrcasino.com/logo.png");
  const [defaultTheme, setDefaultTheme] = useState("dark");

  // State for System Control
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = (section) => {
    // In a real application, you would send API calls here based on the section
    console.log(`Saving ${section} settings...`);
    alert(` ${section} Settings Saved!`);
  };

  const INPUT_CLASS = "w-full p-3 rounded-lg bg-[#1a1d23] border border-white/10 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-all";
  const BUTTON_CLASS = "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg";
  const CARD_CLASS = "bg-[#1a1d23] p-6 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm";

  return (
    <div className="flex min-h-screen bg-[#0f1115] text-white">
      <Sidebar />
      <div className="flex-1 p-6 md:p-10">
        <h2 className="text-3xl font-bold mb-6 "> Platform Administration Settings</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Section 1: Site Configuration */}
          <div className={`${CARD_CLASS} lg:col-span-2 space-y-6`}>
            <h3 className="text-2xl font-semibold border-b border-white/20 pb-3 text-cyan-400">Site Configuration</h3>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">Platform Name</label>
              <input
                type="text"
                className={INPUT_CLASS}
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="Enter Site Name"
              />
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">Logo URL (CDN Link)</label>
              <input
                type="url"
                className={INPUT_CLASS}
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://yourdomain.com/logo.png"
              />
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">Default Theme</label>
              <select
                className={INPUT_CLASS}
                value={defaultTheme}
                onChange={(e) => setDefaultTheme(e.target.value)}
              >
                <option value="dark" className="bg-[#1a1d23]">Dark Mode (Default)</option>
                <option value="light" className="bg-[#1a1d23]">Light Mode</option>
              </select>
            </div>
            
            <button onClick={() => handleSave("Site Configuration")} className={BUTTON_CLASS}>
              Save Site Config
            </button>
          </div>
          
          {/* Section 2: Admin Security & Account */}
          <div className={`${CARD_CLASS} space-y-6`}>
            <h3 className="text-2xl font-semibold border-b border-white/20 pb-3 text-red-400">Admin Account & Security</h3>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">Admin Email</label>
              <input
                type="email"
                className={INPUT_CLASS}
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">New Password</label>
              <input
                type="password"
                className={INPUT_CLASS}
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
              />
            </div>
            
            {/* Toggle Switch for MFA */}
            <div className="flex items-center justify-between p-2 bg-[#0f1115] rounded-lg border border-red-800/50">
              <span className="text-sm font-medium">Multi-Factor Auth (MFA)</span>
              <button
                onClick={() => setMfaEnabled(!mfaEnabled)}
                className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${mfaEnabled ? 'bg-green-600' : 'bg-gray-500'}`}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${mfaEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
            
            <button onClick={() => handleSave("Account & Security")} className={BUTTON_CLASS}>
              Save Security Changes
            </button>
          </div>
          
        </div>
        
        {/* Horizontal Line Separator */}
        <div className="my-8 border-t border-white/10" />

        {/* Section 3: System Control and Advanced */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`${CARD_CLASS} space-y-6`}>
                <h3 className="text-2xl font-semibold border-b border-white/20 pb-3 text-yellow-400">System Control</h3>

                {/* Toggle Switch for Caching */}
                <div className="flex items-center justify-between p-2 bg-[#0f1115] rounded-lg border border-yellow-800/50">
                    <div>
                        <span className="text-sm font-medium block">Enable Caching</span>
                        <p className="text-xs text-gray-400">Improves performance by storing static data.</p>
                    </div>
                    <button
                        onClick={() => setCacheEnabled(!cacheEnabled)}
                        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${cacheEnabled ? 'bg-green-600' : 'bg-red-600'}`}
                    >
                        <span
                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${cacheEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                    </button>
                </div>

                {/* Toggle Switch for Maintenance Mode */}
                <div className="flex items-center justify-between p-2 bg-[#0f1115] rounded-lg border border-red-800/50">
                    <div>
                        <span className="text-sm font-medium block">Maintenance Mode</span>
                        <p className="text-xs text-red-400">Locks out all non-admin users from the site.</p>
                    </div>
                    <button
                        onClick={() => setMaintenanceMode(!maintenanceMode)}
                        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${maintenanceMode ? 'bg-red-600' : 'bg-gray-500'}`}
                    >
                        <span
                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                    </button>
                </div>
                
                <button onClick={() => handleSave("System Control")} className={BUTTON_CLASS}>
                  Apply System Changes
                </button>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default SettingsAdmin;