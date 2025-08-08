import { useTranslation } from "react-i18next";
// 🧴 Kozmetik Ürün Özellikleri

export interface SpecOption {
  id: string;
  name: string;
  emoji: string;
}

// Cilt Tipi Uygunluğu
export const skinTypes: SpecOption[] = [{
  id: 'normal',
  name: 'Normal Cilt',
  emoji: '😊'
}, {
  id: 'dry',
  name: 'Kuru Cilt',
  emoji: '🏜️'
}, {
  id: 'oily',
  name: t("common.yağlı_cilt"),
  emoji: '💧'
}, {
  id: 'combination',
  name: 'Karma Cilt',
  emoji: '⚖️'
}, {
  id: 'sensitive',
  name: 'Hassas Cilt',
  emoji: '🌸'
}, {
  id: 'mature',
  name: t("common.yaşlı_cilt"),
  emoji: '⏰'
}, {
  id: 'acne-prone',
  name: t("common.akneye_eğilimli"),
  emoji: '🎯'
}, {
  id: 'all-skin',
  name: t("common.tüm_cilt_tipleri"),
  emoji: '✨'
}];

// İçerik Özellikleri
export const contentFeatures: SpecOption[] = [{
  id: 'vegan',
  name: 'Vegan',
  emoji: '🌱'
}, {
  id: 'organic',
  name: 'Organik',
  emoji: '🍃'
}, {
  id: 'cruelty-free',
  name: t("common.hayvan_deneyi_yapılmamış"),
  emoji: '🐰'
}, {
  id: 'paraben-free',
  name: t("common.paraben_i_çermez"),
  emoji: '🚫'
}, {
  id: 'sulfate-free',
  name: t("common.sülfat_i_çermez"),
  emoji: '🚫'
}, {
  id: 'fragrance-free',
  name: t("common.parfüm_i_çermez"),
  emoji: '🚫'
}, {
  id: 'alcohol-free',
  name: t("common.alkol_i_çermez"),
  emoji: '🚫'
}, {
  id: 'hypoallergenic',
  name: 'Hipoalerjenik',
  emoji: '🛡️'
}, {
  id: 'dermatologist-tested',
  name: t("common.dermatolojik_test_edilmiş"),
  emoji: '👨‍⚕️'
}, {
  id: 'natural',
  name: t("common.doğal_i_çerikli"),
  emoji: '🌿'
}];

// Finish/Bitiriş Tipi
export const finishTypes: SpecOption[] = [{
  id: 'matte',
  name: 'Mat',
  emoji: '🎭'
}, {
  id: 'satin',
  name: 'Saten',
  emoji: '✨'
}, {
  id: 'glossy',
  name: 'Parlak',
  emoji: '💎'
}, {
  id: 'dewy',
  name: 'Nemli',
  emoji: '💧'
}, {
  id: 'natural',
  name: t("common.doğal"),
  emoji: '🌿'
}, {
  id: 'shimmer',
  name: t("common.işıltılı"),
  emoji: '✨'
}, {
  id: 'metallic',
  name: 'Metalik',
  emoji: '🪙'
}];

// Coverage/Kaplama Tipi (Fondöten, Kapatıcı için)
export const coverageTypes: SpecOption[] = [{
  id: 'light',
  name: 'Hafif Kaplama',
  emoji: '🌤️'
}, {
  id: 'medium',
  name: 'Orta Kaplama',
  emoji: '☁️'
}, {
  id: 'full',
  name: 'Tam Kaplama',
  emoji: '🌧️'
}, {
  id: 'buildable',
  name: 'Katmanlanabilir',
  emoji: '🏗️'
}];

