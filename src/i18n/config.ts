import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import trCommon from '../locales/tr/common.json';
import trAdmin from '../locales/tr/admin.json';
import trProducts from '../locales/tr/products.json';
import trErrors from '../locales/tr/errors.json';

import enCommon from '../locales/en/common.json';
import enAdmin from '../locales/en/admin.json';
import enProducts from '../locales/en/products.json';
import enErrors from '../locales/en/errors.json';

import arCommon from '../locales/ar/common.json';
import arAdmin from '../locales/ar/admin.json';
import arProducts from '../locales/ar/products.json';
import arErrors from '../locales/ar/errors.json';

// Currency configurations
export const currencies = {
  TRY: { code: 'TRY', symbol: '₺', locale: 'tr-TR', name: 'Türk Lirası' },
  USD: { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', locale: 'de-DE', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'British Pound' },
  AED: { code: 'AED', symbol: 'د.إ', locale: 'ar-AE', name: 'UAE Dirham' },
  SAR: { code: 'SAR', symbol: 'ر.س', locale: 'ar-SA', name: 'Saudi Riyal' }
};

// Exchange rates (güncellenebilir)
export const exchangeRates = {
  TRY: 1,
  USD: 32.5,
  EUR: 35.2,
  GBP: 41.3,
  AED: 8.85,
  SAR: 8.67
};

const resources = {
  tr: {
    common: trCommon,
    admin: trAdmin,
    products: trProducts,
    errors: trErrors
  },
  en: {
    common: enCommon,
    admin: enAdmin,
    products: enProducts,
    errors: enErrors
  },
  ar: {
    common: arCommon,
    admin: arAdmin,
    products: arProducts,
    errors: arErrors
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    debug: false,
    
    interpolation: {
      escapeValue: false // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    
    ns: ['common', 'admin', 'products', 'errors'],
    defaultNS: 'common'
  });

export default i18n;
