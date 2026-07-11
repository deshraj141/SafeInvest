import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  FiAlertTriangle, FiCheckCircle, FiXCircle, FiTrendingUp, FiCpu, 
  FiFileText, FiMap, FiAward, FiGlobe, FiPlusCircle, FiList, FiClock,
  FiLayers, FiDollarSign, FiShield, FiArrowRight, FiInfo, FiActivity,
  FiSearch
} from 'react-icons/fi';
import useLocalStorage from '../hooks/useLocalStorage';
import { analyzeCompanyApi } from '../services/api';
import SearchBar from '../components/SearchBar';
import WorkspaceTabs from '../components/WorkspaceTabs';
import Logo from '../components/Logo';
import MetricCard from '../components/MetricCard';

const LOADING_MESSAGES = [
  "Researching company...",
  "Collecting financial data...",
  "Analyzing business...",
  "Evaluating risks...",
  "Generating recommendation..."
];

const getCompanyMeta = (ticker = '') => {
  const meta = {
    AAPL: { hq: 'Cupertino, CA', founded: '1976', sector: 'Technology' },
    TSLA: { hq: 'Austin, TX', founded: '2003', sector: 'Consumer Cyclical' },
    MSFT: { hq: 'Redmond, WA', founded: '1975', sector: 'Technology' },
    NVDA: { hq: 'Santa Clara, CA', founded: '1993', sector: 'Technology' },
    AMZN: { hq: 'Seattle, WA', founded: '1994', sector: 'Consumer Cyclical' },
    GOOGL: { hq: 'Mountain View, CA', founded: '1998', sector: 'Technology' },
    META: { hq: 'Menlo Park, CA', founded: '2004', sector: 'Technology' },
    NFLX: { hq: 'Los Gatos, CA', founded: '1997', sector: 'Communication Services' }
  };
  return meta[ticker.toUpperCase()] || { hq: 'United States', founded: 'N/A', sector: 'Technology / Consumer Goods' };
};

