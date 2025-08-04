// 🧴 Kozmetik Form State Yönetimi
import { useState, useCallback } from 'react';

export interface FormData {
  // Kategori Bilgileri
  mainCategory: string;
  subCategory1: string;
  subCategory2: string;
  
  // Temel Ürün Bilgileri
  name: string;
  brand: string;
  model: string;
  barcode: string;
  origin: string;
  description: string;
  
  // Fiyat & Stok
  price: number;
  originalPrice: number;
  purchasePrice: number;
  invoiceNumber: string;
  stock: number;
  vatRate: string;
  preparationTime: string;
  
  // Kozmetik Özel - Cilt Tipi
  skinTypes: string[]; // Uygun olduğu cilt tipleri
  ageGroup: string;
  gender: string;
  
  // Kozmetik Özel - Renk/Ton
  hasShades: boolean; // Renk seçenekleri var mı
  selectedShades: string[]; // Seçilen renkler/tonlar
  shadeCategory: string; // skin-tone, lip-color, eye-color, nail-color
  
  // Kozmetik Özel - Fiziksel Özellikler
  volume: string; // Hacim/ağırlık (15ml, 50g vs)
  spfValue: string; // SPF değeri (güneş kremi için)
  finishType: string; // Mat, satin, glossy vs
  coverageType: string; // Light, medium, full (fondöten için)
  
  // Kozmetik Özel - İçerik Özellikleri
  contentFeatures: string[]; // Vegan, organik, cruelty-free vs
  specialFeatures: string[]; // Waterproof, long-lasting vs
  
  // Kozmetik Özel - Kullanım
  usageInstructions: string; // Kullanım talimatları
  ingredients: string; // İçerik listesi
  warnings: string; // Uyarılar
  expiryDate: string; // Son kullanma tarihi
  
  // Görseller
  images: File[];
  
  // SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export const initialFormData: FormData = {
  // Kategori
  mainCategory: '',
  subCategory1: '',
  subCategory2: '',
  
  // Temel bilgiler
  name: '',
  brand: '',
  model: '',
  barcode: '',
  origin: 'Türkiye',
  description: '',
  
  // Fiyat & Stok
  price: 0,
  originalPrice: 0,
  purchasePrice: 0,
  invoiceNumber: '',
  stock: 0,
  vatRate: '20',
  preparationTime: '1-3 gün',
  
  // Kozmetik özel
  skinTypes: [],
  ageGroup: '',
  gender: '',
  
  // Renk/Ton
  hasShades: false,
  selectedShades: [],
  shadeCategory: '',
  
  // Fiziksel
  volume: '',
  spfValue: '',
  finishType: '',
  coverageType: '',
  
  // İçerik
  contentFeatures: [],
  specialFeatures: [],
  
  // Kullanım
  usageInstructions: '',
  ingredients: '',
  warnings: '',
  expiryDate: '',
  
  // Görseller
  images: [],
  
  // SEO
  seoTitle: '',
  seoDescription: '',
  seoKeywords: []
};

export function useFormData() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateMultipleFields = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 4)); // 4 adım
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, 4))); // 4 adım
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
  }, []);

  return {
    formData,
    currentStep,
    updateFormData,
    updateMultipleFields,
    nextStep,
    prevStep,
    goToStep,
    resetForm
  };
}