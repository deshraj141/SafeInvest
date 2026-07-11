import React from 'react';
import Logo from './Logo';
import { FiArrowUpRight } from 'react-icons/fi';

/**
 * Clickable card displaying key info for popular companies with equal height and bottom-aligned button.
 */
export default function CompanyCard({ company, onAnalyze }) {
  const { name, ticker, domain, industry, description } = company;

  return (
    <div 
      onClick={() => onAnalyze(ticker || name)}
      className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 hover:border-brand-primary dark:hover:border-brand-primary/50 rounded-2xl p-6 transition-all duration-200 cursor-pointer group flex flex-col justify-between h-full relative"
    >
      <div className="space-y-4">
        {/* Logo and Ticker */}
        <div className="flex items-start justify-between">
          <Logo name={name} domain={domain} size="md" />
          <span className="text-xs font-extrabold px-2.5 py-0.5 bg-slate-100 dark:bg-[#1E293B] text-[#6B7280] dark:text-[#94A3B8] rounded-md uppercase tracking-wider">
            {ticker}
          </span>
        </div>
        
        {/* Name and Industry Badge */}
        <div>
          <h3 className="font-extrabold text-light-text dark:text-dark-text text-base mb-1.5 group-hover:text-brand-primary transition-colors duration-150">
            {name}
          </h3>
          <span className="text-[10px] font-extrabold px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded-md uppercase tracking-wider inline-block">
            {industry}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-dark-secondary dark:text-[#94A3B8] line-clamp-3 leading-relaxed font-medium">
          {description}
        </p>
      </div>

      {/* Button aligned at the bottom */}
      <div className="mt-6 pt-4 border-t border-light-border dark:border-slate-800/60">
        <button 
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-brand-primary text-brand-primary hover:bg-brand-primary/5 text-xs font-bold transition-all duration-150"
          onClick={(e) => {
            e.stopPropagation();
            onAnalyze(ticker || name);
          }}
        >
          <span>Analyze Report</span>
          <FiArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
