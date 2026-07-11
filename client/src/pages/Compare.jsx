import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiLayers, FiPlus, FiX, FiCheck, FiCpu, FiAward, FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';
import { POPULAR_COMPANIES } from '../constants/companies';
import { compareCompaniesApi } from '../services/api';
import Logo from '../components/Logo';

export default function Compare() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get('q');

  // Input states
  const [inputVal, setInputVal] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [comparisonData, setComparisonData] = useState(null);

  // Handle load query from dashboard / external link
  useEffect(() => {
    if (qParam) {
      const tickers = qParam.split(',').map(t => t.trim().toUpperCase()).filter(Boolean);
      if (tickers.length >= 2) {
        setSelectedCompanies(tickers);
        triggerComparison(tickers);
      }
      setSearchParams({});
    }
  }, [qParam]);

  const addCompany = (ticker) => {
    setErrorMsg("");
    const formatted = ticker.trim().toUpperCase();
    if (!formatted) return;
    
    if (selectedCompanies.includes(formatted)) {
      setErrorMsg(`${formatted} is already selected.`);
      return;
    }

    if (selectedCompanies.length >= 4) {
      setErrorMsg("You can compare a maximum of 4 companies.");
      return;
    }

    setSelectedCompanies([...selectedCompanies, formatted]);
    setInputVal("");
  };

  const removeCompany = (ticker) => {
    setSelectedCompanies(selectedCompanies.filter(c => c !== ticker));
    setErrorMsg("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputVal.trim()) {
        addCompany(inputVal.trim());
      }
    }
  };

  const triggerComparison = async (companiesList = selectedCompanies) => {
    if (companiesList.length < 2) {
      setErrorMsg("Please select at least 2 companies to compare.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setComparisonData(null);

    try {
      const result = await compareCompaniesApi(companiesList);
      if (result.success && result.data) {
        setComparisonData(result.data);
      } else {
        throw new Error(result.message || "Failed to generate comparison matrix.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred while generating the comparison. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* ================= SELECTION PANEL ================= */}
      <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800 rounded-2xl p-6 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text flex items-center justify-center gap-2">
            <FiLayers className="text-brand-primary" /> Compare Investments
          </h2>
          <p className="text-xs text-dark-secondary dark:text-slate-400">
            Select between 2 to 4 stock tickers or companies to evaluate their financials side-by-side using AI.
          </p>
        </div>

        {/* Selected chips and search bar */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {selectedCompanies.length > 0 && (
            <div className="flex flex-wrap gap-2 py-2 px-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-light-border dark:border-slate-850">
              <span className="text-[10px] font-bold text-dark-secondary dark:text-slate-500 uppercase self-center mr-2">Selected ({selectedCompanies.length}):</span>
              {selectedCompanies.map((ticker) => (
                <div 
                  key={ticker}
                  className="flex items-center gap-1.5 px-3 py-1 bg-brand-primary/10 border border-brand-primary/30 rounded-lg text-xs font-bold text-brand-primary"
                >
                  <span>{ticker}</span>
                  <button 
                    onClick={() => removeCompany(ticker)}
                    className="p-0.5 rounded-full hover:bg-brand-primary/20"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="relative flex items-center">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Type ticker (e.g. AAPL) and press Enter or click (+)..."
              className="w-full pl-4 pr-16 py-3.5 bg-white dark:bg-slate-900 border border-light-border dark:border-slate-800 rounded-xl outline-none focus:border-brand-primary text-sm font-medium"
            />
            <button
              onClick={() => {
                if (inputVal.trim()) addCompany(inputVal.trim());
              }}
              disabled={isLoading || !inputVal.trim()}
              className="absolute right-3 p-2 bg-brand-primary hover:bg-blue-700 disabled:bg-slate-105 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 rounded-lg transition-all"
            >
              <FiPlus size={16} />
            </button>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => triggerComparison()}
              disabled={isLoading || selectedCompanies.length < 2}
              className="px-8 py-3 bg-brand-primary hover:bg-blue-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 dark:disabled:text-slate-600 font-bold rounded-xl text-sm transition-all"
            >
              {isLoading ? "Comparing Companies..." : "Compare Companies"}
            </button>
          </div>

          {errorMsg && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-brand-danger text-xs font-semibold flex items-center justify-between gap-4 shadow-sm animate-fade-in">
              <div className="flex items-center gap-2">
                <FiAlertTriangle size={16} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
              <button 
                onClick={() => triggerComparison()}
                className="px-3 py-1 bg-brand-danger text-white rounded-lg text-[10px] font-bold hover:bg-red-600 transition-colors shrink-0"
              >
                Retry
              </button>
            </div>
          )}
        </div>

        {/* Popular Company Suggestions */}
        <div className="border-t border-light-border dark:border-slate-800/80 pt-5">
          <span className="text-[10px] font-bold text-dark-secondary dark:text-slate-500 uppercase tracking-widest block text-center mb-4">Quick Add Popular Assets</span>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {POPULAR_COMPANIES.slice(0, 10).map((comp) => {
              const isSelected = selectedCompanies.includes(comp.ticker);
              return (
                <button
                  key={comp.ticker}
                  onClick={() => isSelected ? removeCompany(comp.ticker) : addCompany(comp.ticker)}
                  disabled={isLoading}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                    isSelected 
                      ? 'bg-brand-primary/10 border-brand-primary text-brand-primary font-bold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-light-border dark:border-slate-800 text-light-text dark:text-[#94A3B8] hover:border-slate-400 dark:hover:border-slate-600'
                  }`}
                >
                  <Logo name={comp.name} domain={comp.domain} size="sm" />
                  <span>{comp.ticker}</span>
                  {isSelected ? <FiCheck size={12} /> : <FiPlus className="opacity-40" size={12} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= LOADING MATRIX ================= */}
      {isLoading && (
        <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800 rounded-2xl p-16 flex flex-col items-center justify-center space-y-6 shadow-sm min-h-[450px]">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
            <FiLayers className="absolute text-brand-primary animate-pulse" size={24} />
          </div>
          <div className="text-center space-y-1">
            <p className="text-lg font-bold text-light-text dark:text-dark-text animate-pulse">
              Comparing Selected Assets...
            </p>
            <p className="text-xs text-dark-secondary dark:text-slate-400">
              Gemini is evaluating comparative metrics, growth opportunities, and final winners.
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

      {/* ================= NO DATA STATE ================= */}
      {!isLoading && !comparisonData && (
        <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800 rounded-2xl p-12 text-center space-y-4 min-h-[300px] flex flex-col items-center justify-center">
          <FiLayers size={40} className="text-slate-300 dark:text-slate-700" />
          <h3 className="text-lg font-bold text-light-text dark:text-dark-text">No comparison active</h3>
          <p className="text-xs text-dark-secondary dark:text-slate-400 max-w-sm">
            Add at least two companies to compare above and click "Compare Companies" to review the side-by-side assessment matrix.
          </p>
        </div>
      )}

      {/* ================= RESULTS MATRIX PANEL ================= */}
      {!isLoading && comparisonData && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Comparison Table */}
          <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-light-border dark:border-slate-800 bg-slate-50/50 dark:bg-[#1E293B]/20">
              <h3 className="font-extrabold text-light-text dark:text-dark-text text-base">
                Side-by-Side Comparison Matrix
              </h3>
            </div>
            
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-light-border dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
                    <th className="sticky top-0 bg-slate-50 dark:bg-[#1E293B] p-4 text-xs font-bold uppercase tracking-wider text-dark-secondary dark:text-slate-400 w-1/4 z-10 border-b border-light-border dark:border-slate-800">
                      Metric / Parameter
                    </th>
                    {selectedCompanies.map((ticker) => (
                      <th key={ticker} className="sticky top-0 bg-slate-50 dark:bg-[#1E293B] p-4 text-xs font-bold uppercase tracking-wider text-light-text dark:text-dark-text text-center border-l border-b border-light-border dark:border-slate-800 z-10">
                        {ticker}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border dark:divide-slate-800/80">
                  {comparisonData.comparisonTable.map((row, idx) => (
                    <tr 
                      key={row.metric} 
                      className={`transition-colors ${
                        idx % 2 === 0 
                          ? 'bg-slate-50/15 dark:bg-[#1E293B]/10 hover:bg-slate-50/40 dark:hover:bg-slate-800/10' 
                          : 'bg-white dark:bg-[#111827] hover:bg-slate-50/40 dark:hover:bg-slate-800/10'
                      }`}
                    >
                      <td className="p-4 text-xs font-bold text-light-text dark:text-[#94A3B8]">
                        {row.metric}
                      </td>
                      {selectedCompanies.map((ticker) => {
                        const cellVal = row.companies[ticker] || row.companies[ticker.toLowerCase()] || "—";
                        const isWinner = row.winner?.toUpperCase() === ticker.toUpperCase();
                        
                        return (
                          <td 
                            key={ticker} 
                            className={`p-4 text-xs text-center border-l border-light-border dark:border-slate-800 font-semibold transition-all ${
                              isWinner 
                                ? 'bg-emerald-500/5 dark:bg-emerald-500/10 text-brand-success font-extrabold' 
                                : 'text-[#6B7280] dark:text-[#94A3B8]'
                            }`}
                          >
                            <div className="flex flex-col items-center justify-center gap-1">
                              <span>{cellVal}</span>
                              {isWinner && (
                                <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 bg-brand-success/15 rounded text-brand-success mt-0.5 font-extrabold">
                                  Best
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Winner Card */}
          <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 text-light-text dark:text-dark-text shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b border-light-border dark:border-slate-800/80 pb-6 mb-6">
              <div className="space-y-2">
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-[10px] font-bold text-amber-550 uppercase tracking-widest flex items-center gap-1.5 w-fit">
                  <FiAward /> Winner Evaluation
                </span>
                <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2 tracking-tight">
                  Best Investment: <span className="text-brand-primary">{comparisonData.winnerCard.bestInvestment}</span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Reasoning (2 columns) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-dark-secondary dark:text-slate-400 uppercase tracking-wider block">Comprehensive Logic & Reasoning</span>
                  <p className="text-xs md:text-sm text-[#6B7280] dark:text-[#94A3B8] leading-relaxed font-medium bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-light-border dark:border-slate-850">
                    {comparisonData.winnerCard.reasoning}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-dark-secondary dark:text-slate-400 uppercase tracking-wider block">Long-Term Compounding Potential</span>
                  <p className="text-xs md:text-sm text-[#6B7280] dark:text-[#94A3B8] leading-relaxed font-medium bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-light-border dark:border-slate-850">
                    {comparisonData.winnerCard.longTermPotential}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros */}
                  <div className="bg-slate-50 dark:bg-slate-900/40 border border-light-border dark:border-slate-800/80 rounded-xl p-4 space-y-2.5">
                    <span className="text-[10px] font-bold text-brand-success uppercase block">Winner Advantages</span>
                    <ul className="space-y-1.5 text-xs">
                      {comparisonData.winnerCard.pros.map((p, i) => (
                        <li key={i} className="text-[#6B7280] dark:text-[#94A3B8] flex items-start gap-2">
                          <span className="text-brand-success mt-0.5">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="bg-slate-50 dark:bg-slate-900/40 border border-light-border dark:border-slate-800/80 rounded-xl p-4 space-y-2.5">
                    <span className="text-[10px] font-bold text-brand-danger uppercase block">Winner Risks</span>
                    <ul className="space-y-1.5 text-xs">
                      {comparisonData.winnerCard.cons.map((c, i) => (
                        <li key={i} className="text-[#6B7280] dark:text-[#94A3B8] flex items-start gap-2">
                          <span className="text-brand-danger mt-0.5">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Target Profile & Actions (1 column) */}
              <div className="bg-slate-50 dark:bg-slate-900/20 border border-light-border dark:border-slate-800 rounded-xl p-6 space-y-6">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-dark-secondary dark:text-[#94A3B8] uppercase tracking-wider block">Suitable Investor Profile</span>
                  <p className="text-xs text-dark-secondary dark:text-[#94A3B8] bg-white dark:bg-[#111827] p-3 rounded-xl border border-light-border dark:border-slate-800/60 leading-relaxed font-medium">
                    {comparisonData.winnerCard.suitableInvestor}
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-light-border dark:border-slate-800/80 pt-4">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider block flex items-center gap-1.5">
                    <FiAlertCircle /> Strategy Action Plan
                  </span>
                  <p className="text-xs text-dark-secondary dark:text-[#94A3B8] bg-white dark:bg-[#111827] p-3 rounded-xl border border-light-border dark:border-slate-800/60 leading-relaxed font-bold">
                    {comparisonData.winnerCard.finalRecommendation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
