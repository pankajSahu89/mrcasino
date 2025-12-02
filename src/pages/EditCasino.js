import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCasinoById, updateCasino, getAllCasinos } from "../api/casinos";
import { uploadImage } from "../api/upload";
import Sidebar from "../components/Sidebar";
import { Editor } from "@tinymce/tinymce-react";

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
  // Other/Global
  "Global",
];

const EditCasino = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [casino, setCasino] = useState({
    name: "",
    logo: "",
    rating: 0,
    depositBonus: "",
    welcomeBonus: "",
    order: 0,
    tags: [],
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [maxOrder, setMaxOrder] = useState(0);
  const [newFeature, setNewFeature] = useState("");
  const [newCasinoType, setNewCasinoType] = useState("");
  const [newTool, setNewTool] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current casino
        const casinoData = await getCasinoById(id);
        setCasino(casinoData);

        // Fetch all casinos to determine max order
        const allCasinos = await getAllCasinos();
        const currentMax = Math.max(...allCasinos.map((c) => c.order), 0);
        setMaxOrder(currentMax);
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "order") {
      // Validate order input
      const numValue = parseInt(value);
      if (numValue < 1) return; // Minimum order is 1
      if (numValue > maxOrder + 1) return; // Maximum is current max + 1
    }

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

  // TinyMCE editor configuration
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
    forced_root_block: "div", // Use <div> instead of <p>
  };


  const handleEditorChange = (content) => {
    setCasino((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateCasino(id, casino);
      navigate("/casinos-admin");
    } catch (err) {
      setError(err.message || "Failed to update casino");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !casino.name) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="text-center">Loading casino data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Edit Casino</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {/* Basic Info */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Casino Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded"
                  value={casino.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded"
                />
                {casino.logo && (
                  <img src={casino.logo} alt="Preview" className="h-20 mt-2" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full p-2 border rounded"
                  value={casino.rating}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium mb-1">Order</label>
                <input
                  type="number"
                  name="order"
                  min="1"
                  max={maxOrder + 1}
                  className="w-full p-2 border rounded"
                  value={casino.order}
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Current order range: 1 - {maxOrder + 1}
                </p>
              </div> */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hotCasino"
                  checked={casino.hotCasino}
                  onChange={(e) =>
                    setCasino({ ...casino, hotCasino: e.target.checked })
                  }
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="hotCasino"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Hot Casino
                </label>
              </div>

              <div className="flex items-center">
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
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="recommendedByExperts"
                  className="ml-2 block text-sm text-gray-700"
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
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="certifiedCasino"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Certified Casino
                </label>
              </div>
            </div>
          </div>

          {/* General Info */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Website
                </label>
                <input
                  type="text"
                  name="generalInfo.website"
                  className="w-full p-2 border rounded"
                  value={casino.generalInfo.website}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Languages
                </label>
                <input
                  type="text"
                  name="generalInfo.languages"
                  className="w-full p-2 border rounded"
                  value={casino.generalInfo.languages}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Established
                </label>
                <input
                  type="text"
                  name="generalInfo.established"
                  className="w-full p-2 border rounded"
                  value={casino.generalInfo.established}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Licences
                </label>
                <input
                  type="text"
                  name="generalInfo.licences"
                  className="w-full p-2 border rounded"
                  value={casino.generalInfo.licences}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Affiliate Program
                </label>
                <input
                  type="text"
                  name="generalInfo.affiliateProgram"
                  className="w-full p-2 border rounded"
                  value={casino.generalInfo.affiliateProgram}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="generalInfo.companyName"
                  className="w-full p-2 border rounded"
                  value={casino.generalInfo.companyName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Affiliate Program Link
                </label>
                <input
                  type="text"
                  name="editorView"
                  className="w-full p-2 border rounded"
                  value={casino.editorView}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Visits</label>
                <input
                  type="number"
                  name="visits"
                  className="w-full p-2 border rounded"
                  value={casino.visits}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Casino Type */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Deposit Bonuses
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newCasinoType}
                  onChange={(e) => setNewCasinoType(e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder="Add Deposit Bonuses"
                />
                <button
                  type="button"
                  onClick={handleAddCasinoType}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {casino.generalInfo.casinoType.map((type) => (
                  <div
                    key={type}
                    className="bg-blue-100 px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{type}</span>
                    <button
                      type="button"
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveCasinoType(type)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Features</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder="Add feature"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {casino.generalInfo.features.map((feature) => (
                  <div
                    key={feature}
                    className="bg-blue-100 px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{feature}</span>
                    <button
                      type="button"
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveFeature(feature)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Minimum Deposit
                </label>
                <input
                  type="text"
                  name="paymentInfo.minimumDeposit"
                  className="w-full p-2 border rounded"
                  value={casino.paymentInfo.minimumDeposit}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                   Deposit Methods
                </label>
                <input
                  type="text"
                  name="paymentInfo.withdrawalMethods"
                  className="w-full p-2 border rounded"
                  value={casino.paymentInfo.withdrawalMethods}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Withdrawal Time
                </label>
                <input
                  type="text"
                  name="paymentInfo.withdrawalTime"
                  className="w-full p-2 border rounded"
                  value={casino.paymentInfo.withdrawalTime}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Currencies</label>
                <input
                  type="text"
                  name="paymentInfo.fees"
                  className="w-full p-2 border rounded"
                  value={casino.paymentInfo.fees}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Games Section */}
          {/* <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Games</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="slots"
                  checked={casino.games.slots}
                  onChange={(e) =>
                    setCasino({
                      ...casino,
                      games: { ...casino.games, slots: e.target.checked },
                    })
                  }
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="slots"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Slots Available
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="liveCasino"
                  checked={casino.games.liveCasino}
                  onChange={(e) =>
                    setCasino({
                      ...casino,
                      games: { ...casino.games, liveCasino: e.target.checked },
                    })
                  }
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="liveCasino"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Live Casino
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sportsBetting"
                  checked={casino.games.sportsBetting}
                  onChange={(e) =>
                    setCasino({
                      ...casino,
                      games: {
                        ...casino.games,
                        sportsBetting: e.target.checked,
                      },
                    })
                  }
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="sportsBetting"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Sports Betting
                </label>
              </div>
            </div>
          </div> */}

          {/* Responsible Gaming */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Responsible Gaming</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Support
                </label>
                <input
                  type="text"
                  name="responsibleGaming.support"
                  className="w-full p-2 border rounded"
                  value={casino.responsibleGaming.support}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Games</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="Add game"
                  />
                  <button
                    type="button"
                    onClick={handleAddTool}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {casino.responsibleGaming.tools.map((tool) => (
                    <div
                      key={tool}
                      className="bg-blue-100 px-3 py-1 rounded-full flex items-center"
                    >
                      <span>{tool}</span>
                      <button
                        type="button"
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveTool(tool)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Rich Text Editor for Descriptions */}

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Editor View</h3>
            <Editor
              apiKey="sgqonpylyxmnpot9w1fgdcaq8fh1l86kcoyb8we397c0ni4m"
              value={casino.content}
              init={editorConfig}
              onEditorChange={(content) => setCasino({ ...casino, content })}
            />
          </div>

          {/* Overview */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Overview</h3>
            <textarea
              name="overview"
              className="w-full p-2 border rounded"
              rows="4"
              value={casino.overview}
              onChange={handleChange}
              placeholder="Enter a brief overview of the casino"
            ></textarea>
          </div>

          {/* Bonuses */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Bonuses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Deposit Bonus
                </label>
                <input
                  type="text"
                  name="depositBonus"
                  className="w-full p-2 border rounded"
                  value={casino.depositBonus}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Welcome Bonus
                </label>
                <input
                  type="text"
                  name="welcomeBonus"
                  className="w-full p-2 border rounded"
                  value={casino.welcomeBonus}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Casino Type</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Available Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {ALL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm ${casino.tags.includes(tag)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    disabled={casino.tags.includes(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Selected Tags
              </label>
              {casino.tags.length === 0 ? (
                <p className="text-gray-500">No tags selected</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {casino.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-blue-100 px-3 py-1 rounded-full flex items-center"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Countries */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Available Countries</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Available Countries
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {ALL_COUNTRIES.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => handleAddCountry(country)}
                    className={`px-3 py-1 rounded-full text-sm ${casino.availableCountries.includes(country)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    disabled={casino.availableCountries.includes(country)}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Selected Countries
              </label>
              {casino.availableCountries.length === 0 ? (
                <p className="text-gray-500">No countries selected</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {casino.availableCountries.map((country) => (
                    <div
                      key={country}
                      className="bg-blue-100 px-3 py-1 rounded-full flex items-center"
                    >
                      <span>{country}</span>
                      <button
                        type="button"
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveCountry(country)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Casino"}
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              onClick={() => navigate("/casinos-admin")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCasino;
