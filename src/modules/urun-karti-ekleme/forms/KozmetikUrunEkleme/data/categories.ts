import { useTranslation } from "react-i18next";
// 🧴 Kozmetik Kategori Verileri
export interface CategoryData {
  id: string;
  name: string;
  emoji: string;
  hasShades?: boolean; // Renk tonları var mı (ruj, far vs)
  hasVolume?: boolean; // Hacim/ağırlık bilgisi gerekli mi
  hasSPF?: boolean; // SPF değeri gerekli mi
}
export const mainCategories: CategoryData[] = [{
  id: 'cilt-bakimi',
  name: t("common.cilt_bakımı"),
  emoji: '🧴',
  hasVolume: true
}, {
  id: 'makyaj',
  name: 'Makyaj',
  emoji: '💄',
  hasShades: true
}, {
  id: 'sac-bakimi',
  name: t("common.saç_bakımı"),
  emoji: '🧴',
  hasVolume: true
}, {
  id: 'vucut-bakimi',
  name: t("common.vücut_bakımı"),
  emoji: '🧴',
  hasVolume: true
}, {
  id: 'tirnak-bakimi',
  name: t("common.tırnak_bakımı"),
  emoji: '💅',
  hasShades: true
}, {
  id: 'parfum',
  name: t("common.parfüm_koku"),
  emoji: '🌸',
  hasVolume: true
}];
export const subCategories: Record<string, CategoryData[]> = {
  'cilt-bakimi': [{
    id: 'nemlendirici',
    name: 'Nemlendirici',
    emoji: '🧴',
    hasVolume: true
  }, {
    id: 'temizleyici',
    name: 'Temizleyici',
    emoji: '🧼',
    hasVolume: true
  }, {
    id: 'maske',
    name: t("common.yüz_maskesi"),
    emoji: '🎭',
    hasVolume: true
  }, {
    id: 'serum',
    name: 'Serum',
    emoji: '💧',
    hasVolume: true
  }, {
    id: 'tonik',
    name: 'Tonik',
    emoji: '🧴',
    hasVolume: true
  }, {
    id: 'gunes-kremi',
    name: t("common.güneş_kremi"),
    emoji: '☀️',
    hasVolume: true,
    hasSPF: true
  }, {
    id: 'peeling',
    name: 'Peeling & Scrub',
    emoji: '✨',
    hasVolume: true
  }, {
    id: 'goz-kremi',
    name: t("common.göz_kremi"),
    emoji: '👁️',
    hasVolume: true
  }],
  'makyaj': [{
    id: 'fondoten',
    name: t("common.fondöten"),
    emoji: '🎨',
    hasShades: true,
    hasVolume: true
  }, {
    id: 'ruj',
    name: 'Ruj',
    emoji: '💄',
    hasShades: true
  }, {
    id: 'rimmel',
    name: 'Rimmel',
    emoji: '👁️',
    hasShades: true
  }, {
    id: 'far',
    name: t("common.göz_farı"),
    emoji: '🎨',
    hasShades: true
  }, {
    id: 'kapatici',
    name: t("common.kapatıcı"),
    emoji: '🎯',
    hasShades: true,
    hasVolume: true
  }, {
    id: 'pudra',
    name: 'Pudra',
    emoji: '✨',
    hasShades: true,
    hasVolume: true
  }, {
    id: 'allik',
    name: t("common.allık"),
    emoji: '🌹',
    hasShades: true
  }, {
    id: 'kas-kalemi',
    name: t("common.kaş_kalemi"),
    emoji: '✏️',
    hasShades: true
  }, {
    id: 'eyeliner',
    name: 'Eyeliner',
    emoji: '✒️',
    hasShades: true
  }, {
    id: 'highlighter',
    name: 'Highlighter',
    emoji: '✨',
    hasShades: true
  }],
  'sac-bakimi': [{
    id: 'sampuan',
    name: t("common.şampuan"),
    emoji: '🧴',
    hasVolume: true
  }, {
    id: 'sac-kremi',
    name: t("common.saç_kremi"),
    emoji: '🧴',
    hasVolume: true
  }, {
    id: 'sac-maskesi',
    name: t("common.saç_maskesi"),
    emoji: '🎭',
    hasVolume: true
  }, {
    id: 'sac-yagi',
    name: t("common.saç_yağı"),
    emoji: '🫒',
    hasVolume: true
  }, {
    id: 'sac-spreyi',
    name: t("common.saç_spreyi"),
    emoji: '💨',
    hasVolume: true
  }, {
    id: 'sac-serumu',
    name: t("common.saç_serumu"),
    emoji: '💧',
    hasVolume: true
  }, {
    id: 'kuru-sampuan',
    name: t("common.kuru_şampuan"),
    emoji: '✨',
    hasVolume: true
  }],
  'vucut-bakimi': [{
    id: 'dus-jeli',
    name: t("common.duş_jeli"),
    emoji: '🧼',
    hasVolume: true
  }, {
    id: 'vucut-losyonu',
    name: t("common.vücut_losyonu"),
    emoji: '🧴',
    hasVolume: true
  }, {
    id: 'deodorant',
    name: 'Deodorant',
    emoji: '🌿',
    hasVolume: true
  }, {
    id: 'vucut-yagi',
    name: t("common.vücut_yağı"),
    emoji: '🫒',
    hasVolume: true
  }, {
    id: 'el-kremi',
    name: 'El Kremi',
    emoji: '🤲',
    hasVolume: true
  }, {
    id: 'vucut-spreyi',
    name: t("common.vücut_spreyi"),
    emoji: '💨',
    hasVolume: true
  }],
  'tirnak-bakimi': [{
    id: 'oje',
    name: 'Oje',
    emoji: '💅',
    hasShades: true,
    hasVolume: true
  }, {
    id: 'base-coat',
    name: 'Base Coat',
    emoji: '🛡️',
    hasVolume: true
  }, {
    id: 'top-coat',
    name: 'Top Coat',
    emoji: '✨',
    hasVolume: true
  }, {
    id: 'tirnak-bakimi',
    name: t("common.tırnak_bakım_ürünü"),
    emoji: '💅',
    hasVolume: true
  }, {
    id: 'asetik-dis',
    name: t("common.asetik_dış"),
    emoji: '🧴',
    hasVolume: true
  }],
  'parfum': [{
    id: 'kadin-parfum',
    name: t("common.kadın_parfümü"),
    emoji: '🌸',
    hasVolume: true
  }, {
    id: 'erkek-parfum',
    name: t("common.erkek_parfümü"),
    emoji: '🌊',
    hasVolume: true
  }, {
    id: 'unisex-parfum',
    name: t("common.unisex_parfüm"),
    emoji: '✨',
    hasVolume: true
  }, {
    id: 'deodorant',
    name: 'Deodorant',
    emoji: '🌿',
    hasVolume: true
  }, {
    id: 'body-mist',
    name: 'Body Mist',
    emoji: '💨',
    hasVolume: true
  }]
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