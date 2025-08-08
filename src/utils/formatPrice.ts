import { useLanguageCurrency } from '../context/LanguageCurrencyContext';

// Global formatPrice function for non-component usage
export function formatPrice(price: number, currency?: string): string {
  const selectedCurrency = currency || localStorage.getItem('currency') || 'TRY';
  
  const currencyLocales: Record<string, string> = {
    TRY: 'tr-TR',
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    AED: 'ar-AE',
    SAR: 'ar-SA'
  };
  
  return new Intl.NumberFormat(currencyLocales[selectedCurrency] || 'tr-TR', {
    style: 'currency',
    currency: selectedCurrency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
}

// Hook for component usage
export function useFormatPrice() {
  const { formatPrice } = useLanguageCurrency();
  return formatPrice;
}
