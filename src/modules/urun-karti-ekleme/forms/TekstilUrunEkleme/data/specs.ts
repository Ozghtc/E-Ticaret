import { useTranslation } from "react-i18next";
// 🧵 Tekstil Özellikleri
export interface SpecOption {
  id: string;
  name: string;
  emoji: string;
  options: string[];
}
export const fabricTypes: SpecOption = {
  id: 'fabric',
  name: t("common.kumaş_türü"),
  emoji: '🌿',
  options: ['Pamuk', 'Polyester', 'Viskon', 'Elastan', t("common.i_pek"), t("common.yün"), 'Keten', 'Denim', t("common.şifon"), 'Saten', 'Kadife', t("common.örme"), 'Dokuma', 'Polar', 'Kot', t("common.tül")]
};
export const fitTypes: SpecOption = {
  id: 'fit',
  name: t("common.kalıp_tipi"),
  emoji: '📏',
  options: ['Slim Fit', 'Regular Fit', 'Oversize', 'Boyfriend', 'Skinny', 'Straight', 'Wide Leg', 'Crop', 'High Waist', 'Low Waist', 'A-Line', 'Bodycon']
};
export const seasons: SpecOption = {
  id: 'season',
  name: 'Sezon',
  emoji: '☀️',
  options: ['Yaz', t("common.kış"), t("common.i_lkbahar"), 'Sonbahar', '4 Mevsim']
};
export const genders: SpecOption = {
  id: 'gender',
  name: 'Cinsiyet',
  emoji: '👩',
  options: [t("common.kadın"), 'Erkek', 'Unisex', t("common.çocuk")]
};
export const ageGroups: SpecOption = {
  id: 'ageGroup',
  name: 'Yaş Grubu',
  emoji: '👤',
  options: [t("common.yetişkin"), t("common.genç"), t("common.çocuk"), 'Bebek', t("common.0_2_yaş"), t("common.3_6_yaş"), t("common.7_12_yaş"), t("common.13_17_yaş")]
};
export const patterns: SpecOption = {
  id: 'pattern',
  name: 'Desen',
  emoji: '⬜',
  options: [t("common.düz"), t("common.çizgili"), 'Kareli', 'Puantiyeli', t("common.çiçekli"), 'Geometrik', 'Hayvan Deseni', t("common.yazılı"), 'Vintage', 'Etnik', 'Soyut', 'Desenli']
};
export const neckTypes: SpecOption = {
  id: 'neckType',
  name: 'Yaka Tipi',
  emoji: '🚴',
  options: ['Bisiklet Yaka', 'V Yaka', 'Polo Yaka', t("common.kapüşonlu"), t("common.balıkçı_yaka"), 'Hakim Yaka', t("common.gömlek_yaka"), 'Straplez', 'Tek Omuz', 'Yuvarlak Yaka']
};
export const sleeveTypes: SpecOption = {
  id: 'sleeveType',
  name: 'Kol Tipi',
  emoji: '🩳',
  options: [t("common.kısa_kol"), 'Uzun Kol', 'Kolsuz', t("common.askılı"), '3/4 Kol', t("common.yarım_kol"), 'Balon Kol', 'Dar Kol', 'Bol Kol', t("common.fırfırlı_kol")]
};
export const closureTypes: SpecOption = {
  id: 'closureType',
  name: 'Kapama Tipi',
  emoji: '🔘',
  options: [t("common.düğme"), 'Fermuar', t("common.çıtçıt"), t("common.bağcık"), 'Kemer', 'Lastik', t("common.cırt_cırt"), t("common.mıknatıs"), t("common.kopça"), t("common.i_pli")]
};
export const careInstructions: SpecOption = {
  id: 'care',
  name: t("common.bakım_talimatları"),
  emoji: '🌡️',
  options: [t("common.30_c_yıkama"), t("common.40_c_yıkama"), t("common.el_yıkama"), 'Kuru Temizleme', t("common.ütü_yasak"), t("common.düşük_isı_ütü"), t("common.orta_isı_ütü"), t("common.çamaşır_makinesi"), 'Asarak Kurutma', t("common.yatırarak_kurutma"), 'Kurutma Makinesi Yasak']
};
export const vatRates: SpecOption = {
  id: 'vat',
  name: 'KDV Oranı',
  emoji: '💰',
  options: ['%8', '%20']
};
export const preparationTimes: SpecOption = {
  id: 'preparationTime',
  name: t("common.hazırlık_süresi"),
  emoji: '📅',
  options: [t("common.1_gün"), t("common.2_gün"), t("common.3_gün"), t("common.4_gün"), t("common.5_gün"), '1 Hafta', '2 Hafta']
};
export const allSpecs = [fabricTypes, fitTypes, seasons, genders, ageGroups, patterns, neckTypes, sleeveTypes, closureTypes, careInstructions, vatRates, preparationTimes];