// Hacim/Ağırlık Seçenekleri
export const volumeOptions: SpecOption[] = [
// Sıvı ürünler (ml)
{
  id: '15ml',
  name: '15 ml',
  emoji: '🧴'
}, {
  id: '30ml',
  name: '30 ml',
  emoji: '🧴'
}, {
  id: '50ml',
  name: '50 ml',
  emoji: '🧴'
}, {
  id: '100ml',
  name: '100 ml',
  emoji: '🧴'
}, {
  id: '150ml',
  name: '150 ml',
  emoji: '🧴'
}, {
  id: '200ml',
  name: '200 ml',
  emoji: '🧴'
}, {
  id: '250ml',
  name: '250 ml',
  emoji: '🧴'
}, {
  id: '500ml',
  name: '500 ml',
  emoji: '🧴'
},
// Katı ürünler (gram)
{
  id: '5g',
  name: '5 g',
  emoji: '⚖️'
}, {
  id: '10g',
  name: '10 g',
  emoji: '⚖️'
}, {
  id: '15g',
  name: '15 g',
  emoji: '⚖️'
}, {
  id: '20g',
  name: '20 g',
  emoji: '⚖️'
}, {
  id: '30g',
  name: '30 g',
  emoji: '⚖️'
}, {
  id: '50g',
  name: '50 g',
  emoji: '⚖️'
}, {
  id: '100g',
  name: '100 g',
  emoji: '⚖️'
}];

// SPF Değerleri
export const spfValues: SpecOption[] = [{
  id: 'spf15',
  name: 'SPF 15',
  emoji: '☀️'
}, {
  id: 'spf20',
  name: 'SPF 20',
  emoji: '☀️'
}, {
  id: 'spf30',
  name: 'SPF 30',
  emoji: '🌞'
}, {
  id: 'spf50',
  name: 'SPF 50',
  emoji: '🌞'
}, {
  id: 'spf50+',
  name: 'SPF 50+',
  emoji: '🔥'
}];

// Yaş Grubu
export const ageGroups: SpecOption[] = [{
  id: 'teen',
  name: t("common.genç_13_19"),
  emoji: '👩‍🎓'
}, {
  id: 'young-adult',
  name: t("common.genç_yetişkin_20_30"),
  emoji: '👩‍💼'
}, {
  id: 'adult',
  name: t("common.yetişkin_30_50"),
  emoji: '👩‍⚕️'
}, {
  id: 'mature',
  name: 'Olgun (50+)',
  emoji: '👩‍🦳'
}, {
  id: 'all-ages',
  name: t("common.tüm_yaşlar"),
  emoji: '👥'
}];

// Cinsiyet
export const genderOptions: SpecOption[] = [{
  id: 'women',
  name: t("common.kadın"),
  emoji: '👩'
}, {
  id: 'men',
  name: 'Erkek',
  emoji: '👨'
}, {
  id: 'unisex',
  name: 'Unisex',
  emoji: '👥'
}];

// Özel Özellikler
export const specialFeatures: SpecOption[] = [{
  id: 'waterproof',
  name: t("common.su_geçirmez"),
  emoji: '💧'
}, {
  id: 'long-lasting',
  name: t("common.uzun_süre_kalıcı"),
  emoji: '⏰'
}, {
  id: 'quick-dry',
  name: t("common.hızlı_kuruyan"),
  emoji: '💨'
}, {
  id: 'anti-aging',
  name: t("common.yaşlanma_karşıtı"),
  emoji: '⏪'
}, {
  id: 'moisturizing',
  name: 'Nemlendirici',
  emoji: '💧'
}, {
  id: 'mattifying',
  name: t("common.matlaştırıcı"),
  emoji: '🎭'
}, {
  id: 'pore-minimizing',
  name: t("common.gözenek_küçültücü"),
  emoji: '🔍'
}, {
  id: 'brightening',
  name: t("common.aydınlatıcı"),
  emoji: '✨'
}, {
  id: 'firming',
  name: t("common.sıkılaştırıcı"),
  emoji: '💪'
}, {
  id: 'exfoliating',
  name: 'Peeling Etkili',
  emoji: '🌀'
}];