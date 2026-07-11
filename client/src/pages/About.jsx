import React from 'react';
import { 
  FiLayers, FiSearch, FiCpu, FiTrendingUp, FiCheckCircle, 
  FiInfo, FiSliders, FiShield, FiCode, FiUser, FiSettings 
} from 'react-icons/fi';

export default function About() {
  const steps = [
    { 
      number: '01', 
      title: 'Search Company', 
      desc: 'Type any global public company or stock ticker symbol into the search bar.', 
      icon: FiSearch,
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    },
    { 
      number: '02', 
      title: 'Gemini Analysis', 
      desc: 'Our Node.js server relays the request to Google Gemini API (gemini-3.5-flash) using structured prompts.', 
      icon: FiCpu,
      color: 'bg-violet-500/10 text-violet-500 border-violet-500/20'
    },
    { 
      number: '03', 
      title: 'Business Insights', 
      desc: 'Financials, competitive moat details, news catalyst, and SWOT vectors are compiled into workspace reports.', 
      icon: FiLayers,
      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    },
    { 
      number: '04', 
      title: 'Investment Recommendation', 
      desc: 'Our model calculates buy/sell recommendations, confidence, and target execution strategies.', 
      icon: FiTrendingUp,
      color: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
    }
  ];

  const techStack = [
    { category: 'Frontend Infrastructure', items: ['React 18', 'Vite', 'Tailwind CSS', 'React Router v6', 'React Icons', 'Axios'] },
    { category: 'Backend Engine', items: ['Node.js', 'Express.js', 'cors', 'dotenv', 'Nodemon'] },
    { category: 'Artificial Intelligence', items: ['Google Gemini API', 'Structured JSON schemas', 'gemini-3.5-flash'] }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Overview */}
      <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800 rounded-2xl p-6 space-y-4 text-center md:text-left">
        <span className="px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-xs font-semibold uppercase tracking-wider w-fit inline-block">
          About the Project
        </span>
        <h2 className="text-2xl font-black tracking-tight text-light-text dark:text-dark-text">
          SafeInvest.ai — AI Investment Co-Pilot
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#94A3B8] leading-relaxed font-medium">
          SafeInvest.ai is a modern, high-fidelity AI-powered investment research platform. It leverages Google's Gemini models to deliver real-time financial reporting, business viability assessments, SWOT analyses, and asset comparison matrices. Built for retail investors, developers, and portfolios.
        </p>
      </div>

      {/* How it works */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-light-text dark:text-dark-text flex items-center gap-2">
          <FiSettings className="text-brand-primary" /> How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number}
                className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800 rounded-2xl p-6 hover:border-brand-primary transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest">{step.number}</span>
                    <div className={`p-2 rounded-lg border ${step.color}`}>
                      <Icon size={18} />
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-light-text dark:text-dark-text mt-4">
                    {step.title}
                  </h4>
                  <p className="text-xs text-dark-secondary dark:text-slate-400 mt-2 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Technology & Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Technology Stack */}
        <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-light-text dark:text-dark-text text-base flex items-center gap-2 border-b border-light-border dark:border-slate-800 pb-3">
            <FiCode className="text-brand-primary" /> Technical Stack
          </h3>
          <div className="space-y-4">
            {techStack.map((stack) => (
              <div key={stack.category} className="space-y-2">
                <span className="text-[10px] font-bold text-dark-secondary dark:text-slate-500 uppercase tracking-wider block">{stack.category}</span>
                <div className="flex flex-wrap gap-1.5">
                  {stack.items.map((item) => (
                    <span 
                      key={item}
                      className="px-2.5 py-1 bg-slate-50 dark:bg-slate-900 border border-light-border dark:border-slate-800 text-[11px] font-semibold text-[#6B7280] dark:text-[#94A3B8] rounded-lg"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Info */}
        <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-light-text dark:text-dark-text text-base flex items-center gap-2 border-b border-light-border dark:border-slate-800 pb-3">
              <FiUser className="text-brand-primary" /> Developer Information
            </h3>
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary text-white font-bold flex items-center justify-center text-sm shadow-sm select-none shrink-0">
                  SE
                </div>
                <div>
                  <a 
                    href="https://deshraj-portfolio.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-bold text-light-text dark:text-dark-text hover:text-brand-primary transition-colors flex items-center gap-1"
                  >
                    <span>Software Engineer Portfolio</span>
                  </a>
                  <span className="text-[11px] text-dark-secondary dark:text-slate-500">MERN & AI Stack Integration</span>
                </div>
              </div>
              <p className="text-xs text-dark-secondary dark:text-slate-400 leading-relaxed font-medium">
                This project represents a showcase of modern full-stack engineering, demonstrating responsive interface design systems, Class-based dark-modes, browser workspace tab persistence via localStorage, and robust API handlers leveraging state-of-the-art Generative AI.
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-light-border dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold">Built with passion & precision.</span>
            <a 
              href="https://deshraj-portfolio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3.5 py-1.5 bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white rounded-lg text-xs font-bold transition-all duration-155 flex items-center gap-1 shrink-0"
            >
              <span>Visit Portfolio</span>
            </a>
          </div>
        </div>

      </div>

      {/* Disclaimers & Rules */}
      <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 space-y-3">
        <h4 className="font-bold text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2">
          <FiShield /> Financial Advisory Disclaimer
        </h4>
        <p className="text-xs text-amber-700 dark:text-slate-355 leading-relaxed font-medium">
          <strong>IMPORTANT:</strong> SafeInvest.ai is an AI-powered educational and research tool. All information, analyses, SWOT matrices, and buy/sell recommendations generated by the Google Gemini model are for general reference purposes only. They do not constitute certified financial advice, legal counsel, or buy/sell broker recommendations. Markets are volatile and carry high risk of capital loss. Always perform your own due diligence (DYOR) and consult a certified financial advisor before committing real capital.
        </p>
      </div>

    </div>
  );
}
