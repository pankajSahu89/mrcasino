import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCasino } from "../api/casinos.js";
import { uploadImage } from "../api/upload";
import Sidebar from "../components/Sidebar";
import { Editor } from "@tinymce/tinymce-react";
import { COLORS } from "../constants/colors.js";

// List of all available tags
const ALL_TAGS = [
  // Casino Types
  "Crypto Casino",
  "Online Casino",
  "Certified Casino",
  "Mobile Casino",
  "Newest Casino",
  // Bonuses
  "Latest Bonus",
  "Exclusive Bonus",
  "Welcome Bonus",
  "No Deposit",
  "Free Spins Bonus",
  "Cashback Bonus",
  "No Wagering Bonus",
  // Games
  "Casino Games",
  "Table Games",
  "Card Games",
  "Dice Games",
  "Real Money Online Slots",
  "Poker",
  "Bingo",
  "Lottery Games",
  // Slots
  "Video Slots",
  "Classic Slots",
  "Progressive Slots",
  "New Slots",
  // Betting
  "Sports Betting",
  "New Betting Sites",
  "Bet Types",
  "Betting Bonuses",
  "Free Bets",
];

// List of all available countries
const ALL_COUNTRIES = [
  // North America
  "Canada",
  "United States",
  // Oceania
  "Australia",
  "New Zealand",
  // Europe
  "Austria",
  "Finland",
  "Germany",
  "Ireland",
  "Netherlands",
  "Norway",
  "Sweden",
  "Switzerland",
  "United Kingdom (UK)",
  "European Countries (General)",
  // Asia
  "India",
  // Other/International
  "International",
];

// // TinyMCE editor configuration
// const editorConfig = {
//   height: 500,
//   menubar: true,
//   plugins: "lists link image paste help wordcount",
//   toolbar:
//     "undo redo | formatselect | bold italic | \
//             alignleft aligncenter alignright | \
//             bullist numlist outdent indent | help",
// };
// TinyMCE editor configuration


