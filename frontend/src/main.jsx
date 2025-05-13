import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import React, { useState, useEffect, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';

// 1. Define context HERE (no need to import from App.jsx)
export const DarkModeContext = createContext();

const DarkModeWrapper = ({ children }) => {
  // 2. State management
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // 3. Side effects
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    document.body.className = darkMode ? 'dark-mode' : '';
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // 4. Context value
  const contextValue = {
    darkMode,
    toggleDarkMode: () => setDarkMode(!darkMode)
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};

// 5. Render
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <DarkModeWrapper>
        <App />
      </DarkModeWrapper>
    </React.StrictMode>
  </BrowserRouter>
);