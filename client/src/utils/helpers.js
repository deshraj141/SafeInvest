/**
 * Helper utility functions for the frontend app
 */

/**
 * Extracts initials from a company name (up to 2 characters)
 * @param {string} name 
 * @returns {string}
 */
export const getCompanyInitials = (name) => {
  if (!name) return "AI";
  const cleaned = name.replace(/(Inc\.|Corp\.|Ltd\.|Platforms|Technologies|Holdings|Group|Co\.)/gi, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  if (words.length === 1 && words[0].length >= 2) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

/**
 * Generates an HSL gradient background based on string hash for fallback avatars
 * @param {string} str 
 * @returns {string} HSL css gradient style
 */
export const getGradientForString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h1 = Math.abs(hash % 360);
  const h2 = (h1 + 40) % 360;
  return `linear-gradient(135deg, hsl(${h1}, 70%, 45%) 0%, hsl(${h2}, 80%, 35%) 100%)`;
};

/**
 * Formats values to currency or custom compact styles if needed
 * @param {string|number} val 
 * @returns {string}
 */
export const formatVal = (val) => {
  if (val === undefined || val === null) return "N/A";
  return String(val);
};
