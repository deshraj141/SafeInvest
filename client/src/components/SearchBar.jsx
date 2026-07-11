import React, { useState } from 'react';
import { FiSearch, FiLoader } from 'react-icons/fi';

/**
 * Large Search Bar with premium search styles, loading indicators, and analyze trigger
 */
export default function SearchBar({ onSearch, isLoading, placeholder = "Search any public company..." }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-slate-400 dark:text-slate-500">
          {isLoading ? (
            <FiLoader className="animate-spin text-brand-primary" size={20} />
          ) : (
            <FiSearch size={20} />
          )}
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full pl-12 pr-32 py-3.5 bg-white dark:bg-[#111827] border border-light-border dark:border-slate-800/80 rounded-2xl focus:border-brand-primary dark:focus:border-brand-primary outline-none transition-all text-light-text dark:text-dark-text placeholder-slate-400 dark:placeholder-slate-500 font-medium text-base"
        />

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-2 px-5 py-2 bg-brand-primary hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-semibold rounded-2xl text-sm transition-all duration-155 disabled:text-slate-550 dark:disabled:text-slate-600 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <span>Analyzing</span>
            </>
          ) : (
            <span>Analyze</span>
          )}
        </button>
      </div>
    </form>
  );
}
