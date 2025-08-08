// ✅ Form Validasyon Kuralları
import { FormData } from '../hooks/useFormData';
import { useTranslation } from "react-i18next";
export interface ValidationError {
  field: string;
  message: string;
}
export function validateStep(step: number, formData: FormData): ValidationError[] {
  const errors: ValidationError[] = [];
  switch (step) {
    case 1:
      // Ürün Bilgileri (Kategori + Temel + Özellikler)
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
      if (!formData.name || !formData.name.trim()) {
        errors.push({
          field: 'name',
          message: t("common.ürün_adı_zorunludur")
        });
      }
      if (formData.name && formData.name.length > 0 && formData.name.length < 3) {
        errors.push({
          field: 'name',
          message: t("common.ürün_adı_en_az_3_karakter_olmalıdır")
        });
      }
      // Açıklama artık opsiyonel
      break;
    case 2:
      // Varyantlar & Fiyat
      // Varyantlar artık opsiyonel - basit ürünler için
      // Sadece fiyat zorunlu
      if (formData.price <= 0) {
        errors.push({
          field: 'price',
          message: t("common.geçerli_bir_fiyat_girilmelidir")
        });
      }
      // Stok artık tamamen opsiyonel
      break;
    case 3:
      // Ürün Görselleri
      // Görseller opsiyonel - kullanıcı isterse ekler
      // Minimum 1 görsel önerilir ama zorunlu değil
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
      break;
  }
  return errors;
}
export function validateForm(formData: FormData): ValidationError[] {
  const allErrors: ValidationError[] = [];
  for (let step = 1; step <= 4; step++) {
    const stepErrors = validateStep(step, formData);
    allErrors.push(...stepErrors);
  }
  return allErrors;
}
export function isStepValid(step: number, formData: FormData): boolean {
  return validateStep(step, formData).length === 0;
}