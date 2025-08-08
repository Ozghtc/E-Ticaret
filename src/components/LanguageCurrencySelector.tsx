import React, { useState, useRef, useEffect } from 'react';
import { Globe, DollarSign, ChevronDown } from 'lucide-react';
import { useLanguageCurrency, availableLanguages } from '../context/LanguageCurrencyContext';
import { useTranslation } from 'react-i18next';

const LanguageCurrencySelector: React.FC = () => {
  const { t } = useTranslation();
  const { language, currency, setLanguage, setCurrency, availableCurrencies } = useLanguageCurrency();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setShowCurrencyMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguage = availableLanguages.find(l => l.code === language);
  const currentCurrency = availableCurrencies[currency as keyof typeof availableCurrencies];

  return (
    <div className="flex items-center gap-2">
      {/* Language Selector */}
      <div className="relative" ref={languageRef}>
        <button
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">
            {currentLanguage?.flag} {currentLanguage?.name}
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {showLanguageMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setShowLanguageMenu(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
                  language === lang.code ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Currency Selector */}
      <div className="relative" ref={currencyRef}>
        <button
          onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <DollarSign className="w-4 h-4" />
          <span className="text-sm font-medium">
            {currentCurrency?.symbol} {currentCurrency?.code}
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {showCurrencyMenu && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            {Object.entries(availableCurrencies).map(([code, config]) => (
              <button
                key={code}
                onClick={() => {
                  setCurrency(code);
                  setShowCurrencyMenu(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between ${
                  currency === code ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono text-lg">{config.symbol}</span>
                  <span className="text-sm">{config.name}</span>
                </span>
                <span className="text-xs text-gray-500">{code}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageCurrencySelector;
