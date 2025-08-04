// ✅ Kozmetik Form Validasyon Kuralları
import { FormData } from '../hooks/useFormData';
import { hasShadesField, hasVolumeField, hasSPFField } from './helpers';

export interface ValidationError {
  field: keyof FormData | string;
  message: string;
}

export function validateStep(step: number, formData: FormData): ValidationError[] {
  const errors: ValidationError[] = [];

  switch (step) {
    case 1: // Ürün Bilgileri
      if (!formData.name.trim()) {
        errors.push({ field: 'name', message: 'Ürün adı gereklidir' });
      }
      
      if (!formData.mainCategory) {
        errors.push({ field: 'mainCategory', message: 'Ana kategori seçilmelidir' });
      }
      
      if (!formData.subCategory1) {
        errors.push({ field: 'subCategory1', message: 'Alt kategori seçilmelidir' });
      }
      
      if (!formData.price || formData.price <= 0) {
        errors.push({ field: 'price', message: 'Geçerli bir fiyat girilmelidir' });
      }
      break;

    case 2: // Kozmetik Özellikleri
      if (formData.skinTypes.length === 0) {
        errors.push({ field: 'skinTypes', message: 'En az bir cilt tipi seçilmelidir' });
      }
      
      if (!formData.gender) {
        errors.push({ field: 'gender', message: 'Cinsiyet seçilmelidir' });
      }
      
      // Hacim kontrolü (kategori gerektiriyorsa)
      if (hasVolumeField(formData.subCategory1) && !formData.volume) {
        errors.push({ field: 'volume', message: 'Bu kategori için hacim/ağırlık bilgisi gereklidir' });
      }
      
      // Renk kontrolü (kategori gerektiriyorsa)
      if (hasShadesField(formData.subCategory1)) {
        if (!formData.hasShades) {
          errors.push({ field: 'hasShades', message: 'Bu kategori için renk seçenekleri gereklidir' });
        } else if (formData.selectedShades.length === 0) {
          errors.push({ field: 'selectedShades', message: 'En az bir renk seçilmelidir' });
        }
      }
      
      // SPF kontrolü (güneş kremi için)
      if (hasSPFField(formData.subCategory1) && !formData.spfValue) {
        errors.push({ field: 'spfValue', message: 'Güneş kremi için SPF değeri gereklidir' });
      }
      
      if (!formData.usageInstructions.trim()) {
        errors.push({ field: 'usageInstructions', message: 'Kullanım talimatları gereklidir' });
      }
      break;

    case 3: // Ürün Görselleri
      // Görseller zorunlu değil ama limit kontrolü
      if (formData.images && formData.images.length > 10) {
        errors.push({ field: 'images', message: 'En fazla 10 görsel yükleyebilirsiniz' });
      }
      break;

    case 4: // Önizleme & Kaydet (SEO opsiyonel)
      // Tüm SEO alanları opsiyonel
      if (formData.seoTitle.length > 60) {
        errors.push({ field: 'seoTitle', message: 'SEO başlığı 60 karakteri geçmemelidir' });
      }
      
      if (formData.seoDescription.length > 160) {
        errors.push({ field: 'seoDescription', message: 'SEO açıklaması 160 karakteri geçmemelidir' });
      }
      break;
  }

  return errors;
}

export function isStepValid(step: number, formData: FormData): boolean {
  const errors = validateStep(step, formData);
  return errors.length === 0;
}

export function validateForm(formData: FormData): ValidationError[] {
  const allErrors: ValidationError[] = [];

  for (let step = 1; step <= 4; step++) {
    const stepErrors = validateStep(step, formData);
    allErrors.push(...stepErrors);
  }

  return allErrors;
}

// Özel validasyon fonksiyonları
export function validatePrice(price: number): boolean {
  return price > 0 && price <= 100000; // Max 100k TL
}

export function validateStock(stock: number): boolean {
  return stock >= 0 && stock <= 999999; // Max 1M adet
}

export function validateImageCount(imageCount: number): boolean {
  return imageCount <= 10;
}

export function validateSeoTitle(title: string): boolean {
  return title.length <= 60;
}

export function validateSeoDescription(description: string): boolean {
  return description.length <= 160;
}