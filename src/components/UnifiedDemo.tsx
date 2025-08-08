import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import UnifiedProductList from './UnifiedProductList';
import { ArrowLeft, Search, ShoppingCart, User, Heart, Filter, Grid3X3, List, Truck, Shield, RotateCcw, Phone, Leaf, Zap, Cpu, Palette as PaletteIcon } from 'lucide-react';

// Theme configurations
const themeConfigs = {
  'fashion-store': {
    name: 'Fashion Store',
    primaryColor: 'pink',
    bgClass: 'bg-gray-50',
    headerClass: 'bg-white shadow-sm',
    logoClass: 'text-pink-600',
    buttonClass: 'bg-pink-600 hover:bg-pink-700',
    categories: ['Yeni Gelenler', 'Kadın', 'Erkek', 'Ayakkabı', 'Aksesuar', '🔥 İndirim']
  },
  'boutique-chic': {
    name: 'Boutique Chic',
    primaryColor: 'purple',
    bgClass: 'bg-gradient-to-br from-pink-50 to-purple-50',
    headerClass: 'bg-white/80 backdrop-blur-sm shadow-sm',
    logoClass: 'text-purple-600',
    buttonClass: 'bg-purple-600 hover:bg-purple-700',
    categories: ['Zarif Koleksiyon', 'Kadın', 'Elbise', 'Aksesuar', 'Özel Tasarım', '✨ Yeni']
  },
  'luxury-style': {
    name: 'Luxury Style',
    primaryColor: 'yellow',
    bgClass: 'bg-gradient-to-br from-gray-900 to-black',
    headerClass: 'bg-black/80 backdrop-blur-sm border-b border-yellow-500/30',
    logoClass: 'text-yellow-400',
    buttonClass: 'bg-yellow-500 hover:bg-yellow-400',
    categories: ['Premium', 'Lüks Koleksiyon', 'Özel Tasarım', 'Sınırlı Üretim', 'VIP', '💎 Exclusive']
  },
  'urban-street': {
    name: 'Urban Street',
    primaryColor: 'red',
    bgClass: 'bg-black',
    headerClass: 'bg-black border-b-2 border-red-500',
    logoClass: 'text-red-400',
    buttonClass: 'bg-red-600 hover:bg-red-700',
    categories: ['Streetwear', 'Hip-Hop', 'Sneakers', 'Caps', 'Urban', '🔥 Hot']
  },
  'minimal-wear': {
    name: 'Minimal Wear',
    primaryColor: 'gray',
    bgClass: 'bg-white',
    headerClass: 'bg-white border-b border-gray-100',
    logoClass: 'text-gray-900',
    buttonClass: 'bg-gray-900 hover:bg-gray-800',
    categories: ['Minimal', 'Basic', 'Essential', 'Clean', 'Simple', 'Sale']
  },
  'retro-vintage': {
    name: 'Retro Vintage',
    primaryColor: 'amber',
    bgClass: 'bg-amber-50',
    headerClass: 'bg-amber-100 border-b-4 border-amber-300',
    logoClass: 'text-amber-900',
    buttonClass: 'bg-amber-600 hover:bg-amber-700',
    categories: ['Vintage', 'Retro', 'Classic', '70s Style', '80s Fashion', 'Antique']
  },
  'hijab-fashion': {
    name: 'Hijab Fashion',
    primaryColor: 'purple',
    bgClass: 'bg-purple-50',
    headerClass: 'bg-white shadow-sm border-b border-purple-200',
    logoClass: 'text-purple-800',
    buttonClass: 'bg-purple-600 hover:bg-purple-700',
    categories: ['Tesettür', 'Hijab', 'Modest', 'Zarif', 'Modern', 'İndirim']
  },
  'kids-wear': {
    name: 'Kids Wear',
    primaryColor: 'blue',
    bgClass: 'bg-gradient-to-br from-yellow-100 to-pink-100',
    headerClass: 'bg-white/90 backdrop-blur-sm shadow-lg border-b-4 border-yellow-300',
    logoClass: 'text-blue-600',
    buttonClass: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600',
    categories: ['Çocuk', 'Bebek', 'Okul', 'Oyun', 'Renkli', 'Eğlenceli']
  },
  'outlet-zone': {
    name: 'Outlet Zone',
    primaryColor: 'red',
    bgClass: 'bg-red-50',
    headerClass: 'bg-red-600 text-white',
    logoClass: 'text-white',
    buttonClass: 'bg-yellow-400 hover:bg-yellow-300 text-red-600',
    categories: ['Outlet', 'İndirim', 'Kampanya', 'Fırsat', 'Ucuz', 'Mega İndirim']
  },
  'eco-textile': {
    name: 'Eco Textile',
    primaryColor: 'green',
    bgClass: 'bg-green-50',
    headerClass: 'bg-white shadow-sm border-b border-green-200',
    logoClass: 'text-green-800',
    buttonClass: 'bg-green-600 hover:bg-green-700',
    categories: ['Organik', 'Eco', 'Sürdürülebilir', 'Doğal', 'Çevre Dostu', '🌿 Green']
  },
  'mega-store': {
    name: 'MegaStore',
    primaryColor: 'red',
    bgClass: 'bg-gray-50',
    headerClass: 'bg-white shadow-sm',
    logoClass: 'text-red-600',
    buttonClass: 'bg-red-600 hover:bg-red-700',
    categories: ['Elektronik', 'Moda', 'Ev & Yaşam', 'Spor', 'Kozmetik', 'Fırsatlar']
  },
  'tech-hub': {
    name: 'TechHub',
    primaryColor: 'blue',
    bgClass: 'bg-gray-900',
    headerClass: 'bg-gray-800 shadow-lg',
    logoClass: 'text-blue-400',
    buttonClass: 'bg-blue-600 hover:bg-blue-700',
    categories: ['Laptop', 'PC', 'Gaming', 'Telefon', 'Aksesuar', '⚡ Fırsatlar']
  },
  'organic-market': {
    name: 'Organic Market',
    primaryColor: 'green',
    bgClass: 'bg-green-50',
    headerClass: 'bg-white shadow-sm',
    logoClass: 'text-green-600',
    buttonClass: 'bg-green-600 hover:bg-green-700',
    categories: ['Meyve & Sebze', 'Süt Ürünleri', 'Et & Tavuk', 'Tahıllar', 'İçecekler', '🌿 Organik']
  },
  'modern-minimal': {
    name: 'Minimal Store',
    primaryColor: 'gray',
    bgClass: 'bg-gray-50',
    headerClass: 'bg-white shadow-sm',
    logoClass: 'text-gray-900',
    buttonClass: 'bg-gray-900 hover:bg-gray-800',
    categories: ['Ev', 'Ofis', 'Dekorasyon', 'Aydınlatma', 'Mobilya', 'İndirim']
  }
};
export default function UnifiedDemo() {
  const navigate = useNavigate();
  const {
    selectedTheme,
    products
  } = useTheme();
  const [viewMode, setViewMode] = useState('grid');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const config = themeConfigs[selectedTheme as keyof typeof themeConfigs] || themeConfigs['fashion-store'];
  const themeProducts = products.filter(p => {
    // Map theme to product categories
    const categoryMap = {
      'fashion-store': 'fashion',
      'mega-store': 'mega-store',
      'tech-hub': 'tech',
      'organic-market': 'organic',
      'modern-minimal': 'minimal'
    };
    return p.category === categoryMap[selectedTheme as keyof typeof categoryMap];
  });
  const getThemeIcon = () => {
    switch (selectedTheme) {
      case 'fashion-store':
        return <PaletteIcon size={28} className={config.logoClass} />;
      case 'boutique-chic':
        return <span className="text-2xl">👗</span>;
      case 'luxury-style':
        return <span className="text-2xl">💎</span>;
      case 'urban-street':
        return <span className="text-2xl">🏙️</span>;
      case 'minimal-wear':
        return <span className="text-2xl">🧼</span>;
      case 'retro-vintage':
        return <span className="text-2xl">🎞️</span>;
      case 'hijab-fashion':
        return <span className="text-2xl">🧕</span>;
      case 'kids-wear':
        return <span className="text-2xl">👶</span>;
      case 'outlet-zone':
        return <span className="text-2xl">🔖</span>;
      case 'eco-textile':
        return <span className="text-2xl">🌿</span>;
      case 'tech-hub':
        return <Cpu size={28} className={config.logoClass} />;
      case 'organic-market':
        return <Leaf size={28} className={config.logoClass} />;
      default:
        return null;
    }
  };
  const getHeroContent = () => {
    switch (selectedTheme) {
      case 'fashion-store':
        return {
          title: 'Yeni Sezon Koleksiyonu',
          subtitle: t("common.tarzınızı_yansıtan_özel_parçalar"),
          bgClass: 'bg-gradient-to-r from-pink-100 to-purple-100'
        };
      case 'boutique-chic':
        return {
          title: t("common.zarafet_burada_başlar"),
          subtitle: t("common.her_parça_özenle_seçilmiş_kadının_güzelliğini_ortaya_çıkaran_özel_tasarımlar"),
          bgClass: 'bg-gradient-to-r from-purple-100 to-pink-100'
        };
      case 'luxury-style':
        return {
          title: 'EXCLUSIVE LUXURY',
          subtitle: t("common.premium_kalite_eşsiz_tasarım_sınırlı_koleksiyon"),
          bgClass: 'bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 text-white'
        };
      case 'urban-street':
        return {
          title: 'STREET STYLE',
          subtitle: t("common.sokakların_ritmi_gençliğin_enerjisi"),
          bgClass: 'bg-gradient-to-r from-red-900 to-black text-white'
        };
      case 'minimal-wear':
        return {
          title: 'Sadelik',
          subtitle: t("common.gereksiz_detaylardan_arınmış_saf_tasarım"),
          bgClass: 'bg-gray-50'
        };
      case 'retro-vintage':
        return {
          title: 'Vintage Charm',
          subtitle: t("common.geçmişin_zarafeti_bugünün_konforu"),
          bgClass: 'bg-gradient-to-r from-amber-200 to-orange-200'
        };
      case 'hijab-fashion':
        return {
          title: t("common.zarif_tesettür"),
          subtitle: t("common.modern_çizgiler_geleneksel_değerler"),
          bgClass: 'bg-gradient-to-r from-purple-100 to-pink-100'
        };
      case 'kids-wear':
        return {
          title: t("common.çocuklar_i_çin"),
          subtitle: t("common.renkli_eğlenceli_konforlu_kıyafetler"),
          bgClass: 'bg-gradient-to-br from-yellow-100 to-pink-100'
        };
      case 'outlet-zone':
        return {
          title: t("common.70_e_varan_i_ndi_ri_m"),
          subtitle: t("common.sınırlı_süre_kaçırma"),
          bgClass: 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
        };
      case 'eco-textile':
        return {
          title: t("common.doğa_dostu_moda"),
          subtitle: t("common.organik_kumaşlar_çevre_dostu_üretim"),
          bgClass: 'bg-gradient-to-r from-green-100 to-emerald-100'
        };
      case 'mega-store':
        return {
          title: t("common.mega_i_ndirimler_başladı"),
          subtitle: t("common.tüm_kategorilerde_70_e_varan_indirimler"),
          bgClass: 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
        };
      case 'tech-hub':
        return {
          title: t("common.gaming_sezonunda_mega_i_ndirimler"),
          subtitle: t("common.en_son_teknoloji_ürünlerinde_50_ye_varan_indirimler"),
          bgClass: 'bg-gradient-to-r from-blue-900 to-purple-900 text-white'
        };
      case 'organic-market':
        return {
          title: t("common.doğanın_en_taze_ürünleri"),
          subtitle: t("common.organik_sertifikalı_çiftlikten_sofraya_taze_ürünler"),
          bgClass: 'bg-gradient-to-r from-green-100 to-green-200'
        };
      case 'modern-minimal':
        return {
          title: t("common.minimal_tasarım"),
          subtitle: t("common.sadelik_ve_işlevselliği_bir_araya_getiren_özel_koleksiyon"),
          bgClass: 'bg-white'
        };
      default:
        return {
          title: t("common.hoş_geldiniz"),
          subtitle: t("common.en_iyi_ürünleri_keşfedin"),
          bgClass: 'bg-gray-100'
        };
    }
  };
  const heroContent = getHeroContent();
  return <div className={`min-h-screen ${config.bgClass}`}>
      {/* Header */}
      <header className={`${config.headerClass} sticky top-0 z-50`}>
        {/* Top Bar for some themes */}
        {(selectedTheme === 'mega-store' || selectedTheme === 'organic-market') && <div className={`${selectedTheme === 'mega-store' ? 'bg-red-600' : 'bg-green-600'} text-white py-2`}>
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
              <div className="flex items-center space-x-4">
                <span>{t("common.ücretsiz_kargo")}</span>
                <span>⚡ Aynı Gün Teslimat</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>📞 444 0 123</span>
              </div>
            </div>
          </div>}

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button & Logo */}
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/admin/tema-sistemi')} className={`flex items-center ${selectedTheme === 'tech-hub' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-gray-800'} transition-colors`}>
                <ArrowLeft size={20} className="mr-2" />{t("common.tema_seçimine_dön")}</button>
              <div className="flex items-center space-x-2">
                {getThemeIcon()}
                <div className={`text-2xl font-bold ${config.logoClass}`}>{config.name}</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input type="text" placeholder={t("common.ürün_ara")} className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 ${selectedTheme === 'tech-hub' ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'border-gray-300 focus:ring-2 focus:ring-pink-500'}`} />
                <button className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${config.buttonClass} text-white p-2 rounded-md`}>
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className={`p-2 ${selectedTheme === 'tech-hub' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-pink-600'} relative`}>
                <Heart size={24} />
                {wishlist.length > 0 && <span className={`absolute -top-1 -right-1 ${config.buttonClass.split(' ')[0]} text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}>{wishlist.length}</span>}
              </button>
              <button className={`p-2 ${selectedTheme === 'tech-hub' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-pink-600'} relative`}>
                <ShoppingCart size={24} />
                {cart.length > 0 && <span className={`absolute -top-1 -right-1 ${config.buttonClass.split(' ')[0]} text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}>{cart.length}</span>}
              </button>
              <button className={`flex items-center space-x-2 ${selectedTheme === 'tech-hub' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-pink-600'}`}>
                <User size={24} />
                <span>{t("common.hesabım")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className={`border-t ${selectedTheme === 'tech-hub' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center justify-center space-x-8 py-3">
              {config.categories.map((category, index) => <a key={index} href="#" className={`transition-colors font-medium ${selectedTheme === 'tech-hub' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-pink-600'}`}>
                  {category}
                </a>)}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`${heroContent.bgClass} py-16`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className={`text-4xl font-bold mb-4 ${heroContent.bgClass.includes('text-white') ? 'text-white' : selectedTheme === 'organic-market' ? 'text-green-800' : 'text-gray-900'}`}>
            {heroContent.title}
          </h1>
          <p className={`text-xl mb-8 ${heroContent.bgClass.includes('text-white') ? 'text-blue-200' : selectedTheme === 'organic-market' ? 'text-green-700' : 'text-gray-600'}`}>
            {heroContent.subtitle}
          </p>
          <button className={`${config.buttonClass} text-white px-8 py-3 rounded-lg font-semibold transition-colors`}>{t("common.koleksiyonu_keşfet")}</button>
        </div>
      </section>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className={`${selectedTheme === 'tech-hub' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
              <h3 className={`font-semibold mb-4 flex items-center ${selectedTheme === 'tech-hub' ? 'text-white' : 'text-gray-900'}`}>
                <Filter size={16} className="mr-2" />
                Filtreler
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className={`font-medium mb-3 text-sm ${selectedTheme === 'tech-hub' ? 'text-gray-300' : 'text-gray-700'}`}>Kategori</h4>
                  <div className="space-y-2">
                    <label className={`flex items-center text-sm ${selectedTheme === 'tech-hub' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <input type="checkbox" className={`mr-2 ${config.buttonClass.includes('pink') ? 'text-pink-600 focus:ring-pink-500' : config.buttonClass.includes('blue') ? 'text-blue-600 focus:ring-blue-500' : 'text-green-600 focus:ring-green-500'}`} />
                      Tüm Ürünler ({themeProducts.length})
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className={`font-medium mb-3 text-sm ${selectedTheme === 'tech-hub' ? 'text-gray-300' : 'text-gray-700'}`}>Fiyat</h4>
                  <div className="space-y-2">
                    <label className={`flex items-center text-sm ${selectedTheme === 'tech-hub' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <input type="checkbox" className={`mr-2 ${config.buttonClass.includes('pink') ? 'text-pink-600 focus:ring-pink-500' : config.buttonClass.includes('blue') ? 'text-blue-600 focus:ring-blue-500' : 'text-green-600 focus:ring-green-500'}`} />
                      0 - 500 TL
                    </label>
                    <label className={`flex items-center text-sm ${selectedTheme === 'tech-hub' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <input type="checkbox" className={`mr-2 ${config.buttonClass.includes('pink') ? 'text-pink-600 focus:ring-pink-500' : config.buttonClass.includes('blue') ? 'text-blue-600 focus:ring-blue-500' : 'text-green-600 focus:ring-green-500'}`} />
                      500+ TL
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className={`${selectedTheme === 'tech-hub' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-4 mb-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`${selectedTheme === 'tech-hub' ? 'text-gray-300' : 'text-gray-600'}`}>{themeProducts.length}{t("common.ürün_bulundu")}</span>
                  <select className={`border rounded-md px-3 py-1 text-sm ${selectedTheme === 'tech-hub' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}>
                    <option>{t("common.önerilen")}</option>
                    <option>{t("common.en_düşük_fiyat")}</option>
                    <option>{t("common.en_yüksek_fiyat")}</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? `${config.buttonClass.split(' ')[0].replace('bg-', 'bg-').replace('hover:bg-', '')} text-white` : selectedTheme === 'tech-hub' ? 'text-gray-400' : 'text-gray-400'}`}>
                    <Grid3X3 size={16} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? `${config.buttonClass.split(' ')[0].replace('bg-', 'bg-').replace('hover:bg-', '')} text-white` : selectedTheme === 'tech-hub' ? 'text-gray-400' : 'text-gray-400'}`}>
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Unified Product List */}
            <UnifiedProductList className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid grid-cols-1 gap-6'} />
          </main>
        </div>
      </div>

      {/* Features Section */}
      <section className={`${selectedTheme === 'tech-hub' ? 'bg-gray-800' : 'bg-white'} py-12 mt-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className={`${config.buttonClass.split(' ')[0].replace('bg-', 'bg-').replace('hover:bg-', '')}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Truck className={`w-8 h-8 ${config.logoClass}`} />
              </div>
              <h3 className={`font-semibold mb-2 ${selectedTheme === 'tech-hub' ? 'text-white' : 'text-gray-900'}`}>Ücretsiz Kargo</h3>
              <p className={`text-sm ${selectedTheme === 'tech-hub' ? 'text-gray-400' : 'text-gray-600'}`}>{t('common.aboveAmount', {
                amount: 500
              })} siparişlerde</p>
            </div>
            <div className="text-center">
              <div className={`${config.buttonClass.split(' ')[0].replace('bg-', 'bg-').replace('hover:bg-', '')}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Shield className={`w-8 h-8 ${config.logoClass}`} />
              </div>
              <h3 className={`font-semibold mb-2 ${selectedTheme === 'tech-hub' ? 'text-white' : 'text-gray-900'}`}>Güvenli Ödeme</h3>
              <p className={`text-sm ${selectedTheme === 'tech-hub' ? 'text-gray-400' : 'text-gray-600'}`}>{t("common.ssl_korumalı")}</p>
            </div>
            <div className="text-center">
              <div className={`${config.buttonClass.split(' ')[0].replace('bg-', 'bg-').replace('hover:bg-', '')}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <RotateCcw className={`w-8 h-8 ${config.logoClass}`} />
              </div>
              <h3 className={`font-semibold mb-2 ${selectedTheme === 'tech-hub' ? 'text-white' : 'text-gray-900'}`}>{t("common.kolay_i_ade")}</h3>
              <p className={`text-sm ${selectedTheme === 'tech-hub' ? 'text-gray-400' : 'text-gray-600'}`}>{t("common.30_gün_içinde")}</p>
            </div>
            <div className="text-center">
              <div className={`${config.buttonClass.split(' ')[0].replace('bg-', 'bg-').replace('hover:bg-', '')}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Phone className={`w-8 h-8 ${config.logoClass}`} />
              </div>
              <h3 className={`font-semibold mb-2 ${selectedTheme === 'tech-hub' ? 'text-white' : 'text-gray-900'}`}>Destek</h3>
              <p className={`text-sm ${selectedTheme === 'tech-hub' ? 'text-gray-400' : 'text-gray-600'}`}>{t("common.7_24_yardım")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${selectedTheme === 'tech-hub' ? 'bg-gray-900' : selectedTheme === 'organic-market' ? 'bg-green-800' : 'bg-gray-900'} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                {getThemeIcon()}
                <h3 className="text-xl font-bold">{config.name}</h3>
              </div>
              <p className={`mb-4 ${selectedTheme === 'organic-market' ? 'text-green-200' : 'text-gray-400'}`}>
                {selectedTheme === 'organic-market' ? t("common.doğanın_en_taze_ve_sağlıklı_ürünlerini_sofralarınıza_getiriyoruz") : selectedTheme === 'tech-hub' ? t("common.en_son_teknoloji_ürünleri_ile_hayatınızı_kolaylaştırın") : t("common.en_kaliteli_ürünlerle_hizmetinizdeyiz")}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kategoriler</h4>
              <ul className={`space-y-2 ${selectedTheme === 'organic-market' ? 'text-green-200' : 'text-gray-400'}`}>
                {config.categories.slice(0, 4).map((category, index) => <li key={index}><a href="#" className="hover:text-white">{category}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hizmetler</h4>
              <ul className={`space-y-2 ${selectedTheme === 'organic-market' ? 'text-green-200' : 'text-gray-400'}`}>
                <li><a href="#" className="hover:text-white">Ücretsiz Kargo</a></li>
                <li><a href="#" className="hover:text-white">Hızlı Teslimat</a></li>
                <li><a href="#" className="hover:text-white">{t("common.kolay_i_ade")}</a></li>
                <li><a href="#" className="hover:text-white">7/24 Destek</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("common.i_letişim")}</h4>
              <ul className={`space-y-2 ${selectedTheme === 'organic-market' ? 'text-green-200' : 'text-gray-400'}`}>
                <li>{t("common.i_stanbul_türkiye")}</li>
                <li>📞 0212 555 0123</li>
                <li>📧 info@{config.name.toLowerCase().replace(' ', '')}.com</li>
                <li>{t("common.7_24_açık")}</li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t mt-8 pt-8 text-center ${selectedTheme === 'organic-market' ? 'border-green-700 text-green-200' : 'border-gray-800 text-gray-400'}`}>
            <p>&copy; 2025 {config.name}{t("common.bu_demo_altıntassoft_tarafından_oluşturulmuştur")}</p>
          </div>
        </div>
      </footer>
    </div>;
}