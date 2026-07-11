import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiTrendingUp, FiSun, FiMoon, FiMenu, FiX, FiCpu, FiLayers, FiInfo } from 'react-icons/fi';

/**
 * Shared Page Layout wrapper with vertical sidebar on the left and sticky top navbar
 */
export default function Layout({ children, isDarkMode, toggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: FiTrendingUp },
    { name: 'Analyze', path: '/analyze', icon: FiCpu },
    { name: 'Compare', path: '/compare', icon: FiLayers },
    { name: 'About', path: '/about', icon: FiInfo },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/analyze') return 'Analyze Company';
    if (path === '/compare') return 'Compare Assets';
    if (path === '/about') return 'About Project';
    return 'SafeInvest.ai';
  };

  return (
    <div className="min-h-screen flex bg-light-bg dark:bg-[#0F172A] transition-colors duration-200">
      
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-white dark:bg-[#1E293B] border-r border-light-border dark:border-slate-800/80 z-20">
        {/* Top: Logo */}
        <div className="h-16 px-6 border-b border-light-border dark:border-slate-800/80 flex items-center select-none shrink-0">
          <NavLink to="/" className="flex items-center gap-2">
            <FiTrendingUp className="text-brand-primary" size={20} />
            <span className="font-extrabold text-base tracking-wider text-light-text dark:text-[#F8FAFC]">
              SafeInvest.ai
            </span>
          </NavLink>
        </div>

        {/* Middle: Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-155 ${
                  isActive
                    ? 'bg-brand-primary/10 text-brand-primary'
                    : 'text-[#6B7280] dark:text-[#94A3B8] hover:text-[#111827] dark:hover:text-[#F8FAFC] hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-3 bottom-3 w-1 bg-brand-primary rounded-r-full" />
                  )}
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: Sidebar Footer */}
        <div className="p-4 border-t border-light-border dark:border-slate-800/80">
          <a 
            href="https://deshraj-portfolio.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold hover:text-brand-primary transition-colors block text-center select-none"
          >
            SafeInvest.ai © 2026
          </a>
        </div>
      </aside>

      {/* ================= MAIN CONTAINER AREA ================= */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        
        {/* Sticky Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-[#0F172A]/85 backdrop-blur-md border-b border-light-border dark:border-slate-800/80 flex items-center justify-between px-6">
          {/* Left: Hamburger menu (mobile) & current page title */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-light-border dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-dark-secondary"
            >
              {isMobileMenuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
            
            {/* Mobile-only logo indicator */}
            <div className="flex md:hidden items-center gap-1.5 mr-2">
              <FiTrendingUp className="text-brand-primary" size={16} />
              <span className="font-black text-sm tracking-widest text-[#111827] dark:text-[#F8FAFC]">SafeInvest</span>
            </div>
            
            <h1 className="text-base md:text-lg font-bold text-light-text dark:text-[#F8FAFC] tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          {/* Right: Theme Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-light-border dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-dark-secondary hover:text-light-text dark:hover:text-[#F8FAFC] transition-colors duration-150"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex flex-col pt-16 bg-white dark:bg-[#0F172A] animate-fade-in">
            <nav className="flex-1 px-6 py-8 space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold transition-all duration-150 ${
                      isActive
                        ? 'bg-brand-primary/10 text-brand-primary'
                        : 'text-[#6B7280] dark:text-[#94A3B8] hover:text-[#111827] dark:hover:text-[#F8FAFC] hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Content View */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
          {children}
        </main>
      </div>

    </div>
  );
}
