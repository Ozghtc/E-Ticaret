import { useTranslation } from "react-i18next";
// 💄 Kozmetik Renk Paleti
export interface ColorOption {
  id: string;
  name: string;
  emoji: string;
  hex: string;
  category: 'skin-tone' | 'lip-color' | 'eye-color' | 'nail-color' | 'universal';
  description?: string;
}
export const colors: ColorOption[] = [
// Cilt Tonları (Fondöten, Kapatıcı)
{
  id: 'fair-light',
  name: 'Fair Light',
  emoji: '🤍',
  hex: '#FFE4C4',
  category: 'skin-tone',
  description: t("common.çok_açık_ten")
}, {
  id: 'light',
  name: 'Light',
  emoji: '🤍',
  hex: '#F5DEB3',
  category: 'skin-tone',
  description: t("common.açık_ten")
}, {
  id: 'light-medium',
  name: 'Light Medium',
  emoji: '🟤',
  hex: '#DEB887',
  category: 'skin-tone',
  description: t("common.açık_orta_ten")
}, {
  id: 'medium',
  name: 'Medium',
  emoji: '🟤',
  hex: '#D2B48C',
  category: 'skin-tone',
  description: 'Orta ten'
}, {
  id: 'medium-tan',
  name: 'Medium Tan',
  emoji: '🟫',
  hex: '#BC9A6A',
  category: 'skin-tone',
  description: 'Orta-esmer ten'
}, {
  id: 'tan',
  name: 'Tan',
  emoji: '🟫',
  hex: '#A0522D',
  category: 'skin-tone',
  description: 'Esmer ten'
}, {
  id: 'deep',
  name: 'Deep',
  emoji: '🤎',
  hex: '#8B4513',
  category: 'skin-tone',
  description: 'Koyu ten'
},
// Ruj Renkleri
{
  id: 'nude-pink',
  name: 'Nude Pembe',
  emoji: '💋',
  hex: '#F4C2C2',
  category: 'lip-color'
}, {
  id: 'coral',
  name: 'Mercan',
  emoji: '🧡',
  hex: '#FF7F50',
  category: 'lip-color'
}, {
  id: 'red-classic',
  name: t("common.klasik_kırmızı"),
  emoji: '❤️',
  hex: '#DC143C',
  category: 'lip-color'
}, {
  id: 'berry',
  name: 'Berry',
  emoji: '🍇',
  hex: '#8B008B',
  category: 'lip-color'
}, {
  id: 'wine',
  name: t("common.şarap_kırmızısı"),
  emoji: '🍷',
  hex: '#722F37',
  category: 'lip-color'
}, {
  id: 'pink-bright',
  name: 'Parlak Pembe',
  emoji: '💗',
  hex: '#FF69B4',
  category: 'lip-color'
}, {
  id: 'orange-red',
  name: t("common.turuncu_kırmızı"),
  emoji: '🧡',
  hex: '#FF4500',
  category: 'lip-color'
}, {
  id: 'brown-nude',
  name: 'Kahverengi Nude',
  emoji: '🤎',
  hex: '#CD853F',
  category: 'lip-color'
},
// Göz Farı Renkleri
{
  id: 'champagne',
  name: t("common.şampanya"),
  emoji: '✨',
  hex: '#F7E7CE',
  category: 'eye-color'
}, {
  id: 'bronze',
  name: 'Bronz',
  emoji: '🥉',
  hex: '#CD7F32',
  category: 'eye-color'
}, {
  id: 'gold',
  name: t("common.altın"),
  emoji: '🥇',
  hex: '#FFD700',
  category: 'eye-color'
}, {
  id: 'brown-chocolate',
  name: t("common.çikolata_kahve"),
  emoji: '🍫',
  hex: '#8B4513',
  category: 'eye-color'
}, {
  id: 'gray-smoky',
  name: t("common.dumanlı_gri"),
  emoji: '🌫️',
  hex: '#708090',
  category: 'eye-color'
}, {
  id: 'purple-plum',
  name: 'Mor Erik',
  emoji: '🟣',
  hex: '#8B008B',
  category: 'eye-color'
}, {
  id: 'green-emerald',
  name: t("common.zümrüt_yeşili"),
  emoji: '💚',
  hex: '#50C878',
  category: 'eye-color'
}, {
  id: 'blue-navy',
  name: 'Lacivert',
  emoji: '💙',
  hex: '#000080',
  category: 'eye-color'
},
// Oje Renkleri  
{
  id: 'french-white',
  name: t("common.fransız_beyazı"),
  emoji: '🤍',
  hex: '#FFFFFF',
  category: 'nail-color'
}, {
  id: 'nude-beige',
  name: 'Nude Bej',
  emoji: '🤎',
  hex: '#F5F5DC',
  category: 'nail-color'
}, {
  id: 'red-nail',
  name: t("common.klasik_kırmızı"),
  emoji: '❤️',
  hex: '#DC143C',
  category: 'nail-color'
}, {
  id: 'pink-nail',
  name: 'Pembe',
  emoji: '💗',
  hex: '#FFC0CB',
  category: 'nail-color'
}, {
  id: 'black-nail',
  name: 'Siyah',
  emoji: '🖤',
  hex: '#000000',
  category: 'nail-color'
}, {
  id: 'purple-nail',
  name: 'Mor',
  emoji: '💜',
  hex: '#8A2BE2',
  category: 'nail-color'
}, {
  id: 'blue-nail',
  name: 'Mavi',
  emoji: '💙',
  hex: '#4169E1',
  category: 'nail-color'
}, {
  id: 'green-nail',
  name: t("common.yeşil"),
  emoji: '💚',
  hex: '#32CD32',
  category: 'nail-color'
},
// Universal Renkler (Eyeliner, Kaş Kalemi vs)
{
  id: 'black',
  name: 'Siyah',
  emoji: '⚫',
  hex: '#000000',
  category: 'universal'
}, {
  id: 'brown',
  name: 'Kahverengi',
  emoji: '🟤',
  hex: '#8B4513',
  category: 'universal'
}, {
  id: 'dark-brown',
  name: 'Koyu Kahve',
  emoji: '🤎',
  hex: '#654321',
  category: 'universal'
}, {
  id: 'gray',
  name: 'Gri',
  emoji: '🩶',
  hex: '#808080',
  category: 'universal'
}, {
  id: 'transparent',
  name: t("common.şeffaf"),
  emoji: '💧',
  hex: '#FFFFFF00',
  category: 'universal'
}];

// Kategoriye göre renkleri filtrele
export const getColorsByCategory = (category: string): ColorOption[] => {
  return colors.filter(color => color.category === category || color.category === 'universal');
};

// Kategori ID'sine göre renk bul
export const getColorById = (colorId: string): ColorOption | undefined => {
  return colors.find(color => color.id === colorId);
};