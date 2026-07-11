import React from 'react';
import { FiX, FiBookmark, FiHome } from 'react-icons/fi';
import Logo from './Logo';

/**
 * Browser-style Workspace tabs component.
 * Allows switching between analyzed company reports, closing tabs, and tracking pin states.
 */
export default function WorkspaceTabs({ tabs, activeTabId, onSelectTab, onCloseTab, onTogglePin }) {
  return (
    <div className="border-b border-light-border dark:border-slate-800 bg-white dark:bg-[#1E293B] sticky top-0 z-10 select-none">
      <div className="flex items-center overflow-x-auto scrollbar-none px-4 gap-1.5 -mb-px">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const isMarket = tab.type === 'market';
          
          return (
            <div
              key={tab.id}
              className={`group flex items-center gap-2 px-3.5 py-2.5 border-b-2 text-xs md:text-sm font-bold whitespace-nowrap cursor-pointer transition-all duration-150 shrink-0 ${
                isActive
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-dark-secondary dark:text-slate-400 hover:text-light-text dark:hover:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-t-xl'
              }`}
              onClick={() => onSelectTab(tab.id)}
            >
              {/* Company Logo or Icon */}
              {isMarket ? (
                <FiHome size={14} className={isActive ? 'text-brand-primary' : 'text-slate-400'} />
              ) : (
                <Logo name={tab.name} domain={tab.data?.domain} size="sm" />
              )}
              
              <span>{tab.ticker || tab.name}</span>
              
              {/* Close button */}
              {!tab.isPinned && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                  className="p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors duration-150 ml-0.5"
                >
                  <FiX size={12} />
                </button>
              )}

              {/* Pin indicator */}
              {tab.isPinned && !isMarket && (
                <FiBookmark 
                  size={12} 
                  className="text-brand-primary fill-brand-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onTogglePin) onTogglePin(tab.id);
                  }}
                />
              )}

              {/* Pin option on hover */}
              {!tab.isPinned && onTogglePin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePin(tab.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all duration-150"
                  title="Pin Tab"
                >
                  <FiBookmark size={12} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
