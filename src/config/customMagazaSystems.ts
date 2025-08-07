// 🏗️ MAĞAZA ÖZEL TAMAMEN FARKLI SİSTEMLER
// Her mağaza için kökten farklı admin paneli ve modüller

import { ComponentType } from 'react';

// 📋 Özel sistem türleri
export type CustomSystemType = 
  | 'default'           // Standart e-ticaret sistemi
  | 'restaurant'        // Restoran yönetim sistemi  
  | 'appointment'       // Randevu/rezervasyon sistemi
  | 'education'         // Eğitim kurumu sistemi
  | 'healthcare'        // Sağlık sistemi
  | 'real-estate'       // Emlak sistemi
  | 'hotel'            // Otel yönetim sistemi
  | 'workshop'         // Atölye/tamirci sistemi
  | 'custom';          // Tamamen özel sistem

// 🎨 Mağaza özel sistem konfigürasyonu
export interface CustomMagazaSystem {
  magazaId: string;
  magazaAdi: string;
  systemType: CustomSystemType;
  
  // Tamamen farklı admin paneli
  customDashboard?: {
    component: string;           // Hangi component yüklensin
    route: string;              // Hangi route'da açılsın
    layout: 'sidebar' | 'tabs' | 'cards' | 'timeline';
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    logo?: string;
    brandName?: string;
  };
  
  // Tamamen farklı modüller
  customModules: Array<{
    id: string;
    title: string;
    component: string;          // Hangi component
    route: string;              // Hangi route
    icon: string;
    color: string;
    description: string;
    category?: string;
  }>;
  
  // Standart modülleri gizle
  hideDefaultModules: boolean;  // true = hiçbir standart modül gözükmesin
  
  // Özel stillendirme
  customCSS?: string;
  customJS?: string;
}

// 🍽️ RESTORAN YÖNETİM SİSTEMİ ÖRNEK KONFIGÜRASYON
export const restaurantSystem: CustomMagazaSystem = {
  magazaId: "restoran-001",
  magazaAdi: "Lezzet Durağı Restaurant",  
  systemType: "restaurant",
  
  // Tamamen farklı dashboard
  customDashboard: {
    component: "RestaurantDashboard",
    route: "/restoran/dashboard", 
    layout: "cards",
    colors: {
      primary: "#D97706",    // Turuncu (yemek teması)
      secondary: "#92400E", 
      accent: "#FED7AA"
    },
    logo: "/assets/restaurant-logo.png",
    brandName: "Lezzet Durağı"
  },
  
  // Tamamen farklı modüller - hiç ürün ekleme yok!
  customModules: [
    {
      id: "masa-rezervasyon",
      title: "Masa Rezervasyonları",
      component: "MasaRezervasyon", 
      route: "/restoran/rezervasyonlar",
      icon: "Calendar",
      color: "bg-orange-500",
      description: "Masa rezervasyonları ve müşteri yönetimi",
      category: "operations"
    },
    {
      id: "menu-yonetimi", 
      title: "Menü Yönetimi",
      component: "MenuYonetimi",
      route: "/restoran/menu",
      icon: "Menu", 
      color: "bg-red-500",
      description: "Yemek menüsü ve fiyat yönetimi",
      category: "operations"  
    },
    {
      id: "siparis-mutfak",
      title: "Mutfak Siparişleri", 
      component: "MutfakSiparisler",
      route: "/restoran/mutfak",
      icon: "ChefHat",
      color: "bg-yellow-500", 
      description: "Anlık mutfak siparişleri ve hazırlık durumu",
      category: "operations"
    },
    {
      id: "garson-yonetimi",
      title: "Garson Yönetimi",
      component: "GarsonYonetimi", 
      route: "/restoran/garsonlar",
      icon: "Users",
      color: "bg-blue-500",
      description: "Garson vardiyaları ve performans takibi", 
      category: "staff"
    },
    {
      id: "masa-durumu",
      title: "Masa Durumu (Canlı)",
      component: "MasaDurumu",
      route: "/restoran/masa-durumu", 
      icon: "Monitor",
      color: "bg-green-500",
      description: "Tüm masaların anlık durumu",
      category: "operations"
    },
    {
      id: "kasa-z-raporu", 
      title: "Kasa & Z Raporu",
      component: "KasaZRaporu",
      route: "/restoran/kasa",
      icon: "DollarSign",
      color: "bg-purple-500",
      description: "Günlük satış ve kasa raporları",
      category: "finance"
    },
    {
      id: "stok-malzeme",
      title: "Stok & Malzeme",
      component: "StokMalzeme", 
      route: "/restoran/stok",
      icon: "Package",
      color: "bg-gray-500",
      description: "Mutfak malzemeleri ve stok takibi",
      category: "inventory"
    },
    {
      id: "musteri-yorumlari",
      title: "Müşteri Yorumları", 
      component: "MusteriYorumlari",
      route: "/restoran/yorumlar",
      icon: "Star",
      color: "bg-pink-500", 
      description: "Online yorumlar ve müşteri memnuniyeti",
      category: "feedback"
    }
  ],
  
  hideDefaultModules: true,  // ✨ Hiçbir e-ticaret modülü gözükmesin!
  
  customCSS: `
    .restaurant-theme {
      background: linear-gradient(135deg, #FED7AA 0%, #D97706 100%);
      font-family: 'Inter', sans-serif;
    }
    .masa-card {
      background: #FFFBEB;
      border: 2px solid #D97706;
      box-shadow: 0 4px 12px rgba(217, 119, 6, 0.1);
    }
  `
};

