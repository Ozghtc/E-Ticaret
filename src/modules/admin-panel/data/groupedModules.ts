import { Users, Store, Wrench, CreditCard } from 'lucide-react';
import { GroupedModulesMap } from '../types/adminTypes';
import { useTranslation } from "react-i18next";
export const groupedModules: GroupedModulesMap = {
  'yonetim': {
    id: 'yonetim',
    title: t("common.yöneti_m_paneli"),
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    modules: ['kullanici-yonetimi', 'yetkilendirme', 'magaza-acilis', 'raporlar']
  },
  'magaza-urun': {
    id: 'magaza-urun',
    title: t("common.mağaza_ürün_yöneti_mi"),
    icon: Store,
    color: 'from-green-500 to-green-600',
    modules: ['magaza-paneli', 'urun-ekleme', 'sistem-tanimlamalari', 'tema-sistemi', 'son-kullanici']
  },
  'teknik-altyapi': {
    id: 'teknik-altyapi',
    title: t("common.tekni_k_altyapi"),
    icon: Wrench,
    color: 'from-purple-500 to-purple-600',
    modules: ['platform', 'seo', 'iletisim']
  },
  'abonelik-paketler': {
    id: 'abonelik-paketler',
    title: t("common.aboneli_k_paketler"),
    icon: CreditCard,
    color: 'from-orange-500 to-orange-600',
    modules: ['paket-tanimlama']
  }
};