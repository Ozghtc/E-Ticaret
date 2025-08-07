// 🔐 MAĞAZA YETKİ SİSTEMİ - Özelleştirilebilir Mağaza Konfigürasyonu

export interface MagazaPermissions {
  magazaId: string;
  magazaAdi: string;
  kategori: string;
  
  // Modül yetkileri
  permissions: {
    urunEkleme: boolean;      // Ürün ekleyebilir mi?
    urunDuzenleme: boolean;   // Ürün düzenleyebilir mi?
    siparisYonetimi: boolean; // Sipariş yönetebilir mi?
    stokTakibi: boolean;      // Stok görebilir mi?
    raporlama: boolean;       // Raporları görebilir mi?
    temaDegistirme: boolean;  // Tema değiştirebilir mi?
    faturaKesme: boolean;     // Fatura kesebilir mi?
  };
  
  // UI özelleştirmeleri
  ui: {
    buttonLabels: {
      urunYonetimi?: string;  // "Ürün Yönetimi" → "Stok Takibi"
      siparisler?: string;    // "Siparişlerim" → "Satışlarım"
      faturalar?: string;     // "Faturalarım" → "Muhasebe"
      raporlar?: string;      // "Raporlar" → "Analizler"
    };
    
    hideModules: string[];    // Gizlenecek modüller
    customModules?: Array<{   // Özel modüller
      id: string;
      title: string;
      path: string;
      icon: string;
      color: string;
    }>;
    
    theme: string;            // Zorunlu tema
    layout: 'grid-2' | 'grid-3' | 'grid-4' | 'list'; // Görünüm şekli
  };
  
  // İş mantığı sınırları
  limits: {
    maxProducts?: number;     // Max ürün sayısı
    maxOrders?: number;       // Max sipariş sayısı
    maxImages?: number;       // Max görsel sayısı
    allowedCategories?: string[]; // İzin verilen kategoriler
  };
}

// 📋 MAĞAZA KONFİGÜRASYON ÖRNEKLERİ

export const magazaConfigs: MagazaPermissions[] = [
  // 👕 BÜYÜK MOD MAĞAZASI - Tam yetki
  {
    magazaId: "magaza-001",
    magazaAdi: "Fashion Store Plus",
    kategori: "tekstil",
    permissions: {
      urunEkleme: true,
      urunDuzenleme: true,
      siparisYonetimi: true,
      stokTakibi: true,
      raporlama: true,
      temaDegistirme: true,
      faturaKesme: true
    },
    ui: {
      buttonLabels: {
        urunYonetimi: "Ürün Yönetimi",
        siparisler: "Siparişlerim",
        faturalar: "Faturalarım"
      },
      hideModules: [], // Hiçbir modül gizli değil
      theme: "fashion-store",
      layout: "grid-4"
    },
    limits: {} // Sınır yok
  },

  // 📦 SADECE STOK TAKİBİ YAPAN MAĞAZA
  {
    magazaId: "magaza-002", 
    magazaAdi: "Stok Takip Mağazası",
    kategori: "genel",
    permissions: {
      urunEkleme: false,        // ❌ Ürün ekleyemez
      urunDuzenleme: false,     // ❌ Ürün düzenleyemez  
      siparisYonetimi: true,    // ✅ Sipariş görebilir
      stokTakibi: true,         // ✅ Stok takibi yapabilir
      raporlama: true,          // ✅ Rapor alabilir
      temaDegistirme: false,    // ❌ Tema değiştiremez
      faturaKesme: false        // ❌ Fatura kesemez
    },
    ui: {
      buttonLabels: {
        urunYonetimi: "Stok Durumu",     // ✨ Özel isim
        siparisler: "Gelen Siparişler",  // ✨ Özel isim
        raporlar: "Stok Raporları"       // ✨ Özel isim
      },
      hideModules: [
        "urun-ekleme",     // Ürün ekleme gizli
        "tema-sistemi",    // Tema sistemi gizli
        "faturalar"        // Faturalar gizli
      ],
      customModules: [
        {
          id: "stok-uyari",
          title: "Stok Uyarıları", 
          path: "/magaza/stok-uyari",
          icon: "AlertTriangle",
          color: "bg-yellow-500"
        }
      ],
      theme: "minimal-wear", // Sabit tema
      layout: "grid-3"
    },
    limits: {
      maxProducts: 0,    // Ürün ekleyemez
      maxOrders: 1000    // Max 1000 sipariş görebilir
    }
  },

  // 🏪 KOMİSYONCU MAĞAZA - Özel yetkiler  
  {
    magazaId: "magaza-003",
    magazaAdi: "Komisyoncu Mağaza",
    kategori: "coklu",
    permissions: {
      urunEkleme: true,      // ✅ Ürün ekleyebilir (komisyonlu)
      urunDuzenleme: false,  // ❌ Düzenleyemez (admin onayı gerekli)
      siparisYonetimi: true, // ✅ Sipariş yönetebilir
      stokTakibi: true,      // ✅ Stok takibi
      raporlama: false,      // ❌ Rapor alamaz (gizli bilgi)
      temaDegistirme: false, // ❌ Tema değiştiremez
      faturaKesme: false     // ❌ Fatura kesemez
    },
    ui: {
      buttonLabels: {
        urunYonetimi: "Ürün Başvurusu",    // ✨ Özel anlam
        siparisler: "Komisyon Satışları"    // ✨ Komisyon odaklı
      },
      hideModules: ["raporlar", "faturalar"],
      customModules: [
        {
          id: "komisyon-hesap",
          title: "Komisyon Hesabım",
          path: "/magaza/komisyon", 
          icon: "DollarSign",
          color: "bg-green-500"
        }
      ],
      theme: "mega-store",
      layout: "grid-2"
    },
    limits: {
      maxProducts: 50,                    // Max 50 ürün
      allowedCategories: ["tekstil", "kozmetik"] // Sadece bu kategoriler
    }
  },

  // 🎯 ÖZEL SİPARİŞ MAĞAZASI
  {
    magazaId: "magaza-004",
    magazaAdi: "Özel Sipariş Atölyesi", 
    kategori: "ozel-uretim",
    permissions: {
      urunEkleme: false,     // ❌ Standart ürün ekleme yok
      urunDuzenleme: false,  // ❌ Düzenleme yok
      siparisYonetimi: true, // ✅ Özel siparişler
      stokTakibi: false,     // ❌ Stok yok (üretim bazlı)
      raporlama: true,       // ✅ Üretim raporları
      temaDegistirme: true,  // ✅ Tema değiştirme var
      faturaKesme: true      // ✅ Fatura kesebilir
    },
    ui: {
      buttonLabels: {
        siparisler: "Özel Siparişler",
        raporlar: "Üretim Planlama",
        faturalar: "Proforma Faturalar"
      },
      hideModules: ["urun-yonetimi"], // Ürün yönetimi gizli
      customModules: [
        {
          id: "tasarim-studi", 
          title: "Tasarım Stüdyosu",
          path: "/magaza/tasarim",
          icon: "Palette",
          color: "bg-purple-500"
        },
        {
          id: "uretim-takip",
          title: "Üretim Takibi", 
          path: "/magaza/uretim",
          icon: "Settings",
          color: "bg-blue-500"
        }
      ],
      theme: "boutique-chic",
      layout: "list"
    },
    limits: {
      maxOrders: 25,  // Aynı anda max 25 özel sipariş
      maxImages: 10   // Sipariş başına max 10 görsel
    }
  }
];

