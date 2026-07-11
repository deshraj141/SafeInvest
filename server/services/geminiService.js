import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { getAnalysisPrompt, getComparisonPrompt } from "../utils/prompts.js";
import { MOCK_REPORTS, generateDynamicMock, generateComparisonMock } from "../utils/mockData.js";

dotenv.config();

// If key is not configured or placeholder, fall back to checking parent folder's .env
if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_actual_gemini_api_key_here") {
  dotenv.config({ path: "../.env", override: true });
}

// Validate API Key
const apiKey = process.env.GEMINI_API_KEY;
const isApiKeyConfigured = !!apiKey && apiKey !== "your_actual_gemini_api_key_here";

if (!isApiKeyConfigured) {
  console.warn("================================================================");
  console.warn("WARNING: GEMINI_API_KEY is missing or invalid in server/.env or parent .env.");
  console.warn("INVST.AI will run in robust MOCK FALLBACK mode automatically.");
  console.warn("================================================================");
}

// Initialize Gemini SDK
const genAI = new GoogleGenerativeAI(apiKey || "dummy_key");

/**
 * Clean and parse JSON returned from Gemini
 * @param {string} text 
 * @returns {object}
 */
const parseGeminiJsonResponse = (text) => {
  let cleanText = text.trim();
  
  if (cleanText.startsWith("```")) {
    cleanText = cleanText.replace(/^```(json)?/i, "");
    cleanText = cleanText.replace(/```$/, "");
    cleanText = cleanText.trim();
  }
  
  try {
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Failed to parse Gemini JSON. Raw text: ", text);
    throw new Error("Invalid JSON structure returned by Gemini: " + error.message);
  }
};

/**
 * Locate pre-defined mock report matching the user query
 * @param {string} query 
 * @returns {object|null}
 */
const findMockReport = (query) => {
  const cleanQuery = query.toUpperCase().trim();
  
  // Direct ticker lookup
  if (MOCK_REPORTS[cleanQuery]) {
    return MOCK_REPORTS[cleanQuery];
  }
  
  // Substring or company name lookup
  const matchedKey = Object.keys(MOCK_REPORTS).find(key => {
    return cleanQuery.includes(key) || 
           MOCK_REPORTS[key].name.toUpperCase().includes(cleanQuery) ||
           cleanQuery.includes(MOCK_REPORTS[key].name.toUpperCase());
  });
  
  if (matchedKey) {
    return MOCK_REPORTS[matchedKey];
  }
  
  return null;
};

/**
 * Perform AI Investment Research for a company
 * @param {string} companyName 
 * @returns {Promise<object>}
 */
export const analyzeCompany = async (companyName) => {
  // If API key is not set, run fallback immediately
  if (!isApiKeyConfigured) {
    console.log(`[API KEY NOT CONFIGURED] Servicing fallback report for: ${companyName}`);
    const mock = findMockReport(companyName);
    return mock ? mock : generateDynamicMock(companyName);
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const prompt = getAnalysisPrompt(companyName);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    return parseGeminiJsonResponse(responseText);
  } catch (error) {
    console.warn(`[GEMINI API ERROR] Fallback triggered for query "${companyName}". Error details:`, error.message);
    const mock = findMockReport(companyName);
    return mock ? mock : generateDynamicMock(companyName);
  }
};

/**
 * Perform AI Comparative Analysis for multiple companies
 * @param {Array<string>} companies 
 * @returns {Promise<object>}
 */
export const compareCompanies = async (companies) => {
  if (!companies || !Array.isArray(companies) || companies.length < 2) {
    throw new Error("Provide at least 2 companies to compare.");
  }

  // If API key is not set, run fallback immediately
  if (!isApiKeyConfigured) {
    console.log(`[API KEY NOT CONFIGURED] Servicing fallback comparison for:`, companies);
    return generateComparisonMock(companies);
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const prompt = getComparisonPrompt(companies);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    return parseGeminiJsonResponse(responseText);
  } catch (error) {
    console.warn(`[GEMINI API ERROR] Fallback triggered for comparison:`, companies, ". Error details:", error.message);
    return generateComparisonMock(companies);
  }
};
