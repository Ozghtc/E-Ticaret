import { useTranslation } from "react-i18next";
// 🎨 Renk Paleti
export interface ColorOption {
  id: string;
  name: string;
  emoji: string;
  hex: string;
  category: 'basic' | 'natural' | 'trend' | 'sophisticated' | 'metallic';
}
export const colors: ColorOption[] = [
// Temel Renkler
{
  id: 'siyah',
  name: 'Siyah',
  emoji: '⚫',
  hex: '#1F2937',
  category: 'basic'
}, {
  id: 'beyaz',
  name: 'Beyaz',
  emoji: '⚪',
  hex: '#FFFFFF',
  category: 'basic'
}, {
  id: 'gri',
  name: 'Gri',
  emoji: '⚙️',
  hex: '#6B7280',
  category: 'basic'
}, {
  id: 'lacivert',
  name: 'Lacivert',
  emoji: '🔵',
  hex: '#1E3A8A',
  category: 'basic'
}, {
  id: 'mavi',
  name: 'Mavi',
  emoji: '🔷',
  hex: '#3B82F6',
  category: 'basic'
}, {
  id: 'kirmizi',
  name: t("common.kırmızı"),
  emoji: '🔴',
  hex: '#EF4444',
  category: 'basic'
}, {
  id: 'pembe',
  name: 'Pembe',
  emoji: '💖',
  hex: '#F472B6',
  category: 'basic'
}, {
  id: 'mor',
  name: 'Mor',
  emoji: '🟣',
  hex: '#A855F7',
  category: 'basic'
},
// Doğal Tonlar
{
  id: 'yesil',
  name: t("common.yeşil"),
  emoji: '🟢',
  hex: '#22C55E',
  category: 'natural'
}, {
  id: 'sari',
  name: t("common.sarı"),
  emoji: '🟡',
  hex: '#EAB308',
  category: 'natural'
}, {
  id: 'turuncu',
  name: 'Turuncu',
  emoji: '🟠',
  hex: '#F97316',
  category: 'natural'
}, {
  id: 'kahverengi',
  name: 'Kahverengi',
  emoji: '🟤',
  hex: '#A16207',
  category: 'natural'
}, {
  id: 'bej',
  name: 'Bej',
  emoji: '🤎',
  hex: '#D6D3D1',
  category: 'natural'
}, {
  id: 'krem',
  name: 'Krem',
  emoji: '🤍',
  hex: '#FEF3C7',
  category: 'natural'
},
// Trend Renkler
{
  id: 'somon',
  name: 'Somon',
  emoji: '🍑',
  hex: '#FB7185',
  category: 'trend'
}, {
  id: 'lila',
  name: 'Lila',
  emoji: '💜',
  hex: '#C084FC',
  category: 'trend'
}, {
  id: 'bebek-mavisi',
  name: 'Bebek Mavisi',
  emoji: '🔵',
  hex: '#60A5FA',
  category: 'trend'
}, {
  id: 'mint-yesili',
  name: t("common.mint_yeşili"),
  emoji: '🌿',
  hex: '#34D399',
  category: 'trend'
}, {
  id: 'pudra',
  name: 'Pudra',
  emoji: '🌸',
  hex: '#F9A8D4',
  category: 'trend'
}, {
  id: 'ekru',
  name: 'Ekru',
  emoji: '🕊️',
  hex: '#F3F4F6',
  category: 'trend'
},
// Sofistike Tonlar
{
  id: 'hardal',
  name: 'Hardal',
  emoji: '🌾',
  hex: '#FBBF24',
  category: 'sophisticated'
}, {
  id: 'antrasit',
  name: 'Antrasit',
  emoji: '🪨',
  hex: '#374151',
  category: 'sophisticated'
}, {
  id: 'taba',
  name: 'Taba',
  emoji: '🍂',
  hex: '#D97706',
  category: 'sophisticated'
}, {
  id: 'komur-grisi',
  name: t("common.kömür_grisi"),
  emoji: '🪵',
  hex: '#4B5563',
  category: 'sophisticated'
}, {
  id: 'tas-rengi',
  name: t("common.taş_rengi"),
  emoji: '⛰️',
  hex: '#9CA3AF',
  category: 'sophisticated'
}, {
  id: 'fusya',
  name: t("common.fuşya"),
  emoji: '💗',
  hex: '#EC4899',
  category: 'sophisticated'
},
// Metalik & Özel
{
  id: 'metalik-altin',
  name: t("common.metalik_altın"),
  emoji: '✨',
  hex: '#FBBF24',
  category: 'metallic'
}, {
  id: 'metalik-gumus',
  name: t("common.metalik_gümüş"),
  emoji: '🌕',
  hex: '#9CA3AF',
  category: 'metallic'
}, {
  id: 'rose-gold',
  name: 'Rose Gold',
  emoji: '🌹',
  hex: '#F78DA7',
  category: 'metallic'
}, {
  id: 'buz-mavisi',
  name: 'Buz Mavisi',
  emoji: '❄️',
  hex: '#7DD3FC',
  category: 'metallic'
}, {
  id: 'zeytin-yesili',
  name: t("common.zeytin_yeşili"),
  emoji: '🫒',
  hex: '#84CC16',
  category: 'metallic'
}, {
  id: 'haki',
  name: 'Haki',
  emoji: '🪖',
  hex: '#65A30D',
  category: 'metallic'
}, {
  id: 'inci-beyazi',
  name: t("common.i_nci_beyazı"),
  emoji: '🐚',
  hex: '#F8FAFC',
  category: 'metallic'
}];
export const getColorsByCategory = (category: string): ColorOption[] => {
  return colors.filter(color => color.category === category);
};
export const getAllColors = (): ColorOption[] => {
  return colors;
};
export const getColorById = (colorId: string): ColorOption | undefined => {
  return colors.find(color => color.id === colorId);
};
export const colorCategories = [{
  id: 'basic',
  name: 'Temel Renkler',
  emoji: '🎨'
}, {
  id: 'natural',
  name: t("common.doğal_tonlar"),
  emoji: '🌿'
}, {
  id: 'trend',
  name: 'Trend Renkler',
  emoji: '✨'
}, {
  id: 'sophisticated',
  name: 'Sofistike Tonlar',
  emoji: '🎭'
}, {
  id: 'metallic',
  name: t("common.metalik_özel"),
  emoji: '💫'
}];