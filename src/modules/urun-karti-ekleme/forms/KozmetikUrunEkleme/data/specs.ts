// 🧴 Kozmetik Ürün Özellikleri

export interface SpecOption {
  id: string;
  name: string;
  emoji: string;
}

// Cilt Tipi Uygunluğu
export const skinTypes: SpecOption[] = [
  { id: 'normal', name: 'Normal Cilt', emoji: '😊' },
  { id: 'dry', name: 'Kuru Cilt', emoji: '🏜️' },
  { id: 'oily', name: 'Yağlı Cilt', emoji: '💧' },
  { id: 'combination', name: 'Karma Cilt', emoji: '⚖️' },
  { id: 'sensitive', name: 'Hassas Cilt', emoji: '🌸' },
  { id: 'mature', name: 'Yaşlı Cilt', emoji: '⏰' },
  { id: 'acne-prone', name: 'Akneye Eğilimli', emoji: '🎯' },
  { id: 'all-skin', name: 'Tüm Cilt Tipleri', emoji: '✨' }
];

// İçerik Özellikleri
export const contentFeatures: SpecOption[] = [
  { id: 'vegan', name: 'Vegan', emoji: '🌱' },
  { id: 'organic', name: 'Organik', emoji: '🍃' },
  { id: 'cruelty-free', name: 'Hayvan Deneyi Yapılmamış', emoji: '🐰' },
  { id: 'paraben-free', name: 'Paraben İçermez', emoji: '🚫' },
  { id: 'sulfate-free', name: 'Sülfat İçermez', emoji: '🚫' },
  { id: 'fragrance-free', name: 'Parfüm İçermez', emoji: '🚫' },
  { id: 'alcohol-free', name: 'Alkol İçermez', emoji: '🚫' },
  { id: 'hypoallergenic', name: 'Hipoalerjenik', emoji: '🛡️' },
  { id: 'dermatologist-tested', name: 'Dermatolojik Test Edilmiş', emoji: '👨‍⚕️' },
  { id: 'natural', name: 'Doğal İçerikli', emoji: '🌿' }
];

// Finish/Bitiriş Tipi
export const finishTypes: SpecOption[] = [
  { id: 'matte', name: 'Mat', emoji: '🎭' },
  { id: 'satin', name: 'Saten', emoji: '✨' },
  { id: 'glossy', name: 'Parlak', emoji: '💎' },
  { id: 'dewy', name: 'Nemli', emoji: '💧' },
  { id: 'natural', name: 'Doğal', emoji: '🌿' },
  { id: 'shimmer', name: 'Işıltılı', emoji: '✨' },
  { id: 'metallic', name: 'Metalik', emoji: '🪙' }
];

// Coverage/Kaplama Tipi (Fondöten, Kapatıcı için)
export const coverageTypes: SpecOption[] = [
  { id: 'light', name: 'Hafif Kaplama', emoji: '🌤️' },
  { id: 'medium', name: 'Orta Kaplama', emoji: '☁️' },
  { id: 'full', name: 'Tam Kaplama', emoji: '🌧️' },
  { id: 'buildable', name: 'Katmanlanabilir', emoji: '🏗️' }
];

// Hacim/Ağırlık Seçenekleri
export const volumeOptions: SpecOption[] = [
  // Sıvı ürünler (ml)
  { id: '15ml', name: '15 ml', emoji: '🧴' },
  { id: '30ml', name: '30 ml', emoji: '🧴' },
  { id: '50ml', name: '50 ml', emoji: '🧴' },
  { id: '100ml', name: '100 ml', emoji: '🧴' },
  { id: '150ml', name: '150 ml', emoji: '🧴' },
  { id: '200ml', name: '200 ml', emoji: '🧴' },
  { id: '250ml', name: '250 ml', emoji: '🧴' },
  { id: '500ml', name: '500 ml', emoji: '🧴' },
  
  // Katı ürünler (gram)
  { id: '5g', name: '5 g', emoji: '⚖️' },
  { id: '10g', name: '10 g', emoji: '⚖️' },
  { id: '15g', name: '15 g', emoji: '⚖️' },
  { id: '20g', name: '20 g', emoji: '⚖️' },
  { id: '30g', name: '30 g', emoji: '⚖️' },
  { id: '50g', name: '50 g', emoji: '⚖️' },
  { id: '100g', name: '100 g', emoji: '⚖️' }
];

// SPF Değerleri
export const spfValues: SpecOption[] = [
  { id: 'spf15', name: 'SPF 15', emoji: '☀️' },
  { id: 'spf20', name: 'SPF 20', emoji: '☀️' },
  { id: 'spf30', name: 'SPF 30', emoji: '🌞' },
  { id: 'spf50', name: 'SPF 50', emoji: '🌞' },
  { id: 'spf50+', name: 'SPF 50+', emoji: '🔥' }
];

// Yaş Grubu
export const ageGroups: SpecOption[] = [
  { id: 'teen', name: 'Genç (13-19)', emoji: '👩‍🎓' },
  { id: 'young-adult', name: 'Genç Yetişkin (20-30)', emoji: '👩‍💼' },
  { id: 'adult', name: 'Yetişkin (30-50)', emoji: '👩‍⚕️' },
  { id: 'mature', name: 'Olgun (50+)', emoji: '👩‍🦳' },
  { id: 'all-ages', name: 'Tüm Yaşlar', emoji: '👥' }
];

// Cinsiyet
export const genderOptions: SpecOption[] = [
  { id: 'women', name: 'Kadın', emoji: '👩' },
  { id: 'men', name: 'Erkek', emoji: '👨' },
  { id: 'unisex', name: 'Unisex', emoji: '👥' }
];

// Özel Özellikler
export const specialFeatures: SpecOption[] = [
  { id: 'waterproof', name: 'Su Geçirmez', emoji: '💧' },
  { id: 'long-lasting', name: 'Uzun Süre Kalıcı', emoji: '⏰' },
  { id: 'quick-dry', name: 'Hızlı Kuruyan', emoji: '💨' },
  { id: 'anti-aging', name: 'Yaşlanma Karşıtı', emoji: '⏪' },
  { id: 'moisturizing', name: 'Nemlendirici', emoji: '💧' },
  { id: 'mattifying', name: 'Matlaştırıcı', emoji: '🎭' },
  { id: 'pore-minimizing', name: 'Gözenek Küçültücü', emoji: '🔍' },
  { id: 'brightening', name: 'Aydınlatıcı', emoji: '✨' },
  { id: 'firming', name: 'Sıkılaştırıcı', emoji: '💪' },
  { id: 'exfoliating', name: 'Peeling Etkili', emoji: '🌀' }
];