// 🏥 SAĞLIK SİSTEMİ ÖRNEK KONFIGÜRASYON
export const healthcareSystem: CustomMagazaSystem = {
  magazaId: "klinik-001", 
  magazaAdi: "Sağlık Merkezi Polikliniği",
  systemType: "healthcare",
  
  customDashboard: {
    component: "HealthcareDashboard",
    route: "/klinik/dashboard",
    layout: "sidebar",
    colors: {
      primary: "#0EA5E9",    // Mavi (sağlık teması) 
      secondary: "#0284C7",
      accent: "#BAE6FD"
    },
    brandName: "Sağlık Merkezi"
  },
  
  customModules: [
    {
      id: "hasta-randevu", 
      title: "Hasta Randevuları",
      component: "HastaRandevu",
      route: "/klinik/randevular", 
      icon: "Calendar",
      color: "bg-blue-500",
      description: "Hasta randevu sistemi ve takvim yönetimi",
      category: "appointments"
    },
    {
      id: "hasta-dosyalari",
      title: "Hasta Dosyaları", 
      component: "HastaDosyalari",
      route: "/klinik/hastalar",
      icon: "FileText", 
      color: "bg-green-500",
      description: "Hasta bilgileri ve tıbbi geçmiş",
      category: "records" 
    },
    {
      id: "doktor-programi",
      title: "Doktor Programı",
      component: "DoktorProgrami",
      route: "/klinik/doktorlar",
      icon: "Clock",
      color: "bg-purple-500", 
      description: "Doktor çalışma saatleri ve nöbet programı",
      category: "staff"
    },
    {
      id: "recete-yonetimi",
      title: "Reçete Yönetimi", 
      component: "ReceteYonetimi",
      route: "/klinik/receteler",
      icon: "Prescription",
      color: "bg-red-500",
      description: "Dijital reçete sistemi ve ilaç takibi", 
      category: "prescriptions"
    },
    {
      id: "laboratuvar",
      title: "Laboratuvar Sonuçları",
      component: "LaboratuvarSonuclari", 
      route: "/klinik/lab",
      icon: "TestTube",
      color: "bg-yellow-500",
      description: "Tahlil sonuçları ve laboratuvar entegrasyonu",
      category: "lab"
    },
    {
      id: "fatura-sgk",
      title: "Fatura & SGK",
      component: "FaturaSGK",
      route: "/klinik/faturalar", 
      icon: "Receipt",
      color: "bg-gray-500", 
      description: "SGK faturaları ve ödeme sistemi",
      category: "billing"
    }
  ],
  
  hideDefaultModules: true
};

// 🏠 EMLAK SİSTEMİ ÖRNEK KONFIGÜRASYON 
export const realEstateSystem: CustomMagazaSystem = {
  magazaId: "emlak-001",
  magazaAdi: "Premium Emlak Danışmanlık",
  systemType: "real-estate",
  
  customDashboard: {
    component: "RealEstateDashboard", 
    route: "/emlak/dashboard",
    layout: "tabs",
    colors: {
      primary: "#059669",    // Yeşil (emlak teması)
      secondary: "#047857", 
      accent: "#A7F3D0"
    },
    brandName: "Premium Emlak"
  },
  
  customModules: [
    {
      id: "portfoy-yonetimi",
      title: "Portföy Yönetimi", 
      component: "PortfoyYonetimi",
      route: "/emlak/portfoy",
      icon: "Building", 
      color: "bg-green-500",
      description: "Mülk portföyü ve değerleme sistemi",
      category: "properties"
    },
    {
      id: "musteri-talepleri",
      title: "Müşteri Talepleri",
      component: "MusteriTalepleri", 
      route: "/emlak/talepler",
      icon: "Users",
      color: "bg-blue-500",
      description: "Alıcı ve satıcı talep yönetimi", 
      category: "customers"
    },
    {
      id: "gezdir-randevu", 
      title: "Gezdirme Randevuları",
      component: "GezdirmeRandevu",
      route: "/emlak/gezdirme",
      icon: "MapPin",
      color: "bg-purple-500",
      description: "Mülk gezdirme ve randevu takibi",
      category: "appointments"  
    },
    {
      id: "satis-sureci",
      title: "Satış Süreci",
      component: "SatisSureci",
      route: "/emlak/satis",
      icon: "TrendingUp", 
      color: "bg-red-500",
      description: "Satış aşamaları ve anlaşma takibi",
      category: "sales"
    },
    {
      id: "komisyon-hesap",
      title: "Komisyon Hesaplama", 
      component: "KomisyonHesap",
      route: "/emlak/komisyon",
      icon: "Calculator",
      color: "bg-yellow-500",
      description: "Otomatik komisyon hesaplama sistemi",
      category: "finance"
    }
  ],
  
  hideDefaultModules: true
};

