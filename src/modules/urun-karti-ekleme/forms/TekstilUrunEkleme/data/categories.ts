// 📂 Kategori Verileri
export interface CategoryData {
  id: string;
  name: string;
  emoji: string;
  sizeSystem: 'letter' | 'number' | 'shoe' | 'underwear' | 'length' | 'onesize';
  genderAuto?: 'men' | 'women';
}

export const mainCategories: CategoryData[] = [
  { id: 'kadin-giyim', name: 'Kadın Giyim', emoji: '👩', sizeSystem: 'letter', genderAuto: 'women' },
  { id: 'erkek-giyim', name: 'Erkek Giyim', emoji: '👨', sizeSystem: 'letter', genderAuto: 'men' },
  { id: 'cocuk-giyim', name: 'Çocuk Giyim', emoji: '👶', sizeSystem: 'letter' },
  { id: 'ayakkabi', name: 'Ayakkabı', emoji: '👠', sizeSystem: 'shoe' },
  { id: 'aksesuar', name: 'Aksesuar', emoji: '👜', sizeSystem: 'onesize' },
  { id: 'ic-giyim', name: 'İç Giyim', emoji: '🩲', sizeSystem: 'underwear' },
  { id: 'spor-giyim', name: 'Spor Giyim', emoji: '🏃', sizeSystem: 'letter' }
];

export const subCategories: Record<string, CategoryData[]> = {
  'kadin-giyim': [
    { id: 'tisort', name: 'Tişört', emoji: '👕', sizeSystem: 'letter' },
    { id: 'gomlek', name: 'Gömlek', emoji: '👔', sizeSystem: 'letter' },
    { id: 'pantolon', name: 'Pantolon', emoji: '👖', sizeSystem: 'number' },
    { id: 'etek', name: 'Etek', emoji: '👗', sizeSystem: 'number' },
    { id: 'elbise', name: 'Elbise', emoji: '👗', sizeSystem: 'letter' },
    { id: 'ceket', name: 'Ceket', emoji: '🧥', sizeSystem: 'letter' },
    { id: 'hirka', name: 'Hırka', emoji: '🧶', sizeSystem: 'letter' },
    { id: 'kazak', name: 'Kazak', emoji: '🧥', sizeSystem: 'letter' },
    { id: 'bluz', name: 'Bluz', emoji: '👚', sizeSystem: 'letter' },
    { id: 'sort', name: 'Şort', emoji: '🩳', sizeSystem: 'number' }
  ],
  'erkek-giyim': [
    { id: 'tisort', name: 'Tişört', emoji: '👕', sizeSystem: 'letter' },
    { id: 'gomlek', name: 'Gömlek', emoji: '👔', sizeSystem: 'letter' },
    { id: 'pantolon', name: 'Pantolon', emoji: '👖', sizeSystem: 'number' },
    { id: 'ceket', name: 'Ceket', emoji: '🧥', sizeSystem: 'letter' },
    { id: 'kazak', name: 'Kazak', emoji: '🧥', sizeSystem: 'letter' },
    { id: 'sort', name: 'Şort', emoji: '🩳', sizeSystem: 'number' },
    { id: 'esofman', name: 'Eşofman', emoji: '🏃', sizeSystem: 'letter' },
    { id: 'mont', name: 'Mont', emoji: '🧥', sizeSystem: 'letter' }
  ],
  'cocuk-giyim': [
    { id: 'bebek-tisort', name: 'Bebek Tişört', emoji: '👶', sizeSystem: 'letter' },
    { id: 'cocuk-pantolon', name: 'Çocuk Pantolon', emoji: '👖', sizeSystem: 'letter' },
    { id: 'cocuk-elbise', name: 'Çocuk Elbise', emoji: '👗', sizeSystem: 'letter' },
    { id: 'okul-forması', name: 'Okul Forması', emoji: '🎒', sizeSystem: 'letter' }
  ],
  'ayakkabi': [
    { id: 'kadin-ayakkabi', name: 'Kadın Ayakkabı', emoji: '👠', sizeSystem: 'shoe' },
    { id: 'erkek-ayakkabi', name: 'Erkek Ayakkabı', emoji: '👞', sizeSystem: 'shoe' },
    { id: 'spor-ayakkabi', name: 'Spor Ayakkabı', emoji: '👟', sizeSystem: 'shoe' },
    { id: 'bot', name: 'Bot', emoji: '🥾', sizeSystem: 'shoe' },
    { id: 'sandalet', name: 'Sandalet', emoji: '👡', sizeSystem: 'shoe' }
  ],
  'aksesuar': [
    { id: 'canta', name: 'Çanta', emoji: '👜', sizeSystem: 'onesize' },
    { id: 'taki', name: 'Takı', emoji: '💍', sizeSystem: 'onesize' },
    { id: 'saat', name: 'Saat', emoji: '⌚', sizeSystem: 'onesize' },
    { id: 'kemer', name: 'Kemer', emoji: '👔', sizeSystem: 'length' },
    { id: 'kravat', name: 'Kravat', emoji: '👔', sizeSystem: 'onesize' },
    { id: 'sapka', name: 'Şapka', emoji: '🧢', sizeSystem: 'onesize' },
    { id: 'atkı', name: 'Atkı', emoji: '🧣', sizeSystem: 'onesize' }
  ],
  'ic-giyim': [
    { id: 'sutyen', name: 'Sütyen', emoji: '🩲', sizeSystem: 'underwear' },
    { id: 'kulot', name: 'Külot', emoji: '🩲', sizeSystem: 'letter' },
    { id: 'atlet', name: 'Atlet', emoji: '👕', sizeSystem: 'letter' },
    { id: 'corap', name: 'Çorap', emoji: '🧦', sizeSystem: 'shoe' }
  ],
  'spor-giyim': [
    { id: 'spor-tisort', name: 'Spor Tişört', emoji: '🏃', sizeSystem: 'letter' },
    { id: 'spor-pantolon', name: 'Spor Pantolon', emoji: '🏃', sizeSystem: 'letter' },
    { id: 'spor-sutyen', name: 'Spor Sütyeni', emoji: '🏃', sizeSystem: 'letter' },
    { id: 'sweatshirt', name: 'Sweatshirt', emoji: '🧥', sizeSystem: 'letter' }
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