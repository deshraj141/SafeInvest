import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrendingUp, FiCpu, FiClock, FiCheckCircle, FiSearch, FiZap, FiActivity, FiGlobe } from 'react-icons/fi';
import useLocalStorage from '../hooks/useLocalStorage';
import { POPULAR_COMPANIES } from '../constants/companies';
import CompanyCard from '../components/CompanyCard';

export default function Dashboard() {
  const navigate = useNavigate();

  // Load state from localStorage
  const [recentSearches] = useLocalStorage('safeinvest_recent_searches', []);
  const [recentActivity, setRecentActivity] = useLocalStorage('safeinvest_recent_activity', [
    { id: 'act-1', text: 'Viewed dashboard overview', time: 'Today', icon: 'FiHome' },
    { id: 'act-2', text: 'System initialized successfully', time: 'Yesterday', icon: 'FiCheckCircle' }
  ]);
  const [stats, setStats] = useLocalStorage('safeinvest_stats', {
    companiesAnalyzed: 0,
    reportsGenerated: 0,
    avgTime: '3.8s',
    geminiStatus: 'Online'
  });

  // Automatically count stats based on local storage updates
  useEffect(() => {
    // Unique companies is size of recent searches
    const uniqueCompanies = new Set(recentSearches.map(item => item.toUpperCase())).size;
    const reports = recentSearches.length;
    
    setStats(prev => ({
      ...prev,
      companiesAnalyzed: uniqueCompanies || 0,
      reportsGenerated: reports || 0
    }));
  }, [recentSearches, setStats]);

  // Market mock data
  const marketData = [
    { name: 'S&P 500', value: '5,540.28', change: '+1.15%', isUp: true },
    { name: 'NASDAQ Composite', value: '18,352.96', change: '+1.78%', isUp: true },
    { name: 'AI Sector Index', value: '3,842.10', change: '+3.42%', isUp: true },
    { name: 'Semiconductor Index', value: '5,290.45', change: '+2.85%', isUp: true }
  ];

  // AI Prompts
  const aiTips = [
    { text: 'Analyze Apple', action: () => navigate('/analyze?query=AAPL') },
    { text: 'Compare Tesla vs BYD', action: () => navigate('/compare?q=TSLA,BYD') },
    { text: 'Explain PE Ratio', action: () => navigate('/about#pe-ratio') },
    { text: 'What is ROE?', action: () => navigate('/about#roe') }
  ];

  const handleAnalyzeCompany = (query) => {
    // Record activity
    const newAct = {
      id: `act-${Date.now()}`,
      text: `Analyzed ${query}`,
      time: 'Just now'
    };
    setRecentActivity(prev => [newAct, ...prev].slice(0, 10));
    navigate(`/analyze?query=${query}`);
  };

  const scrollToPopular = () => {
    document.getElementById('popular-companies')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* ================= WELCOME BANNER ================= */}
      <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 text-light-text dark:text-dark-text shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <FiZap className="text-brand-primary animate-pulse" size={16} />
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-primary">
              AI-Powered Financials
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-light-text dark:text-[#F8FAFC]">
            Welcome to SafeInvest.ai
          </h2>
          <p className="text-dark-secondary dark:text-[#94A3B8] text-sm leading-relaxed font-medium">
            Generate AI-powered investment research reports for any publicly traded company in seconds. Gain enterprise-grade insights and SWOT evaluations instantly.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => navigate('/analyze')}
              className="px-5 py-2.5 bg-brand-primary hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all duration-150 flex items-center gap-2"
            >
              <FiSearch size={16} />
              <span>Analyze Company</span>
            </button>
            <button 
              onClick={scrollToPopular}
              className="px-5 py-2.5 border border-brand-primary text-brand-primary hover:bg-brand-primary/5 font-bold rounded-xl text-sm transition-all duration-150"
            >
              Browse Popular Companies
            </button>
          </div>
        </div>
      </div>

      {/* ================= QUICK STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-dark-secondary dark:text-[#94A3B8]">Companies Analyzed</span>
            <FiGlobe size={18} />
          </div>
          <div className="text-2xl font-extrabold text-light-text dark:text-[#F8FAFC]">
            {stats.companiesAnalyzed}
          </div>
          <p className="text-xs text-dark-secondary dark:text-[#94A3B8] mt-1 font-medium">Unique ticker queries</p>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-dark-secondary dark:text-[#94A3B8]">Reports Generated</span>
            <FiTrendingUp size={18} />
          </div>
          <div className="text-2xl font-extrabold text-light-text dark:text-[#F8FAFC]">
            {stats.reportsGenerated}
          </div>
          <p className="text-xs text-dark-secondary dark:text-[#94A3B8] mt-1 font-medium">Total research sessions</p>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-dark-secondary dark:text-[#94A3B8]">Avg Analysis Time</span>
            <FiClock size={18} />
          </div>
          <div className="text-2xl font-extrabold text-light-text dark:text-[#F8FAFC]">
            {stats.avgTime}
          </div>
          <p className="text-xs text-dark-secondary dark:text-[#94A3B8] mt-1 font-medium">Gemini API generation latency</p>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-dark-secondary dark:text-[#94A3B8]">Gemini Status</span>
            <FiCheckCircle className="text-brand-success" size={18} />
          </div>
          <div className="text-2xl font-extrabold text-brand-success flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-success animate-ping"></span>
            <span>{stats.geminiStatus}</span>
          </div>
          <p className="text-xs text-dark-secondary dark:text-[#94A3B8] mt-1 font-medium">Model: gemini-3.5-flash</p>
        </div>
      </div>

      {/* ================= MARKET OVERVIEW ================= */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-light-text dark:text-dark-text flex items-center gap-2">
          <FiActivity className="text-brand-primary" /> Market Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketData.map((item) => (
            <div 
              key={item.name} 
              className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 shadow-sm"
            >
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                {item.name}
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-lg font-bold text-light-text dark:text-[#F8FAFC]">
                  {item.value}
                </span>
                <span className="text-xs font-bold text-brand-success px-2 py-0.5 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-md">
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MAIN CONTENT SPLIT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Popular Companies & AI Tips */}
        <div className="lg:col-span-2 space-y-8">
          {/* Popular Companies */}
          <div id="popular-companies" className="scroll-mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-light-text dark:text-dark-text">
                Popular Companies
              </h3>
              <span className="text-xs text-dark-secondary dark:text-slate-450 font-medium">Click to instantly research</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {POPULAR_COMPANIES.slice(0, 8).map((comp) => (
                <CompanyCard 
                  key={comp.ticker} 
                  company={comp} 
                  onAnalyze={handleAnalyzeCompany} 
                />
              ))}
            </div>
            
            {/* Extended popular list */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {POPULAR_COMPANIES.slice(8).map((comp) => (
                <CompanyCard 
                  key={comp.ticker} 
                  company={comp} 
                  onAnalyze={handleAnalyzeCompany} 
                />
              ))}
            </div>
          </div>

          {/* AI Tips */}
          <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FiCpu className="text-brand-primary" size={18} />
              <h3 className="font-bold text-light-text dark:text-dark-text text-base">
                AI Quick Actions
              </h3>
            </div>
            <p className="text-xs text-dark-secondary dark:text-[#94A3B8] mb-4 font-medium">
              Click any of the quick-action prompts below to analyze or understand key investment terms instantly.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {aiTips.map((tip) => (
                <button
                  key={tip.text}
                  onClick={tip.action}
                  className="px-3.5 py-2 bg-slate-50 hover:bg-brand-primary/10 dark:bg-slate-800/40 dark:hover:bg-brand-primary/20 text-xs font-semibold text-light-text dark:text-[#94A3B8] hover:text-brand-primary dark:hover:text-brand-primary border border-light-border dark:border-slate-800/60 rounded-xl transition-all duration-150"
                >
                  {tip.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Recent Searches & Activities */}
        <div className="space-y-8">
          {/* Recent Searches */}
          <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-light-text dark:text-dark-text mb-4 text-base flex items-center gap-2">
              <FiSearch className="text-[#6B7280] dark:text-[#94A3B8]" /> Recent Searches
            </h3>
            
            {recentSearches.length === 0 ? (
              <div className="text-center py-6 text-xs text-dark-secondary dark:text-slate-500 font-medium">
                No recent searches. Try analyzing Apple (AAPL) or Nvidia (NVDA).
              </div>
            ) : (
              <div className="space-y-2">
                {recentSearches.slice(-6).reverse().map((ticker, index) => (
                  <button
                    key={`${ticker}-${index}`}
                    onClick={() => handleAnalyzeCompany(ticker)}
                    className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-brand-primary/5 dark:bg-slate-800/20 dark:hover:bg-brand-primary/10 border border-light-border dark:border-slate-800/60 rounded-xl text-xs font-bold text-light-text dark:text-[#94A3B8] hover:text-brand-primary dark:hover:text-brand-primary flex items-center justify-between transition-all duration-150"
                  >
                    <span>{ticker.toUpperCase()}</span>
                    <FiCpu size={12} className="opacity-40" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-light-text dark:text-dark-text mb-4 text-base flex items-center gap-2">
              <FiActivity className="text-[#6B7280] dark:text-[#94A3B8]" /> Recent Activity
            </h3>
            
            <div className="relative border-l border-slate-200 dark:border-slate-800 pl-4 ml-2 space-y-6">
              {recentActivity.map((act) => (
                <div key={act.id} className="relative group">
                  {/* Indicator Dot */}
                  <span className="absolute -left-6 top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-brand-primary ring-4 ring-white dark:ring-[#111827]">
                    <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-light-text dark:text-[#94A3B8] block">
                      {act.text}
                    </span>
                    <span className="text-[10px] text-dark-secondary dark:text-slate-500 font-medium">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
