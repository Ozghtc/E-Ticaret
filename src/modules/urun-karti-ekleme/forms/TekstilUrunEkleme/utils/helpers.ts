// 🛠️ Yardımcı Fonksiyonlar
import { formatPrice as globalFormatPrice } from '../../../../../utils/formatPrice';
import { useTranslation } from "react-i18next";
export function formatPrice(price: number): string {
  return globalFormatPrice(price);
}
export function generateSKU(name: string, size: string, color: string): string {
  const nameCode = name.substring(0, 3).toUpperCase();
  const sizeCode = size.substring(0, 2).toUpperCase();
  const colorCode = color.substring(0, 2).toUpperCase();
  const randomCode = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${nameCode}-${sizeCode}-${colorCode}-${randomCode}`;
}
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= currentPrice) return 0;
  return Math.round((originalPrice - currentPrice) / originalPrice * 100);
}
export function slugify(text: string): string {
  return text.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}
export function generateSeoTitle(name: string, brand: string, category: string): string {
  const parts = [name];
  if (brand) parts.push(brand);
  if (category) parts.push(category);
  return parts.join(' - ');
}
export function generateSeoDescription(name: string, description: string, brand: string): string {
  let seoDesc = `${name} ürününü`;
  if (brand) seoDesc += ` ${brand} markasından`;
  seoDesc += t("common.uygun_fiyatlarla_satın_alın");
  if (description) {
    const shortDesc = description.substring(0, 100);
    seoDesc += ` ${shortDesc}`;
  }
  return seoDesc.substring(0, 160);
}
export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: t("common.sadece_jpg_png_ve_webp_formatları_desteklenir")
    };
  }
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Dosya boyutu 5MB\'dan küçük olmalıdır'
    };
  }
  return {
    valid: true
  };
}
export function getStepTitle(step: number): string {
  const titles = {
    1: 'Ürün Bilgileri',
    2: 'Varyantlar & Fiyat',
    3: 'Ürün Görselleri',
    4: t("common.önizleme_kaydet")
  };
  return titles[step as keyof typeof titles] || t("common.bilinmeyen_adım");
}
export function getStepIcon(step: number): string {
  const icons = {
    1: '📝',
    2: '🎨',
    3: '📸',
    4: '✅'
  };
  return icons[step as keyof typeof icons] || '📋';
}