export default function Analyze() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query');

  // Local storage states
  const [tabs, setTabs] = useLocalStorage('safeinvest_workspace_tabs', [
    { id: 'dashboard', name: 'Market Overview', isPinned: true, type: 'market' }
  ]);
  const [activeTabId, setActiveTabId] = useLocalStorage('safeinvest_active_tab_id', 'dashboard');
  const [recentSearches, setRecentSearches] = useLocalStorage('safeinvest_recent_searches', []);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIdx, setLoadingMessageIdx] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  
  const loadingInterval = useRef(null);

  // Rotating loading messages
  useEffect(() => {
    if (isLoading) {
      setLoadingMessageIdx(0);
      loadingInterval.current = setInterval(() => {
        setLoadingMessageIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1500);
    } else {
      if (loadingInterval.current) {
        clearInterval(loadingInterval.current);
      }
    }
    return () => {
      if (loadingInterval.current) clearInterval(loadingInterval.current);
    };
  }, [isLoading]);

  // Handle queries passed in URL parameters
  useEffect(() => {
    if (queryParam) {
      handleSearch(queryParam);
      // Clear URL parameter so it doesn't trigger repeatedly
      setSearchParams({});
    }
  }, [queryParam]);

  const handleSearch = async (companyName) => {
    if (!companyName.trim()) return;
    
    // Check if company is already open in tabs
    const formattedQuery = companyName.trim().toUpperCase();
    const existingTab = tabs.find(t => t.id.toUpperCase() === formattedQuery || t.name.toLowerCase() === companyName.toLowerCase());
    
    if (existingTab) {
      setActiveTabId(existingTab.id);
      return;
    }

    // Limit to 8 tabs (excluding pinned dashboard if wanted, or total 8)
    if (tabs.length >= 8) {
      setErrorMsg("Maximum of 8 workspace tabs reached. Please close a tab before performing a new analysis.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setLastSearch(companyName);

    try {
      const result = await analyzeCompanyApi(companyName);
      
      if (result.success && result.data) {
        const report = result.data;
        const newTabId = report.ticker || report.name;
        
        // Add to tabs
        const newTab = {
          id: newTabId,
          name: report.name,
          ticker: report.ticker,
          type: 'report',
          isPinned: false,
          data: report
        };
        
        setTabs([...tabs, newTab]);
        setActiveTabId(newTabId);
        
        // Add to recent searches (prevent duplicates)
        setRecentSearches(prev => {
          const cleaned = prev.filter(t => t.toLowerCase() !== companyName.toLowerCase());
          return [companyName, ...cleaned].slice(0, 10);
        });
      } else {
        throw new Error(result.message || "Failed to parse report data.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred while generating the report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTab = (tabId) => {
    setActiveTabId(tabId);
    setErrorMsg("");
  };

  const handleCloseTab = (tabId) => {
    const closedTabIdx = tabs.findIndex(t => t.id === tabId);
    if (closedTabIdx === -1) return;
    
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);

    // If active tab was closed, switch to another tab
    if (activeTabId === tabId) {
      const fallbackTab = newTabs[closedTabIdx - 1] || newTabs[0] || null;
      setActiveTabId(fallbackTab ? fallbackTab.id : 'dashboard');
    }
  };

  const handleTogglePin = (tabId) => {
    setTabs(prev => prev.map(t => {
      if (t.id === tabId) {
        // Prevent pinning dashboard out of pinned list
        if (t.id === 'dashboard') return t;
        return { ...t, isPinned: !t.isPinned };
      }
      return t;
    }));
  };

  // Find active tab
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* ================= SEARCH & TABS CONTAINER ================= */}
      <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
            Analyze Company
          </h2>
          <p className="text-xs text-dark-secondary dark:text-[#94A3B8] font-medium">
            Type a company name or stock ticker (e.g. MSFT, Amazon, Tesla) to request a comprehensive AI analysis from Google Gemini.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {errorMsg && (
          <div className="max-w-2xl mx-auto px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-brand-danger text-xs font-semibold flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-2">
              <FiAlertTriangle size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
            {lastSearch && (
              <button 
                onClick={() => handleSearch(lastSearch)}
                className="px-3 py-1 bg-brand-danger text-white rounded-lg text-[10px] font-bold hover:bg-red-600 transition-colors"
              >
                Retry
              </button>
            )}
          </div>
        )}
      </div>

      {/* Workspace Tabs */}
      <WorkspaceTabs 
        tabs={tabs} 
        activeTabId={activeTabId} 
        onSelectTab={handleSelectTab} 
        onCloseTab={handleCloseTab}
        onTogglePin={handleTogglePin}
      />

      {/* ================= LOADING SCREEN ================= */}
      {isLoading && (
        <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-16 flex flex-col items-center justify-center space-y-6 shadow-sm min-h-[450px]">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
            <FiCpu className="absolute text-brand-primary animate-pulse" size={24} />
          </div>
          <div className="text-center space-y-1.5">
            <p className="text-lg font-bold text-light-text dark:text-dark-text animate-pulse">
              {LOADING_MESSAGES[loadingMessageIdx]}
            </p>
            <p className="text-xs text-dark-secondary dark:text-[#94A3B8] font-medium">
              Querying Gemini API. This process takes 3-5 seconds.
            </p>
          </div>

          {/* Skeleton Loader Mock */}
          <div className="w-full max-w-lg space-y-4 opacity-40 animate-pulse pt-4 border-t border-light-border dark:border-slate-800/60">
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3 mx-auto"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3 mx-auto"></div>
            <div className="space-y-2 pt-2">
              <div className="h-2.5 bg-slate-100 dark:bg-slate-900/50 rounded-md w-full"></div>
              <div className="h-2.5 bg-slate-100 dark:bg-slate-900/50 rounded-md w-11/12"></div>
              <div className="h-2.5 bg-slate-100 dark:bg-slate-900/50 rounded-md w-4/5"></div>
            </div>
          </div>
        </div>
      )}

      {/* ================= EMPTY STATE / MARKET VIEW ================= */}
      {!isLoading && activeTab?.type === 'market' && (
        <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-12 text-center shadow-sm space-y-6 min-h-[400px] flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/20 text-brand-primary flex items-center justify-center mb-2">
            <FiFileText size={32} />
          </div>
          <div className="max-w-md space-y-4 flex flex-col items-center">
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text">No active company report</h3>
            <p className="text-xs text-dark-secondary dark:text-[#94A3B8] leading-relaxed font-medium">
              Use the search bar above to look up a stock ticker or company name. The results will populate in a new tab immediately.
            </p>
            <button 
              onClick={() => handleSearch('AAPL')}
              className="px-5 py-2.5 bg-brand-primary hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all duration-150 flex items-center gap-1.5 w-fit shadow-sm"
            >
              <FiSearch size={14} />
              <span>Analyze Apple (AAPL)</span>
            </button>
          </div>
          
          {recentSearches.length > 0 && (
            <div className="w-full max-w-sm pt-4 border-t border-light-border dark:border-slate-800/80">
              <span className="text-[10px] font-bold text-dark-secondary dark:text-[#94A3B8] uppercase tracking-widest block mb-3">Reopen Recent Searches</span>
              <div className="flex flex-wrap justify-center gap-2">
                {recentSearches.slice(0, 5).map(ticker => (
                  <button
                    key={ticker}
                    onClick={() => handleSearch(ticker)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-brand-primary/10 dark:bg-slate-800/50 dark:hover:bg-brand-primary/20 text-xs font-semibold rounded-lg border border-light-border dark:border-slate-800 transition-colors"
                  >
                    {ticker.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= REPORT VIEW ================= */}
      {!isLoading && activeTab?.type === 'report' && activeTab.data && (() => {
        const companyMeta = getCompanyMeta(activeTab.data.ticker);
        
        // Split business model into bullet points
        const renderBusinessModelPoints = (modelStr) => {
          if (!modelStr) return [];
          return modelStr.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 5);
        };
        const modelPoints = renderBusinessModelPoints(activeTab.data.businessAnalysis.businessModel);

        return (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Left Column (70%) */}
            <div className="w-full lg:w-[70%] space-y-8">
              
              {/* Company Overview Header */}
              <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <Logo name={activeTab.data.name} domain={activeTab.data.domain} size="xl" />
                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text tracking-tight">
                        {activeTab.data.name}
                      </h3>
                      <span className="text-xs font-bold px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded-lg uppercase tracking-wider">
                        {activeTab.data.ticker}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-dark-secondary dark:text-slate-400 rounded-lg">
                        {companyMeta.sector}
                      </span>
                    </div>
                    
                    <p className="text-sm text-dark-secondary dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                      {activeTab.data.description}
                    </p>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm text-slate-450">
                      <FiGlobe size={14} className="text-brand-primary" />
                      <a 
                        href={`https://${activeTab.data.domain}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-brand-primary transition-colors font-semibold"
                      >
                        {activeTab.data.domain}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Company Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-light-border dark:border-slate-800/80">
                  <div>
                    <span className="text-[10px] font-bold text-dark-secondary dark:text-slate-500 uppercase tracking-wider block mb-1">Sector</span>
                    <span className="text-sm font-semibold text-light-text dark:text-dark-text">{companyMeta.sector}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-dark-secondary dark:text-slate-500 uppercase tracking-wider block mb-1">Industry</span>
                    <span className="text-sm font-semibold text-light-text dark:text-dark-text">{activeTab.data.industry}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-dark-secondary dark:text-slate-500 uppercase tracking-wider block mb-1">Headquarters</span>
                    <span className="text-sm font-semibold text-light-text dark:text-dark-text">{companyMeta.hq}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-dark-secondary dark:text-slate-500 uppercase tracking-wider block mb-1">Founded</span>
                    <span className="text-sm font-semibold text-light-text dark:text-dark-text">{companyMeta.founded}</span>
                  </div>
                </div>
              </div>

              {/* Financial Metrics Responsive Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text flex items-center gap-2">
                  <FiTrendingUp className="text-brand-primary" /> Key Financial Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricCard label="Market Capitalization" value={activeTab.data.metrics.marketCap} icon={FiActivity} />
                  <MetricCard label="Current Price" value={activeTab.data.metrics.currentPrice} icon={FiDollarSign} />
                  <MetricCard label="Total Revenue" value={activeTab.data.metrics.revenue} icon={FiTrendingUp} />
                  <MetricCard label="Net Profit" value={activeTab.data.metrics.netProfit} icon={FiCheckCircle} />
                  <MetricCard label="Earnings Per Share (EPS)" value={activeTab.data.metrics.eps} icon={FiCpu} />
                  <MetricCard label="P/E Ratio" value={activeTab.data.metrics.peRatio} icon={FiActivity} />
                  <MetricCard label="Return on Equity (ROE)" value={activeTab.data.metrics.roe} icon={FiTrendingUp} />
                  <MetricCard label="Debt Level" value={activeTab.data.metrics.debt} icon={FiShield} trend="Debt" />
                  <MetricCard label="Operating Cash Flow" value={activeTab.data.metrics.cashFlow} icon={FiActivity} trend="Cash Flow" />
                </div>
              </div>

              {/* Business Analysis Split */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text flex items-center gap-2">
                  <FiLayers size={18} className="text-brand-primary" /> Business Operations Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Business Model */}
                  <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 space-y-3 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-light-border dark:border-slate-800/80 pb-2">
                      <FiFileText className="text-brand-primary" size={16} />
                      <h5 className="font-bold text-sm text-light-text dark:text-dark-text uppercase tracking-wider">
                        Business Model
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {modelPoints.map((point, i) => (
                        <li key={i} className="text-xs text-dark-secondary dark:text-[#94A3B8] flex items-start gap-2 leading-relaxed">
                          <span className="text-brand-primary mt-1 shrink-0">•</span>
                          <span>{point}.</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Competitive Advantages */}
                  <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 space-y-3 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-light-border dark:border-slate-800/80 pb-2">
                      <FiAward className="text-brand-primary" size={16} />
                      <h5 className="font-bold text-sm text-light-text dark:text-dark-text uppercase tracking-wider">
                        Moat & Competitive Edge
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {activeTab.data.businessAnalysis.competitiveAdvantages.map((adv, i) => (
                        <li key={i} className="text-xs text-dark-secondary dark:text-[#94A3B8] flex items-start gap-2 leading-relaxed">
                          <span className="text-brand-primary mt-1 shrink-0">•</span>
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Growth Opportunities */}
                  <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 space-y-3 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-light-border dark:border-slate-800/80 pb-2">
                      <FiPlusCircle className="text-brand-success" size={16} />
                      <h5 className="font-bold text-sm text-light-text dark:text-dark-text uppercase tracking-wider">
                        Growth Opportunities
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {activeTab.data.businessAnalysis.growthOpportunities.map((opp, i) => (
                        <li key={i} className="text-xs text-dark-secondary dark:text-slate-355 flex items-start gap-2 leading-relaxed">
                          <span className="text-brand-success mt-1 shrink-0">•</span>
                          <span>{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Strategic Risks */}
                  <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 space-y-3 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-light-border dark:border-slate-800/80 pb-2">
                      <FiAlertTriangle className="text-brand-danger" size={16} />
                      <h5 className="font-bold text-sm text-light-text dark:text-dark-text uppercase tracking-wider">
                        Strategic Risks
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {activeTab.data.businessAnalysis.risks.map((risk, i) => (
                        <li key={i} className="text-xs text-dark-secondary dark:text-[#94A3B8] flex items-start gap-2 leading-relaxed">
                          <span className="text-brand-danger mt-1 shrink-0">•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* SWOT Matrix Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text flex items-center gap-2">
                  <FiMap className="text-brand-primary" /> SWOT Strategic Evaluation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 space-y-3 shadow-sm">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-light-border dark:border-slate-800/60">
                      <FiCheckCircle className="text-brand-success" size={18} />
                      <h5 className="font-bold text-sm uppercase tracking-wider text-brand-success">
                        Strengths (S)
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {activeTab.data.swot.strengths.map((item, i) => (
                        <li key={i} className="text-xs text-dark-secondary dark:text-[#94A3B8] flex items-start gap-2 leading-relaxed">
                          <span className="text-brand-success shrink-0 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 space-y-3 shadow-sm">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-light-border dark:border-slate-800/60">
                      <FiXCircle className="text-brand-danger" size={18} />
                      <h5 className="font-bold text-sm uppercase tracking-wider text-brand-danger">
                        Weaknesses (W)
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {activeTab.data.swot.weaknesses.map((item, i) => (
                        <li key={i} className="text-xs text-dark-secondary dark:text-[#94A3B8] flex items-start gap-2 leading-relaxed">
                          <span className="text-brand-danger shrink-0 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 space-y-3 shadow-sm">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-light-border dark:border-slate-800/60">
                      <FiPlusCircle className="text-brand-primary" size={18} />
                      <h5 className="font-bold text-sm uppercase tracking-wider text-brand-primary">
                        Opportunities (O)
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {activeTab.data.swot.opportunities.map((item, i) => (
                        <li key={i} className="text-xs text-dark-secondary dark:text-[#94A3B8] flex items-start gap-2 leading-relaxed">
                          <span className="text-brand-primary shrink-0 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Threats */}
                  <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 space-y-3 shadow-sm">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-light-border dark:border-slate-800/60">
                      <FiAlertTriangle className="text-amber-500" size={18} />
                      <h5 className="font-bold text-sm uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        Threats (T)
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {activeTab.data.swot.threats.map((item, i) => (
                        <li key={i} className="text-xs text-dark-secondary dark:text-[#94A3B8] flex items-start gap-2 leading-relaxed">
                          <span className="text-amber-500 shrink-0 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Latest News Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text flex items-center gap-2">
                  <FiList className="text-brand-primary" /> Catalyst & Latest News
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeTab.data.news.map((item, i) => (
                    <div key={i} className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between group shadow-sm">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500">
                          <span className="uppercase tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-[#1E293B] rounded-md text-[10px]">
                            {item.source}
                          </span>
                          <span className="flex items-center gap-1 text-[10px]">
                            <FiClock /> {item.date}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-light-text dark:text-dark-text group-hover:text-brand-primary transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-dark-secondary dark:text-[#94A3B8] line-clamp-3 leading-relaxed font-medium">
                          {item.summary}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-light-border dark:border-slate-855 flex items-center justify-end">
                        <button className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1">
                          <span>Read Full Article</span>
                          <FiArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (30%) - Investment Recommendation Card */}
            <div className="w-full lg:w-[30%] lg:sticky lg:top-24">
              <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 space-y-6 shadow-sm">
                
                {/* Header */}
                <div className="border-b border-light-border dark:border-slate-800/80 pb-4 space-y-2">
                  <h4 className="font-bold text-light-text dark:text-dark-text text-base flex items-center gap-2">
                    <FiAward className="text-brand-primary" /> Recommendation
                  </h4>
                  <p className="text-xs text-dark-secondary dark:text-slate-550">
                    AI recommendation evaluation and horizon guide
                  </p>
                </div>

                {/* Decision Badge */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-dark-secondary dark:text-slate-500 uppercase tracking-widest block">Decision</span>
                  <div className={`w-full py-2.5 rounded-xl border text-center text-sm font-bold tracking-widest ${
                    activeTab.data.recommendation.decision.toUpperCase() === 'INVEST'
                      ? 'bg-brand-success/15 text-brand-success border-brand-success/30'
                      : 'bg-brand-danger/15 text-brand-danger border-brand-danger/30'
                  }`}>
                    {activeTab.data.recommendation.decision.toUpperCase()}
                  </div>
                </div>

                {/* Parameters (Confidence & Risk) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-900/40 border border-light-border dark:border-slate-800/60 p-3.5 rounded-xl">
                    <span className="text-[10px] font-bold text-dark-secondary dark:text-slate-500 uppercase block mb-0.5">Confidence</span>
                    <span className="text-base font-extrabold text-light-text dark:text-dark-text">
                      {activeTab.data.recommendation.confidence}
                    </span>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-900/40 border border-light-border dark:border-slate-800/60 p-3.5 rounded-xl">
                    <span className="text-[10px] font-bold text-dark-secondary dark:text-slate-500 uppercase block mb-0.5">Risk Level</span>
                    <span className={`text-base font-extrabold ${
                      activeTab.data.recommendation.riskLevel.toLowerCase() === 'low'
                        ? 'text-brand-success'
                        : activeTab.data.recommendation.riskLevel.toLowerCase() === 'medium'
                        ? 'text-amber-500'
                        : 'text-brand-danger'
                    }`}>
                      {activeTab.data.recommendation.riskLevel}
                    </span>
                  </div>
                </div>

                {/* Reasoning summary */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-dark-secondary dark:text-slate-500 uppercase tracking-wider block">Suggested Strategy</span>
                  <p className="text-xs text-dark-secondary dark:text-[#94A3B8] bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-light-border dark:border-slate-800/40 leading-relaxed font-medium">
                    {activeTab.data.recommendation.suggestedStrategy}
                  </p>
                </div>

                {/* Pros list */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-brand-success uppercase tracking-wider block">Key Arguments (Pros)</span>
                  <ul className="space-y-1.5">
                    {activeTab.data.recommendation.pros.slice(0, 3).map((pro, i) => (
                      <li key={i} className="text-xs text-dark-secondary dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                        <FiCheckCircle className="text-brand-success shrink-0 mt-0.5" size={13} />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons list */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-brand-danger uppercase tracking-wider block">Key Concerns (Cons)</span>
                  <ul className="space-y-1.5">
                    {activeTab.data.recommendation.cons.slice(0, 3).map((con, i) => (
                      <li key={i} className="text-xs text-dark-secondary dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                        <FiXCircle className="text-brand-danger shrink-0 mt-0.5" size={13} />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Horizon & Strategy details */}
                <div className="space-y-3 pt-4 border-t border-light-border dark:border-slate-800/80 text-xs">
                  <div>
                    <span className="font-bold text-light-text dark:text-slate-400 block mb-1">Horizon</span>
                    <p className="text-dark-secondary dark:text-slate-300 font-medium">
                      {activeTab.data.recommendation.investmentHorizon}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        );
      })()}

    </div>
  );
}
