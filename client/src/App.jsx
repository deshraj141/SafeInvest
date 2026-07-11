import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Analyze from './pages/Analyze';
import Compare from './pages/Compare';
import About from './pages/About';

export default function App() {
  // Sync dark/light theme selection in localStorage
  const [isDarkMode, setIsDarkMode] = useLocalStorage('safeinvest_theme', true);

  // Synchronize CSS class modifiers on document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <Router>
      <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/about" element={<About />} />
          {/* Fallback route */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}
