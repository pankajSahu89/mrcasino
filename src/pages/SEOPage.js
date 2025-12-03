import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../components/Sidebar"; // Keeping the original Sidebar import

// Component to simulate a Google search result snippet
const SearchSnippetPreview = ({ title, description, url }) => {
  const titleLimit = 60;
  const descriptionLimit = 160;

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg text-black max-w-xl border border-gray-200">
      <p className="text-sm text-green-700 truncate mb-1">
        {url.replace(/(^\w+:|^)\/\//, '').split('/')[0]} 
        <span className="text-gray-500 ml-2">› {title.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ').slice(0, 3).join('-')}...</span>
      </p>
      <h3 className={`text-xl font-medium ${title.length > titleLimit ? 'text-red-700' : 'text-blue-800'}`}>
        {title.length > titleLimit ? title.substring(0, titleLimit) + '...' : title}
      </h3>
      <p className={`text-sm ${description.length > descriptionLimit ? 'text-red-700' : 'text-gray-700'}`}>
        {description.length > descriptionLimit ? description.substring(0, descriptionLimit) + '...' : description}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Title: {title.length}/{titleLimit} | Desc: {description.length}/{descriptionLimit}
      </p>
    </div>
  );
};

// Function to generate the JSON-LD Schema based on the selected type
const generateSchema = (schemaType, seo, faqs) => {
  const baseSchema = {
    "@context": "https://schema.org",
  };

  if (schemaType === "FAQPage") {
    return {
      ...baseSchema,
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    };
  }

  if (schemaType === "WebSite") {
    return {
      ...baseSchema,
      "@type": "WebSite",
      name: seo.title,
      url: seo.canonical,
      description: seo.description,
      // Add more specific WebSite properties if needed
    };
  }
  
  if (schemaType === "Review") {
      // Placeholder for a detailed Review schema
      return {
          ...baseSchema,
          "@type": "Review",
          itemReviewed: {
              "@type": "Organization",
              name: seo.author,
          },
          author: {
              "@type": "Person",
              name: "User Reviewer",
          },
          reviewRating: {
              "@type": "Rating",
              ratingValue: "4.5", // Example: allow user to input this
              bestRating: "5",
          },
          reviewBody: "Great casino experience with fast payouts and excellent customer support.",
      };
  }

  return null;
};


const SEOPageTool = () => {
  // Enhanced SEO state structure
  const [seo, setSeo] = useState({
    // 1. Core Meta Tags
    title: "Mr Casino - Online Casino Platform",
    description: "Play top casino games securely and win big rewards.",
    keywords: "casino, slots, poker, blackjack",
    canonical: "https://mrcasino.vercel.app",
    author: "Mr Casino Team",
    // 2. Robots/Indexing
    robotsIndex: "index", // "index" or "noindex"
    robotsFollow: "follow", // "follow" or "nofollow"
    // 3. Social Tags
    ogTitle: "Mr Casino - Online Casino Platform",
    ogDescription: "Play top casino games securely and win big rewards.",
    ogImage: "",
    twitterCard: "summary_large_image",
    twitterTitle: "Mr Casino",
    twitterDescription: "Best Online Casino Experience",
    // 4. Structured Data
    selectedSchema: "FAQPage",
    focusKeyword: "Mr Casino", // New focus keyword field
  });

  const [faqs, setFaqs] = useState([
    { question: "Is Mr Casino safe?", answer: "Yes, fully secure!" },
  ]);

  const [hreflangs, setHreflangs] = useState([
    { lang: "en-US", url: "https://mrcasino.vercel.app/en-us" },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeo({ ...seo, [name]: value });
  };
  
  // --- FAQ Handlers ---
  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };
  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));

  // --- Hreflang Handlers ---
  const handleHreflangChange = (index, field, value) => {
    const updatedHreflangs = [...hreflangs];
    updatedHreflangs[index][field] = value;
    setHreflangs(updatedHreflangs);
  };
  const addHreflang = () => setHreflangs([...hreflangs, { lang: "", url: "" }]);
  const removeHreflang = (index) => setHreflangs(hreflangs.filter((_, i) => i !== index));
  
  // --- Keyword Analysis ---
  const keywordAnalysis = (keyword, text) => {
    if (!keyword || !text) return false;
    // Simple check if the keyword is present in the text
    return text.toLowerCase().includes(keyword.toLowerCase());
  };
  
  const currentSchema = generateSchema(seo.selectedSchema, seo, faqs);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0f1115] text-white">
      <Sidebar />
      <div className="flex-1 p-6 md:p-10">
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords} />
          <link rel="canonical" href={seo.canonical} />
          <meta name="author" content={seo.author} />
          
          {/* Robots Tag Control */}
          <meta name="robots" content={`${seo.robotsIndex}, ${seo.robotsFollow}`} />

          {/* Hreflang Tags (International SEO) */}
          {hreflangs.map((h, index) => (
            <link 
              key={index}
              rel="alternate"
              href={h.url}
              hreflang={h.lang}
            />
          ))}

          {/* Open Graph Tags */}
          <meta property="og:title" content={seo.ogTitle} />
          <meta property="og:description" content={seo.ogDescription} />
          <meta property="og:image" content={seo.ogImage} />
          
          {/* Twitter Tags */}
          <meta name="twitter:card" content={seo.twitterCard} />
          <meta name="twitter:title" content={seo.twitterTitle} />
          <meta name="twitter:description" content={seo.twitterDescription} />
          <meta name="twitter:image" content={seo.ogImage} />

          {/* JSON-LD Schema */}
          {currentSchema && (
            <script type="application/ld+json">
              {JSON.stringify(currentSchema)}
            </script>
          )}
        </Helmet>

        <h1 className="text-3xl font-bold mb-6">SEO Management</h1>
        
        {/* SERP Preview & Keyword Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-purple-400"> SERP Preview</h2>
                <SearchSnippetPreview 
                    title={seo.title} 
                    description={seo.description} 
                    url={seo.canonical}
                />
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-red-400"> Keyword Analysis</h2>
                <input
                    type="text"
                    name="focusKeyword"
                    value={seo.focusKeyword}
                    onChange={handleChange}
                    placeholder="Enter Focus Keyword"
                    className="w-full p-3 rounded-lg bg-[#1a1d23] border border-white/10 mb-4"
                />
                <div className="space-y-2 p-3 bg-[#1a1d23] rounded-lg border border-white/10">
                    <p className={`text-sm ${keywordAnalysis(seo.focusKeyword, seo.title) ? 'text-green-400' : 'text-yellow-400'}`}>
                        {keywordAnalysis(seo.focusKeyword, seo.title) ? '✅' : '⚠️'} Title
                    </p>
                    <p className={`text-sm ${keywordAnalysis(seo.focusKeyword, seo.description) ? 'text-green-400' : 'text-yellow-400'}`}>
                        {keywordAnalysis(seo.focusKeyword, seo.description) ? '✅' : '⚠️'} Description
                    </p>
                    <p className={`text-sm ${keywordAnalysis(seo.focusKeyword, seo.ogTitle) ? 'text-green-400' : 'text-yellow-400'}`}>
                        {keywordAnalysis(seo.focusKeyword, seo.ogTitle) ? '✅' : '⚠️'} OG Title
                    </p>
                </div>
            </div>
        </div>
        
        <hr className="my-8 border-gray-700" />

        {/* Core Meta & Social Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-2 text-cyan-400">Core Meta Tags</h2>
            {/* Title Input with Character Counter */}
            <div className="relative">
              <input
                type="text"
                name="title"
                value={seo.title}
                onChange={handleChange}
                placeholder="Page Title (50-60 chars)"
                className="w-full p-3 rounded-lg bg-[#1a1d23] border border-white/10"
              />
              <span className={`absolute top-0 right-2 text-xs p-1 ${seo.title.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>{seo.title.length}</span>
            </div>
            
            {/* Description Input with Character Counter */}
            <div className="relative">
              <textarea
                name="description"
                value={seo.description}
                onChange={handleChange}
                placeholder="Meta Description (150-160 chars)"
                className="w-full p-3 rounded-lg bg-[#1a1d23] border border-white/10 h-24 resize-none"
              />
              <span className={`absolute bottom-2 right-2 text-xs p-1 ${seo.description.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>{seo.description.length}</span>
            </div>
            
            <input
              type="text"
              name="keywords"
              value={seo.keywords}
              onChange={handleChange}
              placeholder="Keywords (comma separated)"
              className="w-full p-3 rounded-lg bg-[#1a1d23] border border-white/10"
            />
            <input
              type="url"
              name="canonical"
              value={seo.canonical}
              onChange={handleChange}
              placeholder="Canonical URL"
              className="w-full p-3 rounded-lg bg-[#1a1d23] border border-white/10"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-2 text-blue-400">Social Sharing (OG & Twitter)</h2>
            <input
              type="text"
              name="ogTitle"
              value={seo.ogTitle}
              onChange={handleChange}
              placeholder="OG Title"
              className="w-full p-3 rounded-lg bg-[#1a1d23] border border-white/10"
            />
            <input
              type="url"
              name="ogImage"
              value={seo.ogImage}
              onChange={handleChange}
              placeholder="OG Image URL (Thumbnail URL)"
              className="w-full p-3 rounded-lg bg-[#1a1d23] border border-white/10"
            />
            <select
              name="twitterCard"
              value={seo.twitterCard}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1a1d23] border border-white/10 appearance-none"
            >
                <option value="summary">Twitter Summary Card</option>
                <option value="summary_large_image">Twitter Summary Card with Large Image</option>
            </select>
            {/* ... other OG/Twitter inputs simplified for brevity ... */}
          </div>
        </div>
        
        <hr className="my-8 border-gray-700" />

        {/* Advanced SEO: Robots, Schema, Hreflang */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Robots Control */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-orange-400"> Robots & Indexing</h2>
                <label className="block text-sm font-medium">Index Status:</label>
                <select
                    name="robotsIndex"
                    value={seo.robotsIndex}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#1a1d23] border border-white/10 appearance-none"
                >
                    <option value="index">Index (Allow crawling)</option>
                    <option value="noindex">Noindex (Block crawling)</option>
                </select>
                <label className="block text-sm font-medium">Link Follow Status:</label>
                <select
                    name="robotsFollow"
                    value={seo.robotsFollow}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#1a1d23] border border-white/10 appearance-none"
                >
                    <option value="follow">Follow</option>
                    <option value="nofollow">Nofollow</option>
                </select>
            </div>
            
            {/* Structured Data Selector */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-yellow-400">Structured Data (JSON-LD)</h2>
                <label className="block text-sm font-medium">Select Schema Type:</label>
                <select
                    name="selectedSchema"
                    value={seo.selectedSchema}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#1a1d23] border border-white/10 appearance-none"
                >
                    <option value="WebSite">WebSite</option>
                    <option value="FAQPage">FAQPage</option>
                    <option value="Review">Review (Example)</option>
                    <option value="">None</option>
                </select>
                <textarea
                    value={currentSchema ? JSON.stringify(currentSchema, null, 2) : "Select a schema type to generate JSON-LD."}
                    readOnly
                    className="w-full p-3 rounded-lg bg-[#1a1d23] border border-white/10 h-32 text-xs font-mono resize-none"
                    placeholder="JSON-LD Output"
                />
            </div>

            {/* Hreflang Manager */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-green-400"> Hreflang Manager</h2>
                <p className="text-xs text-gray-400">Language tag (e.g., en-US, es-ES, x-default)</p>
                {hreflangs.map((h, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                        <input
                            type="text"
                            value={h.lang}
                            onChange={(e) => handleHreflangChange(idx, "lang", e.target.value)}
                            placeholder="Lang (e.g., en-US)"
                            className="w-1/3 p-2 rounded-lg bg-[#1a1d23] border border-white/10 text-sm"
                        />
                        <input
                            type="url"
                            value={h.url}
                            onChange={(e) => handleHreflangChange(idx, "url", e.target.value)}
                            placeholder="Full URL"
                            className="flex-1 p-2 rounded-lg bg-[#1a1d23] border border-white/10 text-sm"
                        />
                        <button
                            onClick={() => removeHreflang(idx)}
                            className="p-2 text-xs bg-red-600 rounded-lg flex-shrink-0"
                        >
                            X
                        </button>
                    </div>
                ))}
                <button
                    onClick={addHreflang}
                    className="px-4 py-2 bg-green-600 rounded-lg text-sm"
                >
                    + Add Hreflang
                </button>
            </div>
        </div>
        
        <hr className="my-8 border-gray-700" />
        
        {/* FAQ Section (Moved to the bottom) */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400"> FAQ Schema Manager</h2>
          <p className="mb-4 text-sm text-gray-400">Manage FAQs for rich results. Active only if Schema Type is set to FAQPage.</p>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row gap-4 mb-4 items-start p-4 border border-gray-700 rounded-lg"
            >
              <input
                type="text"
                value={faq.question}
                onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                placeholder="Question"
                className="flex-1 p-3 rounded-lg bg-[#1a1d23] border border-white/10"
              />
              <input
                type="text"
                value={faq.answer}
                onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                placeholder="Answer"
                className="flex-1 p-3 rounded-lg bg-[#1a1d23] border border-white/10"
              />
              <button
                onClick={() => removeFaq(idx)}
                className="px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex-shrink-0"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addFaq}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-medium mt-4"
          >
            ➕ Add FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default SEOPageTool;