// 🧴 Kozmetik Kategori Verileri
export interface CategoryData {
  id: string;
  name: string;
  emoji: string;
  hasShades?: boolean; // Renk tonları var mı (ruj, far vs)
  hasVolume?: boolean; // Hacim/ağırlık bilgisi gerekli mi
  hasSPF?: boolean; // SPF değeri gerekli mi
}

export const mainCategories: CategoryData[] = [
  { id: 'cilt-bakimi', name: 'Cilt Bakımı', emoji: '🧴', hasVolume: true },
  { id: 'makyaj', name: 'Makyaj', emoji: '💄', hasShades: true },
  { id: 'sac-bakimi', name: 'Saç Bakımı', emoji: '🧴', hasVolume: true },
  { id: 'vucut-bakimi', name: 'Vücut Bakımı', emoji: '🧴', hasVolume: true },
  { id: 'tirnak-bakimi', name: 'Tırnak Bakımı', emoji: '💅', hasShades: true },
  { id: 'parfum', name: 'Parfüm & Koku', emoji: '🌸', hasVolume: true }
];

export const subCategories: Record<string, CategoryData[]> = {
  'cilt-bakimi': [
    { id: 'nemlendirici', name: 'Nemlendirici', emoji: '🧴', hasVolume: true },
    { id: 'temizleyici', name: 'Temizleyici', emoji: '🧼', hasVolume: true },
    { id: 'maske', name: 'Yüz Maskesi', emoji: '🎭', hasVolume: true },
    { id: 'serum', name: 'Serum', emoji: '💧', hasVolume: true },
    { id: 'tonik', name: 'Tonik', emoji: '🧴', hasVolume: true },
    { id: 'gunes-kremi', name: 'Güneş Kremi', emoji: '☀️', hasVolume: true, hasSPF: true },
    { id: 'peeling', name: 'Peeling & Scrub', emoji: '✨', hasVolume: true },
    { id: 'goz-kremi', name: 'Göz Kremi', emoji: '👁️', hasVolume: true }
  ],
  'makyaj': [
    { id: 'fondoten', name: 'Fondöten', emoji: '🎨', hasShades: true, hasVolume: true },
    { id: 'ruj', name: 'Ruj', emoji: '💄', hasShades: true },
    { id: 'rimmel', name: 'Rimmel', emoji: '👁️', hasShades: true },
    { id: 'far', name: 'Göz Farı', emoji: '🎨', hasShades: true },
    { id: 'kapatici', name: 'Kapatıcı', emoji: '🎯', hasShades: true, hasVolume: true },
    { id: 'pudra', name: 'Pudra', emoji: '✨', hasShades: true, hasVolume: true },
    { id: 'allik', name: 'Allık', emoji: '🌹', hasShades: true },
    { id: 'kas-kalemi', name: 'Kaş Kalemi', emoji: '✏️', hasShades: true },
    { id: 'eyeliner', name: 'Eyeliner', emoji: '✒️', hasShades: true },
    { id: 'highlighter', name: 'Highlighter', emoji: '✨', hasShades: true }
  ],
  'sac-bakimi': [
    { id: 'sampuan', name: 'Şampuan', emoji: '🧴', hasVolume: true },
    { id: 'sac-kremi', name: 'Saç Kremi', emoji: '🧴', hasVolume: true },
    { id: 'sac-maskesi', name: 'Saç Maskesi', emoji: '🎭', hasVolume: true },
    { id: 'sac-yagi', name: 'Saç Yağı', emoji: '🫒', hasVolume: true },
    { id: 'sac-spreyi', name: 'Saç Spreyi', emoji: '💨', hasVolume: true },
    { id: 'sac-serumu', name: 'Saç Serumu', emoji: '💧', hasVolume: true },
    { id: 'kuru-sampuan', name: 'Kuru Şampuan', emoji: '✨', hasVolume: true }
  ],
  'vucut-bakimi': [
    { id: 'dus-jeli', name: 'Duş Jeli', emoji: '🧼', hasVolume: true },
    { id: 'vucut-losyonu', name: 'Vücut Losyonu', emoji: '🧴', hasVolume: true },
    { id: 'deodorant', name: 'Deodorant', emoji: '🌿', hasVolume: true },
    { id: 'vucut-yagi', name: 'Vücut Yağı', emoji: '🫒', hasVolume: true },
    { id: 'el-kremi', name: 'El Kremi', emoji: '🤲', hasVolume: true },
    { id: 'vucut-spreyi', name: 'Vücut Spreyi', emoji: '💨', hasVolume: true }
  ],
  'tirnak-bakimi': [
    { id: 'oje', name: 'Oje', emoji: '💅', hasShades: true, hasVolume: true },
    { id: 'base-coat', name: 'Base Coat', emoji: '🛡️', hasVolume: true },
    { id: 'top-coat', name: 'Top Coat', emoji: '✨', hasVolume: true },
    { id: 'tirnak-bakimi', name: 'Tırnak Bakım Ürünü', emoji: '💅', hasVolume: true },
    { id: 'asetik-dis', name: 'Asetik Dış', emoji: '🧴', hasVolume: true }
  ],
  'parfum': [
    { id: 'kadin-parfum', name: 'Kadın Parfümü', emoji: '🌸', hasVolume: true },
    { id: 'erkek-parfum', name: 'Erkek Parfümü', emoji: '🌊', hasVolume: true },
    { id: 'unisex-parfum', name: 'Unisex Parfüm', emoji: '✨', hasVolume: true },
    { id: 'deodorant', name: 'Deodorant', emoji: '🌿', hasVolume: true },
    { id: 'body-mist', name: 'Body Mist', emoji: '💨', hasVolume: true }
  ]
};

export const getSubCategories = (mainCategoryId: string): CategoryData[] => {
  return subCategories[mainCategoryId] || [];
};

export const getCategoryById = (categoryId: string): CategoryData | undefined => {
  for (const categories of Object.values(subCategories)) {
    const found = categories.find(cat => cat.id === categoryId);
    if (found) return found;
  }
  return mainCategories.find(cat => cat.id === categoryId);
};