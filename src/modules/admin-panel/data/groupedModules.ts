import { Users, Store, Wrench, CreditCard } from 'lucide-react';
import { GroupedModulesMap } from '../types/adminTypes';

export const groupedModules: GroupedModulesMap = {
  'yonetim': {
    id: 'yonetim',
    title: 'YÖNETİM PANELİ',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    modules: ['kullanici-yonetimi', 'yetkilendirme', 'magaza-acilis', 'raporlar']
  },
  'magaza-urun': {
    id: 'magaza-urun',
    title: 'MAĞAZA & ÜRÜN YÖNETİMİ',
    icon: Store,
    color: 'from-green-500 to-green-600',
    modules: ['magaza-paneli', 'urun-ekleme', 'sistem-tanimlamalari', 'tema-sistemi', 'son-kullanici']
  },
  'teknik-altyapi': {
    id: 'teknik-altyapi',
    title: 'TEKNİK & ALTYAPI',
    icon: Wrench,
    color: 'from-purple-500 to-purple-600',
    modules: ['platform', 'seo', 'iletisim']
  },
  'abonelik-paketler': {
    id: 'abonelik-paketler',
    title: 'ABONELİK & PAKETLER',
    icon: CreditCard,
    color: 'from-orange-500 to-orange-600',
    modules: ['paket-tanimlama']
  }
};
