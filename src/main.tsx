
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { checkLovableScript } from './utils/lovableScript';
import { detectDirectFileLoad } from './utils/directLoadDetector';

// Check if this is a direct file load (file:// protocol)
// If it is, the detector will render an error page and return true
const isDirectLoad = detectDirectFileLoad();

// Only proceed with normal app initialization if not loaded directly
if (!isDirectLoad) {
  // Check for Lovable script
  checkLovableScript();

  // Check for user's preferred color scheme
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  // Set initial theme
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }

  // Performance optimization
  const startTime = performance.now();

  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');

  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );

  // Log application startup performance
  window.addEventListener('load', () => {
    const loadTime = performance.now() - startTime;
    console.log(`Application loaded in ${loadTime.toFixed(2)}ms`);
  });
}
