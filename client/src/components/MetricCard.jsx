import React from 'react';

/**
 * Aesthetic component for displaying key financial metrics
 */
export default function MetricCard({ label, value, icon: Icon, trend, description }) {
  return (
    <div className="bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800 rounded-2xl p-6 hover:border-brand-primary dark:hover:border-brand-primary/50 transition-all duration-200 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-dark-secondary dark:text-slate-400">
            {label}
          </span>
          {Icon && (
            <Icon className="text-slate-400 dark:text-slate-500 group-hover:text-brand-primary transition-colors duration-200" size={16} />
          )}
        </div>
        <div className="text-xl md:text-2xl font-bold text-light-text dark:text-dark-text tracking-tight">
          {value || '—'}
        </div>
      </div>
      {(trend || description) && (
        <div className="mt-3 pt-3 border-t border-light-border dark:border-slate-800/60 flex items-center justify-between text-xs">
          {description && (
            <span className="text-dark-secondary dark:text-slate-400 italic">
              {description}
            </span>
          )}
          {trend && (
            <span className={`font-semibold ${
              trend.startsWith('+') || trend.toLowerCase().includes('high') || trend.toLowerCase().includes('strong')
                ? 'text-brand-success' 
                : trend.startsWith('-') || trend.toLowerCase().includes('low') || trend.toLowerCase().includes('debt')
                ? 'text-brand-danger' 
                : 'text-brand-primary'
            }`}>
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
