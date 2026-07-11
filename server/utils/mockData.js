/**
 * Realistic Mock Data templates used as robust fallback when Gemini API fails
 * or when no valid GEMINI_API_KEY is supplied.
 */

export const MOCK_REPORTS = {
  AAPL: {
    name: "Apple Inc.",
    ticker: "AAPL",
    domain: "apple.com",
    industry: "Consumer Electronics",
    description: "Global pioneer in consumer hardware (iPhone, Mac, iPad) and high-margin digital ecosystem subscriptions.",
    metrics: {
      marketCap: "$3.45 Trillion",
      revenue: "$385.6 Billion",
      currentPrice: "$224.50",
      peRatio: "31.2",
      eps: "7.20",
      roe: "154.3%",
      debt: "Low-Moderate ($106B Total Debt, backed by immense cash)",
      cashFlow: "Exceptional ($110B Operating Cash Flow)",
      netProfit: "$97.0 Billion"
    },
    businessAnalysis: {
      businessModel: "Premium hardware sales integrated with highly sticky subscription services (App Store, iCloud, Music, Pay).",
      competitiveAdvantages: [
        "Unrivaled brand loyalty and ecosystem lock-in.",
        "Immense pricing power on high-margin devices.",
        "Vertical integration of hardware, software, and proprietary chip architecture."
      ],
      growthOpportunities: [
        "Monetizing Apple Intelligence AI features across 1.2 billion active device users.",
        "Expanding financial services and subscription monetization.",
        "Growth in augmented reality wearables (Vision Pro) and health monitoring."
      ],
      risks: [
        "Global antitrust scrutiny regarding App Store fees and closed ecosystem practices.",
        "Geopolitical supply chain vulnerabilities (high concentration in China).",
        "Hardware saturation leading to slower smartphone upgrade cycles."
      ]
    },
    news: [
      {
        title: "Apple Intelligence Rollout Drives Solid Pre-Orders",
        summary: "Reports indicate strong initial demand for the iPhone 16 lineup following new generative AI feature integration.",
        source: "Bloomberg",
        date: "Today"
      },
      {
        title: "EU Regulators Set Heavy Fines Under DMA Compliance",
        summary: "European Union antitrust regulators allege Apple has not fully complied with DMA rules regarding third-party apps.",
        source: "Reuters",
        date: "2 days ago"
      }
    ],
    swot: {
      strengths: [
        "Elite brand reputation and user engagement.",
        "Recurring service revenues matching high gross margins (~70%).",
        "Immense cash reserves ($150B+)."
      ],
      weaknesses: [
        "Heavy reliance on iPhone hardware cycles (~50% of revenue).",
        "Laggard in training proprietary foundation AI models compared to cloud giants.",
        "High price tags limit market share growth in emerging markets."
      ],
      opportunities: [
        "Apple Intelligence edge-AI features pushing massive hardware replacement cycle.",
        "Further expansion into digital health and financial products.",
        "Further chip design improvements widening performance gap."
      ],
      threats: [
        "Severe antitrust lawsuits in US and EU challenging ecosystem dominance.",
        "Disruption of global assembly lines from regional conflicts.",
        "Fierce competitive pressures from Android developers globally."
      ]
    },
    recommendation: {
      decision: "INVEST",
      confidence: "88%",
      riskLevel: "Low",
      pros: [
        "Extremely stable recurring cash flows.",
        "Robust capital return program ($110B+ stock buybacks annually).",
        "High defensive moat protects against recessions."
      ],
      cons: [
        "High P/E multiple (~31) leaves narrow margin of error.",
        "Regulatory overhang from US DOJ antitrust suit."
      ],
      investmentHorizon: "Long Term (3-5 Years)",
      suggestedStrategy: "Accumulate on pullbacks. Dollar-cost average (DCA) into position to mitigate valuation risks."
    }
  },
  TSLA: {
    name: "Tesla Inc.",
    ticker: "TSLA",
    domain: "tesla.com",
    industry: "Electric Vehicles / Clean Energy",
    description: "Global leader in electric vehicle manufacturing, battery energy storage, solar systems, and autonomous robotics.",
    metrics: {
      marketCap: "$820 Billion",
      revenue: "$96.8 Billion",
      currentPrice: "$256.30",
      peRatio: "62.4",
      eps: "4.10",
      roe: "22.5%",
      debt: "Low ($5.2B Debt, highly liquid balance sheet)",
      cashFlow: "Moderate-Strong ($12.5B Operating Cash Flow)",
      netProfit: "$13.4 Billion"
    },
    businessAnalysis: {
      businessModel: "High-volume electric vehicles, solar roof installations, large-scale battery storage (Megapack), and high-margin software licenses (FSD).",
      competitiveAdvantages: [
        "Industry-leading manufacturing cost efficiency and gigafactory network.",
        "Proprietary Supercharger fast-charging network worldwide.",
        "Vast real-world telemetry driving autonomous Full Self-Driving neural networks."
      ],
      growthOpportunities: [
        "Mass-market next-generation $25k vehicle scaling up production.",
        "Scaling battery energy storage utility segments experiencing triple-digit growth.",
        "High-margin software licensing of Full Self-Driving (FSD) to rival automakers."
      ],
      risks: [
        "Fierce pricing competition from Chinese EV makers (BYD, Xiaomi).",
        "Regulatory delays or failures in delivering full Level 4/5 autonomy software.",
        "Execution risks and high capital expenditures on robotaxis and humanoid robots (Optimus)."
      ]
    },
    news: [
      {
        title: "Tesla Cybercab Unveiled for Autonomous Transport",
        summary: "Tesla reveals details of its bespoke robotaxi vehicle, target production starting in late 2026.",
        source: "CNBC",
        date: "Yesterday"
      },
      {
        title: "Megapack Deliveries Reach Record Levels In Energy Surge",
        summary: "Tesla energy storage installations surpass forecast, offsetting automotive price cut declines.",
        source: "TechCrunch",
        date: "3 days ago"
      }
    ],
    swot: {
      strengths: [
        "Top global EV brand and market share.",
        "Industry-leading auto operating margins.",
        "Substantial AI computing cluster assets."
      ],
      weaknesses: [
        "Automotive profitability highly sensitive to pricing markdowns.",
        "Key product delays (Roadster, Semi, lower-cost platforms).",
        "Public relations volatility relating to brand reputation."
      ],
      opportunities: [
        "FSD software monetization scaling via licensing deals.",
        "Commercialization of humanoid robotics in manufacturing.",
        "Clean energy grid conversions driving Megapack demand."
      ],
      threats: [
        "Cheaper Chinese EV imports taking market share in Europe and Asia.",
        "Regulatory safety investigations on Autopilot/FSD systems.",
        "Macro interest rate pressures slowing new car financing."
      ]
    },
    recommendation: {
      decision: "INVEST",
      confidence: "70%",
      riskLevel: "High",
      pros: [
        "Significant upside potential from AI, energy storage, and robotics verticals.",
        "Excellent liquidity and zero near-term debt defaults.",
        "Strong brand halo effect."
      ],
      cons: [
        "High valuation (P/E >60) makes it volatile.",
        "Highly reliant on autonomous driving validation."
      ],
      investmentHorizon: "Long Term (5+ Years)",
      suggestedStrategy: "Initiate starter position. Highly volatile, suitable only for investors with high risk tolerance."
    }
  },
  NVDA: {
    name: "NVIDIA Corporation",
    ticker: "NVDA",
    domain: "nvidia.com",
    industry: "Semiconductors / AI Computing",
    description: "Monopoly designer of GPU hardware, compute platforms, and networking systems powerhousing generative AI globally.",
    metrics: {
      marketCap: "$3.15 Trillion",
      revenue: "$96.3 Billion",
      currentPrice: "$128.20",
      peRatio: "58.6",
      eps: "2.18",
      roe: "115.4%",
      debt: "Low ($8.5B Debt, massive profit margins)",
      cashFlow: "Excellent ($46.8B Operating Cash Flow)",
      netProfit: "$53.0 Billion"
    },
    businessAnalysis: {
      businessModel: "Design and sale of high-performance AI chips (Hopper, Blackwell), proprietary CUDA software ecosystem, and enterprise cloud networks.",
      competitiveAdvantages: [
        "CUDA software stack creates a massive developer lock-in moat.",
        "Hardware performance leads rivals (AMD, Intel) by multi-year margins.",
        "Full system design (networking, storage, compute) rather than just standalone chips."
      ],
      growthOpportunities: [
        "Scaling Blackwell chip production to fulfill record backlogged demand.",
        "Expansion of sovereign AI clusters funded by international governments.",
        "Emergence of custom silicon chips for industrial robotics and self-driving cars."
      ],
      risks: [
        "Extreme client concentration (5 massive cloud vendors command 40% of sales).",
        "Strict export controls on advanced AI chips to Chinese markets.",
        "Potential slowing of infrastructure capital spending by hyperscalers."
      ]
    },
    news: [
      {
        title: "Blackwell Chip Shipments Confirmed for Next Quarter",
        summary: "NVIDIA assures shareholders that manufacturing revisions are complete, with high-volume Blackwell sales imminent.",
        source: "MarketWatch",
        date: "Today"
      },
      {
        title: "Hyperscalers Vow Continued AI Capex Expansion",
        summary: "Earnings reports from Microsoft and Google hint at expanded budget allocations for data center chips.",
        source: "Reuters",
        date: "Yesterday"
      }
    ],
    swot: {
      strengths: [
        "Dominant AI hardware market share (~90%).",
        "Phenomenal gross margins (~75%).",
        "CUDA software forms an ironclad ecosystem barrier."
      ],
      weaknesses: [
        "Supply chain dependencies on single supplier (TSMC) in Taiwan.",
        "Prone to high cyclicality in semiconductor markets.",
        "Premium pricing structures trigger rivals to design custom in-house chips."
      ],
      opportunities: [
        "Blackwell design platform driving massive server replacement cycles.",
        "Expansion into AI software services and enterprise hosting.",
        "Autonomous vehicle integrations."
      ],
      threats: [
        "Geopolitical risks targeting semiconductor fabs in Taiwan.",
        "Export blocks limiting expansion in key international markets.",
        "Hyperscalers building proprietary custom chips (TPUs, Trainium)."
      ]
    },
    recommendation: {
      decision: "INVEST",
      confidence: "82%",
      riskLevel: "Medium",
      pros: [
        "Uncontested engine of the global AI revolution.",
        "Fastest revenue and profit growth among mega-caps.",
        "Staggering profit margins."
      ],
      cons: [
        "Susceptible to supply-side constraints.",
        "Valuation prices in multi-year hypergrowth."
      ],
      investmentHorizon: "Medium to Long Term (3-5 Years)",
      suggestedStrategy: "Buy on corrections. Accumulate during broader market chip cycle drawdowns."
    }
  },
  MSFT: {
    name: "Microsoft Corporation",
    ticker: "MSFT",
    domain: "microsoft.com",
    industry: "Software & Cloud Computing",
    description: "Enterprise software monopolist (Office, Windows) and global cloud infrastructure leader scaling commercial Copilot AI solutions.",
    metrics: {
      marketCap: "$3.20 Trillion",
      revenue: "$245.1 Billion",
      currentPrice: "$430.50",
      peRatio: "34.5",
      eps: "12.47",
      roe: "38.2%",
      debt: "Low ($42B Debt, AAA-rated balance sheet)",
      cashFlow: "Robust ($110B Operating Cash Flow)",
      netProfit: "$88.1 Billion"
    },
    businessAnalysis: {
      businessModel: "SaaS licensing models (Office 365, Windows), enterprise hosting (Azure), professional networks (LinkedIn), gaming (Xbox), and AI API services (OpenAI alliance).",
      competitiveAdvantages: [
        "Unmatched enterprise client lock-in and distribution channels.",
        "Azure represents the primary host for enterprise cloud cloud conversions.",
        "Strategic partnership with OpenAI providing early-mover advantage in generative AI."
      ],
      growthOpportunities: [
        "Monetizing Copilot AI add-ons across hundreds of millions of commercial office seats.",
        "Azure market share expansion capturing AI cloud hosting workloads.",
        "Expanding gaming market share following Activision Blizzard acquisition."
      ],
      risks: [
        "High capital expenditure costs needed to construct data centers and secure GPUs.",
        "Slight margins headwinds due to initial high cost-to-serve of AI models.",
        "Antitrust regulatory reviews regarding product bundles and licensing policies."
      ]
    },
    news: [
      {
        title: "Azure Revenue Growth Outpaces AWS and Google Cloud",
        summary: "Azure continues to show strong expansion, driven by high demand for AI inference integrations.",
        source: "The Wall Street Journal",
        date: "Today"
      },
      {
        title: "Microsoft Copilot Adoption Hits Milestone in Enterprise",
        summary: "Microsoft reported that over 70% of Fortune 500 companies have deployed Copilot solutions.",
        source: "TechRadar",
        date: "3 days ago"
      }
    ],
    swot: {
      strengths: [
        "Incredible recurring cash flow from SaaS software pipelines.",
        "AAA credit rating (stronger than many sovereign nations).",
        "Leading position in commercial enterprise generative AI."
      ],
      weaknesses: [
        "Complex legacy products slowing system innovations.",
        "Slower mobile/hardware footprint.",
        "High reliance on third-party AI models (OpenAI)."
      ],
      opportunities: [
        "Upselling AI features to current Office 365 consumer pools.",
        "Azure taking market share from Amazon AWS.",
        "Security cloud services monetization scaling up."
      ],
      threats: [
        "Intensified regulatory blocks on acquisitions and bundles.",
        "Security breaches targeting enterprise cloud services.",
        "Rising cost of global data center infrastructure."
      ]
    },
    recommendation: {
      decision: "INVEST",
      confidence: "90%",
      riskLevel: "Low",
      pros: [
        "AAA-rated financial health with low risk profile.",
        "Stellar distribution network guarantees fast AI monetization.",
        "Highly defensive asset with massive moat."
      ],
      cons: [
        "Elevated capex levels squeeze free cash flow conversion ratios.",
        "Valuation multiple is historic highs."
      ],
      investmentHorizon: "Long Term (3-5 Years)",
      suggestedStrategy: "Core portfolio compounder. Buy and hold, accumulating position regularly."
    }
  }
};

