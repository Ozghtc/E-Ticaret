import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { currencies, exchangeRates } from '../i18n/config';

interface LanguageCurrencyContextType {
  language: string;
  currency: string;
  setLanguage: (lang: string) => void;
  setCurrency: (curr: string) => void;
  formatPrice: (price: number) => string;
  convertPrice: (price: number, fromCurrency?: string) => number;
  availableLanguages: { code: string; name: string; flag: string }[];
  availableCurrencies: typeof currencies;
}

const LanguageCurrencyContext = createContext<LanguageCurrencyContextType | undefined>(undefined);

export const availableLanguages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

export const LanguageCurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState(() => 
    localStorage.getItem('language') || 'tr'
  );
  const [currency, setCurrencyState] = useState(() => 
    localStorage.getItem('currency') || 'TRY'
  );

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language, i18n]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
    localStorage.setItem('currency', curr);
  };

  const convertPrice = (price: number, fromCurrency: string = 'TRY'): number => {
    if (fromCurrency === currency) return price;
    
    // Convert to TRY first if not already
    const priceInTRY = fromCurrency === 'TRY' 
      ? price 
      : price * exchangeRates[fromCurrency as keyof typeof exchangeRates];
    
    // Then convert to target currency
    if (currency === 'TRY') return priceInTRY;
    
    return priceInTRY / exchangeRates[currency as keyof typeof exchangeRates];
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);
    const currencyConfig = currencies[currency as keyof typeof currencies];
    
    return new Intl.NumberFormat(currencyConfig.locale, {
      style: 'currency',
      currency: currencyConfig.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(convertedPrice);
  };

  return (
    <LanguageCurrencyContext.Provider
      value={{
        language,
        currency,
        setLanguage,
        setCurrency,
        formatPrice,
        convertPrice,
        availableLanguages,
        availableCurrencies: currencies
      }}
    >
      {children}
    </LanguageCurrencyContext.Provider>
  );
};

export const useLanguageCurrency = () => {
  const context = useContext(LanguageCurrencyContext);
  if (!context) {
    throw new Error('useLanguageCurrency must be used within LanguageCurrencyProvider');
  }
  return context;
};
