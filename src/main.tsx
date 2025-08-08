import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageCurrencyProvider } from './context/LanguageCurrencyContext';
import './i18n/config';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageCurrencyProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LanguageCurrencyProvider>
  </StrictMode>
);
