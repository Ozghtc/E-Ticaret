// 🧵 Tekstil Özellikleri
export interface SpecOption {
  id: string;
  name: string;
  emoji: string;
  options: string[];
}
export const fabricTypes: SpecOption = {
  id: 'fabric',
  name: "kumaş_türü",
  emoji: '🌿',
  options: ['Pamuk', 'Polyester', 'Viskon', 'Elastan', "i_pek", "yün", 'Keten', 'Denim', "şifon", 'Saten', 'Kadife', "örme", 'Dokuma', 'Polar', 'Kot', "tül"]
};
export const fitTypes: SpecOption = {
  id: 'fit',
  name: "kalıp_tipi",
  emoji: '📏',
  options: ['Slim Fit', 'Regular Fit', 'Oversize', 'Boyfriend', 'Skinny', 'Straight', 'Wide Leg', 'Crop', 'High Waist', 'Low Waist', 'A-Line', 'Bodycon']
};
export const seasons: SpecOption = {
  id: 'season',
  name: 'Sezon',
  emoji: '☀️',
  options: ['Yaz', "kış", "i_lkbahar", 'Sonbahar', '4 Mevsim']
};
export const genders: SpecOption = {
  id: 'gender',
  name: 'Cinsiyet',
  emoji: '👩',
  options: ["kadın", 'Erkek', 'Unisex', "çocuk"]
};
export const ageGroups: SpecOption = {
  id: 'ageGroup',
  name: 'Yaş Grubu',
  emoji: '👤',
  options: ["yetişkin", "genç", "çocuk", 'Bebek', "0_2_yaş", "3_6_yaş", "7_12_yaş", "13_17_yaş"]
};
export const patterns: SpecOption = {
  id: 'pattern',
  name: 'Desen',
  emoji: '⬜',
  options: ["düz", "çizgili", 'Kareli', 'Puantiyeli', "çiçekli", 'Geometrik', 'Hayvan Deseni', "yazılı", 'Vintage', 'Etnik', 'Soyut', 'Desenli']
};
export const neckTypes: SpecOption = {
  id: 'neckType',
  name: 'Yaka Tipi',
  emoji: '🚴',
  options: ['Bisiklet Yaka', 'V Yaka', 'Polo Yaka', "kapüşonlu", "balıkçı_yaka", 'Hakim Yaka', "gömlek_yaka", 'Straplez', 'Tek Omuz', 'Yuvarlak Yaka']
};
export const sleeveTypes: SpecOption = {
  id: 'sleeveType',
  name: 'Kol Tipi',
  emoji: '🩳',
  options: ["kısa_kol", 'Uzun Kol', 'Kolsuz', "askılı", '3/4 Kol', "yarım_kol", 'Balon Kol', 'Dar Kol', 'Bol Kol', "fırfırlı_kol"]
};
export const closureTypes: SpecOption = {
  id: 'closureType',
  name: 'Kapama Tipi',
  emoji: '🔘',
  options: ["düğme", 'Fermuar', "çıtçıt", "bağcık", 'Kemer', 'Lastik', "cırt_cırt", "mıknatıs", "kopça", "i_pli"]
};
export const careInstructions: SpecOption = {
  id: 'care',
  name: "bakım_talimatları",
  emoji: '🌡️',
  options: ["30_c_yıkama", "40_c_yıkama", "el_yıkama", 'Kuru Temizleme', "ütü_yasak", "düşük_isı_ütü", "orta_isı_ütü", "çamaşır_makinesi", 'Asarak Kurutma', "yatırarak_kurutma", 'Kurutma Makinesi Yasak']
};
export const vatRates: SpecOption = {
  id: 'vat',
  name: 'KDV Oranı',
  emoji: '💰',
  options: ['%8', '%20']
};
export const preparationTimes: SpecOption = {
  id: 'preparationTime',
  name: "hazırlık_süresi",
  emoji: '📅',
  options: ["1_gün", "2_gün", "3_gün", "4_gün", "5_gün", '1 Hafta', '2 Hafta']
};
export const allSpecs = [fabricTypes, fitTypes, seasons, genders, ageGroups, patterns, neckTypes, sleeveTypes, closureTypes, careInstructions, vatRates, preparationTimes];