import { useTranslation } from "react-i18next";
// 📂 Kategori Verileri
export interface CategoryData {
  id: string;
  name: string;
  emoji: string;
  sizeSystem: 'letter' | 'number' | 'shoe' | 'underwear' | 'length' | 'onesize';
  genderAuto?: 'men' | 'women';
}
export const mainCategories: CategoryData[] = [{
  id: 'kadin-giyim',
  name: t("common.kadın_giyim"),
  emoji: '👩',
  sizeSystem: 'letter',
  genderAuto: 'women'
}, {
  id: 'erkek-giyim',
  name: 'Erkek Giyim',
  emoji: '👨',
  sizeSystem: 'letter',
  genderAuto: 'men'
}, {
  id: 'cocuk-giyim',
  name: t("common.çocuk_giyim"),
  emoji: '👶',
  sizeSystem: 'letter'
}, {
  id: 'ayakkabi',
  name: t("common.ayakkabı"),
  emoji: '👠',
  sizeSystem: 'shoe'
}, {
  id: 'aksesuar',
  name: 'Aksesuar',
  emoji: '👜',
  sizeSystem: 'onesize'
}, {
  id: 'ic-giyim',
  name: t("common.i_ç_giyim"),
  emoji: '🩲',
  sizeSystem: 'underwear'
}, {
  id: 'spor-giyim',
  name: 'Spor Giyim',
  emoji: '🏃',
  sizeSystem: 'letter'
}];
export const subCategories: Record<string, CategoryData[]> = {
  'kadin-giyim': [{
    id: 'tisort',
    name: t("common.tişört"),
    emoji: '👕',
    sizeSystem: 'letter'
  }, {
    id: 'gomlek',
    name: t("common.gömlek"),
    emoji: '👔',
    sizeSystem: 'letter'
  }, {
    id: 'pantolon',
    name: 'Pantolon',
    emoji: '👖',
    sizeSystem: 'number'
  }, {
    id: 'etek',
    name: 'Etek',
    emoji: '👗',
    sizeSystem: 'number'
  }, {
    id: 'elbise',
    name: 'Elbise',
    emoji: '👗',
    sizeSystem: 'letter'
  }, {
    id: 'ceket',
    name: 'Ceket',
    emoji: '🧥',
    sizeSystem: 'letter'
  }, {
    id: 'hirka',
    name: t("common.hırka"),
    emoji: '🧶',
    sizeSystem: 'letter'
  }, {
    id: 'kazak',
    name: 'Kazak',
    emoji: '🧥',
    sizeSystem: 'letter'
  }, {
    id: 'bluz',
    name: 'Bluz',
    emoji: '👚',
    sizeSystem: 'letter'
  }, {
    id: 'sort',
    name: t("common.şort"),
    emoji: '🩳',
    sizeSystem: 'number'
  }, {
    id: 'tunik',
    name: 'Tunik',
    emoji: '👘',
    sizeSystem: 'letter'
  }, {
    id: 'ferace',
    name: 'Ferace',
    emoji: '🧥',
    sizeSystem: 'letter'
  }, {
    id: 'sal-esarp',
    name: t("common.şal_eşarp"),
    emoji: '🧕',
    sizeSystem: 'onesize'
  }, {
    id: 'kap',
    name: 'Kap',
    emoji: '👗',
    sizeSystem: 'letter'
  }, {
    id: 'pardosu',
    name: t("common.pardösü"),
    emoji: '🧥',
    sizeSystem: 'letter'
  }],
  'erkek-giyim': [{
    id: 'tisort',
    name: t("common.tişört"),
    emoji: '👕',
    sizeSystem: 'letter'
  }, {
    id: 'gomlek',
    name: t("common.gömlek"),
    emoji: '👔',
    sizeSystem: 'letter'
  }, {
    id: 'pantolon',
    name: 'Pantolon',
    emoji: '👖',
    sizeSystem: 'number'
  }, {
    id: 'ceket',
    name: 'Ceket',
    emoji: '🧥',
    sizeSystem: 'letter'
  }, {
    id: 'kazak',
    name: 'Kazak',
    emoji: '🧥',
    sizeSystem: 'letter'
  }, {
    id: 'sort',
    name: t("common.şort"),
    emoji: '🩳',
    sizeSystem: 'number'
  }, {
    id: 'esofman',
    name: t("common.eşofman"),
    emoji: '🏃',
    sizeSystem: 'letter'
  }, {
    id: 'mont',
    name: 'Mont',
    emoji: '🧥',
    sizeSystem: 'letter'
  }],
  'cocuk-giyim': [{
    id: 'bebek-tisort',
    name: t("common.bebek_tişört"),
    emoji: '👶',
    sizeSystem: 'letter'
  }, {
    id: 'cocuk-pantolon',
    name: t("common.çocuk_pantolon"),
    emoji: '👖',
    sizeSystem: 'letter'
  }, {
    id: 'cocuk-elbise',
    name: t("common.çocuk_elbise"),
    emoji: '👗',
    sizeSystem: 'letter'
  }, {
    id: 'okul-forması',
    name: t("common.okul_forması"),
    emoji: '🎒',
    sizeSystem: 'letter'
  }],
  'ayakkabi': [{
    id: 'kadin-ayakkabi',
    name: t("common.kadın_ayakkabı"),
    emoji: '👠',
    sizeSystem: 'shoe'
  }, {
    id: 'erkek-ayakkabi',
    name: t("common.erkek_ayakkabı"),
    emoji: '👞',
    sizeSystem: 'shoe'
  }, {
    id: 'spor-ayakkabi',
    name: t("common.spor_ayakkabı"),
    emoji: '👟',
    sizeSystem: 'shoe'
  }, {
    id: 'bot',
    name: 'Bot',
    emoji: '🥾',
    sizeSystem: 'shoe'
  }, {
    id: 'sandalet',
    name: 'Sandalet',
    emoji: '👡',
    sizeSystem: 'shoe'
  }],
  'aksesuar': [{
    id: 'canta',
    name: t("common.çanta"),
    emoji: '👜',
    sizeSystem: 'onesize'
  }, {
    id: 'taki',
    name: t("common.takı"),
    emoji: '💍',
    sizeSystem: 'onesize'
  }, {
    id: 'saat',
    name: 'Saat',
    emoji: '⌚',
    sizeSystem: 'onesize'
  }, {
    id: 'kemer',
    name: 'Kemer',
    emoji: '👔',
    sizeSystem: 'length'
  }, {
    id: 'kravat',
    name: 'Kravat',
    emoji: '👔',
    sizeSystem: 'onesize'
  }, {
    id: 'sapka',
    name: t("common.şapka"),
    emoji: '🧢',
    sizeSystem: 'onesize'
  }, {
    id: 'atkı',
    name: t("common.atkı"),
    emoji: '🧣',
    sizeSystem: 'onesize'
  }],
  'ic-giyim': [{
    id: 'sutyen',
    name: t("common.sütyen"),
    emoji: '🩲',
    sizeSystem: 'underwear'
  }, {
    id: 'kulot',
    name: t("common.külot"),
    emoji: '🩲',
    sizeSystem: 'letter'
  }, {
    id: 'atlet',
    name: 'Atlet',
    emoji: '👕',
    sizeSystem: 'letter'
  }, {
    id: 'corap',
    name: t("common.çorap"),
    emoji: '🧦',
    sizeSystem: 'shoe'
  }],
  'spor-giyim': [{
    id: 'spor-tisort',
    name: t("common.spor_tişört"),
    emoji: '🏃',
    sizeSystem: 'letter'
  }, {
    id: 'spor-pantolon',
    name: 'Spor Pantolon',
    emoji: '🏃',
    sizeSystem: 'letter'
  }, {
    id: 'spor-sutyen',
    name: t("common.spor_sütyeni"),
    emoji: '🏃',
    sizeSystem: 'letter'
  }, {
    id: 'sweatshirt',
    name: 'Sweatshirt',
    emoji: '🧥',
    sizeSystem: 'letter'
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