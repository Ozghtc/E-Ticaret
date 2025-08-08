// Paket Tanımlama Modülü - Utilities
import { Paket } from '../types';

// Renk sınıfları tanımları
import { useTranslation } from "react-i18next";
export const colorClasses = {
  blue: 'from-blue-500 to-blue-600 border-blue-200',
  green: 'from-green-500 to-green-600 border-green-200',
  purple: 'from-purple-500 to-purple-600 border-purple-200',
  orange: 'from-orange-500 to-orange-600 border-orange-200',
  red: 'from-red-500 to-red-600 border-red-200',
  indigo: 'from-indigo-500 to-indigo-600 border-indigo-200'
};

// Paket için border color al
export const getBorderColor = (renk: string) => {
  return colorClasses[renk as keyof typeof colorClasses] || colorClasses.blue;
};

// İndirim yüzdesini hesapla
export const calculateDiscountPercentage = (currentPrice: number, oldPrice?: number): number => {
  if (!oldPrice || oldPrice === 0) return 0;
  return Math.round((1 - currentPrice / oldPrice) * 100);
};

// Tab'a göre background gradient class al
export const getTabBackgroundClass = (activeTab: string) => {
  switch (activeTab) {
    case 'eticaret':
      return 'bg-gradient-to-br from-blue-50 to-cyan-50';
    case 'premium':
      return 'bg-gradient-to-br from-purple-50 to-indigo-50';
    case 'sms':
      return 'bg-gradient-to-br from-green-50 to-emerald-50';
    default:
      return 'bg-gradient-to-br from-blue-50 to-cyan-50';
  }
};

// Paket ID oluştur
export const generatePaketId = (): string => {
  return `paket-${Date.now()}`;
};

// SMS başına fiyat hesapla
export const calculateSmsPrice = (totalPrice: number, smsCount: number): string => {
  if (smsCount === 0) return '0.000';
  return (totalPrice / smsCount).toFixed(3);
};

// Form doğrulama
export const validatePaketForm = (formData: any, ozellikler: any[]): {
  isValid: boolean;
  message?: string;
} => {
  if (!formData.adi.trim()) {
    return {
      isValid: false,
      message: t("common.paket_adı_zorunludur")
    };
  }
  if (formData.fiyat <= 0) {
    return {
      isValid: false,
      message: t("common.geçerli_bir_fiyat_giriniz")
    };
  }
  if (ozellikler.length === 0) {
    return {
      isValid: false,
      message: t("common.en_az_bir_özellik_eklemelisiniz")
    };
  }
  return {
    isValid: true
  };
};

// LocalStorage paket işlemleri
export const saveToLocalStorage = (key: string, data: Paket[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`${data.length} paket localStorage'a kaydedildi`);
  } catch (error) {
    console.error(t("common.localstorage_kaydetme_hatası"), error);
  }
};
export const loadFromLocalStorage = (key: string): Paket[] | null => {
  try {
    const stored = localStorage.getItem(key);
    if (stored && stored !== '[]') {
      const parsed = JSON.parse(stored);
      console.log(`${parsed.length} paket localStorage'dan yüklendi`);
      return parsed;
    }
  } catch (error) {
    console.error(t("common.localstorage_yükleme_hatası"), error);
  }
  return null;
};
export const clearLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
    console.log('LocalStorage temizlendi');
  } catch (error) {
    console.error(t("common.localstorage_temizleme_hatası"), error);
  }
};