// 🔍 MAĞAZA KONFİGÜRASYONUNU BULMA FONKSİYONU
export const getMagazaConfig = (magazaId: string): MagazaPermissions | null => {
  return magazaConfigs.find(config => config.magazaId === magazaId) || null;
};

// ✅ YETKİ KONTROL FONKSİYONLARI
export const canAddProduct = (magazaId: string): boolean => {
  const config = getMagazaConfig(magazaId);
  return config?.permissions.urunEkleme ?? false;
};

export const canEditProduct = (magazaId: string): boolean => {
  const config = getMagazaConfig(magazaId);
  return config?.permissions.urunDuzenleme ?? false;
};

export const canManageOrders = (magazaId: string): boolean => {
  const config = getMagazaConfig(magazaId);
  return config?.permissions.siparisYonetimi ?? false;
};

export const canViewReports = (magazaId: string): boolean => {
  const config = getMagazaConfig(magazaId);
  return config?.permissions.raporlama ?? false;
};

// 🎨 UI ÖZELLEŞTIRME FONKSİYONLARI
export const getButtonLabel = (magazaId: string, buttonKey: string): string => {
  const config = getMagazaConfig(magazaId);
  const customLabel = config?.ui.buttonLabels?.[buttonKey as keyof typeof config.ui.buttonLabels];
  
  // Varsayılan etiketler
  const defaultLabels: Record<string, string> = {
    urunYonetimi: "Ürün Yönetimi",
    siparisler: "Siparişlerim", 
    faturalar: "Faturalarım",
    raporlar: "Raporlar"
  };
  
  return customLabel || defaultLabels[buttonKey] || buttonKey;
};

export const isModuleHidden = (magazaId: string, moduleId: string): boolean => {
  const config = getMagazaConfig(magazaId);
  return config?.ui.hideModules.includes(moduleId) ?? false;
};

export const getCustomModules = (magazaId: string) => {
  const config = getMagazaConfig(magazaId);
  return config?.ui.customModules || [];
};

// 📊 SINIR KONTROL FONKSİYONLARI
export const checkProductLimit = (magazaId: string, currentCount: number): boolean => {
  const config = getMagazaConfig(magazaId);
  const maxProducts = config?.limits.maxProducts;
  return maxProducts === undefined || currentCount < maxProducts;
};

export const getAllowedCategories = (magazaId: string): string[] | null => {
  const config = getMagazaConfig(magazaId);
  return config?.limits.allowedCategories || null;
};

export default { 
  magazaConfigs,
  getMagazaConfig,
  canAddProduct,
  canEditProduct,
  getButtonLabel,
  isModuleHidden,
  getCustomModules
};
