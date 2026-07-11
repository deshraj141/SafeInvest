/**
 * Prompt templates for Gemini AI queries
 */

export const getAnalysisPrompt = (companyName) => {
  return `You are a world-class financial analyst and investment researcher.
Analyze the company: "${companyName}". 
Your report must be a valid, parseable JSON object. Do not include any formatting markdown like \`\`\`json or backticks. Return raw JSON string only.
The JSON must adhere to the following schema strictly:

{
  "name": "Full Company Name (e.g. Apple Inc.)",
  "ticker": "Ticker symbol (e.g. AAPL)",
  "domain": "Primary domain of the company (e.g. apple.com) for looking up logos. Ensure it is correct (e.g., tesla.com, microsoft.com, amazon.com).",
  "industry": "Industry sector (e.g. Consumer Electronics / Technology)",
  "description": "A high-quality one-sentence summary of what the company does.",
  "metrics": {
    "marketCap": "Value (e.g. $3.25T or $850B)",
    "revenue": "Value (e.g. $385.6B)",
    "currentPrice": "Value (e.g. $210.50)",
    "peRatio": "Value (e.g. 28.5)",
    "eps": "Value (e.g. 6.43)",
    "roe": "Value (e.g. 145.2%)",
    "debt": "Description (e.g. Low, Moderate ($108B), High)",
    "cashFlow": "Description (e.g. Strong ($110B Operating), Negative)",
    "netProfit": "Value (e.g. $97.0B)"
  },
  "businessAnalysis": {
    "businessModel": "Explanation of how they make money.",
    "competitiveAdvantages": [
      "Advantage 1 with detail",
      "Advantage 2 with detail",
      "Advantage 3 with detail"
    ],
    "growthOpportunities": [
      "Opportunity 1 with detail",
      "Opportunity 2 with detail",
      "Opportunity 3 with detail"
    ],
    "risks": [
      "Risk 1 with detail",
      "Risk 2 with detail",
      "Risk 3 with detail"
    ]
  },
  "news": [
    {
      "title": "Recent news headline related to the company",
      "summary": "Brief summary of the news impact.",
      "source": "Source name (e.g. Bloomberg, Reuters)",
      "date": "Timeline (e.g. Today, Yesterday, 2 days ago)"
    },
    {
      "title": "Another recent news headline",
      "summary": "Brief summary of the news impact.",
      "source": "Source name",
      "date": "Timeline"
    }
  ],
  "swot": {
    "strengths": [
      "Strength 1",
      "Strength 2",
      "Strength 3"
    ],
    "weaknesses": [
      "Weakness 1",
      "Weakness 2",
      "Weakness 3"
    ],
    "opportunities": [
      "Opportunity 1",
      "Opportunity 2",
      "Opportunity 3"
    ],
    "threats": [
      "Threat 1",
      "Threat 2",
      "Threat 3"
    ]
  },
  "recommendation": {
    "decision": "INVEST or PASS (must be exactly one of these two)",
    "confidence": "Percentage (e.g. 85%)",
    "riskLevel": "Low or Medium or High",
    "pros": [
      "Pro 1",
      "Pro 2",
      "Pro 3"
    ],
    "cons": [
      "Con 1",
      "Con 2",
      "Con 3"
    ],
    "investmentHorizon": "Timeframe (e.g. Long Term (3-5 Years))",
    "suggestedStrategy": "Actionable suggestion (e.g. DCA on major dips)"
  }
}

Use the most recent available realistic financial data for the company. Ensure the metrics reflect current trends. Make the SWOT, news, business analysis, and investment recommendation highly detailed, professional, and sophisticated. Avoid generic AI statements; provide specific metrics, competitive pressures, and growth drivers.`;
};