const CreateCasino = () => {
  const [casino, setCasino] = useState({
    name: "",
    logo: "",
    rating: 0,
    depositBonus: "",
    welcomeBonus: "",
    order: 0,
    tags: [],
    pros: [],        
  cons: [],         
    availableCountries: [],
    hotCasino: false,
    recommendedByExperts: false,
    certifiedCasino: false,
    generalInfo: {
      website: "",
      languages: "",
      established: "",
      licences: "",
      affiliateProgram: "",
      companyName: "",
      casinoType: [],
      features: [],
    },
    characteristics: {
      casinoType: "",
      features: "",
    },
    paymentInfo: {
      minimumDeposit: 0,
      withdrawalMethods: "",
      withdrawalTime: "",
      fees: "",
    },
    editorView: "",
    generalDescription: "",
    paymentDescription: "",
    customerSupportDescription: "",
    responsibleGamblingDescription: "",
    visits: 0,
    games: {
      slots: false,
      liveCasino: false,
      sportsBetting: false,
    },
    responsibleGaming: {
      tools: [],
      support: "",
    },
    overview: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newCasinoType, setNewCasinoType] = useState("");
  const [newTool, setNewTool] = useState("");
  const [newPro, setNewPro] = useState("");
const [newCon, setNewCon] = useState("");
  const navigate = useNavigate();
const handleAddPro = () => {
  if (!newPro.trim()) return;
  setCasino({ ...casino, pros: [...casino.pros, newPro.trim()] });
  setNewPro("");
};

const handleRemovePro = (index) => {
  const updated = casino.pros.filter((_, i) => i !== index);
  setCasino({ ...casino, pros: updated });
};

const handleAddCon = () => {
  if (!newCon.trim()) return;
  setCasino({ ...casino, cons: [...casino.cons, newCon.trim()] });
  setNewCon("");
};

const handleRemoveCon = (index) => {
  const updated = casino.cons.filter((_, i) => i !== index);
  setCasino({ ...casino, cons: updated });
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setCasino((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setCasino((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const editorConfig = {
    height: 500,
    menubar: true,
    plugins: [
      "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
      "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
      "insertdatetime", "media", "table", "code", "help", "wordcount"
    ],
    toolbar:
      "undo redo | styles | fontselect fontsizeselect | bold italic underline strikethrough | " +
      "forecolor backcolor | alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | removeformat | code | help",
    font_size_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 60pt 72pt",
    content_style: `
    body {
      font-family:Helvetica,Arial,sans-serif;
      font-size:14px;
    }
  `,
    convert_fonts_to_spans: true,
    style_formats_merge: true,
    forced_root_block: "div",
  };

  const handleEditorChange = (fieldName, content) => {
    setCasino((prev) => ({
      ...prev,
      [fieldName]: content,
    }));
  };

  const handleImageUpload = async (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];
      const { url } = await uploadImage(file);
      setCasino((prev) => ({ ...prev, logo: url }));
    } catch (err) {
      setError(err.message || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = (tag) => {
    if (!casino.tags.includes(tag)) {
      setCasino((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setCasino((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddCountry = (country) => {
    if (!casino.availableCountries.includes(country)) {
      setCasino((prev) => ({
        ...prev,
        availableCountries: [...prev.availableCountries, country],
      }));
    }
  };

  const handleRemoveCountry = (countryToRemove) => {
    setCasino((prev) => ({
      ...prev,
      availableCountries: prev.availableCountries.filter(
        (country) => country !== countryToRemove
      ),
    }));
  };

  const handleAddFeature = () => {
    const newFeatures = newFeature
      .split(",")
      .map((f) => f.trim())
      .filter(
        (f) => f && !casino.generalInfo.features.includes(f)
      );

    if (newFeatures.length > 0) {
      setCasino((prev) => ({
        ...prev,
        generalInfo: {
          ...prev.generalInfo,
          features: [...prev.generalInfo.features, ...newFeatures],
        },
      }));
      setNewFeature("");
    }
  };


  const handleRemoveFeature = (featureToRemove) => {
    setCasino((prev) => ({
      ...prev,
      generalInfo: {
        ...prev.generalInfo,
        features: prev.generalInfo.features.filter(
          (feature) => feature !== featureToRemove
        ),
      },
    }));
  };

  const handleAddCasinoType = () => {
    if (newCasinoType.trim()) {
      const newTypes = newCasinoType
        .split(',')
        .map(type => type.trim())
        .filter(type => type && !casino.generalInfo.casinoType.includes(type));

      if (newTypes.length > 0) {
        setCasino((prev) => ({
          ...prev,
          generalInfo: {
            ...prev.generalInfo,
            casinoType: [...prev.generalInfo.casinoType, ...newTypes],
          },
        }));
      }
      setNewCasinoType("");
    }
  };


  const handleRemoveCasinoType = (typeToRemove) => {
    setCasino((prev) => ({
      ...prev,
      generalInfo: {
        ...prev.generalInfo,
        casinoType: prev.generalInfo.casinoType.filter(
          (type) => type !== typeToRemove
        ),
      },
    }));
  };

  const handleAddTool = () => {
    const newTools = newTool
      .split(",")
      .map((t) => t.trim())
      .filter(
        (t) => t && !casino.responsibleGaming.tools.includes(t)
      );

    if (newTools.length > 0) {
      setCasino((prev) => ({
        ...prev,
        responsibleGaming: {
          ...prev.responsibleGaming,
          tools: [...prev.responsibleGaming.tools, ...newTools],
        },
      }));
      setNewTool("");
    }
  };


  const handleRemoveTool = (toolToRemove) => {
    setCasino((prev) => ({
      ...prev,
      responsibleGaming: {
        ...prev.responsibleGaming,
        tools: prev.responsibleGaming.tools.filter(
          (tool) => tool !== toolToRemove
        ),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createCasino(casino);
      navigate("/casinos-admin");
    } catch (err) {
      setError(err.message || "Failed to create casino");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#0f1115] min-h-screen text-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-white"> Create New Casino Profile</h1>
        {error && <div className="p-4 mb-6 bg-red-800 text-white rounded-lg border border-red-600 font-medium">{error}</div>}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-xl shadow-2xl space-y-8"
        >
          {/* Basic Info */}
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3 ">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Casino Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-3 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:ring-2"
                  value={casino.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 p-1 rounded-lg bg-gray-700 text-gray-400 cursor-pointer"
                />
                {casino.logo && (
                  <img src={casino.logo} alt="Logo Preview" className="h-16 w-16 object-contain mt-3 rounded-md border border-gray-600 p-1" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Rating (0-5)</label>
                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full p-3 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:ring-2"
                  value={casino.rating}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col justify-around">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="hotCasino"
                    checked={casino.hotCasino}
                    onChange={(e) =>
                      setCasino({ ...casino, hotCasino: e.target.checked })
                    }
                    className="h-5 w-5 text-red-500 bg-gray-700 border-gray-600 rounded focus:ring-red-400"
                  />
                  <label
                    htmlFor="hotCasino"
                    className="ml-3 block text-base text-gray-300 select-none"
                  >
                    Hot Casino
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="recommendedByExperts"
                    checked={casino.recommendedByExperts}
                    onChange={(e) =>
                      setCasino({
                        ...casino,
                        recommendedByExperts: e.target.checked,
                      })
                    }
                    className="h-5 w-5 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-400"
                  />
                  <label
                    htmlFor="recommendedByExperts"
                    className="ml-3 block text-base text-gray-300 select-none"
                  >
                    Recommended by Experts
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="certifiedCasino"
                    checked={casino.certifiedCasino}
                    onChange={(e) =>
                      setCasino({ ...casino, certifiedCasino: e.target.checked })
                    }
                    className="h-5 w-5 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                  />
                  <label
                    htmlFor="certifiedCasino"
                    className="ml-3 block text-base text-gray-300 select-none"
                  >
                    Certified Casino
                  </label>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-700" />

          {/* General Info */}
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3 ">General Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Website', name: 'generalInfo.website' },
                { label: 'Languages (comma-separated)', name: 'generalInfo.languages' },
                { label: 'Established (Year or Date)', name: 'generalInfo.established' },
                { label: 'Licences (comma-separated)', name: 'generalInfo.licences' },
                { label: 'Affiliate Program Name', name: 'generalInfo.affiliateProgram' },
                { label: 'Company Name', name: 'generalInfo.companyName' },
                { label: 'Affiliate Program Link', name: 'editorView' },
                { label: 'Visits (Number)', name: 'visits', type: 'number' },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1 text-gray-300">{label}</label>
                  <input
                    type={type || 'text'}
                    name={name}
                    className="w-full p-3 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:ring-2"
                    value={name.includes('.') ? casino[name.split('.')[0]][name.split('.')[1]] : casino[name]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            {/* Deposit Bonuses (Casino Type) */}
            <div className="mt-8">
              <label className="block text-sm font-medium mb-2 text-gray-300">Deposit Bonuses</label>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  value={newCasinoType}
                  onChange={(e) => setNewCasinoType(e.target.value)}
                  className="flex-1 p-3 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:ring-2"
                  placeholder="e.g., 100% Match, 50 Free Spins"
                />
                <button
                  type="button"
                  onClick={handleAddCasinoType}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 shadow-md"
                >
                  Add Bonus
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {casino.generalInfo.casinoType.map((type) => (
                  <div
                    key={type}
                    className="bg-emerald-500/20 text-emerald-300 px-4 py-1.5 rounded-full flex items-center font-medium text-sm border border-emerald-500/50"
                  >
                    <span>{type}</span>
                    <button
                      type="button"
                      className="ml-2 text-red-400 hover:text-red-300 font-bold text-lg"
                      onClick={() => handleRemoveCasinoType(type)}
                      aria-label={`Remove ${type}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-8">
              <label className="block text-sm font-medium mb-2 text-gray-300">Key Features</label>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 p-3 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:ring-2"
                  placeholder="e.g., 24/7 Live Chat, VIP Program"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 shadow-md"
                >
                  Add Feature
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {casino.generalInfo.features.map((feature) => (
                  <div
                    key={feature}
                    className="bg-blue-500/20  px-4 py-1.5 rounded-full flex items-center font-medium text-sm border border-blue-500/50"
                  >
                    <span>{feature}</span>
                    <button
                      type="button"
                      className="ml-2 text-red-400 hover:text-red-300 font-bold text-lg"
                      onClick={() => handleRemoveFeature(feature)}
                      aria-label={`Remove ${feature}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

        

          {/* Pros & Cons */}
          <section>
            <h3 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3">Pros & Cons</h3>

            {/* Pros */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 text-gray-300">Pros (Click add to append)</label>

              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  value={newPro}
                  onChange={(e) => setNewPro(e.target.value)}
                  className="flex-1 p-3 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:ring-2"
                  placeholder="e.g., Fast withdrawals"
                />
                <button
                  type="button"
                  onClick={handleAddPro}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 shadow-md"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {casino.pros.map((pro, index) => (
                  <div
                    key={index}
                    className="bg-green-500/20 text-green-300 px-4 py-1.5 rounded-full flex items-center font-medium text-sm border border-green-500/50"
                  >
                    <span>{pro}</span>
                    <button
                      type="button"
                      className="ml-2 text-red-400 hover:text-red-300 font-bold text-lg"
                      onClick={() => handleRemovePro(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cons */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 text-gray-300">Cons (Click add to append)</label>

              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  value={newCon}
                  onChange={(e) => setNewCon(e.target.value)}
                  className="flex-1 p-3 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:ring-2"
                  placeholder="e.g., Limited game providers"
                />
                <button
                  type="button"
                  onClick={handleAddCon}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 shadow-md"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {casino.cons.map((con, index) => (
                  <div
                    key={index}
                    className="bg-red-500/20 text-red-300 px-4 py-1.5 rounded-full flex items-center font-medium text-sm border border-red-500/50"
                  >
                    <span>{con}</span>
                    <button
                      type="button"
                      className="ml-2 text-red-400 hover:text-red-300 font-bold text-lg"
                      onClick={() => handleRemoveCon(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <hr className="border-gray-700" />

          {/* Payment Info */}
          <section>
            <h3 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3 ">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Minimum Deposit', name: 'paymentInfo.minimumDeposit' },
                { label: 'Deposit Methods (comma-separated)', name: 'paymentInfo.withdrawalMethods' },
                { label: 'Withdrawal Time', name: 'paymentInfo.withdrawalTime' },
                { label: 'Currencies (comma-separated)', name: 'paymentInfo.fees' },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1 text-gray-300">{label}</label>
                  <input
                    type="text"
                    name={name}
                    className="w-full p-3 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:ring-2"
                    value={casino.paymentInfo[name.split('.')[1]]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gray-700" />

          {/* Responsible Gaming */}
          <section>
            <h3 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3 ">Responsible Gaming</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Support Contact/Resources</label>
                <input
                  type="text"
                  name="responsibleGaming.support"
                  className="w-full p-3 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:ring-2"
                  value={casino.responsibleGaming.support}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Games / Tools</label>
                <div className="flex gap-4 mb-4">
                  <input
                    type="text"
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    className="flex-1 p-3 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:ring-2"
                    placeholder="e.g., Self-Exclusion, Reality Check"
                  />
                  <button
                    type="button"
                    onClick={handleAddTool}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 shadow-md"
                  >
                    Add Tool
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {casino.responsibleGaming.tools.map((tool) => (
                    <div
                      key={tool}
                      className="bg-purple-500/20 text-purple-300 px-4 py-1.5 rounded-full flex items-center font-medium text-sm border border-purple-500/50"
                    >
                      <span>{tool}</span>
                      <button
                        type="button"
                        className="ml-2 text-red-400 hover:text-red-300 font-bold text-lg"
                        onClick={() => handleRemoveTool(tool)}
                        aria-label={`Remove ${tool}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-700" />

          {/* Bonuses */}
          <section>
            <h3 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3 ">Bonus Offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Main Deposit Bonus (Short Text)</label>
                <input
                  type="text"
                  name="depositBonus"
                  className="w-full p-3 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:ring-2"
                  value={casino.depositBonus}
                  onChange={handleChange}
                  placeholder="e.g., Up to $500 + 200 Free Spins"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Welcome Bonus (Short Text)</label>
                <input
                  type="text"
                  name="welcomeBonus"
                  className="w-full p-3 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:ring-2"
                  value={casino.welcomeBonus}
                  onChange={handleChange}
                  placeholder="e.g., 100% Match up to $100"
                />
              </div>
            </div>
          </section>

          <hr className="border-gray-700" />

          {/* Overview */}
          <section>
            <h3 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3 ">Brief Overview</h3>
            <label className="block text-sm font-medium mb-1 text-gray-300">Short Summary for Listings</label>
            <textarea
              name="overview"
              className="w-full p-3 border-none rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:ring-2"
              rows="4"
              value={casino.overview}
              onChange={handleChange}
              placeholder="Enter a brief, compelling overview of the casino for search results and cards."
            ></textarea>
          </section>

          <hr className="border-gray-700" />

          {/* Rich Text Editor for Descriptions (Content) */}
          <section>
            <label className="block text-2xl font-bold mb-6 border-b border-gray-700 pb-3 ">Detailed Content Editor</label>
            <div className="bg-gray-700 rounded-lg p-2">
              <Editor
                apiKey="sgqonpylyxmnpot9w1fgdcaq8fh1l86kcoyb8we397c0ni4m"
                value={casino.content}
                init={{
                  skin: 'oxide-dark',
                  content_css: 'dark',
                }}
                onEditorChange={(content) => setCasino({ ...casino, content })}
              />
            </div>
          </section>

          <hr className="border-gray-700" />

          {/* Tags */}
          <section>
            <h3 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3 ">Casino Type/Tags</h3>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 text-gray-300">Available Tags (Click to Select)</label>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddTag(tag)}
                    className={`px-4 py-1.5 rounded-full font-medium text-sm ${casino.tags.includes(tag)
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    disabled={casino.tags.includes(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Selected Tags</label>
              {casino.tags.length === 0 ? (
                <p className="text-gray-500 italic">No tags selected. Click an available tag above.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {casino.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-purple-500 text-white px-4 py-1.5 rounded-full flex items-center font-medium text-sm shadow-md"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        className="ml-2 text-white/80 hover:text-white font-bold text-lg"
                        onClick={() => handleRemoveTag(tag)}
                        aria-label={`Remove selected tag ${tag}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <hr className="border-gray-700" />

          {/* Countries */}
          <section>
            <h3 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3 ">Available Countries</h3>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 text-gray-300">Select Available Countries (Click to Select)</label>
              <div className="flex flex-wrap gap-2">
                {ALL_COUNTRIES.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => handleAddCountry(country)}
                    className={`px-4 py-1.5 rounded-full font-medium text-sm ${casino.availableCountries.includes(country)
                        ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    disabled={casino.availableCountries.includes(country)}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Selected Countries</label>
              {casino.availableCountries.length === 0 ? (
                <p className="text-gray-500 italic">No countries selected. Click an available country above.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {casino.availableCountries.map((country) => (
                    <div
                      key={country}
                      className="bg-green-500 text-white px-4 py-1.5 rounded-full flex items-center font-medium text-sm shadow-md"
                    >
                      <span>{country}</span>
                      <button
                        type="button"
                        className="ml-2 text-white/80 hover:text-white font-bold text-lg"
                        onClick={() => handleRemoveCountry(country)}
                        aria-label={`Remove selected country ${country}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <hr className="border-gray-700" />

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-4 rounded-xl text-lg font-bold shadow-xl transition duration-300 ease-in-out ${loading
                ? "bg-blue-800 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-[1.005]"
              }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Casino...
              </div>
            ) : (
              "🚀 Create Casino Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};



export default CreateCasino;
