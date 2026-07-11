import { analyzeCompany, compareCompanies } from "../services/geminiService.js";

/**
 * Controller to handle single company analysis
 */
export const handleAnalyze = async (req, res) => {
  const { company } = req.body;
  
  if (!company || typeof company !== "string" || !company.trim()) {
    return res.status(400).json({ 
      success: false, 
      message: "Company name or ticker is required as a string." 
    });
  }
  
  try {
    const reportText = company.trim();
    const analysisResult = await analyzeCompany(reportText);
    
    return res.status(200).json({
      success: true,
      data: analysisResult
    });
  } catch (error) {
    console.error("Controller Error in handleAnalyze:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate research report. Please try again."
    });
  }
};

/**
 * Controller to handle multi-company comparison
 */
export const handleCompare = async (req, res) => {
  const { companies } = req.body;
  
  if (!companies || !Array.isArray(companies) || companies.length < 2) {
    return res.status(400).json({
      success: false,
      message: "An array of at least 2 companies is required for comparison."
    });
  }
  
  if (companies.length > 4) {
    return res.status(400).json({
      success: false,
      message: "You can compare up to 4 companies at a time."
    });
  }
  
  try {
    const cleanedCompanies = companies.map(c => typeof c === "string" ? c.trim() : "").filter(Boolean);
    if (cleanedCompanies.length < 2) {
      return res.status(400).json({
        success: false,
        message: "At least 2 valid company names/tickers must be provided."
      });
    }
    
    const comparisonResult = await compareCompanies(cleanedCompanies);
    
    return res.status(200).json({
      success: true,
      data: comparisonResult
    });
  } catch (error) {
    console.error("Controller Error in handleCompare:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate comparison. Please try again."
    });
  }
};
