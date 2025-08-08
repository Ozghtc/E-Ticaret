import { useTranslation } from "react-i18next";
// 🔍 SEO Yardımcı Fonksiyonlar

export function generateSeoTitle(productName: string, category?: string, brand?: string): string {
  // Girdiyi temizle ve analiz et
  const cleanName = cleanInput(productName);
  const cleanCategory = category ? cleanInput(category) : '';

  // Akıllı başlık oluştur
  const parts = [productName];
  if (brand) parts.push(brand);
  if (cleanCategory) parts.push(`${cleanCategory} Modelleri`);
  parts.push(t("common.hemen_satın_al"));
  let title = parts.join(' | ');

  // 60 karakter sınırı
  if (title.length > 60) {
    return title.substring(0, 57) + '...';
  }
  return title;
}
export function generateSeoDescription(productName: string, description: string, category?: string, brand?: string, features?: string[], price?: number): string {
  const cleanName = cleanInput(productName);
  const cleanCategory = category ? cleanInput(category) : '';
  let seoDesc = `${cleanName}`;
  if (cleanCategory) {
    seoDesc += ` kategorisindeki en yeni ${cleanCategory.toLowerCase()} modellerine göz atın.`;
  } else {
    seoDesc += t("common.ürününü");
  }
  if (brand) {
    seoDesc += ` ${brand} kalitesiyle`;
  }
  if (price && price > 0) {
    seoDesc += ` uygun fiyatlarla`;
  }
  seoDesc += t("common.şimdi_satın_alın");
  if (features && features.length > 0) {
    seoDesc += ` ${features.slice(0, 1).join('')} özelliği.`;
  }
  seoDesc += t("common.hızlı_kargo_güvenli_ödeme");

  // 160 karakter sınırı
  if (seoDesc.length > 160) {
    return seoDesc.substring(0, 157) + '...';
  }
  return seoDesc;
}
export function generateKeywords(productName: string, category: string, brand?: string, features?: string[]): string[] {
  const keywords = new Set<string>();
  const cleanName = cleanInput(productName);
  const cleanCategory = cleanInput(category);

  // Temel kelimeler
  keywords.add(cleanName.toLowerCase());
  keywords.add(cleanCategory.toLowerCase());
  if (brand) {
    keywords.add(brand.toLowerCase());
    keywords.add(`${brand.toLowerCase()} ${cleanCategory.toLowerCase()}`);
  }

  // Ürün adından kelimeler
  const nameWords = cleanName.toLowerCase().split(' ');
  nameWords.forEach(word => {
    if (word.length > 3) {
      keywords.add(word);
    }
  });

  // Kategori kombinasyonları
  keywords.add(`${cleanCategory.toLowerCase()} fiyatları`);
  keywords.add(`ucuz ${cleanCategory.toLowerCase()}`);
  keywords.add(`${cleanCategory.toLowerCase()} modelleri`);
  keywords.add(`online ${cleanCategory.toLowerCase()}`);

  // Özelliklerden kelimeler
  if (features) {
    features.forEach(feature => {
      if (feature.length > 2) {
        keywords.add(feature.toLowerCase());
      }
    });
  }

  // Genel e-ticaret kelimeleri
  keywords.add('online satış');
  keywords.add('uygun fiyat');
  keywords.add(t("common.hızlı_kargo"));
  keywords.add('güvenli ödeme');

  // Array'e çevir ve sırala
  return Array.from(keywords).sort();
}

// 🧹 Girdi temizleme fonksiyonu
function cleanInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input.trim().replace(/\s+/g, ' ') // Çoklu boşlukları tek boşluğa çevir
  .replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/g, '') // Özel karakterleri kaldır
  .replace(/^\w/, c => c.toUpperCase()); // İlk harfi büyük yap
}

// 🎯 Akıllı SEO oluşturma (Ana fonksiyon)
export function generateSmartSeo(productName: string, category: string, brand?: string, description?: string, price?: number, features?: string[]) {
  // Girdi kontrolü
  if (!productName || productName.length < 3) {
    return {
      title: t("common.ürün_adı_çok_kısa"),
      description: t("common.lütfen_en_az_3_karakter_ürün_adı_girin"),
      keywords: [],
      score: 0,
      suggestions: [t("common.ürün_adını_daha_açıklayıcı_yapın")]
    };
  }
  const title = generateSeoTitle(productName, category, brand);
  const seoDescription = generateSeoDescription(productName, description || '', category, brand, features, price);
  const keywords = generateKeywords(productName, category, brand, features);
  const {
    score,
    suggestions
  } = analyzeSeoScore(title, seoDescription, keywords);
  return {
    title,
    description: seoDescription,
    keywords,
    score,
    suggestions
  };
}
export function analyzeSeoScore(title: string, description: string, keywords: string[]): {
  score: number;
  suggestions: string[];
} {
  let score = 0;
  const suggestions: string[] = [];

  // Başlık analizi (25 puan)
  if (title.length >= 30 && title.length <= 60) {
    score += 25;
  } else if (title.length > 0) {
    score += 15;
    suggestions.push(t("common.başlık_30_60_karakter_arasında_olmalı"));
  } else {
    suggestions.push(t("common.başlık_zorunludur"));
  }

  // Açıklama analizi (25 puan)
  if (description.length >= 120 && description.length <= 160) {
    score += 25;
  } else if (description.length > 0) {
    score += 15;
    suggestions.push(t("common.meta_açıklama_120_160_karakter_arasında_olmalı"));
  } else {
    suggestions.push(t("common.meta_açıklama_zorunludur"));
  }

  // Anahtar kelime analizi (25 puan)
  if (keywords.length >= 5 && keywords.length <= 10) {
    score += 25;
  } else if (keywords.length > 0) {
    score += 15;
    suggestions.push(t("common.5_10_arasında_anahtar_kelime_ideal"));
  } else {
    suggestions.push('Anahtar kelimeler ekleyin');
  }

  // İçerik kalitesi (25 puan)
  const hasProductName = title.toLowerCase().includes('ürün') || title.toLowerCase().includes(t("common.satış"));
  const hasCallToAction = description.toLowerCase().includes(t("common.satın_al")) || description.toLowerCase().includes(t("common.sipariş"));
  if (hasProductName && hasCallToAction) {
    score += 25;
  } else {
    score += 10;
    suggestions.push(t("common.başlık_ve_açıklamada_satış_odaklı_kelimeler_kullanın"));
  }
  return {
    score,
    suggestions
  };
}
export function slugify(text: string): string {
  return text.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}
export function generateMetaTags(title: string, description: string, keywords: string[], imageUrl?: string) {
  return {
    title,
    description,
    keywords: keywords.join(', '),
    'og:title': title,
    'og:description': description,
    'og:image': imageUrl || '',
    'og:type': 'product',
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': imageUrl || ''
  };
}