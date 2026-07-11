import axios from 'axios';

// Create standard axios instance.
// Using relative URL '/api' relies on Vite's local dev server proxy,
// and in production routes relative API calls properly.
const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Call backend to analyze a company
 * @param {string} companyName Ticker or company name
 * @returns {Promise<object>} Report JSON data
 */
export const analyzeCompanyApi = async (companyName) => {
  try {
    const response = await API.post('/analyze', { company: companyName });
    return response.data;
  } catch (error) {
    console.error("API error in analyzeCompanyApi:", error);
    const errorMsg = error.response?.data?.message || "Failed to analyze company. Connection to server failed.";
    throw new Error(errorMsg);
  }
};

/**
 * Call backend to compare multiple companies
 * @param {Array<string>} companies List of company names/tickers
 * @returns {Promise<object>} Comparison JSON data
 */
export const compareCompaniesApi = async (companies) => {
  try {
    const response = await API.post('/compare', { companies });
    return response.data;
  } catch (error) {
    console.error("API error in compareCompaniesApi:", error);
    const errorMsg = error.response?.data?.message || "Failed to compare companies. Connection to server failed.";
    throw new Error(errorMsg);
  }
};