/**
 * Dynamically generates a realistic report for any company not pre-defined
 */
export const generateDynamicMock = (query) => {
  const cleanQuery = query.trim().toUpperCase();
  const ticker = cleanQuery.length <= 5 ? cleanQuery : cleanQuery.substring(0, 4);
  const name = cleanQuery.length <= 5 ? `${cleanQuery} Corp.` : query;
  
  // Format matching domain
  const domainPart = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const domain = `${domainPart || 'company'}.com`;

  return {
    name: name,
    ticker: ticker,
    domain: domain,
    industry: "Technology / Miscellaneous",
    description: `A publicly traded corporation specializing in innovative products and next-generation services within the global economy.`,
    metrics: {
      marketCap: "$42.5 Billion",
      revenue: "$8.4 Billion",
      currentPrice: "$85.20",
      peRatio: "22.5",
      eps: "3.78",
      roe: "18.4%",
      debt: "Moderate ($4.2 Billion)",
      cashFlow: "Positive ($1.2 Billion)",
      netProfit: "$890 Million"
    },
    businessAnalysis: {
      businessModel: "B2B and B2C product licensing, regional retail distributions, and SaaS recurring offerings.",
      competitiveAdvantages: [
        "Established regional market presence.",
        "Niche product lines with limited direct competitors.",
        "Experienced operational management team."
      ],
      growthOpportunities: [
        "Expanding digital sales models globally.",
        "Integration of cost-saving AI systems in manufacturing.",
        "Strategic mergers in adjacent market sectors."
      ],
      risks: [
        "Interest rate fluctuations increasing financing expenditures.",
        "Shifting consumer preferences and product obsolescence.",
        "Supply chain dependencies on international suppliers."
      ]
    },
    news: [
      {
        title: `${name} Reports Steady Earnings for Latest Fiscal Quarter`,
        summary: `The company surpassed analyst forecasts, showing robust margins and steady growth.`,
        source: "MarketWatch",
        date: "Today"
      },
      {
        title: `${name} Expands Operations into International Markets`,
        summary: `Analysts view the new geographic expansion plan as a catalyst for long-term revenue growth.`,
        source: "Yahoo Finance",
        date: "3 days ago"
      }
    ],
    swot: {
      strengths: [
        "Strong brand equity in core regional markets.",
        "High customer retention rates.",
        "Robust balance sheet and liquid assets."
      ],
      weaknesses: [
        "Limited diversification of primary revenue streams.",
        "High cost structure compared to low-cost international competitors.",
        "Relatively low R&D spend limits disruptive product launches."
      ],
      opportunities: [
        "Transitioning client bases to digital subscription tiers.",
        "Strategic acquisitions of early-stage competitors.",
        "Expanding brand recognition in adjacent states."
      ],
      threats: [
        "Regulatory alterations regarding environmental or safety guidelines.",
        "Inflationary cost escalations on basic raw material inputs.",
        "Geopolitical trade conflicts leading to tariff barriers."
      ]
    },
    recommendation: {
      decision: "INVEST",
      confidence: "74%",
      riskLevel: "Medium",
      pros: [
        "Solid balance sheet with sustainable debt coverage.",
        "Strong customer retention guarantees steady revenues.",
        "Attractive entry valuation (P/E ~22)."
      ],
      cons: [
        "Exposure to macro inflation and supply constraints.",
        "Lower R&D spend could hinder disruptive long-term growth."
      ],
      investmentHorizon: "Medium Term (2-3 Years)",
      suggestedStrategy: "Initiate modular position. Monitor upcoming earnings reports closely for guidance upgrades."
    }
  };
};

