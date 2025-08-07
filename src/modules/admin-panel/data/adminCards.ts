import {
  ShoppingBag,
  Globe,
  PlusCircle,
  UserCheck,
  Monitor,
  Palette,
  Key,
  BarChart3,
  Settings,
  Package,
  Search,
  MessageCircle
} from 'lucide-react';
import { AdminCard } from '../types/adminTypes';

export const adminCards: AdminCard[] = [
  {
    id: 'magaza-paneli',
    title: 'Mağaza Paneli',
    description: 'Ürün ekleme, sipariş takibi, tema seçimi',
    link: '/admin/magaza-yonetimi',
    icon: ShoppingBag,
    color: 'from-blue-500/80 to-blue-600/80',
    hoverColor: 'hover:from-blue-600/90 hover:to-blue-700/90',
    iconColor: 'text-white'
  },
  {
    id: 'platform',
    title: 'Altyapı / Platform',
    description: 'Sipariş akışı, log tutma, trafik ve sistem raporları',
    link: '/admin/platform',
    icon: Globe,
    color: 'from-green-500/80 to-green-600/80',
    hoverColor: 'hover:from-green-600/90 hover:to-green-700/90',
    iconColor: 'text-white'
  },
  {
    id: 'magaza-acilis',
    title: 'Mağaza Açılış Paneli',
    description: 'Yeni mağaza başvuruları, onay süreçleri',
    link: '/admin/magaza-acilis-paneli',
    icon: PlusCircle,
    color: 'from-cyan-500/80 to-cyan-600/80',
    hoverColor: 'hover:from-cyan-600/90 hover:to-cyan-700/90',
    iconColor: 'text-white'
  },
  {
    id: 'kullanici-yonetimi',
    title: 'Kullanıcı Yönetimi',
    description: 'Giriş yapma, yetki seviyesi belirleme',
    link: '/admin/kullanici-yonetimi',
    icon: UserCheck,
    color: 'from-purple-500/80 to-purple-600/80',
    hoverColor: 'hover:from-purple-600/90 hover:to-purple-700/90',
    iconColor: 'text-white'
  },
  {
    id: 'son-kullanici',
    title: 'Son Kullanıcı Sitesi',
    description: 'Ürünleri görür, sepete ekler, satın alır',
    link: '/admin/son-kullanici-sitesi',
    icon: Monitor,
    color: 'from-orange-500/80 to-orange-600/80',
    hoverColor: 'hover:from-orange-600/90 hover:to-orange-700/90',
    iconColor: 'text-white'
  },
  {
    id: 'tema-sistemi',
    title: 'Tema Sistemi',
    description: 'Mağaza vitrinlerinin görünümünü özelleştirir (7-8 tema)',
    link: '/admin/tema-sistemi',
    icon: Palette,
    color: 'from-pink-500/80 to-pink-600/80',
    hoverColor: 'hover:from-pink-600/90 hover:to-pink-700/90',
    iconColor: 'text-white'
  },
  {
    id: 'yetkilendirme',
    title: 'Yetkilendirme',
    description: 'Rol ve yetki yönetimi, güvenlik ayarları',
    link: '/admin/yetkilendirme',
    icon: Key,
    color: 'from-indigo-500/80 to-indigo-600/80',
    hoverColor: 'hover:from-indigo-600/90 hover:to-indigo-700/90',
    iconColor: 'text-white'
  },
  {
    id: 'raporlar',
    title: 'Raporlar',
    description: 'Satış, kullanıcı ve sistem raporları',
    link: '/admin/raporlar',
    icon: BarChart3,
    color: 'from-emerald-500/80 to-emerald-600/80',
    hoverColor: 'hover:from-emerald-600/90 hover:to-emerald-700/90',
    iconColor: 'text-white'
  },
  {
    id: 'sistem-tanimlamalari',
    title: 'Sistem Tanımlamaları',
    description: 'Kategoriler, bedenler, renkler, markalar',
    link: '/admin/sistem-tanimlamalari',
    icon: Settings,
    color: 'from-teal-500/80 to-teal-600/80',
    hoverColor: 'hover:from-teal-600/90 hover:to-teal-700/90',
    iconColor: 'text-white'
  },
  {
    id: 'urun-ekleme',
    title: 'Ürün Ekleme',
    description: 'Kategori bazlı profesyonel ürün ekleme sistemi',
    link: '/admin/urun-ekleme-yeni',
    icon: Package,
    color: 'from-amber-500/80 to-amber-600/80',
    hoverColor: 'hover:from-amber-600/90 hover:to-amber-700/90',
    iconColor: 'text-white'
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Arama motoru optimizasyonu ve analiz araçları',
    link: '/admin/seo',
    icon: Search,
    color: 'from-red-500/80 to-red-600/80',
    hoverColor: 'hover:from-red-600/90 hover:to-red-700/90',
    iconColor: 'text-white'
  },
  {
    id: 'paket-tanimlama',
    title: 'Paket Tanımlama',
    description: 'Sistem özellikleri yazarak fiyat belirleme ve paket oluşturma',
    link: '/admin/paket-tanimlama',
    icon: Package,
    color: 'from-rose-500/80 to-rose-600/80',
    hoverColor: 'hover:from-rose-600/90 hover:to-rose-700/90',
    iconColor: 'text-white'
  },
  {
    id: 'iletisim',
    title: 'İletişim',
    description: 'Müşteri iletişimi, destek sistemi ve mesaj yönetimi',
    link: '/admin/iletisim',
    icon: MessageCircle,
    color: 'from-violet-500/80 to-violet-600/80',
    hoverColor: 'hover:from-violet-600/90 hover:to-violet-700/90',
    iconColor: 'text-white'
  }
];
