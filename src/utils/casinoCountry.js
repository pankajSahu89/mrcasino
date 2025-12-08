
const COUNTRY_CODE_TO_NAME = {
  IN: "India",
  CA: "Canada",
  US: "United States",
  AU: "Australia",
  NZ: "New Zealand",
  AT: "Austria",
  FI: "Finland",
  DE: "Germany",
  IE: "Ireland",
  NL: "Netherlands",
  NO: "Norway",
  SE: "Sweden",
  CH: "Switzerland",
  GB: "United Kingdom (UK)",
};

const NAME_TO_CODE = Object.entries(COUNTRY_CODE_TO_NAME).reduce(
  (acc, [code, name]) => {
    acc[name.toLowerCase()] = code;
    return acc;
  },
  {}
);

const EU_CODES = new Set([
  "AT",
  "FI",
  "DE", 
  "IE", 
  "NL",
  "SE", 
]);

const normaliseCode = (code) =>
  typeof code === "string" ? code.trim().toUpperCase() : "";

export const getCountryNameFromCode = (code) =>
  COUNTRY_CODE_TO_NAME[normaliseCode(code)] || null;

const isEuropeanCountry = (code) => EU_CODES.has(normaliseCode(code));

export const filterCasinosByCountry = (casinos, countryCode) => {
  if (!Array.isArray(casinos)) return [];

  const countryName = getCountryNameFromCode(countryCode);
  const countryIsInEU = isEuropeanCountry(countryCode);

  // ✅ IMPORTANT FIX: Do NOT return all casinos when country is unknown
  if (!countryName) {
    return [];
  }

  const codeUpper = normaliseCode(countryCode);
  const nameLower = countryName.toLowerCase();

  const matchesCountry = (entry) => {
    if (!entry) return false;
    const value = entry.toString().trim();
    if (!value) return false;

    const upper = value.toUpperCase();
    const lower = value.toLowerCase();

    if (upper === codeUpper) return true;
    if (value === countryName || lower === nameLower) return true;
    if (lower.includes(nameLower)) return true;

    const inferredCode = NAME_TO_CODE[lower];
    if (inferredCode && inferredCode === codeUpper) return true;

    return false;
  };

  return casinos.filter((casino) => {
    const available = Array.isArray(casino?.availableCountries)
      ? casino.availableCountries
      : [];

    if (countryIsInEU && available.includes("European Countries (General)")) {
      return true;
    }

    return available.some(matchesCountry);
  });
};

