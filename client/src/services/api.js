import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Call backend to analyze a company
 * @param {string} companyName Ticker or company name
 * @returns {Promise<object>} Report JSON data
 */
export const analyzeCompanyApi = async (companyName) => {
  try {
    const response = await axios.post(`${API_URL}/api/analyze`, { company: companyName }, {
      headers: { 'Content-Type': 'application/json' }
    });
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
    const response = await axios.post(`${API_URL}/api/compare`, { companies }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("API error in compareCompaniesApi:", error);
    const errorMsg = error.response?.data?.message || "Failed to compare companies. Connection to server failed.";
    throw new Error(errorMsg);
  }
};