/**
 * Dynamically generates a comparison matrix when Gemini fails
 */
export const generateComparisonMock = (companiesList) => {
  const tableRows = [
    { metric: "Current Price", values: ["$224.50", "$256.30", "$128.20", "$430.50"] },
    { metric: "Market Cap", values: ["$3.45T", "$820B", "$3.15T", "$3.20T"] },
    { metric: "Revenue", values: ["$385.6B", "$96.8B", "$96.3B", "$245.1B"] },
    { metric: "Net Profit", values: ["$97.0B", "$13.4B", "$53.0B", "$88.1B"] },
    { metric: "EPS", values: ["7.20", "4.10", "2.18", "12.47"] },
    { metric: "PE Ratio", values: ["31.2", "62.4", "58.6", "34.5"] },
    { metric: "ROE", values: ["154.3%", "22.5%", "115.4%", "38.2%"] },
    { metric: "Debt", values: ["Low-Moderate", "Low", "Low", "Low"] },
    { metric: "Business Model", values: ["Hardware/Services", "EV/Battery/Solar", "GPU/CUDA AI System", "SaaS/Azure/Enterprise"] },
    { metric: "Strengths", values: ["Brand loyalty", "Manufacturing", "GPU AI Dominance", "Enterprise Moat"] },
    { metric: "Weaknesses", values: ["iPhone dependence", "Price margins", "Taiwan fab concentration", "Azure cap spend"] },
    { metric: "Growth Opportunities", values: ["AI software cycles", "Megapacks/Robotics", "Blackwell architecture", "Copilot monetization"] },
    { metric: "Risks", values: ["Global antitrust", "Autonomy delays", "Export boundaries", "Hyperscale capex cost"] },
    { metric: "Recommendation", values: ["INVEST", "INVEST", "INVEST", "INVEST"] },
    { metric: "Risk Level", values: ["Low", "High", "Medium", "Low"] },
    { metric: "Confidence", values: ["88%", "70%", "82%", "90%"] }
  ];

  const formattedTable = tableRows.map((row) => {
    const companiesMap = {};
    companiesList.forEach((ticker, idx) => {
      // Rotate indices or default
      companiesMap[ticker] = row.values[idx % row.values.length] || "N/A";
    });
    
    // Choose winner (simple logic: S&P, Microsoft/Apple win)
    const winner = companiesList[0] || "TICKER";
    
    return {
      metric: row.metric,
      companies: companiesMap,
      winner: winner
    };
  });

  const winnerTicker = companiesList[0] || "TICKER";

  return {
    comparisonTable: formattedTable,
    winnerCard: {
      bestInvestment: `${winnerTicker} (Winner by Fallback Valuation)`,
      reasoning: `Based on a robust defensive financial assessment, ${winnerTicker} displays superior market margins, cash flow resilience, and capital allocation compared to its alternatives.`,
      pros: [
        `Strong cash generation buffers macro risks.`,
        `Leading margins in its specific sector.`
      ],
      cons: [
        `Elevated market valuations.`,
        `Regulatory oversight within domestic operations.`
      ],
      longTermPotential: "Highly stable long-term compounding prospects supported by industry tailwinds and strong operational governance.",
      suitableInvestor: "Growth and value-oriented investors seeking high cash flow assets with established competitive moats.",
      finalRecommendation: `Build position by scaling in over 3-6 months. Accumulate on sector rotations.`
    }
  };
};
