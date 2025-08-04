// 🎯 Form State Yönetimi
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
  season: string;
  gender: string;
  ageGroup: string;
  description: string;
  
  // Fiyat & Stok
  price: number;
  originalPrice: number;
  purchasePrice: number;
  invoiceNumber: string;
  stock: number;
  vatRate: string;
  preparationTime: string;
  
  // Varyantlar
  selectedSizes: string[];
  selectedColors: string[];
  
  // Özellikler
  fabricType: string;
  fitType: string;
  pattern: string;
  neckType: string;
  sleeveType: string;
  closureType: string;
  careInstructions: string[];
  
  // Görseller
  images: File[];
  
  // SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export const initialFormData: FormData = {
  mainCategory: '',
  subCategory1: '',
  subCategory2: '',
  name: '',
  brand: '',
  model: '',
  barcode: '',
  origin: '',
  season: '',
  gender: '',
  ageGroup: '',
  description: '',
  price: 0,
  originalPrice: 0,
  purchasePrice: 0,
  invoiceNumber: '',
  stock: 0,
  vatRate: '%20',
  preparationTime: '1 Gün',
  selectedSizes: [],
  selectedColors: [],
  fabricType: '',
  fitType: '',
  pattern: '',
  neckType: '',
  sleeveType: '',
  closureType: '',
  careInstructions: [],
  images: [],
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

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, 4)));
  }, []);

  return {
    formData,
    currentStep,
    updateFormData,
    updateMultipleFields,
    resetForm,
    nextStep,
    prevStep,
    goToStep
  };
}