export const getComparisonPrompt = (companiesList) => {
  const companiesStr = companiesList.join(", ");
  return `You are a world-class financial analyst and investment advisor.
Compare the following companies: ${companiesStr}.
Your response must be a valid, parseable JSON object. Do not include any formatting markdown like \`\`\`json or backticks. Return raw JSON string only.
The JSON must adhere to the following schema strictly:

{
  "comparisonTable": [
    {
      "metric": "Current Price",
      "companies": {
        "TICKER1": "Price 1",
        "TICKER2": "Price 2"
      },
      "winner": "TICKER of the company with the best value/score for this metric"
    },
    {
      "metric": "Market Cap",
      "companies": {
        "TICKER1": "Cap 1",
        "TICKER2": "Cap 2"
      },
      "winner": "TICKER of the company with the best value/score for this metric"
    },
    {
      "metric": "Revenue",
      "companies": {
        "TICKER1": "Revenue 1",
        "TICKER2": "Revenue 2"
      },
      "winner": "TICKER"
    },
    {
      "metric": "Net Profit",
      "companies": {
        "TICKER1": "Net Profit 1",
        "TICKER2": "Net Profit 2"
      },
      "winner": "TICKER"
    },
    {
      "metric": "EPS",
      "companies": {
        "TICKER1": "EPS 1",
        "TICKER2": "EPS 2"
      },
      "winner": "TICKER"
    },
    {
      "metric": "PE Ratio",
      "companies": {
        "TICKER1": "PE 1",
        "TICKER2": "PE 2"
      },
      "winner": "TICKER"
    },
    {
      "metric": "ROE",
      "companies": {
        "TICKER1": "ROE 1",
        "TICKER2": "ROE 2"
      },
      "winner": "TICKER"
    },
    {
      "metric": "Debt",
      "companies": {
        "TICKER1": "Debt 1",
        "TICKER2": "Debt 2"
      },
      "winner": "TICKER"
    },
    {
      "metric": "Business Model",
      "companies": {
        "TICKER1": "Brief summary of business model 1",
        "TICKER2": "Brief summary of business model 2"
      },
      "winner": "TICKER"
    },
    {
      "metric": "Strengths",
      "companies": {
        "TICKER1": "Top strengths of Ticker 1",
        "TICKER2": "Top strengths of Ticker 2"
      },
      "winner": "TICKER"
    },
    {
      "metric": "Weaknesses",
      "companies": {
        "TICKER1": "Top weaknesses of Ticker 1",
        "TICKER2": "Top weaknesses of Ticker 2"
      },
      "winner": "TICKER"
    },
    {
      "metric": "Growth Opportunities",
      "companies": {
        "TICKER1": "Top opportunity of Ticker 1",
        "TICKER2": "Top opportunity of Ticker 2"
      },
      "winner": "TICKER"
    },
    {
      "metric": "Risks",
      "companies": {
        "TICKER1": "Top risk of Ticker 1",
        "TICKER2": "Top risk of Ticker 2"
      },
      "winner": "TICKER"
    },
    {
      "metric": "Recommendation",
      "companies": {
        "TICKER1": "INVEST/PASS decision for Ticker 1",
        "TICKER2": "INVEST/PASS decision for Ticker 2"
      },
      "winner": "TICKER"
    },
    {
      "metric": "Risk Level",
      "companies": {
        "TICKER1": "Low/Medium/High",
        "TICKER2": "Low/Medium/High"
      },
      "winner": "TICKER"
    },
    {
      "metric": "Confidence",
      "companies": {
        "TICKER1": "Confidence percentage",
        "TICKER2": "Confidence percentage"
      },
      "winner": "TICKER"
    }
  ],
  "winnerCard": {
    "bestInvestment": "Full Name (TICKER) of the best option",
    "reasoning": "Thorough justification of why this company is the best option among all compared.",
    "pros": [
      "Key pro for the winning company compared to others",
      "Key pro 2"
    ],
    "cons": [
      "Key risk/con for the winning company compared to others",
      "Key con 2"
    ],
    "longTermPotential": "In-depth review of long-term compounding potential.",
    "suitableInvestor": "Profile of the ideal investor for this asset.",
    "finalRecommendation": "Actionable final recommendation details (e.g. buying strategy)."
  }
}

Use realistic comparative metrics and financials. For each row, in the "winner" field, put the ticker of the company that wins in that specific category (e.g., lower P/E ratio, higher ROE, stronger cash flows/lower risks). Make the winner selection objective based on standard investment criteria.`;
};
