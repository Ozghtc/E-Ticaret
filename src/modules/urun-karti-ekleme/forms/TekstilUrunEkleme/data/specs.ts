// 🧵 Tekstil Özellikleri
export interface SpecOption {
  id: string;
  name: string;
  emoji: string;
  options: string[];
}

export const fabricTypes: SpecOption = {
  id: 'fabric',
  name: 'Kumaş Türü',
  emoji: '🌿',
  options: [
    'Pamuk', 'Polyester', 'Viskon', 'Elastan', 'İpek', 'Yün', 'Keten', 'Denim',
    'Şifon', 'Saten', 'Kadife', 'Örme', 'Dokuma', 'Polar', 'Kot', 'Tül'
  ]
};

export const fitTypes: SpecOption = {
  id: 'fit',
  name: 'Kalıp Tipi',
  emoji: '📏',
  options: [
    'Slim Fit', 'Regular Fit', 'Oversize', 'Boyfriend', 'Skinny', 'Straight',
    'Wide Leg', 'Crop', 'High Waist', 'Low Waist', 'A-Line', 'Bodycon'
  ]
};

export const seasons: SpecOption = {
  id: 'season',
  name: 'Sezon',
  emoji: '☀️',
  options: ['Yaz', 'Kış', 'İlkbahar', 'Sonbahar', '4 Mevsim']
};

export const genders: SpecOption = {
  id: 'gender',
  name: 'Cinsiyet',
  emoji: '👩',
  options: ['Kadın', 'Erkek', 'Unisex', 'Çocuk']
};

export const ageGroups: SpecOption = {
  id: 'ageGroup',
  name: 'Yaş Grubu',
  emoji: '👤',
  options: ['Yetişkin', 'Genç', 'Çocuk', 'Bebek', '0-2 Yaş', '3-6 Yaş', '7-12 Yaş', '13-17 Yaş']
};

export const patterns: SpecOption = {
  id: 'pattern',
  name: 'Desen',
  emoji: '⬜',
  options: [
    'Düz', 'Çizgili', 'Kareli', 'Puantiyeli', 'Çiçekli', 'Geometrik',
    'Hayvan Deseni', 'Yazılı', 'Vintage', 'Etnik', 'Soyut', 'Desenli'
  ]
};

export const neckTypes: SpecOption = {
  id: 'neckType',
  name: 'Yaka Tipi',
  emoji: '🚴',
  options: [
    'Bisiklet Yaka', 'V Yaka', 'Polo Yaka', 'Kapüşonlu', 'Balıkçı Yaka',
    'Hakim Yaka', 'Gömlek Yaka', 'Straplez', 'Tek Omuz', 'Yuvarlak Yaka'
  ]
};

export const sleeveTypes: SpecOption = {
  id: 'sleeveType',
  name: 'Kol Tipi',
  emoji: '🩳',
  options: [
    'Kısa Kol', 'Uzun Kol', 'Kolsuz', 'Askılı', '3/4 Kol', 'Yarım Kol',
    'Balon Kol', 'Dar Kol', 'Bol Kol', 'Fırfırlı Kol'
  ]
};

export const closureTypes: SpecOption = {
  id: 'closureType',
  name: 'Kapama Tipi',
  emoji: '🔘',
  options: [
    'Düğme', 'Fermuar', 'Çıtçıt', 'Bağcık', 'Kemer', 'Lastik',
    'Cırt Cırt', 'Mıknatıs', 'Kopça', 'İpli'
  ]
};

export const careInstructions: SpecOption = {
  id: 'care',
  name: 'Bakım Talimatları',
  emoji: '🌡️',
  options: [
    '30°C Yıkama', '40°C Yıkama', 'El Yıkama', 'Kuru Temizleme',
    'Ütü Yasak', 'Düşük Isı Ütü', 'Orta Isı Ütü', 'Çamaşır Makinesi',
    'Asarak Kurutma', 'Yatırarak Kurutma', 'Kurutma Makinesi Yasak'
  ]
};

export const vatRates: SpecOption = {
  id: 'vat',
  name: 'KDV Oranı',
  emoji: '💰',
  options: ['%8', '%20']
};

export const preparationTimes: SpecOption = {
  id: 'preparationTime',
  name: 'Hazırlık Süresi',
  emoji: '📅',
  options: ['1 Gün', '2 Gün', '3 Gün', '4 Gün', '5 Gün', '1 Hafta', '2 Hafta']
};

export const allSpecs = [
  fabricTypes,
  fitTypes,
  seasons,
  genders,
  ageGroups,
  patterns,
  neckTypes,
  sleeveTypes,
  closureTypes,
  careInstructions,
  vatRates,
  preparationTimes
];