// 🔧 TAMAMEN ÖZEL SİSTEM - Atölye/Tamirci
export const workshopSystem: CustomMagazaSystem = {
  magazaId: "atolye-001",
  magazaAdi: "Usta Tamirhanesi", 
  systemType: "workshop",
  
  customDashboard: {
    component: "WorkshopDashboard",
    route: "/atolye/dashboard",
    layout: "timeline", 
    colors: {
      primary: "#7C2D12",    // Kahverengi (atölye teması)
      secondary: "#92400E",
      accent: "#FED7AA"
    },
    brandName: "Usta Tamirhanesi"
  },
  
  customModules: [
    {
      id: "tamir-talepleri", 
      title: "Tamir Talepleri",
      component: "TamirTalepleri",
      route: "/atolye/talepler", 
      icon: "Wrench",
      color: "bg-amber-600",
      description: "Gelen tamir talepleri ve kayıt sistemi",
      category: "requests"
    },
    {
      id: "tamir-sureci",
      title: "Tamir Süreci", 
      component: "TamirSureci",
      route: "/atolye/surecler",
      icon: "Settings",
      color: "bg-orange-600", 
      description: "Tamir aşamaları ve ilerleme takibi",
      category: "process"
    },
    {
      id: "parca-stok",
      title: "Parça Stoğu",
      component: "ParcaStok", 
      route: "/atolye/stok",
      icon: "Package",
      color: "bg-gray-600",
      description: "Yedek parça stoğu ve tedarik yönetimi",
      category: "inventory" 
    },
    {
      id: "musteri-araclar",
      title: "Müşteri Araçları",
      component: "MusteriAraclar",
      route: "/atolye/araclar", 
      icon: "Car",
      color: "bg-blue-600", 
      description: "Müşteri araç kayıtları ve geçmiş",
      category: "vehicles"
    },
    {
      id: "fiyat-hesaplama", 
      title: "Fiyat Hesaplama",
      component: "FiyatHesaplama",
      route: "/atolye/fiyat",
      icon: "Calculator",
      color: "bg-green-600",
      description: "İşçilik ve parça fiyat hesaplama", 
      category: "pricing"
    },
    {
      id: "garanti-takip",
      title: "Garanti Takibi",
      component: "GarantiTakip",
      route: "/atolye/garanti", 
      icon: "Shield",
      color: "bg-purple-600",
      description: "Verilen garantiler ve takip sistemi",
      category: "warranty"
    }
  ],
  
  hideDefaultModules: true,
  
  customCSS: `
    .workshop-theme {
      background: linear-gradient(135deg, #FED7AA 0%, #7C2D12 100%);
      font-family: 'Roboto Mono', monospace;
    }
    .repair-card {
      background: #FFFBEB;
      border-left: 4px solid #7C2D12; 
    }
  `
};

// 📚 TÜM ÖZEL SİSTEMLER LİSTESİ
export const customSystems: CustomMagazaSystem[] = [
  restaurantSystem,
  healthcareSystem, 
  realEstateSystem,
  workshopSystem
];

// 🔍 MAĞAZA ÖZEL SİSTEMİ BULMA
export const getCustomSystem = (magazaId: string): CustomMagazaSystem | null => {
  return customSystems.find(system => system.magazaId === magazaId) || null;
};

// ✅ SİSTEM TÜRÜ KONTROL FONKSİYONLARI
export const isCustomSystem = (magazaId: string): boolean => {
  return getCustomSystem(magazaId) !== null;
};

export const getSystemType = (magazaId: string): CustomSystemType => {
  const customSystem = getCustomSystem(magazaId);
  return customSystem?.systemType || 'default';
};

export const shouldHideDefaultModules = (magazaId: string): boolean => {
  const customSystem = getCustomSystem(magazaId);
  return customSystem?.hideDefaultModules || false;
};

export const getCustomModules = (magazaId: string) => {
  const customSystem = getCustomSystem(magazaId);
  return customSystem?.customModules || [];
};

export const getCustomDashboard = (magazaId: string) => {
  const customSystem = getCustomSystem(magazaId);
  return customSystem?.customDashboard || null;
};

// 🎨 TEMA VE RENK YÖNETİMİ
export const getSystemColors = (magazaId: string) => {
  const customSystem = getCustomSystem(magazaId);
  return customSystem?.customDashboard?.colors || {
    primary: "#3B82F6",
    secondary: "#1E40AF", 
    accent: "#DBEAFE"
  };
};

export default {
  customSystems,
  getCustomSystem,
  isCustomSystem,
  getSystemType,
  getCustomModules,
  getCustomDashboard,
  getSystemColors
};
