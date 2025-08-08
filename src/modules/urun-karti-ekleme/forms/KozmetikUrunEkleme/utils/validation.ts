// ✅ Kozmetik Form Validasyon Kuralları
import { FormData } from '../hooks/useFormData';
import { hasShadesField, hasVolumeField, hasSPFField } from './helpers';
import { useTranslation } from "react-i18next";
export interface ValidationError {
  field: keyof FormData | string;
  message: string;
}
export function validateStep(step: number, formData: FormData): ValidationError[] {
  const errors: ValidationError[] = [];
  switch (step) {
    case 1:
      // Ürün Bilgileri
      if (!formData.name.trim()) {
        errors.push({
          field: 'name',
          message: t("common.ürün_adı_gereklidir")
        });
      }
      if (!formData.mainCategory) {
        errors.push({
          field: 'mainCategory',
          message: t("common.ana_kategori_seçilmelidir")
        });
      }
      if (!formData.subCategory1) {
        errors.push({
          field: 'subCategory1',
          message: t("common.alt_kategori_seçilmelidir")
        });
      }
      if (!formData.price || formData.price <= 0) {
        errors.push({
          field: 'price',
          message: t("common.geçerli_bir_fiyat_girilmelidir")
        });
      }
      break;
    case 2:
      // Kozmetik Özellikleri
      if (formData.skinTypes.length === 0) {
        errors.push({
          field: 'skinTypes',
          message: t("common.en_az_bir_cilt_tipi_seçilmelidir")
        });
      }
      if (!formData.gender) {
        errors.push({
          field: 'gender',
          message: t("common.cinsiyet_seçilmelidir")
        });
      }

      // Hacim kontrolü (kategori gerektiriyorsa)
      if (hasVolumeField(formData.subCategory1) && !formData.volume) {
        errors.push({
          field: 'volume',
          message: t("common.bu_kategori_için_hacim_ağırlık_bilgisi_gereklidir")
        });
      }

      // Renk kontrolü (kategori gerektiriyorsa)
      if (hasShadesField(formData.subCategory1)) {
        if (!formData.hasShades) {
          errors.push({
            field: 'hasShades',
            message: t("common.bu_kategori_için_renk_seçenekleri_gereklidir")
          });
        } else if (formData.selectedShades.length === 0) {
          errors.push({
            field: 'selectedShades',
            message: t("common.en_az_bir_renk_seçilmelidir")
          });
        }
      }

      // SPF kontrolü (güneş kremi için)
      if (hasSPFField(formData.subCategory1) && !formData.spfValue) {
        errors.push({
          field: 'spfValue',
          message: t("common.güneş_kremi_için_spf_değeri_gereklidir")
        });
      }
      if (!formData.usageInstructions.trim()) {
        errors.push({
          field: 'usageInstructions',
          message: t("common.kullanım_talimatları_gereklidir")
        });
      }
      break;
    case 3:
      // Ürün Görselleri
      // Görseller zorunlu değil ama limit kontrolü
      if (formData.images && formData.images.length > 10) {
        errors.push({
          field: 'images',
          message: t("common.en_fazla_10_görsel_yükleyebilirsiniz")
        });
      }
      break;
    case 4:
      // Önizleme & Kaydet (SEO opsiyonel)
      // Tüm SEO alanları opsiyonel
      if (formData.seoTitle.length > 60) {
        errors.push({
          field: 'seoTitle',
          message: t("common.seo_başlığı_60_karakteri_geçmemelidir")
        });
      }
      if (formData.seoDescription.length > 160) {
        errors.push({
          field: 'seoDescription',
          message: t("common.seo_açıklaması_160_karakteri_geçmemelidir")
        });
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