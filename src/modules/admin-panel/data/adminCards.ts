import { ShoppingBag, Globe, PlusCircle, UserCheck, Monitor, Palette, Key, BarChart3, Settings, Package, Search, MessageCircle } from 'lucide-react';
import { AdminCard } from '../types/adminTypes';
import { useTranslation } from "react-i18next";
export const adminCards: AdminCard[] = [{
  id: 'magaza-paneli',
  title: t("common.mağaza_paneli"),
  description: t("common.ürün_ekleme_sipariş_takibi_tema_seçimi"),
  link: '/admin/magaza-yonetimi',
  icon: ShoppingBag,
  color: 'from-blue-500/80 to-blue-600/80',
  hoverColor: 'hover:from-blue-600/90 hover:to-blue-700/90',
  iconColor: 'text-white'
}, {
  id: 'platform',
  title: t("common.altyapı_platform"),
  description: t("common.sipariş_akışı_log_tutma_trafik_ve_sistem_raporları"),
  link: '/admin/platform',
  icon: Globe,
  color: 'from-green-500/80 to-green-600/80',
  hoverColor: 'hover:from-green-600/90 hover:to-green-700/90',
  iconColor: 'text-white'
}, {
  id: 'magaza-acilis',
  title: t("common.mağaza_açılış_paneli"),
  description: t("common.yeni_mağaza_başvuruları_onay_süreçleri"),
  link: '/admin/magaza-acilis-paneli',
  icon: PlusCircle,
  color: 'from-cyan-500/80 to-cyan-600/80',
  hoverColor: 'hover:from-cyan-600/90 hover:to-cyan-700/90',
  iconColor: 'text-white'
}, {
  id: 'kullanici-yonetimi',
  title: t("common.kullanıcı_yönetimi"),
  description: t("common.giriş_yapma_yetki_seviyesi_belirleme"),
  link: '/admin/kullanici-yonetimi',
  icon: UserCheck,
  color: 'from-purple-500/80 to-purple-600/80',
  hoverColor: 'hover:from-purple-600/90 hover:to-purple-700/90',
  iconColor: 'text-white'
}, {
  id: 'son-kullanici',
  title: t("common.son_kullanıcı_sitesi"),
  description: t("common.ürünleri_görür_sepete_ekler_satın_alır"),
  link: '/admin/son-kullanici-sitesi',
  icon: Monitor,
  color: 'from-orange-500/80 to-orange-600/80',
  hoverColor: 'hover:from-orange-600/90 hover:to-orange-700/90',
  iconColor: 'text-white'
}, {
  id: 'tema-sistemi',
  title: 'Tema Sistemi',
  description: t("common.mağaza_vitrinlerinin_görünümünü_özelleştirir_7_8_tema"),
  link: '/admin/tema-sistemi',
  icon: Palette,
  color: 'from-pink-500/80 to-pink-600/80',
  hoverColor: 'hover:from-pink-600/90 hover:to-pink-700/90',
  iconColor: 'text-white'
}, {
  id: 'yetkilendirme',
  title: 'Yetkilendirme',
  description: t("common.rol_ve_yetki_yönetimi_güvenlik_ayarları"),
  link: '/admin/yetkilendirme',
  icon: Key,
  color: 'from-indigo-500/80 to-indigo-600/80',
  hoverColor: 'hover:from-indigo-600/90 hover:to-indigo-700/90',
  iconColor: 'text-white'
}, {
  id: 'raporlar',
  title: 'Raporlar',
  description: t("common.satış_kullanıcı_ve_sistem_raporları"),
  link: '/admin/raporlar',
  icon: BarChart3,
  color: 'from-emerald-500/80 to-emerald-600/80',
  hoverColor: 'hover:from-emerald-600/90 hover:to-emerald-700/90',
  iconColor: 'text-white'
}, {
  id: 'sistem-tanimlamalari',
  title: t("common.sistem_tanımlamaları"),
  description: 'Kategoriler, bedenler, renkler, markalar',
  link: '/admin/sistem-tanimlamalari',
  icon: Settings,
  color: 'from-teal-500/80 to-teal-600/80',
  hoverColor: 'hover:from-teal-600/90 hover:to-teal-700/90',
  iconColor: 'text-white'
}, {
  id: 'urun-ekleme',
  title: t("common.ürün_ekleme"),
  description: t("common.kategori_bazlı_profesyonel_ürün_ekleme_sistemi"),
  link: '/admin/urun-ekleme-yeni',
  icon: Package,
  color: 'from-amber-500/80 to-amber-600/80',
  hoverColor: 'hover:from-amber-600/90 hover:to-amber-700/90',
  iconColor: 'text-white'
}, {
  id: 'seo',
  title: 'SEO',
  description: t("common.arama_motoru_optimizasyonu_ve_analiz_araçları"),
  link: '/admin/seo',
  icon: Search,
  color: 'from-red-500/80 to-red-600/80',
  hoverColor: 'hover:from-red-600/90 hover:to-red-700/90',
  iconColor: 'text-white'
}, {
  id: 'paket-tanimlama',
  title: t("common.paket_tanımlama"),
  description: t("common.sistem_özellikleri_yazarak_fiyat_belirleme_ve_paket_oluşturma"),
  link: '/admin/paket-tanimlama',
  icon: Package,
  color: 'from-rose-500/80 to-rose-600/80',
  hoverColor: 'hover:from-rose-600/90 hover:to-rose-700/90',
  iconColor: 'text-white'
}, {
  id: 'iletisim',
  title: t("common.i_letişim"),
  description: t("common.müşteri_iletişimi_destek_sistemi_ve_mesaj_yönetimi"),
  link: '/admin/iletisim',
  icon: MessageCircle,
  color: 'from-violet-500/80 to-violet-600/80',
  hoverColor: 'hover:from-violet-600/90 hover:to-violet-700/90',
  iconColor: 'text-white'
}];